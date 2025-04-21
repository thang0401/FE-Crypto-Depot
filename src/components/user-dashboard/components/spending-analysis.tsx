"use client"

import type React from "react"

import { useState } from "react"
import { Box, Typography, CardContent, Tabs, Tab } from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DashboardCard } from "../styled-components"

// Mock data
const spendingData = [
  { name: "Th1", amount: 1200 },
  { name: "Th2", amount: 900 },
  { name: "Th3", amount: 1500 },
  { name: "Th4", amount: 1000 },
  { name: "Th5", amount: 1800 },
  { name: "Th6", amount: 1300 },
]

const categoryData = [
  { name: "Ăn uống", value: 35 },
  { name: "Di chuyển", value: 20 },
  { name: "Mua sắm", value: 25 },
  { name: "Hóa đơn", value: 15 },
  { name: "Khác", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function SpendingAnalysis() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <DashboardCard>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Phân tích chi tiêu
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 2 }}>
          <Tab label="Hàng tháng" />
          <Tab label="Danh mục" />
        </Tabs>
        {tabValue === 0 ? (
          <Box sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip formatter={(value) => [`${value} USDC`, "Số tiền"]} />
                <Bar dataKey="amount" fill="#2196f3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box sx={{ height: 250, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </DashboardCard>
  )
}