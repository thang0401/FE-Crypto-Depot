import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import DepositAddCard from './depositAddCard';
import DepositActions from './depositAction';
import SendCryptoDrawer from '../shared-drawer/send-crypto-drawer';

const DepositAdd = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false);
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<any[]>([]);
  const [walletPubkey, setWalletPubkey] = useState<string>('');

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen);
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen);

  const selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');

  if (selectedUser.id) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <DepositAddCard customerData={selectedUser} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <DepositActions
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
          tokenData={tokenData}
          walletPubkey={walletPubkey}
          customerData={selectedUser}
        />
      </>
    );
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            User not found. Please go back to search: <a href="/make-transaction/deposit-asset">Search</a>
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

const App = (): JSX.Element => {
  return <DepositAdd />;
};

export default App;
