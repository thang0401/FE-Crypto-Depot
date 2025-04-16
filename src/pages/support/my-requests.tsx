// pages/support/my-requests.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material"
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Search } from 'lucide-react'

// Định nghĩa kiểu dữ liệu cho yêu cầu hỗ trợ
interface SupportRequest {
  id: string
  subject: string
  type: string
  category: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "critical"
  createdAt: string
  updatedAt: string
}

const MyRequests = () => {
  const theme = useTheme()
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<SupportRequest[]>([])

  // Xử lý thay đổi tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Lấy dữ liệu yêu cầu hỗ trợ
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      try {
        // Trong ứng dụng thực tế, bạn sẽ gọi API ở đây
        // const response = await fetch('/api/support/my-requests');
        // const data = await response.json();
        // setRequests(data);

        // Dữ liệu mẫu
        await new Promise(resolve => setTimeout(resolve, 1000))
        setRequests([
          {
            id: "SR123456",
            subject: "Vấn đề với hóa đơn tháng này",
            type: "billing",
            category: "overcharged",
            status: "open",
            priority: "high",
            createdAt: "2023-04-10T10:30:00Z",
            updatedAt: "2023-04-10T10:30:00Z",
          },
          {
            id: "SR123455",
            subject: "Sản phẩm không hoạt động như mong đợi",
            type: "product",
            category: "defective",
            status: "in_progress",
            priority: "medium",
            createdAt: "2023-03-28T14:20:00Z",
            updatedAt: "2023-03-29T09:15:00Z",
          },
          {
            id: "SR123454",
            subject: "Câu hỏi về các tùy chọn vận chuyển",
            type: "delivery",
            category: "late",
            status: "resolved",
            priority: "low",
            createdAt: "2023-03-15T08:45:00Z",
            updatedAt: "2023-03-17T11:30:00Z",
          },
          {
            id: "SR123453",
            subject: "Phản hồi về trải nghiệm người dùng",
            type: "feedback",
            category: "suggestion",
            status: "closed",
            priority: "low",
            createdAt: "2023-02-20T16:10:00Z",
            updatedAt: "2023-02-22T13:25:00Z",
          },
        ])
      } catch (error) {
        console.error("Lỗi khi tải yêu cầu:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // Lọc yêu cầu dựa trên tab đang chọn
  const filteredRequests = requests.filter(request => {
    if (tabValue === 0) return true // Tất cả
    if (tabValue === 1) return request.status === "open" || request.status === "in_progress" // Đang mở
    if (tabValue === 2) return request.status === "resolved" || request.status === "closed" // Đã đóng
    return true
  })

  // Lấy biểu tượng trạng thái
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock size={16} color={theme.palette.warning.main} />
      case "in_progress":
        return <Clock size={16} color={theme.palette.info.main} />
      case "resolved":
        return <CheckCircle size={16} color={theme.palette.success.main} />
      case "closed":
        return <AlertTriangle size={16} color={theme.palette.text.secondary} />
      default:
        return null
    }
  }

  // Lấy nhãn trạng thái
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Đang mở"
      case "in_progress":
        return "Đang xử lý"
      case "resolved":
        return "Đã giải quyết"
      case "closed":
        return "Đã đóng"
      default:
        return status
    }
  }

  // Lấy màu chip ưu tiên
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "default"
      case "medium":
        return "primary"
      case "high":
        return "warning"
      case "critical":
        return "error"
      default:
        return "default"
    }
  }

  // Lấy nhãn ưu tiên
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low":
        return "Thấp"
      case "medium":
        return "Trung bình"
      case "high":
        return "Cao"
      case "critical":
        return "Khẩn cấp"
      default:
        return priority
    }
  }

  // Format ngày
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Head>
        <title>Yêu cầu hỗ trợ của tôi</title>
        <meta name="description" content="Xem và quản lý các yêu cầu hỗ trợ của bạn" />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={18} />}
              onClick={() => router.push("/support")}
              sx={{ mr: 2 }}
            >
              Quay lại
            </Button>
            <Typography variant="h4" fontWeight="bold">
              Yêu cầu hỗ trợ của tôi
            </Typography>
          </Box>

          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, boxShadow: theme.shadows[3] }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="request tabs">
                <Tab label={`Tất cả (${requests.length})`} />
                <Tab
                  label={`Đang mở (${
                    requests.filter(r => r.status === "open" || r.status === "in_progress").length
                  })`}
                />
                <Tab
                  label={`Đã đóng (${
                    requests.filter(r => r.status === "resolved" || r.status === "closed").length
                  })`}
                />
              </Tabs>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredRequests.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Search size={48} color={theme.palette.text.secondary} style={{ opacity: 0.5, margin: "0 auto 16px" }} />
                <Typography variant="h6" gutterBottom>
                  Không tìm thấy yêu cầu nào
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Bạn chưa có yêu cầu hỗ trợ nào trong danh mục này
                </Typography>
                <Button variant="contained" onClick={() => router.push("/support/new-request")}>
                  Tạo yêu cầu mới
                </Button>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID yêu cầu</TableCell>
                      <TableCell>Tiêu đề</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Ưu tiên</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Cập nhật cuối</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRequests.map(request => (
                      <TableRow
                        key={request.id}
                        sx={{
                          "&:hover": { bgcolor: "action.hover" },
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(`/support/request/${request.id}`)}
                      >
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.subject}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            // icon={getStatusIcon(request.status)}
                            label={getStatusLabel(request.status)}
                            color={
                              request.status === "open"
                                ? "warning"
                                : request.status === "in_progress"
                                ? "info"
                                : request.status === "resolved"
                                ? "success"
                                : "default"
                            }
                            variant={request.status === "closed" ? "outlined" : "filled"}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={getPriorityLabel(request.priority)}
                            color={getPriorityColor(request.priority) as any}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell>{formatDate(request.updatedAt)}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/support/request/${request.id}`)
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default MyRequests