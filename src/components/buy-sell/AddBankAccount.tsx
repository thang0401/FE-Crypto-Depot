"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import { Check, ExpandMore, Error } from "@mui/icons-material"

import { Button } from "@mui/material"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { DialogActions } from "@mui/material"
import { TextField } from "@mui/material"
import { FormControl, InputLabel } from "@mui/material"
import { Select, MenuItem } from "@mui/material"
import { Alert, AlertTitle } from "@mui/material"
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material"
import { FormHelperText } from "@mui/material"
import { Autocomplete } from "@mui/material"

interface Bank {
  id: number
  name: string
  code: string
  bin: string
  shortName: string
  logo: string
}

interface AddBankAccountProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

const AddBankAccount = ({ open, onOpenChange, onSuccess }: AddBankAccountProps) => {
  const [banks, setBanks] = useState<Bank[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to remove Vietnamese accents
  const removeVietnameseAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, m => m === "đ" ? "d" : "D");
  }

  // Fetch banks from API
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://api.vietqr.io/v2/banks")
        if (response.data.code === "00" && response.data.data) {
          setBanks(response.data.data)
        }
      } catch (err) {
        console.error("Error fetching banks:", err)
        setError("Không thể tải danh sách ngân hàng. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchBanks()
    }
  }, [open])

  const handleSubmit = async () => {
    // Validate form
    if (!selectedBank) {
      setError("Vui lòng chọn ngân hàng")
      return
    }
    if (!accountNumber.trim()) {
      setError("Vui lòng nhập số tài khoản")
      return
    }
    if (!accountName.trim()) {
      setError("Vui lòng nhập tên tài khoản")
      return
    }

    setError(null)
    setIsSubmitting(true)

    const userData = localStorage.getItem("userData")
    if (userData) {
      try {
        // Get userId from localStorage
        const parsedData = JSON.parse(userData)
        const userId = parsedData.id

        // Convert Vietnamese name to non-accented name
        const nonAccentedName = removeVietnameseAccents(accountName)

        // Submit data to API
        await axios.post(`https://be-crypto-depot.name.vn/api/BankAccount/AddAccount/${userId}`, {
          accountNumber: accountNumber,
          userId: userId,
          accontName: nonAccentedName, // Send non-accented name to API
          bankName: selectedBank.shortName,
          describe: selectedBank.name,
        })

        // Update localStorage to indicate user has a bank account
        parsedData.isBankAccount = true
        localStorage.setItem("userData", JSON.stringify(parsedData))

        // Reset form and close dialog
        setSelectedBank(null)
        setAccountNumber("")
        setAccountName("")
        onOpenChange(false)

        // Call success callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } catch (err) {
        console.error("Error adding bank account:", err)
        setError("Đã có lỗi xảy ra khi thêm tài khoản ngân hàng. Vui lòng thử lại.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
        Thêm tài khoản ngân hàng
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
            <AlertTitle>Lỗi</AlertTitle>
            {error}
          </Alert>
        )}

        <Box sx={{ my: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Autocomplete
              options={banks}
              getOptionLabel={(option) => option.shortName}
              value={selectedBank}
              onChange={(event, newValue) => {
                setSelectedBank(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} label="Ngân hàng" variant="outlined" />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={option.logo || "/placeholder.svg"}
                    alt={option.shortName}
                    width={50}
                    height={24}
                    style={{ marginRight: 8 }}
                  />
                  <span>{option.shortName}</span>
                  {selectedBank?.id === option.id && (
                    <Check style={{ marginLeft: "auto" }} />
                  )}
                </Box>
              )}
              loading={loading}
              noOptionsText="Không tìm thấy ngân hàng"
            />
          </FormControl>

          <TextField
            fullWidth
            label="Số tài khoản"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            margin="normal"
            variant="outlined"
            placeholder="Nhập số tài khoản"
          />

          <TextField
            fullWidth
            label="Tên tài khoản"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            margin="normal"
            variant="outlined"
            placeholder="Nhập tên tài khoản"
          />

          {accountName && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {/* Tên sẽ được lưu: <strong>{removeVietnameseAccents(accountName)}</strong> */}
            </Typography>
          )}

          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: "rgba(255, 235, 59, 0.1)", 
              p: 2, 
              mt: 2, 
              borderRadius: 1 
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Lưu ý:</Typography>
            <List dense disablePadding sx={{ pl: 5}}>
              <ListItem sx={{ display: "list-item", listStyleType: "disc", py: 0.5 }}>
                <ListItemText 
                  primary="Kiểm tra để đảm bảo thông tin tài khoản là chính xác" 
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                />
              </ListItem>
              <ListItem sx={{ display: "list-item", listStyleType: "disc", py: 0.5 }}>
                <ListItemText 
                  primary="Giao dịch sẽ gặp lỗi nếu thông tin tài khoản không chính xác" 
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={handleClose} variant="outlined">
          Hủy
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xử lý..." : "Tạo"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBankAccount