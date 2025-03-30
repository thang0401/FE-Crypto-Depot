'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
  DialogActions,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import Sidebar from './sidebar'
import Link from 'next/link'
import Main from './main'
import { useCreateWallet, useImportWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'

const UserDashboard = () => {
   const router = useRouter()
    const [openKycDialog, setOpenKycDialog] = useState(false)
    const [openWalletDialog, setOpenWalletDialog] = useState(false);
    // Set kycStatus = false
    const [kycStatus, setKycStatus] = useState(false) // Assuming this status comes from an API
    const [walletInitialized, setWalletInitialized] = useState(false);
    const [privateKey, setPrivateKey] = useState('') ///
    // Simulate checking kyc_status on login
    useEffect(() => {
      // Replace with an actual API call to get kyc_status
      // Set kycStatus = false
      const storedData = localStorage.getItem("userKycStatus");
      const userKycStatus = storedData ? JSON.parse(storedData) : false;
      setKycStatus(userKycStatus)

      // Kiểm tra xem ví đã được khởi tạo chưa
      const walletInit = localStorage.getItem("walletInitialized") === "true";
      setWalletInitialized(walletInit);

      if (!userKycStatus) {
        setOpenKycDialog(true)
      } else if (!walletInit){
        setOpenWalletDialog(true);
      }
    }, [])

    // const handleConfirmKyc = () => {
    //   setOpenKycDialog(false)
    //   router.push("/kyc-center")
    // }

    const handleSkipKyc = () => {
      setOpenKycDialog(false)
    }

    // const handleCloseWalletDialog = () => {
    //   setOpenWalletDialog(false);
    // };

    const handleWalletInitialized = () => {
      setWalletInitialized(true);
      setOpenWalletDialog(false);
    };
    // const handleDrawerToggle = () => {
    //   setMobileOpen(!mobileOpen)
    // }

    const navigationLinks = ['Tính năng', 'Giải pháp', 'Giá cả', 'Về chúng tôi']

    // const drawer = (
    //   <List>
    //     {navigationLinks.map(text => (
    //       <ListItem button key={text}>
    //         <ListItemText primary={text} />
    //       </ListItem>
    //     ))}
    //   </List>
    // )

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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Sidebar open={open} onToggle={handleDrawerToggle} /> */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 0,
          width: { md: `calc(100% - ${280}px)` },
          minHeight: '100vh'
        }}
      >
        {isMobile && (
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 1100,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Main />

        {/* Thêm nút chuyển đến trang USDC Transfer */}
        {/* <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
                    <Link href="/transfer" passHref style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "24px",
                                px: 3,
                                py: 1.5,
                                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                            }}
                        >
                            Go to USDC Transfer
                        </Button>
                    </Link>
                </Box> */}
      </Box>
      {/* <Dialog open={openKycDialog} onClose={handleSkipKyc}>
        <DialogTitle>Complete Identity Verification (KYC)</DialogTitle>
        <DialogContent>
          <Typography>Your account has not been verified. Please complete KYC to access all features.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipKyc} color='primary'>
            Skip
          </Button>
          <Button onClick={handleConfirmKyc} variant='contained' color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* <Dialog open={openWalletDialog} onClose={handleCloseWalletDialog}>
        <DialogTitle>Initialize Your Wallet</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Please select an option to initialize your wallet.</Typography>
          <Button
            variant='contained'
            fullWidth
            onClick={handleCreateWallet}
            sx={{ mb: 2 }}
            disabled={walletInitialized}
          >
            Create New Wallet
          </Button>
          <TextField
            fullWidth
            label='Private Key'
            type='password'
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant='contained'
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

export default UserDashboard
