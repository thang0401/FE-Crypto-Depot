'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box, Container, Typography, Paper, Grid,
  TextField, Button, ToggleButton, ToggleButtonGroup,
  InputAdornment, IconButton, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AddBankAccount from './AddBankAccount';

// Styled components (giữ nguyên)
const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
  padding: '24px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 24px',
  fontWeight: 'bold',
  width: '100%',
  textTransform: 'none',
  fontSize: '16px',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  marginBottom: '24px',
  '& .MuiToggleButton-root': {
    width: '50%',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '12px 0',
    textTransform: 'none',
    borderRadius: 0,
    '&.Mui-selected': {
      backgroundColor: '#0292B1',
      color: 'white',
      borderBottom: '3px solid #0292B1',
      '&:hover': {
        backgroundColor: '#03A9D2',
      }
    },
    '&:first-of-type': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    }
  },
}));

const CryptoIcon = styled('div')(({ theme }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '8px',
}));

const USDCIcon = () => (
  <CryptoIcon>
    <img src="/images/logos/usdc-logo-removebg-preview.png" alt="USDC" width={24} height={24} />
  </CryptoIcon>
);

const VNDCurrencyIcon = () => (
  <CryptoIcon style={{ backgroundColor: 'red', color: 'white' }}>
    V
  </CryptoIcon>
);

const CurrencySelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '12px',
  cursor: 'pointer',
}));

const CryptoExchangeForm = () => {
  const router = useRouter();
  const [tradeType, setTradeType] = useState('buy');
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('0.00');
  const [payingCurrency, setPayingCurrency] = useState('VND');
  const [receivingCurrency, setReceivingCurrency] = useState('USDC');
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openBankAccountDialog, setOpenBankAccountDialog] = useState(false);

  // State để lưu userId, số dư, và frozenBalance
  const [userId, setUserId] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number>(0);
  const [frozenBalance, setFrozenBalance] = useState<number>(0);

  const BACKEND_API_URL = 'https://be-crypto-depot.name.vn/api';

  // Lấy userId và số dư ban đầu
  useEffect(() => {
    const fetchUserDataAndBalance = async () => {
      setIsCheckingAuth(true);
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          const id = parsedData.id;
          setUserId(id);

          // Gọi API để lấy số dư và frozenBalance
          const response = await axios.post('/api/get-balance', { userId: id });
          const { balance, frozenBalance } = response.data;
          setUsdcBalance(balance || 0);
          setFrozenBalance(frozenBalance || 0);
        } catch (err) {
          console.error('Lỗi khi lấy dữ liệu:', err);
          setError('Không thể lấy thông tin người dùng hoặc số dư. Vui lòng thử lại.');
        } finally {
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
        router.push('/login');
      }
    };

    fetchUserDataAndBalance();
  }, [router]);

  // Hàm làm mới số dư
  const handleRefreshBalance = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // Thay đổi từ /api/refresh-balance sang /api/get-balance
      const response = await axios.post('/api/refresh-balance', { userId });
      const { balance, frozenBalance } = response.data;
      setUsdcBalance(balance || 0);
      setFrozenBalance(frozenBalance || 0);
      setSuccessMessage('Số dư đã được cập nhật!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Lỗi khi làm mới số dư:', err);
      setError('Không thể làm mới số dư. Vui lòng liên hệ hỗ trợ.');
      return
    } finally {
      setLoading(false);
    }
  };

  // Tỷ giá cố định
  const buyExchangeRate = 0.0000383; // 1 VND = 0.0000383 USDC
  const sellExchangeRate = 25850; // 1 USDC = 25,850 VND
  const MIN_ORDER = 30000;
  const MAX_ORDER = 200000000;

  // Hàm định dạng số
  const formatNumber = (num: number | string): string => {
    const value = parseFloat(num.toString().replace(/,/g, ''));
    if (isNaN(value)) return '';
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? parts.join('.') : parts[0];
  };

  const handleTradeTypeChange = (event: React.MouseEvent<HTMLElement>, newTradeType: string | null) => {
    if (newTradeType !== null) {
      setTradeType(newTradeType);
      if (newTradeType === 'buy') {
        setPayingCurrency('VND');
        setReceivingCurrency('USDC');
      } else {
        setPayingCurrency('USDC');
        setReceivingCurrency('VND');
      }
      setPayAmount('');
      setReceiveAmount('0.00');
      setHasUserTyped(false);
      setInsufficientBalance(false);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handlePayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    setHasUserTyped(true);

    if (tradeType === 'sell') {
      inputValue = inputValue.replace(/[^0-9.]/g, '');
      const decimalCount = (inputValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        const parts = inputValue.split('.');
        inputValue = parts[0] + '.' + parts.slice(1).join('');
      }
      const [integerPart, decimalPart] = inputValue.split('.');
      const formattedInteger = formatNumber(integerPart);
      const formattedValue = decimalPart !== undefined
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;
      setPayAmount(formattedValue);

      const numericValue = parseFloat(inputValue);
      setInsufficientBalance(!isNaN(numericValue) && numericValue > (usdcBalance - frozenBalance));

      if (!isNaN(numericValue)) {
        const calculated = (numericValue * sellExchangeRate).toFixed(2);
        setReceiveAmount(formatNumber(calculated));
      } else {
        setReceiveAmount('0.00');
      }
    } else {
      inputValue = inputValue.replace(/[^0-9,]/g, '');
      const numericValue = parseFloat(inputValue.replace(/,/g, ''));
      setInsufficientBalance(
        !isNaN(numericValue) && (numericValue < MIN_ORDER || numericValue > MAX_ORDER)
      );

      if (!isNaN(numericValue)) {
        setPayAmount(formatNumber(numericValue));
        const calculated = (numericValue * buyExchangeRate).toFixed(2);
        setReceiveAmount(calculated);
      } else {
        setPayAmount(inputValue);
        setReceiveAmount('0.00');
      }
    }
  };

  const handleMaxClick = () => {
    const maxAmount = tradeType === 'buy' ? MAX_ORDER : (usdcBalance - frozenBalance);
    if (tradeType === 'buy') {
      setPayAmount(formatNumber(maxAmount));
      const calculated = (maxAmount * buyExchangeRate).toFixed(2);
      setReceiveAmount(calculated);
    } else {
      setPayAmount(maxAmount.toString());
      const calculated = (maxAmount * sellExchangeRate).toFixed(2);
      setReceiveAmount(formatNumber(calculated));
    }
    setHasUserTyped(true);
    setInsufficientBalance(false);
  };

  const handleSubmit = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (tradeType === 'buy') {
        const orderId = `ORDER_${Date.now()}`;
        const amount = parseFloat(payAmount.replace(/,/g, ''));

        // Gọi API /payment/deposit
        const response = await axios.post('https://be-crypto-depot.name.vn/api/payment/deposit', {
          orderId,
          amount,
          description: `Nạp`,
          returnUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
          userId,
        });

        // Lấy orderCode từ response
        const orderCode = response.data.orderCode || orderId;

        // Lưu thông tin vào localStorage
        localStorage.setItem('lastOrderCode', orderCode);
        localStorage.setItem('lastAmount', amount.toString());
        localStorage.setItem('lastUserId', userId);

        // Redirect đến checkoutUrl
        window.location.href = response.data.checkoutUrl;
      } else {
        // Kiểm tra isBankAccount trong localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (!parsedData.bankAccount) {
            setOpenBankAccountDialog(true);
            setLoading(false);
            return;
          }
        }

        // Tiếp tục xử lý yêu cầu rút tiền
        const response = await axios.post('/api/withdraw', {
          userId,
          amount: parseFloat(payAmount),
        });
        setSuccessMessage('Yêu cầu rút tiền đã được gửi và đang chờ phê duyệt. Vui lòng kiểm tra trạng thái sau.');
        const balanceResponse = await axios.post('/api/get-balance', { userId });
        const { balance, frozenBalance } = balanceResponse.data;
        setUsdcBalance(balance || 0);
        setFrozenBalance(frozenBalance || 0);
        setPayAmount('');
        setReceiveAmount('0.00');
        setHasUserTyped(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi thêm tài khoản ngân hàng thành công
  const handleBankAccountSuccess = () => {
    setSuccessMessage('Tài khoản ngân hàng đã được thêm thành công. Vui lòng tiếp tục giao dịch.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const getFormattedRate = () => {
    if (tradeType === 'buy') {
      return `1 VND = ${buyExchangeRate} USDC`;
    } else {
      return `1 USDC = ${formatNumber(sellExchangeRate)} VND`;
    }
  };

  const getCurrentBalance = () => {
    if (payingCurrency === 'USDC') {
      return (
        <Box>
          <Typography variant="body2" color="text.secondary">
            Khả dụng: {usdcBalance - frozenBalance} USDC
          </Typography>
          {frozenBalance > 0 && (
            <Typography variant="body2" color="text.secondary">
              Đang chờ rút: {frozenBalance} USDC
            </Typography>
          )}
        </Box>
      );
    }
    return `Giới hạn: ${formatNumber(MIN_ORDER)} - ${formatNumber(MAX_ORDER)} VND`;
  };

  if (isCheckingAuth) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 6,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          top: '10%',
          left: '0%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: 'rgba(138, 84, 255, 0.1)',
          bottom: '10%',
          right: '5%',
          zIndex: 0,
        }}
      />
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledCard elevation={0}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            <StyledToggleButtonGroup
              value={tradeType}
              exclusive
              onChange={handleTradeTypeChange}
              aria-label="loại giao dịch"
            >
              <ToggleButton value="buy" aria-label="mua">
                Mua
              </ToggleButton>
              <ToggleButton value="sell" aria-label="bán">
                Bán
              </ToggleButton>
            </StyledToggleButtonGroup>

            <Box mb={3}>
              <Typography variant="body1" mb={1}>
                Tôi sẽ trả
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={payAmount}
                onChange={handlePayAmountChange}
                placeholder={tradeType === 'buy' ? "30,000 - 200,000,000" : "Tối thiểu: 0.1"}
                error={insufficientBalance}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box display="flex" alignItems="center">
                        <Button
                          size="small"
                          sx={{
                            mr: 1,
                            color: '#6366f1',
                          }}
                          onClick={handleMaxClick}
                        >
                          TỐI ĐA
                        </Button>
                        <CurrencySelector>
                          {payingCurrency === 'VND' ? <VNDCurrencyIcon /> : <USDCIcon />}
                          <Typography variant="body1" fontWeight="medium">{payingCurrency}</Typography>
                        </CurrencySelector>
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              {insufficientBalance && (
                <Typography color="error" variant="body2">
                  {tradeType === 'buy'
                    ? `Số tiền phải từ ${formatNumber(MIN_ORDER)} đến ${formatNumber(MAX_ORDER)} VND`
                    : 'Số dư khả dụng không đủ'}
                </Typography>
              )}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {getCurrentBalance()}
                <Button
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefreshBalance}
                  disabled={loading}
                  sx={{ color: '#0292B1' }}
                >
                  Làm mới
                </Button>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="body1" mb={1}>
                Tôi sẽ nhận
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={hasUserTyped ? receiveAmount : ''}
                disabled
                placeholder="0.00"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CurrencySelector>
                        {receivingCurrency === 'USDC' ? <USDCIcon /> : <VNDCurrencyIcon />}
                        <Typography variant="body1" fontWeight="medium">{receivingCurrency}</Typography>
                      </CurrencySelector>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mb={3} display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Với tỷ giá: {getFormattedRate()}
              </Typography>
            </Box>

            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={insufficientBalance || !hasUserTyped || payAmount === '' || loading}
              sx={{ bgcolor: '#0292B1', '&:hover': { bgcolor: '#03A9D2' } }}
            >
              {loading ? 'Đang xử lý...' : tradeType === 'buy' ? 'Mua USDC' : 'Bán USDC'}
            </StyledButton>
          </StyledCard>
        </motion.div>
      </Container>

      <AddBankAccount
        open={openBankAccountDialog}
        onOpenChange={setOpenBankAccountDialog}
        onSuccess={handleBankAccountSuccess}
      />
    </Box>
  );
};

export default CryptoExchangeForm;
