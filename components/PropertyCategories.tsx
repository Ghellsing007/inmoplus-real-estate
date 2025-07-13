"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Building, TreePine, Mountain, Waves, Sparkles, MapPin, TrendingUp } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<any>
  count: number
  description: string
  color: string
}

export default function PropertyCategories() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories: Category[] = [
    {
      id: "all",
      name: "Todas las Propiedades",
      icon: Home,
      count: 18,
      description: "Explora toda nuestra colección",
      color: "bg-blue-500",
    },
    {
      id: "mediterranean",
      name: "Mediterráneas",
      icon: Waves,
      count: 8,
      description: "Villas y casas costeras",
      color: "bg-cyan-500",
    },
    {
      id: "rustic",
      name: "Rústicas",
      icon: TreePine,
      count: 6,
      description: "Cabañas y casas de campo",
      color: "bg-green-500",
    },
    {
      id: "mountain",
      name: "Montaña",
      icon: Mountain,
      count: 3,
      description: "Chalets y refugios alpinos",
      color: "bg-slate-500",
    },
    {
      id: "modern",
      name: "Modernas",
      icon: Building,
      count: 4,
      description: "Arquitectura contemporánea",
      color: "bg-purple-500",
    },
    {
      id: "unique",
      name: "Únicas",
      icon: Sparkles,
      count: 3,
      description: "Propiedades extraordinarias",
      color: "bg-orange-500",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explora por
            <span className="text-blue-600"> Categorías</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde villas mediterráneas hasta cabañas rústicas, encuentra el estilo de vida que buscas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                activeCategory === category.id ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${category.color} text-white mr-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} propiedades</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Popular
                  </span>
                  <Button
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={
                      activeCategory === category.id
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    }
                  >
                    Ver Propiedades
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-6">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">Propiedades disponibles en más de 25 países</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra cartera global incluye propiedades únicas en destinos de ensueño, desde las costas mediterráneas
            hasta los bosques nórdicos y las montañas alpinas.
          </p>
        </div>
      </div>
    </section>
  )
}
