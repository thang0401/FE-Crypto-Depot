// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      icon: 'bx:dashboard', // Icon bảng điều khiển cho Dashboard
      title: 'Dashboard',
      path: '/myDashboard',
    },
    {
      icon: 'bx:home-circle', // Giữ nguyên icon nhà cho Trang chủ
      title: 'Trang chủ',
      path: '/dashboard',
    },
    {
      icon: 'bx:transfer', // Icon giao dịch cho Giao dịch nhanh
      title: 'Giao dịch nhanh',
      children: [
        {
          title: 'Nạp USDC vào TK',
          icon: 'bx:plus-circle', // Icon thêm/nạp
          path: '/make-transaction/deposit-asset',
        },
        {
          title: 'Chuyển USDC trong System',
          icon: 'bx:transfer-alt', // Icon chuyển khoản
          path: '/make-transaction/transfer-debit',
        },
        {
          title: 'Rút USDC ra',
          icon: 'bx:plus-circle', // Icon thêm/nạp
          path: '/make-transaction/withdraw-asset/add',
        }
      ],
    },
    {
      icon: 'bx:coin-stack', // Icon tiền/tiết kiệm cho Tiết kiệm
      title: 'Tiết kiệm',
      children: [
        {
          title: 'Danh mục tiết kiệm của tôi',
          icon: 'bx:folder', // Icon danh mục
          path: '/saving/my-portfolios',
        },
        {
          title: 'Tạo danh mục tiết kiệm',
          icon: 'bx:plus-circle', // Icon thêm/tạo
          path: '/saving/add-saving-asset/open',
        },
        {
          title: 'Tính lãi suất',
          icon: 'bx:calculator', // Icon máy tính
          path: '/saving/caculator',
        },
      ],
    },
    {
      icon: 'bx:history', // Icon lịch sử cho Lịch sử giao dịch
      title: 'Lịch sử giao dịch',
      path: '/transaction-history',
    },
    {
      icon: 'bx:cart', // Icon mua bán cho Mua bán USDC
      title: 'Mua bán USDC',
      path: '/buy-sell',
    },
    {
      icon: 'bx:link', // Icon liên kết cho Mã giới thiệu
      title: 'Mã giới thiệu',
      path: '/referral-code',
    },
    {
      icon: 'bx:support', // Icon hỗ trợ cho Hỗ trợ/Khiếu nại
      title: 'Hỗ trợ/Khiếu nại',
      path: '/support',
    },
    {
      icon: 'bx:user', // Icon người dùng cho Trang cá nhân
      title: 'Trang cá nhân',
      children: [
        {
          title: 'Bảo mật',
          icon: 'bx:shield', // Icon bảo mật
          path: '/user-profile/security',
        },
        {
          title: 'Tài khoản',
          icon: 'bx:user-circle', // Icon tài khoản
          path: '/user-profile/account',
        },
        {
          title: 'Lịch sử thanh toán',
          icon: 'bx:history', // Icon lịch sử
          path: '/user-profile/billing-plan/',
        },
        {
          title: 'Nhân thưởng',
          icon: 'bx:bell', // Icon thông báo
          path: '/user-profile/notification/',
        },
      ],
    },
    {
      title: 'Blog',
      icon: 'bx:book', // Icon sách/bài viết cho Blog
      path: '/blog',
    },
    {
      icon: 'bx:info-circle', // Icon thông tin cho Về chúng tôi
      title: 'Về chúng tôi',
      path: '/about-us',
    },
    {
      icon: 'bx:log-out', // Icon đăng xuất cho Đăng xuất
      title: 'Đăng xuất',
    },
    {
      icon: 'bx:cog', // Icon cài đặt cho Cài đặt
      title: 'Cài đặt',
    },
  ];
};

export default navigation;
