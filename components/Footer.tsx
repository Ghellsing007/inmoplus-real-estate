import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Home className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">InmoPlus</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu socio de confianza en bienes raíces. Conectamos personas con sus hogares ideales desde hace más de 15
              años.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400 hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400 hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400 hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400 hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Nuestros Agentes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/buy" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Comprar Propiedad
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Vender Propiedad
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Alquilar
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Valuación Gratuita
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Financiamiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@inmoplus.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Av. Principal 123
                  <br />
                  Ciudad, País 12345
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Recibe las mejores ofertas en tu email</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Suscribir</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 InmoPlus. Todos los derechos reservados.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Términos de Uso
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
