import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Dashboard from 'src/components/dashboard/dashboard'
import { useAuth } from 'src/hooks/useAuth'

export default function Index() {
  const router = useRouter()

  return (
    <div>
      <Dashboard />
    </div>
  )
}
