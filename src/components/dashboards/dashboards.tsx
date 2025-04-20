'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Wallet,
  Shield,
  ArrowRight,
  Lock,
  Activity,
  CreditCard,
  ScrollText,
  Rocket,
  RefreshCw,
  Users,
  Globe,
  KeyRound
} from 'lucide-react'
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WalletInitializationDialog from './walletInitializationDialog'
import { usePrivy, useWallets, useCreateWallet, useImportWallet } from '@privy-io/react-auth' ///

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // // const theme = useTheme()
  // // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  // const router = useRouter()
  // const [openKycDialog, setOpenKycDialog] = useState(false)
  // const [openWalletDialog, setOpenWalletDialog] = useState(false);
  // // Set kycStatus = false
  // const [kycStatus, setKycStatus] = useState(false) // Assuming this status comes from an API
  // const [walletInitialized, setWalletInitialized] = useState(false);
  // const [privateKey, setPrivateKey] = useState('') ///
  // // Simulate checking kyc_status on login
  // useEffect(() => {
  //   // Replace with an actual API call to get kyc_status
  //   // Set kycStatus = false
  //   const storedData = localStorage.getItem("userKycStatus");
  //   const userKycStatus = storedData ? JSON.parse(storedData) : false;
  //   setKycStatus(userKycStatus)

  //   // Kiểm tra xem ví đã được khởi tạo chưa
  //   const walletInit = localStorage.getItem("walletInitialized") === "true";
  //   setWalletInitialized(walletInit);

  //   if (!userKycStatus) {
  //     setOpenKycDialog(true)
  //   } else if (!walletInit){
  //     setOpenWalletDialog(true);
  //   }
  // }, [])

  // // const handleConfirmKyc = () => {
  // //   setOpenKycDialog(false)
  // //   router.push("/kyc-center")
  // // }

  // // const handleSkipKyc = () => {
  // //   setOpenKycDialog(false)
  // // }

  // // const handleCloseWalletDialog = () => {
  // //   setOpenWalletDialog(false);
  // // };

  // const handleWalletInitialized = () => {
  //   setWalletInitialized(true);
  //   setOpenWalletDialog(false);
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigationLinks = ['Tính năng', 'Giải pháp', 'Giá cả', 'Về chúng tôi']

  const drawer = (
    <List>
      {navigationLinks.map(text => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )

  // /// Thêm Privy hooks
  // const { ready, authenticated, user } = usePrivy();
  // const { wallets } = useWallets();
  // const { createWallet } = useCreateWallet({
  //   onSuccess: () => {
  //     console.log('Ví được tạo thành công');
  //     setWalletInitialized(true);
  //     localStorage.setItem('walletInitialized', 'true');
  //     router.push('/fingerprint');
  //   },
  //   onError: (error) => console.error('Tạo ví thất bại:', error),
  // });
  // const { importWallet } = useImportWallet();

  // useEffect(() => {
  //   if (!ready) return;

  //   const storedKycStatus = localStorage.getItem('userKycStatus');
  //   const userKycStatus = storedKycStatus ? JSON.parse(storedKycStatus) : false;
  //   setKycStatus(userKycStatus);

  //   const walletInit = authenticated && !!user?.wallet && user?.mfaMethods?.includes('passkey');
  //   setWalletInitialized(walletInit);

  //   console.log('authenticated:', authenticated);
  //   console.log('user?.wallet:', user?.wallet);
  //   console.log('walletInitialized:', walletInit);
  //   console.log('mfaMethods:', user?.mfaMethods);

  //   if (!userKycStatus) {
  //     setOpenKycDialog(true);
  //   } else if (!walletInit) {
  //     setOpenWalletDialog(true);
  //   }
  // }, [ready, authenticated, user, router]);

  // const handleConfirmKyc = () => {
  //   setOpenKycDialog(false);
  //   router.push('/kyc-center');
  // };

  // const handleSkipKyc = () => {
  //   setOpenKycDialog(false);
  // };

  // const handleCloseWalletDialog = () => {
  //   setOpenWalletDialog(false);
  // };

  // const handleCreateWallet = () => {
  //   createWallet();
  // };

  // const handleImportWallet = async () => {
  //   try {
  //     await importWallet({ privateKey });
  //     console.log('Ví được nhập thành công');
  //     setWalletInitialized(true);
  //     localStorage.setItem('walletInitialized', 'true');
  //     router.push('/fingerprint');
  //   } catch (error) {
  //     console.error('Nhập ví thất bại:', error);
  //   }
  // };

  return (
    <Box>
      <Drawer
        variant='temporary'
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer>

      {/* Phần Giới Thiệu */}
      <Box sx={{ pt: 16, pb: 10 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={6} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant='h2' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
                  CryptoBank là <span style={{ color: 'inherit' }}>TƯƠNG LAI</span>
                </Typography>
                <Typography variant='h5' sx={{ mb: 4 }}>
                  Trải nghiệm các dịch vụ ngân hàng liền mạch được cung cấp bởi tiền mã hóa. An toàn, nhanh chóng và được xây dựng cho kỷ nguyên hiện đại.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant='contained'
                    size='large'
                    endIcon={<ArrowRight />}
                    sx={{
                      '&:hover': { bgcolor: 'inherit' }
                    }}
                  >
                    Bắt đầu ngay bây giờ
                  </Button>
                  <Button
                    variant='outlined'
                    size='large'
                    sx={{
                      '&:hover': { borderColor: 'inherit', color: 'inherit' }
                    }}
                  >
                    Tìm hiểu thêm
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
                      opacity: 0.1,
                      filter: 'blur(40px)'
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden'
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

      {/* Phần Tính Năng */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom sx={{ mb: 8, fontWeight: 'bold', mt: 0 }}>
            Không rủi ro, chỉ tốc độ - Chúng tôi sẽ dẫn đầu
          </Typography>
          <Grid container spacing={4}>
            {[
              // {
              //   icon: <Activity className="w-12 h-12" />,
              //   title: "Giao dịch tức thời",
              //   description: "Thực hiện giao dịch ngay lập tức với tỷ giá cạnh tranh và phí tối thiểu.",
              // },
              {
                icon: <KeyRound className='w-12 h-12' />,
                title: 'Ví có thể khôi phục',
                description: 'Mất quyền truy cập vào ví của bạn? Đừng lo. Chúng tôi sẽ giữ tài sản của bạn an toàn và có thể khôi phục.'
              },
              {
                icon: <ScrollText className='w-12 h-12' />,
                title: 'Lập kế hoạch thừa kế',
                description: 'Một kế hoạch thừa kế tài sản kỹ thuật số để bảo vệ những kỷ niệm quý giá và thông tin quan trọng.'
              },
              {
                icon: <Shield className='w-12 h-12' />,
                title: 'Tiết kiệm bí mật',
                description: 'Khoản tiết kiệm của bạn luôn riêng tư, an toàn và chỉ bạn có thể thấy.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      transition: '0.3s',
                      '&:hover': { transform: 'translateY(-8px)' },
                      borderRadius: '16px'
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>{feature.icon}</Box>
                      <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {feature.title}
                      </Typography>
                      <Typography align='center'>{feature.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Phần Lợi Ích */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={8} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant='h3' component='h2' gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                  Tại sao chọn CryptoBank?
                </Typography>
                <Box sx={{ mt: 12 }}>
                  {[
                    {
                      icon: <Shield className='w-8 h-8' />,
                      title: 'Riêng tư & Ẩn danh',
                      description:
                        'Dữ liệu tài khoản tiết kiệm của bạn hoàn toàn riêng tư, không bị theo dõi, không bị phơi bày, mang lại tự do tài chính thực sự.'
                    },
                    {
                      icon: <ScrollText className='w-8 h-8' />,
                      title: 'Lập kế hoạch thừa kế tiền mã hóa',
                      description:
                        'Thiết lập kế hoạch thừa kế để chuyển giao tài sản số của bạn trong trường hợp xảy ra sự cố bất ngờ.'
                    },
                    {
                      icon: <Users className='w-8 h-8' />,
                      title: 'Ví có thể khôi phục',
                      description:
                        'Mất quyền truy cập vào ví của bạn? Đừng lo. Chúng tôi sẽ giữ tài sản của bạn an toàn và có thể khôi phục.'
                    },
                    {
                      icon: <Rocket className='w-8 h-8' />,
                      title: 'Hoàn hảo cho người mới bắt đầu với tiền mã hóa',
                      description:
                        'CryptoBank giúp bạn đầu tư và lưu trữ tài sản an toàn, bảo vệ bạn khỏi các thất bại từ sàn giao dịch.'
                    }
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                      <Paper
                        sx={{
                          p: 2,
                          pb: 1,
                          mr: 3,
                          borderRadius: '12px'
                        }}
                      >
                        {benefit.icon}
                      </Paper>
                      <Box>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                          {benefit.title}
                        </Typography>
                        <Typography>{benefit.description}</Typography>
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
                      opacity: 0.1,
                      filter: 'blur(40px)'
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src='/images/pages/homepage-second-image.png'
                      alt='Hình ảnh minh họa CryptoBank'
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Phần Kêu Gọi Hành Động */}
      <Box
        sx={{
          py: 8,
          marginLeft: 10,
          marginRight: 8,
          borderRadius: 4,
          bgcolor: 'background.paper',
          boxShadow: 3
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={6} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant='h3' component='h2' gutterBottom sx={{ fontWeight: 'bold' }}>
                  Sẵn sàng tạo tài khoản?
                </Typography>
                <Typography variant='body1' sx={{ mb: 4, textAlign: 'justify', mr: 5 }}>
                  Bắt đầu hành trình đầu tư tiền mã hóa của bạn một cách an toàn với CryptoBank. Bạn đã sẵn sàng bảo vệ tài sản số của mình khỏi các rủi ro thị trường phổ biến chưa? CryptoBank cung cấp giải pháp lưu ký toàn diện, cho phép bạn quản lý tài sản dễ dàng mà không lo lắng về bảo mật hay các thủ tục phức tạp.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 3 }}>
                  <Typography variant='h5' sx={{ mb: 8 }}>
                    Đăng ký ngay bây giờ và nhận $5 phí giao dịch miễn phí!
                  </Typography>
                  <Button
                    variant='contained'
                    size='large'
                    endIcon={<ArrowRight />}
                    sx={{
                      '&:hover': { bgcolor: 'inherit' },
                      fontWeight: 'bold',
                      marginLeft: 40
                    }}
                  >
                    Tạo tài khoản ngay
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Phần Câu Hỏi Thường Gặp */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom sx={{ mb: 8, fontWeight: 'bold' }}>
            Câu Hỏi Thường Gặp
          </Typography>
          <Grid container spacing={4} justifyContent='left'>
            <Grid item xs={12} md={20}>
              {[
                {
                  question: 'CryptoBank là gì?',
                  answer:
                    'CryptoBank là một nền tảng Web3 cho phép người dùng quản lý tài sản mã hóa mà không cần xử lý ví hoặc khóa riêng.'
                },
                {
                  question: 'CryptoBank có lưu trữ ví và tài sản của tôi không?',
                  answer:
                    'Có, CryptoBank sử dụng ví Web3 độc đáo để quản lý tài sản của người dùng, đảm bảo lưu trữ an toàn.'
                },
                {
                  question: 'Làm thế nào để đăng ký và sử dụng CryptoBank?',
                  answer:
                    'Chỉ cần đăng ký với Tên người dùng và Mật khẩu. Không cần tạo ví hoặc quản lý khóa riêng.'
                },
                {
                  question: 'Tôi có thể nhận tài sản Web3 từ các ví khác không?',
                  answer: 'Có, bạn có thể nhận tài sản từ bất kỳ ví Web3 nào chỉ bằng Tên người dùng—không cần đăng nhập.'
                },
                {
                  question: 'Làm thế nào để chuyển tài sản giữa các Tên người dùng?',
                  answer:
                    'Bạn có thể chuyển tài sản Web3 đến bất kỳ Tên người dùng nào trong hệ thống mà không cần tương tác với blockchain.'
                },
                {
                  question: 'CryptoBank có tính phí giao dịch không?',
                  answer: 'Phí giao dịch được tối ưu hóa, giảm chi phí bằng cách xử lý giao dịch nội bộ.'
                },
                {
                  question: 'Tôi có cần kiến thức về Web3 hoặc blockchain để sử dụng CryptoBank không?',
                  answer:
                    'Không, CryptoBank thân thiện với người dùng—chỉ cần Tên người dùng và Mật khẩu, không cần chuyên môn blockchain.'
                },
                {
                  question: 'Điều gì xảy ra nếu tôi quên mật khẩu?',
                  answer: 'Bạn có thể khôi phục mật khẩu bằng cách xác minh thông tin để đảm bảo an toàn.'
                },
                {
                  question: 'CryptoBank có hỗ trợ giao dịch liên chuỗi không?',
                  answer:
                    'Hiện tại, CryptoBank hỗ trợ một số blockchain nhất định nhưng đang khám phá khả năng giao dịch liên chuỗi trong tương lai.'
                }
              ].map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2, borderRadius: '8px !important' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>
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

      {/* Hộp thoại KYC */}
      {/* <Dialog open={openKycDialog} onClose={handleSkipKyc}>
        <DialogTitle>Hoàn thành xác minh danh tính (KYC)</DialogTitle>
        <DialogContent>
          <Typography>
            Tài khoản của bạn chưa được xác minh. Vui lòng hoàn thành KYC để truy cập tất cả các tính năng.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipKyc} color="primary">
            Bỏ qua
          </Button>
          <Button onClick={handleConfirmKyc} variant="contained" color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openWalletDialog} onClose={handleCloseWalletDialog}>
        <DialogTitle>Khởi tạo ví của bạn</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Vui lòng chọn một tùy chọn để khởi tạo ví của bạn.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateWallet}
            sx={{ mb: 2 }}
            disabled={walletInitialized}
          >
            Tạo ví mới
          </Button>
          <TextField
            fullWidth
            label="Khóa riêng"
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleImportWallet}
            disabled={!privateKey || walletInitialized}
          >
            Nhập ví
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWalletDialog}>Hủy</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  )
}

export default Dashboard