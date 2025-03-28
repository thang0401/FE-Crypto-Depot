import { google, drive_v3 } from "googleapis"
import { Readable } from "stream"
import  { NextApiRequest, NextApiResponse } from "next/types"


const serviceAccount = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  project_id: process.env.GOOGLE_PROJECT_ID,
}

interface UploadRequestBody {
  nationalId: string
  frontImage?: string | null
  backImage?: string | null
}

interface UploadResponse {
  frontImageUrl?: string | null
  backImageUrl?: string | null
  message?: string
  folderLink?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UploadResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { nationalId, frontImage, backImage } = req.body as UploadRequestBody
  console.log("Received request with nationalId:", nationalId)

  // Kiểm tra xem biến môi trường có được load không
  if (!serviceAccount.client_email || !serviceAccount.private_key || !serviceAccount.project_id) {
    console.error("Missing service account credentials in environment variables")
    return res.status(500).json({ message: "Server configuration error" })
  }

  const parentFolderId = process.env.GOOGLE_PARENT_FOLDER_ID
  if (!parentFolderId) {
    console.error("Missing GOOGLE_PARENT_FOLDER_ID in environment variables")
    return res.status(500).json({ message: "Server configuration error" })
  }

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/drive"],
  })

  const drive: drive_v3.Drive = google.drive({ version: "v3", auth })

  try {
    console.log("Creating folder for nationalId:", nationalId)
    const folderResponse = await drive.files.create({
      requestBody: {
        name: `${nationalId}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
      fields: "id, webViewLink",
    })
    const folderId: string = folderResponse.data.id as string
    const folderLink: string = folderResponse.data.webViewLink as string
    console.log("Folder created with ID:", folderId, "and Link:", folderLink)

    const uploadFile = async (fileData: string, fileName: string): Promise<string> => {
      console.log("Uploading file:", fileName)
      const buffer = Buffer.from(fileData.split(",")[1], "base64")
      const fileResponse = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId],
        },
        media: {
          mimeType: "image/jpeg",
          body: Readable.from(buffer),
        },
        fields: "id, webViewLink",
      })
      console.log("File uploaded with webViewLink:", fileResponse.data.webViewLink)
      return fileResponse.data.webViewLink as string
    }

    const frontImageUrl = frontImage ? await uploadFile(frontImage, `front_${nationalId}.jpg`) : null
    const backImageUrl = backImage ? await uploadFile(backImage, `back_${nationalId}.jpg`) : null

    //Endcode sang base64
    const base64FolderLink: string = btoa(folderLink)
    console.log("Base64 encoded folder link:", base64FolderLink)
    
    // Decode từ Base64
    const decodedFolderLink: string = atob(base64FolderLink)
    console.log("Decoded folder link:", decodedFolderLink)
    
    return res.status(200).json({ frontImageUrl, backImageUrl, folderLink: base64FolderLink })
  } catch (error) {
    console.error("Error in upload-to-drive:", error)
    return res.status(500).json({ message: "Failed to upload to Google Drive" })
  }
}