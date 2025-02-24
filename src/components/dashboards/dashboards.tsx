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
                Experience seamless banking services powered by cryptocurrency. Secure, fast, and built for the modern era.
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
                    Get started now
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
                    Learn more
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
                    {/* 1st Image dashboard */}
                    {/* <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Bảng Điều Khiển Ngân Hàng"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    /> */}
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
                title: "Crypto wallet",
                description: "Securely store your cryptocurrency with real-time tracking and management.",
              },
              {
                icon: <Activity className="w-12 h-12 text-blue-600" />,
                title: "Instant transactions",
                description: "Execute transactions instantly with competitive rates and minimal fees.",
              },
              {
                icon: <Shield className="w-12 h-12 text-blue-600" />,
                title: "High Security",
                description: "Your assets are safeguarded with top-tier security and multi-factor authentication.",
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
                  Why Choose CryptoBank?
                </Typography>
                <Box sx={{ mt: 12 }}>
                  {[
                    {
                      icon: <Lock className="w-8 h-8 text-blue-600" />,
                      title: "Ultimate asset protection",
                      description: "Only you have access to your account balance, ensuring absolute security against unauthorized access.",
                    },
                    {
                      icon: <ScrollText className="w-8 h-8 text-blue-600" />,
                      title: "Crypto inheritance planning",
                      description: "Set up an inheritance plan to transfer your digital assets in case of unforeseen circumstances.",
                    },
                    {
                      icon: <Rocket className="w-8 h-8 text-blue-600" />,
                      title: "Perfect for crypto beginners",
                      description: "CryptoBank helps you invest and store assets safely, protecting you from exchange failures.",
                    },
                    {
                      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                      title: "Seamless crypto transfers",
                      description: "Send crypto to others—even those without a Web3 wallet—in just three minutes after creating an account.",
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
                Ready to Create an Account?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" , textAlign: "justify", mr: 5 }} >
                Start your cryptocurrency investment journey securely with CryptoBank. Are you ready to protect your digital assets from common market risks? CryptoBank provides a comprehensive custody solution, allowing you to manage assets effortlessly without security concerns or complex procedures.
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
                  Sign up now and receive $5 in transaction fees!
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
                    Create an Account Now 
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
            FAQ
          </Typography>
          <Grid container spacing={4} justifyContent="left">
            <Grid item xs={12} md={20}>
              {[
                {
                  question: "What is CryptoBank?",
                  answer:
                    "CryptoBank is a Web3 platform that enables users to manage crypto assets without handling wallets or private keys.",
                },
                {
                  question: "Does CryptoBank store my wallet and assets?",
                  answer:
                    "Yes, CryptoBank utilizes a unique Web3 wallet to manage user assets, ensuring safe custody storage.",
                },
                {
                  question: "How do I sign up and use CryptoBank?",
                  answer:
                    "Simply register with a Username and Password. No need to create a wallet or manage private keys.",
                },
                {
                  question: "Can I receive Web3 assets from other wallets?",
                  answer:
                    "Yes, you can receive assets from any Web3 wallet using just your Username—no login required.",
                },
                {
                  question: "How do I transfer assets between Usernames?",
                  answer:
                    "You can transfer Web3 assets to any Username within the system without blockchain interactions.",
                },
                {
                  question: "Does CryptoBank charge transaction fees?",
                  answer:
                    "Transaction fees are optimized, reducing costs by processing transactions internally.",
                },
                {
                  question: "Do I need Web3 or blockchain knowledge to use CryptoBank?",
                  answer:
                    "No, CryptoBank is user-friendly—just a Username and Password are needed, with no blockchain expertise required.",
                },
                {
                  question: "What happens if I forget my password?",
                  answer: "You can recover your password by verifying your information to ensure security.",
                },
                {
                  question: "Does CryptoBank support cross-chain transactions?",
                  answer:
                    "Currently, CryptoBank supports select blockchains but is exploring cross-chain transaction capabilities for the future."
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

