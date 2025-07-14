"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { branding } from "@/lib/branding"

const testimonios = [
  {
    nombre: "María López",
    mensaje: "Gracias a InmoPlus encontré la casa de mis sueños en tiempo récord. El equipo fue muy profesional y atento.",
    foto: "/images/placeholder-user.jpg",
  },
  {
    nombre: "Carlos Pérez",
    mensaje: "El proceso de venta fue transparente y seguro. Recomiendo InmoPlus a todos mis amigos.",
    foto: "/images/placeholder-user.jpg",
  },
  {
    nombre: "Ana Rodríguez",
    mensaje: "Me ayudaron a invertir en una propiedad y todo salió perfecto. ¡Gracias por la asesoría!",
    foto: "/images/placeholder-user.jpg",
  },
];

const equipo = [
  {
    nombre: "Laura Fernández",
    puesto: "CEO & Fundadora",
    foto: "/images/agent-profile.png",
  },
  {
    nombre: "David Martínez",
    puesto: "Director Comercial",
    foto: "/images/agent-profile.png",
  },
  {
    nombre: "Ana López",
    puesto: "Agente Senior",
    foto: "/images/agent-profile.png",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre {branding.appName}</h1>
            <p className="text-xl text-blue-100 mb-6">Tu aliado de confianza en el mundo inmobiliario</p>
          </div>
        </section>
        {/* Misión, Visión, Historia */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-blue-700">Nuestra Misión</h2>
            <p className="text-gray-700">Facilitar el acceso a viviendas y oportunidades inmobiliarias de calidad, brindando un servicio transparente, seguro y personalizado.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-blue-700">Nuestra Visión</h2>
            <p className="text-gray-700">Ser la plataforma inmobiliaria líder en innovación, confianza y satisfacción del cliente en Latinoamérica y España.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-blue-700">Nuestra Historia</h2>
            <p className="text-gray-700">Nacimos en 2024 con el objetivo de transformar la experiencia de compra, venta y alquiler de inmuebles, combinando tecnología y trato humano.</p>
          </div>
        </section>
        {/* Ventajas */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">¿Por qué elegir InmoPlus?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Image src="/images/modern-villa.jpg" alt="Rapidez" width={80} height={80} className="mx-auto rounded-full mb-4 object-cover" />
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Rapidez y Eficiencia</h3>
                <p className="text-gray-700">Procesos ágiles y acompañamiento en cada etapa.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Image src="/images/agent-profile.png" alt="Expertos" width={80} height={80} className="mx-auto rounded-full mb-4 object-cover" />
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Equipo Experto</h3>
                <p className="text-gray-700">Agentes certificados y con amplia experiencia en el sector.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Image src="/images/modern-interior.jpg" alt="Tecnología" width={80} height={80} className="mx-auto rounded-full mb-4 object-cover" />
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Tecnología de Punta</h3>
                <p className="text-gray-700">Herramientas digitales para una experiencia cómoda y segura.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Equipo */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Nuestro Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {equipo.map((persona) => (
                <div key={persona.nombre} className="bg-white rounded-xl shadow-md p-6 text-center">
                  <Image src={persona.foto} alt={persona.nombre} width={80} height={80} className="mx-auto rounded-full mb-4 object-cover" />
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">{persona.nombre}</h3>
                  <p className="text-gray-600">{persona.puesto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonios */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Testimonios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonios.map((testi, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center">
                  <Image src={testi.foto} alt={testi.nombre} width={60} height={60} className="mx-auto rounded-full mb-4 object-cover" />
                  <p className="text-gray-700 italic mb-2">“{testi.mensaje}”</p>
                  <h4 className="text-blue-700 font-semibold">{testi.nombre}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 