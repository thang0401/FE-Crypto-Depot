"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  DialogContentText,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import UploadIcon from "@mui/icons-material/Upload"
import { format } from "date-fns"

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}))

interface SavingsAccount {
  id: string
  status: "active" | "pending" | "completed"
  heirStatus: "no_heir" | "has_heir" | "in_process"
  owner: { id: string; name: string; email: string; phone: string }
  term: string
  startDate: string
  endDate: string
  balance: string
  supportStaff: string
  contractUrl: string
  googleDriveUrl: string
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd/MM/yyyy")
}

const AccountDetails: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [editedAccount, setEditedAccount] = useState<SavingsAccount | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  useEffect(() => {
    if (!id) return

    const mockAccounts: SavingsAccount[] = [
      {
        id: "SAV001",
        status: "active",
        heirStatus: "no_heir",
        owner: { id: "USRER001", name: "Nguyen Van Thuan", email: "thuannv.it@gmail.com", phone: "+8434567890" },
        term: "12 tháng",
        startDate: "2024-02-24",
        endDate: "2025-02-24",
        balance: "50 USDC",
        supportStaff: "Staff01",
        contractUrl: "",
        googleDriveUrl: "",
      },
      {
        id: "SAV002",
        status: "pending",
        heirStatus: "has_heir",
        owner: { id: "USRER002", name: "Tran Huu Luan", email: "luantr@gmail.com", phone: "+8434567891" },
        term: "6 tháng",
        startDate: "2024-02-25",
        endDate: "2024-08-25",
        balance: "3 USDC",
        supportStaff: "Staff02",
        contractUrl: "",
        googleDriveUrl: "",
      },
    ]
    const account = mockAccounts.find((acc) => acc.id === id)
    setEditedAccount(account || null)
  }, [id])

  const handleInputChange = (field: string, value: string) => {
    if (editedAccount) {
      const updatedAccount = { ...editedAccount }
      if (field.startsWith("owner.")) {
        const ownerField = field.split(".")[1]
        updatedAccount.owner = { ...updatedAccount.owner, [ownerField]: value }
      } else {
        ;(updatedAccount as any)[field] = value
      }
      setEditedAccount(updatedAccount)
      setHasChanges(true)
    }
  }

  const handleSubmit = () => {
    if (hasChanges) {
      setConfirmDialogOpen(true)
    }
  }

  const handleConfirmSubmit = () => {
    console.log("Lưu thay đổi:", editedAccount)
    setConfirmDialogOpen(false)
    setHasChanges(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleUploadComplete = () => {
    if (uploadedFile && editedAccount) {
      const fileUrl = URL.createObjectURL(uploadedFile)
      handleInputChange("contractUrl", fileUrl)
      setUploadDialogOpen(false)
      setUploadProgress(0)
    }
  }

  const StatusChip = ({ status }: { status: string }) => {
    const getStatusColor = () => {
      switch (status) {
        case "no_heir":
          return { bg: "#fff3e0", color: "#f57c00" }
        case "has_heir":
          return { bg: "#e8f5e9", color: "#43a047" }
        case "in_process":
          return { bg: "#e3f2fd", color: "#1976d2" }
        default:
          return { bg: "#f5f5f5", color: "#757575" }
      }
    }
    const { bg, color } = getStatusColor()
    return <Chip label={status.replace("_", " ").toUpperCase()} style={{ backgroundColor: bg, color }} />
  }

  if (!editedAccount) {
    return <Typography>Tài khoản không được tìm thấy</Typography>
  }

  return (
    <Box sx={{ p: 3 }}>
      <StyledCard>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Chi tiết tài khoản - {editedAccount.id}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Trạng thái
                </Typography>
                <StatusChip status={editedAccount.heirStatus} />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Số dư hiện tại
                </Typography>
                <Typography variant="h5">{editedAccount.balance}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mã tài khoản"
                      value={editedAccount.id}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Kỳ hạn"
                      value={editedAccount.term}
                      onChange={(e) => handleInputChange("term", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ngày bắt đầu"
                      value={formatDate(editedAccount.startDate)}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ngày kết thúc"
                      value={formatDate(editedAccount.endDate)}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nhân viên hỗ trợ"
                      value={editedAccount.supportStaff}
                      onChange={(e) => handleInputChange("supportStaff", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="URL Google Drive"
                      value={editedAccount.googleDriveUrl}
                      onChange={(e) => handleInputChange("googleDriveUrl", e.target.value)}
                      placeholder="Chưa cung cấp URL"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Thông tin chủ sở hữu
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={editedAccount.owner.name}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mã định danh"
                      value={editedAccount.owner.id}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={editedAccount.owner.email}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={editedAccount.owner.phone}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Tài liệu hợp đồng
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<UploadIcon />}
                    onClick={() => setUploadDialogOpen(true)}
                  >
                    Tải lên hợp đồng
                  </Button>
                </Box>
                {editedAccount.contractUrl && (
                  <Alert severity="success">
                    Hợp đồng đã được tải lên thành công.
                    <Button
                      color="inherit"
                      size="small"
                      href={editedAccount.contractUrl}
                      target="_blank"
                    >
                      Xem hợp đồng
                    </Button>
                  </Alert>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => router.push("/savings-management")}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!hasChanges}
                >
                  Lưu thay đổi
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      <Dialog open={isConfirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Xác nhận thay đổi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn lưu các thay đổi cho tài khoản tiết kiệm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Tải lên hợp đồng</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="contract-file-input"
            />
            <label htmlFor="contract-file-input">
              <Button variant="outlined" component="span" startIcon={<UploadIcon />}>
                Chọn tệp
              </Button>
            </label>
          </Box>
          {uploadProgress > 0 && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" color="text.secondary" align="center">
                {uploadProgress}%
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Hủy</Button>
          <Button
            color="primary"
            onClick={handleUploadComplete}
            disabled={uploadProgress > 0 && uploadProgress < 100}
          >
            Tải lên
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AccountDetails