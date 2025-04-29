import { google, drive_v3 } from "googleapis"
import { Readable } from "stream"
import { NextApiRequest, NextApiResponse } from "next/types"

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
    return res.status(405).json({ message: "Phương thức không được phép" })
  }

  const { nationalId, frontImage, backImage } = req.body as UploadRequestBody
  console.log("Nhận yêu cầu với nationalId:", nationalId)

  // Kiểm tra biến môi trường
  if (!serviceAccount.client_email || !serviceAccount.private_key || !serviceAccount.project_id) {
    console.error("Thiếu thông tin xác thực dịch vụ trong biến môi trường")
    return res.status(500).json({ message: "Lỗi cấu hình máy chủ" })
  }

  const parentFolderId = process.env.GOOGLE_PARENT_FOLDER_ID
  if (!parentFolderId) {
    console.error("Thiếu GOOGLE_PARENT_FOLDER_ID trong biến môi trường")
    return res.status(500).json({ message: "Lỗi cấu hình máy chủ" })
  }

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/drive"],
  })

  const drive: drive_v3.Drive = google.drive({ version: "v3", auth })

  try {
    // Kiểm tra xem folder với tên nationalId đã tồn tại chưa
    console.log("Kiểm tra folder với nationalId:", nationalId)
    const folderCheck = await drive.files.list({
      q: `name='${nationalId}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents`,
      fields: "files(id, webViewLink)",
    })

    let folderId: string
    let folderLink: string

    if (folderCheck.data.files && folderCheck.data.files.length > 0) {
      // Folder đã tồn tại
      console.log("Folder đã tồn tại với nationalId:", nationalId)
      folderId = folderCheck.data.files[0].id as string
      folderLink = folderCheck.data.files[0].webViewLink as string

      // (Tùy chọn) Báo lỗi nếu không muốn sử dụng folder hiện có
      return res.status(400).json({
        message: "Số CCCD đã được sử dụng. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.",
      })
    } else {
      // Tạo folder mới nếu chưa tồn tại
      console.log("Tạo folder mới cho nationalId:", nationalId)
      const folderResponse = await drive.files.create({
        requestBody: {
          name: `${nationalId}`,
          mimeType: "application/vnd.google-apps.folder",
          parents: [parentFolderId],
        },
        fields: "id, webViewLink",
      })
      folderId = folderResponse.data.id as string
      folderLink = folderResponse.data.webViewLink as string
      console.log("Folder được tạo với ID:", folderId, "và Link:", folderLink)
    }

    // Hàm upload file lên Google Drive
    const uploadFile = async (fileData: string, fileName: string): Promise<string> => {
      console.log("Đang upload file:", fileName)
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
      console.log("File được upload với webViewLink:", fileResponse.data.webViewLink)
      return fileResponse.data.webViewLink as string
    }

    const frontImageUrl = frontImage ? await uploadFile(frontImage, `front_${nationalId}.jpg`) : null
    const backImageUrl = backImage ? await uploadFile(backImage, `back_${nationalId}.jpg`) : null

    // Encode folder link sang base64
    const base64FolderLink: string = btoa(folderLink)
    console.log("Base64 encoded folder link:", base64FolderLink)

    // Decode từ Base64 (chỉ để kiểm tra)
    const decodedFolderLink: string = atob(base64FolderLink)
    console.log("Decoded folder link:", decodedFolderLink)

    return res.status(200).json({ frontImageUrl, backImageUrl, folderLink: base64FolderLink })
  } catch (error) {
    console.error("Lỗi trong upload-to-drive:", error)
    return res.status(500).json({ message: "Không thể upload lên Google Drive" })
  }
}