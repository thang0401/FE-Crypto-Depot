'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Wallet,
  Shield,
  ArrowRight,
  Lock,
  Activity,
  CreditCard,
  ScrollText,
  Rocket,
  RefreshCw,
  Users,
  Globe,
  KeyRound
} from 'lucide-react'
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WalletInitializationDialog from './walletInitializationDialog'
import { usePrivy, useWallets, useCreateWallet, useImportWallet } from '@privy-io/react-auth' ///
import {
  Avatar,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { tw, css } from 'twind/css'
import router from 'next/router'
import { Connection, PublicKey } from '@solana/web3.js'
const SOLANA_MAINNET = 'https://api.mainnet-beta.solana.com' //
const SOLANA_DEVNET = 'https://api.devnet.solana.com'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { TokenData, assetType } from './type'
import { auto } from '@popperjs/core'
import themeConfig from 'src/configs/themeConfig'
import { getLocalstorage } from 'src/utils/localStorageSide'

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [currentIndex, setCurrentIndex]: any = useState(0)

 const [publicKey, setPublicKey] = useState('9d5jmHCZT3hqDmjtLsdYnJoktdnF77pxDbEWkGmMi9gG')
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [error, setError] = useState('')
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [tokens, setTokens] = useState<TokenData[]>([])

 const tokenNameMap = {
   '4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ': 'SFC-VND',
   '8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He': ''
 }

 // Hàm gọi API lấy token
 const fetchTokenData = async (pubKey: string) => {
   try {
     setError('') // Clear lỗi trước
     const connection = new Connection(SOLANA_DEVNET)

     // Kiểm tra xem publicKey có hợp lệ không
     const userPublicKey = new PublicKey(pubKey)

     const solBalanceLamports = await connection.getBalance(userPublicKey)
     const solBalance = solBalanceLamports / 1e9 // Chuyển đổi từ lamports sang SOL

     // Lấy danh sách token accounts thuộc về public key
     const tokenAccounts = await connection.getParsedTokenAccountsByOwner(userPublicKey, {
       programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') // Token Program ID
     })

     const tokensData: TokenData[] = tokenAccounts.value.map(accountInfo => {
       const tokenAmount = accountInfo.account.data.parsed.info.tokenAmount.uiAmountString
       const tokenMint = accountInfo.account.data.parsed.info.mint
       return {
         mint: tokenMint,
         amount: tokenAmount,
         symbol: tokenMint in tokenNameMap ? tokenNameMap[tokenMint as keyof typeof tokenNameMap] : 'Unknown'
       }
     })
     const allTokens = [
       {
         mint: 'SOL',
         amount: solBalance.toString(),
         symbol: 'SOL'
       },
       ...tokensData
     ]
     setTokens(allTokens) // Cập nhật dữ liệu bảng với thông tin token
   } catch (err) {
     setError('Không tìm thấy public key hoặc xảy ra lỗi khi tra cứu.')
     setTokens([]) // Xóa dữ liệu bảng nếu lỗi
   }
 }

 // Xử lý sự kiện submit form
 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault()
   if (publicKey.trim() === '') {
     setError('Public key không được để trống.')
     return
   }

   fetchTokenData(publicKey)
 }

 const previous = () => {
   if (currentIndex - 1 >= 0) {
     setCurrentIndex(currentIndex - 1)
   }
 }
 const handleRedirectRegister = () => {
   router.push('/register')
 }
 console.log(getLocalstorage('settings'))

  const navigationLinks = ['Tính năng', 'Giải pháp', 'Giá cả', 'Về chúng tôi']

  const drawer = (
    <List>
      {navigationLinks.map(text => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <Box>
      <Grid
        container
        width={'100%'}
        sx={
          getLocalstorage('settings')?.mode === 'dark'
            ? { background: '#2B2C40', color: 'white' }
            : { background: '#fff' }
        }
      >
        <Box sx={{ mx: auto, p: 4 }}>
          <Typography
            sx={
              getLocalstorage('settings')?.mode === 'dark'
                ? { background: '#2B2C40', color: 'white' }
                : { background: '#fff' }
            }
            variant='h1'
            style={{ textAlign: 'center', fontFamily: 'sans-serif' }}
          >
            Bảo vệ tài sản số của bạn với Crypto Depot
          </Typography>
          <div className={tw(`max-w-xl mx-auto`)}>
            <p className={tw(`mt-10 text-gray-500 text-center text-xl lg:text-3xl`)}>
              Cung cấp giải pháp lưu trữ và giao dịch đơn giản, an toàn và bảo mật số dư số dư tiền điện tử của bạn.
            </p>
          </div>
        </Box>
      </Grid>

      <Grid container spacing={3} display={'flex'} width={'100%'} marginTop={4}>
        <Grid item xs={12} sm={8}>
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <Typography sx={{ mt: 2, mb: 2, fontWeight: 500, color: 'primary.main' }}>Bạn có biết?</Typography>
            <Typography sx={{ mb: 3, color: 'text.secondary' }}>
              Nếu bạn lưu trữ tiền ở các ví web3 truyền thống, bất kỳ ai publickey ví của bạn cũng sẽ biết được số dư
              trong tài khoản của bạn, Ứng dụng chúng tôi giấu đi số dư của bạn, đảm bảo không ai ngoài bạn có thể biết
              về số lượng tài sản bạn sở hữu.
            </Typography>
            <Grid>
              <Typography sx={{ fontWeight: 500, mb: 2 }}>Nhập public key bạn muốn kiểm tra số dư tại đây</Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl error={Boolean(error)} sx={{ maxWidth: '100%' }}>
                    <Input
                      placeholder='Dùng Devnet publickey không dùng Mainnet publickey'
                      value={publicKey}
                      onChange={e => setPublicKey(e.target.value)}
                      sx={{
                        padding: '10px',
                        border: '1px solid',
                        borderColor: error ? 'error.main' : 'divider',
                        borderRadius: 1,
                        width: '100%'
                      }}
                    />
                    {error && (
                      <FormHelperText sx={{ mt: 1, color: 'error.main' }}>
                        <InfoOutlined sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Button type='submit' variant='contained' color='primary' sx={{ alignSelf: 'flex-start' }}>
                    Tra cứu
                  </Button>
                </Stack>
              </form>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Số dư của tài khoản tra cứu bao gồm:</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ py: 2, fontWeight: 600 }}>STT</TableCell>
                  <TableCell sx={{ py: 2, fontWeight: 600 }}>Loại tài sản</TableCell>
                  <TableCell sx={{ py: 2, fontWeight: 600 }}>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.length > 0 ? (
                  tokens.map((token, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ py: 2 }}>{index + 1}</TableCell>
                      <TableCell sx={{ py: 2 }}>{token.symbol}</TableCell>
                      <TableCell sx={{ py: 2 }}>{token.amount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
                      Tra cứu tài sản ngay!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>

      {/* <Drawer
        variant='temporary'
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer> */}

      {/* Phần Giới Thiệu */}
      {/* <Box sx={{ pt: 16, pb: 10 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={6} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant='h2' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
                  CryptoBank là <span style={{ color: 'inherit' }}>TƯƠNG LAI</span>
                </Typography>
                <Typography variant='h5' sx={{ mb: 4 }}>
                  Trải nghiệm các dịch vụ ngân hàng liền mạch được cung cấp bởi tiền mã hóa. An toàn, nhanh chóng và được xây dựng cho kỷ nguyên hiện đại.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant='contained'
                    size='large'
                    endIcon={<ArrowRight />}
                    sx={{
                      '&:hover': { bgcolor: 'inherit' }
                    }}
                  >
                    Bắt đầu ngay bây giờ
                  </Button>
                  <Button
                    variant='outlined'
                    size='large'
                    sx={{
                      '&:hover': { borderColor: 'inherit', color: 'inherit' }
                    }}
                  >
                    Tìm hiểu thêm
                  </Button>
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
                      opacity: 0.1,
                      filter: 'blur(40px)'
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden'
                    }}
                  >

                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      {/* Phần Tính Năng */}
      {/* <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom sx={{ mb: 8, fontWeight: 'bold', mt: 0 }}>
            Không rủi ro, chỉ tốc độ - Chúng tôi sẽ dẫn đầu
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <Activity className="w-12 h-12" />,
                title: "Giao dịch tức thời",
                description: "Thực hiện giao dịch ngay lập tức với tỷ giá cạnh tranh và phí tối thiểu.",
              },
              {
                icon: <KeyRound className='w-12 h-12' />,
                title: 'Ví có thể khôi phục',
                description: 'Mất quyền truy cập vào ví của bạn? Đừng lo. Chúng tôi sẽ giữ tài sản của bạn an toàn và có thể khôi phục.'
              },
              {
                icon: <ScrollText className='w-12 h-12' />,
                title: 'Lập kế hoạch thừa kế',
                description: 'Một kế hoạch thừa kế tài sản kỹ thuật số để bảo vệ những kỷ niệm quý giá và thông tin quan trọng.'
              },
              {
                icon: <Shield className='w-12 h-12' />,
                title: 'Tiết kiệm bí mật',
                description: 'Khoản tiết kiệm của bạn luôn riêng tư, an toàn và chỉ bạn có thể thấy.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      transition: '0.3s',
                      '&:hover': { transform: 'translateY(-8px)' },
                      borderRadius: '16px'
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>{feature.icon}</Box>
                      <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {feature.title}
                      </Typography>
                      <Typography align='center'>{feature.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* Phần Lợi Ích */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={8} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant='h3' component='h2' gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                  Tại sao chọn CryptoBank?
                </Typography>
                <Box sx={{ mt: 12 }}>
                  {[
                    {
                      icon: <Shield className='w-8 h-8' />,
                      title: 'Riêng tư & Ẩn danh',
                      description:
                        'Dữ liệu tài khoản tiết kiệm của bạn hoàn toàn riêng tư, không bị theo dõi, không bị phơi bày, mang lại tự do tài chính thực sự.'
                    },
                    {
                      icon: <ScrollText className='w-8 h-8' />,
                      title: 'Lập kế hoạch thừa kế tiền mã hóa',
                      description:
                        'Thiết lập kế hoạch thừa kế để chuyển giao tài sản số của bạn trong trường hợp xảy ra sự cố bất ngờ.'
                    },
                    {
                      icon: <Users className='w-8 h-8' />,
                      title: 'Ví có thể khôi phục',
                      description:
                        'Mất quyền truy cập vào ví của bạn? Đừng lo. Chúng tôi sẽ giữ tài sản của bạn an toàn và có thể khôi phục.'
                    },
                    {
                      icon: <Rocket className='w-8 h-8' />,
                      title: 'Hoàn hảo cho người mới bắt đầu với tiền mã hóa',
                      description:
                        'CryptoBank giúp bạn đầu tư và lưu trữ tài sản an toàn, bảo vệ bạn khỏi các thất bại từ sàn giao dịch.'
                    }
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                      <Paper
                        sx={{
                          p: 2,
                          pb: 1,
                          mr: 3,
                          borderRadius: '12px'
                        }}
                      >
                        {benefit.icon}
                      </Paper>
                      <Box>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                          {benefit.title}
                        </Typography>
                        <Typography>{benefit.description}</Typography>
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
                      opacity: 0.1,
                      filter: 'blur(40px)'
                    }}
                  />
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src='/images/pages/homepage-second-image.png'
                      alt='Hình ảnh minh họa CryptoBank'
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Phần Kêu Gọi Hành Động */}
      <Box
        sx={{
          py: 8,
          marginLeft: 10,
          marginRight: 8,
          borderRadius: 4,
          bgcolor: 'background.paper',
          boxShadow: 3
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={6} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant='h3' component='h2' gutterBottom sx={{ fontWeight: 'bold' }}>
                  Sẵn sàng tạo tài khoản?
                </Typography>
                <Typography variant='body1' sx={{ mb: 4, textAlign: 'justify', mr: 5 }}>
                  Bắt đầu hành trình đầu tư tiền mã hóa của bạn một cách an toàn với CryptoBank. Bạn đã sẵn sàng bảo vệ
                  tài sản số của mình khỏi các rủi ro thị trường phổ biến chưa? CryptoBank cung cấp giải pháp lưu ký
                  toàn diện, cho phép bạn quản lý tài sản dễ dàng mà không lo lắng về bảo mật hay các thủ tục phức tạp.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 3 }}>
                  <Typography variant='h5' sx={{ mb: 8 }}>
                    Đăng ký ngay bây giờ và nhận $5 phí giao dịch miễn phí!
                  </Typography>
                  <Button
                    variant='contained'
                    size='large'
                    endIcon={<ArrowRight />}
                    sx={{
                      '&:hover': { bgcolor: 'inherit' },
                      fontWeight: 'bold',
                      marginLeft: 40
                    }}
                  >
                    Tạo tài khoản ngay
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Phần Câu Hỏi Thường Gặp */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom sx={{ mb: 8, fontWeight: 'bold' }}>
            Câu Hỏi Thường Gặp
          </Typography>
          <Grid container spacing={4} justifyContent='left'>
            <Grid item xs={12} md={20}>
              {[
                {
                  question: 'CryptoBank là gì?',
                  answer:
                    'CryptoBank là một nền tảng Web3 cho phép người dùng quản lý tài sản mã hóa mà không cần xử lý ví hoặc khóa riêng.'
                },
                {
                  question: 'CryptoBank có lưu trữ ví và tài sản của tôi không?',
                  answer:
                    'Có, CryptoBank sử dụng ví Web3 độc đáo để quản lý tài sản của người dùng, đảm bảo lưu trữ an toàn.'
                },
                {
                  question: 'Làm thế nào để đăng ký và sử dụng CryptoBank?',
                  answer: 'Chỉ cần đăng ký với Tên người dùng và Mật khẩu. Không cần tạo ví hoặc quản lý khóa riêng.'
                },
                {
                  question: 'Tôi có thể nhận tài sản Web3 từ các ví khác không?',
                  answer:
                    'Có, bạn có thể nhận tài sản từ bất kỳ ví Web3 nào chỉ bằng Tên người dùng—không cần đăng nhập.'
                },
                {
                  question: 'Làm thế nào để chuyển tài sản giữa các Tên người dùng?',
                  answer:
                    'Bạn có thể chuyển tài sản Web3 đến bất kỳ Tên người dùng nào trong hệ thống mà không cần tương tác với blockchain.'
                },
                {
                  question: 'CryptoBank có tính phí giao dịch không?',
                  answer: 'Phí giao dịch được tối ưu hóa, giảm chi phí bằng cách xử lý giao dịch nội bộ.'
                },
                {
                  question: 'Tôi có cần kiến thức về Web3 hoặc blockchain để sử dụng CryptoBank không?',
                  answer:
                    'Không, CryptoBank thân thiện với người dùng—chỉ cần Tên người dùng và Mật khẩu, không cần chuyên môn blockchain.'
                },
                {
                  question: 'Điều gì xảy ra nếu tôi quên mật khẩu?',
                  answer: 'Bạn có thể khôi phục mật khẩu bằng cách xác minh thông tin để đảm bảo an toàn.'
                },
                {
                  question: 'CryptoBank có hỗ trợ giao dịch liên chuỗi không?',
                  answer:
                    'Hiện tại, CryptoBank hỗ trợ một số blockchain nhất định nhưng đang khám phá khả năng giao dịch liên chuỗi trong tương lai.'
                }
              ].map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2, borderRadius: '8px !important' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Hộp thoại KYC */}
      {/* <Dialog open={openKycDialog} onClose={handleSkipKyc}>
        <DialogTitle>Hoàn thành xác minh danh tính (KYC)</DialogTitle>
        <DialogContent>
          <Typography>
            Tài khoản của bạn chưa được xác minh. Vui lòng hoàn thành KYC để truy cập tất cả các tính năng.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipKyc} color="primary">
            Bỏ qua
          </Button>
          <Button onClick={handleConfirmKyc} variant="contained" color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openWalletDialog} onClose={handleCloseWalletDialog}>
        <DialogTitle>Khởi tạo ví của bạn</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Vui lòng chọn một tùy chọn để khởi tạo ví của bạn.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateWallet}
            sx={{ mb: 2 }}
            disabled={walletInitialized}
          >
            Tạo ví mới
          </Button>
          <TextField
            fullWidth
            label="Khóa riêng"
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleImportWallet}
            disabled={!privateKey || walletInitialized}
          >
            Nhập ví
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWalletDialog}>Hủy</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  )
}

export default Dashboard
