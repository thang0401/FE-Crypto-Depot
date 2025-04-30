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
      .catch((error) => console.error("Lỗi khi lấy danh sách tỉnh/thành:", error))
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
        .catch((error) => console.error("Lỗi khi lấy danh sách quận/huyện:", error))
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
        .catch((error) => console.error("Lỗi khi lấy danh sách phường/xã:", error))
    }
  }, [kycData.district])

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
  
    if (!kycData.nationalId.trim()) {
      newErrors.nationalId = "Số CMND/CCCD là bắt buộc";
    } else if (!/^\d{9,12}$/.test(kycData.nationalId)) {
      newErrors.nationalId = "Số CMND/CCCD phải có 9-12 chữ số";
    }
  
    if (!kycData.firstName.trim()) {
      newErrors.firstName = "Tên là bắt buộc";
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(kycData.firstName)) {
      newErrors.firstName = "Tên chỉ được chứa chữ cái và khoảng trắng";
    }
  
    if (!kycData.middleName.trim()) {
      newErrors.middleName = "Tên đệm là bắt buộc";
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(kycData.middleName)) {
      newErrors.middleName = "Tên đệm chỉ được chứa chữ cái và khoảng trắng";
    }
  
    if (!kycData.lastName.trim()) {
      newErrors.lastName = "Họ là bắt buộc";
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(kycData.lastName)) {
      newErrors.lastName = "Họ chỉ được chứa chữ cái và khoảng trắng";
    }
  
    if (!kycData.gender) newErrors.gender = "Giới tính là bắt buộc";
  
    if (!kycData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10,11}$/.test(kycData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    }
  
    if (!kycData.birthday) {
      newErrors.birthday = "Ngày sinh là bắt buộc";
    } else {
      const birthDate = new Date(kycData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) newErrors.birthday = "Phải ít nhất 18 tuổi";
    }
  
    if (!kycData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
    if (!kycData.province) newErrors.province = "Tỉnh/Thành phố là bắt buộc";
    if (!kycData.district) newErrors.district = "Quận/Huyện là bắt buộc";
    if (!kycData.ward) newErrors.ward = "Phường/Xã là bắt buộc";
    if (!kycData.frontImage) newErrors.frontImage = "Ảnh mặt trước là bắt buộc";
    if (!kycData.backImage) newErrors.backImage = "Ảnh mặt sau là bắt buộc";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm chuyển đổi định dạng ngày từ dd/mm/yyyy sang ISO
  const formatDateToISO = (dateStr: string): string => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      // Retrieve userData from localStorage
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const userId = userData.id; // Get userId from userData
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
  
      // Convert file to base64 for upload
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
  
      const frontImageBase64 = kycData.frontImage ? await toBase64(kycData.frontImage) : null;
      const backImageBase64 = kycData.backImage ? await toBase64(kycData.backImage) : null;
  
      // Send request to API route to upload images
      const uploadResponse = await axios.post("/api/upload-to-drive", {
        nationalId: kycData.nationalId,
        frontImage: frontImageBase64,
        backImage: backImageBase64,
      });
  
      const { frontImageUrl, backImageUrl } = uploadResponse.data;
  
      // Prepare payload for KYC API
      const kycPayload = {
        fullName: `${kycData.lastName} ${kycData.middleName} ${kycData.firstName}`.trim(),
        firstName: kycData.firstName,
        lastName: kycData.lastName,
        middleName: kycData.middleName,
        address: kycData.address,
        dateOfBirth: formatDateToISO(kycData.birthday),
        gender: kycData.gender,
        phone: kycData.phone,
        idCardFrontImgUrl: frontImageUrl,
        idCardBackImgUrl: backImageUrl,
        ward: wards.find((w) => w.id === kycData.ward)?.full_name || kycData.ward,
        district: districts.find((d) => d.id === kycData.district)?.full_name || kycData.district,
        province: provinces.find((p) => p.id === kycData.province)?.full_name || kycData.province,
        nation: kycData.country,
        idNumber: kycData.nationalId,
      };
  
      // Send request to KYC API
      await axios.put(`https://be-crypto-depot.name.vn/api/Kyc/ventify/${userId}`, kycPayload);
  
      // Update userData in localStorage with kycStatus: true
      const updatedUserData = { ...userData, kycStatus: true };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
  
      alert("KYC đã hoàn tất. Hồ sơ của bạn sẽ được xem xét trong vòng 24 giờ!");
      router.push("/");
    } catch (error: any) {
      console.error("Lỗi khi gửi KYC:", error);
      // Lấy thông báo lỗi từ API hoặc sử dụng thông báo mặc định
      const errorMessage =
        error.response?.data?.message ||
        "Gửi KYC thất bại. Vui lòng kiểm tra thông tin và thử lại.";
      setErrors((prev) => ({ ...prev, submit: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

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
        Tải lên tài liệu và thông tin cá nhân
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
            label="Quốc gia"
            value="Việt Nam"
            InputProps={{ readOnly: true, sx: { fontWeight: "bold", fontSize: "1.2rem" } }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Số CMND/CCCD"
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
              Mặt trước CMND/CCCD
            </Typography>
            <Box sx={{ width: "100%", position: "relative" }}>
              {kycData.frontImagePreview && (
                <CardMedia
                  component="img"
                  image={kycData.frontImagePreview}
                  alt="Ảnh xem trước mặt trước"
                  sx={{ borderRadius: "8px", height: 200, objectFit: "contain", maxWidth: "100%" }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}
              >
                {kycData.frontImage ? "Tải lại" : "Tải lên"}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleChange("frontImage", e.target.files?.[0] || null)}
                />
              </Button>
              {!kycData.frontImage && (
                <Typography variant="caption" sx={{ mt: 10, display: "block", textAlign: "center", pt: 5 }}>
                  Tải lên tối đa 50MB, định dạng: .jpg, .png, .pdf
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
              Mặt sau CMND/CCCD
            </Typography>
            <Box sx={{ width: "100%", position: "relative" }}>
              {kycData.backImagePreview && (
                <CardMedia
                  component="img"
                  image={kycData.backImagePreview}
                  alt="Ảnh xem trước mặt sau"
                  sx={{ borderRadius: "8px", height: 200, objectFit: "contain", maxWidth: "100%" }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}
              >
                {kycData.backImage ? "Tải lại" : "Tải lên"}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleChange("backImage", e.target.files?.[0] || null)}
                />
              </Button>
              {!kycData.backImage && (
                <Typography variant="caption" sx={{ mt: 10, display: "block", textAlign: "center", pt: 5 }}>
                  Tải lên tối đa 50MB, định dạng: .jpg, .png, .pdf
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
            label="Tên"
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
            label="Tên đệm"
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
            label="Họ"
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
            label="Giới tính"
            value={kycData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            required
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Số điện thoại"
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
            label="Ngày sinh"
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
            label="Tỉnh/Thành phố"
            value={kycData.province}
            onChange={(e) => handleChange("province", e.target.value)}
            required
            error={!!errors.province}
            helperText={errors.province}
          >
            <MenuItem value="">Chọn tỉnh/thành phố</MenuItem>
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
            label="Quận/Huyện"
            value={kycData.district}
            onChange={(e) => handleChange("district", e.target.value)}
            required
            disabled={!kycData.province}
            error={!!errors.district}
            helperText={errors.district}
          >
            <MenuItem value="">Chọn quận/huyện</MenuItem>
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
            label="Phường/Xã"
            value={kycData.ward}
            onChange={(e) => handleChange("ward", e.target.value)}
            required
            disabled={!kycData.district}
            error={!!errors.ward}
            helperText={errors.ward}
          >
            <MenuItem value="">Chọn phường/xã</MenuItem>
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
            label="Địa chỉ"
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
          {isSubmitting ? "Đang gửi..." : "Xác nhận"}
        </Button>
      </Box>
    </Box>
  )
}

export default KycCenter