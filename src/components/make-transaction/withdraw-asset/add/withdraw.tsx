'use client';

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import WithdrawAddCard from './withdrawAddCard';
import WithdrawActions from './withdrawAction';
import SendCryptoDrawer from '../shared-drawer/withdraw-crypto-drawer';

const WithdrawAdd = () => {
  const [error, setError] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false);
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false);
  const [walletPubkey, setWalletPubkey] = useState<string>('');
  const [tokenData, setTokenData] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    if (user && user.id) {
      setUserData(user);
      setError(false);
    } else {
      setError(true);
    }
  }, []);

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen);
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen);

  if (userData) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <WithdrawAddCard userData={userData} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <WithdrawActions
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
              setWalletPubkey={setWalletPubkey}
              setTokenData={setTokenData}
            />
          </Grid>
        </Grid>
        <SendCryptoDrawer
          open={sendInvoiceOpen}
          toggle={toggleSendInvoiceDrawer}
          userData={userData}
          walletPubkey={walletPubkey}
          tokenData={tokenData}
        />
      </>
    );
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            User not found. Please go back to search.
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default WithdrawAdd;
