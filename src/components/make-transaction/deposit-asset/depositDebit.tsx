'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { StyledCard, SearchBar, RecentUserItem } from './styled-components';
import router from 'next/router';
import Web3 from 'web3';
import { deposit_abi } from './contractABI/ContractABI.js';

// Types
interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastTransaction?: string;
  debitAccountId?: string;
}

interface Transaction {
  id: string;
  amount: string;
  transactionType: string;
  transactionHash: string;
  status: string;
  timestamp: string;
}

interface DialogState {
  open: boolean;
  message: string;
}

// EmptyState Component
function EmptyState(): JSX.Element {
  return (
    <StyledCard>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          py: 6,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 80, color: 'action.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" align="center">
          Tìm kiếm người nhận
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Nhập số điện thoại hoặc chọn từ các giao dịch gần đây của bạn
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

// RecipientSearch Component
interface RecipientSearchProps {
  phoneFilter: string;
  selectedUser: User | null;
  recentUsers: Transaction[];
  onPhoneFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUserSelect: (user: User) => void;
  onSearch: () => void;
  dialog: DialogState;
  onCloseDialog: () => void;
}

function RecipientSearch({
  phoneFilter,
  selectedUser,
  recentUsers,
  onPhoneFilterChange,
  onUserSelect,
  onSearch,
  dialog,
  onCloseDialog,
}: RecipientSearchProps): JSX.Element {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tìm người nhận
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchBar
            fullWidth
            placeholder="Nhập số điện thoại của người nhận"
            value={phoneFilter}
            onChange={onPhoneFilterChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            helperText="Nhập số điện thoại 10 chữ số đầy đủ để tìm kiếm"
          />
          <Button variant="contained" onClick={onSearch}>
            Tìm kiếm
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
            Giao dịch gần đây
          </Typography>
          <List sx={{ py: 0 }}>
            {Array.isArray(recentUsers) && recentUsers.length > 0 ? (
              recentUsers.map((tx) => (
                <RecentUserItem
                  key={tx.id}
                  onClick={() => onUserSelect({ id: tx.id, name: '', phone: '', lastTransaction: tx.timestamp })}
                  sx={{ bgcolor: 'transparent' }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'grey.400' }}>
                      {tx.transactionType.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Giao dịch ${tx.transactionType}`}
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" component="span">
                          {tx.amount} USDC
                        </Typography>
                        <Typography variant="caption" component="span" sx={{ ml: 1, opacity: 0.7 }}>
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                </RecentUserItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Không có giao dịch gần đây.
              </Typography>
            )}
          </List>
        </Box>
        <Dialog open={dialog.open} onClose={onCloseDialog}>
          <DialogTitle>Thông báo</DialogTitle>
          <DialogContent>
            <Typography>{dialog.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </StyledCard>
  );
}

// UserDetails Component
interface UserDetailsProps {
  selectedUser: User;
  onConfirm: () => void;
}

function UserDetails({ selectedUser, onConfirm }: UserDetailsProps): JSX.Element {
  const handleConfirmButton = () => {
    localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    router.push('/make-transaction/deposit-asset/add');
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Tài khoản chi tiết</Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Thông tin người nhận
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={selectedUser.name}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={selectedUser.phone}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleConfirmButton}
              startIcon={<SendIcon />}
              sx={{ borderRadius: '28px', px: 3 }}
            >
              Xác nhận tài khoản
            </Button>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

// TransferDebit Component
export default function TransferDebit(): JSX.Element {
  const [phoneFilter, setPhoneFilter] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [recentUsers, setRecentUsers] = useState<Transaction[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    message: '',
  });

  // Bước 0: Fetch 5 giao dịch gần đây (real-time từ blockchain và BE)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = userData.id; // "d0250rm199kgpknaiko0"

    // Lấy giao dịch từ BE
    const fetchRecentTransactions = async () => {
      try {
        const response = await fetch('/api/debitAccount/recent-transactions', {
          method: 'GET',
        });
        const transactions = await response.json();
        setRecentUsers(Array.isArray(transactions) ? transactions : []);
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
        setRecentUsers([]);
      }
    };

    fetchRecentTransactions();

    // Lắng nghe sự kiện từ blockchain
    const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL || '');
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
    const contract = new web3.eth.Contract(deposit_abi, contractAddress);

    contract.events.Deposit({
      filter: { userId }, // Lọc theo userId
      fromBlock: 'latest',
    })
      .on('data', (event: any) => {
        const { user, debitAccountId, amount, transactionHash, timestamp } = event.returnValues;
        const transaction: Transaction = {
          id: transactionHash,
          amount: web3.utils.fromWei(amount, 'ether'),
          transactionType: 'DEPOSIT',
          transactionHash,
          status: 'Thành công',
          timestamp: new Date(timestamp * 1000).toISOString(),
        };
        setRecentUsers((prev) => [transaction, ...prev].slice(0, 5));
      })
      // .on('error', (error: Error) => {
      //   console.error('Error listening to Deposit event:', error);
      // });
  }, []);

  const handlePhoneFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneFilter(value);
  };

  const handleSearch = async () => {
    if (selectedUser) {
      setSelectedUser(null);
    }

    if (phoneFilter.length === 10) {
      try {
        const response = await fetch(`https://be-crypto-depot.name.vn/api/debitAccount/search?phoneNumber=${phoneFilter}`, {
          method: 'GET',
        });
        const users = await response.json();
        if (users.length > 0) {
          const user = users[0];
          setSelectedUser({
            id: user.id,
            name: user.fullName,
            phone: user.phoneNumber,
            avatar: user.fullName.charAt(0),
            lastTransaction: '',
            debitAccountId: user.debitAccountId,
          });
          setAllUsers(users.map((u: any) => ({
            id: u.id,
            name: u.fullName,
            phone: u.phoneNumber,
            avatar: u.fullName.charAt(0),
          })));
        } else {
          setDialog({
            open: true,
            message: 'Người dùng không tồn tại.',
          });
        }
      } catch (error) {
        setDialog({
          open: true,
          message: 'Lỗi khi tìm kiếm người dùng.',
        });
      }
    } else {
      setDialog({
        open: true,
        message: 'Vui lòng nhập số điện thoại 10 chữ số.',
      });
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setPhoneFilter(user.phone);
  };

  const handleCloseDialog = () => {
    setDialog({
      open: false,
      message: '',
    });
  };

  const handleConfirm = () => {
    alert(`Xác nhận tài khoản: ${selectedUser?.name} (${selectedUser?.phone})`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Nạp tiền vào tài khoản - Tìm kiếm tài khoản
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <RecipientSearch
            phoneFilter={phoneFilter}
            selectedUser={selectedUser}
            recentUsers={recentUsers}
            onPhoneFilterChange={handlePhoneFilterChange}
            onUserSelect={handleUserSelect}
            onSearch={handleSearch}
            dialog={dialog}
            onCloseDialog={handleCloseDialog}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          {selectedUser ? (
            <UserDetails selectedUser={selectedUser} onConfirm={handleConfirm} />
          ) : (
            <EmptyState />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
