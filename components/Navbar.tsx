"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Home, User, Settings, LogOut, Heart, Building } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { AuthModal } from "./AuthModal"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, profile, signOut, loading } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  const handleAuthClick = () => {
    setShowAuthModal(true)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">InmoPlus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/properties"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Propiedades
              </Link>
              <Link
                href="/agents"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Agentes
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Nosotros
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contacto
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="text-blue-700 font-semibold hover:text-blue-900 px-3 py-2 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-10 w-20 rounded"></div>
            ) : !user ? (
              <>
                <Link href="/sign-in">
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    {profile?.avatar ? (
                      <Image
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium">{profile?.name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Mis Favoritos
                    </Link>
                  </DropdownMenuItem>
                  {(profile?.role === "agent" || profile?.role === "admin") && (
                    <DropdownMenuItem asChild>
                      <Link href="/my-properties" className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Mis Propiedades
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
              <Link href="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Inicio
              </Link>
              <Link
                href="/properties"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              >
                Propiedades
              </Link>
              <Link href="/agents" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Agentes
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Nosotros
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Contacto
              </Link>

              <div className="pt-4 pb-3 border-t border-slate-200">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-20 rounded mb-2"></div>
                ) : !user ? (
                  <div className="flex flex-col space-y-2">
                    <Link href="/sign-in">
                      <Button 
                        variant="outline" 
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2">
                      {profile?.avatar ? (
                        <Image
                          src={profile.avatar || "/placeholder.svg"}
                          alt={profile.name}
                          width={32}
                          height={32}
                          className="rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-900">{profile?.name || user.email}</span>
                    </div>
                    <Link href="/profile" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base">
                      Mi Perfil
                    </Link>
                    <Link href="/favorites" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base">
                      Mis Favoritos
                    </Link>
                    {(profile?.role === "agent" || profile?.role === "admin") && (
                      <Link
                        href="/my-properties"
                        className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base"
                      >
                        Mis Propiedades
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-600 hover:text-red-700 px-3 py-2 text-base"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  )
}
