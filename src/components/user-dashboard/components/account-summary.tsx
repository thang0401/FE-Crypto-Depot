import { Box, Typography, Chip, IconButton } from "@mui/material"
import { TrendingUp, Send, CreditCard, MoreVert, AccountBalanceWallet } from "@mui/icons-material"
import { AccountCard, CryptoCard } from "../styled-components"

export default function AccountSummary() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      <AccountCard>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            Main Account
          </Typography>
          <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" , color: "white"}}>
            12,580,000 VND
          </Typography>
          <Chip
            icon={<TrendingUp sx={{ color: "white !important" }} />}
            label="+2.5% this month"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold",
              mb: 1,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            **** **** **** 4582
          </Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton size="small" sx={{ color: "white" }}>
              <Send fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "white" }}>
              <CreditCard fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "white" }}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </AccountCard>

      <CryptoCard>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            USDC Balance
          </Typography>
          <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" , color : "white"}}>
            500.00 USDC
          </Typography>
          <Chip
            icon={<TrendingUp sx={{ color: "white !important" }} />}
            label="+5.2% this month"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold",
              mb: 1,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Wallet: 0x8f...3e4a
          </Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton size="small" sx={{ color: "white" }}>
              <Send fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "white" }}>
              <AccountBalanceWallet fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "white" }}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CryptoCard>
    </Box>
  )
}

