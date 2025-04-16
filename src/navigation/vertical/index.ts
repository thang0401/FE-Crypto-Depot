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
      title: 'Home',
      path: '/home'
    },
    {
      icon: 'bx:customize',
      title: 'Quick Transactions',
      children: [
        // {
        //   title: 'Transfer Asset',
        //   icon: 'bx:transfer',
        //   path: '/make-transaction/transfer-asset'
        // },
        {
          title: 'Deposit Asset',
          icon: 'bx:send',
          path: '/make-transaction/deposit-asset'
        },
        // {
        //   title: 'Withdraw Asset',
        //   icon: 'bx:asset',
        //   path: '/make-transaction/withdraw-asset'
        // },
        {
          title: 'Transfer Debit',
          icon: 'bx:transfer',
          path: '/make-transaction/transfer-debit'
        }
      ]
    },
    {
      icon: 'bx:customize',
      title: 'Savings',
      children: [
        {
          title: 'My Savings Portfolios',
          icon: 'bx:envelope',
          path: '/saving/my-portfolios'
        },
        // {
        //   title: 'Add Savings Asset',
        //   icon: 'bx:send',
        //   path: '/saving/add-saving-asset'
        // },
        {
          title: 'Create Savings Portfolio',
          icon: 'bx:send',
          path: '/saving/add-saving-asset/open'
        },
        {
          title: 'Calculator',
          icon: 'bx:transfer',
          path: '/saving/caculator'
        },
        // {
        //   title: 'Child Savings',
        //   icon: 'bx:asset',
        //   path: '/saving/withdraw-asset'
        // },
        // {
        //   title: 'Child Savings',
        //   icon: 'bx:asset',
        //   path: '/saving/open-saving'
        // }
      ]
    },
    {
      icon: 'bx:collection',
      title: 'Transaction History',
      path: '/transaction-history'
    },
    {
      icon: 'bx:collection',
      title: 'Buy Sell USDC',
      path: '/buy-sell'
    },

    {
      icon: 'bx:collection',
      title: 'Borrow and Repaymnet',
      path: '/Borrow-and-Repaymnet'
    },
    {
      icon: 'bx:collection',
      title: 'Support/Claim',
      path: '/support'
    },
    {
      icon: 'bx:grid-alt',
      title: 'Personal Page',
      children: [
        {
          title: 'Security',
          path: '/user-profile/security'
        },
        {
          title: 'Account',
          path: '/user-profile/account'
        },
        {
          title: 'Billing History',
          path: '/user-profile/billing-plan/'
        },
        {
          title: 'Notifications',
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
      title: 'About Us',
      path: '/about-us'
    },
    {
      icon: 'bx:palette',
      title: 'Logout'

    },
    {
      icon: 'bx:palette',
      title: 'setting'
    },
  ]
}

export default navigation
