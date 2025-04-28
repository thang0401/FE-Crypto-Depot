"use client"

import React from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material"
import { MessageSquare, Phone, Mail, FileText, HelpCircle, Clock, CheckCircle, AlertTriangle, Plus } from "lucide-react"

const SupportPage = () => {
  const theme = useTheme()
  const router = useRouter()

  // Mock recent requests
  const recentRequests = [
    {
      id: "SR123456",
      subject: "Vấn đề thanh toán với hóa đơn gần đây",
      status: "open",
      date: "2023-04-10",
    },
    {
      id: "SR123455",
      subject: "Sản phẩm không hoạt động như kỳ vọng",
      status: "closed",
      date: "2023-03-28",
    },
    {
      id: "SR123454",
      subject: "Câu hỏi về các tùy chọn giao hàng",
      status: "resolved",
      date: "2023-03-15",
    },
  ]

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock color={theme.palette.warning.main} />
      case "resolved":
        return <CheckCircle color={theme.palette.success.main} />
      case "closed":
        return <AlertTriangle color={theme.palette.text.secondary} />
      default:
        return <HelpCircle />
    }
  }

  return (
    <>
      <Head>
        <title>Hỗ trợ khách hàng</title>
        <meta name="description" content="Trung tâm hỗ trợ và trợ giúp khách hàng" />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hỗ trợ khách hàng
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nhận hỗ trợ với đơn hàng, sản phẩm và tài khoản của bạn
          </Typography>

          <Grid container spacing={4}>
            {/* Left column - Support options */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 4, borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Chúng tôi có thể giúp gì cho bạn?
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Plus size={18} />}
                      onClick={() => router.push("/support/new-request")}
                    >
                      Yêu cầu mới
                    </Button>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    Chọn một tùy chọn bên dưới để bắt đầu với yêu cầu hỗ trợ của bạn
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=product")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "primary.main",
                              color: "primary.contrastText",
                              mr: 2,
                            }}
                          >
                            <FileText size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Hỗ trợ sản phẩm
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Vấn đề với sản phẩm hoặc dịch vụ
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=billing")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "error.main",
                              color: "error.contrastText",
                              mr: 2,
                            }}
                          >
                            <MessageSquare size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Hỗ trợ thanh toán
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Câu hỏi về thanh toán hoặc hóa đơn
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=technical")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "warning.main",
                              color: "warning.contrastText",
                              mr: 2,
                            }}
                          >
                            <HelpCircle size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Hỗ trợ kỹ thuật
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Vấn đề hoặc câu hỏi kỹ thuật
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=feedback")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "success.main",
                              color: "success.contrastText",
                              mr: 2,
                            }}
                          >
                            <Mail size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Phản hồi chung
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Đề xuất hoặc bình luận
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Recent requests */}
              <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Yêu cầu hỗ trợ gần đây
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => router.push("/support/my-requests")}>
                      Xem tất cả
                    </Button>
                  </Box>

                  {recentRequests.length > 0 ? (
                    <List>
                      {recentRequests.map((request, index) => (
                        <React.Fragment key={request.id}>
                          <ListItem
                            button
                            onClick={() => router.push(`/support/request/${request.id}`)}
                            sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>{getStatusIcon(request.status)}</ListItemIcon>
                            <ListItemText
                              primary={request.subject}
                              secondary={`${request.id} • ${new Date(request.date).toLocaleDateString("vi-VN")}`}
                              primaryTypographyProps={{ fontWeight: "medium" }}
                            />
                          </ListItem>
                          {index < recentRequests.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ py: 4, textAlign: "center" }}>
                      <Typography color="text.secondary">
                        Bạn chưa có yêu cầu hỗ trợ nào gần đây
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={() => router.push("/support/new-request")}
                      >
                        Tạo yêu cầu đầu tiên của bạn
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right column - Contact info */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 4, borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Thông tin liên hệ
                  </Typography>

                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Phone color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Hỗ trợ qua điện thoại"
                        secondary="+1 (800) 123-4567"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Mail color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Hỗ trợ qua email"
                        secondary="support@example.com"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <Divider sx={{ my: 2 }} />

                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Clock color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Giờ làm việc"
                        secondary="Thứ Hai - Thứ Sáu: 9h sáng - 6h tối (EST)"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Tài nguyên hữu ích
                  </Typography>

                  <List>
                    <ListItem
                      button
                      onClick={() => router.push("/support/faq")}
                      sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <HelpCircle color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Câu hỏi thường gặp"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem
                      button
                      onClick={() => router.push("/support/knowledge-base")}
                      sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <FileText color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cơ sở kiến thức"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem
                      button
                      onClick={() => router.push("/support/tutorials")}
                      sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <MessageSquare color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Hướng dẫn video"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default SupportPage