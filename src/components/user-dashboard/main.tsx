"use client"

import { Box, Grid } from "@mui/material"
import DashboardHeader from "./components/dashboard-header"
import AccountSummary from "./components/account-summary"
import QuickActions from "./components/quick-actions"
import AssetDistribution from "./components/asset-distribution"
import SpendingAnalysis from "./components/spending-analysis"
import CurrencyConverter from "./components/currency-converter"
import FinancialGoals from "./components/financial-goals"
const Main = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
    {/* Header */}
    <DashboardHeader />

    <Grid container spacing={3}>
      {/* Account Cards */}
      <Grid item xs={12} md={8}>
        <AccountSummary />
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <QuickActions />
      </Grid>

      {/* Asset Distribution Pie Chart */}
      <Grid item xs={12} md={6}>
        <AssetDistribution />
      </Grid>

      {/* Spending Analysis */}
      <Grid item xs={12} md={6}>
        <SpendingAnalysis />
      </Grid>

      {/* Exchange Rates & Currency Converter */}
      <Grid item xs={12}>
        <CurrencyConverter />
      </Grid>

      {/* Financial Goals */}
      <Grid item xs={12}>
        <FinancialGoals />
      </Grid>
    </Grid>
  </Box>
  )
}

export default Main