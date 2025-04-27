'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box, Container, Typography, Paper, Grid,
  TextField, FormControl, InputLabel,
  Select, MenuItem, Button, ToggleButton,
  ToggleButtonGroup, InputAdornment, IconButton, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Styled components (giữ nguyên như code gốc)
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

  // Giả định userId lấy từ context hoặc auth
  const userId = 'cvc142nsillh6aihs0g0'; // Thay bằng logic lấy userId từ token/auth

  // Số dư và tỷ giá (lấy từ API thay vì hard-code)
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [vndBalance, setVndBalance] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [rateDisplayMode, setRateDisplayMode] = useState('normal');

  // Base URL của backend
  const API_BASE_URL = 'https://be-crypto-depot.name.vn/api/payment'; // Thay bằng URL thực tế

  // Hàm lấy số dư và tỷ giá từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả định có API lấy số dư (cần xác nhận với backend)
        // const balanceResponse = await axios.get(`${API_BASE_URL}/balance/${userId}`);
        // setUsdcBalance(balanceResponse.data.usdcBalance);
        // setVndBalance(balanceResponse.data.vndBalance);

        // Giả định có API lấy tỷ giá
        // const rateResponse = await axios.get(`${API_BASE_URL}/exchange-rate`);
        // setExchangeRate(rateResponse.data.rate);

        // Tạm thời dùng giá trị hard-coded
        setUsdcBalance(98.55);
        setVndBalance(1555235);
        setExchangeRate(26003.73);
      } catch (err) {
        setError('Không thể tải dữ liệu số dư hoặc tỷ giá');
      }
    };
    fetchData();
  }, []);

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
      setInsufficientBalance(!isNaN(numericValue) && numericValue > usdcBalance);

      if (!isNaN(numericValue)) {
        const calculated = (numericValue * exchangeRate).toFixed(2);
        setReceiveAmount(formatNumber(calculated));
      } else {
        setReceiveAmount('0.00');
      }
    } else {
      inputValue = inputValue.replace(/[^0-9,]/g, '');
      const numericValue = parseFloat(inputValue.replace(/,/g, ''));
      setInsufficientBalance(!isNaN(numericValue) && numericValue > vndBalance);

      if (!isNaN(numericValue)) {
        setPayAmount(formatNumber(numericValue));
        const calculated = (numericValue / exchangeRate).toFixed(2);
        setReceiveAmount(calculated);
      } else {
        setPayAmount(inputValue);
        setReceiveAmount('0.00');
      }
    }
  };

  const handleMaxClick = () => {
    const maxAmount = tradeType === 'buy' ? vndBalance : usdcBalance;
    if (tradeType === 'buy') {
      setPayAmount(formatNumber(maxAmount));
    } else {
      setPayAmount(maxAmount.toString());
    }
    setHasUserTyped(true);
    setInsufficientBalance(false);

    if (tradeType === 'buy') {
      const calculated = (maxAmount / exchangeRate).toFixed(2);
      setReceiveAmount(calculated);
    } else {
      const calculated = (maxAmount * exchangeRate).toFixed(2);
      setReceiveAmount(formatNumber(calculated));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (tradeType === 'buy') {
        // Gọi API deposit
        const orderId = `ORDER_${Date.now()}`; // Tạo orderId duy nhất
        const response = await axios.post(`${API_BASE_URL}/deposit`, {
          orderId,
          amount: parseFloat(payAmount.replace(/,/g, '')),
          description: `Nạp`,
          returnUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
          userId
        });
        // Chuyển hướng đến URL thanh toán từ PayOS
        window.location.href = response.data.checkoutUrl; // Giả định response trả về paymentUrl
      } else {
        // Gọi API withdraw
        const response = await axios.post(`${API_BASE_URL}/withdraw`, {
          userId,
          amount: parseFloat(payAmount)
        });
        // Hiển thị thông báo thành công
        alert('Yêu cầu rút tiền đã được gửi!');
        // Reset form
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

  const toggleRateDisplayMode = () => {
    setRateDisplayMode(rateDisplayMode === 'normal' ? 'inverse' : 'normal');
  };

  const getFormattedRate = () => {
    if (rateDisplayMode === 'normal') {
      return `1 USDC = ${formatNumber(exchangeRate)} VND`;
    } else {
      const inverseRate = (1 / exchangeRate).toFixed(8);
      return `1 VND = ${inverseRate} USDC`;
    }
  };

  const getCurrentBalance = () => {
    return payingCurrency === 'VND'
      ? `${formatNumber(vndBalance)} VND`
      : `${usdcBalance} USDC`;
  };

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
                placeholder={tradeType === 'buy' ? "Tối thiểu: 2.600" : "Tối thiểu: 0.1"}
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
                  Số dư {payingCurrency} không đủ
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Số dư: {getCurrentBalance()}
              </Typography>
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
              <IconButton
                onClick={toggleRateDisplayMode}
                size="small"
                sx={{ ml: 1, color: '#0292B1' }}
              >
                <SwapHorizIcon fontSize="small" />
              </IconButton>
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
    </Box>
  );
};

export default CryptoExchangeForm;