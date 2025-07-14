"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Key, Building2, Users, DollarSign, FileText, MapPin, Wrench, Star } from "lucide-react";

const servicios = [
  {
    icon: Home,
    titulo: "Compra de Propiedades",
    descripcion: "Te ayudamos a encontrar y adquirir la vivienda o local ideal, acompañándote en todo el proceso de compra.",
  },
  {
    icon: Key,
    titulo: "Alquiler de Propiedades",
    descripcion: "Gestionamos alquileres de casas, apartamentos y locales, asegurando contratos claros y protección para ambas partes.",
  },
  {
    icon: Building2,
    titulo: "Venta de Propiedades",
    descripcion: "Publicamos y promocionamos tu inmueble para lograr la mejor venta en el menor tiempo posible.",
  },
  {
    icon: Users,
    titulo: "Asesoría Legal y Notarial",
    descripcion: "Te orientamos en trámites legales, contratos, escrituración y todo lo necesario para una transacción segura.",
  },
  {
    icon: DollarSign,
    titulo: "Gestión de Hipotecas y Financiamiento",
    descripcion: "Te conectamos con las mejores opciones de crédito hipotecario y te guiamos en el proceso de financiamiento.",
  },
  {
    icon: FileText,
    titulo: "Tasación y Avalúo",
    descripcion: "Realizamos avalúos profesionales para conocer el valor real de tu propiedad y tomar mejores decisiones.",
  },
  {
    icon: MapPin,
    titulo: "Búsqueda Personalizada",
    descripcion: "Buscamos propiedades según tus necesidades, preferencias y presupuesto, ahorrándote tiempo y esfuerzo.",
  },
  {
    icon: Wrench,
    titulo: "Remodelación y Mantenimiento",
    descripcion: "Te ponemos en contacto con profesionales para reformas, mantenimiento y mejoras en tu inmueble.",
  },
  {
    icon: Star,
    titulo: "Gestión de Inversiones",
    descripcion: "Asesoría para invertir en bienes raíces, maximizar tu rentabilidad y diversificar tu portafolio.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Servicios Inmobiliarios</h1>
            <p className="text-xl text-blue-100 mb-6">Todo lo que necesitas para comprar, vender, alquilar o invertir en bienes raíces</p>
          </div>
        </section>
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((serv, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
                <serv.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h2 className="text-lg font-bold text-blue-700 mb-2">{serv.titulo}</h2>
                <p className="text-gray-700">{serv.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 