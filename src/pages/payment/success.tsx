"use client"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
  Container,
  Card,
  CardContent,
  Fade,
  Backdrop,
  LinearProgress,
} from "@mui/material"
import PaymentIcon from "@mui/icons-material/Payment"
import ErrorIcon from "@mui/icons-material/Error"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

interface PayOSWebhookResponse {
  message: string
  status: "loading" | "success" | "error"
}

interface WebhookPayload {
  code: string
  desc: string
  data: {
    orderCode: number
    amount: number
    description: string
    accountNumber: string
    reference: string
    transactionDateTime: string
    currency: string
    paymentLinkId: string
    code: string
    desc: string
  }
  signature: string
}

const PayOSWebhookSimulator: React.FC = () => {
  const [response, setResponse] = useState<PayOSWebhookResponse>({
    message: "Đang gửi yêu cầu...",
    status: "loading",
  })
  const router = useRouter()
  const hasCalledWebhook = useRef(false)

  useEffect(() => {
    if (hasCalledWebhook.current) return

    const simulateWebhook = async () => {
      hasCalledWebhook.current = true

      let lastOrderCode: number
      let lastAmount: number
      let lastUserId: string

      try {
        const orderCode = localStorage.getItem("lastOrderCode")
        const amount = localStorage.getItem("lastAmount")
        const userId = localStorage.getItem("lastUserId")

        if (!orderCode || !amount || !userId) {
          throw new Error("Dữ liệu trong localStorage không đầy đủ")
        }

        lastOrderCode = Number.parseInt(orderCode)
        lastAmount = Number.parseInt(amount)
        lastUserId = userId

        if (isNaN(lastOrderCode) || isNaN(lastAmount)) {
          throw new Error("Dữ liệu orderCode hoặc amount không hợp lệ")
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? `Lỗi: ${error.message}` : "Lỗi không xác định khi lấy dữ liệu từ localStorage"
        setResponse({
          message: errorMessage,
          status: "error",
        })
        return
      }

      const payload: WebhookPayload = {
        code: "00",
        desc: "Success",
        data: {
          orderCode: lastOrderCode,
          amount: lastAmount,
          description: lastUserId,
          accountNumber: "1234567890",
          reference: "REF123456",
          transactionDateTime: new Date().toISOString(),
          currency: "VND",
          paymentLinkId: "PAYLINK123",
          code: "00", //Siccess là 00
          desc: "Payment successful",
        },
        signature: "abc123xyz",
      }

      try {
        const result = await axios.post("https://be-crypto-depot.name.vn/api/payment/webhook/payos", payload)

        setResponse({
          message: result.data,
          status: "success",
        })
        //Success set timeout ở đây
        setTimeout(() => {
            router.push("/buy-sell")
            localStorage.removeItem("lastOrderCode")
            localStorage.removeItem("lastAmount")
            localStorage.removeItem("lastUserId")
          }, 5000)

      } catch (error) {
        let errorMessage = "Đã xảy ra lỗi không xác định"

        if (axios.isAxiosError(error) && error.response) {
          errorMessage = `Lỗi: ${error.response.status} - ${error.response.data || error.message}`
        } else if (error instanceof Error) {
          errorMessage = `Lỗi: ${error.message}`
        }

        setResponse({
          message: errorMessage,
          status: "error",
        })

      }
    }

    simulateWebhook()
  }, [])

  const getStatusIcon = () => {
    switch (response.status) {
      case "loading":
        return <PaymentIcon sx={{ fontSize: 60, color: "#1976d2" }} />
      case "success":
        return <CheckCircleIcon sx={{ fontSize: 60, color: "#2e7d32" }} />
      case "error":
        return <ErrorIcon sx={{ fontSize: 60, color: "#d32f2f" }} />
      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {response.status === "loading" && (
              <LinearProgress
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                }}
              />
            )}
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>{getStatusIcon()}</Box>

              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                {response.status === "loading"
                  ? "Đang xử lý giao dịch..."
                  : response.status === "success"
                    ? "Giao dịch thành công"
                    : "Giao dịch bị hủy"}
              </Typography>

              {response.status === "loading" && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <CircularProgress size={36} />
                </Box>
              )}

              {/* {response.status === "error" && (
                <Alert severity="error" sx={{ mt: 2, textAlign: "left" }}>
                  <AlertTitle>Lỗi</AlertTitle>
                  {response.message}
                </Alert>
              )} */}

              {response.status === "success" && (
                <Alert severity="success" sx={{ mt: 2, textAlign: "left" }}>
                  <AlertTitle>Thành công</AlertTitle>
                  Giao dịch đã được xử lý thành công
                </Alert>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                {response.status === "loading"
                  ? "Vui lòng đợi trong khi chúng tôi xử lý giao dịch của bạn..."
                  : "Bạn sẽ được chuyển hướng trong vài giây..."}
              </Typography>
            </CardContent>
          </Card>
        </Fade>

        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={response.status === "loading"}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Box>
  )
}

export default PayOSWebhookSimulator