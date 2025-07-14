"use client"

import { useState, useEffect } from "react"
import PropertyCard, { PropertyCardSkeleton } from "./PropertyCard"
import FilterSidebar from "./FilterSidebar"
import { Button } from "@/components/ui/button"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { propertyService } from "@/lib/services"

interface Property {
  id: string
  title: string
  price: number
  location: string
  city: string
  address: string
  state?: string
  zip_code?: string
  country?: string
  property_type: string
  status: string
  bedrooms: number
  bathrooms: number
  area_sq_meters: number
  year_built?: number
  description: string
  features: string[]
  amenities: string[]
  images: string[]
  agent_id: string
  created_at: string
  updated_at: string
}

interface PropertyGridProps {
  initialFilters?: {
    location?: string
    propertyType?: string[]
    priceRange?: [number, number]
    operation?: string
  }
}

export default function PropertyGrid({ initialFilters }: PropertyGridProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    operation: initialFilters?.operation || "all",
    propertyType: initialFilters?.propertyType || [],
    priceRange: initialFilters?.priceRange || [0, 1000000],
    bedrooms: "any",
    bathrooms: "any",
    area: [0, 500],
    location: initialFilters?.location || "",
    features: [],
  })

  // Cargar propiedades desde Supabase con filtros
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true)
      try {
        // Mapear los filtros del sidebar a los filtros del servicio
        const mappedFilters: any = {}
        if (filters.location) mappedFilters.city = filters.location
        if (filters.propertyType.length > 0) mappedFilters.property_type = filters.propertyType // Enviar el array completo
        if (filters.operation !== "all") mappedFilters.operation = filters.operation
        if (filters.priceRange) {
          mappedFilters.minPrice = filters.priceRange[0]
          mappedFilters.maxPrice = filters.priceRange[1]
        }
        if (filters.bedrooms !== "any") mappedFilters.bedrooms = Number(filters.bedrooms)
        if (filters.bathrooms !== "any") mappedFilters.bathrooms = Number(filters.bathrooms)
        if (filters.area) {
          mappedFilters.minArea = filters.area[0]
          mappedFilters.maxArea = filters.area[1]
        }
        
        console.log('Estado de filters en PropertyGrid:', filters)
        console.log('mappedFilters enviados al servicio:', mappedFilters)
        const propertiesData = await propertyService.getPropertiesWithFilters(mappedFilters)
        console.log('Propiedades obtenidas:', propertiesData)
        setProperties(propertiesData)
      } catch (error) {
        console.error('Error cargando propiedades:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProperties()
  }, [filters])

  if (loading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Propiedades Destacadas</h2>
            <p className="text-xl text-gray-600">Cargando las mejores propiedades para ti...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Propiedades Destacadas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección de las mejores propiedades disponibles en el mercado
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <p className="text-gray-600">{properties.length} propiedades encontradas</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            <div
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Cargar más propiedades</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
