import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useAuth } from 'src/hooks/useAuth';

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

const otpDefaultValues = {
  otp: '',
};

interface OtpFormData {
  otp: string;
}

interface OtpFormProps {
  idToken: string | null;
  email: string | null;
  setIdToken: (value: string | null) => void;
  rememberMe: boolean;
}

const OtpForm = ({ idToken, email, setIdToken, rememberMe }: OtpFormProps) => {
  const otpInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const auth = useAuth();
  const [otpSubmitError, setOtpSubmitError] = useState<string | null>(null);

  useEffect(() => {
    console.log('OtpForm props - email:', email);
    resetOtpForm(otpDefaultValues);
    setValue('otp', '', { shouldValidate: true });
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [email]);

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpFormErrors },
    reset: resetOtpForm,
    setValue,
  } = useForm<OtpFormData>({
    defaultValues: otpDefaultValues,
    mode: 'onBlur',
    resolver: yupResolver(otpSchema),
  });

  const onOtpSubmit = async (data: OtpFormData) => {
    console.log('Submitting OTP with email:', email);
    if (!email) {
      console.error('Error: email is missing in onOtpSubmit');
      toast.error('Email is missing');
      return;
    }
    try {
      await auth.verifyOtp(
        { otp: data.otp, gmail: email, rememberMe },
        (err) => {
          toast.error(err.message || 'Invalid OTP');
        }
      );
      setOtpSubmitError(null);
      setIdToken(null);
    } catch (error: any) {
      const message = error.message || 'Invalid OTP';
      setOtpSubmitError(message);
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('/api/auth/resend-otp', { email });
      toast.success('Mã OTP mới đã được gửi đến email của bạn.');
    } catch (error: any) {
      const message = error.response?.status === 429
        ? 'Vui lòng đợi 30 giây trước khi yêu cầu OTP mới'
        : error.response?.data?.message || 'Gửi lại OTP thất bại';
      toast.error(message);
    }
  };

  return (
    <>
      <Typography variant='h6' sx={{ mb: 1.5 }}>
        Verify Your OTP
      </Typography>
      <Typography sx={{ mb: 6, color: 'text.secondary' }}>
        Please enter the 6-digit OTP sent to your email to complete the login process.
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleOtpSubmit(onOtpSubmit)}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Controller
            name="otp"
            control={otpControl}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                key="otp-input"
                inputRef={otpInputRef}
                autoFocus
                label="OTP"
                placeholder="123456"
                error={Boolean(otpFormErrors.otp)}
                inputProps={{ maxLength: 6 }}
                type="text"
                autoComplete="off"
              />
            )}
          />
          {otpFormErrors.otp && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {otpFormErrors.otp.message}
            </FormHelperText>
          )}
          {otpSubmitError && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {otpSubmitError}
            </FormHelperText>
          )}
        </FormControl>
        <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 2 }}>
          Verify OTP
        </Button>
        <Button fullWidth size='large' variant='outlined' onClick={handleResendOtp} sx={{ mb: 4 }}>
          Resend OTP
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='body2'>
            <LinkStyled href='/auth/login' onClick={() => setIdToken(null)}>Back to Login</LinkStyled>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default OtpForm;
