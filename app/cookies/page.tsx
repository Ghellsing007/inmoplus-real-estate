"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Cookies</h1>
            <p className="text-xl text-blue-100 mb-6">Última actualización: 20 de junio de 2024</p>
          </div>
        </section>
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">1. ¿Qué son las cookies?</h2>
          <p className="mb-4 text-gray-700">Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia y a analizar el uso del sitio.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">2. Tipos de Cookies que Utilizamos</h2>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li>Cookies técnicas y funcionales</li>
            <li>Cookies de análisis y estadísticas</li>
            <li>Cookies de publicidad</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">3. Gestión de Cookies</h2>
          <p className="mb-4 text-gray-700">Puedes configurar tu navegador para aceptar o rechazar cookies. Ten en cuenta que desactivar cookies puede afectar el funcionamiento del sitio.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">4. Cambios en la Política</h2>
          <p className="mb-4 text-gray-700">Nos reservamos el derecho de modificar esta política de cookies. Te recomendamos revisarla periódicamente.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
} 