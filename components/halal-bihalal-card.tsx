"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface HalalBihalalCardProps {
  recipientName: string
  onDownload?: () => void
}

export function HalalBihalalCard({ recipientName, onDownload }: HalalBihalalCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="overflow-hidden border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-lg">
        <CardContent className="p-0">
          {/* Header with decorative elements */}
          <div className="relative bg-emerald-600 p-6 text-center">
            <div className="absolute left-0 top-0 h-16 w-16 opacity-20">
              <svg viewBox="0 0 100 100" fill="white">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 h-16 w-16 opacity-20">
              <svg viewBox="0 0 100 100" fill="white">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              </svg>
            </div>

            <h1 className="mb-2 font-serif text-2xl font-bold text-white">Undangan Halal Bihalal</h1>
            <p className="text-emerald-100">1445 Hijriah</p>
          </div>

          {/* Main content */}
          <div className="p-6">
            {/* Greeting */}
            <div className="mb-6 text-center">
              <h2 className="mb-4 font-serif text-xl font-medium text-emerald-800">Kepada Yth:</h2>
              <div className="mb-4 rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 p-3">
                <h1 className="font-serif text-2xl font-bold text-emerald-800">{recipientName}</h1>
              </div>
              <p className="text-emerald-700">
                Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara Halal Bihalal
                keluarga besar kami.
              </p>
            </div>

            {/* Event details */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-medium text-emerald-800">Hari/Tanggal</h3>
                  <p className="text-sm text-emerald-600">Minggu, 12 Mei 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                <Clock className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-medium text-emerald-800">Waktu</h3>
                  <p className="text-sm text-emerald-600">10.00 - 15.00 WIB</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-medium text-emerald-800">Tempat</h3>
                  <p className="text-sm text-emerald-600">Gedung Serbaguna Al-Hikmah</p>
                  <p className="text-xs text-emerald-600">Jl. Masjid No. 123, Jakarta</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                <Users className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-medium text-emerald-800">Penyelenggara</h3>
                  <p className="text-sm text-emerald-600">Keluarga Besar Bapak Ahmad</p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6 rounded-lg bg-emerald-50 p-4 text-center">
              <p className="mb-2 italic text-emerald-700">"Minal 'Aidin wal Faizin, Mohon Maaf Lahir dan Batin"</p>
              <p className="text-sm text-emerald-600">
                Kehadiran Bapak/Ibu/Saudara/i merupakan suatu kehormatan dan kebahagiaan bagi kami.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-emerald-100 p-4 text-center text-sm text-emerald-700">
            <p>Hormat Kami,</p>
            <p className="font-medium">Keluarga Besar Bapak Ahmad</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
