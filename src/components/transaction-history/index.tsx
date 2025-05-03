import { Box, Typography, Paper, Chip, Stack, List, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { ArrowUpward, ArrowDownward, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Transaction {
  transactionId: string;
  userId: string;
  debitWalletId: string;
  vndAmount: number;
  usdcAmount: number;
  exchangeRate: number;
  transactionType: "DEPOSIT" | "WITHDRAW";
  status: "Sucesss" | "Failed" | "Pending" | "Approved" | "Rejected";
  createAt: string;
}

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [username, setUsername] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    // Fetch username from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsername(parsedData.username || "");
      const userId = parsedData.id;
      axios
        .get(`https://be-crypto-depot.name.vn/api/payment/transactions/user/${userId}`)
        .then((response) => {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, []);

  useEffect(() => {
    let filtered = [...transactions];

    // Filter by transaction type
    if (typeFilter !== "all") {
      filtered = filtered.filter((t) => t.transactionType === typeFilter);
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      let days: number;
      switch (dateFilter) {
        case "3days":
          days = 3;
          break;
        case "7days":
          days = 7;
          break;
        case "15days":
          days = 15;
          break;
        case "30days":
          days = 30;
          break;
        default:
          days = 0;
      }
      if (days > 0) {
        const cutoffDate = new Date(now.setDate(now.getDate() - days));
        filtered = filtered.filter((t) => new Date(t.createAt) >= cutoffDate);
      }
    }

    setFilteredTransactions(filtered);
  }, [typeFilter, statusFilter, dateFilter, transactions]);

  const clearFilters = () => {
    setTypeFilter("all");
    setStatusFilter("all");
    setDateFilter("all");
  };

  const formatDate = (utcDate: string) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 7);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month}, ${hours}:${minutes}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return <ArrowDownward fontSize="small" />;
      case "WITHDRAW":
        return <ArrowUpward fontSize="small" />;
      default:
        return <ArrowDownward fontSize="small" />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "Nạp tiền";
      case "WITHDRAW":
        return "Rút tiền";
      default:
        return "Giao dịch";
    }
  };

  const getStatusChip = (status: string) => {
    let color: string;
    let bgcolor: string;
    switch (status) {
      case "Sucesss":
      case "Approved":
        color = "#2e7d32";
        bgcolor = "#2e7d32";
        break;
      case "Pending":
        color = "#ed6c02";
        bgcolor = "#ed6c02";
        break;
      case "Failed":
      case "Rejected":
        color = "#d32f2f";
        bgcolor = "#d32f2f";
        break;
      default:
        color = "text.secondary";
        bgcolor = "grey.500";
    }

    return (
      <Chip
        size="small"
        label={status}
        variant="outlined"
        sx={{
          border: "none",
          bgcolor: "#f0eee9",
          "& .MuiChip-label": {
            color,
            fontWeight: 500,
          },
        }}
      />
    );
  };

  const AccountChip = ({ label }: { label: string }) => (
    <Chip
      label={label}
      size="small"
      sx={{
        borderRadius: 1,
        height: 24,
        "& .MuiChip-label": {
          px: 1,
          fontSize: "0.75rem",
          textTransform: "none",
        },
      }}
    />
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
        Lịch sử giao dịch
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Loại giao dịch</InputLabel>
          <Select
            value={typeFilter}
            label="Loại giao dịch"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="DEPOSIT">Nạp tiền</MenuItem>
            <MenuItem value="WITHDRAW">Rút tiền</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            label="Trạng thái"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="Sucesss">Thành công</MenuItem>
            <MenuItem value="Approved">Đã duyệt</MenuItem>
            <MenuItem value="Pending">Đang chờ</MenuItem>
            <MenuItem value="Failed">Thất bại</MenuItem>
            <MenuItem value="Rejected">Bị từ chối</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Khoảng thời gian</InputLabel>
          <Select
            value={dateFilter}
            label="Khoảng thời gian"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="3days">3 ngày trước</MenuItem>
            <MenuItem value="7days">7 ngày trước</MenuItem>
            <MenuItem value="15days">15 ngày trước</MenuItem>
            <MenuItem value="30days">30 ngày trước</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={clearFilters}
          disabled={typeFilter === "all" && statusFilter === "all" && dateFilter === "all"}
        >
          Xóa bộ lọc
        </Button>
      </Stack>

      <List sx={{ width: "100%", p: 0 }}>
        {filteredTransactions.map((transaction) => (
          <Paper
            key={transaction.transactionId}
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: "grey.300",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getTransactionIcon(transaction.transactionType)}
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {getTransactionLabel(transaction.transactionType)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(transaction.createAt)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                      Mã giao dịch: {transaction.transactionId.split("-")[0]}
                    </Typography>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      {transaction.transactionType === "DEPOSIT" ? (
                        <>
                          <AccountChip label="VietQR Bank" />
                          <ArrowForward fontSize="small" sx={{ color: "grey.500" }} />
                          <AccountChip label={username} />
                        </>
                      ) : (
                        <>
                          <AccountChip label={username} />
                          <ArrowForward fontSize="small" sx={{ color: "grey.500" }} />
                          <AccountChip label="Bank Transfer" />
                        </>
                      )}
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>{getStatusChip(transaction.status)}</Box>
                  <Box sx={{ textAlign: "right", minWidth: 100 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                    >
                      {transaction.transactionType === "DEPOSIT" ? "+ " : "- "}
                      {transaction.transactionType === "DEPOSIT"
                        ? `${transaction.vndAmount.toLocaleString()} VND`
                        : `${transaction.usdcAmount.toFixed(2)} USDC`}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default TransactionHistory;