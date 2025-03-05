import { CardContent, Typography, Grid } from "@mui/material"
import { Send, QrCode, Payment, History } from "@mui/icons-material"
import { DashboardCard, QuickActionButton } from "../styled-components"

export default function QuickActions() {
  return (
    <DashboardCard>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <QuickActionButton variant="contained" color="primary" fullWidth startIcon={<Send />} sx={{ mb: 2 }}>
              Send Money
            </QuickActionButton>
          </Grid>
          <Grid item xs={6}>
            <QuickActionButton variant="outlined" fullWidth startIcon={<QrCode />} sx={{ mb: 2 }}>
              Scan QR
            </QuickActionButton>
          </Grid>
          <Grid item xs={6}>
            <QuickActionButton variant="outlined" fullWidth startIcon={<Payment />}>
              Pay Bills
            </QuickActionButton>
          </Grid>
          <Grid item xs={6}>
            <QuickActionButton variant="outlined" fullWidth startIcon={<History />}>
              History
            </QuickActionButton>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  )
}

