import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Deposit from 'src/components/make-transaction/deposit-asset/depositDebit';

export default function Index() {
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
      <Deposit />
    </div>
  );
}