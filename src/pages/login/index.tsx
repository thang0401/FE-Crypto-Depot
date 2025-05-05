import { useState, ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-hot-toast'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import useBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import OtpForm from './VerifyOtpForm'
import RegisterDialog from './RegisterDialog'
import { Container, Grid, Paper } from '@mui/material'
import { Rocket, ScrollText, Shield, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const LoginIllustration = styled('img')({
  height: 'auto',
  maxWidth: '100%'
})

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0. Mulder875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const loginDefaultValues = {
  password: 'admin',
  email: 'thanhtdps36968@fpt.edu.vn'
}

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showOtpForm, setShowOtpForm] = useState<boolean>(false)
  const [idToken, setIdToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false)

  const auth = useAuth()
  const theme = useTheme()
  const router = useRouter()
  const { settings } = useSettings()
  const bgColors: UseBgColorType = useBgColor()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  const { skin } = settings

  const {
    control: loginControl,
    setError: setLoginError,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm<LoginFormData>({
    defaultValues: loginDefaultValues,
    mode: 'onBlur',
    resolver: yupResolver(loginSchema)
  })

  const onLoginSubmit = (data: LoginFormData) => {
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setLoginError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential
      setIdToken(token)
      const response = await auth.googleLogin({ idToken: token, rememberMe }, err => {
        toast.error(err.message || 'Google login failed')
      })

      if (response.success) {
        // Redirect handled in AuthContext
      } else if (response.error === 'OTP verification required') {
        console.log('Setting email:', response.email)
        if (!response.email) {
          console.error('Error: email is missing in Google login response')
          throw new Error('Email is missing')
        }
        setEmail(response.email)
        setShowOtpForm(true)
        toast('Please enter the OTP sent to your email.', {
          duration: 5000,
          style: { background: '#e7f5ff', color: '#1c7ed6' }
        })
      } else {
        throw new Error(response.error || 'Google login failed')
      }
    } catch (error: any) {
      console.error('Google login error:', error)
      setIdToken(null)
      setEmail(null)
      const message = error.message || 'Google login failed'
      toast.error(message)
      setLoginError('email', { type: 'manual', message })
    }
  }

  const handleOpenRegisterDialog = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setOpenRegisterDialog(true)
  }

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false)
  }

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Container maxWidth='lg'>
          <Grid container spacing={8} alignItems='center'>
            <Typography
              variant='h3'
              component='h2'
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                whiteSpace: 'nowrap', // Ngăn ngắt dòng cho "GÌ"
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                mt: 10,
                ml: 6
              }}
            >
              CRYPTOBANK LÀ GÌ?
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                width: '100%', // Kéo dài text hết chiều rộng
                textAlign: 'justify', // Căn đều text
                ml: 7
              }}
            >
              CryptoBank là nền tảng giúp bạn quản lý USDC an toàn, lưu trữ để thao tác tại bất kì đâu.
            </Typography>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ mt: 1 }}>
                  {[
                    {
                      icon: <Shield className='w-8 h-8' />,
                      title: 'Riêng tư & Ẩn danh',
                      description:
                        'Dữ liệu tài khoản tiết kiệm của bạn hoàn toàn riêng tư, không bị theo dõi, không bị phơi bày, mang lại tự do tài chính thực sự.',
                    },
                    {
                      icon: <ScrollText className='w-8 h-8' />,
                      title: 'Lập kế hoạch thừa kế tiền mã hóa',
                      description:
                        'Thiết lập kế hoạch thừa kế để chuyển giao tài sản số của bạn trong trường hợp xảy ra sự cố bất ngờ.',
                    },
                    {
                      icon: <Users className='w-8 h-8' />,
                      title: 'Ví có thể khôi phục',
                      description:
                        'Mất quyền truy cập vào ví của bạn? Đừng lo. Chúng tôi sẽ giữ tài sản của bạn an toàn và có thể khôi phục.',
                    },
                    {
                      icon: <Rocket className='w-8 h-8' />,
                      title: 'Hoàn hảo cho người mới bắt đầu với tiền mã hóa',
                      description:
                        'CryptoBank giúp bạn đầu tư và lưu trữ tài sản an toàn, bảo vệ bạn khỏi các thất bại từ sàn giao dịch.',
                    },
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                      <Paper
                        sx={{
                          p: 2,
                          mr: 3,
                          borderRadius: '12px',
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.contrastText,
                          boxShadow: theme.shadows[2],
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': { transform: 'scale(1.1)' },
                        }}
                      >
                        {benefit.icon}
                      </Paper>
                      <Box>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                          {benefit.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{benefit.description}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: '-10%',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                      opacity: 0.3,
                      filter: 'blur(40px)',
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: theme.shadows[10],
                    }}
                  >
                    <img
                      src='/images/pages/homepage-second-image.png'
                      alt='Hình ảnh minh họa CryptoBank'
                      style={{ width: '110%', height: 520, display: 'block' }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      ) : null}
      <RightWrapper
        sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
            <svg width={22} height={32} viewBox='0 0 55 81' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill={theme.palette.primary.main}
                d='M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z'
              />
              <path
                fillOpacity='0.2'
                fill={theme.palette.common.white}
                d='M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z'
              />
              <path
                fillOpacity='0.2'
                fill={theme.palette.common.white}
                d='M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z'
              />
            </svg>
            <Typography
              variant='h5'
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.45px',
                textTransform: 'lowercase',
                fontSize: '1.75rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          {idToken && showOtpForm ? (
            <OtpForm idToken={idToken} email={email} setIdToken={setIdToken} rememberMe={rememberMe} />
          ) : (
            <>
              <Typography variant='h6' sx={{ mb: 1.5 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>
              <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
              <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                acc test api và điều hướng KYC, Thêm bank account, mã giới thiệu
              </Typography>
              <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
                Account: <strong>khongbietthang0@gmail.com</strong> / Pass: <strong>admin</strong>
              </Typography>
              <Typography variant='caption' sx={{ mt: 2, display: 'block', color: 'primary.main' }}>
                acc test api những page còn lại
              </Typography>
              <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                Account: <strong>thanhtdps36968@fpt.edu.vn</strong> / Pass: <strong>admin</strong>
              </Typography>
              <form noValidate autoComplete='off' onSubmit={handleLoginSubmit(onLoginSubmit)}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='email'
                    control={loginControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Email'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(loginErrors.email)}
                        placeholder='thangadmin@gmail.com'
                      />
                    )}
                  />
                  {loginErrors.email && (
                    <FormHelperText sx={{ color: 'error.main' }}>{loginErrors.email.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor='auth-login-v2-password' error={Boolean(loginErrors.password)}>
                    Password
                  </InputLabel>
                  <Controller
                    name='password'
                    control={loginControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        value={value}
                        onBlur={onBlur}
                        label='Password'
                        onChange={onChange}
                        id='auth-login-v2-password'
                        error={Boolean(loginErrors.password)}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize={20} icon={showPassword ? 'bx:show' : 'bx:hide'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {loginErrors.password && (
                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                      {loginErrors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <FormControlLabel
                    label='Remember Me'
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: 'text.secondary' } }}
                    control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                  />
                  <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
                </Box>
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                  Sign in
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 2 }}>
                    New on our platform?
                  </Typography>
                  <Typography>
                    <LinkStyled href='/register' onClick={handleOpenRegisterDialog}>
                      Create an account
                    </LinkStyled>
                  </Typography>
                </Box>
                <Divider sx={{ my: `${theme.spacing(6)} !important` }}>or</Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => toast.error('Google login failed')}
                    theme='filled_blue'
                    shape='rectangular'
                  />
                </Box>
              </form>
            </>
          )}
          <RegisterDialog open={openRegisterDialog} onClose={handleCloseRegisterDialog} />
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage