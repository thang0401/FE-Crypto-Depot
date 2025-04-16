"use client"

import React from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material"
import { MessageSquare, Phone, Mail, FileText, HelpCircle, Clock, CheckCircle, AlertTriangle, Plus } from "lucide-react"

const SupportPage = () => {
  const theme = useTheme()
  const router = useRouter()

  // Mock recent requests
  const recentRequests = [
    {
      id: "SR123456",
      subject: "Billing issue with my last invoice",
      status: "open",
      date: "2023-04-10",
    },
    {
      id: "SR123455",
      subject: "Product not working as expected",
      status: "closed",
      date: "2023-03-28",
    },
    {
      id: "SR123454",
      subject: "Question about shipping options",
      status: "resolved",
      date: "2023-03-15",
    },
  ]

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock color={theme.palette.warning.main} />
      case "resolved":
        return <CheckCircle color={theme.palette.success.main} />
      case "closed":
        return <AlertTriangle color={theme.palette.text.secondary} />
      default:
        return <HelpCircle />
    }
  }

  return (
    <>
      <Head>
        <title>Customer Support</title>
        <meta name="description" content="Customer support and help center" />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Customer Support
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Get help with your orders, products, and account
          </Typography>

          <Grid container spacing={4}>
            {/* Left column - Support options */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 4, borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      How can we help you?
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Plus size={18} />}
                      onClick={() => router.push("/support/new-request")}
                    >
                      New Request
                    </Button>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    Choose an option below to get started with your support request
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=product")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "primary.main",
                              color: "primary.contrastText",
                              mr: 2,
                            }}
                          >
                            <FileText size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Product Support
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Issues with products or services
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=billing")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "error.main",
                              color: "error.contrastText",
                              mr: 2,
                            }}
                          >
                            <MessageSquare size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Billing Support
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Payment or invoice questions
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=technical")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "warning.main",
                              color: "warning.contrastText",
                              mr: 2,
                            }}
                          >
                            <HelpCircle size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Technical Support
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Technical issues or questions
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "action.hover", transform: "translateY(-4px)" },
                        }}
                        onClick={() => router.push("/support/new-request?type=feedback")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "success.main",
                              color: "success.contrastText",
                              mr: 2,
                            }}
                          >
                            <Mail size={24} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              General Feedback
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Suggestions or comments
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Recent requests */}
              <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Recent Support Requests
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => router.push("/support/my-requests")}>
                      View All
                    </Button>
                  </Box>

                  {recentRequests.length > 0 ? (
                    <List>
                      {recentRequests.map((request, index) => (
                        <React.Fragment key={request.id}>
                          <ListItem
                            button
                            onClick={() => router.push(`/support/request/${request.id}`)}
                            sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>{getStatusIcon(request.status)}</ListItemIcon>
                            <ListItemText
                              primary={request.subject}
                              secondary={`${request.id} • ${new Date(request.date).toLocaleDateString()}`}
                              primaryTypographyProps={{ fontWeight: "medium" }}
                            />
                          </ListItem>
                          {index < recentRequests.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ py: 4, textAlign: "center" }}>
                      <Typography color="text.secondary">You don't have any recent support requests</Typography>
                      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => router.push("/support/new-request")}>
                        Create Your First Request
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right column - Contact info */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 4, borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Contact Information
                  </Typography>

                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Phone color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone Support"
                        secondary="+1 (800) 123-4567"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Mail color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email Support"
                        secondary="support@example.com"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <Divider sx={{ my: 2 }} />

                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Clock color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Business Hours"
                        secondary="Monday - Friday: 9AM - 6PM EST"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Helpful Resources
                  </Typography>

                  <List>
                    <ListItem
                      button
                      onClick={() => router.push("/support/faq")}
                      sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <HelpCircle color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Frequently Asked Questions"
                        primaryTypographyProps={{ fontWeight: "medium" }}
                      />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem
                      button
                      onClick={() => router.push("/support/knowledge-base")}
                      sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <FileText color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Knowledge Base" primaryTypographyProps={{ fontWeight: "medium" }} />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem
                      button
                      onClick={() => router.push("/support/tutorials")}
                      sx={{ px: 2, py: 1.5, borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <MessageSquare color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText primary="Video Tutorials" primaryTypographyProps={{ fontWeight: "medium" }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default SupportPage
