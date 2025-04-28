// pages/payment/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Gọi API để kiểm tra trạng thái giao dịch nếu cần
    alert('Thanh toán thành công!');
    router.push('/buy-sell'); // Chuyển hướng về trang exchange
  }, []);

  return (
    <Container>
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4">Thanh toán thành công</Typography>
        <Typography>Đang chuyển hướng...</Typography>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;