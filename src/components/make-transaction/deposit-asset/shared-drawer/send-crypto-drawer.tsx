import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { InputAdornment } from '@mui/material'
import { useState } from 'react'
import { ethers } from 'ethers'
import Icon from 'src/@core/components/icon'

interface Props {
  open: boolean
  toggle: () => void
  tokenData: any[]
  walletPubkey: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2.25),
}))

const USDC_CONTRACT_ADDRESS = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d' // Địa chỉ USDC trên Arbitrum Sepolia
const USDC_ABI = [
  {
    constant: true,
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
]

const SendCryptoDrawer = ({ open, toggle, tokenData, walletPubkey }: Props) => {
  const [portfolio, setPortfolio] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  // Lấy số dư USDC tối đa
  const maxAmountOfAsset = async () => {
    if (!walletPubkey || !window.ethereum) {
      alert('Vui lòng kết nối ví trước!')
      return
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      const arbitrumSepoliaChainId = 421614 // Chain ID của Arbitrum Sepolia
      if (network.chainId !== arbitrumSepoliaChainId) {
        alert('Vui lòng chuyển sang mạng Arbitrum Sepolia!')
        return
      }

      const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, provider)
      const balance: ethers.BigNumber = await usdcContract.balanceOf(walletPubkey)
      const decimals: number = await usdcContract.decimals()
      const balanceInUnits = ethers.utils.formatUnits(balance, decimals)

      if (parseFloat(balanceInUnits) === 0) {
        alert('Ví của bạn không có USDC. Vui lòng lấy USDC từ faucet.')
        return
      }

      setAmount(balanceInUnits)
    } catch (error) {
      console.error('Lỗi khi lấy số dư USDC:', error)
      alert('Không thể lấy số dư USDC. Kiểm tra mạng hoặc hợp đồng USDC.')
    }
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
      ModalProps={{ keepMounted: true }}
    >
      <Header>
        <Typography variant="h6" sx={{ fontSize: '1.125rem !important' }}>
          Thông tin nạp
        </Typography>
        <IconButton onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon="bx:x" fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 6, pt: 8 }}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField
            type="text"
            label="Từ public key"
            variant="outlined"
            value={walletPubkey}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField
            type="text"
            label="Đến tài khoản Debit"
            variant="outlined"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 6 }}>
          <TextField
            type="number"
            label="Số lượng"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">USDC</InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            onClick={maxAmountOfAsset}
            disabled={!walletPubkey}
            sx={{ ml: 2 }}
          >
            Tối đa
          </Button>
        </FormControl>
        <Box sx={{ mb: 6 }}></Box>
        <div>
          <Button size="large" variant="contained" sx={{ mr: 4 }}>
            Nạp
          </Button>
          <Button size="large" variant="outlined" color="secondary" onClick={toggle}>
            Hủy
          </Button>
        </div>
      </Box>
    </Drawer>
  )
}

export default SendCryptoDrawer
