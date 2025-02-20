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
    { id: "1", label: "Tài khoản chính - 123456789", balance: "100 USDC" },
    { id: "2", label: "Tài khoản phụ - 987654321", balance: "50 USDC" },
]

const TERMS = [
    { value: "1M", label: "1 tháng", interest: "3.8%" },
    { value: "3M", label: "3 tháng", interest: "4.0%" },
    { value: "6M", label: "6 tháng", interest: "4.5%" },
    { value: "12M", label: "12 tháng", interest: "5.0%" },
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
            // Redirect to HomePage
            setOpenDialog(true); // 
            setTimeout(() => {
                setOpenDialog(false);
                router.push("/");
            }, 5000);
        } else {
            handleNext();
        }
    }, [currentStep, formData, handleNext, isStep1Valid, validateStep2, validateStep3]);


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
                bgcolor: "#f0f4f8",
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
                        background: "linear-gradient(135deg, #f6f0fd 0%, #e2ecfe 100%)",
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
                                            backgroundColor: currentStep === step ? "#3f51b5" : currentStep > step ? "#4caf50" : "#e0e0e0",
                                        }}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white",
                                            transition: "0.3s",
                                        }}
                                    >
                                        {currentStep > step ? <Check /> : step}
                                    </Box>
                                    {step < 3 && (
                                        <Box
                                            component={motion.div}
                                            animate={{
                                                backgroundColor: currentStep > step ? "#4caf50" : "#e0e0e0",
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
                            <Typography sx={{ color: "text.secondary" }}>Thông tin</Typography>
                            <Typography sx={{ color: "text.secondary" }}>Xác nhận</Typography>
                            <Typography sx={{ color: "text.secondary" }}>Xác thực</Typography>
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
                                borderColor: "#3f51b5",
                                color: "#3f51b5",
                                "&:hover": {
                                    borderColor: "#283593",
                                    color: "#283593",
                                },
                            }}
                        >
                            Quay lại
                        </StyledButton>

                        <StyledButton
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={currentStep !== 3 && <ArrowRight />}
                            sx={{
                                bgcolor: "#3f51b5",
                                "&:hover": {
                                    bgcolor: "#283593",
                                },
                                boxShadow: "0 4px 14px 0 rgba(63,81,181,0.39)",
                            }}
                        >
                            {currentStep === 3 ? "Hoàn thành" : "Tiếp tục"}
                        </StyledButton>
                    </Box>
                </Paper>
            </Container>
            {/* Sucessfully dialog */}
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

                {/* Success Icon */}
                <Box sx={{ display: "flex", justifyContent: "center"}}>
                    <CircleCheckBig size={56} color="#4CAF50" />
                </Box>

                {/* Tiêu đề */}
                <DialogTitle sx={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>
                    Thành công!
                </DialogTitle>

                {/* Nội dung */}
                <DialogContent sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: "15px", color: "#616161" }}>
                        Tạo danh mục của bạn đã hoàn tất!
                    </Typography>
                </DialogContent>

                {/* Nút hành động */}
                <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
                    <Button
                        onClick={() => router.push("/")}
                        variant="contained"
                        sx={{
                            bgcolor: "#3f51b5",
                            color: "#FFF",
                            borderRadius: "8px",
                            width: "100%",
                            padding: "10px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            "&:hover": {
                                bgcolor: "#283593",
                            },
                        }}
                    >
                        Về trang chủ
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SavingsPortfolioForm