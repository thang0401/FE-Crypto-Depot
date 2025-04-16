"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { Upload, FileText, ImageIcon, File, ChevronDown, Send, Save, ArrowLeft } from "lucide-react"

// Define types for the form
interface SupportRequest {
  type: string
  category: string
  priority: string
  subject: string
  description: string
  orderId: string
  contactMethod: string
  contactTime: string
  email: string
  phone: string
  files: File[]
}

// Define complaint types
const complaintTypes = [
  { value: "product", label: "Product Issue" },
  { value: "service", label: "Service Issue" },
  { value: "billing", label: "Billing Problem" },
  { value: "delivery", label: "Delivery Problem" },
  { value: "technical", label: "Technical Support" },
  { value: "feedback", label: "General Feedback" },
  { value: "other", label: "Other" },
]

// Define categories based on type
const categoryOptions = {
  product: [
    { value: "defective", label: "Defective Product" },
    { value: "damaged", label: "Damaged During Shipping" },
    { value: "wrong_item", label: "Wrong Item Received" },
    { value: "missing_parts", label: "Missing Parts" },
  ],
  service: [
    { value: "poor_service", label: "Poor Customer Service" },
    { value: "delayed_response", label: "Delayed Response" },
    { value: "incorrect_info", label: "Incorrect Information Provided" },
  ],
  billing: [
    { value: "overcharged", label: "Overcharged" },
    { value: "double_charged", label: "Double Charged" },
    { value: "refund_issue", label: "Refund Issue" },
    { value: "subscription", label: "Subscription Problem" },
  ],
  delivery: [
    { value: "late", label: "Late Delivery" },
    { value: "missing", label: "Missing Delivery" },
    { value: "wrong_address", label: "Wrong Address" },
  ],
  technical: [
    { value: "website", label: "Website Issue" },
    { value: "app", label: "Mobile App Issue" },
    { value: "account", label: "Account Access Problem" },
  ],
  feedback: [
    { value: "suggestion", label: "Suggestion" },
    { value: "compliment", label: "Compliment" },
    { value: "complaint", label: "General Complaint" },
  ],
  other: [{ value: "other", label: "Other Issue" }],
}

// Define priority levels
const priorityLevels = [
  { value: "low", label: "Low - Not urgent" },
  { value: "medium", label: "Medium - Needs attention" },
  { value: "high", label: "High - Significant impact" },
  { value: "critical", label: "Critical - Urgent resolution needed" },
]

// Define contact time preferences
const contactTimeOptions = [
  { value: "morning", label: "Morning (8AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 5PM)" },
  { value: "evening", label: "Evening (5PM - 8PM)" },
  { value: "anytime", label: "Anytime" },
]

// Define steps for the stepper
const steps = ["Request Details", "Contact Information", "Review & Submit"]

const NewSupportRequest = () => {
  const theme = useTheme()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State for form data
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState<SupportRequest>({
    type: "",
    category: "",
    priority: "medium",
    subject: "",
    description: "",
    orderId: "",
    contactMethod: "email",
    contactTime: "anytime",
    email: "",
    phone: "",
    files: [],
  })

  // Character count for description
  const maxDescriptionChars = 2000
  const descriptionCharsLeft = maxDescriptionChars - formData.description.length
  const descriptionColor = descriptionCharsLeft < 50 ? "error" : descriptionCharsLeft < 200 ? "warning" : "default"

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target

    if (!name) return

    setFormData((prev) => {
      const newData = { ...prev, [name]: value }

      // Reset category when type changes
      if (name === "type") {
        newData.category = ""
      }

      return newData
    })
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }))
    }
  }

  // Remove a file
  const handleRemoveFile = (fileToRemove: File) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file !== fileToRemove),
    }))
  }

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon size={16} />
    if (file.type.includes("pdf")) return <FileText size={16} />
    return <File size={16} />
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  // Check if current step is valid
  const isStepValid = () => {
    if (activeStep === 0) {
      return (
        formData.type !== "" &&
        formData.category !== "" &&
        formData.subject.trim() !== "" &&
        formData.description.trim() !== ""
      )
    }

    if (activeStep === 1) {
      if (formData.contactMethod === "email") {
        return formData.email.trim() !== "" && /\S+@\S+\.\S+/.test(formData.email)
      } else if (formData.contactMethod === "phone") {
        return formData.phone.trim() !== "" && formData.phone.length >= 10
      } else {
        return formData.email.trim() !== "" && formData.phone.trim() !== ""
      }
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true)

    try {
      // In a real application, you would send the form data to your API
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (key !== 'files') {
      //     formDataToSend.append(key, value as string);
      //   }
      // });
      // formData.files.forEach(file => {
      //   formDataToSend.append('files', file);
      // });

      // const response = await fetch('/api/support/submit', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });

      // if (!response.ok) throw new Error('Failed to submit support request');

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus("success")

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push("/support/request-submitted?id=SR" + Math.floor(Math.random() * 1000000))
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setLoading(false)
    }
  }

  // Handle save draft
  const handleSaveDraft = () => {
    // In a real application, you would save the draft to localStorage or to the server
    localStorage.setItem("supportRequestDraft", JSON.stringify(formData))

    // Show a notification that the draft was saved
    alert("Draft saved successfully!")
  }

  // Render step content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  select
                  label="Request Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  helperText="Select the type of request or issue"
                >
                  {complaintTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={!formData.type}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  helperText="Select a specific category for your request"
                >
                  {formData.type &&
                    categoryOptions[formData.type as keyof typeof categoryOptions]?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  helperText="How urgent is your request?"
                >
                  {priorityLevels.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  label="Order/Transaction ID (if applicable)"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  helperText="If your request is related to a specific order"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  helperText="Brief summary of your request"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="Detailed Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  required
                  inputProps={{ maxLength: maxDescriptionChars }}
                  helperText={`Please provide as much detail as possible. ${descriptionCharsLeft} characters remaining.`}
                  FormHelperTextProps={{ sx: { color: descriptionColor === "error" ? "error.main" : "inherit" } }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Attachments (Optional)
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Upload screenshots, receipts, or other relevant files (max 5 files, 10MB each)
                </Typography>
              </Box>

              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />

              <Button
                variant="outlined"
                startIcon={<Upload size={18} />}
                onClick={() => fileInputRef.current?.click()}
                disabled={formData.files.length >= 5}
                sx={{ mb: 2 }}
              >
                Upload Files
              </Button>

              {formData.files.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Files:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {formData.files.map((file, index) => (
                      <Chip
                        key={index}
                        icon={getFileIcon(file)}
                        label={file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name}
                        onDelete={() => handleRemoveFile(file)}
                        sx={{ maxWidth: 250 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        )

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Preferred Contact Method</FormLabel>
                <RadioGroup row name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                  <FormControlLabel value="email" control={<Radio />} label="Email" />
                  <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                  <FormControlLabel value="both" control={<Radio />} label="Both" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required={formData.contactMethod === "email" || formData.contactMethod === "both"}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={formData.contactMethod === "email" || formData.contactMethod === "both"}
                  error={formData.email !== "" && !/\S+@\S+\.\S+/.test(formData.email)}
                  helperText={
                    formData.email !== "" && !/\S+@\S+\.\S+/.test(formData.email)
                      ? "Please enter a valid email address"
                      : "We'll send updates about your request to this email"
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required={formData.contactMethod === "phone" || formData.contactMethod === "both"}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required={formData.contactMethod === "phone" || formData.contactMethod === "both"}
                  helperText="Include country code if applicable"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Preferred Contact Time"
                  name="contactTime"
                  value={formData.contactTime}
                  onChange={handleChange}
                  helperText="When would you prefer to be contacted?"
                >
                  {contactTimeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
        )

      case 2:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your information before submitting. Once submitted, you'll receive a confirmation email with
              your request details.
            </Alert>

            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Request Type
                  </Typography>
                  <Typography variant="body1">
                    {complaintTypes.find((t) => t.value === formData.type)?.label || ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {(formData.type &&
                      categoryOptions[formData.type as keyof typeof categoryOptions]?.find(
                        (c) => c.value === formData.category,
                      )?.label) ||
                      ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Priority
                  </Typography>
                  <Typography variant="body1">
                    {priorityLevels.find((p) => p.value === formData.priority)?.label || ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order/Transaction ID
                  </Typography>
                  <Typography variant="body1">{formData.orderId || "N/A"}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subject
                  </Typography>
                  <Typography variant="body1">{formData.subject}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {formData.description}
                  </Typography>
                </Grid>

                {formData.files.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Attachments
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                      {formData.files.map((file, index) => (
                        <Chip
                          key={index}
                          icon={getFileIcon(file)}
                          label={file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact Method
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                    {formData.contactMethod}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Preferred Contact Time
                  </Typography>
                  <Typography variant="body1">
                    {contactTimeOptions.find((t) => t.value === formData.contactTime)?.label || ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{formData.email || "N/A"}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{formData.phone || "N/A"}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )

      default:
        return "Unknown step"
    }
  }

  return (
    <>
      <Head>
        <title>Submit Support Request</title>
        <meta name="description" content="Submit a new support request or complaint" />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={18} />}
              onClick={() => router.push("/support")}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h4" fontWeight="bold">
              Submit Support Request
            </Typography>
          </Box>

          <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, boxShadow: theme.shadows[3] }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {submitStatus === "success" ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="h6">Your support request has been submitted successfully!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Redirecting to confirmation page...
                </Typography>
              </Box>
            ) : submitStatus === "error" ? (
              <Box sx={{ py: 2 }}>
                <Alert
                  severity="error"
                  action={
                    <Button color="inherit" size="small" onClick={() => setSubmitStatus("idle")}>
                      Try Again
                    </Button>
                  }
                >
                  There was an error submitting your request. Please try again.
                </Alert>
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 4 }}>{getStepContent(activeStep)}</Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={activeStep === 0 ? handleSaveDraft : handleBack}
                    startIcon={activeStep === 0 ? <Save size={18} /> : undefined}
                  >
                    {activeStep === 0 ? "Save Draft" : "Back"}
                  </Button>

                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    disabled={!isStepValid() || loading}
                    startIcon={activeStep === steps.length - 1 ? <Send size={18} /> : undefined}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : activeStep === steps.length - 1 ? (
                      "Submit Request"
                    ) : (
                      "Next"
                    )}
                  </Button>
                </Box>
              </>
            )}
          </Paper>

          {/* FAQ Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography>How long will it take to get a response?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We aim to respond to all support requests within 24-48 hours. High priority issues are typically
                  addressed more quickly.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography>Can I update my request after submission?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, you can add additional information to your request by replying to the confirmation email you'll
                  receive, or by logging into your account and viewing your support requests.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography>What file types can I upload?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can upload images (JPG, PNG, GIF), documents (PDF, DOC, DOCX), and text files (TXT). Each file
                  must be under 10MB in size.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default NewSupportRequest
