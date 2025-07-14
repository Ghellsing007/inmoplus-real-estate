import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Home, Clock } from "lucide-react"
import Link from "next/link"

export default function AboutUsSection() {
  const stats = [
    {
      icon: Home,
      number: "10,000+",
      label: "Propiedades Vendidas",
      description: "Más de una década ayudando a familias",
    },
    {
      icon: Users,
      number: "500+",
      label: "Agentes Expertos",
      description: "Profesionales certificados a tu servicio",
    },
    {
      icon: Award,
      number: "15",
      label: "Años de Experiencia",
      description: "Líderes en el mercado inmobiliario",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Atención al Cliente",
      description: "Soporte continuo para nuestros clientes",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre
              <span className="text-blue-600"> InmoPlus</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Somos una empresa líder en el sector inmobiliario con más de 15 años de experiencia. Nos especializamos en
              conectar a personas con sus hogares ideales, ofreciendo un servicio personalizado y profesional que
              garantiza la mejor experiencia en cada transacción.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nuestro equipo de agentes expertos utiliza tecnología de vanguardia y conocimiento profundo del mercado
              para brindar soluciones inmobiliarias integrales que superan las expectativas de nuestros clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/agents">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Conoce Nuestro Equipo</Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
                >
                  Nuestra Historia
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</p>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
