import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import { Accordion, AccordionDetails, AccordionSummary, Icon } from '@mui/material'
import themeConfig from 'src/configs/themeConfig'
import Web3 from 'web3'
import { deposit_abi } from '../contractABI/ContractABI.js'

interface Props {
  customerData: { id: string; name: string; phone: string; debitAccountId: string }
}

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(2)} !important`
}))

const DepositAddCard = ({ customerData }: Props): JSX.Element => {
  const theme = useTheme()
  const [transactions, setTransactions] = useState<any[]>([])

  // Bước 6: Hiển thị giao dịch từ blockchain (real-time)
  useEffect(() => {
    const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL || '');
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
    const contract = new web3.eth.Contract(deposit_abi, contractAddress);

    // Subscribe to the Deposit event
    const eventSubscription = contract.events
      .Deposit({
        filter: { userId: customerData.id },
        fromBlock: 0,
      })
      .on('data', (event: any) => {
        console.log('Received Deposit event:', event);
        const { user, debitAccountId, amount, transactionHash, timestamp } = event.returnValues;
        const transaction = {
          id: transactionHash,
          amount: web3.utils.fromWei(amount, 'ether'),
          transactionType: 'DEPOSIT',
          transactionHash,
          status: 'Thành công',
          timestamp: new Date(timestamp * 1000).toISOString(),
        };
        setTransactions((prev) => [transaction, ...prev].slice(0, 5));
      })
      // .on ('error', (error: Error) => {
      //   console.error('Error listening to Deposit event:', error);
      // });

    // Cleanup subscription on component unmount
    // return () => {
    //   eventSubscription.removeAllListeners(); // Unsubscribe from all listeners
    // };
  }, [customerData.id]);
  return (
    <Card>
      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 } }}>
          <Grid item sm={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: { sm: 0, xs: 6 } }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
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
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Table sx={{ maxWidth: '200px' }}>
                <TableBody>
                  <TableRow>
                    <tr>
                      <Typography variant='h5'>DepositID</Typography>
                    </tr>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary' }}>Created Date:</Typography>
                    </MUITableCell>
                    <MUITableCell></MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ my: '0 !important' }} />

      <Grid display={'flex'} width={'100%'}>
        <Grid width={'60%'}>
          <CardContent>
            <Grid
              container
              display={'grid'}
              sx={{ p: { sm: 4, xs: 0 }, pb: theme => `${theme.spacing(1)} !important` }}
            >
              <Grid item sx={{ mb: { lg: 0, xs: 5 } }}>
                <Typography sx={{ mb: 4, fontWeight: 500 }}>Nạp đến</Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Tên khách hàng:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{customerData.name}</MUITableCell>
                    </TableRow>
                    {/* <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Email:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{customerData.email}</MUITableCell>
                    </TableRow> */}
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Số điện thoại:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{customerData.phone}</MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>

              <Grid width={'100%'} item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 5 } }}>
                <Typography sx={{ mt: 8, mb: 4, fontWeight: 500 }}>Lịch sử nạp tài sản vừa xong:</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: 2 }}>STT</TableCell>
                      <TableCell sx={{ py: 2 }}>LOẠI TÀI SẢN</TableCell>
                      <TableCell sx={{ py: 2 }}>SỐ LƯỢNG</TableCell>
                      <TableCell sx={{ py: 2 }}>TRẠNG THÁI</TableCell>
                      <TableCell sx={{ py: 2 }}>THỜI GIAN</TableCell>
                      <TableCell sx={{ py: 2 }}>TX HASH</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((tx, index) => (
                      <TableRow key={tx.transactionHash}>
                        <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{index + 1}</TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>USDC</TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{tx.amount}</TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{tx.status}</TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>
                          {new Date(tx.timestamp).toLocaleString('vi-VN')}
                        </TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>
                          {tx.transactionHash.substring(0, 10)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid width={'40%'}>
          <Typography sx={{ mb: 4, fontWeight: 500 }}>FAQ?</Typography>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Deposit trên CryptoDepot là gì?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Deposit là quá trình người dùng nạp tiền hoặc tài sản tiền điện tử vào tài khoản CryptoDepot
                của mình từ các ví Web 3 bên ngoài.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Làm thế nào để nạp tiền vào CryptoDepot?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Để nạp tiền vào tài khoản CryptoDepot, bạn chỉ cần kết nối ví Web 3, chọn tài sản, gõ số lượng
                và cung cấp ID Tài khoản nhận tài sản. Sau đó, ví Web 3 của bạn sẽ hiện lên giao dịch và bạn chỉ cần phê
                duyệt giao dịch đó thôi.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Tôi có thể nạp loại tiền điện tử nào vào CryptoDepot?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: CryptoDepot hỗ trợ nhiều loại tiền điện tử phổ biến như Ethereum, USDC và nhiều loại token
                ERC-20 và SPL-20 khác nhau. Danh sách đầy đủ các loại tài sản được hỗ trợ sẽ được cập nhật thường xuyên
                trên nền tảng.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Quá trình nạp tiền mất bao lâu để hoàn thành?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Thời gian nạp tiền phụ thuộc vào loại blockchain mà bạn sử dụng. Các giao dịch trên Ethereum có
                thể mất từ vài phút đến vài giờ tùy thuộc vào trạng thái của mạng, trong khi giao dịch trên USDC sẽ
                nhanh chóng hơn. Tuy nhiên, CryptoDepot sẽ cập nhật số dư ngay khi giao dịch được xác nhận trên
                blockchain.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Có phí nào liên quan đến việc nạp tiền không?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: CryptoDepot không thu phí cho việc nạp tiền, nhưng bạn sẽ phải trả phí giao dịch blockchain
                (gas fee) khi gửi tiền từ ví Web 3 của mình đến CryptoDepot.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DepositAddCard
