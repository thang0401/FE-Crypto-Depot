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
import { error } from "console"

const KycCenter: React.FC = () => {
  const router = useRouter()
  const [kycData, setKycData] = useState({
    country: "VN", // Default to Vietnam
    nationalId: "",
    frontImage: null as File | null,
    frontImagePreview: null as string | null,
    backImage: null as File | null,
    backImagePreview: null as string | null,
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

  const [provinces, setProvinces] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])

  //Fetch provinces
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

  //Fetch  districts based on province
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
        .catch((error) => console.error("Error fetching provinces:", error))
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

  const handleSubmit = () => {
    // Handle KYC submission (e.g., send to API)
    console.log("KYC Data:", kycData)
    alert("KYC is complete. Your profile will be reviewed within 24 hours!")
    //Set userKycStatus to localStorage
    const userKycStatus = localStorage.setItem("userKycStatus", JSON.stringify(true))
    router.push("/")
  }

  const handleChange = (field: keyof typeof kycData, value: any) => {
    if (field === "frontImage" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value)
      setKycData((prev) => ({
        ...prev,
        [field]: value,
        frontImagePreview: previewUrl,
      }))
    } else if (field === "backImage" && value instanceof File) {
      const previewUrl = URL.createObjectURL(value)
      setKycData((prev) => ({
        ...prev,
        [field]: value,
        backImagePreview: previewUrl,
      }))
    } else {
      setKycData((prev) => ({ ...prev, [field]: value }))
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload Documents and Personal Information
      </Typography>
      <Grid container spacing={2}>
        {/* Country field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            value="Viet Nam"
            InputProps={{
              readOnly: true,
              sx: { fontWeight: "bold", fontSize: "1.2rem" },
            }}
          />
        </Grid>

        {/* National ID field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="National ID Number"
            value={kycData.nationalId}
            onChange={(e) => handleChange("nationalId", e.target.value)}
            required
          />
        </Grid>

        {/* Front and Back Image Upload */}
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
                <Typography variant="caption" sx={{ mt: 10, display: "block", textAlign: "center", pt: 5 }}>
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

        {/* Personal Information */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            value={kycData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            value={kycData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
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
            label="Date of Birth"
            type="date"
            value={kycData.birthday}
            onChange={(e) => handleChange("birthday", e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
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
          >
            <MenuItem value=""> Select province</MenuItem>
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
          >
            <MenuItem value=""> Select Ward</MenuItem>
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
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !kycData.nationalId || !kycData.frontImage || !kycData.backImage ||
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
}

export default KycCenter