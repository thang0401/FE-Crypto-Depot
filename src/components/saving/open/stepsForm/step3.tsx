"use client"

import React from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Typography, Grid, TextField, Alert, AlertTitle } from "@mui/material"
import { StyledCard } from "../styled-components"

interface Step3Props {
  formData: { sourceAccount: string; amount: string; term: string; verificationMethod: string; otp: string }
  accounts: Array<{ id: string; label: string; balance: string }>
  terms: Array<{ value: string; label: string; interest: string }>
  onFieldChange: (field: string, value: string) => void
  showValidation: boolean
  onValidationChange: (isValid: boolean) => void
}

export const Step3 = React.memo(
  ({ formData, accounts, terms, onFieldChange, showValidation, onValidationChange }: Step3Props) => {
    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      onFieldChange("otp", value)
      onValidationChange(!!value)
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                Xác minh giao dịch
              </Typography>
              <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
                <Grid item xs={12}>
                  <Typography>Xác minh bằng dấu vân tay của bạn ở bước tiếp theo.</Typography>
                </Grid>
              </Grid>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                Thông tin giao dịch
              </Typography>
              <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
                {[
                  {
                    label: "Tài khoản nguồn",
                    value: accounts.find((a) => a.id === formData.sourceAccount)?.label,
                  },
                  {
                    label: "Số tiền gửi",
                    value: `${formData.amount} USDC`,
                    style: { fontWeight: "bold", color: "red", fontSize: 14 },
                  },
                  { label: "Kỳ hạn", value: terms.find((t) => t.value === formData.term)?.label },
                  { label: "Lãi suất", value: terms.find((t) => t.value === formData.term)?.interest },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "medium" }}>{item.label}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={item.style}>{item.value}</Typography>
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

Step3.displayName = "Step3"