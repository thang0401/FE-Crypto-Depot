// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (isAuthenticated: boolean): VerticalNavItemsType => {
  // Các mục công khai dành cho guest
  const publicNavItems: VerticalNavItemsType = [
    {
      icon: 'bx:home-circle',
      title: 'Trang chủ',
      path: '/',
      auth: false
    },
    {
      title: 'Blog',
      icon: 'bx:book',
      path: '/blog',
      auth: false
    },
    {
      icon: 'bx:info-circle',
      title: 'Về chúng tôi',
      path: '/about-us',
      auth: false
    },    
    {
      icon: 'bx:log-in',
      title: 'Đăng nhập/Đăng ký',
      path: '/login',
      auth: false
    },
  ];

  // Các mục yêu cầu đăng nhập
  const privateNavItems: VerticalNavItemsType = [   
    {
      icon: 'bx:home-circle',
      title: 'Trang chủ',
      path: '/homepage',
      auth: false,
    },
    {
      icon: 'bx:data',
      title: 'Dashboard',
      path: '/myDashboard',
    },
    {
      icon: 'bx:transfer',
      title: 'Giao dịch nhanh',
      children: [
        {
          title: 'Nạp USDC vào TK',
          icon: 'bx:plus-circle',
          path: '/make-transaction/deposit-asset',
        },
        {
          title: 'Chuyển USDC trong System',
          icon: 'bx:transfer-alt',
          path: '/make-transaction/transfer-debit',
        },
        {
          title: 'Rút USDC ra',
          icon: 'bx:plus-circle',
          path: '/make-transaction/withdraw-asset/add',
        },
      ],
    },
    {
      icon: 'bx:cart',
      title: 'Mua bán USDC',
      path: '/buy-sell',
    },
    {
      icon: 'bx:coin-stack',
      title: 'Tiết kiệm',
      children: [
        {
          title: 'Tài khoản tiết kiệm của tôi',
          icon: 'bx:folder',
          path: '/saving/my-portfolios',
        },
        {
          title: 'Tạo Tài khoản tiết kiệm',
          icon: 'bx:plus-circle',
          path: '/saving/add-saving-asset/open',
        },
        {
          title: 'Tính lãi suất',
          icon: 'bx:calculator',
          path: '/saving/caculator',
        },
      ],
    },
    {
      icon: 'bx:history',
      title: 'Lịch sử giao dịch',
      path: '/transaction-history',
    },
    
    {
      icon: 'bx:link',
      title: 'Mã giới thiệu',
      path: '/referral-code',
    },
    {
      icon: 'bx:support',
      title: 'Hỗ trợ/Khiếu nại',
      path: '/support',
    },
    {
      icon: 'bx:user',
      title: 'Trang cá nhân',
      children: [
        {
          title: 'Bảo mật',
          icon: 'bx:shield',
          path: '/user-profile/security',
        },
        {
          title: 'Tài khoản',
          icon: 'bx:user-circle',
          path: '/user-profile/account',
        },
        {
          title: 'Lịch sử thanh toán',
          icon: 'bx:history',
          path: '/user-profile/billing-plan/',
        },
        {
          title: 'Nhân thưởng',
          icon: 'bx:bell',
          path: '/user-profile/connection/',
        },
      ],
    },
    {
      title: 'Blog',
      icon: 'bx:book',
      path: '/blog',
      auth: false,
    },
    {
      icon: 'bx:info-circle',
      title: 'Về chúng tôi',
      path: '/about-us',
      auth: false,
    },
    {
      icon: 'bx:log-out',
      title: 'Đăng xuất',
    },
    {
      icon: 'bx:cog',
      title: 'Cài đặt',
    },
  ];

  return isAuthenticated ? privateNavItems : publicNavItems;
};

export default navigation;