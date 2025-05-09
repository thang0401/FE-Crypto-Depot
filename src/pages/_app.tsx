import { ReactNode } from 'react';
import Head from 'next/head';
import { Router } from 'next/router';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import 'src/configs/i18n';
import { defaultACLObj } from 'src/configs/acl';
import themeConfig from 'src/configs/themeConfig';
import 'src/@fake-db';
import { Toaster } from 'react-hot-toast';
import UserLayout from 'src/layouts/UserLayout';
import AclGuard from 'src/@core/components/auth/AclGuard';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import AuthGuard from 'src/@core/components/auth/AuthGuard';
import GuestGuard from 'src/@core/components/auth/GuestGuard';
import Spinner from 'src/@core/components/spinner';
import { AuthProvider } from 'src/context/AuthContext';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast';
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'src/iconify-bundle/icons-bundle-react';
import '../../styles/globals.css';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);
  const setConfig = Component.setConfig ?? undefined;
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;
  const aclAbilities = Component.acl ?? defaultACLObj;

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
        <GoogleOAuthProvider clientId="385016565985-bor5ckolator2ahd75bam5b627cfq0v5.apps.googleusercontent.com">
          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
