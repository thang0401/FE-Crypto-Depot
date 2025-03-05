import { Box, Typography, CardContent, Grid, Button } from "@mui/material"
import { AccountBalance, CreditCard, School } from "@mui/icons-material"
import { DashboardCard, GoalCard } from "../styled-components"

// Financial goals data
const goals = [
  {
    title: "Home Purchase",
    saved: 650,
    goal: 1000,
    progress: 65,
    icon: <AccountBalance sx={{ fontSize: 100 }} />,
    color: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
  },
  {
    title: "Vacation Fund",
    saved: 200,
    goal: 500,
    progress: 40,
    icon: <CreditCard sx={{ fontSize: 100 }} />,
    color: "linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)",
  },
  {
    title: "Education Fund",
    saved: 300,
    goal: 1200,
    progress: 25,
    icon: <School sx={{ fontSize: 100 }} />,
    color: "linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)",
  },
]

export default function FinancialGoals() {
  return (
    <DashboardCard>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Financial Goals
          </Typography>
          <Button color="primary">+ Add New Goal</Button>
        </Box>
        <Grid container spacing={3}>
          {goals.map((goal, index) => (
            <Grid item xs={12} md={4} key={index}>
              <GoalCard color={goal.color}>
                <Box sx={{ position: "absolute", top: -20, right: -20, opacity: 0.2 }}>{goal.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {goal.title}
                </Typography>
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                    Progress: {goal.progress}%
                  </Typography>
                  <Box sx={{ width: "100%", bgcolor: "rgba(255,255,255,0.2)", borderRadius: 5, height: 10 }}>
                    <Box
                      sx={{
                        width: `${goal.progress}%`,
                        bgcolor: "white",
                        borderRadius: 5,
                        height: 10,
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2">Saved: {goal.saved} USDC</Typography>
                  <Typography variant="body2">Goal: {goal.goal} USDC</Typography>
                </Box>
              </GoalCard>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </DashboardCard>
  )
}

