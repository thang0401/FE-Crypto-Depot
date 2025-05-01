import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LocalOffer as DiscordIcon } from '@mui/icons-material';

// Define the type for referral history items
interface ReferralHistoryItem {
  no: number;
  address: string;
  joinDate: string;
  referrerBonus: string;
  referrerEarning: string;
  status: string;
}

const UserViewRefferal = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [referralLink] = useState('https://client-crypto-bank.vercel.app/?referral_code=c525wsnyya');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Sample data for the referral history table with proper typing
  const referralHistory: ReferralHistoryItem[] = [];

  return (
    <Grid container spacing={6}>
      {/* Referral System */}
      <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
          color: 'white',
          borderRadius: 2,
          display: 'flex', // Use flex to split left and right sections
          gap: 2,
        }}
      >
        {/* Left Section: Referral System */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              Referral System
            </Typography>
            <Tooltip title="Earn points by referring friends">
              <InfoOutlinedIcon sx={{ ml: 1 }} />
            </Tooltip>
          </Box>

          <Typography variant="h6">
            Refer a Friend to Earn <Box component="span" sx={{ fontWeight: 'bold' }}>5 USDC!</Box>
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyLink}
              sx={{
                bgcolor: 'white',
                color: 'black',
                width: '60%',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              Copy Link
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'black',
                color: 'white',
                width: '60%',
                '&:hover': { bgcolor: '#333' },
              }}
            >
              Nhận USDC
            </Button>
          </Box>
        </Box>

        {/* Right Section: Stats (Stacked Vertically) */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Referral Points */}
          <Paper
            sx={{
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ color: '#ff6b00', fontWeight: 'bold' }}>
              0 USDC
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Referral Points
            </Typography>
          </Paper>

          {/* Total Referrals */}
          <Paper
            sx={{
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                0
              </Typography>
              <Tooltip title="Number of successful referrals">
                <InfoOutlinedIcon sx={{ ml: 1 }} />
              </Tooltip>
            </Box>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Total Referrals
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Grid>

      {/* Tasks Section - Full width */}
      <Grid item xs={12}>
        <Paper 
          sx={{ 
            p: 3, 
            bgcolor: '#1a1a1a',
            color: 'white',
            border: '1px solid #333',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Nhiệm vụ
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TwitterIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Follow us on X</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<CheckCircleOutlineIcon />}
                sx={{ 
                  bgcolor: '#10b981', 
                  '&:hover': { bgcolor: '#0e9f6e' }
                }}
                disabled
              >
                Completed
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Follow us on X to earn <Box component="span" sx={{ color: '#ff6b00', fontWeight: 'bold' }}>5 USDC</Box>.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2, bgcolor: '#333' }} />
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DiscordIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Join our Discord</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<CheckCircleOutlineIcon />}
                sx={{ 
                  bgcolor: '#10b981', 
                  '&:hover': { bgcolor: '#0e9f6e' }
                }}
                disabled
              >
                Completed
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Join our Discord community to earn <Box component="span" sx={{ color: '#ff6b00', fontWeight: 'bold' }}>5 USDC</Box>.
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Referral History Section - Full width */}
      <Grid item xs={12}>
        <Paper 
          sx={{ 
            p: 3, 
            bgcolor: '#1a1a1a',
            color: 'white',
            border: '1px solid #333',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Referral History
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary' }}>No</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Address</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Join Date</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Referrer Bonus</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Referrer Earning</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referralHistory.length > 0 ? (
                  referralHistory.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.no}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.joinDate}</TableCell>
                      <TableCell>{row.referrerBonus}</TableCell>
                      <TableCell>{row.referrerEarning}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      No referral history to display.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Snackbar for copy notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          icon={false} // Hide the default success icon
          sx={{ 
            width: '100%', 
            bgcolor: 'white',
            color: 'black',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Removed the CheckCircleOutlineIcon component from here */}
            <CheckCircleOutlineIcon sx={{ color: '#10b981', mr: 1 }} />
            <Typography 
              variant="body1" 
              component="span" 
              sx={{ 
                fontWeight: 'medium',
                color: 'black'
              }}
            >
              <Box component="span" sx={{ fontWeight: 'bold' }}>Link copied</Box> to clipboard!
            </Typography>
            <Button 
              color="warning" 
              sx={{ 
                ml: 2, 
                color: '#ff6b00', 
                fontWeight: 'bold',
                '&:hover': { bgcolor: 'rgba(255, 107, 0, 0.1)' }
              }}
            >
              SEND IT TO EVERYONE
            </Button>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: 'black',
              opacity: 0.8,
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}
          >
            {referralLink}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default UserViewRefferal;