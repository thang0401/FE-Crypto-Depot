import React, { useCallback, useEffect } from 'react'
import { Grid, Card, Button, TextField, Box, Autocomplete, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
// import TableBasic from 'src/views/table/data-grid/TableBasic'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Send from '@mui/icons-material/Send'
import router from 'next/router'
import { FC, useMemo } from 'react'
// import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
// import {
//     WalletModalProvider,
//     WalletDisconnectButton,
//     WalletMultiButton,
//     useWalletModal
// } from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl, PublicKey, TokenAccountsFilter } from '@solana/web3.js';
// import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
// // Default styles that can be overridden by your app
// import '@solana/wallet-adapter-react-ui/styles.css';
import cluster from 'cluster'
import Link from 'next/link'
export const rows = [
  {
    id: 1,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0001',
    portfolio: 'portfolio1',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 2,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0002',
    portfolio: 'portfolio2',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 3,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0003',
    portfolio: 'portfolio3',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 4,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0004',
    portfolio: 'portfolio4',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 5,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0005',
    portfolio: 'portfolio5',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 6,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0006',
    portfolio: 'portfolio6',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 7,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0007',
    portfolio: 'portfolio7',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 8,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0008',
    portfolio: 'portfolio8',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 9,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf0009',
    portfolio: 'portfolio9',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 10,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf00010',
    portfolio: 'portfolio10',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 11,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf00011',
    portfolio: 'portfolio11',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  },
  {
    id: 12,
    full_name: 'Nguyen Cao Thang',
    portfolioID: 'pf00012',
    portfolio: 'portfolio12',
    email: 'Thangnc0401@gmail.com',
    phone: 'xxx456789',
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Hoạt động'
  }
]

const Deposit = () => {
  const getCommodities: string[] = ['Portfolio1', 'Portfolio2', 'Portfolio3', 'Portfolio4', 'Portfolio5']
  const getCommodityGroup: string[] = ['Pf0001', 'Pf0002', 'Pf0003', 'Pf0004', 'Pf0005']
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'STT'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'full_name',
      headerName: 'Tên chủ sở hữu'
    },
    {
      flex: 0.25,
      minWidth: 80,
      field: 'portfolioID',
      headerName: 'Mã danh mục'
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'portfolio',
      headerName: 'Tên danh mục'
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'email',
      headerName: 'Email'
    },
    {
      flex: 0.15,
      minWidth: 150,
      headerName: 'Số điện thoại',
      field: 'phone'
      // valueGetter: params => new Date(params.value)
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'ID_number',
      headerName: 'CCCD'
    },
    {
      flex: 0.1,
      field: 'status',
      minWidth: 110,
      headerName: 'Trạng thái'
    },
    {
      flex: 0.25,
      minWidth: 80,
      field: 'button',
      headerName: 'Nạp Tài sản',
      renderCell: params => {
        return (
          <div className='flex justify-center'>
            {/* <Link href="/trade-now/deposit-asset/add/" passHref> */}
            <IconButton
              title='Deposit'
              onClick={() => {
                router.push('/trade-now/deposit-asset/add')
              }}
            >
              <Send />
            </IconButton>
            {/* </Link> */}
          </div>
        )
      }
    }
  ]
  const headleDeposit = () => {
    router.push('/trade-now/deposit-asset/add')
  }
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network),[network])
  // const wallets = useMemo(()=>[new UnsafeBurnerWalletAdapter(),],[network])
  // const connectionStage = useConnection();
  // const wallet = useWallet();
  // //const { publicKey } = useWallet();
  // const { setVisible } = useWalletModal();
  // const { publicKey , connected } = useWallet();
  // const fetchAllAssetOfWallet = useCallback(async () => {
  //   if (!publicKey) {
  //   console.log('wallet not available')
  //   return;
  //   }

  //   const tokenFilt: TokenAccountsFilter = {
  //     programId: TOKEN_PROGRAM_ID, // SPL Token Program ID
  //   };
  //   // Lấy tất cả token accounts thuộc về ví
  //   const tokenAcc = await connectionStage.connection.getParsedTokenAccountsByOwner(publicKey, tokenFilt);
  //   console.log('publicKey',publicKey?.toBase58())
  //   // Duyệt qua danh sách và lấy balance và metadata của từng token account
  //   const tokenNameAndSymbol = await Promise.all(
  //     tokenAcc.value.map(async (accountInfo) => {
  //       const publicKeyToken = accountInfo.pubkey;
  //       console.log(publicKeyToken.toBase58())
  //       // Lấy mint address của token
  //       const mintAddress = new PublicKey(accountInfo.account.data.parsed.info.mint);
  //      // const mintAddress = await getMint(connectionStage.connection, publicKeyToken);
  //      const taba = mintAddress.toBase58();
  //      console.log('Mint address:', taba);
  //       // // Lấy metadata
  //       // let tokenName = "Unknown";
  //       // let tokenSymbol = "Unknown";
  //       // const newMetaToken = await getTokenMetadata(connectionStage.connection, mintAddress, "confirmed", TOKEN_METADATA_PROGRAM_ID);

  //       // if (newMetaToken) {
  //       //   tokenName = newMetaToken.name;
  //       //   tokenSymbol = newMetaToken.symbol;
  //       // }

  //       return {
  //         // tokenName,
  //         // tokenSymbol,
  //         taba
  //       };
  //     })
  //   );
  //   console.log("Danh sách token và metadata: ", tokenNameAndSymbol);

  //   //return tokenNameAndSymbol;
  // }, [connectionStage.connection,publicKey]);

  // useEffect(() => {
  //   if (connected) {
  //     fetchAllAssetOfWallet();
  //   }
  //   else {
  //     setVisible(true);
  //   }
  // }, [connectionStage.connection, fetchAllAssetOfWallet, setVisible,connected, publicKey]);

  return (
    <Grid>
      <Grid container>
        <Grid item xs={12}>
          {/* <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <h5 style={{ margin: 0, color: '#A9A9A9' }}>
              {' '}
              <span style={{ color: '#808080' }}>Giao dịch/ </span> Nạp tài sản{' '}
            </h5> */}
            {/* <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} >
                <WalletModalProvider>
                    <Grid display={'flex'} gap={2}>
              <Grid>
              <WalletMultiButton />
              </Grid>
              <Grid>
              <WalletDisconnectButton />
              </Grid>
            </Grid>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider> */}
          {/* </Grid> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginLeft: 30 }}>Nạp tài sản </h2>
            <Box sx={{ display: 'flex', gap: '11px' }}>
              <Box sx={{ display: 'flex', gap: '11px' }}></Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Card sx={{ padding: 5, height: 100 }}>
        <Grid container justifyItems={'right'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom={4}>
          <Grid item xs={3} marginLeft={2}>
            <Autocomplete
              options={getCommodities}
              renderInput={params => (
                <TextField {...params} label='Tên danh mục nhận tài sản' placeholder='Tên danh mục nhận tài sản' />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              options={getCommodityGroup}
              renderInput={params => (
                <TextField {...params} label='Mã danh mục nhận tài sản' placeholder='Mã danh mục nhận tài sản' />
              )}
            />
          </Grid>
          <Button
            sx={{ borderRadius: 0 }}
            variant='contained'
            style={{ backgroundColor: '#0292B1', width: 56, height: 56 }}
          >
            <SearchIcon />
          </Button>
          <Button
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            variant='contained'
            style={{ backgroundColor: '#AEB4AB', width: 45, height: 56 }}
          >
            <RefreshIcon />
          </Button>
        </Grid>
      </Card>

      <Grid item xs={12} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Card>
            {/* <CardHeader title='MY PORTFOLIOS' /> */}
            <Box sx={{ height: 500 }}>
              <DataGrid columns={columns} rows={rows.slice(0, 10)} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Deposit
