"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

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
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Ubicación</Label>
          <Input
            placeholder="Ciudad, barrio o zona"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
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
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              max={1000000}
              min={0}
              step={10000}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
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
        {/* Area */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Área (m²)</Label>
          <div className="px-2">
            <Slider
              value={filters.area}
              onValueChange={(value) => setFilters({ ...filters, area: value })}
              max={500}
              min={0}
              step={10}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filters.area[0]}m²</span>
              <span>{filters.area[1]}m²</span>
            </div>
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
