import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import TransferDebit from 'src/components/make-transaction/transfer-debit/TransferDebit'

const Index = () => {
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
    <TransferDebit />
  )
}

export default Index