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
  property: {
    id: string
    title: string
    price: number
    location: string
    address: string
    images: string[]
    bedrooms: number
    bathrooms: number
    area: number
    type: string
    operation: "venta" | "alquiler"
    description: string
    features: string[]
    furnished: boolean
    parking: boolean
    coordinates: {
      lat: number
      lng: number
    }
    agent: {
      id: string
      name: string
      phone: string
      email: string
      avatar: string
    }
  }
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const featureIcons: { [key: string]: any } = {
    garage: Car,
    wifi: Wifi,
    security: Shield,
    garden: TreePine,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{property.address}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Badge className={`${property.operation === "venta" ? "bg-green-500" : "bg-blue-500"} text-white`}>
            {property.operation === "venta" ? "En Venta" : "En Alquiler"}
          </Badge>
          <Badge variant="outline">{property.type}</Badge>
          <div className="text-3xl font-bold text-blue-600">{formatPrice(property.price)}</div>
          {property.operation === "alquiler" && <span className="text-gray-500">/mes</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative mb-8">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            {property.images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info Tabs */}
          <Tabs defaultValue="details" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="location">Ubicación</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Características Adicionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => {
                      const IconComponent = featureIcons[feature] || Shield
                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                          <span className="capitalize">{feature}</span>
                        </div>
                      )
                    })}
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>{property.furnished ? "Amueblado" : "Sin Amueblar"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded-lg overflow-hidden mb-4">
                    <MapWithMarkers
                      locations={[
                        {
                          lat: property.coordinates.lat,
                          lng: property.coordinates.lng,
                          id: property.id,
                        },
                      ]}
                    />
                  </div>
                  <p className="text-gray-600">{property.address}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Agente Responsable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={property.agent.avatar || "/placeholder.svg"}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{property.agent.name}</h3>
                    <p className="text-sm text-gray-600">{property.agent.phone}</p>
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
                  <Button
                    onClick={() => setShowScheduler(true)}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Visita
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Información Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operación:</span>
                    <span className="font-medium capitalize">{property.operation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium">{property.area} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amueblado:</span>
                    <span className="font-medium">{property.furnished ? "Sí" : "No"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parqueo:</span>
                    <span className="font-medium">{property.parking ? "Sí" : "No"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactAgentForm
          propertyId={property.id}
          agentId={property.agent.id}
          onClose={() => setShowContactForm(false)}
        />
      )}

      {/* Appointment Scheduler Modal */}
      {showScheduler && <AppointmentScheduler propertyId={property.id} onClose={() => setShowScheduler(false)} />}
    </div>
  )
}
