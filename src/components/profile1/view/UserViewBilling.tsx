import { Send } from '@mui/icons-material'
import { Autocomplete, Button, IconButton, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import router from 'next/router'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'

export const rows = [
  {
    id: 1,
    transactionType: 'Deposit Asset',
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
    transactionType: 'Withdraw Asset',
    assetType: 'USDC',
    amount: '66',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 3,
    transactionType: 'Transfer Asset',
    assetType: 'USDC',
    amount: '17',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 4,
    transactionType: 'Transfer Asset',
    assetType: 'USDC',
    amount: '52',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 5,
    transactionType: 'Deposit Asset',
    assetType: 'USDC',
    amount: '16',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 6,
    transactionType: 'Withdraw Asset',
    assetType: 'USDC',
    amount: '85',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 7,
    transactionType: 'Transfer Asset',
    assetType: 'USDC',
    amount: '17',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 8,
    transactionType: 'Transfer Asset',
    assetType: 'USDC',
    amount: '17',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 9,
    transactionType: 'Deposit Asset',
    assetType: 'USDC',
    amount: '71',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 10,
    transactionType: 'Withdraw Asset',
    assetType: 'USDC',
    amount: '470',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 11,
    transactionType: 'Deposit Asset',
    assetType: 'USDC',
    amount: '171',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  },
  {
    id: 12,
    transactionType: 'Deposit Asset',
    assetType: 'USDC',
    amount: '42',
    email: 'Thangnc0401@gmail.com',
    end_date: Date.now(),
    start_date: Date.now(),
    status: 'Successful'
  }
]

const UserViewBilling = () => {
  const getTransactionTypes: string[] = ['Deposit Asset', 'Transfer Asset', 'Withdraw Asset']
  const getAssetTypes: string[] = ['USDC']

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 120,
      headerName: 'No.'
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
      renderCell: params => {
        return (
          <div className='flex justify-center'>
            <IconButton title='View Details' onClick={handleViewDetail}>
              <Send />
            </IconButton>
          </div>
        )
      }
    }
  ]

  const handleViewDetail = () => {
    router.push('/saving/my-portfolios/detail')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ padding: 5, height: 100 }}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom={4}>
            <Grid item xs={3} marginLeft={2}>
              <Autocomplete
                options={getTransactionTypes}
                renderInput={params => (
                  <TextField {...params} label='Search by Transaction Type' placeholder='Search by Transaction Type' />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                options={getAssetTypes}
                renderInput={params => (
                  <TextField {...params} label='Search by Asset Type' placeholder='Search by Asset Type' />
                )}
              />
            </Grid>
            <Button
              sx={{ borderRadius: 0 }}
              variant='contained'
              style={{ width: 56, height: 56 }}
            >
              <SearchIcon/>
            </Button>
            <Button
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              variant='contained'
              style={{  width: 45, height: 56 }}
            >
              <RefreshIcon/>
            </Button>
          </Grid>
        </Card>

        <Grid item xs={12} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Card>
              <Box sx={{ height: 500 }}>
                <DataGrid columns={columns} rows={rows.slice(0, 10)} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserViewBilling