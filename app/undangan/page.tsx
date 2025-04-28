"use client"

import { useSearchParams } from "next/navigation"
import { HalalBihalalCard } from "@/components/halal-bihalal-card"

export default function UndanganPage() {
  const searchParams = useSearchParams()
  const nama = searchParams.get("nama") || "Bapak/Ibu/Saudara/i"

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <HalalBihalalCard recipientName={nama} />
    </div>
  )
}
