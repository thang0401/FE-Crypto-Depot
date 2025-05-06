'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { Box, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon';
import { ethers } from 'ethers';

interface Props {
  toggleAddPaymentDrawer: () => void;
  toggleSendInvoiceDrawer: () => void;
  setWalletPubkey: (pubkey: string) => void;
  setTokenData: (tokenData: any) => void;
}

const WithdrawActions = ({ toggleSendInvoiceDrawer, toggleAddPaymentDrawer, setWalletPubkey, setTokenData }: Props) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        const arbitrumSepoliaChainId = 421614;
        if (network.chainId !== arbitrumSepoliaChainId) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${arbitrumSepoliaChainId.toString(16)}` }],
          });
        }
        const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsConnected(true);
        setWalletPubkey(accounts[0]);
        setTokenData([]);
      } catch (error) {
        console.error('Kết nối thất bại:', error);
      }
    } else {
      alert('Vui lòng cài đặt MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setWalletPubkey('');
    setTokenData([]);
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
  };

  const changeWallet = async () => {
    await connectWallet();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          setWalletPubkey(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
    }
  }, [setWalletPubkey]);

  const shortenAddress = (address: string | null): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card>
      <CardContent>
        {!isConnected ? (
          <>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 4, backgroundColor: '#F6851B' }}
              onClick={connectWallet}
            >
              Kết nối ví
            </Button>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, backgroundColor: '#F6851B', color: 'white', padding: 2, borderRadius: 1 }}>
              <Icon icon="mdi:wallet" />
              <Typography>{shortenAddress(account)}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2, backgroundColor: '#343A40' }}
              onClick={copyAddress}
            >
              Sao chép địa chỉ
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 4, backgroundColor: '#343A40' }}
              onClick={disconnectWallet}
            >
              Ngắt kết nối
            </Button>
          </>
        )}
        <Button
          fullWidth
          sx={{ mb: 4 }}
          variant="contained"
          onClick={toggleSendInvoiceDrawer}
          startIcon={<Icon icon="bx:paper-plane" />}
          disabled={!isConnected}
        >
          Withdraw Here
        </Button>
        <Button fullWidth sx={{ mb: 4 }} variant="outlined" color="secondary">
          Download
        </Button>
        <Button
          fullWidth
          sx={{ mb: 4 }}
          target="_blank"
          component={Link}
          color="secondary"
          variant="outlined"
          href={`/make-transaction/transfer-asset/print/`}
        >
          Print
        </Button>
      </CardContent>
    </Card>
  );
};

export default WithdrawActions;
