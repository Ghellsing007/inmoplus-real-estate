"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";

// Eliminar const posts y su uso, y preparar para consumir blogs dinámicamente desde Supabase

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

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
          {loading ? (
            <div className="text-center text-gray-500">Cargando blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-gray-500">No hay blogs publicados.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                  <Image src={blog.image || "/images/placeholder.jpg"} alt={blog.title} width={400} height={200} className="w-full h-48 object-cover" />
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-blue-700 mb-2">{blog.title}</h2>
                    <p className="text-gray-700 mb-4 flex-1 line-clamp-4">{blog.content.slice(0, 120)}{blog.content.length > 120 ? '...' : ''}</p>
                    <div className="text-xs text-gray-500 mb-2">{blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ''} · {blog.author || "Sin autor"}</div>
                    {/* Aquí podrías enlazar a una página de detalle si la implementas */}
                    {/* <a href={"/blog/" + blog.id} className="text-blue-600 hover:underline font-semibold mt-auto">Leer más</a> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
} 