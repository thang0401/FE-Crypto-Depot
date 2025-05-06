'use client';

import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { InputAdornment } from '@mui/material';
import Icon from 'src/@core/components/icon';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  open: boolean;
  toggle: () => void;
  userData: { id: string; fullName: string; email: string; phoneNumber: string };
  walletPubkey: string;
  tokenData: any[];
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2.25),
}));

const cryptoBankWallet: string = process.env.NEXT_PUBLIC_CRYPTO_BANK_WALLET || '';

const WithdrawCryptoDrawer = ({ open, toggle, userData, walletPubkey, tokenData }: Props) => {
  const [portfolio, setPortfolio] = useState<string>('d00ucnk5ig8jm25nu66y');
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchDebitAccount = async () => {
      try {
        const response = await fetch(`https://be-crypto-depot.name.vn/api/debitAccount/search?phoneNumber=${userData.phoneNumber}`, {
          method: 'GET',
        });
        const users = await response.json();
        if (users.length > 0) {
          setPortfolio(users[0].debitAccountId);
        }
      } catch (error) {
        console.error('Error fetching debit account:', error);
      }
    };

    if (userData) {
      fetchDebitAccount();
    }
  }, [userData]);

  const maxAmountOfAsset = async () => {
    try {
      const response = await fetch(`https://be-crypto-depot.name.vn/api/debitAccount/balance/${userData.id}`, {
        method: 'GET',
      });
      const balance = await response.json();
      setAmount(balance.toString());
    } catch (error) {
      console.error('Error fetching balance:', error);
      alert('Không thể lấy số dư. Vui lòng thử lại.');
    }
  };

  const handleWithdraw = async () => {
    if (!walletPubkey || !amount || !portfolio) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    setIsSubmitting(true);

    try {
      const transactionHash = uuidv4();
      const payload = {
        amount,
        debitAccountId: portfolio,
        fromPubKey: cryptoBankWallet,
        toPubKey: walletPubkey,
        transactionHash,
      };

      console.log('Payload gửi lên:', payload);

      const response = await fetch('https://be-crypto-depot.name.vn/api/debitAccount/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Withdraw thành công:', result);
        alert('Rút thành công!');
        localStorage.setItem('transactionUpdated', Date.now().toString());
        toggle();
      } else {
        const errorText = await response.text();
        console.error('Lỗi khi rút USDC:', errorText);
        alert(errorText); // Hiển thị thông báo lỗi chi tiết từ BE
      }
    } catch (error) {
      console.error('Lỗi khi rút USDC:', error);
      alert(error);
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
          Rút USDC về ví web3
        </Typography>
        <IconButton onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon="bx:x" fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 6, pt: 8 }}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField
            type="text"
            label="Từ tài khoản"
            variant="outlined"
            value={portfolio}
            InputProps={{ readOnly: true }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField
            type="text"
            label="Địa chỉ ví web3 nhận"
            variant="outlined"
            value={walletPubkey}
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
            sx={{ ml: 2 }}
          >
            Max
          </Button>
        </FormControl>
        <Box sx={{ mb: 6 }}></Box>
        <div>
          <Button
            size="large"
            variant="contained"
            sx={{ mr: 4 }}
            onClick={handleWithdraw}
            disabled={isSubmitting}
          >
            Rút USDC
          </Button>
          <Button size="large" variant="outlined" color="secondary" onClick={toggle}>
            Huỷ
          </Button>
        </div>
      </Box>
    </Drawer>
  );
};

export default WithdrawCryptoDrawer;
