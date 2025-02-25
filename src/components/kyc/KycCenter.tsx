"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material"
import { useRouter } from "next/navigation"

const KycCenter: React.FC = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [kycData, setKycData] = useState({
    // Step 1
    countryOfResidence: "",
    issuingCountry: "",
    documentType: "",
    // Step 2 (gộp Step 2 & Step 3)
    frontImage: null as File | null,
    frontImagePreview: null as string | null, // URL tạm thời để hiển thị ảnh
    backImage: null as File | null,
    backImagePreview: null as string | null,  // URL tạm thời để hiển thị ảnh
    fullName: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    birthday: "",
    address: "",
    ward: "",
    district: "",
    province: "",
  })

  const handleNext = () => {
    if (step === 2) {
      // Xử lý hoàn tất KYC (gửi API)
      console.log("KYC Data:", kycData)
      alert("KYC is complete. Your profile will be reviewed within 24 hours.!")
      router.push("/")
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleChange = (field: keyof typeof kycData, value: any) => {
    if (field === "frontImage" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value);
      setKycData((prev) => ({
        ...prev,
        [field]: value,
        frontImagePreview: previewUrl,
      }));
    } else if (field === "backImage" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value);
      setKycData((prev) => ({
        ...prev,
        [field]: value,
        backImagePreview: previewUrl,
      }));
    } else {
      setKycData((prev) => ({ ...prev, [field]: value }));
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
               First information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Country of Residence"
                  value={kycData.countryOfResidence}
                  onChange={(e) => handleChange("countryOfResidence", e.target.value)}
                  required
                >
                  <MenuItem value="VN">Viet Nam</MenuItem>
                  <MenuItem value="US">USA</MenuItem>
                  <MenuItem value="JP">Japan</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Issuing Country/Region"
                  value={kycData.issuingCountry}
                  onChange={(e) => handleChange("issuingCountry", e.target.value)}
                  required
                >
                  <MenuItem value="VN">Viet Nam</MenuItem>
                  <MenuItem value="US">USA</MenuItem>
                  <MenuItem value="JP">Japan</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Document Type"
                  value={kycData.documentType}
                  onChange={(e) => handleChange("documentType", e.target.value)}
                  required
                >
                  <MenuItem value="CCCD">National ID Card</MenuItem>
                  <MenuItem value="DRIVER_LICENSE">Driver's license </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!kycData.countryOfResidence || !kycData.issuingCountry || !kycData.documentType}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
            Upload Documents and Personal Information
            </Typography>
            <Grid container spacing={2}>
              {/* Phần tải lên giấy tờ với layout ngang 2 cột */}
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
                    height: "300px", // Tăng chiều cao để chứa ảnh và nút
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                  Front Side of ID Card/Driver's License
                  </Typography>
                  <Box sx={{ width: "100%", position: "relative" }}>
                    {kycData.frontImagePreview && (
                      <CardMedia
                        component="img"
                        image={kycData.frontImagePreview}
                        alt="Front Image Preview"
                        sx={{
                          borderRadius: "8px",
                          height: 200,
                          objectFit: "contain",
                          maxWidth: "100%",
                        }}
                      />
                    )}
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        // display: kycData.frontImage ? "block" : "none", // Chỉ hiển thị khi có ảnh
                      }}
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
                      <Typography variant="caption" sx={{ mt: 10, display: "block", textAlign: "center" , pt: 5}}>
                        Upload up to 50MB, formats: .jpg, .png, .pdf
                      </Typography>
                    )}
                  </Box>
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
                    height: "300px", // Tăng chiều cao để chứa ảnh và nút
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                  Back Side of ID Card/Driver's License
                  </Typography>
                  <Box sx={{ width: "100%", position: "relative" }}>
                    {kycData.backImagePreview && (
                      <CardMedia
                        component="img"
                        image={kycData.backImagePreview}
                        alt="Back Image Preview"
                        sx={{
                          borderRadius: "8px",
                          height: 200,
                          objectFit: "contain",
                          maxWidth: "100%",
                        }}
                      />
                    )}
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        // display: kycData.backImage ? "block" : "none", // Chỉ hiển thị khi có ảnh
                      }}
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
                </Card>
              </Grid>

              {/* Phần thông tin cá nhân */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fullname"
                  value={kycData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First name"
                  value={kycData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  value={kycData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  value={kycData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={kycData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={kycData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of birth"
                  type="date"
                  value={kycData.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={kycData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Ward"
                  value={kycData.ward}
                  onChange={(e) => handleChange("ward", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="District"
                  value={kycData.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Province"
                  value={kycData.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  !kycData.frontImage || !kycData.backImage ||
                  !kycData.fullName || !kycData.firstName || !kycData.lastName ||
                  !kycData.gender || !kycData.phone || !kycData.email ||
                  !kycData.birthday || !kycData.address || !kycData.ward ||
                  !kycData.district || !kycData.province
                }
              >
                Confirm
              </Button>
            </Box>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {renderStepContent()}
    </Box>
  )
}

export default KycCenter