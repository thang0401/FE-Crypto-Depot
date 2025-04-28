"use client"

import { useState } from 'react'
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
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from './UserSuspendDialog'
import UserSubscriptionDialog from './UserSubscriptionDialog'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import { getInitials } from 'src/@core/utils/get-initials'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'thang0401',
  billing: 'Enterprise',
  avatarColor: 'primary',
  country: 'Việt Nam',
  company: 'Yotz PVT LTD',
  contact: '0123456789',
  currentPlan: 'enterprise',
  fullName: 'Nguyễn Cao Thăng',
  email: 'thang0401@gmail.com',
  avatar: '/images/avatars/1.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
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
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={data.fullName}
                  sx={{ width: 110, height: 110, mb: 6 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                >
                  {getInitials(data.fullName)}
                </CustomAvatar>
              )}
              <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                {data.fullName}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.role === 'admin' ? 'Quản trị viên' : data.role}
                sx={{ fontWeight: 500 }}
                color={roleColors[data.role]}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Thông tin người dùng</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
              <Box sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tên người dùng:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Trạng thái:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={data.status === 'active' ? 'Hoạt động' : data.status === 'pending' ? 'Đang chờ' : 'Không hoạt động'}
                    sx={{ fontWeight: 500 }}
                    color={statusColors[data.status]}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Vai trò:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {data.role === 'admin' ? 'Quản trị viên' : data.role}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Liên hệ:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+84 {data.contact}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Địa chỉ:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    49 Thái Nguyên, phường Phương Xài, tp Nha Trang, tỉnh Khánh Hoà
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Quốc gia:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Chỉnh sửa
              </Button>
              <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                Tạm ngưng
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
                Chỉnh sửa thông tin người dùng
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Việc cập nhật thông tin người dùng sẽ được kiểm tra bảo mật.
                </DialogContentText>
                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Tên' defaultValue={data.fullName.split(' ')[0]} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Họ' defaultValue={data.fullName.split(' ')[1]} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Tên người dùng'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Trạng thái</InputLabel>
                        <Select
                          label='Trạng thái'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Đang chờ</MenuItem>
                          <MenuItem value='active'>Hoạt động</MenuItem>
                          <MenuItem value='inactive'>Không hoạt động</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Mã thuế' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Liên hệ' defaultValue={`+84 ${data.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Địa chỉ</InputLabel>
                        <Select
                          label='Địa chỉ'
                          defaultValue='Vietnam'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>Tiếng Anh</MenuItem>
                          <MenuItem value='Spanish'>Tiếng Tây Ban Nha</MenuItem>
                          <MenuItem value='Vietnam'>Việt Nam</MenuItem>
                          <MenuItem value='Russian'>Tiếng Nga</MenuItem>
                          <MenuItem value='French'>Tiếng Pháp</MenuItem>
                          <MenuItem value='German'>Tiếng Đức</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Quốc gia</InputLabel>
                        <Select
                          label='Quốc gia'
                          defaultValue='Vietnam'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>Hoa Kỳ</MenuItem>
                          <MenuItem value='UK'>Vương quốc Anh</MenuItem>
                          <MenuItem value='Spain'>Tây Ban Nha</MenuItem>
                          <MenuItem value='Vietnam'>Việt Nam</MenuItem>
                          <MenuItem value='France'>Pháp</MenuItem>
                          <MenuItem value='Germany'>Đức</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
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
                  Gửi
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Hủy
                </Button>
              </DialogActions>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft