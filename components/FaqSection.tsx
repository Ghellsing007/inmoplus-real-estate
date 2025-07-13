"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "¿Cómo puedo publicar mi propiedad en InmoPlus?",
      answer:
        "Publicar tu propiedad es muy sencillo. Solo necesitas registrarte como agente o propietario, completar el formulario con los detalles de tu propiedad, subir fotos de alta calidad y nuestro equipo revisará la publicación antes de hacerla visible en la plataforma.",
    },
    {
      id: "2",
      question: "¿Cuáles son las comisiones por vender una propiedad?",
      answer:
        "Nuestras comisiones son competitivas y transparentes. Para ventas, cobramos entre 3% y 5% del valor de la transacción, dependiendo del tipo de propiedad y servicios adicionales. Para alquileres, la comisión es equivalente a un mes de renta.",
    },
    {
      id: "3",
      question: "¿Ofrecen servicios de financiamiento?",
      answer:
        "Sí, trabajamos con una red de bancos y entidades financieras para ayudarte a obtener el mejor financiamiento. Nuestros asesores pueden guiarte en el proceso de pre-aprobación y encontrar las mejores tasas de interés disponibles.",
    },
    {
      id: "4",
      question: "¿Cómo puedo agendar una visita a una propiedad?",
      answer:
        'Puedes agendar una visita directamente desde la página de la propiedad haciendo clic en "Agendar Visita". Selecciona la fecha y hora que prefieras, y el agente responsable se pondrá en contacto contigo para confirmar la cita.',
    },
    {
      id: "5",
      question: "¿Qué documentos necesito para comprar una propiedad?",
      answer:
        "Los documentos básicos incluyen: identificación oficial, comprobantes de ingresos, estados de cuenta bancarios, carta de pre-aprobación de crédito (si aplica), y comprobante de domicilio. Nuestro equipo te guiará con la lista completa según tu situación específica.",
    },
    {
      id: "6",
      question: "¿Manejan propiedades comerciales además de residenciales?",
      answer:
        "Absolutamente. Manejamos todo tipo de propiedades: residenciales (casas, apartamentos), comerciales (oficinas, locales, bodegas), industriales y terrenos. Tenemos agentes especializados en cada sector para brindarte el mejor servicio.",
    },
  ]

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Preguntas
            <span className="text-blue-600"> Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y el proceso de compra, venta o
            alquiler de propiedades.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {openFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">¿No encontraste la respuesta que buscabas?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Contactar Soporte
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors">
              Chat en Vivo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
