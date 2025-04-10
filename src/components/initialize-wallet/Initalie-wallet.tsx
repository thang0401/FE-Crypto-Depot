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

  // Hàm gọi API để cập nhật wallet_address với kiểu rõ ràng
  const updateWalletAddress = async (id: string, walletAddress: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/initialize-wallet', {
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

      console.log('Wallet created successfully:')
      console.log('Address:', address)
      console.log('Seed Phrase:', seedPhrase)

      localStorage.setItem('walletInitialized', 'true')
      localStorage.setItem('walletAddress', address)

      const userId = localStorage.getItem('userId') || 'user_002' // Thay bằng cách lấy id thực tế
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

      console.log('Wallet imported successfully:')
      console.log('Address:', importingAddress)

      localStorage.setItem('walletInitialized', 'true')
      localStorage.setItem('walletAddress', importingAddress)

      const userId = localStorage.getItem('userId') || 'user_002' // Thay bằng cách lấy id thực tế
      await updateWalletAddress(userId, importingAddress)

      setErrorMessage(null)
      router.push('/fingerprint')
    } catch (error: any) {
      console.error('Failed to import wallet:', error)
      setErrorMessage('Không thể nhập ví. Vui lòng kiểm tra private key.')
    }
  }

  return (
    <Box>
      <h2>Initialize Your Wallet</h2>
      <Box>
        <Typography sx={{ mb: 2 }}>Please select an option to initialize your wallet.</Typography>
        <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleCreateWallet}>
          Create New Wallet
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
          onClick={handleImportWallet}
        >
          Import Wallet
        </Button>
        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>

      <Dialog open={openSeedDialog} onClose={() => setOpenSeedDialog(false)}>
        <DialogTitle>Your Recovery Phrase</DialogTitle>
        <DialogContent>
          <Typography>
            Please write down the following 12 words and keep them safe. You will need them to recover your wallet.
          </Typography>
          <Typography sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            {seedPhrase}
          </Typography>
          <Typography color="warning" sx={{ mt: 2 }}>
            Warning: Never share your recovery phrase with anyone!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSeedDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSeedDialogNext}>Next</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm Your Recovery Phrase</DialogTitle>
        <DialogContent>
          <Typography>
            Please enter the following words from your recovery phrase to confirm you have saved it correctly.
          </Typography>
          {confirmWords.map((item, idx) => (
            <TextField
              key={item.index}
              fullWidth
              label={`Word #${item.index + 1}`}
              value={userConfirmInputs[idx]}
              onChange={e => {
                const newInputs = [...userConfirmInputs]
                newInputs[idx] = e.target.value
                setUserConfirmInputs(newInputs)
              }}
              sx={{ mt: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmSeed}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
