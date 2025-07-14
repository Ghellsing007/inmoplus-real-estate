"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-xl text-blue-100 mb-6">Última actualización: 20 de junio de 2024</p>
          </div>
        </section>
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">1. Introducción</h2>
          <p className="mb-4 text-gray-700">En InmoPlus, nos comprometemos a proteger tu privacidad y tus datos personales. Esta política explica cómo recopilamos, usamos y protegemos tu información.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">2. Datos que Recopilamos</h2>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li>Información de contacto (nombre, email, teléfono)</li>
            <li>Datos de navegación y uso del sitio</li>
            <li>Información sobre propiedades y preferencias</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">3. Uso de la Información</h2>
          <p className="mb-4 text-gray-700">Utilizamos tus datos para:</p>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li>Gestionar tu cuenta y solicitudes</li>
            <li>Mejorar nuestros servicios y personalizar tu experiencia</li>
            <li>Enviar comunicaciones relevantes</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">4. Derechos del Usuario</h2>
          <p className="mb-4 text-gray-700">Puedes acceder, rectificar o eliminar tus datos en cualquier momento. Para ejercer tus derechos, contáctanos en <span className="text-blue-600">contacto@inmoplus.com</span>.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">5. Seguridad</h2>
          <p className="mb-4 text-gray-700">Adoptamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados.</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">6. Cambios en la Política</h2>
          <p className="mb-4 text-gray-700">Nos reservamos el derecho de modificar esta política. Te notificaremos sobre cambios importantes a través del sitio web.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
} 