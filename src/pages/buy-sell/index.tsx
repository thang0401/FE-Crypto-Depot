import { NextPage } from 'next'
import React from 'react'
import CryptoExchangeForm from 'src/components/buy-sell/CryptoExchangeForm'

const BuySellPage: NextPage = ()=> {
  return (
    <CryptoExchangeForm/>
  )
}
// BuySellPage.guestGuard = false
// BuySellPage.authGuard = true
export default BuySellPage