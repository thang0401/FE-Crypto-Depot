export interface User {
    id: string
    name: string
    phone: string
    avatar?: string
    lastTransaction?: string
  }
  
  export interface TransactionDetails {
    amount: string
    fee: string
    note: string
    passCode: string
  }
  
  export interface FormErrors {
    amount: boolean
    passCode: boolean
  }
  
  