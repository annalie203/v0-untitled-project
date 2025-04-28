"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

interface QRCodeGeneratorProps {
  recipientName: string
  baseUrl: string
}

export function QRCodeGenerator({ recipientName, baseUrl }: QRCodeGeneratorProps) {
  const [size, setSize] = useState(200)

  // Mendapatkan URL undangan untuk penerima tertentu
  const getInvitationUrl = (name: string) => {
    // Encode nama untuk URL
    const encodedName = encodeURIComponent(name)
    return `${baseUrl}?name=${encodedName}`
  }

  const invitationUrl = getInvitationUrl(recipientName)

  // Fungsi untuk mengunduh QR Code sebagai PNG
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `qrcode-${recipientName.replace(/\s+/g, "-")}.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-emerald-800">QR Code Undangan</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-4">
          <QRCodeSVG
            id="qr-svg"
            value={invitationUrl}
            size={size}
            bgColor="#ffffff"
            fgColor="#059669"
            level="H"
            includeMargin={true}
          />
          <canvas id="qr-canvas" style={{ display: "none" }} />
        </div>

        <div className="mb-4 w-full">
          <Label htmlFor="qr-size">Ukuran QR Code</Label>
          <Input
            id="qr-size"
            type="range"
            min="100"
            max="400"
            step="10"
            value={size}
            onChange={(e) => setSize(Number.parseInt(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 text-center text-sm text-emerald-600">{size}px</div>
        </div>

        <Button onClick={downloadQRCode} className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="mr-2 h-4 w-4" />
          Unduh QR Code
        </Button>

        <div className="mt-4 text-center text-sm text-emerald-600">
          <p>QR Code untuk: {recipientName}</p>
          <p className="mt-1 text-xs">URL: {invitationUrl}</p>
        </div>
      </CardContent>
    </Card>
  )
}
