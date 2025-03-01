// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n'
import { buildAbilityFor, defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Privy Imports
import { PrivyProvider, usePrivy } from '@privy-io/react-auth'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj
   const abilitys = buildAbilityFor('client', aclAbilities.subject)
   const { ready, authenticated, login } = usePrivy(); ///
   const router = useRouter();///
   console.log('router.pathname',router.pathname);

     useEffect(() => {
       if (router.pathname !== '/login' && !ready && !authenticated) {
         router.push('/login');
       }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Giải pháp lưu trữ và giao dịch đơn giản, an toàn và bảo mật`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Cung cấp giải pháp lưu trữ và giao dịch đơn giản, an toàn và bảo mật số dư tiền điện tử của bạn.`}
          />
          <meta name='keywords' content='Lưu ký crypto, giao dịch - bảo mật an toàn, bảo mật số dư' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <PrivyProvider
          appId='cm7m87xkw018yazredtxxnnjs' // Thay bằng App ID từ Dashboard
          config={{
            loginMethods: ['google', 'discord'], // Chỉ dùng Google và Discord
            appearance: {
              theme: 'light'
              // logo: 'https://your-logo-url.com/logo.png', // Thay bằng URL logo của bạn
            },
            embeddedWallets: {
              ethereum: {
                createOnLogin: 'off' // Tắt tạo ví tự động
              }
            },
            mfa: {
              noPromptOnMfaRequired: false // Dùng UI mặc định của Privy cho MFA
            }
          }}
        >
          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeComponent settings={settings}>
                    <BlankLayout>
                        <AbilityContext.Provider value={abilitys}>
                        {getLayout(<Component {...pageProps} />)}
                        </AbilityContext.Provider>
                        </BlankLayout>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </PrivyProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
