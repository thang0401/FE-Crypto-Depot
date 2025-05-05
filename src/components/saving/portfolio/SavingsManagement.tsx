"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  Chip,
  Button,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import SearchIcon from "@mui/icons-material/Search"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ClearIcon from "@mui/icons-material/Clear"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/router"
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

interface Filters {
  userId: string
  term: string
  dateFrom: Date | null
  dateTo: Date | null
  ownerName: string
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
  return (
    <Chip
      label={
        status === "no_heir"
          ? "KHÔNG CÓ NGƯỜI THỪA KẾ"
          : status === "has_heir"
          ? "CÓ NGƯỜI THỪA KẾ"
          : status === "in_process"
          ? "ĐANG XỬ LÝ"
          : status.replace("_", " ").toUpperCase()
      }
      style={{ backgroundColor: bg, color }}
    />
  )
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd/MM/yyyy")
}

const SavingsManagement: React.FC = () => {
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>({
    userId: "",
    term: "",
    dateFrom: null,
    dateTo: null,
    ownerName: "",
  })
  const [filteredAccounts, setFilteredAccounts] = useState<SavingsAccount[]>([])
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  useEffect(() => {
  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/user/saving/get-savings?userId=d00u7ak5ig8jm25nu6mg'); 
      if (!response.ok) throw new Error('Failed to fetch accounts');
      const data = await response.json();
      const accounts: SavingsAccount[] = data.map((item: any) => ({
        id: item.accountId,
        status: item.status, // Giả định hoặc lấy từ BE nếu có
        heirStatus: item.isHeir ? 'has_heir' : 'no_heir',
        owner: {
          id: item.userId,
          name: item.userName,
          email: item.userEmail,
          phone: item.userPhone,
        },
        term: `${item.term} tháng`,
        startDate: item.startDate,
        endDate: item.endDate,
        balance: item.balance.toString(),
      }));
      console.log(accounts)
      setFilteredAccounts(accounts); // Lưu dữ liệu từ BE
    } catch (err) {
      setError('Không thể tải dữ liệu từ server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };fetchAccounts();
}, []);

  const handleFilterChange = (field: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleAccountSelect = (id: string) => {
    router.push(`/saving/my-portfolios/detail/${id}`)
  }

  const handleClearFilters = () => {
    setFilters({
      userId: "",
      term: "",
      dateFrom: null,
      dateTo: null,
      ownerName: "",
    })
  }

  const applyFilters = useCallback(() => {
    const mockAccounts: SavingsAccount[] = [
      {
        id: "SAV001",
        status: "active",
        heirStatus: "no_heir",
        owner: {
          id: "USRER001",
          name: "Nguyen Van Thuan",
          email: "thuannv.it@gmail.com",
          phone: "+8434567890",
        },
        term: "12 tháng",
        startDate: "2024-02-24",
        endDate: "2025-02-24",
        balance: "50",
        supportStaff: "Staff01",
        contractUrl: "",
        googleDriveUrl: "",
      },
      {
        id: "SAV002",
        status: "pending",
        heirStatus: "has_heir",
        owner: {
          id: "USRER002",
          name: "Nguyen Van Thuan",
          email: "thuannv.it@gmail.com",
          phone: "+8434567891",
        },
        term: "6 tháng",
        startDate: "2024-02-25",
        endDate: "2024-08-25",
        balance: "3",
        supportStaff: "Staff02",
        contractUrl: "",
        googleDriveUrl: "",
      },
    ]
    const savedAccounts: SavingsAccount[] = JSON.parse(localStorage.getItem("savingsAccounts") || "[]")

    let filtered = [...filteredAccounts]

    if (filters.userId) {
      filtered = filtered.filter((account) =>
        account.owner.id.toLowerCase().includes(filters.userId.toLowerCase())
      )
    }
    if (filters.term) {
      filtered = filtered.filter((account) =>
        account.term.toLowerCase().includes(filters.term.toLowerCase())
      )
    }
    if (filters.dateFrom) {
      filtered = filtered.filter((account) => new Date(account.startDate) >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filtered = filtered.filter((account) => new Date(account.startDate) <= filters.dateTo!)
    }
    if (filters.ownerName) {
      filtered = filtered.filter((account) =>
        account.owner.name.toLowerCase().includes(filters.ownerName.toLowerCase())
      )
    }

    setFilteredAccounts(filtered)
  }, [filters])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  return (
    <Box sx={{ p: 3 }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bộ lọc tìm kiếm
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Kỳ hạn"
                value={filters.term}
                onChange={(e) => handleFilterChange("term", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Từ ngày"
                  value={filters.dateFrom}
                  onChange={(date) => handleFilterChange("dateFrom", date)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                  format="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Đến ngày"
                  value={filters.dateTo}
                  onChange={(date) => handleFilterChange("dateTo", date)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                  format="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                fullWidth
                sx={{ height: "100%" }}
              >
                Xóa
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/saving/add-saving-asset/open/")}
              >
                Thêm Tài khoản tiết kiệm mới
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tài khoản tiết kiệm
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã tài khoản</TableCell>
                  <TableCell>Mã người dùng</TableCell>
                  <TableCell>Chủ sở hữu</TableCell>
                  <TableCell>Trạng thái thừa kế</TableCell>
                  <TableCell>Số dư</TableCell>
                  <TableCell>Kỳ hạn</TableCell>
                  <TableCell>Ngày bắt đầu</TableCell>
                  <TableCell>Ngày kết thúc</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.id}</TableCell>
                    <TableCell>{account.owner.id}</TableCell>
                    <TableCell>{account.owner.name}</TableCell>
                    <TableCell>
                      <StatusChip status={account.heirStatus} />
                    </TableCell>
                    <TableCell>{account.balance} USDC</TableCell>
                    <TableCell>{account.term}</TableCell>
                    <TableCell>{formatDate(account.startDate)}</TableCell>
                    <TableCell>{formatDate(account.endDate)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleAccountSelect(account.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>
    </Box>
  )
}

export default SavingsManagement
