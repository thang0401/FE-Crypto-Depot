'use client';

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { styled, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import { Accordion, AccordionDetails, AccordionSummary, Icon } from '@mui/material';
import themeConfig from 'src/configs/themeConfig';
import Web3 from 'web3';
import { deposit_abi } from '../../deposit-asset/contractABI/ContractABI';

interface Props {
  userData: { id: string; fullName: string; email: string; phoneNumber: string };
}

interface Transaction {
  id: string;
  amount: string;
  transactionType: string;
  transactionHash: string;
  status: string;
  timestamp: string;
}

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(2)} !important`,
}));

const WithdrawAddCard = ({ userData }: Props) => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL || '');
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
    const contract = new web3.eth.Contract(deposit_abi, contractAddress);

    const fetchRecentTransactions = async () => {
      try {
        const response = await fetch('/api/debitAccount/recent-transactions', {
          method: 'GET',
        });
        const transactionsData = await response.json();
        const withdrawTxs = transactionsData.filter((tx: Transaction) => tx.transactionType === 'WITHDRAW');
        setTransactions(withdrawTxs.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
        setTransactions([]);
      }
    };

    fetchRecentTransactions();

    const eventSubscription = contract.events
      .Withdraw({
        filter: { userId: userData.id },
        fromBlock: 0,
      })
      .on('data', (event: any) => {
        console.log('Received Withdraw event:', event);
        const { user, userId, amount, transactionHash, timestamp } = event.returnValues;
        const transaction: Transaction = {
          id: transactionHash,
          amount: web3.utils.fromWei(amount, 'ether'),
          transactionType: 'WITHDRAW',
          transactionHash,
          status: 'Thành công',
          timestamp: new Date(timestamp * 1000).toISOString(),
        };
        setTransactions((prev) => [transaction, ...prev].slice(0, 5));
      })
      // .on('error', (error: Error) => {
      //   console.error('Error listening to Withdraw event:', error);
      // });

    // return () => {
    //   eventSubscription.removeAllListeners();
    // };
  }, [userData.id]);

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
                  variant="h5"
                  sx={{
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '-0.45px',
                    textTransform: 'lowercase',
                    fontSize: '1.75rem !important',
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
                    <MUITableCell>
                      <Typography variant="h5">WithdrawID</Typography>
                    </MUITableCell>
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
            <Grid container display={'grid'} sx={{ p: { sm: 4, xs: 0 }, pb: (theme) => `${theme.spacing(1)} !important` }}>
              <Grid item sx={{ mb: { lg: 0, xs: 5 } }}>
                <Typography sx={{ mb: 4, fontWeight: 500 }}>Rút từ Tài khoản mục</Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Tên Khách Hàng:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{userData.fullName}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Gmail:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{userData.email}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Số điện thoại:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{userData.phoneNumber}</MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>

              <Grid width={'100%'} item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 5 } }}>
                <Typography sx={{ mt: 8, mb: 4, fontWeight: 500 }}>Lịch sử rút tiền vừa xong:</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: 2 }}>index</TableCell>
                      <TableCell sx={{ py: 2 }}>Asset Type</TableCell>
                      <TableCell sx={{ py: 2 }}>Số lượng</TableCell>
                      <TableCell sx={{ py: 2 }}>Status</TableCell>
                      <TableCell sx={{ py: 2 }}>Thời gian</TableCell>
                      <TableCell sx={{ py: 2 }}>TX Hash</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((tx, index) => (
                      <TableRow key={tx.transactionHash}>
                        <TableCell sx={{ py: (theme) => `${theme.spacing(2.75)} !important` }}>{index + 1}</TableCell>
                        <TableCell sx={{ py: (theme) => `${theme.spacing(2.75)} !important` }}>USDC</TableCell>
                        <TableCell sx={{ py: (theme) => `${theme.spacing(2.75)} !important` }}>{tx.amount}</TableCell>
                        <TableCell sx={{ py: (theme) => `${theme.spacing(2.75)} !important` }}>{tx.status}</TableCell>
                        <TableCell sx={{ py: (theme) => `${theme.spacing(2.75)} !important` }}>
                          {new Date(tx.timestamp).toLocaleString('vi-VN')}
                        </TableCell>
                        <TableCell sx={{ py: (theme) => `${theme.spacing(2.75)} !important` }}>
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
        <Grid width={'40%'} item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 5 } }}>
          <Typography sx={{ mb: 4, fontWeight: 500 }}>FAQ about Withdraw</Typography>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Withdraw trên CryptoDepot là gì?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Withdraw là quá trình rút tài sản tiền điện tử từ tài khoản CryptoDepot của bạn sang ví bên ngoài hoặc sàn giao dịch khác.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Làm thế nào để rút tiền từ CryptoDepot?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Để rút tiền, bạn chỉ cần nhập địa chỉ ví đích mà bạn muốn rút tài sản, chọn ID Tài khoản bạn muốn rút tài sản Web 3 ra, chọn loại tài sản và số lượng muốn rút, sau đó xác nhận giao dịch. Sau khi giao dịch được xác nhận, tài sản sẽ được gửi đến ví đích.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Rút tiền từ CryptoDepot mất bao lâu?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Thời gian rút tiền phụ thuộc vào mạng blockchain mà bạn sử dụng. Thông thường, các giao dịch Ethereum có thể mất từ vài phút đến vài giờ để xác nhận tùy vào mức độ tắc nghẽn của mạng. Còn những giao dịch trên USDC sẽ nhanh hơn.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Có phí nào khi rút tiền từ CryptoDepot không?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Có, Khi bạn thực hiện rút tiền từ CryptoDepot, bạn sẽ phải trả phí giao dịch trên blockchain (gas fee). Phí này phụ thuộc vào blockchain mà bạn chọn để thực hiện giao dịch. Còn CryptoDepot chưa có kế hoạch thu loại phí này.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography sx={{ fontWeight: '500' }}>Có giới hạn số lượng tài sản tối thiểu/tối đa khi rút tài sản Web 3 không?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                Trả lời: Hiện tại giới hạn của hoạt động rút tài sản là số lượng tài sản Web 3 trong Tài khoản của bạn.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WithdrawAddCard;
