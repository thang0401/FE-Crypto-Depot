// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Autocomplete, InputAdornment } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import router from 'next/router'

interface Props {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2.25)
}))
const assetsType: string[] = ['USDC', 'Ethereum', 'bitcoin', 'SFC-VND', 'SPLSC']

const WithdrawCryptoDrawer = ({ open, toggle }: Props) => {
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={toggle}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
      ModalProps={{ keepMounted: true }}
    >
      <Header>
        <Typography variant='h6' sx={{ fontSize: '1.125rem !important' }}>
          Rút USDC về ví web3
        </Typography>
        <IconButton onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 6, pt: 8 }}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField type='email' label='Từ tài khoản' variant='outlined' />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField type='email' label='Địa chỉ ví web3 nhận' variant='outlined' />
        </FormControl>
        {/* <FormControl fullWidth sx={{ mb: 6 }}>
          <Autocomplete
            options={assetsType}
            renderInput={params => <TextField {...params} label='Supported Asset Type' />}
          />
        </FormControl> */}
        <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 6 }}>
          <TextField
            label='Số lượng'
            variant='outlined'
            InputProps={{
              endAdornment: <InputAdornment position='end'>USDC</InputAdornment>
            }}
          />
          <Button>Max</Button>
        </FormControl>
        {/* <FormControl fullWidth sx={{ mb: 4 }}>
          <TextField rows={10} multiline label='Message' type='textarea' variant='outlined' />
        </FormControl> */}
        <Box sx={{ mb: 6 }}>
          {/* <CustomChip
            rounded
            size='small'
            skin='light'
            color='primary'
            label='Invoice Attached'
            icon={<Icon icon='bx:link' />}
            sx={{
              '& svg': { fontSize: '1rem !important', ml: theme => `${theme.spacing(1.5)} !important` }
            }}
          /> */}
        </Box>
        <div>
          <Button size='large' variant='contained' onClick={toggle} sx={{ mr: 4 }}>
            Withdraw
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </div>
      </Box>
    </Drawer>
  )
}

export default WithdrawCryptoDrawer
