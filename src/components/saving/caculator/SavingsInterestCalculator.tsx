"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format, addMonths } from "date-fns"
import RefreshIcon from "@mui/icons-material/Refresh"
import CalculateIcon from "@mui/icons-material/Calculate"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import { useRouter } from "next/navigation"

// Styled components
const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  transition: "0.3s",
  "&:hover": { transform: "translateY(-4px)" },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: "bold",
  margin: "0 8px",
}))

// Interest rates and currencies
const TERMS = [
  { value: "1M", label: "1 Tháng - 3.8%", interest: 3.8 },
  { value: "3M", label: "3 Tháng - 4.0%", interest: 4.0 },
  { value: "6M", label: "6 Tháng - 4.5%", interest: 4.5 },
  { value: "12M", label: "12 Tháng - 5.0%", interest: 5.0 },
]

const CURRENCIES = ["USDC", "ETH"]

const SavingsInterestCalculator: React.FC = () => {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USDC")
  const [term, setTerm] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [showResults, setShowResults] = useState(false)
  const [calculatedResults, setCalculatedResults] = useState<any>(null)

  const handleCalculate = () => {
    if (!amount || !term || !startDate) return

    const interestRate = TERMS.find((t) => t.value === term)?.interest || 0
    const principalAmount = parseFloat(amount.replace(/,/g, ""))
    const maturityDate = addMonths(startDate, parseInt(term.replace("M", "")))

    const interestAmount = principalAmount * (interestRate / 100) * (parseInt(term.replace("M", "")) / 12)
    const totalAmount = principalAmount + interestAmount

    const results = {
      principalAmount,
      interestAmount: Number(interestAmount.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      maturityDate,
      interestRate,
    }

    setCalculatedResults(results)
    setShowResults(true)
  }

  const handleRefresh = () => {
    setAmount("")
    setCurrency("USDC")
    setTerm("")
    setStartDate(new Date())
    setShowResults(false)
    setCalculatedResults(null)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^0-9,.]/g, "")
    const parts = value.split(".")
    if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("")
    value = value.replace(/(?<=\.\d*),/g, "")

    setAmount(value)
  }

  const handleBlur = () => {
    const numericValue = parseFloat(amount.replace(/,/g, ""))
    if (!isNaN(numericValue)) {
      setAmount(numericValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }))
    } else {
      setAmount("")
    }
  }

  const handleOpenSavings = () => {
    router.push(`/saving/add-saving-asset/open`)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ minHeight: "100vh", py: 6 }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "20px" }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
                Máy tính lãi suất tiết kiệm
              </Typography>

              <Grid container spacing={3}>
                {/* Input Box */}
                <Grid item xs={12}>
                  <StyledCard>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                      Chi tiết đầu tư
                    </Typography>
                    <Grid container spacing={3} sx={{ px: 2, pb: 2 }}>
                      {/* Amount and Currency */}
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          label="Số tiền gửi"
                          value={amount}
                          onChange={handleTextChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel>Loại tiền tệ</InputLabel>
                          <Select
                            value={currency}
                            label="Loại tiền tệ"
                            onChange={(e: SelectChangeEvent) => setCurrency(e.target.value)}
                          >
                            {CURRENCIES.map((curr) => (
                              <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Term and Interest Rate */}
                      <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                          <InputLabel>Kỳ hạn</InputLabel>
                          <Select
                            value={term}
                            label="Kỳ hạn"
                            onChange={(e: SelectChangeEvent) => setTerm(e.target.value)}
                          >
                            {TERMS.map((termOption) => (
                              <MenuItem key={termOption.value} value={termOption.value}>
                                {termOption.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2, height: "100%", display: "flex", alignItems: "center" }}>
                          <Typography>
                            Lãi suất: {TERMS.find((t) => t.value === term)?.interest || "0"}%
                          </Typography>
                        </Paper>
                      </Grid>

                      {/* Start Date */}
                      <Grid item xs={12}>
                        <DatePicker
                          label="Ngày bắt đầu"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          format="dd/MM/yyyy"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </StyledCard>
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <StyledButton variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh}>
                    Đặt lại
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    startIcon={<CalculateIcon />}
                    onClick={handleCalculate}
                  >
                    Tính toán
                  </StyledButton>
                </Grid>

                {/* Results Box */}
                {showResults && calculatedResults && (
                  <Grid item xs={12}>
                    <StyledCard>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                        Kết quả tính toán
                      </Typography>
                      <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: "medium" }}>Ngày đáo hạn:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {format(calculatedResults.maturityDate, "dd/MM/yyyy")}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: "medium" }}>
                            Số tiền lãi:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography color="primary">
                            {calculatedResults.interestAmount} {currency}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            Tổng số tiền tiết kiệm:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: "bold", color: "green" }}>
                            {calculatedResults.totalAmount} {currency}
                          </Typography>
                        </Grid>

                        {/* Open Savings Button */}
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                          <StyledButton
                            variant="contained"
                            color="primary"
                            startIcon={<AccountBalanceIcon />}
                            onClick={handleOpenSavings}
                          >
                            Mở tiết kiệm
                          </StyledButton>
                        </Grid>
                      </Grid>
                    </StyledCard>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </LocalizationProvider>
  )
}

export default SavingsInterestCalculator