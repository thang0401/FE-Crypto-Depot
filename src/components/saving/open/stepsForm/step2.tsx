"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  type SelectChangeEvent,
} from "@mui/material"
import { StyledCard } from "../styled-components"

interface Step2Props {
  formData: {
    sourceAccount: string
    amount: string
    term: string
    interestPayment: string
    verificationMethod: string
  }
  accounts: Array<{ id: string; label: string; balance: string }>
  terms: Array<{ value: string; label: string; interest: string }>
  onFieldChange: (field: string, value: string) => void
  showValidation?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export const Step2 = React.memo(({ 
  formData, 
  accounts, 
  terms, 
  onFieldChange, 
  showValidation = false, 
  onValidationChange
}: Step2Props) => {
  // Validation state
  const errors = {
    verificationMethod: !formData.verificationMethod && showValidation,
  }

  // Check if form is valid
  const isFormValid = React.useMemo(() => {
    return !!formData.verificationMethod;
  }, [formData]);

  // Update parent component about validation status
  React.useEffect(() => {
    onValidationChange?.(Boolean(isFormValid));
  }, [isFormValid, onValidationChange]);

  const handleVerificationMethodChange = React.useCallback(
    (event: SelectChangeEvent<string>) => {
      onFieldChange("verificationMethod", event.target.value)
    },
    [onFieldChange],
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {showValidation && !isFormValid && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Vui lòng chọn phương thức xác thực
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold", p: 2 }}>
              Xác nhận thông tin
            </Typography>
            <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
              {[ 
                { label: "Tài khoản nguồn", value: accounts.find((a) => a.id === formData.sourceAccount)?.label },
                { label: "Số tiền gửi", value: `${formData.amount} USDC` },
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
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold", p: 2 }}>
              Phương thức xác thực
            </Typography>
            <FormControl fullWidth error={errors.verificationMethod} sx={{ px: 2, pb: 2 }}>
              <InputLabel>Chọn phương thức xác thực</InputLabel>
              <Select
                value={formData.verificationMethod}
                onChange={handleVerificationMethodChange}
                label="Chọn phương thức xác thực"
              >
                <MenuItem value="password">Mật khẩu đăng nhập</MenuItem>
                <MenuItem value="sms">OTP điện thoại</MenuItem>
                <MenuItem value="email">OTP email</MenuItem>
              </Select>
              {errors.verificationMethod && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  Vui lòng chọn phương thức xác thực
                </Typography>
              )}
            </FormControl>
          </StyledCard>
        </Grid>
      </Grid>
    </motion.div>
  )
})

Step2.displayName = "Step2"
