// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      icon: 'bx:home-circle',
      title: 'Trang chủ',
      path: '/home'
    },
    {
      icon: 'bx:customize',
      title: 'Giao dịch ngay',
      children: [
        {
          title: 'Danh mục lưu trữ',
          icon: 'bx:envelope',
          path: '/trade-now/portfolio/personal-portfolio'
        },
        {
          title: 'Nạp tài sản',
          icon: 'bx:send',
          path: '/make-transaction/deposit-asset'
        },
        {
          title: 'Chuyển tài sản ',
          icon: 'bx:transfer',
          path: '/trade-now/transfer-asset'
        },
        {
          title: 'Rút tài sản',
          icon: 'bx:asset',
          path: '/make-transaction/withdraw-asset'
        }
      ]
    },
    {
      icon: 'bx:collection',
      title: 'Lịch sử giao dịch',
      path: '/transaction-history'
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
        title: 'Danh mục lưu trữ',
        path: '/user-profile/account'

       },
       {
        title: 'Lịch sử giao dịch',
         path: '/user-profile/billing-plan/'
       },
       {
        title: 'Thông tin',
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
      title: 'Khác ',
      icon: 'bx:dots-horizontal-rounded',
      path: '/others'
    }
  ]
}

export default navigation