"use client"

import type React from "react"
import { useEffect,useState, useRef } from "react"
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
//Define report detail request
interface ReportItem {
  id: string;
  name: string;
}

// Define the interface for the entire JSON object
interface ReportCategories {
  [category: string] : ReportItem[];
}




// Define priority levels
const priorityLevels = [
  { value: "low", label: "Thấp - Không khẩn cấp" },
  { value: "medium", label: "Trung bình - Cần chú ý" },
  { value: "high", label: "Cao - Ảnh hưởng đáng kể" },
  { value: "critical", label: "Rất cao - Cần giải quyết ngay" },
]

// Define contact time preferences
const contactTimeOptions = [
  { value: "morning", label: "Buổi sáng (8h - 12h)" },
  { value: "afternoon", label: "Buổi chiều (12h - 17h)" },
  { value: "evening", label: "Buổi tối (17h - 20h)" },
  { value: "anytime", label: "Bất kỳ lúc nào" },
]

// Define steps for the stepper
const steps = ["Chi tiết yêu cầu", "Thông tin liên hệ", "Xem xét & Gửi"]



const NewSupportRequest = () => {
  const theme = useTheme()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State for form data
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false) 
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [reportsDetail, setReportDetail] = useState<ReportCategories | null>(null)
  useEffect(() => {
    const fetchReportDetail = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/CustomerReport/initNewReqForm');
            if (!response.ok) {
                throw new Error('Failed to fetch interest rates');
            }
            const data: ReportCategories = await response.json();
            console.log(data);
            setReportDetail(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    fetchReportDetail();
}, []);
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
        formData.type !== null &&
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
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const response = await fetch(`http://localhost:8000/api/CustomerReport/IssueReport`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });
      setSubmitStatus("success")

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push("/support/request-submitted?id=SR" + Math.floor(Math.random() * 1000000))
      }, 2000)
    } catch (error) {
      console.error("Lỗi khi gửi biểu mẫu:", error)
      setSubmitStatus("error")
    } finally {
      setLoading(false)
    }
  }

  // Handle save draft
  const handleSaveDraft = () => {
    localStorage.setItem("supportRequestDraft", JSON.stringify(formData))
    alert("Bản nháp đã được lưu thành công!")
  }

  // Render step content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        if (!reportsDetail) {
          return <div>Loading...</div>;
        }
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  select
                  label="Loại yêu cầu"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  helperText="Chọn loại yêu cầu hoặc vấn đề"
                >
                  {Object.keys(reportsDetail).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
          
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={!formData.type}>
                <TextField
                  select
                  label="Tài khoản"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  helperText="Chọn danh mục cụ thể cho yêu cầu của bạn"
                > 
                  {reportsDetail[formData.type]?.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                    </MenuItem>
                  ))||""}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Mức độ ưu tiên"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  helperText="Mức độ khẩn cấp của yêu cầu?"
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
                  label="Mã đơn hàng/Giao dịch (nếu có)"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  helperText="Nếu yêu cầu liên quan đến một đơn hàng cụ thể"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="Tiêu đề"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  helperText="Tóm tắt ngắn gọn về yêu cầu của bạn"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="Mô tả chi tiết"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  required
                  inputProps={{ maxLength: maxDescriptionChars }}
                  helperText={`Vui lòng cung cấp chi tiết càng nhiều càng tốt. Còn lại ${descriptionCharsLeft} ký tự.`}
                  FormHelperTextProps={{ sx: { color: descriptionColor === "error" ? "error.main" : "inherit" } }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tệp đính kèm (Tùy chọn)
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tải lên ảnh chụp màn hình, biên lai, hoặc các tệp liên quan khác (tối đa 5 tệp, mỗi tệp 10MB)
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
                Tải lên tệp
              </Button>

              {formData.files.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Các tệp đã tải lên:
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
                <FormLabel component="legend">Phương thức liên hệ ưu tiên</FormLabel>
                <RadioGroup row name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                  <FormControlLabel value="email" control={<Radio />} label="Email" />
                  <FormControlLabel value="phone" control={<Radio />} label="Điện thoại" />
                  <FormControlLabel value="both" control={<Radio />} label="Cả hai" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required={formData.contactMethod === "email" || formData.contactMethod === "both"}>
                <TextField
                  label="Địa chỉ Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={formData.contactMethod === "email" || formData.contactMethod === "both"}
                  error={formData.email !== "" && !/\S+@\S+\.\S+/.test(formData.email)}
                  helperText={
                    formData.email !== "" && !/\S+@\S+\.\S+/.test(formData.email)
                      ? "Vui lòng nhập địa chỉ email hợp lệ"
                      : "Chúng tôi sẽ gửi cập nhật về yêu cầu của bạn đến email này"
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required={formData.contactMethod === "phone" || formData.contactMethod === "both"}>
                <TextField
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required={formData.contactMethod === "phone" || formData.contactMethod === "both"}
                  helperText="Bao gồm mã quốc gia nếu cần"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Thời gian liên hệ ưu tiên"
                  name="contactTime"
                  value={formData.contactTime}
                  onChange={handleChange}
                  helperText="Bạn muốn được liên hệ vào thời điểm nào?"
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
              Vui lòng xem xét lại thông tin của bạn trước khi gửi. Sau khi gửi, bạn sẽ nhận được email xác nhận với chi tiết yêu cầu của mình.
            </Alert>

            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}> 
                  <Typography variant="subtitle2" color="text.secondary">
                    Loại yêu cầu
                  </Typography>
                  <Typography variant="body1">
                     {}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tài khoản
                  </Typography>
                  <Typography variant="body1">
                    {}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Mức độ ưu tiên
                  </Typography>
                  <Typography variant="body1">
                    {priorityLevels.find((p) => p.value === formData.priority)?.label || ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Mã đơn hàng/Giao dịch
                  </Typography>
                  <Typography variant="body1">{formData.orderId || "N/A"}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tiêu đề
                  </Typography>
                  <Typography variant="body1">{formData.subject}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Mô tả
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {formData.description}
                  </Typography>
                </Grid>

                {formData.files.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Tệp đính kèm
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
                    Phương thức liên hệ
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                    {formData.contactMethod === "email" ? "Email" : formData.contactMethod === "phone" ? "Điện thoại" : "Cả hai"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thời gian liên hệ ưu tiên
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
                    Số điện thoại
                  </Typography>
                  <Typography variant="body1">{formData.phone || "N/A"}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )

      default:
        return "Bước không xác định"
    }
  }

  return (
    <>
      <Head>
        <title>Gửi yêu cầu hỗ trợ</title>
        <meta name="description" content="Gửi yêu cầu hỗ trợ hoặc khiếu nại mới" />
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
              Quay lại
            </Button>
            <Typography variant="h4" fontWeight="bold">
              Gửi yêu cầu hỗ trợ
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
                <Typography variant="h6">Yêu cầu hỗ trợ của bạn đã được gửi thành công!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Đang chuyển hướng đến trang xác nhận...
                </Typography>
              </Box>
            ) : submitStatus === "error" ? (
              <Box sx={{ py: 2 }}>
                <Alert
                  severity="error"
                  action={
                    <Button color="inherit" size="small" onClick={() => setSubmitStatus("idle")}>
                      Thử lại
                    </Button>
                  }
                >
                  Có lỗi khi gửi yêu cầu của bạn. Vui lòng thử lại.
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
                    {activeStep === 0 ? "Lưu bản nháp" : "Quay lại"}
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
                      "Gửi yêu cầu"
                    ) : (
                      "Tiếp theo"
                    )}
                  </Button>
                </Box>
              </>
            )}
          </Paper>

          {/* FAQ Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Câu hỏi thường gặp
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography>Mất bao lâu để nhận được phản hồi?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Chúng tôi cố gắng phản hồi tất cả yêu cầu hỗ trợ trong vòng 24-48 giờ. Các vấn đề ưu tiên cao thường được xử lý nhanh hơn.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography>Tôi có thể cập nhật yêu cầu sau khi gửi không?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Có, bạn có thể thêm thông tin bổ sung vào yêu cầu của mình bằng cách trả lời email xác nhận bạn nhận được, hoặc bằng cách đăng nhập vào tài khoản và xem các yêu cầu hỗ trợ của bạn.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography>Tôi có thể tải lên những loại tệp nào?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Bạn có thể tải lên hình ảnh (JPG, PNG, GIF), tài liệu (PDF, DOC, DOCX) và tệp văn bản (TXT). Mỗi tệp phải có kích thước dưới 10MB.
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
