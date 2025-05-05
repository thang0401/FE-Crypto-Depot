// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import axios from 'axios'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
}

interface UserDataType {
  fullName: string
  avatar: string

 
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props
const auth = useAuth()
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [userData, setUserData] = useState<UserDataType | null>(null)
  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  const [balance, setBalance] = useState<number>(0) // State để lưu balance
  const [frozenBalance, setFrozenBalance] = useState<number>(0)

  // ** Vars
  const { direction } = settings
  useEffect(() => {
    const fetchUserData = async () =>{
      try{
        const userDataString = localStorage.getItem('userData')
        if(userDataString){
          const localData= JSON.parse(userDataString)
          const userId = localData.id;

          const response = await axios.get(`https://be-crypto-depot.name.vn/api/users/${userId}`)
          if (response.data) {
            setUserData({
              fullName: response.data.fullName,
              avatar: response.data.avatar
            })
          }

          const balanceResponse = await axios.get(`https://be-crypto-depot.name.vn/api/TransactionHistory/GetUserDebitAmount/${userId}`)
          if (balanceResponse.data) {
            setBalance(balanceResponse.data.balance)
            setFrozenBalance(balanceResponse.data.frozenBalance)
          }
        }
      } catch (error){
        console.log('Error fetching user data:', error)
      }
    }
    fetchUserData()
  },[])
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.secondary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.25rem',
      color: 'text.secondary'
    }
  }
  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }
  console.log()

  
  // Get user name and avatar with fallback
  const userName = userData?.fullName || auth.user?.fullName ||  'User'
  const avatarSrc = userData?.avatar || '/images/avatars/1.png'

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={userName}
          src={avatarSrc}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 2, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={userName}
                src={avatarSrc}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ ml: 3, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500 }}>
                {userName}
              </Typography>
              {/* <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {auth.user?.role}
              </Typography> */}
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                 Số dư: <strong>{balance.toFixed(2)}</strong> USDC
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/user-profile/account')}>
          <Box sx={styles}>
            <Icon icon='bx:user' />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/email')}>
          <Box sx={styles}>
            <Icon icon='bx:envelope' />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/chat')}>
          <Box sx={styles}>
            <Icon icon='bx:message' />
            Chat
          </Box>
        </MenuItem>
        {/* <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/account-settings/account')}>
          <Box sx={styles}>
            <Icon icon='bx:cog' />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/pricing')}>
          <Box sx={styles}>
            <Icon icon='bx:dollar' />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/faq')}>
          <Box sx={styles}>
            <Icon icon='bx:help-circle' />
            FAQ
          </Box>
        </MenuItem>
        <Divider /> */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            px: 4,
            color: 'text.secondary',
            '& svg': { mr: 2, fontSize: '1.25rem', color: 'text.secondary' }
          }}
        >
          <Icon icon='bx:power-off' />
          Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
