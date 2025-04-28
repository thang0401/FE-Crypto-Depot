export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
  kycStatus?: boolean
  isReferralCode?: boolean
  isBankAccount? : boolean
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  googleLogin: (
    params: GoogleLoginParams,
    errorCallback?: ErrCallbackType
  ) => Promise<{ success: boolean; email?: string; error?: string }>
  verifyOtp: (params: OtpParams, errorCallback?: ErrCallbackType) => void
}

export type GoogleLoginParams = {
  idToken: string
  rememberMe: boolean
}

export type OtpParams = {
  otp: string
  gmail: string
  rememberMe: boolean
}
