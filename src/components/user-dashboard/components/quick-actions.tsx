import { CardContent, Typography, Grid } from "@mui/material"
import { Send, QrCode, Payment, History } from "@mui/icons-material"
import { DashboardCard, QuickActionButton } from "../styled-components"

export default function QuickActions() {
  return (
    <DashboardCard>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Tiện ích
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <QuickActionButton variant="contained" color="primary" fullWidth startIcon={<Send />} sx={{ mb: 2 }}>
              Gửi tiền
            </QuickActionButton>
          </Grid>
          <Grid item xs={6}>
            <QuickActionButton variant="outlined" fullWidth startIcon={<QrCode />} sx={{ mb: 2 }}>
              Quét QR
            </QuickActionButton>
          </Grid>
          <Grid item xs={6}>
            <QuickActionButton variant="outlined" fullWidth startIcon={<Payment />}>
              Thanh toán hóa đơn
            </QuickActionButton>
          </Grid>
          <Grid item xs={6}>
            <QuickActionButton variant="outlined" fullWidth startIcon={<History />}>
              Lịch sử
            </QuickActionButton>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  )
}

