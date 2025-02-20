import { styled } from "@mui/material"
import { Card, Button } from "@mui/material"

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: "bold",
}))

