"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, DollarSign } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    priceRange: searchParams.get("priceRange") || "",
    operation: searchParams.get("operation") || "venta",
  })

  // Depuración: loguear cada vez que cambian los selects
  const logSelects = (field: string, value: string) => {
    console.log(`Cambio en ${field}:`, value)
  }

  const handleSearch = () => {
    // Depuración: loguear el estado antes de enviar
    console.log('Datos a enviar:', searchData)
    // Construir URL con parámetros de búsqueda
    const params = new URLSearchParams()
    
    if (searchData.location) params.append("location", searchData.location)
    if (searchData.propertyType) params.append("propertyType", searchData.propertyType)
    if (searchData.priceRange) params.append("priceRange", searchData.priceRange)
    if (searchData.operation) params.append("operation", searchData.operation)
    
    // Redirigir a la página de propiedades con filtros
    const searchUrl = `/properties?${params.toString()}`
    router.push(searchUrl)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Depuración: loguear el estado completo antes del render
  console.log("Estado completo:", searchData);

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/plaza-espana.jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-blue-900/70"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Encuentra tu
            <span className="block text-blue-200">hogar ideal</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Descubre propiedades únicas en todo el mundo con InmoPlus. Desde villas mediterráneas hasta cabañas
            rústicas, tu hogar ideal te está esperando.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <Button
              variant={searchData.operation === "venta" ? "default" : "outline"}
              onClick={() => setSearchData({ ...searchData, operation: "venta" })}
              className={`flex-1 ${searchData.operation === "venta" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-600 hover:bg-blue-50"}`}
            >
              Comprar
            </Button>
            <Button
              variant={searchData.operation === "alquiler" ? "default" : "outline"}
              onClick={() => setSearchData({ ...searchData, operation: "alquiler" })}
              className={`flex-1 ${searchData.operation === "alquiler" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-600 hover:bg-blue-50"}`}
            >
              Alquilar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Ciudad o ubicación"
                value={searchData.location}
                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Select
              value={searchData.propertyType}
              onValueChange={(value) => {
                logSelects('propertyType', value);
                setSearchData({ ...searchData, propertyType: value })
              }}
            >
              <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                <Home className="h-5 w-5 text-gray-400 mr-2" />
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="local">Local Comercial</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={searchData.priceRange}
              onValueChange={(value) => {
                logSelects('priceRange', value);
                setSearchData({ ...searchData, priceRange: value })
              }}
            >
              <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100000">$0 - $100,000</SelectItem>
                <SelectItem value="100000-300000">$100,000 - $300,000</SelectItem>
                <SelectItem value="300000-500000">$300,000 - $500,000</SelectItem>
                <SelectItem value="500000-1000000">$500,000 - $1,000,000</SelectItem>
                <SelectItem value="1000000+">$1,000,000+</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="text-center text-gray-600">
            <p className="text-sm">
              Más de <span className="font-semibold text-blue-600">15,000 propiedades</span> disponibles en 25+ países
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
