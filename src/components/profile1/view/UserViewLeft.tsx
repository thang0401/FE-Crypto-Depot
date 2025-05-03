import { useState, useEffect } from 'react'
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
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from './UserSuspendDialog'
import UserSubscriptionDialog from './UserSubscriptionDialog'
import axios from 'axios'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'

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
  walletAddress: string
  kycStatus: boolean
  hasAcceptedTerms: boolean
  lastLoginAt: string
  isBankAccount: boolean
  isReferralCode: boolean
  createdAt: string
  status?: string
  role?: string
  contact?: string
  country?: string
  avatarColor?: ThemeColor
}

interface ColorsType {
  [key: string]: ThemeColor
}

interface LocationData {
  id: string
  full_name: string
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

const Sup = styled('sup')(({ theme }) => ({
  top: '0.25rem',
  left: '-1rem',
  fontSize: '1.125rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const Sub = styled('sub')(({ theme }) => ({
  fontSize: '1rem',
  marginTop: '0.5rem',
  alignSelf: 'flex-end',
  color: theme.palette.text.secondary
}))

const UserViewLeft = () => {
  const [userData, setUserData] = useState<UserDataType | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [provinces, setProvinces] = useState<LocationData[]>([])
  const [districts, setDistricts] = useState<LocationData[]>([])
  const [wards, setWards] = useState<LocationData[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    homeAddress: '',
    ward: '',
    district: '',
    province: '',
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  const validateForm = (data: typeof formData) => {
    const errors: { [key: string]: string } = {}
    if (!data.firstName.trim()) errors.firstName = 'Họ là bắt buộc'
    if (!data.lastName.trim()) errors.lastName = 'Tên là bắt buộc'
    if (!data.phoneNumber.trim()) errors.phoneNumber = 'Số điện thoại là bắt buộc'
    else if (!/^\+?\d{10,15}$/.test(data.phoneNumber)) errors.phoneNumber = 'Số điện thoại không hợp lệ'
    if (!data.gender) errors.gender = 'Giới tính là bắt buộc'
    if (!data.dateOfBirth) errors.dateOfBirth = 'Ngày sinh là bắt buộc'
    if (!data.homeAddress.trim()) errors.homeAddress = 'Địa chỉ nhà là bắt buộc'
    if (!data.province) errors.province = 'Tỉnh/Thành phố là bắt buộc'
    if (!data.district) errors.district = 'Quận/Huyện là bắt buộc'
    if (!data.ward) errors.ward = 'Phường/Xã là bắt buộc'
    return errors
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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

        setUserId(id)
        const response = await axios.get(`https://be-crypto-depot.name.vn/api/users/${id}`)
        let displayGender = 'Khác'
        if (response.data.gender === 'male') {
          displayGender = 'Nam'
        } else if (response.data.gender === 'female') {
          displayGender = 'Nữ'
        }

        const mappedUserData = {
          ...response.data,
          gender: displayGender,
          status: response.data.kycStatus ? 'active' : 'pending',
          role: 'user',
          contact: response.data.phoneNumber || '',
          avatarColor: 'primary' as ThemeColor
        }

        setUserData(mappedUserData)
        setFormData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          phoneNumber: response.data.phoneNumber || '',
          gender: displayGender,
          dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : '',
          homeAddress: response.data.homeAddress || '',
          ward: response.data.ward || '',
          district: response.data.district || '',
          province: response.data.province || '',
        })
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to fetch user data. Please try again later.')
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data)
        }
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách tỉnh/thành:", error))
  }, [])

  useEffect(() => {
    if (formData.province) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${formData.province}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data)
            setWards([])
            setFormData((prev) => ({ ...prev, district: '', ward: '' }))
          }
        })
        .catch((error) => console.error("Lỗi khi lấy danh sách quận/huyện:", error))
    }
  }, [formData.province])

  useEffect(() => {
    if (formData.district) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${formData.district}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data)
            setFormData((prev) => ({ ...prev, ward: '' }))
          }
        })
        .catch((error) => console.error("Lỗi khi lấy danh sách phường/xã:", error))
    }
  }, [formData.district])

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
    }
  }

  const handleAvatarUpload = async () => {
    if (!avatarFile || !userId) return

    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile)

      const response = await axios.post(
        `https://be-crypto-depot.name.vn/api/image/${userId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      setUserData((prev) => prev ? { ...prev, avatar: response.data.avatar } : prev)
      setAvatarFile(null)
    } catch (err) {
      console.error('Failed to upload avatar:', err)
      throw new Error('Failed to upload avatar')
    }
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSave = async () => {
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    if (!userId) return

    setIsSaving(true)
    try {
      const genderMap: { [key: string]: string } = {
        'Nam': 'male',
        'Nữ': 'female',
        'Khác': 'other'
      }

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        gender: (genderMap[formData.gender] || 'other').toUpperCase(),
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : '',
        homeAddress: formData.homeAddress,
        ward: wards.find((w) => w.id === formData.ward)?.full_name || formData.ward,
        district: districts.find((d) => d.id === formData.district)?.full_name || formData.district,
        province: provinces.find((p) => p.id === formData.province)?.full_name || formData.province,
      }

      await axios.put(`https://be-crypto-depot.name.vn/api/users/${userId}`, updateData)

      if (avatarFile) {
        await handleAvatarUpload()
      }

      setUserData((prev) => prev ? {
        ...prev,
        ...updateData,
        gender: formData.gender,
        fullName: `${formData.firstName} ${formData.lastName}`.trim()
      } : prev)
      setOpenEdit(false)
      setSnackbarMessage('Cập nhật thông tin thành công!')
      setSnackbarOpen(true)
    } catch (err) {
      console.error('Failed to update user data:', err)
      setSnackbarMessage('Cập nhật thông tin thất bại. Vui lòng thử lại.')
      setSnackbarOpen(true)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => {
    setOpenEdit(false)
    setAvatarFile(null)
    setFormErrors({})
  }

  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
    setSnackbarMessage('')
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>
  }

  if (!userData) {
    return null
  }

  const fullAddress = [
    userData.homeAddress,
    userData.ward,
    userData.district,
    userData.province,
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
                <Typography sx={{ color: 'text.secondary' }}>{'Việt Nam'}</Typography>
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
                    <Button variant='contained' component='label' disabled={isSaving}>
                      Tải lên ảnh đại diện
                      <input type='file' accept='image/*' hidden onChange={handleAvatarChange} />
                    </Button>
                    {avatarFile && <Typography sx={{ mt: 2 }}>{avatarFile.name}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Họ'
                      value={formData.lastName}
                      onChange={(e) => handleFormChange('lastName', e.target.value)}
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Tên đệm'
                      value={userData.middleName}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Tên'
                      value={formData.firstName}
                      onChange={(e) => handleFormChange('firstName', e.target.value)}
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Tên đăng nhập'
                      value={userData.username}
                      InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='email'
                      label='Email'
                      value={userData.email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!formErrors.gender}>
                      <InputLabel id='user-view-gender-label'>Giới tính</InputLabel>
                      <Select
                        label='Giới tính'
                        value={formData.gender}
                        id='user-view-gender'
                        labelId='user-view-gender-label'
                        onChange={(e) => handleFormChange('gender', e.target.value)}
                      >
                        <MenuItem value='Nam'>Nam</MenuItem>
                        <MenuItem value='Nữ'>Nữ</MenuItem>
                        <MenuItem value='Khác'>Khác</MenuItem>
                      </Select>
                      {formErrors.gender && <Typography color='error' variant='caption'>{formErrors.gender}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Số điện thoại'
                      value={formData.phoneNumber}
                      onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                      error={!!formErrors.phoneNumber}
                      helperText={formErrors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='date'
                      label='Ngày sinh'
                      value={formData.dateOfBirth}
                      onChange={(e) => handleFormChange('dateOfBirth', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!formErrors.dateOfBirth}
                      helperText={formErrors.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Địa chỉ nhà'
                      value={formData.homeAddress}
                      onChange={(e) => handleFormChange('homeAddress', e.target.value)}
                      error={!!formErrors.homeAddress}
                      helperText={formErrors.homeAddress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={!!formErrors.province}>
                      <InputLabel id='user-view-province-label'>Tỉnh/Thành phố</InputLabel>
                      <Select
                        label='Tỉnh/Thành phố'
                        value={formData.province}
                        id='user-view-province'
                        labelId='user-view-province-label'
                        onChange={(e) => handleFormChange('province', e.target.value)}
                      >
                        <MenuItem value=''>Chọn tỉnh/thành phố</MenuItem>
                        {provinces.map((province) => (
                          <MenuItem key={province.id} value={province.id}>{province.full_name}</MenuItem>
                        ))}
                      </Select>
                      {formErrors.province && <Typography color='error' variant='caption'>{formErrors.province}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={!!formErrors.district}>
                      <InputLabel id='user-view-district-label'>Quận/Huyện</InputLabel>
                      <Select
                        label='Quận/Huyện'
                        value={formData.district}
                        id='user-view-district'
                        labelId='user-view-district-label'
                        onChange={(e) => handleFormChange('district', e.target.value)}
                        disabled={!formData.province}
                      >
                        <MenuItem value=''>Chọn quận/huyện</MenuItem>
                        {districts.map((district) => (
                          <MenuItem key={district.id} value={district.id}>{district.full_name}</MenuItem>
                        ))}
                      </Select>
                      {formErrors.district && <Typography color='error' variant='caption'>{formErrors.district}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={!!formErrors.ward}>
                      <InputLabel id='user-view-ward-label'>Phường/Xã</InputLabel>
                      <Select
                        label='Phường/Xã'
                        value={formData.ward}
                        id='user-view-ward'
                        labelId='user-view-ward-label'
                        onChange={(e) => handleFormChange('ward', e.target.value)}
                        disabled={!formData.district}
                      >
                        <MenuItem value=''>Chọn phường/xã</MenuItem>
                        {wards.map((ward) => (
                          <MenuItem key={ward.id} value={ward.id}>{ward.full_name}</MenuItem>
                        ))}
                      </Select>
                      {formErrors.ward && <Typography color='error' variant='caption'>{formErrors.ward}</Typography>}
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button
                variant='contained'
                sx={{ mr: 2 }}
                onClick={handleSave}
                disabled={isSaving}
                startIcon={isSaving ? <CircularProgress size={20} /> : null}
              >
                Lưu
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose} disabled={isSaving}>
                Huỷ
              </Button>
            </DialogActions>
          </Dialog>

          <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('thành công') ? 'success' : 'error'}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewLeft