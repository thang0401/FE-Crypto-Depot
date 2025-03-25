"use client"

import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  MenuItem,
} from "@mui/material"
import { useRouter } from "next/navigation"
import axios from "axios"

// Định nghĩa kiểu cho dữ liệu KYC
interface KycData {
  country: string
  nationalId: string
  frontImage: File | null
  frontImagePreview: string | null
  backImage: File | null
  backImagePreview: string | null
  firstName: string
  middleName: string
  lastName: string
  gender: string
  phone: string
  birthday: string
  address: string
  ward: string
  district: string
  province: string
}

// Định nghĩa kiểu cho lỗi
type Errors = Record<string, string>

// Định nghĩa kiểu cho dữ liệu từ API tỉnh/thành
interface LocationData {
  id: string
  full_name: string
}

const KycCenter: React.FC = () => {
  const router = useRouter()
  const [kycData, setKycData] = useState<KycData>({
    country: "VN",
    nationalId: "",
    frontImage: null,
    frontImagePreview: null,
    backImage: null,
    backImagePreview: null,
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phone: "",
    birthday: "",
    address: "",
    ward: "",
    district: "",
    province: "",
  })

  const [errors, setErrors] = useState<Errors>({})
  const [provinces, setProvinces] = useState<LocationData[]>([])
  const [districts, setDistricts] = useState<LocationData[]>([])
  const [wards, setWards] = useState<LocationData[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch provinces
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data)
        }
      })
      .catch((error) => console.error("Error fetching provinces:", error))
  }, [])

  // Fetch districts based on province
  useEffect(() => {
    if (kycData.province) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${kycData.province}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data)
            setWards([])
            setKycData((prev) => ({ ...prev, district: "", ward: "" }))
          }
        })
        .catch((error) => console.error("Error fetching districts:", error))
    }
  }, [kycData.province])

  // Fetch wards based on district
  useEffect(() => {
    if (kycData.district) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${kycData.district}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data)
            setKycData((prev) => ({ ...prev, ward: "" }))
          }
        })
        .catch((error) => console.error("Error fetching wards:", error))
    }
  }, [kycData.district])

  const validateForm = (): boolean => {
    const newErrors: Errors = {}

    if (!kycData.nationalId.trim()) {
      newErrors.nationalId = "National ID is required"
    } else if (!/^\d{9,12}$/.test(kycData.nationalId)) {
      newErrors.nationalId = "National ID must be 9-12 digits"
    }

    if (!kycData.firstName.trim()) {
      newErrors.firstName = "First Name is required"
    } else if (!/^[a-zA-Z\s]+$/.test(kycData.firstName)) {
      newErrors.firstName = "First Name must contain only letters"
    }

    if (!kycData.middleName.trim()) {
      newErrors.middleName = "Middle Name is required"
    } else if (!/^[a-zA-Z\s]+$/.test(kycData.middleName)) {
      newErrors.middleName = "Middle Name must contain only letters"
    }

    if (!kycData.lastName.trim()) {
      newErrors.lastName = "Last Name is required"
    } else if (!/^[a-zA-Z\s]+$/.test(kycData.lastName)) {
      newErrors.lastName = "Last Name must contain only letters"
    }

    if (!kycData.gender) newErrors.gender = "Gender is required"

    if (!kycData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10,11}$/.test(kycData.phone)) {
      newErrors.phone = "Phone must be 10-11 digits"
    }

    if (!kycData.birthday) {
      newErrors.birthday = "Date of Birth is required"
    } else {
      const birthDate = new Date(kycData.birthday)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) newErrors.birthday = "Must be at least 18 years old"
    }

    if (!kycData.address.trim()) newErrors.address = "Address is required"
    if (!kycData.province) newErrors.province = "Province is required"
    if (!kycData.district) newErrors.district = "District is required"
    if (!kycData.ward) newErrors.ward = "Ward is required"
    if (!kycData.frontImage) newErrors.frontImage = "Front image is required"
    if (!kycData.backImage) newErrors.backImage = "Back image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Chuyển file thành base64 để gửi lên server
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = (error) => reject(error)
        })

      const frontImageBase64 = kycData.frontImage ? await toBase64(kycData.frontImage) : null
      const backImageBase64 = kycData.backImage ? await toBase64(kycData.backImage) : null

      // Gửi request đến API route
      const response = await axios.post("/api/upload-to-drive", {
        nationalId: kycData.nationalId,
        frontImage: frontImageBase64,
        backImage: backImageBase64,
      })

      const { frontImageUrl, backImageUrl } = response.data

      console.log("KYC Data:", { ...kycData, frontImageUrl, backImageUrl })
      alert("KYC is complete. Your profile will be reviewed within 24 hours!")
      localStorage.setItem("userKycStatus", JSON.stringify(true))
      router.push("/")
    } catch (error) {
      console.error("Error submitting KYC:", error)
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit KYC. Please try again.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof KycData, value: any) => {
    if (field === "frontImage" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value)
      setKycData((prev) => ({ ...prev, [field]: value, frontImagePreview: previewUrl }))
    } else if (field === "backImage" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value)
      setKycData((prev) => ({ ...prev, [field]: value, backImagePreview: previewUrl }))
    } else {
      setKycData((prev) => ({ ...prev, [field]: value }))
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload Documents and Personal Information
      </Typography>
      {errors.submit && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errors.submit}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            value="Viet Nam"
            InputProps={{ readOnly: true, sx: { fontWeight: "bold", fontSize: "1.2rem" } }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="National ID Number"
            value={kycData.nationalId}
            onChange={(e) => handleChange("nationalId", e.target.value)}
            required
            error={!!errors.nationalId}
            helperText={errors.nationalId}
          />
        </Grid>

        <Grid item xs={6}>
          <Card
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Front Side of ID Card
            </Typography>
            <Box sx={{ width: "100%", position: "relative" }}>
              {kycData.frontImagePreview && (
                <CardMedia
                  component="img"
                  image={kycData.frontImagePreview}
                  alt="Front Image Preview"
                  sx={{ borderRadius: "8px", height: 200, objectFit: "contain", maxWidth: "100%" }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}
              >
                {kycData.frontImage ? "Re-upload" : "Upload"}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleChange("frontImage", e.target.files?.[0] || null)}
                />
              </Button>
              {!kycData.frontImage && (
                <Typography variant="caption" sx={{ mt: 10, display: "block", textAlign: "center", pt: 5 }}>
                  Upload up to 50MB, formats: .jpg, .png, .pdf
                </Typography>
              )}
            </Box>
            {errors.frontImage && (
              <Typography color="error" variant="caption">
                {errors.frontImage}
              </Typography>
            )}
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Back Side of ID Card
            </Typography>
            <Box sx={{ width: "100%", position: "relative" }}>
              {kycData.backImagePreview && (
                <CardMedia
                  component="img"
                  image={kycData.backImagePreview}
                  alt="Back Image Preview"
                  sx={{ borderRadius: "8px", height: 200, objectFit: "contain", maxWidth: "100%" }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}
              >
                {kycData.backImage ? "Re-upload" : "Upload"}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleChange("backImage", e.target.files?.[0] || null)}
                />
              </Button>
              {!kycData.backImage && (
                <Typography variant="caption" sx={{ mt: 10, display: "block", textAlign: "center", pt: 5 }}>
                  Upload up to 50MB, formats: .jpg, .png, .pdf
                </Typography>
              )}
            </Box>
            {errors.backImage && (
              <Typography color="error" variant="caption">
                {errors.backImage}
              </Typography>
            )}
          </Card>
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="First Name"
            value={kycData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Middle Name"
            value={kycData.middleName}
            onChange={(e) => handleChange("middleName", e.target.value)}
            required
            error={!!errors.middleName}
            helperText={errors.middleName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Last Name"
            value={kycData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            label="Gender"
            value={kycData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            required
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Phone"
            value={kycData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={kycData.birthday}
            onChange={(e) => handleChange("birthday", e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.birthday}
            helperText={errors.birthday}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            label="Province"
            value={kycData.province}
            onChange={(e) => handleChange("province", e.target.value)}
            required
            error={!!errors.province}
            helperText={errors.province}
          >
            <MenuItem value="">Select province</MenuItem>
            {provinces.map((province) => (
              <MenuItem key={province.id} value={province.id}>
                {province.full_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            label="District"
            value={kycData.district}
            onChange={(e) => handleChange("district", e.target.value)}
            required
            disabled={!kycData.province}
            error={!!errors.district}
            helperText={errors.district}
          >
            <MenuItem value="">Select District</MenuItem>
            {districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.full_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            label="Ward"
            value={kycData.ward}
            onChange={(e) => handleChange("ward", e.target.value)}
            required
            disabled={!kycData.district}
            error={!!errors.ward}
            helperText={errors.ward}
          >
            <MenuItem value="">Select Ward</MenuItem>
            {wards.map((ward) => (
              <MenuItem key={ward.id} value={ward.id}>
                {ward.full_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={kycData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            required
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm"}
        </Button>
      </Box>
    </Box>
  )
}

export default KycCenter