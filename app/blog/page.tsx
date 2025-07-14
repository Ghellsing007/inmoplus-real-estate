"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const posts = [
  {
    title: "Tendencias del mercado inmobiliario 2024",
    excerpt: "Descubre las claves y oportunidades del sector para este año.",
    image: "/images/modern-villa.jpg",
    date: "2024-06-20",
    author: "Equipo InmoPlus",
    link: "#"
  },
  {
    title: "Guía para comprar tu primera vivienda",
    excerpt: "Consejos prácticos para dar el paso con seguridad y éxito.",
    image: "/images/coastal-bay.jpg",
    date: "2024-05-15",
    author: "María García",
    link: "#"
  },
  {
    title: "¿Alquilar o comprar? Ventajas y desventajas",
    excerpt: "Analizamos las mejores opciones según tu perfil y necesidades.",
    image: "/images/modern-interior.jpg",
    date: "2024-04-10",
    author: "Carlos Rodríguez",
    link: "#"
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/images/cozy-house-banner.png')"}} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog InmoPlus</h1>
            <p className="text-xl text-blue-100 mb-6">Noticias, consejos y tendencias del mundo inmobiliario</p>
          </div>
        </section>
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-blue-700 mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4 flex-1">{post.excerpt}</p>
                  <div className="text-xs text-gray-500 mb-2">{post.date} · {post.author}</div>
                  <a href={post.link} className="text-blue-600 hover:underline font-semibold mt-auto">Leer más</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 