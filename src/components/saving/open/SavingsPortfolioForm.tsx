"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, CircleCheckBig } from "lucide-react"
import { Box, Container, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Step1 } from "./stepsForm/step1"
import { Step2 } from "./stepsForm/step2"
import { Step3 } from "./stepsForm/step3"
import { StyledButton } from "./styled-components"
import { useRouter } from "next/navigation";

// Sample data moved to constants
const ACCOUNTS = [
    { id: "1", label: "Main wallet - 123456789", balance: "100 USDC" },
    // { id: "2", label: "Sub Account - 987654321", balance: "50 USDC" },
]

const TERMS = [
    { value: "1M", label: "1 Month", interest: "3.8%" },
    { value: "3M", label: "3 Months", interest: "4.0%" },
    { value: "6M", label: "6 Months", interest: "4.5%" },
    { value: "12M", label: "12 Months", interest: "5.0%" },
]

const SavingsPortfolioForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = React.useState(1)
    const [showValidation, setShowValidation] = React.useState(false)
    const [isStep1Valid, setIsStep1Valid] = React.useState(false)
    const [isStep2Valid, setIsStep2Valid] = React.useState(false)
    const [isStep3Valid, setIsStep3Valid] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false);
    const [formData, setFormData] = React.useState({
        sourceAccount: "",
        balance: "",
        amount: "",
        term: "",
        method: "",
        interestPayment: "",
        agreeToTerms: false,
        verificationMethod: "",
        otp: "",
    })

    const handleFieldChange = React.useCallback((field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

    const validateStep2 = React.useCallback(() => {
        return !!formData.verificationMethod;
    }, [formData.verificationMethod]);

    const validateStep3 = React.useCallback(() => {
        return !!formData.otp;
    }, [formData.otp]);

    const handleNext = React.useCallback(() => {
        if (currentStep === 1 && !isStep1Valid) {
            setShowValidation(true)
            return
        }
        if (currentStep === 2 && !validateStep2()) {
            setIsStep2Valid(false);
            setShowValidation(true);
            return;
        }
        setCurrentStep((prev) => prev + 1)
        setShowValidation(false)
    }, [currentStep, isStep1Valid, validateStep2])

    const handleBack = React.useCallback(() => {
        setCurrentStep((prev) => prev - 1)
        setShowValidation(false)
    }, [])
    const generateMockData = () => {
        const today = new Date();
        const termValue = formData.term; // Ví dụ: "1M", "3M", "6M", "12M"
        const termMonths = parseInt(termValue.replace("M", "")); // Lấy số tháng từ term
        const endDate = new Date(today);
        endDate.setMonth(today.getMonth() + termMonths); // Tính ngày kết thúc

        return {
            id: `SAV${String(Math.floor(3 + Math.random() * 997)).padStart(3, '0')}`, // Tạo ID ngẫu nhiên
            status: "active",
            heirStatus: "no_heir",
            owner: {
                id: "USRER001",
                name: "Nguyen Van Thuan",
                email: "thuannv.it@gmail.com",
                phone: "+8434567890",
            },
            term: TERMS.find((t) => t.value === termValue)?.label || "", // Chuyển từ "1M" sang "1 Month"
            startDate: today.toISOString().split("T")[0], // Ngày hiện tại
            endDate: endDate.toISOString().split("T")[0], // Ngày kết thúc
            balance: formData.amount, // Số tiền người dùng nhập
            supportStaff: "Staff01",
            contractUrl: null,
            googleDriveUrl: null,
        };
    };
    const handleSubmit = React.useCallback(() => {
        if (currentStep === 1 && !isStep1Valid) {
            setShowValidation(true);
            return;
        }
        if (currentStep === 2 && !validateStep2()) {
            setShowValidation(true);
            return;
        }
        if (currentStep === 3 && !validateStep3()) {
            setShowValidation(true);
            return;
        }
        if (currentStep === 3) {
            const mockData = generateMockData();
            // Lưu mockData vào localStorage để SavingsManagement có thể truy cập
            const existingData = JSON.parse(localStorage.getItem("savingsAccounts") || "[]");
            localStorage.setItem("savingsAccounts", JSON.stringify([...existingData, mockData]));

            setOpenDialog(true);
            setTimeout(() => {
                setOpenDialog(false);
                router.push("/saving/my-portfolios");
            }, 5000);
        } else {
            handleNext();
        }
    }, [currentStep, handleNext, isStep1Valid, validateStep2, validateStep3, router, formData]);

    const renderStep = React.useCallback(() => {
        const props = {
            formData,
            accounts: ACCOUNTS,
            terms: TERMS,
            onFieldChange: handleFieldChange,
        }

        switch (currentStep) {
            case 1:
                return (
                    <Step1
                        {...props}
                        showValidation={showValidation}
                        onValidationChange={setIsStep1Valid}
                    />
                )
            case 2:
                return <Step2 {...props} showValidation={showValidation} onValidationChange={setIsStep2Valid} />
            case 3:
                return <Step3 {...props} showValidation={showValidation} onValidationChange={setIsStep3Valid} />
            default:
                return null
        }
    }, [currentStep, formData, handleFieldChange, showValidation])

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 6,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: "20px",
                        mb: 4,
                    }}
                >
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
                                            sx={{
                                                width: "100px",
                                                height: 2,
                                                transition: "0.3s",
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
                            <Typography>Information</Typography>
                            <Typography>Confirmation</Typography>
                            <Typography>Verification</Typography>
                        </Box>
                    </Box>

                    {renderStep()}

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <StyledButton
                            variant="outlined"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            startIcon={<ArrowLeft />}
                            sx={{
                                borderColor: "inherit",
                                "&:hover": {
                                    borderColor: "inherit",
                                },
                            }}
                        >
                            Back
                        </StyledButton>

                        <StyledButton
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={currentStep !== 3 && <ArrowRight />}
                            sx={{
                                "&:hover": {
                                    bgcolor: "inherit",
                                },
                                boxShadow: "none",
                            }}
                        >
                            {currentStep === 3 ? "Complete" : "Continue"}
                        </StyledButton>
                    </Box>
                </Paper>
            </Container>
            {/* Success dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{
                    sx: {
                        borderRadius: "16px",
                        padding: "24px",
                        maxWidth: "360px",
                        textAlign: "center",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircleCheckBig size={56} />
                </Box>

                <DialogTitle sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    Success!
                </DialogTitle>

                <DialogContent sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: "15px" }}>
                        Your portfolio creation is complete!
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
                    <Button
                        onClick={() => router.push("/")}
                        variant="contained"
                    >
                        Go to Homepage
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SavingsPortfolioForm