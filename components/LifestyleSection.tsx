"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TreePine, Waves, Mountain, Building2, Sparkles, Home } from "lucide-react"

export default function LifestyleSection() {
  const lifestyles = [
    {
      icon: Waves,
      title: "Vida Costera",
      description: "Villas mediterráneas con vistas al mar",
      image: "/images/coastal-bay.jpg",
      properties: "8 propiedades",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: TreePine,
      title: "Retiro Natural",
      description: "Cabañas y casas en el bosque",
      image: "/images/treehouse-cabin.jpg",
      properties: "6 propiedades",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Mountain,
      title: "Aventura Alpina",
      description: "Chalets de montaña y refugios",
      image: "/images/mountain-chalet.jpg",
      properties: "4 propiedades",
      color: "from-slate-400 to-gray-500",
    },
    {
      icon: Building2,
      title: "Vida Urbana",
      description: "Apartamentos y lofts modernos",
      image: "/images/modern-minimalist.jpg",
      properties: "5 propiedades",
      color: "from-purple-400 to-indigo-500",
    },
    {
      icon: Home,
      title: "Tradición Rural",
      description: "Cottages y casas de campo",
      image: "/images/american-cottage.jpg",
      properties: "4 propiedades",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Sparkles,
      title: "Experiencias Únicas",
      description: "Propiedades extraordinarias",
      image: "/images/turf-house.jpg",
      properties: "3 propiedades",
      color: "from-pink-400 to-rose-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Encuentra tu
            <span className="text-blue-600"> estilo de vida</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada propiedad cuenta una historia única. Descubre el estilo de vida que mejor se adapte a tus sueños y
            aspiraciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lifestyles.map((lifestyle, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${lifestyle.image}')` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${lifestyle.color} opacity-80`} />
                <div className="absolute top-4 left-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    <lifestyle.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {lifestyle.properties}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{lifestyle.title}</h3>
                <p className="text-gray-600 mb-4">{lifestyle.description}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors">
                  Explorar Propiedades
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white"
                />
              ))}
            </div>
            <span className="text-gray-700 font-medium">
              Más de 2,500 familias han encontrado su hogar ideal con nosotros
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
