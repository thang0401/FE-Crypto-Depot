import Link from 'next/link'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Icon from 'src/@core/components/icon'
import { Box, Typography } from '@mui/material'

interface Props {
  toggleAddPaymentDrawer: () => void
  toggleSendInvoiceDrawer: () => void
  setWalletPubkey: (pubkey: string) => void
  setTokenData: (tokenData: any) => void
}

const DepositActions = ({ toggleSendInvoiceDrawer, toggleAddPaymentDrawer, setWalletPubkey, setTokenData }: Props) => {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Kết nối với MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const address: string = accounts[0]
        setAccount(address)
        setIsConnected(true)
        setWalletPubkey(address)
        setTokenData([]) // Reset token data (có thể tùy chỉnh nếu cần)
      } catch (error) {
        console.error('Kết nối thất bại:', error)
      }
    } else {
      alert('Vui lòng cài đặt MetaMask!')
    }
  }

  // Ngắt kết nối ví
  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    setWalletPubkey('')
    setTokenData([])
  }

  // Sao chép địa chỉ ví
  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)

    }
  }

  // Thay đổi ví (yêu cầu kết nối lại)
  const changeWallet = async () => {
    await connectWallet()
  }

  // Kiểm tra trạng thái kết nối khi tải trang
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          setWalletPubkey(accounts[0])
        } else {
          disconnectWallet()
        }
      })
    }
  }, [setWalletPubkey])

  // Rút gọn địa chỉ ví để hiển thị
  const shortenAddress = (address: string | null) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card>
      <CardContent>
        {!isConnected ? (
          <>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 4, backgroundColor: '#F6851B' }} // Màu nhận diện của MetaMask
              onClick={connectWallet}
            >
              Kết nối ví
            </Button>
            {/* <Button
              fullWidth
              variant="contained"
              sx={{ mb: 4, backgroundColor: '#343A40' }}
              disabled
            >
              Ngắt kết nối ví
            </Button> */}
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, backgroundColor: '#F6851B', color: 'white', padding: 2, borderRadius: 1 }}>
              <Icon icon="mdi:wallet"  />
              <Typography>{shortenAddress(account)}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2, backgroundColor: '#343A40' }}
              onClick={copyAddress}
            >
              Sao chép địa chỉ
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 4, backgroundColor: '#343A40' }}
              onClick={disconnectWallet}
            >
              Ngắt kết nối
            </Button>
          </>
        )}

        <Button
          fullWidth
          sx={{ mb: 4 }}
          variant="contained"
          onClick={toggleSendInvoiceDrawer}
          startIcon={<Icon icon="bx:paper-plane" />}
        >
          Nhấn để nạp
        </Button>
        <Button fullWidth sx={{ mb: 4 }} variant="outlined" color="secondary">
          Tải xuống PDF
        </Button>
        <Button
          fullWidth
          sx={{ mb: 4 }}
          color="secondary"
          variant="outlined"
        >
          In hoá đơn
        </Button>
      </CardContent>
    </Card>
  )
}

export default DepositActions
