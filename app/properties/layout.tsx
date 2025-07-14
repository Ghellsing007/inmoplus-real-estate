import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Propiedades - InmoPlus",
  description: "Explora nuestra amplia selección de propiedades en venta y alquiler. Encuentra tu hogar ideal con InmoPlus.",
  keywords: "propiedades, inmobiliaria, casas, apartamentos, venta, alquiler, InmoPlus",
  openGraph: {
    title: "Propiedades - InmoPlus",
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