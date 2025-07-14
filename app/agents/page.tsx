"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import AgentCard, { AgentCardSkeleton } from "@/components/AgentCard"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Users, Award, Globe, Star } from "lucide-react"
import { getAgents } from "@/lib/services"

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

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agentsData = await getAgents()
        setAgents(agentsData)
      } catch (error) {
        console.error('Error cargando agentes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

  const stats = [
    {
      icon: Users,
      number: `${agents.length}+`,
      label: "Agentes Expertos",
      description: "Profesionales certificados",
    },
    {
      icon: Award,
      number: "15",
      label: "Años de Experiencia",
      description: "Promedio del equipo",
    },
    {
      icon: Globe,
      number: "25+",
      label: "Idiomas",
      description: "Atención multilingüe",
    },
    {
      icon: Star,
      number: "4.8",
      label: "Calificación Promedio",
      description: "Satisfacción del cliente",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conoce a Nuestros Agentes</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cargando agentes...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <AgentCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (!loading && agents.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-gray-500 text-xl">No hay agentes registrados.</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/images/cozy-house-banner.png')`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nuestro Equipo de
              <span className="block text-blue-200">Expertos</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Conoce a los profesionales que harán realidad tus sueños inmobiliarios
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Buscar agente..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Especialización" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Propiedades de Lujo</SelectItem>
                  <SelectItem value="family">Propiedades Familiares</SelectItem>
                  <SelectItem value="commercial">Propiedades Comerciales</SelectItem>
                  <SelectItem value="investment">Inversiones</SelectItem>
                  <SelectItem value="rural">Propiedades Rurales</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="sevilla">Sevilla</SelectItem>
                  <SelectItem value="malaga">Málaga</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conoce a Nuestros Agentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada uno de nuestros agentes está comprometido con brindarte el mejor servicio y encontrar la propiedad
              perfecta para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Ver Más Agentes</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
