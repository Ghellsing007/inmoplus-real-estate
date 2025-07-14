import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { branding } from "@/lib/branding"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: branding.appName,
  description: branding.metaDescription,
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
      <head>
        <title>{branding.appName}</title>
        <meta name="description" content={branding.metaDescription} />
        <link rel="icon" href={branding.favicon} />
      </head>
      <body style={{ '--color-primary': branding.primaryColor } as any}>
        {children}
      </body>
    </html>
  )
}
