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
import router from 'next/router'
// Types
interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastTransaction?: string;
}

interface DialogState {
  open: boolean;
  message: string;
}

// EmptyState Component
function EmptyState() {
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
  recentUsers: User[];
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
}: RecipientSearchProps) {
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
            {recentUsers.map((user) => (
              <RecentUserItem
                key={user.id}
                onClick={() => onUserSelect(user)}
                selected={selectedUser?.id === user.id}
                sx={{
                  bgcolor: selectedUser?.id === user.id ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: selectedUser?.id === user.id ? 'primary.main' : 'grey.400' }}>
                    {user.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" component="span">
                        {user.phone}
                      </Typography>
                      <Typography variant="caption" component="span" sx={{ ml: 1, opacity: 0.7 }}>
                        {user.lastTransaction}
                      </Typography>
                    </Box>
                  }
                />
              </RecentUserItem>
            ))}
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
const handleComfirmButton = () => {
  router.push('/make-transaction/deposit-asset/add')
}
function UserDetails({ selectedUser, onConfirm }: UserDetailsProps) {
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
              onClick={handleComfirmButton}
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
export default function TransferDebit() {
  const [phoneFilter, setPhoneFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    message: '',
  });

  useEffect(() => {
    const mockRecentUsers: User[] = [
      { id: 'user1', name: 'Nguyen Van An', phone: '0901234567', lastTransaction: 'Today', avatar: 'A' },
      { id: 'user2', name: 'Tran Thi Mai', phone: '0912345678', lastTransaction: 'Yesterday', avatar: 'M' },
      { id: 'user3', name: 'Le Hoang Bao', phone: '0923456789', lastTransaction: '3 days ago', avatar: 'B' },
      { id: 'user4', name: 'Pham Minh Tuan', phone: '0934567890', lastTransaction: '1 week ago', avatar: 'T' },
      { id: 'user5', name: 'Hoang Thi Ngoc', phone: '0945678901', lastTransaction: '2 weeks ago', avatar: 'N' },
    ];

    const mockAllUsers: User[] = [
      ...mockRecentUsers,
      { id: 'user6', name: 'Do Van Hung', phone: '0911111111', avatar: 'H' },
    ];

    setRecentUsers(mockRecentUsers);
    setAllUsers(mockAllUsers);
  }, []);

  const handlePhoneFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneFilter(value);
    // Do not automatically search here; wait for the "Tìm kiếm" button click
  };

  const handleSearch = () => {
    if (selectedUser) {
      setSelectedUser(null);
    }

    if (phoneFilter.length === 10) {
      const foundUser = allUsers.find((user) => user.phone === phoneFilter);
      if (foundUser) {
        setSelectedUser(foundUser);
      } else {
        setDialog({
          open: true,
          message: 'Người dùng không tồn tại.',
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
