"use client"

import { useSearchParams } from "next/navigation"
import { HalalBihalalCard } from "@/components/halal-bihalal-card"

export default function InvitePage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Bapak/Ibu/Saudara/i"

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <HalalBihalalCard recipientName={name} />
    </div>
  )
}
