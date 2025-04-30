// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from './UserSuspendDialog'
import UserSubscriptionDialog from './UserSubscriptionDialog'

// ** Axios
import axios from 'axios'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// Updated User Type based on API response
interface UserDataType {
  id: string
  username: string
  email: string
  fullName: string
  firstName: string
  middleName: string
  lastName: string
  phoneNumber: string
  gender: string
  avatar: string
  dateOfBirth: string
  homeAddress: string
  ward: string
  district: string
  province: string
  nation: string
  walletAddress: string
  kycStatus: boolean
  hasAcceptedTerms: boolean
  lastLoginAt: string
  isBankAccount: boolean
  isReferralCode: boolean
  createdAt: string
  
  // For compatibility with existing component
  status?: string
  role?: string
  contact?: string
  country?: string
  avatarColor?: ThemeColor
}

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary',
  user: 'secondary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.25rem',
  left: '-1rem',
  fontSize: '1.125rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  fontSize: '1rem',
  marginTop: '0.5rem',
  alignSelf: 'flex-end',
  color: theme.palette.text.secondary
}))

const UserViewLeft = () => {
  // ** States
  const [userData, setUserData] = useState<UserDataType | null>(null)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // ** Fetch User Data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userData from localStorage
        const userDataString = localStorage.getItem('userData')
        if (!userDataString) {
          setError('No user data found in localStorage')
          setLoading(false)
          return
        }

        let parsedData
        try {
          parsedData = JSON.parse(userDataString)
        } catch (parseError) {
          setError('Invalid user data format in localStorage')
          setLoading(false)
          return
        }

        const { id } = parsedData
        if (!id) {
          setError('User ID not found in localStorage data')
          setLoading(false)
          return
        }

        // Fetch user data from API
        const response = await axios.get(`https://be-crypto-depot.name.vn/api/users/${id}`)
        
        // Map gender values
        let displayGender = 'Khác'
        if (response.data.gender === 'male') {
          displayGender = 'Nam'
        } else if (response.data.gender === 'female') {
          displayGender = 'Nữ'
        }
        
        // Map API data to component data structure
        const mappedUserData = {
          ...response.data,
          // Map gender from API values to display values
          gender: displayGender,
          // Add compatibility fields for existing component
          status: response.data.kycStatus ? 'active' : 'pending',
          role: 'user',
          contact: response.data.phoneNumber || '',
          country: response.data.nation || '',
          avatarColor: 'primary' as ThemeColor
        }
        
        setUserData(mappedUserData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to fetch user data. Please try again later.')
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // ** Handle Avatar Change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
    }
  }

  // ** Handle Avatar Upload
  const handleAvatarUpload = async () => {
    if (!avatarFile || !userData?.id) return

    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile)

      const response = await axios.patch(
        `https://be-crypto-depot.name.vn/api/users/${userData.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      setUserData({ ...userData, avatar: response.data.avatar })
      setAvatarFile(null)
    } catch (err) {
      console.error('Failed to upload avatar:', err)
      alert('Failed to upload avatar')
    }
  }

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = async () => {
    if (avatarFile) {
      await handleAvatarUpload()
    }
    setOpenEdit(false)
    setAvatarFile(null)
  }

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>
  }

  if (!userData) {
    return null
  }

  // Get the full address from components
  const fullAddress = [
    userData.homeAddress,
    userData.ward,
    userData.district,
    userData.province,
    userData.nation
  ].filter(Boolean).join(', ')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {userData.avatar ? (
              <CustomAvatar
                src={userData.avatar}
                variant='rounded'
                alt={userData.fullName}
                sx={{ width: 110, height: 110, mb: 6 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={userData.avatarColor}
                sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
              >
                {getInitials(userData.fullName)}
              </CustomAvatar>
            )}
            <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
              {userData.fullName}
            </Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={userData.role}
              sx={{ fontWeight: 500 }}
              color={roleColors[userData.role || 'user']}
            />
          </CardContent>

          <CardContent>
            <Typography variant='h6'>Thông tin người dùng</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
            <Box sx={{ pt: 4, pb: 2 }}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tên đăng nhập:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>@{userData.username}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Trạng thái KYC:</Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={userData.kycStatus ? 'Đã xác thực' : 'Chưa xác thực'}
                  sx={{ fontWeight: 500 }}
                  color={userData.kycStatus ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Liên hệ:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData.phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Giới tính:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData.gender || 'Chưa cập nhật'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Ngày sinh:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Địa chỉ:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{fullAddress || 'Chưa cập nhật'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Quốc gia:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData.nation || 'Chưa cập nhật'}</Typography>
              </Box>
              {userData.walletAddress && (
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Địa chỉ ví:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userData.walletAddress}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tài khoản ngân hàng:</Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={userData.isBankAccount ? 'Đã liên kết' : 'Chưa liên kết'}
                  sx={{ fontWeight: 500 }}
                  color={userData.isBankAccount ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Mã giới thiệu:</Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={userData.isReferralCode ? 'Đã có' : 'Chưa có'}
                  sx={{ fontWeight: 500 }}
                  color={userData.isReferralCode ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Ngày tạo tài khoản:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Chỉnh sửa
            </Button>
            {/* <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
              Khoá tài khoản
            </Button> */}
          </CardActions>

          <Dialog
            scroll='body'
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{
              '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
              '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
            }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle
              id='user-view-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Chỉnh sửa thông tin
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                Cập nhật thông tin người dùng sẽ được kiểm duyệt vì lý do bảo mật.
              </DialogContentText>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Button variant='contained' component='label'>
                      Tải lên ảnh đại diện
                      <input type='file' accept='image/*' hidden onChange={handleAvatarChange} />
                    </Button>
                    {avatarFile && <Typography sx={{ mt: 2 }}>{avatarFile.name}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Họ' defaultValue={userData.lastName || ''} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Tên đệm' defaultValue={userData.middleName || ''} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Tên' defaultValue={userData.firstName || ''} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Tên đăng nhập'
                      defaultValue={userData.username}
                      InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='email' label='Email' defaultValue={userData.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-gender-label'>Giới tính</InputLabel>
                      <Select
                        label='Giới tính'
                        defaultValue={userData.gender || ''}
                        id='user-view-gender'
                        labelId='user-view-gender-label'
                      >
                        <MenuItem value='Nam'>Nam</MenuItem>
                        <MenuItem value='Nữ'>Nữ</MenuItem>
                        <MenuItem value='Khác'>Khác</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label='Số điện thoại' 
                      defaultValue={userData.phoneNumber || ''} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      type='date' 
                      label='Ngày sinh' 
                      defaultValue={userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : ''} 
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Địa chỉ nhà' defaultValue={userData.homeAddress || ''} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Phường/Xã' defaultValue={userData.ward || ''} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Quận/Huyện' defaultValue={userData.district || ''} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Tỉnh/Thành phố' defaultValue={userData.province || ''} />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-country-label'>Quốc gia</InputLabel>
                      <Select
                        label='Quốc gia'
                        defaultValue={userData.nation || ''}
                        id='user-view-country'
                        labelId='user-view-country-label'
                      >
                        <MenuItem value='USA'>USA</MenuItem>
                        <MenuItem value='UK'>UK</MenuItem>
                        <MenuItem value='Vietnam'>Việt Nam</MenuItem>
                        <MenuItem value='France'>France</MenuItem>
                        <MenuItem value='Germany'>Germany</MenuItem>
                        <MenuItem value='Japan'>Japan</MenuItem>
                        <MenuItem value='China'>China</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      label='Sử dụng làm địa chỉ thanh toán?'
                      control={<Switch defaultChecked />}
                      sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                Lưu
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Huỷ
              </Button>
            </DialogActions>
          </Dialog>

          <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewLeft