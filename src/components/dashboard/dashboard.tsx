'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, Wallet, Shield, ArrowRight, Globe, Lock, Activity, CreditCard, Menu } from 'lucide-react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationLinks = ['Tính năng', 'Giải pháp', 'Giá cả', 'Về chúng tôi'];

  const drawer = (
    <List>
      {navigationLinks.map((text) => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ bgcolor: '#f0f4f8' }}>
     
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
      <Box sx={{ pt: 16, pb: 12, background: 'linear-gradient(135deg, #f6f0fd 0%, #e2ecfe 100%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                 CryptoBank is <span style={{ color: '#3f51b5' }}>FUTURE</span>
                </Typography>
                <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4 }}>
                  Trải nghiệm dịch vụ ngân hàng liền mạch với sức mạnh của tiền điện tử. An toàn, nhanh chóng và được xây dựng cho thời đại hiện đại.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight />}
                    sx={{
                      bgcolor: '#3f51b5',
                      '&:hover': { bgcolor: '#283593' },
                      boxShadow: '0 4px 14px 0 rgba(63,81,181,0.39)',
                    }}
                  >
                    Bắt Đầu Ngay
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#3f51b5',
                      color: '#3f51b5',
                      '&:hover': { borderColor: '#283593', color: '#283593' },
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
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: '-10%',
                      background: 'linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      opacity: 0.1,
                      filter: 'blur(40px)'
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 80px 0 rgba(63,81,181,0.3)',
                    }}
                  >
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Bảng Điều Khiển Ngân Hàng"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: 'bold', color: '#1a237e' }}
          >
            MỌI THỨ BẠN CẦN, CHỈ CẦN MỘT CHẠM
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <Wallet className="w-12 h-12 text-blue-600" />,
                title: "Ví tiền điện tử",
                description: "Lưu trữ an toàn tiền điện tử của bạn với theo dõi và quản lý thời gian thực."
              },
              {
                icon: <Activity className="w-12 h-12 text-blue-600" />,
                title: "Giao dịch tức thì",
                description: "Thực hiện giao dịch ngay lập tức với tỷ giá cạnh tranh và phí tối thiểu."
              },
              {
                icon: <Shield className="w-12 h-12 text-blue-600" />,
                title: "Bảo mật cao",
                description: "Tài sản của bạn được bảo vệ cấp cao và xác thực đa yếu tố."
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)' }, borderRadius: '16px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>{feature.icon}</Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1a237e' }}>
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
      <Box sx={{ py: 12, bgcolor: '#f0f4f8' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e', mb: 4 }}>
                  Tại Sao Chọn CryptoBank?
                </Typography>
                <Box sx={{ mt: 6 }}>
                  {[
                    {
                      icon: <Globe className="w-8 h-8 text-blue-600" />,
                      title: "Truy cập từ mọi nơi",
                      description: "Truy cập ngân hàng của bạn từ bất kỳ đâu trên thế giới, 24/7."
                    },
                    {
                      icon: <Lock className="w-8 h-8 text-blue-600" />,
                      title: "Bảo mật nâng cao",
                      description: "Giao thức bảo mật tiên tiến để giữ an toàn cho tài sản của bạn."
                    },
                    {
                      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                      title: "Giao dịch dễ dàng",
                      description: "Chuyển đổi liền mạch giữa tiền điện tử và tiền pháp định."
                    }
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                      <Paper
                        sx={{
                          p: 2,
                          mr: 3,
                          bgcolor: '#c3e1f7',
                          color: 'primary.main',
                          borderRadius: '12px',
                        }}
                      >
                        {benefit.icon}
                      </Paper>
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                          {benefit.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {benefit.description}
                        </Typography>
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
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: '-10%',
                      background: 'linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%)',
                      borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
                      opacity: 0.1,
                      filter: 'blur(40px)'
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 80px 0 rgba(63,81,181,0.3)',
                    }}
                  >
                    <img
                      src="/images/pages/homepage-second-image.png"
                      alt=""
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
