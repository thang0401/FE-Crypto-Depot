"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, CircleCheckBig } from "lucide-react"
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  SelectChangeEvent,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/navigation"
// import { usePrivy, useSendTransaction } from '@privy-io/react-auth';
import Web3 from "web3"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

// Styled components
const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  transition: "0.3s",
  "&:hover": { transform: "translateY(-4px)" },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: "bold",
}))

// Hằng số hợp đồng
const USDC_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
const CONTRACT_ADDRESS = "0xfe5f7152f9ddb10319e032086a236d5f2a76ed12"





// Interface cho props của Step1
interface Step1Props {
  formData: {
    sourceAccount: string | undefined;
    amount: string;
    term: string | undefined;
    interestPayment: string;
    agreeToTerms: boolean;
  };
  account: Account | undefined;
  terms: Array<Term>;
  onFieldChange: (field: string, value: string | boolean) => void;
  showValidation?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  hideBalance?: boolean;
  toggleHideBalance?: () => void;
}

// Step 1 Component
const Step1 = React.memo(
  ({
    formData,
    account,
    terms,
    onFieldChange,
    showValidation = false,
    onValidationChange,
    hideBalance,
    toggleHideBalance,
  }: Step1Props) => {
    const errors = React.useMemo(
      () => ({
        sourceAccount: !formData.sourceAccount && showValidation,
        amount: !formData.amount && showValidation,
        term: !formData.term && showValidation,
        interestPayment: !formData.interestPayment && showValidation,
        agreeToTerms: !formData.agreeToTerms && showValidation,
      }),
      [formData, showValidation]
    )
    console.log()
    const selectedAccount = formData.sourceAccount
    const accountBalance = account?.balance
    // selectedAccount ? parseFloat(selectedAccount.balance.split(" ")[0]) : 0
    const depositAmount = parseFloat(formData.amount.replace(/,/g, "")) || 0

    const isFormValid = React.useMemo(
      () =>
        !Object.values(errors).some(Boolean) &&
        formData.sourceAccount &&
        formData.amount &&
        formData.term &&
        formData.interestPayment &&
        formData.agreeToTerms &&
        accountBalance!= null&&
        depositAmount <= accountBalance,
      [errors, formData, depositAmount, accountBalance]
    )

    React.useEffect(() => {
      onValidationChange?.(Boolean(isFormValid))
    }, [isFormValid, onValidationChange])
    const handleTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/[^0-9,.]/g, "")
      const parts = value.split(".")
      if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("")
      value = value.replace(/(?<=\.\d*),/g, "")
      onFieldChange(field, value)
    }

    const handleBlur = (field: string) => (event: React.FocusEvent<HTMLInputElement>) => {
      let value = event.target.value
      const numericValue = parseFloat(value.replace(/,/g, ""))
      if (!isNaN(numericValue))
        value = numericValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
      else value = ""
      onFieldChange(field, value)
    }

    const handleSelectChange = (field: string) => (event: SelectChangeEvent<string>) =>
      onFieldChange(field, event.target.value)
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      onFieldChange("agreeToTerms", event.target.checked)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {showValidation && !isFormValid && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Vui lòng điền đầy đủ tất cả thông tin bắt buộc
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                Ví nguồn
              </Typography>
              <FormControl fullWidth error={errors.sourceAccount} sx={{ px: 2, pb: 2 }}>
                <InputLabel>Chọn tài khoản</InputLabel>
                <Select
                  value={formData.sourceAccount}
                  onChange={handleSelectChange("sourceAccount")}
                  label="Chọn tài khoản"
                >
                  
                  {account != null && (
                      <MenuItem key={account.id} value={account.id}>
                        {account.id}
                      </MenuItem>
                  )}
                  
                </Select>
                {errors.sourceAccount && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                    Vui lòng chọn một tài khoản
                  </Typography>
                )}
              </FormControl>
              <Box
                sx={{
                  px: 2,
                  pb: 2,
                  borderRadius: 1,
                  mx: 2,
                  mb: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  Số dư:{" "}
                  <Typography component="span" sx={{ fontWeight: 700, fontSize: "14px" }}>
                    {account?.balance || "0 USDC"}
                  </Typography>
                </Typography>
                <IconButton onClick={toggleHideBalance} sx={{ ml: 1 }}>
                  {hideBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
                Thông tin
              </Typography>
              <Grid container spacing={3} sx={{ px: 2, pb: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số tiền"
                    value={formData.amount}
                    onChange={handleTextChange("amount")}
                    onBlur={handleBlur("amount")}
                    error={errors.amount}
                    helperText={errors.amount ? "Vui lòng nhập số tiền" : ""}
                  />
                  {accountBalance!=null && depositAmount > accountBalance && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      Số tiền gửi vượt quá số dư tài khoản.
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={errors.term}>
                    <InputLabel>Kỳ hạn</InputLabel>
                    <Select value={formData.term} onChange={handleSelectChange("term")} label="Kỳ hạn">
                      {terms.map((term) => (
                        <MenuItem key={term.id} value={term.id}>
                          {term.amountMonth}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.term && (
                      <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                        Vui lòng chọn kỳ hạn.
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography>
                      Lãi suất: {terms.find((t) => t.id === formData.term)?.interestRate+"%" || "0%"}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={errors.interestPayment}>
                    <InputLabel>Phương thức trả lãi</InputLabel>
                    <Select
                      value={formData.interestPayment}
                      onChange={handleSelectChange("interestPayment")}
                      label="Phương thức trả lãi"
                    >
                      <MenuItem value="end">Cuối kỳ</MenuItem>
                      <MenuItem value="principal">Tái đầu tư gốc</MenuItem>
                    </Select>
                    {errors.interestPayment && (
                      <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                        Vui lòng chọn phương thức trả lãi.
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.agreeToTerms} onChange={handleCheckboxChange} />}
              label="Tôi đồng ý với các điều khoản và điều kiện."
            />
            {errors.agreeToTerms && (
              <Typography color="error" variant="caption" display="block">
                Vui lòng đồng ý với các điều khoản và điều kiện.
              </Typography>
            )}
          </Grid>
        </Grid>
      </motion.div>
    )
  }
)

// Interface cho props của Step2
interface Step2Props {
  formData: { sourceAccount: string| undefined; amount: string; term: string|undefined; interestPayment: string; verificationMethod: string }
  account: Account | undefined
  terms: Array<Term>
  onFieldChange: (field: string, value: string) => void
  showValidation?: boolean
  onValidationChange?: (isValid: boolean) => void
}

// Step 2 Component
const Step2 = React.memo(({ formData, account, terms }: Step2Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
              Xác nhận thông tin
            </Typography>
            <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
              {[
                {
                  label: "Tài khoản nguồn",
                  value: formData.sourceAccount,
                },
                { label: "Số tiền gửi", value: `${formData.amount} USDC` },
                { label: "Kỳ hạn", value:terms.find((t)=>t.id===formData.term)?.amountMonth+ " Month" },
                { label: "Lãi suất", value: terms.find((t)=>t.id===formData.term)?.interestRate+" %"},
                {
                  label: "Phương thức trả lãi",
                  value: formData.interestPayment === "end" ? "Cuối kỳ" : "Hàng tháng",
                },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: "medium" }}>{item.label}:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{item.value}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </StyledCard>
        </Grid>
      </Grid>
    </motion.div>
  )
})

// Interface cho props của Step3
interface Step3Props {
  formData: { sourceAccount: string|undefined; amount: string; term: string|undefined; verificationMethod: string; otp: string }
  account: Account | undefined
  terms: Array<Term>
  onFieldChange: (field: string, value: string) => void
  showValidation?: boolean
  onValidationChange?: (isValid: boolean) => void
}

// Step 3 Component
const Step3 = React.memo(({ formData, account, terms }: Step3Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
              Xác minh giao dịch
            </Typography>
            <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
              <Grid item xs={12}>
                <Typography>Xác minh bằng dấu vân tay của bạn ở bước tiếp theo.</Typography>
              </Grid>
            </Grid>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", p: 2 }}>
              Thông tin giao dịch
            </Typography>
            <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
              {[
                {
                  label: "Tài khoản nguồn",
                  value: formData.sourceAccount,
                },
                {
                  label: "Số tiền gửi",
                  value: `${formData.amount} USDC`,
                  style: { fontWeight: "bold", color: "red", fontSize: 14 },
                },
                { label: "Kỳ hạn", value: terms.find((t)=>t.id===formData.term)?.amountMonth },
                { label: "Lãi suất", value: terms.find((t)=>t.id===formData.term)?.interestRate+"%" },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: "medium" }}>{item.label}:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={item.style}>{item.value}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </StyledCard>
        </Grid>
      </Grid>
    </motion.div>
  )
})

interface Term{
  amountMonth: string,
  id: string,
  interestRate: string,
  type: string
}

interface Account{
  id: string,
  balance: number
}

interface SubmitResponse{
  
}

// Main Component
const SavingsPortfolioForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showValidation, setShowValidation] = useState(false)
  const [isStep1Valid, setIsStep1Valid] = useState(false)
  const [isStep2Valid] = useState(true)
  const [isStep3Valid] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [usdcBalance, setUsdcBalance] = useState("0")
  const [ethBalance, setEthBalance] = useState("0")
  const [hideBalance, setHideBalance] = useState(false)
  

    const [account, setAccount] = React.useState<Account>()
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [terms, setTerms] = React.useState<Array<Term>>([])
    const [selectedTerm, setSelectedTerm] = React.useState<Term>()
    const [userId,setUserId]=useState<string|null>(null);
    const [formData, setFormData] = useState({
      sourceAccount: '',
      balance: "",
      amount: "",
      term: '',
      method: "",
      interestPayment: "",
      agreeToTerms: false,
      verificationMethod: "passkey",
      otp: "",
    })
    // Fetch dữ liệu tài khoản từ server khi component mount
    useEffect(() => {
      
      const fetchAccounts = async (id: string) => {
        try {
          console.log(id)
          const response = await fetch(
            `https://be-crypto-depot.name.vn/user/saving/add-saving-asset?userId=${id}`
          );
          if (!response.ok) throw new Error('Failed to fetch accounts');
          const data = await response.json();
          // Ánh xạ walletAddress thành Account
          
          const fetchedAccount = data.walletAdress
            ? {
                id: data.walletAdress.id,
                balance: typeof data.walletAdress.balance === 'string'
                  ? parseFloat(data.walletAdress.balance)
                  : data.walletAdress.balance,
              }
            : undefined;
            console.log(fetchedAccount)
          const fetchedTerms = data.terms || [];
          setAccount(fetchedAccount);
          setTerms(fetchedTerms);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
      try {
        const decoded = jwtDecode<{ id: string }>(accessToken);
        setUserId(decoded.id);
        fetchAccounts(decoded.id);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
      }
    }, []);
    
  // const { ready, authenticated, user, login } = usePrivy();
  // const { sendTransaction } = useSendTransaction();

  // useEffect(() => {
  //   if (ready && authenticated && user?.wallet) { // Sử dụng optional chaining cho user.wallet
  //     const wallet = user.wallet;
  //     setWalletAddress(wallet.address);
  //     setFormData(prev => ({ ...prev, sourceAccount: wallet.address }));
  //     fetchWalletBalances(wallet.address);
  //   } else if (ready && !authenticated) {
  //     router.push('/login');
  //   }
  // }, [ready, authenticated, user, router]);

  // const fetchWalletBalances = async (address: string) => {
  //   try {
  //     const web3 = new Web3("https://sepolia-rollup.arbitrum.io/rpc")
  //     const usdcContract = new web3.eth.Contract(USDC_ABI, USDC_ADDRESS)
  //     const ethWei = await web3.eth.getBalance(address)
  //     const usdcWei = await usdcContract.methods.balanceOf(address).call() as string // Ép kiểu thành string
  //     setEthBalance(web3.utils.fromWei(ethWei, "ether"))
  //     setUsdcBalance(web3.utils.fromWei(usdcWei, "mwei"))
  //     setFormData((prev) => ({ ...prev, balance: web3.utils.fromWei(usdcWei, "mwei") }))
  //   } catch (error) {
  //     console.error("Không thể lấy số dư:", error)
  //     setUsdcBalance("0")
  //     setEthBalance("0")
  //   }
  // }

  const handleFieldChange = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid) {
      setShowValidation(true)
      return
    }
    setCurrentStep((prev) => prev + 1)
    setShowValidation(false)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    setShowValidation(false)
  }

  const handleSubmit = async ()=>{
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      setShowValidation(true);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('https://be-crypto-depot.name.vn/user/saving/add-saving-asset?userId=d00u7ak5ig8jm25nu6mg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount:formData.amount,
          termId:formData.term,
          OTP:123456
        }),
      });

      setOpenDialog(true);
      setTimeout(() => {
        setOpenDialog(false);
        router.push('/saving/my-portfolios');
      }, 5000);
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };


  // const handleSubmit = async () => {
  //   if (currentStep === 1 && !isStep1Valid) {
  //     setShowValidation(true);
  //     return;
  //   }
  //
  //   if (currentStep === 3) {
  //     try {
  //       const web3 = new Web3('https://sepolia-rollup.arbitrum.io/rpc');
  //       const usdcContract = new web3.eth.Contract(USDC_ABI, USDC_ADDRESS);
  //       const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  //
  //       const usdcAmount = web3.utils.toWei(formData.amount.replace(/,/g, ''), 'mwei');
  //       const termId = formData.term.replace('M', ' Months');
  //       const interestRate = TERMS.find(t => t.value === formData.term)?.interest;
  //       const interestValue = Math.round(parseFloat(interestRate!.replace('%', '')) * 100);
  //       const savingAccount = `SAV${Date.now()}`;
  //
  //       const allowance = await usdcContract.methods.allowance(walletAddress, CONTRACT_ADDRESS).call();
  //       if (Web3.utils.toBigInt(allowance) < BigInt(usdcAmount)) {
  //         const approveData = usdcContract.methods.approve(CONTRACT_ADDRESS, usdcAmount).encodeABI();
  //         const approveTx = { to: USDC_ADDRESS, chainId: 421614, data: approveData };
  //         await sendTransaction(approveTx, { uiOptions: { description: `Approve ${formData.amount} USDC`, buttonText: 'Approve' } });
  //       }
  //
  //       const depositData = contract.methods.deposit(usdcAmount, savingAccount, termId, interestValue).encodeABI();
  //       const depositTx = { to: CONTRACT_ADDRESS, chainId: 421614, data: depositData };
  //       const { hash } = await sendTransaction(depositTx, { uiOptions: { description: `Deposit ${formData.amount} USDC`, buttonText: 'Confirm' } });
  //
  //       console.log('Deposit hash:', hash);
  //       setOpenDialog(true);
  //       setTimeout(() => {
  //         setOpenDialog(false);
  //         router.push('/saving/my-portfolios');
  //       }, 5000);
  //     } catch (error: any) {
  //       console.error('Giao dịch thất bại:', error);
  //       alert('Giao dịch thất bại: ' + error.message);
  //     }
  //   } else {
  //     handleNext();
  //   }
  // };

  const renderStep = () => {
    const props = {
      formData,
      account,
      terms,
      onFieldChange: handleFieldChange,
      showValidation,
      hideBalance,
      toggleHideBalance: () => setHideBalance((prev) => !prev),
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    switch (currentStep) {
      case 1:
        return <Step1 {...props} onValidationChange={setIsStep1Valid} />
      case 2:
        return <Step2 {...props} />
      case 3:
        return <Step3 {...props} />
      default:
        return null
    }
  }

  // if (!ready) return <div>Đang tải...</div>;

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 4, borderRadius: "20px", mb: 4 }}>
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              {[1, 2, 3].map((step) => (
                <Box key={step} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component={motion.div}
                    animate={{
                      border: currentStep === step ? "2px solid" : currentStep > step ? "2px solid" : "1px solid",
                      opacity: currentStep === step ? 1 : currentStep > step ? 1 : 0.5,
                    }}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.3s",
                    }}
                  >
                    {currentStep > step ? <Check /> : step}
                  </Box>
                  {step < 3 && (
                    <Box
                      component={motion.div}
                      animate={{
                        borderBottom: currentStep > step ? "2px solid" : "1px solid",
                        opacity: currentStep > step ? 1 : 0.5,
                      }}
                      sx={{ width: "100px", height: 2, transition: "0.3s" }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
              <Typography>Thông tin</Typography>
              <Typography>Xác nhận</Typography>
              <Typography>Xác minh</Typography>
            </Box>
          </Box>
          {renderStep()}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <StyledButton
              variant="outlined"
              onClick={handleBack}
              disabled={currentStep === 1}
              startIcon={<ArrowLeft />}
              sx={{ borderColor: "inherit", "&:hover": { borderColor: "inherit" } }}
            >
              Quay lại
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={currentStep===3?handleSubmit:handleNext}
              endIcon={currentStep !== 3 && <ArrowRight />}
              sx={{ "&:hover": { bgcolor: "inherit" }, boxShadow: "none" }}
            >
              {currentStep === 3 ? "Hoàn tất" : "Tiếp tục"}
            </StyledButton>
          </Box>
        </Paper>
      </Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{ sx: { borderRadius: "16px", padding: "24px", maxWidth: "360px", textAlign: "center" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircleCheckBig size={56} />
        </Box>
        <DialogTitle sx={{ fontSize: "20px", fontWeight: "bold" }}>Thành công!</DialogTitle>
        <DialogContent sx={{ px: 2 }}>
          <Typography sx={{ fontSize: "15px" }}>Việc tạo Tài khoản đầu tư của bạn đã hoàn tất!</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button onClick={() => router.push("/saving/my-portfolios")} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SavingsPortfolioForm
