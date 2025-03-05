import { styled } from "@mui/material/styles"
import { Card, Button, Paper } from "@mui/material"

export const DashboardCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
}))

export const QuickActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  textTransform: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}))

export const AccountCard = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "150px",
    height: "150px",
    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
  },
}))

export const CryptoCard = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "150px",
    height: "150px",
    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
  },
}))

export const GoalCard = styled(Paper)(({ theme, color }: { theme?: any; color: string }) => ({
  borderRadius: "16px",
  padding: theme.spacing(3),
  background: color,
  color: "white",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}))

