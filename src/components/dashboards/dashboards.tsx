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
  //     console.log('Wallet created successfully');
  //     setWalletInitialized(true);
  //     localStorage.setItem('walletInitialized', 'true');
  //     router.push('/fingerprint');
  //   },
  //   onError: (error) => console.error('Failed to create wallet:', error),
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
  //     console.log('Wallet imported successfully');
  //     setWalletInitialized(true);
  //     localStorage.setItem('walletInitialized', 'true');
  //     router.push('/fingerprint');
  //   } catch (error) {
  //     console.error('Failed to import wallet:', error);
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

      {/* Hero Section */}
      <Box sx={{ pt: 16, pb: 10 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={6} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant='h2' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
                  CryptoBank is <span style={{ color: 'inherit' }}>FUTURE</span>
                </Typography>
                <Typography variant='h5' sx={{ mb: 4 }}>
                  Experience seamless banking services powered by cryptocurrency. Secure, fast, and built for the modern
                  era.
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
                    Get started now
                  </Button>
                  <Button
                    variant='outlined'
                    size='large'
                    sx={{
                      '&:hover': { borderColor: 'inherit', color: 'inherit' }
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

      {/* Features Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom sx={{ mb: 8, fontWeight: 'bold', mt: 0 }}>
            No risk, just speed - We'll take the lead
          </Typography>
          <Grid container spacing={4}>
            {[
              // {
              //   icon: <Activity className="w-12 h-12" />,
              //   title: "Instant transactions",
              //   description: "Execute transactions instantly with competitive rates and minimal fees.",
              // },.
              {
                icon: <KeyRound className='w-12 h-12' />,
                title: 'Recoverable wallet',
                description: 'Lost access to your wallet? No worries. We will keep your assets secure and recoverable'
              },
              {
                icon: <ScrollText className='w-12 h-12' />,
                title: 'Inheritance planning',
                // description: "Securely store your cryptocurrency with real-time tracking and management.",
                description: 'A digital asset inheritance plan to safeguard cherished memories and vital information.'
                // "Một kế hoạch thừa kế tài sản kỹ thuật số để bảo vệ những kỷ niệm quý giá và thông tin quan trọng."
              },
              {
                icon: <Shield className='w-12 h-12' />,
                title: 'Confidential savings',
                description: 'Your savings stay private, secure, and invisible to everyone but you.'
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

      {/* Benefits Section */}
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
                  Why Choose CryptoBank?
                </Typography>
                <Box sx={{ mt: 12 }}>
                  {[
                    {
                      icon: <Shield className='w-8 h-8' />,
                      title: 'Private & Anonymous',
                      description:
                        'Your saving account data remains fully private no-tracking, no exposure, just true financial freedom.'
                    },
                    {
                      icon: <ScrollText className='w-8 h-8' />,
                      title: 'Crypto inheritance planning',
                      description:
                        'Set up an inheritance plan to transfer your digital assets in case of unforeseen circumstances.'
                    },
                    {
                      icon: <Users className='w-8 h-8' />,
                      title: 'Recoverable wallet',
                      description:
                        'Lost access to your wallet? No worries. We will keep your assets secure and recoverable.'
                    },
                    {
                      icon: <Rocket className='w-8 h-8' />,
                      title: 'Perfect for crypto beginners',
                      description:
                        'CryptoBank helps you invest and store assets safely, protecting you from exchange failures.'
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
                      alt=''
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
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
                  Ready to Create an Account?
                </Typography>
                <Typography variant='body1' sx={{ mb: 4, textAlign: 'justify', mr: 5 }}>
                  Start your cryptocurrency investment journey securely with CryptoBank. Are you ready to protect your
                  digital assets from common market risks? CryptoBank provides a comprehensive custody solution,
                  allowing you to manage assets effortlessly without security concerns or complex procedures.
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
                    Sign up now and receive $5 in transaction fees!
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
                    Create an Account Now
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom sx={{ mb: 8, fontWeight: 'bold' }}>
            FAQ
          </Typography>
          <Grid container spacing={4} justifyContent='left'>
            <Grid item xs={12} md={20}>
              {[
                {
                  question: 'What is CryptoBank?',
                  answer:
                    'CryptoBank is a Web3 platform that enables users to manage crypto assets without handling wallets or private keys.'
                },
                {
                  question: 'Does CryptoBank store my wallet and assets?',
                  answer:
                    'Yes, CryptoBank utilizes a unique Web3 wallet to manage user assets, ensuring safe custody storage.'
                },
                {
                  question: 'How do I sign up and use CryptoBank?',
                  answer:
                    'Simply register with a Username and Password. No need to create a wallet or manage private keys.'
                },
                {
                  question: 'Can I receive Web3 assets from other wallets?',
                  answer: 'Yes, you can receive assets from any Web3 wallet using just your Username—no login required.'
                },
                {
                  question: 'How do I transfer assets between Usernames?',
                  answer:
                    'You can transfer Web3 assets to any Username within the system without blockchain interactions.'
                },
                {
                  question: 'Does CryptoBank charge transaction fees?',
                  answer: 'Transaction fees are optimized, reducing costs by processing transactions internally.'
                },
                {
                  question: 'Do I need Web3 or blockchain knowledge to use CryptoBank?',
                  answer:
                    'No, CryptoBank is user-friendly—just a Username and Password are needed, with no blockchain expertise required.'
                },
                {
                  question: 'What happens if I forget my password?',
                  answer: 'You can recover your password by verifying your information to ensure security.'
                },
                {
                  question: 'Does CryptoBank support cross-chain transactions?',
                  answer:
                    'Currently, CryptoBank supports select blockchains but is exploring cross-chain transaction capabilities for the future.'
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

      {/* KYC Dialog */}
      {/* <Dialog open={openKycDialog} onClose={handleSkipKyc}>
        <DialogTitle>Complete Identity Verification (KYC)</DialogTitle>
        <DialogContent>
          <Typography>
            Your account has not been verified. Please complete KYC to access all features.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipKyc} color="primary">
            Skip
          </Button>
          <Button onClick={handleConfirmKyc} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openWalletDialog} onClose={handleCloseWalletDialog}>
        <DialogTitle>Initialize Your Wallet</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Please select an option to initialize your wallet.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateWallet}
            sx={{ mb: 2 }}
            disabled={walletInitialized}
          >
            Create New Wallet
          </Button>
          <TextField
            fullWidth
            label="Private Key"
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
            Import Wallet
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWalletDialog}>Cancel</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  )
}

export default Dashboard
