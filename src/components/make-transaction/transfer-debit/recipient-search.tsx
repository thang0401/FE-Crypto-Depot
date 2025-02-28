import type React from "react"
import { CardContent, Typography, List, ListItemAvatar, ListItemText, Avatar, Box, InputAdornment ,Dialog,  DialogTitle,
 DialogContent,
 DialogActions,
 Button,} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import HistoryIcon from "@mui/icons-material/History"
import { StyledCard, SearchBar, RecentUserItem } from "./styled-components"
import { User } from "./type"


interface DialogState {
  open: boolean
  message: string
}

interface RecipientSearchProps {
  phoneFilter: string
  selectedUser: User | null
  recentUsers: User[] // Chỉ hiển thị 5 người gần đây
  onPhoneFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUserSelect: (user: User) => void
  dialog: DialogState
  onCloseDialog: () => void
}

export default function RecipientSearch({
  phoneFilter,
  selectedUser,
  recentUsers,
  onPhoneFilterChange,
  onUserSelect,
  dialog,
  onCloseDialog,
}: RecipientSearchProps) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Find Recipient
        </Typography>

        <SearchBar
          fullWidth
          placeholder="Enter recipient's phone number"
          value={phoneFilter}
          onChange={onPhoneFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          helperText="Enter full 10-digit phone number to search"
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
            Recent Transactions
          </Typography>

          <List sx={{ py: 0 }}>
            {recentUsers.map((user) => (
              <RecentUserItem
                key={user.id}
                onClick={() => onUserSelect(user)}
                selected={selectedUser?.id === user.id}
                sx={{
                  bgcolor: selectedUser?.id === user.id ? "rgba(25, 118, 210, 0.08)" : "transparent",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: selectedUser?.id === user.id ? "primary.main" : "grey.400" }}>
                    {user.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
  )
}

