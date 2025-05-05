import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import TransactionList from 'src/components/transaction-history'
import TransactionHistory from 'src/components/transaction-history'

export default function index() {
  const router = useRouter();
    
      useEffect(() => {
        try {
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          const kycStatus = userData.kycStatus;
    
          if (kycStatus === null || kycStatus === false) {
            router.push('/kyc-center');
          }
        } catch (error) {
          // Handle parsing error by redirecting to kyc-center
          router.push('/kyc-center');
        }
      }, [router]);
  return (
    <div>
      <TransactionHistory />
    </div>
  )
}
