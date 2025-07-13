import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InmoPlus - Tu hogar ideal te espera",
  description:
    "Encuentra las mejores propiedades en venta y alquiler. Más de 10,000 propiedades disponibles con InmoPlus, tu socio de confianza en bienes raíces.",
  keywords: "bienes raíces, propiedades, casas, apartamentos, venta, alquiler, inmobiliaria",
  authors: [{ name: "InmoPlus" }],
  openGraph: {
    title: "InmoPlus - Tu hogar ideal te espera",
    description: "Encuentra las mejores propiedades en venta y alquiler con InmoPlus",
    type: "website",
    locale: "es_ES",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
