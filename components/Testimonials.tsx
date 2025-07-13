"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "María González",
      role: "Compradora de Casa",
      content:
        "InmoPlus hizo que encontrar nuestra casa de ensueño fuera increíblemente fácil. Su equipo nos guió en cada paso del proceso y siempre estuvieron disponibles para responder nuestras preguntas.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      role: "Inversionista",
      content:
        "Como inversionista inmobiliario, he trabajado con muchas agencias, pero InmoPlus se destaca por su profesionalismo y conocimiento del mercado. Altamente recomendados.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Ana Martínez",
      role: "Vendedora de Apartamento",
      content:
        "Vendí mi apartamento en tiempo récord gracias al excelente trabajo de marketing y la amplia red de contactos de InmoPlus. Superaron todas mis expectativas.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Roberto Silva",
      role: "Comprador Primerizo",
      content:
        "Como comprador primerizo, tenía muchas dudas. El equipo de InmoPlus me educó sobre el proceso y me ayudó a tomar la mejor decisión. Excelente servicio.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros
            <span className="text-blue-600"> clientes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Miles de familias han confiado en nosotros para encontrar su hogar ideal. Estas son algunas de sus
            experiencias.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                    <p className="text-blue-600 font-medium">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-gray-300 hover:border-blue-600 hover:text-blue-600 bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-gray-300 hover:border-blue-600 hover:text-blue-600 bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            ¿Listo para ser nuestro próximo cliente satisfecho?
          </h3>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Comienza tu búsqueda hoy</Button>
        </div>
      </div>
    </section>
  )
}
