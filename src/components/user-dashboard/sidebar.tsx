import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Dashboard,
  AccountBalance,
  CreditCard,
  Send,
  AccountBalanceWallet,
  BarChart,
  Settings,
  Logout,
  ChevronLeft,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
const drawerWidth = 280

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Accounts", icon: <AccountBalance /> },
    { text: "Cards", icon: <CreditCard /> },
    { text: "Transfers", icon: <Send /> },
    { text: "Crypto Wallet", icon: <AccountBalanceWallet /> },
    { text: "Savings", icon: <CurrencyExchangeIcon /> },
  ]

  const bottomMenuItems = [
    { text: "Settings", icon: <Settings /> },
    { text: "Logout", icon: <Logout /> },
  ]

  const drawer = (
    <>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ width: 48, height: 48, mr: 2 }}>A</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Nguyen Van An
            </Typography>
            <Typography variant="body2">
              Premium Account
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              sx={{
                borderRadius: "12px",
                "&.Mui-selected": {
                  bgcolor: "lightblue",
                  "&:hover": {
                    bgcolor: "",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                    color: "primary.main",
                  },
                },
              }}
              selected={index === 0}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton sx={{ borderRadius: "12px" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRadius: "0 16px 16px 0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRadius: "0 16px 16px 0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "none",
              // Đẩy Drawer xuống dưới header
              // top: "70px", 
              // bottom: "-170px"
              // height: "calc(100% - 180px)",
              // marginTop: 31,
              // marginBottom: 100,
              // marginLeft: 25
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  )
}