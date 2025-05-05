"use client"

import { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import Icon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import axios from 'axios'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

interface DeviceData {
  deviceName: string
  ipAddress: string
  browser: string
  lastLoginAt: string
}

const iconMapping: { [key: string]: { icon: string; color: ThemeColor } } = {
  Windows: { icon: 'bxl:windows', color: 'info' },
  iPhone: { icon: 'bx:mobile-alt', color: 'error' },
  Android: { icon: 'bxl:android', color: 'success' },
  MacOS: { icon: 'bxl:apple', color: 'secondary' }
}

const UserViewSecurity = () => {
  const [defaultValues, setDefaultValues] = useState<any>({ mobile: 'thangnc0401@gmail.com' })
  const [mobileNumber, setMobileNumber] = useState<string>('09123456789')
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState<boolean>(false)
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [devices, setDevices] = useState<DeviceData[]>([])
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleEditMobileNumberClickOpen = () => setOpenEditMobileNumber(true)

  const handleEditMobileNumberClose = () => setOpenEditMobileNumber(false)

  const handleCancelClick = () => {
    setMobileNumber(defaultValues.mobile)
    handleEditMobileNumberClose()
  }

  const handleSubmitClick = () => {
    setDefaultValues({ ...defaultValues, mobile: mobileNumber })
    handleEditMobileNumberClose()
  }

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      try {
        const userJson = JSON.parse(userData)
        setEmail(userJson.email)
        const userId = userJson.id

        // Fetch device data
        axios
          .get(`https://be-crypto-depot.name.vn/api/auth/getAllDevice/${userId}`)
          .then(response => {
            const deviceData = response.data.map((device: any) => {
              const date = new Date(device.lastLoginAt)
              date.setHours(date.getHours() + 7) // Adjust for UTC+7
              return {
                deviceName: device.deviceName,
                ipAddress: device.ipAddress,
                browser: device.browser,
                lastLoginAt: date.toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            })
            setDevices(deviceData)
          })
          .catch(err => {
            console.error('Error fetching devices:', err)
            setError('Không thể tải danh sách thiết bị')
          })
      } catch (error) {
        setError('Không tìm thấy email hoặc ID người dùng')
      }
    } else {
      setError('Không tìm thấy userData')
    }
  }, [])

  const getDeviceIcon = (deviceName: string) => {
    if (deviceName.toLowerCase().includes('windows')) return iconMapping.Windows
    if (deviceName.toLowerCase().includes('iphone')) return iconMapping.iPhone
    if (deviceName.toLowerCase().includes('android')) return iconMapping.Android
    if (deviceName.toLowerCase().includes('mac')) return iconMapping.MacOS
    return iconMapping.Windows // Default fallback
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Xác thực hai bước'
            titleTypographyProps={{ sx: { mb: 1 } }}
            subheader='Giữ tài khoản của bạn an toàn với xác thực hai bước.'
          />
          <CardContent>
            <Typography sx={{ mb: 2.5, fontWeight: 500 }}>Gmail</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'text.secondary' }}>{email}</Typography>
              <div>
                <IconButton
                  size='small'
                  aria-label='chỉnh sửa'
                  sx={{ color: 'text.secondary' }}
                  onClick={handleEditMobileNumberClickOpen}
                >
                  <Icon icon='bx:edit' fontSize={20} />
                </IconButton>
                <IconButton size='small' aria-label='xóa' sx={{ color: 'text.secondary' }}>
                  <Icon icon='bx:trash-alt' fontSize={20} />
                </IconButton>
              </div>
            </Box>

            <Divider
              sx={{ mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(6)} !important` }}
            />

            <Typography
              sx={{
                color: 'text.secondary',
                '& a': { color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }
              }}
            >
              Xác thực hai yếu tố bổ sung thêm một lớp bảo mật cho tài khoản của bạn bằng cách yêu cầu không chỉ mật khẩu để đăng nhập.
              <Link href='/' onClick={e => e.preventDefault()}>
                Tìm hiểu thêm
              </Link>
              .
            </Typography>
          </CardContent>

          <Dialog
            open={openEditMobileNumber}
            onClose={handleCancelClick}
            aria-labelledby='user-view-security-edit-mobile-number'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 560, p: [2, 10] } }}
            aria-describedby='user-view-security-edit-mobile-number-description'
          >
            <DialogTitle
              id='user-view-security-edit-mobile-number'
              sx={{ mb: 6, textAlign: 'center', fontSize: '1.625rem !important' }}
            >
              Kích hoạt mật khẩu một lần
            </DialogTitle>

            <DialogContent>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>Xác minh số điện thoại của bạn qua SMS</Typography>
              <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                Nhập Email của bạn kèm mã quốc gia và chúng tôi sẽ gửi mã xác minh cho bạn.
              </Typography>
              <form onSubmit={e => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  value={mobileNumber}
                  label='Số điện thoại kèm mã quốc gia'
                  onChange={e => setMobileNumber(e.target.value)}
                />
                <Box sx={{ mt: 6, display: 'flex' }}>
                  <Button type='submit' sx={{ mr: 5 }} variant='contained' onClick={handleSubmitClick}>
                    Gửi
                  </Button>
                  <Button type='reset' color='secondary' variant='outlined' onClick={handleCancelClick}>
                    Hủy
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Thiết bị gần đây' />

          <Divider sx={{ m: '0 !important' }} />

          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableHead
                sx={{ backgroundColor: theme => (theme.palette.mode === 'light' ? 'grey.50' : 'background.default') }}
              >
                <TableRow>
                  <TableCell>Trình duyệt</TableCell>
                  <TableCell>Thiết bị</TableCell>
                  <TableCell>Địa chỉ IP</TableCell>
                  <TableCell>Hoạt động gần đây</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {devices.length > 0 ? (
                  devices.map((item: DeviceData, index: number) => {
                    const { icon, color } = getDeviceIcon(item.deviceName)
                    return (
                      <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: `${color}.main` } }}>
                            <Icon icon={icon} fontSize={20} />
                            <Typography sx={{ ml: 4, fontWeight: 600 }}>{item.browser}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{item.deviceName}</TableCell>
                        <TableCell>{item.ipAddress}</TableCell>
                        <TableCell>{item.lastLoginAt}</TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography>{error || 'Không có thiết bị nào được tìm thấy'}</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewSecurity