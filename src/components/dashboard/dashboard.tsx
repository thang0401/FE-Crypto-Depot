"use client"

import React from "react"
import { motion } from "framer-motion"
import { Wallet, Shield, ArrowRight, Lock, Activity, CreditCard, ScrollText, Rocket } from "lucide-react"
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigationLinks = ["Tính năng", "Giải pháp", "Giá cả", "Về chúng tôi"]

  const drawer = (
    <List>
      {navigationLinks.map((text) => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <Box sx={{ bgcolor: "#f0f4f8" }}>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ pt: 16, pb: 12, background: "linear-gradient(135deg, #f6f0fd 0%, #e2ecfe 100%)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
                  CryptoBank is <span style={{ color: "#3f51b5" }}>FUTURE</span>
                </Typography>
                <Typography variant="h5" sx={{ color: "text.secondary", mb: 4 }}>
                  Trải nghiệm dịch vụ ngân hàng liền mạch với sức mạnh của tiền điện tử. An toàn, nhanh chóng và được
                  xây dựng cho thời đại hiện đại.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight />}
                    sx={{
                      bgcolor: "#3f51b5",
                      "&:hover": { bgcolor: "#283593" },
                      boxShadow: "0 4px 14px 0 rgba(63,81,181,0.39)",
                    }}
                  >
                    Bắt Đầu Ngay
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "#3f51b5",
                      color: "#3f51b5",
                      "&:hover": { borderColor: "#283593", color: "#283593" },
                    }}
                  >
                    Tìm Hiểu Thêm
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: "-10%",
                      background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
                      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                      opacity: 0.1,
                      filter: "blur(40px)",
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: "relative",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 80px 0 rgba(63,81,181,0.3)",
                    }}
                  >
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Bảng Điều Khiển Ngân Hàng"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: "bold", color: "#1a237e" }}
          >
            MỌI THỨ BẠN CẦN, CHỈ CẦN MỘT CHẠM
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <Wallet className="w-12 h-12 text-blue-600" />,
                title: "Ví tiền điện tử",
                description: "Lưu trữ an toàn tiền điện tử của bạn với theo dõi và quản lý thời gian thực.",
              },
              {
                icon: <Activity className="w-12 h-12 text-blue-600" />,
                title: "Giao dịch tức thì",
                description: "Thực hiện giao dịch ngay lập tức với tỷ giá cạnh tranh và phí tối thiểu.",
              },
              {
                icon: <Shield className="w-12 h-12 text-blue-600" />,
                title: "Bảo mật cao",
                description: "Tài sản của bạn được bảo vệ cấp cao và xác thực đa yếu tố.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      transition: "0.3s",
                      "&:hover": { transform: "translateY(-8px)" },
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>{feature.icon}</Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "bold", textAlign: "center", color: "#1a237e" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary" align="center">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 12, bgcolor: "#f0f4f8" }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#1a237e", mb: 4 }}
                >
                  Tại Sao Chọn CryptoBank?
                </Typography>
                <Box sx={{ mt: 12 }}>
                  {[
                    {
                      icon: <Lock className="w-8 h-8 text-blue-600" />,
                      title: "Bảo vệ tài sản, an toàn tuyệt đối",
                      description: "Không ai ngoài bạn biết số dư tài khoản, bảo vệ tài sản khỏi sự xâm nhập.",
                    },
                    {
                      icon: <ScrollText className="w-8 h-8 text-blue-600" />,
                      title: "Lập di chúc kế thừa tài sản",
                      description: "Tạo di chúc chuyển tài sản cho người khác trong trường hợp bất trắc.",
                    },
                    {
                      icon: <Rocket className="w-8 h-8 text-blue-600" />,
                      title: "Người mới tham gia crypto",
                      description: "CryptoBank giúp bạn đầu tư và lưu trữ tài sản an toàn, tránh nguy cơ sàn sập.",
                    },
                    {
                      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                      title: "Chuyển crypto cho người khác",
                      description: "Chuyển tiền dễ dàng cho người chưa có ví Web3 chỉ sau 3 phút tạo tài khoản.",
                    },
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
                      <Paper
                        sx={{
                          p: 2,
                          pb: 1,
                          mr: 3,
                          bgcolor: "#c3e1f7",
                          color: "primary.main",
                          borderRadius: "12px",
                        }}
                      >
                        {benefit.icon}
                      </Paper>
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
                          {benefit.title}
                        </Typography>
                        <Typography color="text.secondary">{benefit.description}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: "-10%",
                      background: "linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%)",
                      borderRadius: "70% 30% 30% 70% / 60% 40% 60% 40%",
                      opacity: 0.1,
                      filter: "blur(40px)",
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: "relative",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 80px 0 rgba(63,81,181,0.3)",
                    }}
                  >
                    <img
                      src="/images/pages/homepage-second-image.png"
                      alt=""
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: "#e3f2fd" }}>
        <Container maxWidth="lg"  >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
                  Tạo tài khoản?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" , textAlign: "justify", mr: 5 }} >
                  Bắt đầu hành trình đầu tư tiền điện tử một cách an toàn với CryptoBank. Bạn có sẵn sàng bảo vệ tài
                  sản số của mình khỏi những rủi ro thường gặp trong thị trường crypto chưa? Với CryptoBank, chúng tôi
                  mang đến một giải pháp lưu ký tiền điện tử toàn diện, giúp bạn dễ dàng quản lý tài sản mà không phải
                  lo lắng về bảo mật và thao tác phức tạp.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Typography variant="h5" sx={{ color: "#3f51b5", mb: 8 }}>
                    Đăng ký tài khoản ngay để nhận $5 đô phí giao dịch
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight />}
                    sx={{
                      bgcolor: "#3f51b5",
                      "&:hover": { bgcolor: "#283593" },
                      boxShadow: "0 4px 14px 0 rgba(63,81,181,0.39)",
                      fontWeight: "bold",
                      marginLeft: 40
                    }}
                  >
                    TẠO TÀI KHOẢN NGAY
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 12, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: "bold", color: "#1a237e" }}
          >
            Câu Hỏi Thường Gặp
          </Typography>
          <Grid container spacing={4} justifyContent="left">
            <Grid item xs={12} md={20}>
              {[
                {
                  question: "CryptoBank là gì?",
                  answer:
                    "CryptoBank là nền tảng Web3 giúp người dùng quản lý tài sản tiền điện tử mà không cần quản lý ví và chìa khóa riêng tư.",
                },
                {
                  question: "CryptoBank có lưu trữ ví và tài sản của tôi không?",
                  answer:
                    "Có, CryptoBank sử dụng ví Web3 duy nhất để quản lý tài sản của người dùng, giúp bảo vệ tài sản an toàn trong ví lưu ký.",
                },
                {
                  question: "Làm thế nào để tôi đăng ký và sử dụng CryptoBank?",
                  answer:
                    "Bạn chỉ cần đăng ký với Username và Password, sau đó có thể quản lý tài sản Web3 mà không cần tạo ví hay quản lý khóa riêng tư.",
                },
                {
                  question: "Tôi có thể nhận tài sản Web3 từ các ví khác không?",
                  answer:
                    "Có, bạn có thể nhận tài sản từ bất kỳ ví Web3 nào bằng Username của mình mà không cần đăng nhập.",
                },
                {
                  question: "Làm thế nào để tôi chuyển tài sản giữa các Username?",
                  answer:
                    "Bạn có thể chuyển tài sản Web3 cho bất kỳ Username nào trong hệ thống mà không cần thao tác trên blockchain.",
                },
                {
                  question: "CryptoBank có phí giao dịch không?",
                  answer:
                    "Phí giao dịch trên CryptoBank được tối ưu hóa, giảm thiểu phí giao dịch bằng cách xử lý giao dịch trong hệ thống nội bộ.",
                },
                {
                  question: "Tôi có cần phải biết về Web3 hay blockchain để sử dụng CryptoBank không?",
                  answer:
                    "Không, CryptoBank dễ tiếp cận cho mọi người, chỉ cần Username và Password mà không cần kiến thức về blockchain.",
                },
                {
                  question: "Điều gì sẽ xảy ra nếu tôi quên mật khẩu?",
                  answer: "Bạn có thể khôi phục mật khẩu bằng cách xác thực thông tin để đảm bảo tính bảo mật.",
                },
                {
                  question: "CryptoBank có hỗ trợ giao dịch xuyên chuỗi (cross-chain) không?",
                  answer:
                    "Hiện tại, CryptoBank hỗ trợ một số blockchain nhất định, nhưng đang nghiên cứu giao dịch xuyên chuỗi cho tương lai.",
                },
              ].map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{ mb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: "8px !important" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    sx={{
                      backgroundColor: "#f0f4f8",
                      "&.Mui-expanded": {
                        backgroundColor: "#e3f2fd",
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", color: "#1a237e" }}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Dashboard

