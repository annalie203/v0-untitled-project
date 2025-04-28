"use client"

import { useState } from "react"
import { HalalBihalalCard } from "@/components/halal-bihalal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Mail, Smartphone } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function HalalBihalalPage() {
  // Daftar nama dan email penerima undangan
  const [recipients, setRecipients] = useState([
    { name: "Bapak Joko Widodo", email: "joko@example.com", phone: "08123456789" },
    { name: "Ibu Siti Nurhaliza", email: "siti@example.com", phone: "08123456790" },
    { name: "Bapak Anies Baswedan", email: "anies@example.com", phone: "08123456791" },
    { name: "Keluarga Bapak Ridwan Kamil", email: "ridwan@example.com", phone: "08123456792" },
    { name: "Bapak Sandiaga Uno", email: "sandiaga@example.com", phone: "08123456793" },
    { name: "Ibu Mega Wati", email: "mega@example.com", phone: "08123456794" },
    { name: "Keluarga Bapak Prabowo", email: "prabowo@example.com", phone: "08123456795" },
    { name: "Bapak Ganjar Pranowo", email: "ganjar@example.com", phone: "08123456796" },
    { name: "Ibu Tri Rismaharini", email: "risma@example.com", phone: "08123456797" },
    { name: "Keluarga Bapak Nadiem Makarim", email: "nadiem@example.com", phone: "08123456798" },
  ])

  // Nama dan email baru untuk ditambahkan
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")

  // Base URL untuk undangan (dalam produksi, ini adalah URL website Anda)
  const baseUrl = "https://undangan-halal-bihalal.vercel.app/invite"

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

  // Mendapatkan URL undangan untuk penerima tertentu
  const getInvitationUrl = (name: string) => {
    // Encode nama untuk URL
    const encodedName = encodeURIComponent(name)
    return `${baseUrl}?name=${encodedName}`
  }

  // Menyalin URL undangan ke clipboard
  const copyInvitationUrl = (name: string) => {
    const url = getInvitationUrl(name)
    navigator.clipboard.writeText(url)
    toast({
      title: "URL disalin",
      description: `URL undangan untuk ${name} telah disalin ke clipboard.`,
    })
  }

  // Simulasi pengiriman email
  const sendEmail = (recipient: { name: string; email: string }) => {
    const url = getInvitationUrl(recipient.name)
    // Dalam aplikasi nyata, ini akan memanggil API untuk mengirim email
    toast({
      title: "Email terkirim",
      description: `Undangan telah dikirim ke ${recipient.email} untuk ${recipient.name}.`,
    })
  }

  // Simulasi pengiriman WhatsApp
  const sendWhatsApp = (recipient: { name: string; phone: string }) => {
    const url = getInvitationUrl(recipient.name)
    const message = `Assalamu'alaikum Wr. Wb.\n\nDengan hormat, kami mengundang ${recipient.name} untuk hadir pada acara Halal Bihalal keluarga besar kami.\n\nSilakan buka undangan digital di link berikut:\n${url}\n\nTerima kasih.`

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

  // Simulasi pengiriman semua undangan
  const sendAllInvitations = (method: "email" | "whatsapp") => {
    if (method === "email") {
      recipients.forEach((recipient) => {
        if (recipient.email) {
          sendEmail(recipient)
        }
      })
      toast({
        title: "Semua email terkirim",
        description: `${recipients.filter((r) => r.email).length} undangan telah dikirim melalui email.`,
      })
    } else {
      toast({
        title: "Persiapan pengiriman WhatsApp",
        description: "Anda perlu mengirim pesan WhatsApp satu per satu.",
      })
    }
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

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => sendAllInvitations("email")} className="bg-emerald-600 hover:bg-emerald-700">
            <Mail className="mr-2 h-4 w-4" />
            Kirim Semua via Email
          </Button>
          <Button onClick={() => sendAllInvitations("whatsapp")} className="bg-emerald-600 hover:bg-emerald-700">
            <Smartphone className="mr-2 h-4 w-4" />
            Siapkan Pesan WhatsApp
          </Button>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 font-serif text-xl font-medium text-emerald-800">Cara Kerja Undangan Personalisasi</h2>

        <div className="mb-4 space-y-4">
          <div className="rounded-lg bg-emerald-50 p-4">
            <h3 className="mb-2 font-medium text-emerald-800">1. Sistem URL Parameter</h3>
            <p className="text-emerald-700">
              Setiap undangan memiliki URL unik dengan parameter nama penerima, contoh:
              <code className="mx-1 rounded bg-white px-2 py-1 text-sm">
                https://undangan.com/invite?name=Bapak%20Joko%20Widodo
              </code>
            </p>
          </div>

          <div className="rounded-lg bg-emerald-50 p-4">
            <h3 className="mb-2 font-medium text-emerald-800">2. Pengiriman Undangan</h3>
            <p className="text-emerald-700">Undangan dapat dikirim melalui berbagai cara:</p>
            <ul className="ml-5 mt-2 list-disc text-emerald-700">
              <li>Email (dengan link personalisasi)</li>
              <li>WhatsApp (dengan pesan dan link personalisasi)</li>
              <li>SMS (dengan link personalisasi)</li>
              <li>QR Code (yang mengarah ke link personalisasi)</li>
            </ul>
          </div>

          <div className="rounded-lg bg-emerald-50 p-4">
            <h3 className="mb-2 font-medium text-emerald-800">3. Penerimaan Undangan</h3>
            <p className="text-emerald-700">
              Ketika penerima mengklik link atau memindai QR code, mereka akan diarahkan ke halaman undangan dengan nama
              mereka yang sudah terisi otomatis.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 font-serif text-xl font-medium text-emerald-800">Contoh Halaman Penerima</h2>

        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Pratinjau Undangan</TabsTrigger>
            <TabsTrigger value="code">Kode Halaman Penerima</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            <div className="flex justify-center">
              <HalalBihalalCard recipientName="Bapak Joko Widodo" />
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-4">
            <div className="rounded-lg bg-gray-900 p-4 text-sm text-white">
              <pre>{`// File: app/invite/page.tsx
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
}`}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Toaster />
    </div>
  )
}
