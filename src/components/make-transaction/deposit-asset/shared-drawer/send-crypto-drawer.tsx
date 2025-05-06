import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Icon from 'src/@core/components/icon';
import Web3 from 'web3';

interface Props {
  open: boolean;
  toggle: () => void;
  tokenData: any[];
  walletPubkey: string;
  customerData: { id: string; name: string; phone: string; debitAccountId: string };
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2.25),
}));

const USDC_CONTRACT_ADDRESS = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d';
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
  {
    constant: false,
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

const SendCryptoDrawer = ({ open, toggle, tokenData, walletPubkey, customerData }: Props): JSX.Element => {
  const [portfolio, setPortfolio] = useState<string>(customerData?.debitAccountId || '');
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Trạng thái để vô hiệu hóa nút
  const cryptoBankWallet: string = process.env.NEXT_PUBLIC_CRYPTO_BANK_WALLET || '';

  useEffect(() => {
    if (customerData?.debitAccountId) {
      setPortfolio(customerData.debitAccountId);
    }
  }, [customerData]);

  const maxAmountOfAsset = async () => {
    if (!walletPubkey || !window.ethereum) {
      alert('Vui lòng kết nối ví trước!');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const arbitrumSepoliaChainId = 421614;
      if (network.chainId !== arbitrumSepoliaChainId) {
        alert('Vui lòng chuyển sang mạng Arbitrum Sepolia!');
        return;
      }

      const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, provider);
      const balance = await usdcContract.balanceOf(walletPubkey);
      const decimals = await usdcContract.decimals();
      const balanceInUnits = ethers.utils.formatUnits(balance, decimals);

      if (parseFloat(balanceInUnits) === 0) {
        alert('Ví của bạn không có USDC. Vui lòng lấy USDC từ faucet.');
        return;
      }

      setAmount(balanceInUnits);
    } catch (error) {
      console.error('Lỗi khi lấy số dư USDC:', error);
      alert('Không thể lấy số dư USDC. Kiểm tra mạng hoặc hợp đồng USDC.');
    }
  };

  const handleDeposit = async () => {
    if (!walletPubkey || !amount || !portfolio) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    setIsSubmitting(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, signer);
      const decimals = await usdcContract.decimals();
      const amountWei = ethers.utils.parseUnits(amount, decimals);

      // Gửi giao dịch USDC
      const tx = await usdcContract.transfer(cryptoBankWallet, amountWei);
      const receipt = await tx.wait();

      // Kiểm tra transactionHash đã sử dụng chưa
      const usedTxHashes = JSON.parse(localStorage.getItem('usedTxHashes') || '[]');
      if (usedTxHashes.includes(receipt.transactionHash)) {
        alert('Giao dịch này đã được xử lý. Vui lòng thực hiện giao dịch mới.');
        return;
      }

      // Lưu transactionHash vào danh sách đã sử dụng
      usedTxHashes.push(receipt.transactionHash);
      localStorage.setItem('usedTxHashes', JSON.stringify(usedTxHashes));

      const payload = {
        amount,
        debitAccountId: portfolio,
        fromPubKey: walletPubkey,
        toPubKey: cryptoBankWallet,
        transactionHash: receipt.transactionHash, // Sử dụng transactionHash gốc
      };

      console.log('Payload gửi lên:', payload);

      const response = await fetch('https://be-crypto-depot.name.vn/api/debitAccount/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Deposit thành công:', result);
        alert('Nạp thành công!');
        localStorage.setItem('transactionUpdated', Date.now().toString());
        toggle();
      } else {
        const errorText = await response.text();
        console.error('Lỗi khi lưu giao dịch:', errorText);
        alert('Lỗi khi lưu giao dịch: ' + errorText);
      }
    } catch (error) {
      console.error('Lỗi khi nạp USDC:', error);
      alert('Nạp thất bại!');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            InputProps={{ readOnly: true }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField
            type="text"
            label="Đến public key (Crypto Bank)"
            variant="outlined"
            value={cryptoBankWallet}
            InputProps={{ readOnly: true }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField
            type="text"
            label="Đến tài khoản Debit"
            variant="outlined"
            value={portfolio}
            InputProps={{ readOnly: true }}
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
          <Button
            size="large"
            variant="contained"
            sx={{ mr: 4 }}
            onClick={handleDeposit}
            disabled={isSubmitting} // Vô hiệu hóa nút khi đang xử lý
          >
            Nạp
          </Button>
          <Button size="large" variant="outlined" color="secondary" onClick={toggle}>
            Hủy
          </Button>
        </div>
      </Box>
    </Drawer>
  );
};

export default SendCryptoDrawer;
