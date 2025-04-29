'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Web3 from 'web3'
import { mnemonicGenerate, mnemonicToEntropy } from '@polkadot/util-crypto'

export default function InitializeWallet() {
  const router = useRouter()
  const [privateKey, setPrivateKey] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null)
  const [openSeedDialog, setOpenSeedDialog] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [confirmWords, setConfirmWords] = useState<{ index: number; word: string }[]>([])
  const [userConfirmInputs, setUserConfirmInputs] = useState<string[]>(['', '', ''])

  const web3 = new Web3()

  // Hàm gọi API để cập nhật wallet_address
  const updateWalletAddress = async (id: string, walletAddress: string) => {
    try {
      const response = await fetch('/api/users/initialize-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, walletAddress }),
      })
      if (!response.ok) {
        throw new Error('Failed to update wallet address')
      }
      console.log('Wallet address updated successfully')
    } catch (error) {
      console.error('Error updating wallet address:', error)
      setErrorMessage('Không thể cập nhật địa chỉ ví. Vui lòng thử lại.')
    }
  }

  const handleCreateWallet = () => {
    try {
      const mnemonic = mnemonicGenerate(12)
      setSeedPhrase(mnemonic)
      setOpenSeedDialog(true)
    } catch (error: any) {
      console.error('Failed to create wallet:', error)
      setErrorMessage('Không thể tạo ví mới. Vui lòng thử lại.')
    }
  }

  const handleSeedDialogNext = () => {
    if (!seedPhrase) return
    const words = seedPhrase.split(' ')
    const randomIndexes = [3, 6, 9].map(i => ({
      index: i,
      word: words[i],
    }))
    setConfirmWords(randomIndexes)
    setUserConfirmInputs(['', '', ''])
    setOpenSeedDialog(false)
    setOpenConfirmDialog(true)
  }

  const handleConfirmSeed = async () => {
    if (!seedPhrase || !confirmWords.length) return

    const words = seedPhrase.split(' ')
    const isValid = confirmWords.every((item, idx) =>
      userConfirmInputs[idx].toLowerCase().trim() === item.word.toLowerCase()
    )

    if (isValid) {
      const entropy = mnemonicToEntropy(seedPhrase)
      const account = web3.eth.accounts.create()
      const { address } = account

      console.log('Wallet created successfully:', { address, seedPhrase })

      localStorage.setItem('walletInitialized', 'true')
      localStorage.setItem('walletAddress', address)

      const userId = localStorage.getItem('userId') || 'user_002'
      await updateWalletAddress(userId, address)

      setOpenConfirmDialog(false)
      router.push('/fingerprint')
    } else {
      setErrorMessage('Các từ xác nhận không đúng. Vui lòng kiểm tra lại.')
    }
  }

  const handleImportWallet = async () => {
    try {
      if (!privateKey) {
        setErrorMessage('Vui lòng nhập private key.')
        return
      }

      let normalizedPrivateKey = privateKey.trim()
      if (!normalizedPrivateKey.startsWith('0x')) {
        normalizedPrivateKey = '0x' + normalizedPrivateKey
      }

      if (!/^0x[0-9a-fA-F]{64}$/.test(normalizedPrivateKey)) {
        setErrorMessage('Private key không hợp lệ. Phải là chuỗi hex 64 ký tự.')
        return
      }

      const account = web3.eth.accounts.privateKeyToAccount(normalizedPrivateKey)
      const importingAddress = account.address

      console.log('Wallet imported successfully:', { importingAddress })

      localStorage.setItem('walletInitialized', 'true')
      localStorage.setItem('walletAddress', importingAddress)

      const userId = localStorage.getItem('userId') || 'user_002'
      await updateWalletAddress(userId, importingAddress)

      setErrorMessage(null)
      router.push('/fingerprint')
    } catch (error: any) {
      console.error('Failed to import wallet:', error)
      setErrorMessage('Không thể nhập ví. Vui lòng kiểm tra private key.')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f0f2f5',
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Khởi tạo ví của bạn
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Vui lòng chọn một tùy chọn để khởi tạo ví của bạn.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 2, py: 1.5, fontWeight: 'bold' }}
          onClick={handleCreateWallet}
        >
          Tạo ví mới
        </Button>

        <TextField
          fullWidth
          label="Private Key"
          type="password"
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          disabled={!privateKey}
          sx={{ py: 1.5, fontWeight: 'bold' }}
          onClick={handleImportWallet}
        >
          Nhập ví
        </Button>

        {errorMessage && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>

      <Dialog
        open={openSeedDialog}
        onClose={() => setOpenSeedDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle align="center">Cụm từ khôi phục của bạn</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Vui lòng ghi lại 12 từ sau đây và giữ chúng ở nơi an toàn. Bạn sẽ cần chúng để khôi phục ví của mình.
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              wordBreak: 'break-word',
            }}
          >
            <Typography variant="body2">{seedPhrase}</Typography>
          </Box>
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            Cảnh báo: Không bao giờ chia sẻ cụm từ khôi phục của bạn với bất kỳ ai!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={() => setOpenSeedDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleSeedDialogNext}>
            Tiếp theo
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle align="center">Xác nhận cụm từ khôi phục</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Vui lòng nhập các từ sau từ cụm từ khôi phục của bạn để xác nhận bạn đã lưu đúng.
          </Typography>
          {confirmWords.map((item, idx) => (
            <TextField
              key={item.index}
              fullWidth
              label={`Từ số ${item.index + 1}`}
              value={userConfirmInputs[idx]}
              onChange={e => {
                const newInputs = [...userConfirmInputs]
                newInputs[idx] = e.target.value
                setUserConfirmInputs(newInputs)
              }}
              sx={{ mb: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={() => setOpenConfirmDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleConfirmSeed}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
