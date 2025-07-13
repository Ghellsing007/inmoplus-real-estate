// Global Types for InmoPlus
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "client" | "agent" | "admin"
  avatar?: string
  createdAt: string
}

export interface Property {
  id: string
  title: string
  price: number
  location: string
  city: string
  address: string
  image: string
  images: string[]
  bedrooms: number
  bathrooms: number
  area: number
  type: "casa" | "apartamento" | "oficina" | "local" | "terreno"
  operation: "venta" | "alquiler"
  description: string
  features: string[]
  furnished: boolean
  parking: boolean
  agentId: string
  coordinates: {
    lat: number
    lng: number
  }
  featured?: boolean
  createdAt: string
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  specialization: string
  rating: number
  reviews: number
  propertiesCount: number
}

export interface Appointment {
  id: string
  propertyId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  message?: string
  status: "pending" | "confirmed" | "cancelled"
}

export interface ContactMessage {
  id: string
  propertyId: string
  agentId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  message: string
  createdAt: string
}

export interface Filters {
  city: string
  type: string
  operation: "venta" | "alquiler" | "all"
  priceRange: [number, number]
  bedrooms: string
  bathrooms: string
  area: [number, number]
  furnished: boolean
  parking: boolean
  features: string[]
}
