"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Grid,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material"
import { CheckCircle, ArrowLeft, Clock, AlertCircle } from "lucide-react"

const RequestSubmitted = () => {
  const theme = useTheme()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)

  // Simulate loading request details
  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [id])

  if (!id) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>Request Submitted | Support</title>
        <meta name="description" content="Your support request has been submitted successfully" />
      </Head>

      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={18} />}
            onClick={() => router.push("/support")}
            sx={{ mb: 4 }}
          >
            Back to Support
          </Button>

          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: theme.shadows[3] }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <CheckCircle color={theme.palette.success.main} size={40} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" fontWeight="bold">
                      Request Submitted Successfully
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Thank you for contacting our support team
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Request ID
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {id}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Submission Date
                    </Typography>
                    <Typography variant="body1">
                      {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip icon={<Clock size={16} />} label="Received" color="primary" variant="outlined" />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated Response Time
                    </Typography>
                    <Typography variant="body1">Within 24-48 hours</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, p: 3, bgcolor: "info.main", color: "info.contrastText", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <AlertCircle size={24} style={{ marginRight: 12, marginTop: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        What happens next?
                      </Typography>
                      <Typography variant="body2">
                        1. Our support team will review your request and assign it to the appropriate department.
                      </Typography>
                      <Typography variant="body2">
                        2. You'll receive an email confirmation with your request details.
                      </Typography>
                      <Typography variant="body2">
                        3. A support representative will contact you via your preferred contact method.
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        You can check the status of your request anytime by logging into your account.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" onClick={() => router.push("/support/my-requests")} sx={{ mr: 2 }}>
                    View My Requests
                  </Button>
                  <Button variant="outlined" onClick={() => router.push("/")}>
                    Return to Dashboard
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default RequestSubmitted
