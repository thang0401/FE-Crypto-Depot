import { Box, Typography, CardContent } from "@mui/material"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { DashboardCard } from "../styled-components"

// Asset distribution data
const assetDistributionData = [
  { name: "Debit Account", value: 250, color: "#2196f3" },
  { name: "Savings Account", value: 180, color: "#4caf50" },
  { name: "Loan Account", value: 70, color: "#f44336" },
]

export default function AssetDistribution() {
  return (
    <DashboardCard>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            USDC Asset Distribution
          </Typography>
        </Box>
        <Box sx={{ height: 300, display: "flex", flexDirection: "column" }}>
          <ResponsiveContainer width="100%" height="70%">
            <PieChart>
              <Pie
                data={assetDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {assetDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} USDC`, "Amount"]} labelFormatter={() => ""} />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", mt: 2 }}>
            {assetDistributionData.map((entry, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mx: 2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "4px",
                    bgcolor: entry.color,
                    mr: 1,
                  }}
                />
                <Typography variant="body2">
                  {entry.name}: {Math.round((entry.value / 500) * 100)}% ({entry.value} USDC)
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </DashboardCard>
  )
}

