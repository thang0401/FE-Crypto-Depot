import { useState, useEffect } from 'react';
import { usePrivy, useMfaEnrollment } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { Button, Container, Typography } from '@mui/material';

export default function FingerprintPage() {
  const { ready, authenticated, user } = usePrivy();
  const { showMfaEnrollmentModal } = useMfaEnrollment();
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login');
    } else if (ready && authenticated && !user?.wallet) {
      router.push('/myDashboard');
    } else if (ready && authenticated && user?.wallet && user?.mfaMethods?.includes('passkey')) {
      router.push('/saving/my-portfolios/');
    }
  }, [ready, authenticated, user, router]);

  const handleRegisterFingerprint = () => {
    showMfaEnrollmentModal();
    setMessage('Please follow the prompt to register your fingerprint.');
    setTimeout(() => {
      if (user?.mfaMethods?.includes('passkey')) {
        router.push('/transaction');
      }
    }, 5000);
  };

  if (!ready) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register Your Fingerprint
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        Please register your fingerprint to enable secure transactions.
      </Typography>
      <Button
        variant="contained"
        fullWidth
        onClick={handleRegisterFingerprint}
        disabled={!authenticated || !user?.wallet}
      >
        Register Fingerprint
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
}
