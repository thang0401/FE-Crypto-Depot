import { Box, Typography, Chip, IconButton } from "@mui/material"
import { TrendingUp, Send, CreditCard, MoreVert, AccountBalanceWallet } from "@mui/icons-material"
import { AccountCard, CryptoCard } from "../styled-components"
import { useEffect, useState } from "react"
import axios from "axios"

export default function AccountSummary() {
  const [balance, setBalance] = useState<number>(0)

    useEffect(() => {
      const fetchUserData = async () =>{
        try{
          const userDataString = localStorage.getItem('userData')
          if(userDataString){
            const localData= JSON.parse(userDataString)
            const userId = localData.id;
  
           
            const balanceResponse = await axios.get(`https://be-crypto-depot.name.vn/api/TransactionHistory/GetUserDebitAmount/${userId}`)
            if (balanceResponse.data) {
              setBalance(balanceResponse.data.balance)
              // setFrozenBalance(balanceResponse.data.frozenBalance)
            }
          }
        } catch (error){
          console.log('Error fetching user data:', error)
        }
      }
      fetchUserData()
    },[])
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* <AccountCard> */}
        {/* <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            Tài khoản chính
          </Typography>
          <Typography variant="h4" sx={{ my: 1, fontWeight: "bold", color: "white" }}>
            12,580,000 VND
          </Typography>
          <Chip
            icon={<TrendingUp sx={{ color: "white !important" }} />}
            label="+2.5% trong tháng này"
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
      </AccountCard> */}

      <CryptoCard>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.8, color: "white" , mb: 5}}>
            Số dư USDC:
          </Typography>
          <Typography variant="h4" sx={{  fontWeight: "bold", color: "white" }}>
            {balance} USDC
          </Typography>
          {/* <Chip
            icon={<TrendingUp sx={{ color: "white !important" }} />}
            label="+5.2% trong tháng này"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold",
              mb: 1,
            }}
          /> */}
        </Box>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Ví: 0x8f...3e4a
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
        </Box> */}
      </CryptoCard>
    </Box>
  )
}