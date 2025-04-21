"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  CardContent,
  Paper,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
  Tooltip,
  Chip,
  type SelectChangeEvent,
} from "@mui/material"
import { SwapHoriz, CurrencyExchange, Info } from "@mui/icons-material"
import { DashboardCard } from "../styled-components"

// Exchange rates data
const exchangeRates = {
  USDC_VND: 25000,
  VND_USDC: 1 / 25000,
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<string>("VND")
  const [toCurrency, setToCurrency] = useState<string>("USDC")
  const [amount, setAmount] = useState<string>("250000")
  const [convertedAmount, setConvertedAmount] = useState<string>("10.00")
  const [exchangeRate, setExchangeRate] = useState<number>(exchangeRates.VND_USDC)

  const handleFromCurrencyChange = (event: SelectChangeEvent) => {
    const newFromCurrency = event.target.value as string
    setFromCurrency(newFromCurrency)

    if (newFromCurrency === "VND" && toCurrency === "VND") {
      setToCurrency("USDC")
      setExchangeRate(exchangeRates.VND_USDC)
    } else if (newFromCurrency === "USDC" && toCurrency === "USDC") {
      setToCurrency("VND")
      setExchangeRate(exchangeRates.USDC_VND)
    } else if (newFromCurrency === "VND" && toCurrency === "USDC") {
      setExchangeRate(exchangeRates.VND_USDC)
    } else {
      setExchangeRate(exchangeRates.USDC_VND)
    }
  }

  const handleToCurrencyChange = (event: SelectChangeEvent) => {
    const newToCurrency = event.target.value as string
    setToCurrency(newToCurrency)

    if (fromCurrency === "VND" && newToCurrency === "USDC") {
      setExchangeRate(exchangeRates.VND_USDC)
    } else if (fromCurrency === "USDC" && newToCurrency === "VND") {
      setExchangeRate(exchangeRates.USDC_VND)
    } else if (fromCurrency === "VND" && newToCurrency === "VND") {
      setFromCurrency("USDC")
      setExchangeRate(exchangeRates.USDC_VND)
    } else {
      setFromCurrency("VND")
      setExchangeRate(exchangeRates.VND_USDC)
    }
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value
    setAmount(newAmount)

    if (newAmount && !isNaN(Number(newAmount))) {
      const converted = (Number(newAmount) * exchangeRate).toFixed(2)
      setConvertedAmount(converted)
    } else {
      setConvertedAmount("0.00")
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(convertedAmount)
    setExchangeRate(1 / exchangeRate)
    setConvertedAmount(amount)
  }

  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      const converted = (Number(amount) * exchangeRate).toFixed(2)
      setConvertedAmount(converted)
    }
  }, [exchangeRate, amount])

  return (
    <DashboardCard>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Tỷ giá & Quy đổi tiền tệ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Tỷ giá hiện tại: 1 USDC = 25,000 VND">
              <IconButton size="small">
                <Info />
              </IconButton>
            </Tooltip>
            <Chip
              icon={<CurrencyExchange />}
              label="Cập nhật: Hôm nay, 10:30 sáng"
              size="small"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </Box>
        </Box>

        <Paper sx={{ p: 3, borderRadius: "16px", mb: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Từ
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <TextField
                    fullWidth
                    value={amount}
                    onChange={handleAmountChange}
                    variant="outlined"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <FormControl variant="standard" sx={{ minWidth: 80 }}>
                          <Select value={fromCurrency} onChange={handleFromCurrencyChange} sx={{ ml: 1 }}>
                            <MenuItem value="VND">VND</MenuItem>
                            <MenuItem value="USDC">USDC</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={1} sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                onClick={handleSwapCurrencies}
                sx={{ height: 40, width: 40 }}
              >
                <SwapHoriz />
              </IconButton>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Đến
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <TextField
                    fullWidth
                    value={convertedAmount}
                    variant="outlined"
                    disabled
                    InputProps={{
                      endAdornment: (
                        <FormControl variant="standard" sx={{ minWidth: 80 }}>
                          <Select value={toCurrency} onChange={handleToCurrencyChange} sx={{ ml: 1 }}>
                            <MenuItem value="VND">VND</MenuItem>
                            <MenuItem value="USDC">USDC</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CurrencyExchange />}
                sx={{
                  height: "56px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  marginTop: "25px"
                }}
              >
                Quy đổi tiền tệ
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">
              Tỷ giá: 1 {fromCurrency} = {fromCurrency === "USDC" ? "25,000" : "0.00004"} {toCurrency}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Miễn phí quy đổi cho tài khoản Premium
            </Typography>
          </Box>
        </Paper>
      </CardContent>
    </DashboardCard>
  )
}