import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
// import KycCenter from 'src/components/kyc/KycCenter'
import UserDashboard from 'src/components/user-dashboard/UserDashboard'

const index = () => {
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
    // <KycCenter/>
    <UserDashboard/>
  )
}

export default index