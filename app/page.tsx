"use client"

import { useState } from "react"
import { HalalBihalalCard } from "@/components/halal-bihalal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Mail, Smartphone, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"

export default function HalalBihalalPage() {
  // Daftar nama dan email penerima undangan
  const [recipients, setRecipients] = useState([
    { name: "Bapak Joko Widodo", email: "joko@example.com", phone: "08123456789" },
    { name: "Ibu Siti Nurhaliza", email: "siti@example.com", phone: "08123456790" },
    { name: "Bapak Anies Baswedan", email: "anies@example.com", phone: "08123456791" },
    { name: "Keluarga Bapak Ridwan Kamil", email: "ridwan@example.com", phone: "08123456792" },
    { name: "Bapak Sandiaga Uno", email: "sandiaga@example.com", phone: "08123456793" },
  ])

  // Nama dan email baru untuk ditambahkan
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")

  // Menambahkan penerima baru ke daftar
  const addRecipient = () => {
    if (newName.trim() && (newEmail.trim() || newPhone.trim())) {
      setRecipients([
        ...recipients,
        {
          name: newName.trim(),
          email: newEmail.trim(),
          phone: newPhone.trim(),
        },
      ])
      setNewName("")
      setNewEmail("")
      setNewPhone("")
      toast({
        title: "Penerima ditambahkan",
        description: `${newName} telah ditambahkan ke daftar penerima.`,
      })
    } else {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi nama dan email atau nomor telepon.",
        variant: "destructive",
      })
    }
  }

  // Menyalin URL undangan ke clipboard
  const copyInvitationUrl = (name: string) => {
    // Gunakan URL relatif untuk pengujian lokal
    const url = `/undangan?nama=${encodeURIComponent(name)}`
    navigator.clipboard.writeText(window.location.origin + url)
    toast({
      title: "URL disalin",
      description: `URL undangan untuk ${name} telah disalin ke clipboard.`,
    })
  }

  // Simulasi pengiriman email
  const sendEmail = (recipient: { name: string; email: string }) => {
    const url = `/undangan?nama=${encodeURIComponent(recipient.name)}`
    // Dalam aplikasi nyata, ini akan memanggil API untuk mengirim email
    toast({
      title: "Email terkirim",
      description: `Undangan telah dikirim ke ${recipient.email} untuk ${recipient.name}.`,
    })
  }

  // Simulasi pengiriman WhatsApp
  const sendWhatsApp = (recipient: { name: string; phone: string }) => {
    const url = `/undangan?nama=${encodeURIComponent(recipient.name)}`
    const fullUrl = window.location.origin + url
    const message = `Assalamu'alaikum Wr. Wb.\n\nDengan hormat, kami mengundang ${recipient.name} untuk hadir pada acara Halal Bihalal keluarga besar kami.\n\nSilakan buka undangan digital di link berikut:\n${fullUrl}\n\nTerima kasih.`

    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${recipient.phone.replace(/^0/, "62")}?text=${encodedMessage}`

    // Buka URL WhatsApp di tab baru
    window.open(whatsappUrl, "_blank")

    toast({
      title: "WhatsApp dibuka",
      description: `Pesan WhatsApp untuk ${recipient.name} telah disiapkan.`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-serif text-3xl font-bold text-emerald-800">Pengiriman Undangan Halal Bihalal</h1>
        <p className="text-emerald-600">Kirim undangan halal bihalal dengan nama penerima yang dipersonalisasi</p>
      </div>

      <div className="mb-8 rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 font-serif text-xl font-medium text-emerald-800">Kelola Daftar Penerima</h2>

        <div className="mb-4 grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="newName">Nama Penerima</Label>
            <Input
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Masukkan nama penerima"
              className="border-emerald-200"
            />
          </div>
          <div>
            <Label htmlFor="newEmail">Email</Label>
            <Input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="email@example.com"
              className="border-emerald-200"
            />
          </div>
          <div>
            <Label htmlFor="newPhone">Nomor WhatsApp</Label>
            <Input
              id="newPhone"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="08123456789"
              className="border-emerald-200"
            />
          </div>
        </div>

        <Button onClick={addRecipient} className="mb-4 bg-emerald-600 hover:bg-emerald-700">
          Tambah Penerima
        </Button>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-emerald-200 bg-emerald-50 text-left">
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Email</th>
                <th className="p-2">WhatsApp</th>
                <th className="p-2">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient, index) => (
                <tr key={index} className="border-b border-emerald-100">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{recipient.name}</td>
                  <td className="p-2">{recipient.email || "-"}</td>
                  <td className="p-2">{recipient.phone || "-"}</td>
                  <td className="p-2 space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyInvitationUrl(recipient.name)}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Link href={`/undangan?nama=${encodeURIComponent(recipient.name)}`} target="_blank">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    {recipient.email && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendEmail(recipient)}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                    {recipient.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendWhatsApp(recipient)}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 font-serif text-xl font-medium text-emerald-800">Contoh Undangan</h2>
        <div className="flex justify-center">
          <HalalBihalalCard recipientName="Contoh Penerima" />
        </div>
      </div>

      <Toaster />
    </div>
  )
}
