import { Send } from '@mui/icons-material'
import { Autocomplete, Button, IconButton, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

export const rows = [
  {
    id: 1,
    transactionType: 'Deposit',
    assetType: 'USDC',
    amount: '83',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    ID_number: 'xxx-xxx-xxx-123',
    status: 'Successful'
  },
  {
    id: 2,
    transactionType: 'Withdrawal',
    assetType: 'USDC',
    amount: '66',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 3,
    transactionType: 'Transfer',
    assetType: 'USDC',
    amount: '17',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  }
]

const TransactionHistory = () => {
  const transactionTypes: string[] = ['Deposit', 'Transfer', 'Withdrawal']

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 120,
      headerName: 'ID'
    },
    {
      flex: 0.1,
      field: 'transactionType',
      minWidth: 180,
      headerName: 'Transaction Type'
    },
    {
      flex: 0.1,
      field: 'assetType',
      minWidth: 120,
      headerName: 'Asset Type'
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: 'amount',
      headerName: 'Amount'
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'status',
      headerName: 'Status'
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'button',
      headerName: 'View Details',
      renderCell: () => (
        <div className='flex justify-center'>
          <IconButton title='View Details'>
            <Send />
          </IconButton>
        </div>
      )
    }
  ]

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginLeft: 30 }}>Transaction History</h2>
      </Grid>
      <Grid item xs={12} gap={3} display={'flex'}>
        <Grid item xs={4}>
          <Card sx={{ padding: 5 }}>
            <h3>Transaction History Filter</h3>
            <Grid container gap={4}>
              <Grid item xs={12}>
                <Autocomplete
                  options={transactionTypes}
                  renderInput={params => (
                    <TextField {...params} label='Search by Transaction Type' placeholder='Search by Transaction Type' />
                  )}
                />
              </Grid>
              <Grid container justifyContent='flex-end' paddingRight={5} gap={3}>
                <Button sx={{ borderRadius: 0 }} variant='contained' style={{ backgroundColor: '#0292B1', width: 56, height: 56 }}>
                  <SearchIcon />
                </Button>
                <Button sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} variant='contained' style={{ backgroundColor: '#AEB4AB', width: 45, height: 56 }}>
                  <RefreshIcon />
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <Box sx={{ height: 500 }}>
              <DataGrid columns={columns} rows={rows.slice(0, 10)} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TransactionHistory
