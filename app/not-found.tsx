"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Image */}
        <div className="relative mb-12">
          <div
            className="w-full h-96 bg-cover bg-center rounded-2xl shadow-2xl"
            style={{
              backgroundImage: `url('/images/404-abandoned-house.jpg')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-6xl md:text-8xl font-bold mb-2">404</h1>
              <p className="text-xl md:text-2xl opacity-90">Propiedad no encontrada</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">¡Ups! Esta propiedad se ha mudado</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            La página que buscas no existe o ha sido trasladada. Pero no te preocupes, tenemos miles de propiedades
            increíbles esperándote.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
          >
            <Link href="/properties">
              <Search className="h-5 w-5 mr-2" />
              Buscar Propiedades
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">¿Qué te gustaría hacer?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/properties?operation=venta"
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Comprar Casa</h4>
                <p className="text-sm text-gray-600">Encuentra tu hogar ideal</p>
              </div>
            </Link>

            <Link
              href="/properties?operation=alquiler"
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="p-2 bg-green-100 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Alquilar</h4>
                <p className="text-sm text-gray-600">Encuentra el lugar perfecto</p>
              </div>
            </Link>

            <Link
              href="/agents"
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="p-2 bg-purple-100 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Contactar Agente</h4>
                <p className="text-sm text-gray-600">Obtén ayuda profesional</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la página anterior
          </Button>
        </div>
      </div>
    </div>
  )
}
