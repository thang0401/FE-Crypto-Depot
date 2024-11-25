// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, RegisterParams } from './types'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  const auth = useAuth()
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      const apiGetMe = 'https://be-crypto-depot.name.vn/auth/getMe'
      if (storedToken) {
        setLoading(true)
        fetch(apiGetMe, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`
          }
        }).then(res => res.json()).then(data =>{
          setLoading(false)
          console.log('response',data)
          setUser({ ...data.data })
        }).catch(error=>{
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        })



      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const api = 'https://be-crypto-depot.name.vn/auth/login'
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
      const data = await response.json()
      if (response.ok) {
        console.log('data', data)
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, data.data.token) : null
        const returnUrl = router.query.returnUrl

        setUser({ ...data.data })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(data.data)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/home'

        auth.setUser(data.data)
        router.replace(redirectURL as string)
      } else {
        toast.error(data.message)
      }
    } catch (Error) {
      console.log(Error)
    }
  }

  const handleLoginGoogle = async (token: string) => {
    const api = 'https://be-crypto-depot.name.vn/auth/getMe'
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log('data', data)
      if (response.ok) {
        window.localStorage.setItem(authConfig.storageTokenKeyName, token)
        const returnUrl = router.query.returnUrl
        setUser({ ...data.data })
        window.localStorage.setItem('userData', JSON.stringify(data.data))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/home'

        auth.setUser(data.data)
        router.replace(redirectURL as string)
      } else {
        toast.error(data.message)
      }
    } catch (Error) {
      console.log(Error)
    }
  }

  const handleSignUp = async (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    const api = 'https://be-crypto-depot.name.vn/auth/register'

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    const data = await response.json()
    if (response.ok) {
      console.log('data', data)
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/login'
      toast.success(data.message || 'Đăng ký tài khoản thành công')
      router.replace(redirectURL as string)
    } else {
      toast.error(data.message)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    loginGoogle: handleLoginGoogle,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
