import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import authConfig from 'src/configs/auth';
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, GoogleLoginParams, OtpParams } from './types';
import { jwtDecode } from 'jwt-decode';

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  googleLogin: () => Promise.resolve({ success: false }),
  verifyOtp: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
        if (storedToken) {
          setLoading(true);
          const response = await axios.get(authConfig.meEndpoint, {
            headers: { Authorization: storedToken },
          });
          setUser({ ...response.data.userData });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('initAuth error:', error);
        localStorage.removeItem('userData');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        setUser(null);
        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
          router.replace('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async (response) => {
        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
          window.localStorage.setItem('userData', JSON.stringify(response.data.userData));
        }
        const userData = { ...response.data.userData };
        setUser(userData);
        setLoading(false);
        toast.success('Logged in successfully!');

        // Redirect based on kycStatus and isReferralCode
        const redirectUrl = determineRedirectUrl(userData);
        router.replace(redirectUrl);
      })
      .catch((err) => {
        const message = err.response?.data || 'Login failed';
        toast.error(message);
        if (errorCallback) errorCallback(err);
      });
  };

  const handleGoogleLogin = async (
    params: GoogleLoginParams,
    errorCallback?: ErrCallbackType
  ): Promise<{ success: boolean; email?: string; error?: string }> => {
    try {
      const response = await axios.post('https://be-crypto-depot.name.vn/api/auth/login/google', params);
      console.log('Response from /api/auth/login/google:', response.data);
      if (response.status === 200) {
        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
          window.localStorage.setItem('userData', JSON.stringify(response.data.userData));
        }
        const userData = { ...response.data.userData };
        setUser(userData);
        setLoading(false);
        toast.success('Đăng nhập thành công!');

        // Redirect based on kycStatus and isReferralCode
        const redirectUrl = determineRedirectUrl(userData);
        router.replace(redirectUrl);
        return { success: true };
      } else if (response.status === 202) {
        // Decode idToken to get email
        const decodedToken = jwtDecode<{ email: string }>(params.idToken);
        console.log('OTP required, email:', decodedToken.email);
        return { success: false, email: decodedToken.email, error: 'OTP verification required' };
      } else {
        throw new Error('Trạng thái phản hồi không mong đợi');
      }
    } catch (err: any) {
      const message = err.response?.data || 'Đăng nhập bằng Google thất bại';
      console.error('Google login error:', err);
      toast.error(message);
      if (errorCallback) errorCallback(err);
      return { success: false, error: message };
    }
  };

  const handleVerifyOtp = async (
    params: OtpParams,
    errorCallback?: ErrCallbackType
  ): Promise<void> => {
    try {
      console.log('Sending OTP verification with params:', params);
      const response = await axios.post('https://be-crypto-depot.name.vn/api/auth/login/google/OTP', params);
      console.log('Response from /api/auth/login/google/OTP:', response.data);
      if (response.status === 200) {
        const decodedToken = jwtDecode<{ [key: string]: any }>(response.data.accessToken);
        console.log('Token info:', decodedToken);

        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
          window.localStorage.setItem('userData', JSON.stringify(response.data.userData));
        }
        const userData = { ...response.data.userData };
        setUser(userData);
        setLoading(false);
        toast.success('Xác minh OTP thành công!');

        // Redirect based on kycStatus and isReferralCode
        const redirectUrl = determineRedirectUrl(userData);
        router.replace(redirectUrl);
      } else {
        throw new Error('Trạng thái phản hồi không mong đợi');
      }
    } catch (err: any) {
      const message = err.response?.data || 'Xác minh OTP thất bại';
      console.error('OTP verification error:', err);
      toast.error(message);
      if (errorCallback) errorCallback({ message });
      throw err;
    }
  };

  const determineRedirectUrl = (userData: UserDataType): string => {
    const returnUrl = router.query.returnUrl || '/myDashboard';
    if (!userData.kycStatus) {
      return '/kyc-center';
    } else if (!userData.isReferralCode) {
      return '/referral-code';
    }
    return returnUrl as string;
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push('/login');
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    verifyOtp: handleVerifyOtp,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
