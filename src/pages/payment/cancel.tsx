// pages/payment/cancel.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';

const PaymentCancel = () => {
  const router = useRouter();

  useEffect(() => {
    alert('Thanh toán đã bị hủy!');
    router.push('/buy-sell');
  }, []);

  return (
    <Container>
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4">Thanh toán bị hủy</Typography>
        <Typography>Đang chuyển hướng...</Typography>
      </Box>
    </Container>
  );
};

export default PaymentCancel;