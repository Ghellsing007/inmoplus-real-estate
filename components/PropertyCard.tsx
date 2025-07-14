"use client"

import type React from "react"
import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

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
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [localFavorite, setLocalFavorite] = useState<boolean | null>(null)
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Determinar si es favorito (optimista)
  const favorited = localFavorite !== null ? localFavorite : isFavorited(property.id)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      router.push('/login')
      return
    }
    
    setIsLoadingFavorite(true)
    setLocalFavorite(!favorited) // Optimistic UI
    await toggleFavorite(property.id)
    setIsLoadingFavorite(false)
    setLocalFavorite(null) // Volver a depender del hook
  }

  // Determinar si es venta o alquiler basado en el status
  const isForRent = (property.status || "").toLowerCase().includes('rent')
  const operation = isForRent ? "alquiler" : "venta"

  // Usar la primera imagen del array o una imagen por defecto
  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0] 
    : "/images/placeholder.jpg"

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
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
            className={`absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors flex items-center justify-center ${favorited ? "animate-[heartbeat_0.4s]" : ""}`}
            disabled={isLoadingFavorite}
            style={{ minWidth: 40, minHeight: 40 }}
            aria-label={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {isLoadingFavorite ? (
              <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <Heart
                className={`h-5 w-5 transition-colors duration-200 ${favorited ? "text-red-500 fill-current" : "text-gray-600 hover:text-red-500"}`}
                style={{ filter: favorited ? "drop-shadow(0 0 2px #f87171)" : undefined }}
              />
            )}
          </button>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.8em]">{property.title}</h3>
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

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Imagen y badges */}
      <div className="relative aspect-[16/10] w-full bg-gray-100">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <Skeleton className="absolute top-4 right-4 w-10 h-10 rounded-full" />
      </div>
      {/* Contenido */}
      <div className="p-6">
        <div className="mb-3">
          <Skeleton className="h-6 w-3/4 mb-2 rounded" />
          <div className="flex items-center mb-2">
            <Skeleton className="h-4 w-4 mr-1 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-8 rounded" />
          <Skeleton className="h-4 w-8 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <Skeleton className="h-6 w-20 mb-1 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>
    </div>
  )
}
