export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: string
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
  kycStatus : boolean
  walletAddress? : string | null
  firstName : string
}


export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  // otpRequired: boolean; // Thêm
  // handleOtpVerify: (otp: string, errorCallback?: ErrCallbackType) => void;
}
