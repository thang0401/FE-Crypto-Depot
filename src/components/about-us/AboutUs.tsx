"use client"
import { motion } from "framer-motion"
import { Bitcoin, Users, Target, Zap, ArrowRight, Shield, Cpu, Leaf, Network } from "lucide-react"
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material"
import Link from "next/link"

const AboutUs = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))


  const futureVisions = [
    {
      icon: <Cpu className="w-16 h-16 text-blue-600 transition-all duration-300 group-hover:text-blue-800 group-hover:scale-110" />,
      title: "AI-Driven Tài Chính",
      description: "Tích hợp trí tuệ nhân tạo để cung cấp tư vấn tài chính cá nhân hóa và quản lý rủi ro thông minh.",
    },
    {
      icon: <Network className="w-16 h-16 text-blue-600 transition-all duration-300 group-hover:text-blue-800 group-hover:scale-110" />,
      title: "Hệ Sinh Thái DeFi Toàn Diện",
      description:
        "Xây dựng một hệ sinh thái tài chính phi tập trung hoàn chỉnh, kết nối mọi dịch vụ tài chính trên blockchain.",
    },
    {
      icon: <Leaf className="w-16 h-16 text-blue-600 transition-all duration-300 group-hover:text-blue-800 group-hover:scale-110" />,
      title: "Tài Chính Xanh",
      description:
        "Phát triển các sản phẩm tài chính bền vững và thân thiện với môi trường, hỗ trợ các dự án xanh toàn cầu.",
    },
    {
      icon: <Shield className="w-16 h-16 text-blue-600 transition-all duration-300 group-hover:text-blue-800 group-hover:scale-110" />,
      title: "Bảo Mật Lượng Tử",
      description:
        "Áp dụng công nghệ mã hóa lượng tử để bảo vệ tài sản số của khách hàng trước các mối đe dọa trong tương lai.",
    },
  ]
  return (
    <Box sx={{ bgcolor: "#f0f4f8" }}>
         {/* Hero Section */}
      <Box sx={{ pt: 16, pb: 12, background: "linear-gradient(135deg, #f6f0fd 0%, #e2ecfe 100%)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
                  Về CryptoBank
                </Typography>
                <Typography variant="h5" sx={{ color: "text.secondary", mb: 4 }}>
                  Chúng tôi đang định hình tương lai của ngân hàng với công nghệ blockchain và tiền điện tử.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  component="img"
                  src=""
                  alt="CryptoBank Vision"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 20px 80px 0 rgba(63,81,181,0.3)",
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 12, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
                  Sứ mệnh của chúng tôi
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
                  CryptoBank cam kết mang đến một hệ thống tài chính toàn diện và dễ tiếp cận cho mọi người thông qua
                  việc tận dụng sức mạnh của công nghệ blockchain và tiền điện tử. Chúng tôi tin rằng tương lai của tài
                  chính là phi tập trung, an toàn và minh bạch.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
                  Chúng tôi cũng đặt mục tiêu giáo dục và trao quyền cho người dùng về tài chính số, giúp họ đưa ra
                  quyết định tài chính thông minh và tự tin trong thời đại kỹ thuật số này.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {[
                  { icon: <Users className="w-6 h-6" />, text: "Phục vụ hơn 10000+ khách hàng" },
                  { icon: <Target className="w-6 h-6" />, text: "Hoạt động tại 15+ quốc gia" },
                  { icon: <Zap className="w-6 h-6" />, text: "Xử lý 2000+ giao dịch mỗi giây" },
                  { icon: <Shield className="w-6 h-6" />, text: "Bảo mật 24/7 cho tài sản của bạn" },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ height: "100%", borderRadius: "16px", boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)" }}>
                      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            p: 1,
                            bgcolor: "primary.light",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                          {item.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Future Vision Section */}
    {/* Future Vision Section with enhanced styling */}
    <Box sx={{ py: 12, bgcolor: "#f0f4f8" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: "bold", color: "#1a237e" }}
          >
            TẦM NHÌN TƯƠNG LAI
          </Typography>
          <Grid container spacing={4}>
            {futureVisions.map((vision, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="group"
                    sx={{ 
                      height: "100%", 
                      borderRadius: "16px", 
                      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px 0 rgba(0,0,0,0.15)",
                        "& .MuiTypography-h6": {
                          color: "primary.main",
                        },
                        bgcolor: "#ffffff",
                      }
                    }}
                  >
                    <CardContent 
                      sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        p: 4,
                        "&:hover": {
                          "& > *": {
                            transform: "scale(1.05)",
                          }
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          mb: 3,
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: "rgba(63, 81, 181, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        {vision.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: "bold", 
                          textAlign: "center",
                          transition: "color 0.3s ease-in-out",
                          mb: 2
                        }}
                      >
                        {vision.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        align="center"
                        sx={{
                          transition: "color 0.3s ease-in-out",
                        }}
                      >
                        {vision.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* New Innovative CTA Section */}
      <Box sx={{ py: 12, bgcolor: "#3f51b5", position: "relative", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" position="relative" zIndex={1}>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "white" }}>
                  Khám Phá Tương Lai Tài Chính
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: "rgba(255, 255, 255, 0.8)" }}>
                  Tham gia cùng chúng tôi trong cuộc cách mạng tài chính số. Định hình tương lai của bạn với CryptoBank.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight />}
                  sx={{
                    bgcolor: "white",
                    color: "#3f51b5",
                    "&:hover": { bgcolor: "#e0e0e0" },
                    py: 2,
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    boxShadow: "0 4px 14px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  Khởi Động Tương Lai
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 20px 80px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  <Box
                    component="img"
                    src=""
                    alt="Tương Lai Tài Chính"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        {/* Abstract background elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "120%",
            height: "120%",
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.3) 0%, rgba(129,140,248,0) 70%)",
            zIndex: 0,
          }}
        />
      </Box>
    </Box>
  )
}

export default AboutUs

