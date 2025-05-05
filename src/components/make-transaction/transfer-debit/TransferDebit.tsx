'use client';

import type React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Alert,
  IconButton,
  Chip,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Types
interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastTransaction?: string;
  debitAccountId?: string;
}

interface Transaction {
  id: string;
  amount: string;
  transactionType: string;
  transactionHash: string;
  status: string;
  timestamp: string;
}

interface TransactionDetails {
  amount: string;
  fee: string;
  note: string;
  passCode: string;
}

interface FormErrors {
  amount: boolean;
  passCode: boolean;
}

interface DialogState {
  open: boolean;
  message: string;
}

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px",
  },
}));

const RecentUserItem = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "8px",
  margin: "4px 0",
  "&:hover": {
    backgroundColor: "#f0f7ff",
  },
  transition: "background-color 0.2s ease",
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  position: "relative",
}));

const SectionNumber = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "bold",
  height: "24px",
  width: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  marginRight: theme.spacing(1.5),
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
}));

// EmptyState Component
function EmptyState(): JSX.Element {
  return (
    <StyledCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          py: 6,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 80, color: "action.disabled", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" align="center">
          Tìm kiếm người nhận
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Nhập số điện thoại hoặc chọn từ các giao dịch gần đây của bạn
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

// RecipientSearch Component
interface RecipientSearchProps {
  phoneFilter: string;
  selectedUser: User | null;
  recentUsers: Transaction[];
  onPhoneFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUserSelect: (user: User) => void;
  onSearch: () => void;
  dialog: DialogState;
  onCloseDialog: () => void;
}

function RecipientSearch({
  phoneFilter,
  selectedUser,
  recentUsers,
  onPhoneFilterChange,
  onUserSelect,
  onSearch,
  dialog,
  onCloseDialog,
}: RecipientSearchProps): JSX.Element {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tìm người nhận
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchBar
            fullWidth
            placeholder="Nhập số điện thoại của người nhận"
            value={phoneFilter}
            onChange={onPhoneFilterChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            helperText="Nhập số điện thoại 10 chữ số đầy đủ để tìm kiếm"
          />
          <Button variant="contained" onClick={onSearch}>
            Tìm kiếm
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
            Giao dịch gần đây
          </Typography>
          <List sx={{ py: 0 }}>
            {Array.isArray(recentUsers) && recentUsers.length > 0 ? (
              recentUsers.map((tx) => (
                <RecentUserItem
                  key={tx.id}
                  onClick={() => onUserSelect({ id: tx.id, name: '', phone: '', lastTransaction: tx.timestamp, debitAccountId: '' })}
                  sx={{ bgcolor: "transparent" }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "grey.400" }}>
                      {tx.transactionType.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Giao dịch ${tx.transactionType}`}
                    secondary={
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" component="span">
                          {tx.amount} USDC
                        </Typography>
                        <Typography variant="caption" component="span" sx={{ ml: 1, opacity: 0.7 }}>
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                </RecentUserItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Không có giao dịch gần đây.
              </Typography>
            )}
          </List>
        </Box>
        <Dialog open={dialog.open} onClose={onCloseDialog}>
          <DialogTitle>Thông báo</DialogTitle>
          <DialogContent>
            <Typography>{dialog.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </StyledCard>
  );
}

// TransactionForm Component
interface TransactionFormProps {
  selectedUser: User;
  availableBalance: string;
  transaction: TransactionDetails;
  formErrors: FormErrors;
  isSubmitting: boolean;
  successMessage: string;
  showPasscode: boolean;
  passcodeErrorDialog: boolean;
  onTransactionChange: (field: keyof TransactionDetails, value: string) => void;
  onSubmit: () => void;
  onTogglePasscode: () => void;
  onClosePasscodeError: () => void;
}

function TransactionForm({
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
          <Grid>
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
          </Grid>
        </SectionContainer>

        {/* Phần bảo mật & xác nhận */}
        <SectionContainer>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {/* <SectionNumber>3</SectionNumber> */}
            {/* <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Bảo mật & Xác nhận
            </Typography> */}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* <TextField
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
              /> */}
            </Grid>
          </Grid>
        </SectionContainer>

        <Dialog open={passcodeErrorDialog} onClose={onClosePasscodeError}>
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
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            startIcon={<SendIcon />}
            sx={{ borderRadius: "28px", px: 3 }}
          >
            Xác nhận
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

// TransferDebit Component
export default function TransferDebit(): JSX.Element {
  const [phoneFilter, setPhoneFilter] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [recentUsers, setRecentUsers] = useState<Transaction[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [availableBalance, setAvailableBalance] = useState("500.00");
  const [transaction, setTransaction] = useState<TransactionDetails>({
    amount: "",
    fee: "0.25",
    note: "",
    passCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    amount: false,
    passCode: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeErrorDialog, setPasscodeErrorDialog] = useState(false);
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    message: "",
  });

  // Giả lập userId (cần thay thế khi tích hợp xác thực)
  const userId = "d0250rm199kgpknaiko0";

  // Load recent transactions and user balance
  useEffect(() => {
    // Fetch recent transactions
    const fetchRecentTransactions = async () => {
      try {
        const response = await fetch("https://be-crypto-depot.name.vn/debitAccount/recent-transactions", {
          method: "GET",
        });
        const transactions = await response.json();
        setRecentUsers(Array.isArray(transactions) ? transactions : []);
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
        setRecentUsers([]);
        setDialog({
          open: true,
          message: "Failed to fetch recent transactions.",
        });
      }
    };

    // Fetch user balance
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://be-crypto-depot.name.vn/api/debitAccount/balance/${userId}`, {
          method: "GET",
        });
        const data = await response.json();
        setAvailableBalance(data.toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
        setDialog({
          open: true,
          message: "Failed to fetch available balance.",
        });
      }
    };

    fetchRecentTransactions();
    fetchBalance();
  }, []);

  // Handle phone filter change
  const handlePhoneFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneFilter(value);
    if (selectedUser) {
      setSelectedUser(null);
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    if (phoneFilter.length !== 10) {
      setDialog({
        open: true,
        message: "Vui lòng nhập số điện thoại 10 chữ số.",
      });
      return;
    }

    try {
      const response = await fetch(`https://be-crypto-depot.name.vn/debitAccount/search?phoneNumber=${phoneFilter}`, {
        method: "GET",
      });
      const users = await response.json();
      if (users.length > 0) {
        const user = users[0];
        setSelectedUser({
          id: user.id,
          name: user.fullName,
          phone: user.phoneNumber,
          avatar: user.fullName.charAt(0),
          lastTransaction: "",
          debitAccountId: user.debitAccountId,
        });
        setAllUsers(users.map((u: any) => ({
          id: u.id,
          name: u.fullName,
          phone: u.phoneNumber,
          avatar: u.fullName.charAt(0),
        })));
      } else {
        setDialog({
          open: true,
          message: "Người dùng không tồn tại.",
        });
      }
    } catch (error) {
      setDialog({
        open: true,
        message: "Lỗi khi tìm kiếm người dùng.",
      });
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setPhoneFilter(user.phone);
  };

  const handleTransactionChange = (field: keyof TransactionDetails, value: string) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));

    if (field === "amount") {
      const numValue = Number.parseFloat(value) || 0;
      const available = Number.parseFloat(availableBalance);
      setFormErrors((prev) => ({
        ...prev,
        amount: numValue + Number.parseFloat(transaction.fee) > available || value === "" || numValue <= 0,
      }));
    }
  };

  const handleSubmit = () => {
    const available = Number.parseFloat(availableBalance);
    const totalAmount = Number.parseFloat(transaction.amount || "0") + Number.parseFloat(transaction.fee);

    const errors = {
        amount: transaction.amount === "" || Number.parseFloat(transaction.amount) <= 0 || totalAmount > available,
        passCode: false,
    };

    setFormErrors(errors);

    if (errors.amount) {
        return;
    }

    setIsSubmitting(true);

    fetch("https://be-crypto-depot.name.vn/api/debitAccount/transfer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            fromAccountId: "d00ucnk5ig8jm25nu66y",
            toAccountId: selectedUser?.debitAccountId,
            amount: transaction.amount,
            note: transaction.note,
        }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to transfer USDC");
            }
        })
        .then(data => {
            setIsSubmitting(false);
            setSuccessMessage(`Successfully transferred ${transaction.amount} USDC to ${selectedUser?.name}`);

            setTimeout(() => {
                setTransaction({
                    amount: "",
                    fee: "0.25",
                    note: "",
                    passCode: "",
                });
                setSelectedUser(null);
                setPhoneFilter("");
                setSuccessMessage("");

                fetch(`https://be-crypto-depot.name.vn/api/debitAccount/balance/${userId}`, {
                    method: "GET",
                })
                    .then(response => response.json())
                    .then(data => setAvailableBalance(data.toString()))
                    .catch(error => {
                        console.error("Error fetching balance:", error);
                        setDialog({
                            open: true,
                            message: "Failed to fetch available balance.",
                        });
                    });
            }, 7000);
        })
        .catch(error => {
            setIsSubmitting(false);
            console.error("Error transferring USDC:", error);
            setDialog({
                open: true,
                message: "Failed to transfer USDC: " + error.message,
            });
        });
};

  const handleCloseDialog = () => {
    setDialog({
      open: false,
      message: "",
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Chuyển khoản USDC
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <RecipientSearch
            phoneFilter={phoneFilter}
            selectedUser={selectedUser}
            recentUsers={recentUsers}
            onPhoneFilterChange={handlePhoneFilterChange}
            onUserSelect={handleUserSelect}
            onSearch={handleSearch}
            dialog={dialog}
            onCloseDialog={handleCloseDialog}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          {selectedUser ? (
            <TransactionForm
              selectedUser={selectedUser}
              availableBalance={availableBalance}
              transaction={transaction}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              successMessage={successMessage}
              showPasscode={showPasscode}
              passcodeErrorDialog={passcodeErrorDialog}
              onTransactionChange={handleTransactionChange}
              onSubmit={handleSubmit}
              onTogglePasscode={() => setShowPasscode(!showPasscode)}
              onClosePasscodeError={() => setPasscodeErrorDialog(false)}
            />
          ) : (
            <EmptyState />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
