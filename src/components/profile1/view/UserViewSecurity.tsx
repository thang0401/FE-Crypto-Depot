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
import { Email } from '@mui/icons-material'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

interface DataType {
  icon: string
  device: string
  browser: string
  location: string
  iconColor: ThemeColor
  recentActivity: string
}

const data: DataType[] = [
  {
    iconColor: 'info',
    device: 'HP Spectre 360',
    location: 'Thụy Sĩ',
    browser: 'Chrome trên Windows',
    icon: 'bxl:windows',
    recentActivity: '10, Tháng 7 2021 20:07'
  },
  {
    iconColor: 'error',
    device: 'iPhone 12x',
    icon: 'bx:mobile-alt',
    location: 'Úc',
    browser: 'Chrome trên iPhone',
    recentActivity: '13, Tháng 7 2021 10:10'
  },
  {
    location: 'Dubai',
    icon: 'bxl:android',
    iconColor: 'success',
    device: 'Oneplus 9 Pro',
    browser: 'Chrome trên Android',
    recentActivity: '14, Tháng 7 2021 15:15'
  },
  {
    location: 'Ấn Độ',
    icon: 'bxl:apple',
    device: 'Apple iMac',
    iconColor: 'secondary',
    browser: 'Chrome trên MacOS',
    recentActivity: '16, Tháng 7 2021 16:17'
  },
  {
    iconColor: 'info',
    device: 'HP Spectre 360',
    location: 'Thụy Sĩ',
    browser: 'Chrome trên Windows',
    icon: 'bxl:windows',
    recentActivity: '20, Tháng 7 2021 21:01'
  },
  {
    location: 'Dubai',
    icon: 'bxl:android',
    iconColor: 'success',
    device: 'Oneplus 9 Pro',
    browser: 'Chrome trên Android',
    recentActivity: '21, Tháng 7 2021 12:22'
  }
]

const UserViewSecurity = () => {
  const [defaultValues, setDefaultValues] = useState<any>({ mobile: 'thangnc0401@gmail.com' })
  const [mobileNumber, setMobileNumber] = useState<string>('09123456789')
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState<boolean>(false)
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
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
    const userData = localStorage.getItem('userData');
    if(userData){
      try{
        const userJson = JSON.parse(userData)
        setEmail(userJson.email)
      }catch (error){
        setError('Không tìm thấy email')
        return
      }
    }else{
      setError('Không tìm thấy userData')
      return
    }
  })
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Đổi mật khẩu' />
          <CardContent>
            <Alert icon={false} severity='warning' sx={{ mb: 6 }}>
              <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                Đảm bảo đáp ứng các yêu cầu sau:
              </AlertTitle>
              Tối thiểu 8 ký tự, bao gồm chữ hoa và ký hiệu
            </Alert>

            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Mật khẩu mới</InputLabel>
                    <OutlinedInput
                      label='Mật khẩu mới'
                      value={values.newPassword}
                      id='user-view-security-new-password'
                      onChange={handleNewPasswordChange('newPassword')}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='hiển thị/ẩn mật khẩu'
                          >
                            <Icon icon={values.showNewPassword ? 'bx:show' : 'bx:hide'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Xác nhận mật khẩu mới</InputLabel>
                    <OutlinedInput
                      label='Xác nhận mật khẩu mới'
                      value={values.confirmNewPassword}
                      id='user-view-security-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            aria-label='hiển thị/ẩn mật khẩu'
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon icon={values.showConfirmNewPassword ? 'bx:show' : 'bx:hide'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Đổi mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid> */}

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
                Nhập Emai của bạn kèm mã quốc gia và chúng tôi sẽ gửi mã xác minh cho bạn.
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
                  <TableCell>Vị trí</TableCell>
                  <TableCell>Hoạt động gần đây</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item: DataType, index: number) => (
                  <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: `${item.iconColor}.main` } }}>
                        <Icon icon={item.icon} fontSize={20} />
                        <Typography sx={{ ml: 4, fontWeight: 600 }}>{item.browser}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.device}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.recentActivity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewSecurity