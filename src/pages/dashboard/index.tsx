import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from 'src/hooks/useAuth'
import Dashboard from 'src/components/dashboards/dashboards'




export default function Index() {
  const router = useRouter()

  return (
    <div>
    <Dashboard/>
    </div>
  )
}
