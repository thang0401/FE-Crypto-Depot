import {
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Divider,
  InputAdornment,
  Alert,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { StyledCard, SectionHeader, SectionNumber, SectionContainer } from "./styled-components"
import type { User, TransactionDetails, FormErrors } from "./type"

interface TransactionFormProps {
  selectedUser: User
  availableBalance: string
  transaction: TransactionDetails
  formErrors: FormErrors
  isSubmitting: boolean
  successMessage: string
  showPasscode: boolean
  passcodeErrorDialog: boolean
  onTransactionChange: (field: keyof TransactionDetails, value: string) => void
  onSubmit: () => void
  onTogglePasscode: () => void
  onClosePasscodeError: () => void
}

export default function TransactionForm({
  selectedUser,
  availableBalance,
  transaction,
  formErrors,
  isSubmitting,
  successMessage,
  showPasscode,
  passcodeErrorDialog,
  onTransactionChange,
  onSubmit,
  onTogglePasscode,
  onClosePasscodeError,
}: TransactionFormProps) {
  return (
    <StyledCard>
      <CardContent>
        <SectionHeader>
          <Typography variant="h6">Chi tiết giao dịch</Typography>
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <AccountBalanceWalletIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="subtitle1" sx={{ mr: 1, color: "text.secondary" }}>
              Số dư khả dụng:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {availableBalance} USDC
            </Typography>
          </Box>
        </SectionHeader>

        <Divider sx={{ mb: 4 }} />

        {/* Phần thông tin người nhận */}
        <SectionContainer>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SectionNumber>1</SectionNumber>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Thông tin người nhận
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={selectedUser.name}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={selectedUser.phone}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </SectionContainer>

        {/* Phần thông tin giao dịch */}
        <SectionContainer>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SectionNumber>2</SectionNumber>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Thông tin giao dịch
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số tiền"
                value={transaction.amount}
                onChange={(e) => onTransactionChange("amount", e.target.value)}
                type="number"
                error={formErrors.amount}
                helperText={
                  formErrors.amount
                    ? Number.parseFloat(transaction.amount || "0") + Number.parseFloat(transaction.fee) >
                      Number.parseFloat(availableBalance)
                      ? "Số tiền vượt quá số dư khả dụng"
                      : "Vui lòng nhập số tiền hợp lệ"
                    : ""
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end">USDC</InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", height: "100%", pl: 2 }}>
                <Typography variant="subtitle2" sx={{ mr: 2 }}>
                  Phí giao dịch:
                </Typography>
                <Chip label={`${transaction.fee} USDC`} size="small" variant="outlined" />
              </Box>
            </Grid>
          </Grid>
        </SectionContainer>

        {/* Phần bảo mật & xác nhận */}
        <SectionContainer>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SectionNumber>3</SectionNumber>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Bảo mật & Xác nhận
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ghi chú giao dịch (Tùy chọn)"
                value={transaction.note}
                onChange={(e) => onTransactionChange("note", e.target.value)}
                multiline
                rows={2}
                placeholder="Nhập ghi chú cho người nhận"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type={showPasscode ? "text" : "password"}
                label="Mã xác minh giao dịch"
                value={transaction.passCode}
                onChange={(e) => onTransactionChange("passCode", e.target.value)}
                placeholder="Nhập mã 6 chữ số"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onTogglePasscode} edge="end">
                        {showPasscode ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </SectionContainer>

        <Dialog open={passcodeErrorDialog} onClose={onClosePasscodeError}>
          <DialogTitle>Mã xác minh không đúng</DialogTitle>
          <DialogContent>
            <Typography>Mã xác minh bạn nhập không đúng. Vui lòng thử lại.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClosePasscodeError} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box>
            <Typography variant="subtitle2">Tổng số tiền:</Typography>
            <Typography variant="h6">
              {!formErrors.amount && transaction.amount
                ? (Number.parseFloat(transaction.amount) + Number.parseFloat(transaction.fee)).toFixed(2)
                : "0.00"}{" "}
              USDC
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting || !transaction.amount || !transaction.passCode}
            onClick={onSubmit}
            startIcon={<SendIcon />}
            sx={{ borderRadius: "28px", px: 3 }}
          >
            {isSubmitting ? "Đang xử lý..." : "Xác nhận chuyển khoản"}
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  )
}