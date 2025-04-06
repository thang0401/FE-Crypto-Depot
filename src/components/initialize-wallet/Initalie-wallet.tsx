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
// import { useCreateWallet, useImportWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Web3 from 'web3';

export default function InitializeWallet() {
  const router = useRouter()
  // const { wallets } = useWallets();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [privateKey, setPrivateKey] = useState('')
  // Simulate checking kyc_status on login
  // useEffect(() => {
    // Replace with an actual API call to get kyc_status
    // Set kycStatus = false
    // const storedData = localStorage.getItem("userKycStatus");
    // const userKycStatus = storedData ? JSON.parse(storedData) : false;
    // setKycStatus(userKycStatus)

    // Kiểm tra xem ví đã được khởi tạo chưa
    // const walletInit = localStorage.getItem('walletInitialized') === 'true'
    // setWalletInitialized(walletInit)

    // if (!userKycStatus) {
    //   setOpenKycDialog(true)
    // } else if (!walletInit){
    //   setOpenWalletDialog(true);
    // }
  // }, [])

  // const handleConfirmKyc = () => {
  //   setOpenKycDialog(false)
  //   router.push('/kyc-center')
  // }

  // const handleSkipKyc = () => {
  //   setOpenKycDialog(false)
  // }

  // const handleCloseWalletDialog = () => {
  //   setOpenWalletDialog(false);
  // };

  // const handleWalletInitialized = () => {
  //   setWalletInitialized(true)
  //   setOpenWalletDialog(false)
  // }
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen)
  // }

  // /// Thêm Privy hooks
  // const { ready, authenticated, user } = usePrivy()
  // const { wallets } = useWallets()
  // const { createWallet } = useCreateWallet({
  //   onSuccess: () => {
  //     console.log('Wallet created successfully')
  //     // setWalletInitialized(true)
  //     localStorage.setItem('walletInitialized', 'true')
  //     router.push('/fingerprint')
  //   },
  //   onError: error => console.error('Failed to create wallet:', error)
  // })
  // const { importWallet } = useImportWallet()

  // useEffect(() => {
  //   if (!ready) return

    // const storedKycStatus = localStorage.getItem('userKycStatus');
    // const userKycStatus = storedKycStatus ? JSON.parse(storedKycStatus) : false;
    // setKycStatus(userKycStatus);

    // const walletInit = authenticated && !!user?.wallet && user?.mfaMethods?.includes('passkey')
    // setWalletInitialized(walletInit)

    // console.log('authenticated:', authenticated)
    // console.log('user?.wallet:', user?.wallet)
    // console.log('walletInitialized:', walletInit)
    // console.log('mfaMethods:', user?.mfaMethods)

    // if (!userKycStatus) {
    //   setOpenKycDialog(true);
    // } else if (!walletInit) {
    //   setOpenWalletDialog(true);
    // }
  // }, [ready, authenticated, user, router])

  // const handleConfirmKyc = () => {
  //   setOpenKycDialog(false);
  //   router.push('/kyc-center');
  // };

  // const handleSkipKyc = () => {
  //   setOpenKycDialog(false);
  // };

  // const handleCloseWalletDialog = () => {
  //   setOpenWalletDialog(false)
  // }

  // const handleCreateWallet = () => {
  //   createWallet()
  // }

  // const handleImport = async () => {
  //   try {
  //     if (!privateKey) {
  //       setErrorMessage('Vui lòng nhập private key.');
  //       return;
  //     }
  //     let normalizedPrivateKey = privateKey.trim();
  //     if (!normalizedPrivateKey.startsWith('0x')) {
  //       normalizedPrivateKey = '0x' + normalizedPrivateKey;
  //     }
  //     if (!/^0x[0-9a-fA-F]{64}$/.test(normalizedPrivateKey)) {
  //       setErrorMessage('Private key không hợp lệ. Phải là chuỗi hex 64 ký tự (có thể không cần "0x" khi nhập).');
  //       return;
  //     }
  //     const web3 = new Web3();
  //     const account = web3.eth.accounts.privateKeyToAccount(normalizedPrivateKey);
  //     const importingAddress = account.address.toLowerCase();
  //     const addressExists = wallets.some(
  //       (wallet) => wallet.address.toLowerCase() === importingAddress
  //     );
  //     if (addressExists) {
  //       setErrorMessage('Ví với địa chỉ này đã tồn tại trong hệ thống.');
  //       return;
  //     }
  //     console.log('Importing wallet with private key:', normalizedPrivateKey);
  //     await importWallet({ privateKey: normalizedPrivateKey });
  //     console.log('Wallet imported successfully:', importingAddress);
  //     router.push('/fingerprint');
  //   } catch (error: any) {
  //     console.error('Failed to import wallet:', error);
  //     setErrorMessage(error.message || 'Không thể nhập ví. Vui lòng kiểm tra private key.');
  //   }
  // };


  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  // const [open, setOpen] = useState(false)

  // const handleDrawerToggle = () => {
  //   setOpen(!open)
  // }

  return (
    <Box>
      <h2>Initialize Your Wallet</h2>
      <Box>
        <Typography sx={{ mb: 2 }}>Please select an option to initialize your wallet.</Typography>
        <Button variant='contained' fullWidth  sx={{ mb: 2 }} >
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
        <Button variant='contained' fullWidth  disabled={!privateKey}>
          Import Wallet
        </Button>
      </Box>
      {/* <Box>
        <Button onClick={handleCloseWalletDialog}>Cancel</Button>
      </Box> */}
    </Box>
  )
}
