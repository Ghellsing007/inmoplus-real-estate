"use client"

import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import PropertyGrid from "@/components/PropertyGrid"
import Footer from "@/components/Footer"

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  
  // Extraer parámetros de búsqueda del HeroSection
  const initialFilters = {
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") ? [searchParams.get("propertyType")!] : [],
    priceRange: searchParams.get("priceRange") ? parsePriceRange(searchParams.get("priceRange")!) : [0, 1000000],
    operation: searchParams.get("operation") || "all",
  }

  function parsePriceRange(priceRange: string): [number, number] {
    if (priceRange === "1000000+") return [1000000, 10000000]
    const [min, max] = priceRange.split("-").map(Number)
    return [min, max]
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Todas las Propiedades</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora nuestra completa base de datos de propiedades disponibles para compra y alquiler
            </p>
          </div>
        </div>
        <PropertyGrid initialFilters={initialFilters} />
      </div>
      <Footer />
    </div>
  )
}
