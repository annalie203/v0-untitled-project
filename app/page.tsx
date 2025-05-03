"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Users, ChevronDown, Heart, Send } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Countdown from "./components/countdown"
import AudioPlayer from "./components/audio-player"

export default function HalalBihalal() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [rsvpStatus, setRsvpStatus] = useState<"hadir" | "tidak hadir" | null>(null)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showRsvpList, setShowRsvpList] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Mock RSVP data
  const rsvpList = [
    { name: "Ahmad Rizal", status: "hadir", message: "Insya Allah saya akan hadir" },
    { name: "Putri Rahmah", status: "hadir", message: "Semoga acara berjalan lancar" },
    { name: "Muhammad Faisal", status: "tidak hadir", message: "Mohon maaf tidak bisa hadir" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    document.body.style.overflow = "auto"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && rsvpStatus) {
      setSubmitted(true)
      // In a real app, you would send this data to a server
      console.log({ name, rsvpStatus, message })

      // Reset form after submission
      setTimeout(() => {
        setSubmitted(false)
        setName("")
        setRsvpStatus(null)
        setMessage("")
      }, 3000)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#f8f3e9] text-[#5a3e2b] overflow-x-hidden">
      {/* Audio Player */}
      {typeof window !== "undefined" && <AudioPlayer />}

      {/* Cover */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c4a34] text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-full max-w-md p-8 mx-auto text-center"
            >
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-16 bg-[url('/patterns/aceh-pattern-top.png')] bg-repeat-x opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-[url('/patterns/aceh-pattern-bottom.png')] bg-repeat-x opacity-40"></div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 text-lg font-light"
              >
                Undangan
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <h1 className="text-4xl font-bold font-serif mb-2">Halal Bihalal</h1>
                <p className="text-xl">Keluarga Besar Malabar</p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <div className="inline-block p-4 border border-[#d4af37] rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-[#d4af37]" />
                  <p className="text-sm">Minggu, 4 Mei 2025</p>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleOpen}
                className="px-8 py-3 text-[#0c4a34] bg-[#d4af37] rounded-full font-medium hover:bg-[#c9a633] transition-colors"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn("transition-opacity duration-1000", isOpen ? "opacity-100" : "opacity-0")}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/aceh-background.jpg"
              alt="Aceh Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a34]/40 to-[#0c4a34]/70"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1 text-sm bg-[#d4af37] text-[#0c4a34] rounded-full">
                Undangan Halal Bihalal
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold mb-4 text-white font-serif"
            >
              Halal Bihalal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl mb-8 text-white/90"
            >
              Keluarga Besar Malabar
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                <span>Minggu, 4 Mei 2025</span>
              </div>

              <div className="hidden md:block w-1 h-1 bg-[#d4af37] rounded-full"></div>

              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-[#d4af37]" />
                <span>09:00 - 15:00 WIB</span>
              </div>

              <div className="hidden md:block w-1 h-1 bg-[#d4af37] rounded-full"></div>

              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
                <span>Gedung Malabar, Banda Aceh</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <Countdown targetDate="2025-05-04T09:00:00" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white animate-bounce" />
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Halal Bihalal</h2>
              <p className="text-lg leading-relaxed mb-6">
                Dengan mengharap ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Halal
                Bihalal Keluarga Besar Malabar yang akan dilaksanakan pada:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 border border-[#d4af37]/30 rounded-lg bg-[#f8f3e9]">
                  <Calendar className="w-8 h-8 mx-auto mb-3 text-[#0c4a34]" />
                  <h3 className="text-lg font-medium mb-1">Tanggal</h3>
                  <p>Minggu, 4 Mei 2025</p>
                </div>

                <div className="p-6 border border-[#d4af37]/30 rounded-lg bg-[#f8f3e9]">
                  <Clock className="w-8 h-8 mx-auto mb-3 text-[#0c4a34]" />
                  <h3 className="text-lg font-medium mb-1">Waktu</h3>
                  <p>09:00 - 15:00 WIB</p>
                </div>

                <div className="p-6 border border-[#d4af37]/30 rounded-lg bg-[#f8f3e9]">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-[#0c4a34]" />
                  <h3 className="text-lg font-medium mb-1">Tempat</h3>
                  <p>Gedung Malabar, Banda Aceh</p>
                </div>
              </div>

              <p className="text-lg italic">"Minal 'Aidin wal Faizin, Mohon Maaf Lahir dan Batin"</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Separator className="mb-12 bg-[#d4af37]/30" />

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#d4af37]">
                  <Image src="/images/malabar-logo.jpg" alt="Malabar Logo" fill className="object-cover" />
                </div>

                <div className="max-w-md text-left">
                  <h3 className="text-2xl font-bold mb-4 font-serif">Keluarga Besar Malabar</h3>
                  <p className="text-lg leading-relaxed mb-4">
                    Malabar adalah sebuah komunitas yang menjunjung tinggi nilai-nilai persaudaraan dan silaturahmi.
                    Kami mengadakan acara Halal Bihalal ini sebagai wujud memperkuat tali persaudaraan dan mempererat
                    silaturahmi antar anggota keluarga besar Malabar.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Kehadiran Bapak/Ibu/Saudara/i akan sangat berarti bagi kami.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Lokasi Acara</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">Gedung Malabar, Jl. Teuku Umar No. 123, Banda Aceh</p>

              <div className="aspect-video rounded-lg overflow-hidden border-4 border-[#d4af37]/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63667.78456841929!2d95.28498755!3d5.5482904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30403700050aaaa7%3A0x8427cb697e62914!2sBanda%20Aceh%2C%20Banda%20Aceh%20City%2C%20Aceh!5e0!3m2!1sen!2sid!4v1682661234567!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <Button
                className="bg-[#0c4a34] hover:bg-[#0a3e2c] text-white"
                onClick={() => window.open("https://goo.gl/maps/1JXzxZyQXJGvBQzbA", "_blank")}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Buka di Google Maps
              </Button>
            </motion.div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="py-20 px-6 bg-[#0c4a34] text-white">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Konfirmasi Kehadiran</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara dengan lebih baik
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className="text-center p-8 bg-white/10 rounded-lg">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center"
                  >
                    <Heart className="w-8 h-8 text-[#0c4a34]" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
                  <p>Konfirmasi kehadiran Anda telah kami terima.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white/10 rounded-lg p-6">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nama Lengkap
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Konfirmasi Kehadiran</label>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={rsvpStatus === "hadir" ? "default" : "outline"}
                        className={
                          rsvpStatus === "hadir"
                            ? "bg-[#d4af37] text-[#0c4a34] hover:bg-[#c9a633] border-[#d4af37]"
                            : "border-white/20 text-white hover:bg-white/10 hover:text-white"
                        }
                        onClick={() => setRsvpStatus("hadir")}
                      >
                        Ya, Saya Akan Hadir
                      </Button>
                      <Button
                        type="button"
                        variant={rsvpStatus === "tidak hadir" ? "default" : "outline"}
                        className={
                          rsvpStatus === "tidak hadir"
                            ? "bg-[#d4af37] text-[#0c4a34] hover:bg-[#c9a633] border-[#d4af37]"
                            : "border-white/20 text-white hover:bg-white/10 hover:text-white"
                        }
                        onClick={() => setRsvpStatus("tidak hadir")}
                      >
                        Maaf, Tidak Bisa Hadir
                      </Button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Pesan (Opsional)
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Tulis pesan atau ucapan Anda"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#d4af37] text-[#0c4a34] hover:bg-[#c9a633]">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Konfirmasi
                  </Button>
                </form>
              )}

              <div className="mt-12">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowRsvpList(!showRsvpList)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {showRsvpList ? "Sembunyikan Daftar Kehadiran" : "Lihat Daftar Kehadiran"}
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showRsvpList ? "rotate-180" : ""}`} />
                </Button>

                {showRsvpList && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 bg-white/10 rounded-lg p-6 overflow-hidden"
                  >
                    <h3 className="text-xl font-medium mb-4">Daftar Kehadiran</h3>
                    <div className="space-y-4">
                      {rsvpList.map((rsvp, index) => (
                        <div key={index} className="p-4 bg-white/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{rsvp.name}</h4>
                            <span
                              className={`text-sm px-2 py-1 rounded ${
                                rsvp.status === "hadir"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {rsvp.status === "hadir" ? "Hadir" : "Tidak Hadir"}
                            </span>
                          </div>
                          <p className="text-sm text-white/80">{rsvp.message}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-[#0a3e2c] text-white/80 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">Keluarga Besar Malabar</h2>
              <p>Terima kasih atas perhatian dan kehadirannya</p>
            </div>

            <Separator className="mb-6 bg-white/20" />

            <p className="text-sm">
              &copy; 2025 Malabar. Dibuat dengan <Heart className="inline-block w-4 h-4 text-red-400" /> untuk acara
              Halal Bihalal.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
