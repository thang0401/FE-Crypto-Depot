"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import FormHelperText from "@mui/material/FormHelperText"
import { styled } from "@mui/material/styles"
import Icon from "src/@core/components/icon"
import { Checkbox, FormControlLabel } from "@mui/material"

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}))

interface FormData {
  email: string
  password: string
  rePassword: string
}

interface FormErrors {
  email: string
  password: string
  rePassword: string
}

const RegisterDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", rePassword: "" })
  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "", rePassword: "" })

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: FormErrors = { email: "", password: "", rePassword: "" }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
      isValid = false
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ (ví dụ: user@domain.com)"
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
      isValid = false
    }

    // Re-password validation
    if (!formData.rePassword) {
      newErrors.rePassword = "Vui lòng xác nhận mật khẩu"
      isValid = false
    } else if (formData.password !== formData.rePassword) {
      newErrors.rePassword = "Mật khẩu không khớp"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle successful form submission
      console.log("Form submitted:", formData)
      // You can add API call here
      onClose()
    }
  }

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
    // Clear error when user starts typing
    setErrors({ ...errors, [field]: "" })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Đăng ký tài khoản
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 1, px: 3 }}>
        <Box sx={{ maxWidth: 400, mx: "auto" }}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              label="Email"
              placeholder="user@domain.com"
              sx={{ mb: 3 }}
              value={formData.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel htmlFor="auth-register-password">Mật khẩu</InputLabel>
              <OutlinedInput
                label="Mật khẩu"
                id="auth-register-password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel htmlFor="auth-register-repassword">Xác nhận mật khẩu</InputLabel>
              <OutlinedInput
                label="Xác nhận mật khẩu"
                id="auth-register-repassword"
                type={showPassword ? "text" : "password"}
                value={formData.rePassword}
                onChange={handleChange("rePassword")}
                error={!!errors.rePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.rePassword && <FormHelperText error>{errors.rePassword}</FormHelperText>}
            </FormControl>
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem", color: "text.secondary" } }}
              control={<Checkbox />}
              label={
                <>
                  <Typography variant="body2" component="span">
                    {/* I agree to{' '} */}
                    Tôi đồng ý với {""}
                  </Typography>
                  <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
                    {/* privacy policy & terms */}
                    điều khoản và điều kiện
                  </LinkStyled>
                </>
              }
            />
            <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 2 }}>
              Đăng ký
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Bạn đã có tài khoản?
              </Typography>
              <Typography>
                <LinkStyled href="/login">Đăng nhập ngay</LinkStyled>
              </Typography>
            </Box>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <IconButton href='/' component={Link} sx={{ color: '#db4437' }}  onClick={e => e.preventDefault()}>
                <Icon icon='bxl:google' />
              </IconButton>
            </Box> */}
          </form>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Hủy</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RegisterDialog
