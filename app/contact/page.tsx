"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Aquí puedes hacer la llamada a tu API o a Supabase
      // Simulación de éxito
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Hubo un error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
            <p className="text-xl text-blue-100 mb-6">¿Tienes dudas o necesitas ayuda? ¡Envíanos un mensaje y te responderemos lo antes posible!</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Formulario de Contacto</h2>
              <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                <Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <Input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                <Input name="phone" placeholder="Teléfono (opcional)" value={form.phone} onChange={handleChange} />
                <Textarea name="message" placeholder="Tu mensaje" value={form.message} onChange={handleChange} required rows={5} />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Enviando..." : "Enviar Mensaje"}</Button>
                {success && <div className="text-green-600 text-center mt-2">¡Mensaje enviado correctamente!</div>}
                {error && <div className="text-red-600 text-center mt-2">{error}</div>}
              </form>
            </div>
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Información de Contacto</h3>
                <div className="flex items-center mb-2 text-gray-700"><Mail className="h-5 w-5 mr-2 text-blue-600" /> contacto@inmoplus.com</div>
                <div className="flex items-center mb-2 text-gray-700"><Phone className="h-5 w-5 mr-2 text-blue-600" /> +34 600 123 456</div>
                <div className="flex items-center mb-2 text-gray-700"><MapPin className="h-5 w-5 mr-2 text-blue-600" /> Calle Mayor 123, Madrid, España</div>
                <div className="flex items-center mb-2 text-gray-700"><span className="font-semibold mr-2">Horario:</span> Lunes a Viernes, 9:00 - 18:00</div>
              </div>
              {/* Redes sociales */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Síguenos</h3>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener" className="hover:text-blue-700"><Facebook className="h-6 w-6" /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener" className="hover:text-pink-600"><Instagram className="h-6 w-6" /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:text-blue-400"><Twitter className="h-6 w-6" /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-blue-800"><Linkedin className="h-6 w-6" /></a>
                </div>
              </div>
              {/* Mapa */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Ubicación</h3>
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    title="Ubicación InmoPlus"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-69.825%2C18.480%2C-69.750%2C18.540&layer=mapnik"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 