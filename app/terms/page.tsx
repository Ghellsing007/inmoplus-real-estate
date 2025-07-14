"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Términos de Uso</h1>
            <p className="text-xl text-blue-100 mb-6">Última actualización: 20 de junio de 2024</p>
          </div>
        </section>
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">1. Aceptación de los Términos</h2>
          <p className="mb-4 text-gray-700">Al acceder y utilizar InmoPlus, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo, por favor no utilices el sitio.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">2. Uso Permitido</h2>
          <p className="mb-4 text-gray-700">El sitio está destinado a mayores de 18 años y para fines legales relacionados con bienes raíces.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">3. Propiedad Intelectual</h2>
          <p className="mb-4 text-gray-700">Todos los contenidos, marcas y logotipos son propiedad de InmoPlus o de sus licenciantes. No está permitida su reproducción sin autorización.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">4. Responsabilidad</h2>
          <p className="mb-4 text-gray-700">InmoPlus no se responsabiliza por daños derivados del uso del sitio o de la información publicada por terceros.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">5. Modificaciones</h2>
          <p className="mb-4 text-gray-700">Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado implica aceptación de los cambios.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
} 