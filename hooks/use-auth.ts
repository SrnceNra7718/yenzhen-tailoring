'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/app/supabase/client'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      setUser(authUser ?? null)
      setLoading(false)
    })
  }, [])

  async function signOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return { user, loading, signOut }
}