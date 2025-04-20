'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Container, Typography, Paper, Grid, 
  TextField, FormControl, InputLabel, 
  Select, MenuItem, SelectChangeEvent,
  Button, ToggleButton, ToggleButtonGroup,
  InputAdornment, IconButton, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useRouter } from 'next/navigation';

// Styled components
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
        backgroundColor: ' #03A9D2',
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
     <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=024" alt="USDC" width={24} height={24} />
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
  
  // Default balances
  const usdcBalance = 98.55;
  const vndBalance = 1555235;
  
  const exchangeRate = 26003.73;
  // Thêm state cho chế độ hiển thị tỷ giá
  const [rateDisplayMode, setRateDisplayMode] = useState('normal'); // 'normal' hoặc 'inverse'

  // Hàm định dạng số với dấu phẩy ngăn cách hàng nghìn
  const formatNumber = (num: number | string) : string => {
    // Chuyển đổi sang số
    const value = parseFloat(num.toString().replace(/,/g, ''));
    if (isNaN(value)) return '';
    
    // Chia phần nguyên và phần thập phân
    const parts = value.toString().split('.');
    
    // Định dạng phần nguyên với dấu phẩy ngăn cách hàng nghìn
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Nối lại với phần thập phân (nếu có)
    return parts.length > 1 ? parts.join('.') : parts[0];
  };

  const handleTradeTypeChange = (event: React.MouseEvent<HTMLElement>, newTradeType: string | null) => {
    if (newTradeType !== null) {
      setTradeType(newTradeType);
      // Swap currencies when changing trade type
      if (newTradeType === 'buy') {
        setPayingCurrency('VND');
        setReceivingCurrency('USDC');
      } else {
        setPayingCurrency('USDC');
        setReceivingCurrency('VND');
      }
      // Reset amounts and user typing state
      setPayAmount('');
      setReceiveAmount('0.00');
      setHasUserTyped(false);
      setInsufficientBalance(false);
    }
  };

  const handlePayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Allow decimal points and numbers
    let inputValue = event.target.value;
    
    // Set user has typed flag
    setHasUserTyped(true);
    
    // For USDC (sell tab), we need to handle decimals specially
    if (tradeType === 'sell') {
        // Chỉ cho phép số và dấu chấm (loại bỏ ký tự không hợp lệ)
        inputValue = inputValue.replace(/[^0-9.]/g, '');
        
        // Đảm bảo chỉ có một dấu chấm
        const decimalCount = (inputValue.match(/\./g) || []).length;
        if (decimalCount > 1) {
            const parts = inputValue.split('.');
            inputValue = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Tách phần nguyên và phần thập phân
        const [integerPart, decimalPart] = inputValue.split('.');
        const formattedInteger = formatNumber(integerPart); // Định dạng phần nguyên
        
        // Kết hợp lại với phần thập phân nếu có
        const formattedValue = decimalPart !== undefined 
            ? `${formattedInteger}.${decimalPart}` 
            : formattedInteger;
        
        // Cập nhật payAmount với giá trị đã định dạng
        setPayAmount(formattedValue);
        
        // Kiểm tra số dư và tínhível toán receiveAmount
        const numericValue = parseFloat(inputValue);
        setInsufficientBalance(!isNaN(numericValue) && numericValue > usdcBalance);
        
        if (!isNaN(numericValue)) {
            const calculated = (numericValue * exchangeRate).toFixed(2);
            setReceiveAmount(formatNumber(calculated));
        } else {
            setReceiveAmount('0.00');
        }
    } else {
      // For VND (buy tab)
      inputValue = inputValue.replace(/[^0-9,]/g, '');
      
      // Process commas for VND
      const numericValue = parseFloat(inputValue.replace(/,/g, ''));
      
      // Check balance for VND
      setInsufficientBalance(!isNaN(numericValue) && numericValue > vndBalance);
      
      // Định dạng số với dấu phẩy ngăn cách hàng nghìn
      if (!isNaN(numericValue)) {
        setPayAmount(formatNumber(numericValue));
        
        // Tính toán số tiền nhận được
        const calculated = (numericValue / exchangeRate).toFixed(2);
        setReceiveAmount(calculated);
      } else {
        setPayAmount(inputValue);
        setReceiveAmount('0.00');
      }
    }
  };

  const handleMaxClick = () => {
    // Use the appropriate balance based on trade type
    const maxAmount = tradeType === 'buy' ? vndBalance : usdcBalance;
    
    if (tradeType === 'buy') {
      setPayAmount(formatNumber(maxAmount));
    } else {
      // For USDC, just set the raw value without formatting
      setPayAmount(maxAmount.toString());
    }
    
    setHasUserTyped(true);
    setInsufficientBalance(false);
    
    // Update receive amount based on max
    if (tradeType === 'buy') {
      const calculated = (maxAmount / exchangeRate).toFixed(2);
      setReceiveAmount(calculated);
    } else {
      const calculated = (maxAmount * exchangeRate).toFixed(2);
      setReceiveAmount(formatNumber(calculated));
    }
  };

  const handleSubmit = () => {
    // Handle the buy/sell transaction
    console.log(`${tradeType === 'buy' ? 'Mua' : 'Bán'} ${receiveAmount} ${receivingCurrency}`);
  };

  // Hàm để chuyển đổi chế độ hiển thị tỷ giá
  const toggleRateDisplayMode = () => {
    setRateDisplayMode(rateDisplayMode === 'normal' ? 'inverse' : 'normal');
  };

  // Hiển thị tỷ giá theo chế độ đã chọn
  const getFormattedRate = () => {
    if (rateDisplayMode === 'normal') {
      return `1 USDC = ${formatNumber(exchangeRate)} VND`;
    } else {
      const inverseRate = (1 / exchangeRate).toFixed(8);
      return `1 VND = ${inverseRate} USDC`;
    }
  };

  // Get current balance based on the currency
  const getCurrentBalance = () => {
    return payingCurrency === 'VND' 
      ? `${formatNumber(vndBalance)} VND` 
      : `${usdcBalance} USDC`;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      py: 6, 
    //   background: 'linear-gradient(135deg, #f5f7fa 0%, #e9eef2 100%)',
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
            
            {/* {insufficientBalance && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Số dư không đủ
              </Alert>
            )} */}
            
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
                            // bgcolor: '#f3f4f6', 
                            color: '#6366f1',
                            // '&:hover': { bgcolor: '#e5e7eb' }
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
              disabled={insufficientBalance || !hasUserTyped || payAmount === ''}
              sx={{ bgcolor: '#0292B1', '&:hover': { bgcolor: '#03A9D2' } }}
            >
              {tradeType === 'buy' ? 'Mua USDC' : 'Bán USDC'}
            </StyledButton>
          </StyledCard>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CryptoExchangeForm;