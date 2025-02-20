// ** Type import
import path from 'path'
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'bx:home-circle',
      title: 'Trang chủ',
      path: '/dashboard'
    },
    {
      icon: 'bx:customize',
      title: 'Giao dịch nhanh',
      children: [
        {
          title: 'Chuyển tài sản',
          icon: 'bx:transfer',
          path: '/make-transaction/transfer-asset'
        },
        {
          title: 'Nạp tài sản',
          icon: 'bx:send',
          path: '/make-transaction/deposit-asset'
        },
        {
          title: 'Rút tài sản',
          icon: 'bx:asset',
          path: '/make-transaction/withdraw-asset'
        }
      ]
    },
    {
      icon: 'bx:customize',
      title: 'Gửi tiết kiệm',
      children: [
        {
          title: 'Danh sách sổ tiết kiệm',
          icon: 'bx:envelope',
          path: '/saving/my-portfolios'
        },
        {
          title: 'Gửi tiền tiết kiệm',
          icon: 'bx:send',
          path: '/saving/add-saving-asset'
        },   {
          title: 'Tạo danh mục tiết kiệm',
          icon: 'bx:send',
          path: '/saving/add-saving-asset/open'
        },
        // {
        //   title: 'Tiền gửi rút gốc',
        //   icon: 'bx:transfer',
        //   path: '/saving/transfer-asset'
        // },
        // {
        //   title: 'Tiền gửi cho con',
        //   icon: 'bx:asset',
        //   path: '/saving/withdraw-asset'
        // },
        // {
        //   title: 'Tiền gửi cho con',
        //   icon: 'bx:asset',
        //   path: '/saving/open-saving'
        // }
      ]
    },
    {
      icon: 'bx:collection',
      title: 'Tra cứu giao dịch',
      path: '/transaction-history'
    },

    {
      icon: 'bx:collection',
      title: 'Thẻ tín dụng',
      path: '/credit-card'
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
        title: 'Danh sách sổ tiết kiệm',
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
    }
  ]
}

export default navigation