import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'

const FacebookBtn = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#3B5998 !important',
  borderRadius: theme.shape.borderRadius,
}))

const TwitterBtn = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  margin: theme.spacing(0, 3),
  color: theme.palette.common.white,
  backgroundColor: '#55ACEE !important',
  borderRadius: theme.shape.borderRadius,
}))

const LinkedInBtn = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#007BB6 !important',
  borderRadius: theme.shape.borderRadius,
}))
  
const ReferEarnPage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      try {
        const parsedData = JSON.parse(userData)
        if(parsedData.email){
          setEmail(parsedData.email)
        }
      }catch (err){
        console.log('Error parsing userData from localStorage:', err);
      }
    }
  })


  const handleCopy = () => {
    navigator.clipboard.writeText(email);
  }

  return (
    <Card>
      <CardContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Nhập mã giới thiệu
          </Typography>
        </Box>
        <Grid container spacing={6} sx={{ mt: 4, textAlign: 'center' }}>
          <Grid item md={4} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                skin="light"
                color="primary"
                sx={{ mb: 3, width: [70, 100], height: [70, 100], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
              >
                <Icon icon="bx:message" />
              </CustomAvatar>
              <Typography sx={{ mb: 3, fontWeight: '600' }}>
                Nhập mã giới thiệu người Crypto Bank cho bạn🤟🏻
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                skin="light"
                color="primary"
                sx={{ mb: 3, width: [70, 100], height: [70, 100], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
              >
                <Icon icon="bx:gift" />
              </CustomAvatar>
              <Typography sx={{ mb: 3, fontWeight: '600' }}>
                Thực hiện giao dịch đầu tiên và nhận ngay 5 đô tiền thưởng 🥳
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                skin="light"
                color="primary"
                sx={{ mb: 3, width: [70, 100], height: [70, 100], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
              >
                <Icon icon="bx:award" />
              </CustomAvatar>
              <Typography sx={{ mb: 3, fontWeight: '600' }}>
                Giới thiệu cho bạn bè của bạn ngay và nhận được 5$ vào tài khoản
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ my: '0 !important' }} />
      <CardContent
        sx={{
          pt: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        }}
      >
        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Nhập email người giới thiệu cho bạn
          </Typography>
          <InputLabel htmlFor="refer-email" sx={{ mb: 2, display: 'inline-flex', whiteSpace: 'break-spaces' }}>
            {`Nhập gmail người giới thiệu cho bạn tham gia ${themeConfig.templateName} 😍`}
          </InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <TextField
              fullWidth
              size="small"
              id="refer-email"
              sx={{ mr: { xs: 0, sm: 4 } }}
              placeholder= {email}
            />
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
              Send
            </Button>
          </Box>
        </Box>
        <div>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Thực hiện giao dịch đầu tiên và nhận ngay 5 đô tiền thưởng 🥳
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
              Mã giới thiệu của bạn là : <em>{email}</em>
            {email && (
              <Tooltip title = "Copy email">
                <IconButton onClick={handleCopy} sx={{ml : 2}}>
                  <ContentCopyIcon fontSize='small'/>
                </IconButton>
              </Tooltip>
            )}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReferEarnPage
