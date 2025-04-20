// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      icon: 'bx:palette',
      title: 'Dashboard',
      path: '/myDashboard'
    },
    {
      icon: 'bx:home-circle',
      title: 'Trang chủ',
      path: '/home'
    },
    {
      icon: 'bx:customize',
      title: 'Giao dịch nhanh',
      children: [
        {
          title: 'Nạp tài sản',
          icon: 'bx:send',
          path: '/make-transaction/deposit-asset'
        },
  {
          title: 'Chuyển khoản nợ',
          icon: 'bx:transfer',
          path: '/make-transaction/transfer-debit'
        }
      ]
    },
    {
      icon: 'bx:customize',
      title: 'Tiết kiệm',
      children: [
        {
          title: 'Danh mục tiết kiệm của tôi',
          icon: 'bx:envelope',
          path: '/saving/my-portfolios'
        },
        {
          title: 'Tạo danh mục tiết kiệm',
          icon: 'bx:send',
          path: '/saving/add-saving-asset/open'
        },
        {
          title: 'Tính lãi suất',
          icon: 'bx:transfer',
          path: '/saving/caculator'
        }
      ]
    },
    {
      icon: 'bx:collection',
      title: 'Lịch sử giao dịch',
      path: '/transaction-history'
    },
    {
      icon: 'bx:collection',
      title: 'Mua bán USDC',
      path: '/buy-sell'
    },
    {
      icon: 'bx:collection',
      title: 'Vay và trả nợ',
      path: '/Borrow-and-Repaymnet'
    },
    {
      icon: 'bx:collection',
      title: 'Hỗ trợ/Khiếu nại',
      path: '/support'
    },
    {
      icon: 'bx:grid-alt',
      title: 'Trang cá nhân',
      children: [
        {
          title: 'Bảo mật',
          path: '/user-profile/security'
        },
        {
          title: 'Tài khoản',
          path: '/user-profile/account'
        },
        {
          title: 'Lịch sử thanh toán',
          path: '/user-profile/billing-plan/'
        },
        {
          title: 'Thông báo',
          path: '/user-profile/notification/'
        }
      ]
    },
    {
      title: 'Blog',
      icon: 'bx:bar-chart-square',
      path: '/blog'
    },
    {
      icon: 'bx:palette',
      title: 'Về chúng tôi',
      path: '/about-us'
    },
    {
      icon: 'bx:palette',
      title: 'Đăng xuất'
    },
    {
      icon: 'bx:palette',
      title: 'Cài đặt'
    }
  ]
}

export default navigation