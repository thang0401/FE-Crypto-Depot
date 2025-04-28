// import { useState, ReactNode } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { toast } from 'react-hot-toast';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/material/styles';
// import * as yup from 'yup';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';

// // ** Styled Components
// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: theme.palette.primary.main,
// }));

// // ** Validation Schema for OTP
// const otpSchema = yup.object().shape({
//   otp: yup
//     .string()
//     .required('OTP is required')
//     .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
// });

// // ** Default Values for OTP Form
// const otpDefaultValues = {
//   otp: '',
// };

// // ** Form Data Interface
// interface OtpFormData {
//   otp: string;
// }

// interface VerifyOtpFormProps {
//   rememberMe: boolean;
//   setIdToken: (value: string | null) => void;
//   verifyOtp: (params: { otp: string; rememberMe: boolean }, errorCallback?: (err: any) => void) => Promise<void>;
// }

// const VerifyOtpForm = ({ rememberMe, setIdToken, verifyOtp }: VerifyOtpFormProps) => {
//   const [otpSubmitError, setOtpSubmitError] = useState<string | null>(null);
//   const router = useRouter();

//   // ** Form Hooks for OTP
//   const {
//     control: otpControl,
//     handleSubmit: handleOtpSubmit,
//     formState: { errors: otpFormErrors },
//     reset: resetOtpForm,
//   } = useForm<OtpFormData>({
//     defaultValues: otpDefaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(otpSchema),
//   });

//   // ** Handlers
//   const onOtpSubmit = async (data: OtpFormData) => {
//     try {
//       await verifyOtp(
//         { otp: data.otp, rememberMe },
//         (err) => {
//           toast.error(err.message || 'Invalid OTP');
//         }
//       );
//       setOtpSubmitError(null);
//       setIdToken(null);
//       const returnUrl = router.query.returnUrl || '/';
//       router.replace(returnUrl as string);
//     } catch (error: any) {
//       const message = error.message || 'Invalid OTP';
//       setOtpSubmitError(message);
//       toast.error(message);
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       const response = await axios.post('/api/auth/resend-otp', {});
//       toast.success('New OTP sent to your email.');
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Failed to resend OTP';
//       toast.error(message);
//     }
//   };

//   return (
//     <>
//       <Typography variant='h6' sx={{ mb: 1.5 }}>
//         Verify Your OTP
//       </Typography>
//       <Typography sx={{ mb: 6, color: 'text.secondary' }}>
//         Please enter the 6-digit OTP sent to your email to complete the login process.
//       </Typography>
//       <form noValidate autoComplete='off' onSubmit={handleOtpSubmit(onOtpSubmit)}>
//         <FormControl fullWidth sx={{ mb: 4 }}>
//           <Controller
//             name='otp'
//             control={otpControl}
//             rules={{ required: true }}
//             render={({ field: { value, onChange, onBlur } }) => (
//               <TextField
//                 autoFocus
//                 label='OTP'
//                 value={value || ''}
//                 onBlur={onBlur}
//                 onChange={(e) => {
//                   console.log('OTP input value:', e.target.value);
//                   onChange(e);
//                 }}
//                 error={Boolean(otpFormErrors.otp)}
//                 placeholder='123456'
//                 inputProps={{ maxLength: 6 }}
//                 disabled={false}
//               />
//             )}
//           />
//           {otpFormErrors.otp && <FormHelperText sx={{ color: 'error.main' }}>{otpFormErrors.otp.message}</FormHelperText>}
//           {otpSubmitError && <FormHelperText sx={{ color: 'error.main' }}>{otpSubmitError}</FormHelperText>}
//         </FormControl>
//         <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 2 }}>
//           Verify OTP
//         </Button>
//         <Button fullWidth size='large' variant='outlined' onClick={handleResendOtp} sx={{ mb: 4 }}>
//           Resend OTP
//         </Button>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Typography variant='body2'>
//             <LinkStyled href='/auth/login' onClick={() => setIdToken(null)}>Back to Login</LinkStyled>
//           </Typography>
//         </Box>
//       </form>
//     </>
//   );
// };

// export default VerifyOtpForm;
