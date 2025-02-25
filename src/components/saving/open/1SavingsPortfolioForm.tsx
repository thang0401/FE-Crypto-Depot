"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react"
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
  Paper,
  useTheme,
  styled,
} from "@mui/material"

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: "bold",
}))

const SavingsPortfolioForm = () => {
  const theme = useTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    sourceAccount: "",
    balance: "",
    amount: "",
    term: "",
    method: "",
    interestPayment: "",
    agreeToTerms: false,
    verificationMethod: "",
    otp: "",
  })

  // Sample data
  const accounts = [
    { id: "1", label: "Tài khoản chính - 123456789", balance: "100,000,000 VND" },
    { id: "2", label: "Tài khoản phụ - 987654321", balance: "50,000,000 VND" },
  ]

  const terms = [
    { value: "1M", label: "1 tháng", interest: "3.8%" },
    { value: "3M", label: "3 tháng", interest: "4.0%" },
    { value: "6M", label: "6 tháng", interest: "4.5%" },
    { value: "12M", label: "12 tháng", interest: "5.0%" },
  ]

  const handleNext = () => setCurrentStep((prev) => prev + 1)
  const handleBack = () => setCurrentStep((prev) => prev - 1)
  const handleSubmit = () => (currentStep === 3 ? console.log("Form submitted:", formData) : handleNext())

  const Step1 = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Tài khoản nguồn
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Chọn tài khoản</InputLabel>
                <Select
                  value={formData.sourceAccount}
                  onChange={(e) => setFormData({ ...formData, sourceAccount: e.target.value })}
                  label="Chọn tài khoản"
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                Số dư: {accounts.find((a) => a.id === formData.sourceAccount)?.balance || "0 VND"}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Thông tin gửi
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số tiền gửi"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Kỳ hạn</InputLabel>
                    <Select
                      value={formData.term}
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                      label="Kỳ hạn"
                    >
                      {terms.map((term) => (
                        <MenuItem key={term.value} value={term.value}>
                          {term.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "#f0f4f8",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Lãi suất: {terms.find((t) => t.value === formData.term)?.interest || "0%"}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Hình thức trả lãi</InputLabel>
                    <Select
                      value={formData.interestPayment}
                      onChange={(e) => setFormData({ ...formData, interestPayment: e.target.value })}
                      label="Hình thức trả lãi"
                    >
                      <MenuItem value="end">Cuối kỳ</MenuItem>
                      <MenuItem value="monthly">Hàng tháng</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              />
            }
            label="Tôi đồng ý với điều khoản và điều kiện"
          />
        </Grid>
      </Grid>
    </motion.div>
  )

  const Step2 = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Xác nhận thông tin
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: "Tài khoản nguồn", value: accounts.find((a) => a.id === formData.sourceAccount)?.label },
                  { label: "Số tiền gửi", value: `${formData.amount} VND` },
                  { label: "Kỳ hạn", value: terms.find((t) => t.value === formData.term)?.label },
                  { label: "Lãi suất", value: terms.find((t) => t.value === formData.term)?.interest },
                  { label: "Hình thức trả lãi", value: formData.interestPayment === "end" ? "Cuối kỳ" : "Hàng tháng" },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "medium" }}>{item.label}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{item.value}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Phương thức xác thực
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Chọn phương thức xác thực</InputLabel>
                <Select
                  value={formData.verificationMethod}
                  onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value })}
                  label="Chọn phương thức xác thực"
                >
                  <MenuItem value="password">Mật khẩu đăng nhập</MenuItem>
                  <MenuItem value="sms">OTP điện thoại</MenuItem>
                  <MenuItem value="email">OTP email</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </motion.div>
  )

  const Step3 = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Xác thực giao dịch
              </Typography>
              <TextField
                fullWidth
                label="Nhập mã OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Alert severity="info" icon={<AlertCircle />}>
                <AlertTitle>Thông báo</AlertTitle>
                Mã OTP đã được gửi đến {formData.verificationMethod === "sms" ? "điện thoại" : "email"} của bạn
              </Alert>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Thông tin giao dịch
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: "Tài khoản nguồn", value: accounts.find((a) => a.id === formData.sourceAccount)?.label },
                  { label: "Số tiền gửi", value: `${formData.amount} VND` },
                  { label: "Kỳ hạn", value: terms.find((t) => t.value === formData.term)?.label },
                  { label: "Lãi suất", value: terms.find((t) => t.value === formData.term)?.interest },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "medium" }}>{item.label}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{item.value}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </motion.div>
  )

  return (
    <Box
      sx={{
        bgcolor: "#f0f4f8",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #f6f0fd 0%, #e2ecfe 100%)",
            mb: 4,
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              {[1, 2, 3].map((step) => (
                <Box key={step} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: currentStep === step ? "#3f51b5" : currentStep > step ? "#4caf50" : "#e0e0e0",
                      color: currentStep >= step ? "white" : "text.secondary",
                      transition: "0.3s",
                    }}
                  >
                    {currentStep > step ? <Check /> : step}
                  </Box>
                  {step < 3 && (
                    <Box
                      sx={{
                        width: "100px",
                        height: 2,
                        bgcolor: currentStep > step ? "#4caf50" : "#e0e0e0",
                        transition: "0.3s",
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
              <Typography sx={{ color: "text.secondary" }}>Thông tin</Typography>
              <Typography sx={{ color: "text.secondary" }}>Xác nhận</Typography>
              <Typography sx={{ color: "text.secondary" }}>Xác thực</Typography>
            </Box>
          </Box>

          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <StyledButton
              variant="outlined"
              onClick={handleBack}
              disabled={currentStep === 1}
              startIcon={<ArrowLeft />}
              sx={{
                borderColor: "#3f51b5",
                color: "#3f51b5",
                "&:hover": {
                  borderColor: "#283593",
                  color: "#283593",
                },
              }}
            >
              Quay lại
            </StyledButton>

            <StyledButton
              variant="contained"
              onClick={handleSubmit}
              endIcon={currentStep !== 3 && <ArrowRight />}
              sx={{
                bgcolor: "#3f51b5",
                "&:hover": {
                  bgcolor: "#283593",
                },
                boxShadow: "0 4px 14px 0 rgba(63,81,181,0.39)",
              }}
            >
              {currentStep === 3 ? "Hoàn thành" : "Tiếp tục"}
            </StyledButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default SavingsPortfolioForm

