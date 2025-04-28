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
  formData: { sourceAccount: string; amount: string; term: string; interestPayment: string; verificationMethod: string }
  accounts: Array<{ id: string; label: string; balance: string }>
  terms: Array<{ value: string; label: string; interest: string }>
  onFieldChange: (field: string, value: string) => void
  showValidation?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export const Step2 = React.memo(
  ({ formData, accounts, terms, onFieldChange, showValidation = false, onValidationChange }: Step2Props) => {
    const errors = { verificationMethod: !formData.verificationMethod && showValidation }
    const isFormValid = !!formData.verificationMethod

    React.useEffect(() => {
      onValidationChange?.(Boolean(isFormValid))
    }, [isFormValid, onValidationChange])

    const handleVerificationMethodChange = (event: SelectChangeEvent<string>) => {
      onFieldChange("verificationMethod", event.target.value)
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {showValidation && !isFormValid && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Vui lòng chọn phương thức xác minh
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                Xác nhận thông tin
              </Typography>
              <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
                {[
                  {
                    label: "Tài khoản nguồn",
                    value: accounts.find((a) => a.id === formData.sourceAccount)?.label,
                  },
                  { label: "Số tiền gửi", value: `${formData.amount} USDC` },
                  { label: "Kỳ hạn", value: terms.find((t) => t.value === formData.term)?.label },
                  { label: "Lãi suất", value: terms.find((t) => t.value === formData.term)?.interest },
                  {
                    label: "Phương thức trả lãi",
                    value: formData.interestPayment === "end" ? "Cuối kỳ" : "Hàng tháng",
                  },
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
        </Grid>
      </motion.div>
    )
  }
)

Step2.displayName = "Step2"