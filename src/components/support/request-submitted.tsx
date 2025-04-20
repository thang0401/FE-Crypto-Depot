"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Grid,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material"
import { CheckCircle, ArrowLeft, Clock, AlertCircle } from "lucide-react"

const RequestSubmitted = () => {
  const theme = useTheme()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)

  // Simulate loading request details
  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [id])

  if (!id) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>Yêu cầu đã gửi | Hỗ trợ</title>
        <meta name="description" content="Yêu cầu hỗ trợ của bạn đã được gửi thành công" />
      </Head>

      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={18} />}
            onClick={() => router.push("/support")}
            sx={{ mb: 4 }}
          >
            Quay lại trang hỗ trợ
          </Button>

          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: theme.shadows[3] }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <CheckCircle color={theme.palette.success.main} size={40} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" fontWeight="bold">
                      Yêu cầu đã được gửi thành công
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Cảm ơn bạn đã liên hệ với đội ngũ hỗ trợ của chúng tôi
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mã yêu cầu
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {id}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Ngày gửi
                    </Typography>
                    <Typography variant="body1">
                      {new Date().toLocaleDateString("vi-VN")} lúc {new Date().toLocaleTimeString("vi-VN")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Trạng thái
                    </Typography>
                    <Chip icon={<Clock size={16} />} label="Đã nhận" color="primary" variant="outlined" />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Thời gian phản hồi dự kiến
                    </Typography>
                    <Typography variant="body1">Trong vòng 24-48 giờ</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, p: 3, bgcolor: "info.main", color: "info.contrastText", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <AlertCircle size={24} style={{ marginRight: 12, marginTop: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Điều gì xảy ra tiếp theo?
                      </Typography>
                      <Typography variant="body2">
                        1. Đội ngũ hỗ trợ của chúng tôi sẽ xem xét yêu cầu của bạn và phân công đến bộ phận phù hợp.
                      </Typography>
                      <Typography variant="body2">
                        2. Bạn sẽ nhận được email xác nhận với chi tiết yêu cầu của mình.
                      </Typography>
                      <Typography variant="body2">
                        3. Một nhân viên hỗ trợ sẽ liên hệ với bạn qua phương thức liên hệ bạn chọn.
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Bạn có thể kiểm tra trạng thái yêu cầu bất kỳ lúc nào bằng cách đăng nhập vào tài khoản của mình.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" onClick={() => router.push("/support/my-requests")} sx={{ mr: 2 }}>
                    Xem các yêu cầu của tôi
                  </Button>
                  <Button variant="outlined" onClick={() => router.push("/")}>
                    Quay lại bảng điều khiển
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default RequestSubmitted