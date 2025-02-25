import { CardContent, Typography } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { StyledCard } from "./styled-components"


export default function EmptyState() {
  return (
    <StyledCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          py: 6,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 80, color: "action.disabled", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" align="center">
          Search for a Recipient
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Enter a phone number or select from your recent transactions
        </Typography>
      </CardContent>
    </StyledCard>
  )
}

