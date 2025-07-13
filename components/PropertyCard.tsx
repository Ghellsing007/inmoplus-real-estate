"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"
import { useAuth } from "@/hooks/useAuth"

interface PropertyCardProps {
  property: {
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
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { user } = useAuth()
  const { isFavorited, toggleFavorite } = useFavorites()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      // Aquí podrías mostrar un modal de autenticación
      alert('Debes iniciar sesión para agregar favoritos')
      return
    }
    
    await toggleFavorite(property.id)
  }

  // Determinar si es venta o alquiler basado en el status
  const isForRent = property.status.toLowerCase().includes('rent')
  const operation = isForRent ? "alquiler" : "venta"

  // Usar la primera imagen del array o una imagen por defecto
  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0] 
    : "/images/placeholder.jpg"

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={property.title}
            width={400}
            height={250}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={`${operation === "venta" ? "bg-green-500" : "bg-blue-500"} text-white`}>
              {operation === "venta" ? "En Venta" : "En Alquiler"}
            </Badge>
            <Badge className="bg-gray-500 text-white capitalize">
              {property.property_type}
            </Badge>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isFavorited(property.id) ? "text-red-500 fill-current" : "text-gray-600 hover:text-red-500"}`}
            />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area_sq_meters}m²</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text- font-bold text-blue-600">{formatPrice(property.price)}</p>
              {operation === "alquiler" && <p className="text-sm text-gray-500">/mes</p>}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Eye className="h-4 w-4 mr-2" />
              Ver Más
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
