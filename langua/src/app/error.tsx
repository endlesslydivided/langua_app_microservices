"use client"
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
  })

  return null
}