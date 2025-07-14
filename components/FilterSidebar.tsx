"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface FilterSidebarProps {
  filters: any
  setFilters: (filters: any) => void
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  // Estado para los tipos de propiedad dinámicos
  const [propertyTypes, setPropertyTypes] = useState<{ id: string, label: string }[]>([])
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
        setPropertyTypes(uniqueTypes.map((type: string) => ({ id: type, label: type.charAt(0).toUpperCase() + type.slice(1) })))
      }
    }
    fetchPropertyTypes()
  }, [])

  const features = [
    { id: "garage", label: "Garaje" },
    { id: "garden", label: "Jardín" },
    { id: "pool", label: "Piscina" },
    { id: "balcony", label: "Balcón" },
    { id: "elevator", label: "Ascensor" },
    { id: "security", label: "Seguridad 24h" },
    { id: "fireplace", label: "Chimenea" },
    { id: "mountain-view", label: "Vista a la montaña" },
    { id: "forest-view", label: "Vista al bosque" },
    { id: "lake-view", label: "Vista al lago" },
  ]

  const clearFilters = () => {
    setFilters({
      operation: "all",
      propertyType: [],
      priceRange: [0, 1000000],
      bedrooms: "any",
      bathrooms: "any",
      area: [0, 500],
      location: "",
      features: [],
    })
  }

  // Rangos predefinidos para precio y área
  const priceRanges = [
    { value: "0-100000", label: "$0 - $100,000" },
    { value: "100000-300000", label: "$100,000 - $300,000" },
    { value: "300000-500000", label: "$300,000 - $500,000" },
    { value: "500000-1000000", label: "$500,000 - $1,000,000" },
    { value: "1000000-10000000", label: "$1,000,000+" },
    { value: "custom", label: "Personalizado" },
  ]
  const areaRanges = [
    { value: "0-50", label: "0 - 50 m²" },
    { value: "50-100", label: "50 - 100 m²" },
    { value: "100-200", label: "100 - 200 m²" },
    { value: "200-500", label: "200 - 500 m²" },
    { value: "500-10000", label: "500+ m²" },
    { value: "custom", label: "Personalizado" },
  ]
  // Estado local para selects
  const [selectedPriceRange, setSelectedPriceRange] = useState("custom")
  const [selectedAreaRange, setSelectedAreaRange] = useState("custom")

  // Sincronizar selects con inputs
  useEffect(() => {
    // Precio
    const pr = priceRanges.find(r => r.value !== "custom" && r.value === selectedPriceRange)
    if (pr) {
      const [min, max] = pr.value.split("-").map(Number)
      setFilters(f => ({ ...f, priceRange: [min, max] }))
    }
    // Área
    const ar = areaRanges.find(r => r.value !== "custom" && r.value === selectedAreaRange)
    if (ar) {
      const [min, max] = ar.value.split("-").map(Number)
      setFilters(f => ({ ...f, area: [min, max] }))
    }
  }, [selectedPriceRange, selectedAreaRange])

  // Estados locales para inputs
  const [localPrice, setLocalPrice] = useState<[string, string]>([filters.priceRange[0].toString(), filters.priceRange[1].toString()])
  const [localArea, setLocalArea] = useState<[string, string]>([filters.area[0].toString(), filters.area[1].toString()])
  const [localLocation, setLocalLocation] = useState(filters.location)
  // Autocompletado ubicación
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationOptions, setLocationOptions] = useState<string[]>([])
  const locationTimeout = useRef<NodeJS.Timeout | null>(null)

  // Sincronizar local <-> global
  useEffect(() => {
    setLocalPrice([filters.priceRange[0].toString(), filters.priceRange[1].toString()])
  }, [filters.priceRange])
  useEffect(() => {
    setLocalArea([filters.area[0].toString(), filters.area[1].toString()])
  }, [filters.area])
  useEffect(() => {
    setLocalLocation(filters.location)
  }, [filters.location])

  // Handler para inputs de precio
  const handlePriceInput = (idx: 0 | 1, value: string) => {
    setLocalPrice(prev => {
      const arr = [...prev]
      arr[idx] = value
      return arr as [string, string]
    })
  }
  const commitPrice = () => {
    const min = Number(localPrice[0]) || 0
    const max = Number(localPrice[1]) || 10000000
    setFilters(f => ({ ...f, priceRange: [min, max] }))
  }
  // Handler para inputs de área
  const handleAreaInput = (idx: 0 | 1, value: string) => {
    setLocalArea(prev => {
      const arr = [...prev]
      arr[idx] = value
      return arr as [string, string]
    })
  }
  const commitArea = () => {
    const min = Number(localArea[0]) || 0
    const max = Number(localArea[1]) || 10000
    setFilters(f => ({ ...f, area: [min, max] }))
  }
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
    setFilters(f => ({ ...f, location: value !== undefined ? value : localLocation }))
    setLocationOptions([])
  }

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Operation Type */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Tipo de Operación</Label>
          <Select value={filters.operation} onValueChange={(value) => setFilters({ ...filters, operation: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="venta">En Venta</SelectItem>
              <SelectItem value="alquiler">En Alquiler</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Location */}
        <div className="relative">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Ubicación</Label>
          <Input
            placeholder="Ciudad, barrio o zona"
            value={localLocation}
            onChange={e => handleLocationInput(e.target.value)}
            onBlur={() => commitLocation()}
            onKeyDown={e => e.key === 'Enter' && commitLocation()}
            autoComplete="off"
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
        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Tipo de Propiedad</Label>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={filters.propertyType.includes(type.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters({
                        ...filters,
                        propertyType: [...filters.propertyType, type.id],
                      })
                    } else {
                      setFilters({
                        ...filters,
                        propertyType: filters.propertyType.filter((t: string) => t !== type.id),
                      })
                    }
                  }}
                />
                <Label htmlFor={type.id} className="text-sm text-gray-600">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Rango de Precio</Label>
          <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rango" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              min={0}
              max={10000000}
              value={localPrice[0]}
              onChange={e => handlePriceInput(0, e.target.value)}
              onBlur={commitPrice}
              onKeyDown={e => e.key === 'Enter' && commitPrice()}
              className="w-1/2"
              placeholder="Mínimo"
            />
            <Input
              type="number"
              min={0}
              max={10000000}
              value={localPrice[1]}
              onChange={e => handlePriceInput(1, e.target.value)}
              onBlur={commitPrice}
              onKeyDown={e => e.key === 'Enter' && commitPrice()}
              className="w-1/2"
              placeholder="Máximo"
            />
          </div>
        </div>
        {/* Bedrooms */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Habitaciones</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquiera</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Bathrooms */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Baños</Label>
          <Select value={filters.bathrooms} onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquiera</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Área */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Área (m²)</Label>
          <Select value={selectedAreaRange} onValueChange={setSelectedAreaRange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rango" />
            </SelectTrigger>
            <SelectContent>
              {areaRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              min={0}
              max={10000}
              value={localArea[0]}
              onChange={e => handleAreaInput(0, e.target.value)}
              onBlur={commitArea}
              onKeyDown={e => e.key === 'Enter' && commitArea()}
              className="w-1/2"
              placeholder="Mínimo"
            />
            <Input
              type="number"
              min={0}
              max={10000}
              value={localArea[1]}
              onChange={e => handleAreaInput(1, e.target.value)}
              onBlur={commitArea}
              onKeyDown={e => e.key === 'Enter' && commitArea()}
              className="w-1/2"
              placeholder="Máximo"
            />
          </div>
        </div>
        {/* Features */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Características</Label>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.id}
                  checked={filters.features.includes(feature.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters({
                        ...filters,
                        features: [...filters.features, feature.id],
                      })
                    } else {
                      setFilters({
                        ...filters,
                        features: filters.features.filter((f) => f !== feature.id),
                      })
                    }
                  }}
                />
                <Label htmlFor={feature.id} className="text-sm text-gray-600">
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        {/* Apply Filters Button (opcional, filtros aplican en tiempo real) */}
        {/* <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Aplicar Filtros</Button> */}
      </CardContent>
    </Card>
  )
}
