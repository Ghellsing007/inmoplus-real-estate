import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MessageCircle, Star, MapPin, Award } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar_url: string
  bio: string
  specialties: string[]
  experience_years: number
  languages: string[]
  certifications: string[]
  rating: number
  total_sales: number
  created_at: string
  updated_at: string
}

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <CardContent className="p-0">
        {/* Header with Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end">
            <div className="relative">
              <Image
                src={agent.avatar_url || "/images/placeholder-user.jpg"}
                alt={agent.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="ml-4 text-white flex-1">
              <h3 className="text-xl font-bold">{agent.name}</h3>
              <p className="text-blue-100">{agent.specialties?.[0] || 'Agente Inmobiliario'}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {agent.rating} ({Math.floor(agent.total_sales * 0.1)} reseñas)
              </span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {agent.specialties?.[0] || 'Especialista'}
            </Badge>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-3">{agent.bio}</p>
          </div>

          {/* Experience */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Award className="h-4 w-4 mr-2" />
              <span>{agent.experience_years} años de experiencia</span>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{agent.total_sales}+</div>
              <div className="text-sm text-gray-600">Propiedades vendidas</div>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Idiomas:</div>
            <div className="flex flex-wrap gap-1">
              {agent.languages?.map((language, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Llamar
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AgentCardSkeleton() {
  return (
    <div className="bg-white shadow-md overflow-hidden rounded-xl animate-pulse">
      {/* Header con imagen y nombre */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
        <Skeleton className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-4 border-white" />
        <div className="absolute bottom-4 left-28 right-4 flex items-end">
          <div className="ml-4 flex-1">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <div className="flex gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
