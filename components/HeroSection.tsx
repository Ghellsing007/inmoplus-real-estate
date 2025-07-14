"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, DollarSign } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

export default function HeroSection() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    priceRange: searchParams.get("priceRange") || "",
    operation: searchParams.get("operation") || "venta",
  })

  // Estado para los tipos de propiedad dinámicos
  const [propertyTypes, setPropertyTypes] = useState<{ value: string, label: string }[]>([])
  useEffect(() => {
    async function fetchPropertyTypes() {
      const { data, error } = await supabase
        .from('properties')
        .select('property_type')
        .neq('property_type', null)
        .neq('property_type', '')
        .order('property_type', { ascending: true })
      if (!error && data) {
        // Extraer únicos y formatear
        const uniqueTypes = Array.from(new Set(data.map((d: any) => d.property_type)))
        setPropertyTypes(uniqueTypes.map((type: string) => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) })))
      }
    }
    fetchPropertyTypes()
  }, [])

  // Opciones válidas para los filtros
  const operations = [
    { value: "venta", label: "Venta" },
    { value: "alquiler", label: "Alquiler" }
  ];

  const priceRanges = [
    { value: "0-100000", label: "$0 - $100,000" },
    { value: "100000-300000", label: "$100,000 - $300,000" },
    { value: "300000-500000", label: "$300,000 - $500,000" },
    { value: "500000-1000000", label: "$500,000 - $1,000,000" },
    { value: "1000000+", label: "$1,000,000+" }
  ];

  // Depuración: loguear cada vez que cambian los selects
  const logSelects = (field: string, value: string) => {
    console.log(`Cambio en ${field}:`, value)
  }

  // Autocompletado ubicación
  const [localLocation, setLocalLocation] = useState(searchData.location)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationOptions, setLocationOptions] = useState<string[]>([])
  const locationTimeout = useRef<NodeJS.Timeout | null>(null)

  // Sincronizar local <-> global
  useEffect(() => {
    setLocalLocation(searchData.location)
  }, [searchData.location])

  // Handler para input de ubicación
  const handleLocationInput = (value: string) => {
    setLocalLocation(value)
    setLocationLoading(true)
    setLocationOptions([])
    if (locationTimeout.current) clearTimeout(locationTimeout.current)
    locationTimeout.current = setTimeout(async () => {
      if (!value.trim()) {
        setLocationOptions([])
        setLocationLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('properties')
        .select('city')
        .ilike('city', `%${value}%`)
        .limit(5)
      if (!error && data) {
        const unique = Array.from(new Set(data.map((d: any) => d.city).filter(Boolean)))
        setLocationOptions(unique)
      } else {
        setLocationOptions([])
      }
      setLocationLoading(false)
    }, 400)
  }
  const commitLocation = (value?: string) => {
    setSearchData(sd => ({ ...sd, location: value !== undefined ? value : localLocation }))
    setLocationOptions([])
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
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto text-gray-900">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {operations.map((op) => (
              <Button
                key={op.value}
                variant={searchData.operation === op.value ? "default" : "outline"}
                onClick={() => setSearchData({ ...searchData, operation: op.value })}
                className={`flex-1 ${searchData.operation === op.value ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-600 hover:bg-blue-50"}`}
              >
                {op.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Ciudad, barrio o zona"
                value={localLocation}
                onChange={e => handleLocationInput(e.target.value)}
                onBlur={() => commitLocation()}
                onKeyDown={e => e.key === 'Enter' && commitLocation()}
                autoComplete="off"
                className="pl-10 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {locationLoading && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow z-10 p-2 text-sm text-gray-500">
                  <Skeleton className="h-4 w-1/2 mb-1" /> Cargando...
                </div>
              )}
              {!locationLoading && locationOptions.length > 0 && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow z-10">
                  {locationOptions.map((opt, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onMouseDown={() => commitLocation(opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Select
              value={searchData.propertyType}
              onValueChange={(value) => {
                logSelects('propertyType', value);
                setSearchData({ ...searchData, propertyType: value });
              }}
            >
              <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 flex gap-2 items-center text-gray-900">
                <Home className="h-5 w-5 text-gray-400" />
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={searchData.priceRange}
              onValueChange={(value) => {
                logSelects('priceRange', value);
                setSearchData({ ...searchData, priceRange: value });
              }}
            >
              <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 flex gap-2 items-center text-gray-900">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                ))}
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
