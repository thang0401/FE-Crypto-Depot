// ** React Imports
import { ReactNode } from 'react';

// ** MUI Imports
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Layout Imports
import Layout from 'src/@core/layouts/Layout';

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical';
import HorizontalNavItems from 'src/navigation/horizontal';

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent';
import HorizontalAppBarContent from './components/horizontal/AppBarContent';

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings';
import { useAuth } from 'src/hooks/useAuth';

interface Props {
  children: ReactNode;
  contentHeightFixed?: boolean;
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings();
  const auth = useAuth(); // Lấy trạng thái đăng nhập
  console.log('UserLayout auth.user:', auth.user);
  console.log('settings.navHidden:', settings.navHidden);
  
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical';
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems(!!auth.user), // Truyền !!auth.user làm isAuthenticated
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          ),
        },
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems(),
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />,
          },
        },
      })}
    >
      {children}
    </Layout>
  );
};

export default UserLayout;