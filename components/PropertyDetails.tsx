"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactAgentForm from "./ContactAgentForm"
import AppointmentScheduler from "./AppointmentScheduler"
import MapWithMarkers from "./MapWithMarkers"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Shield,
  TreePine,
  Heart,
  Share2,
  Calendar,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface PropertyDetailsProps {
  property: any
  agent?: any
}

export default function PropertyDetails({ property, agent }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Galería de imágenes moderna
  const images = property.images && property.images.length > 0 ? property.images : [property.image]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Galería de imágenes */}
      <div className="mb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 md:h-[500px]">
          <Image
            src={images[currentImageIndex] || "/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover transition-all duration-300"
            priority
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto justify-center">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${idx === currentImageIndex ? "border-blue-500" : "border-gray-200"}`}
              >
                <Image src={img || "/placeholder.jpg"} alt={property.title + idx} width={80} height={80} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detalles principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">{property.address || property.location}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Badge className={`${property.operation === "venta" ? "bg-green-500" : "bg-blue-500"} text-white`}>
              {property.operation === "venta" ? "En Venta" : "En Alquiler"}
            </Badge>
            <Badge variant="outline">{property.type}</Badge>
            <span className="text-3xl font-bold text-blue-600">{property.price?.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</span>
            {property.operation === "alquiler" && <span className="text-gray-500">/mes</span>}
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-4 shadow-sm">{property.description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{property.bedrooms} Habitaciones</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{property.bathrooms} Baños</span>
            </div>
            <div className="flex items-center space-x-2">
              <Square className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{property.area} m²</span>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{property.parking ? "Con Parqueo" : "Sin Parqueo"}</span>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Características</h2>
            <div className="flex flex-wrap gap-2">
              {property.features?.map((feature: string, idx: number) => (
                <Badge key={idx} className="bg-blue-100 text-blue-700 border border-blue-300 capitalize">{feature}</Badge>
              ))}
              {property.furnished && <Badge className="bg-green-100 text-green-700 border border-green-300">Amueblado</Badge>}
            </div>
          </div>
        </div>
        {/* Sidebar: Agente y contacto */}
        <div className="space-y-6">
          {agent && (
            <Card>
              <CardHeader>
                <CardTitle>Agente Responsable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={agent.avatar || "/placeholder.svg"}
                    alt={agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.phone}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar Agente
                  </Button>
                  {agent.phone && (
                    <a
                      href={`https://wa.me/${agent.phone.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        type="button"
                        className="w-full bg-green-500 hover:bg-green-600 text-white mt-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4 mr-2"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.484 7.13L4.062 29.25a1 1 0 0 0 1.312 1.312l7.12-2.422A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.5-.36-5.09-1.07a1 1 0 0 0-.74-.05l-5.13 1.75 1.75-5.13a1 1 0 0 0-.05-.74A9.96 9.96 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.26-.13-1.53-.76-1.77-.85-.24-.09-.42-.13-.6.13-.18.26-.69.85-.85 1.03-.16.18-.31.2-.57.07-.26-.13-1.09-.4-2.08-1.28-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.29.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47-.16-.01-.32-.01-.5-.01-.18 0-.46.07-.7.32-.24.25-.92.9-.92 2.2s.94 2.56 1.07 2.74c.13.18 1.85 2.83 4.5 3.86.63.22 1.12.35 1.5.45.63.16 1.2.14 1.65.09.5-.06 1.53-.62 1.75-1.22.22-.6.22-1.12.16-1.22-.06-.1-.24-.16-.5-.29z"/></svg>
                        WhatsApp
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {/* Modal de contacto */}
      {showContactForm && agent && (
        <ContactAgentForm
          propertyId={property.id}
          agentId={agent.id}
          agentEmail={agent.email}
          propertyTitle={property.title}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  )
}
