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
      icon: <Cpu className="w-16 h-16 transition-all duration-300 group-hover:scale-110" />,
      title: "AI-Driven Finance",
      description: "Integrating artificial intelligence to provide personalized financial advice and smart risk management.",
    },
    {
      icon: <Network className="w-16 h-16 transition-all duration-300 group-hover:scale-110" />,
      title: "Comprehensive DeFi Ecosystem",
      description:
        "Building a complete decentralized finance ecosystem, connecting all financial services on the blockchain.",
    },
    {
      icon: <Leaf className="w-16 h-16 transition-all duration-300 group-hover:scale-110" />,
      title: "Green Finance",
      description:
        "Developing sustainable and environmentally friendly financial products, supporting global green projects.",
    },
    {
      icon: <Shield className="w-16 h-16 transition-all duration-300 group-hover:scale-110" />,
      title: "Quantum Security",
      description:
        "Applying quantum encryption technology to protect customers' digital assets from future threats.",
    },
  ]
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ pt: 16, pb: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                  About CryptoBank
                </Typography>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  We are shaping the future of banking with blockchain and cryptocurrency technology.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* <Box
                  component="img"
                  src=""
                  alt="CryptoBank Vision"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 20px 80px 0 rgba(0,0,0,0.3)",
                  }}
                /> */}
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  CryptoBank is committed to providing a comprehensive and accessible financial system for everyone by
                  leveraging the power of blockchain and cryptocurrency technology. We believe that the future of finance
                  is decentralized, secure, and transparent.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  We also aim to educate and empower users about digital finance, helping them make smart and confident
                  financial decisions in this digital era.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {[
                  { icon: <Users className="w-6 h-6" />, text: "Serving over 10,000+ customers" },
                  { icon: <Target className="w-6 h-6" />, text: "Operating in 15+ countries" },
                  { icon: <Zap className="w-6 h-6" />, text: "Processing 2,000+ transactions per second" },
                  { icon: <Shield className="w-6 h-6" />, text: "24/7 security for your assets" },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ height: "100%", borderRadius: "16px", boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)" }}>
                      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            p: 1,
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
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: "bold" }}
          >
            FUTURE VISION
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
                          transition: "all 0.3s ease-in-out",
                          mb: 2
                        }}
                      >
                        {vision.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        align="center"
                        sx={{
                          transition: "all 0.3s ease-in-out",
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
      <Box sx={{ py: 12, position: "relative", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" position="relative" zIndex={1}>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                  Discover the Future of Finance
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                  Join us in the financial digital revolution. Shape your future with CryptoBank.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight />}
                  sx={{
                    "&:hover": { bgcolor: "inherit" },
                    py: 2,
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    boxShadow: "0 4px 14px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  Start the Future
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
                  {/* <Box
                    component="img"
                    src=""
                    alt="Future of Finance"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  /> */}
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        {/* Abstract background elements (removed colors, using neutral opacity) */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "120%",
            height: "120%",
            background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
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
            background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
            zIndex: 0,
          }}
        />
      </Box>
    </Box>
  )
}

export default AboutUs