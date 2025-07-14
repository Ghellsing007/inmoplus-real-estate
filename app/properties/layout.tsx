import type { Metadata } from "next"
import { branding } from "@/lib/branding"

export const metadata: Metadata = {
  title: `Propiedades - ${branding.appName}`,
  description: `Explora nuestra amplia selección de propiedades en venta y alquiler. Encuentra tu hogar ideal con ${branding.appName}.`,
  keywords: `propiedades, inmobiliaria, casas, apartamentos, venta, alquiler, ${branding.appName}`,
  openGraph: {
    title: `Propiedades - ${branding.appName}`,
    description: "Explora nuestra amplia selección de propiedades en venta y alquiler.",
    type: "website",
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 