import { Box, Typography, IconButton, Badge, Avatar } from "@mui/material"
import { Notifications, Settings } from "@mui/icons-material"

export default function DashboardHeader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Banking Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back, Nguyen Van An
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton sx={{ ml: 1 }}>
          <Settings />
        </IconButton>
        <Avatar sx={{ ml: 2, bgcolor: "primary.main" }}>A</Avatar>
      </Box>
    </Box>
  )
}

