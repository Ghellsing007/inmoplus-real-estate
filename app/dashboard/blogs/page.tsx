"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { UploadButton } from "@uploadthing/react";
import { Skeleton } from "@/components/ui/skeleton"

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  order_index: number;
}

export default function BlogsDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleCreate() {
    if (!newBlog.title.trim() || !newBlog.content.trim()) return;
    setLoading(true);
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newBlog, order_index: blogs.length }),
    });
    setNewBlog({ title: "", content: "", author: "", image: "" });
    fetchBlogs();
  }

  async function handleEdit() {
    if (!editing) return;
    setLoading(true);
    await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchBlogs();
  }

  async function handleDelete(id: string) {
    setLoading(true);
    await fetch("/api/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBlogs();
  }

  // Agrupar los blogs en slides de 1
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }
  const blogSlides = chunkArray(blogs, 1);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Gestión de Blogs</h1>
      {/* Crear nuevo blog */}
      <div className="mb-8 p-4 bg-slate-50 rounded-lg border">
        <h2 className="font-semibold mb-2">Agregar nuevo blog</h2>
        <Input
          placeholder="Título"
          value={newBlog.title}
          onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Autor"
          value={newBlog.author}
          onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
          className="mb-2"
        />
        <div className="mb-2">
          <label className="block font-medium mb-1">Imagen del blog</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <UploadButton
              endpoint="inmuebleImage"
              onClientUploadComplete={(res) => {
                if (res && res[0]?.url) {
                  setNewBlog((prev) => ({ ...prev, image: res[0].url }));
                  setImagePreview(res[0].url);
                }
              }}
              onUploadError={(error) => {
                alert("Error subiendo imagen: " + error.message);
              }}
              className="ut-button:bg-white ut-button:hover:bg-gray-50 ut-button:text-black ut-button:font-medium ut-button:px-4 ut-button:py-2 ut-button:rounded-md ut-button:transition-colors ut-button:border ut-button:border-gray-300 ut-button:hover:border-gray-400"
            />
            <p className="text-sm text-gray-500 mt-2">Haz clic para subir una imagen o arrastra y suelta</p>
          </div>
          <Input
            placeholder="URL de la imagen"
            value={newBlog.image}
            onChange={e => {
              setNewBlog({ ...newBlog, image: e.target.value });
              setImagePreview(e.target.value);
            }}
            className="mt-2"
          />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="w-full max-h-40 object-cover rounded mt-2" />
          )}
        </div>
        <Textarea
          placeholder="Contenido"
          value={newBlog.content}
          onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleCreate} disabled={loading || !newBlog.title || !newBlog.content}>
          Agregar
        </Button>
      </div>
      {/* Listado de blogs */}
      {loading ? (
        <div className="flex gap-4 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full max-w-2xl p-6 border rounded-lg bg-white flex flex-col gap-2 shadow-md">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-32 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Carousel className="mb-8 w-full max-w-5xl mx-auto" opts={{ slidesToScroll: 1 }}>
          <CarouselContent>
            {blogSlides.map((slide, idx) => (
              <CarouselItem key={idx} className="flex justify-center">
                {slide.map((blog) => (
                  <div key={blog.id} className="w-full max-w-2xl p-6 border rounded-lg bg-white flex flex-col gap-2 shadow-md">
                    {editing?.id === blog.id ? (
                      <>
                        <Input
                          value={editing.title}
                          onChange={e => setEditing({ ...editing, title: e.target.value })}
                          className="mb-2"
                        />
                        <Input
                          value={editing.author}
                          onChange={e => setEditing({ ...editing, author: e.target.value })}
                          className="mb-2"
                        />
                        <div className="mb-2">
                          <label className="block font-medium mb-1">Imagen del blog</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <UploadButton
                              endpoint="inmuebleImage"
                              onClientUploadComplete={(res) => {
                                if (res && res[0]?.url) {
                                  setEditing((prev) => prev ? { ...prev, image: res[0].url } : prev);
                                  setImagePreview(res[0].url);
                                }
                              }}
                              onUploadError={(error) => {
                                alert("Error subiendo imagen: " + error.message);
                              }}
                              className="ut-button:bg-white ut-button:hover:bg-gray-50 ut-button:text-black ut-button:font-medium ut-button:px-4 ut-button:py-2 ut-button:rounded-md ut-button:transition-colors ut-button:border ut-button:border-gray-300 ut-button:hover:border-gray-400"
                            />
                            <p className="text-sm text-black mt-2">Haz clic para subir una imagen o arrastra y suelta</p>
                          </div>
                          <Input
                            placeholder="URL de la imagen"
                            value={editing?.image || ""}
                            onChange={e => setEditing(editing ? { ...editing, image: e.target.value } : null)}
                            className="mt-2"
                          />
                          {editing?.image && (
                            <img src={editing.image} alt="preview" className="w-full max-h-40 object-cover rounded mt-2" />
                          )}
                        </div>
                        <Textarea
                          value={editing.content}
                          onChange={e => setEditing({ ...editing, content: e.target.value })}
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleEdit} disabled={loading}>Guardar</Button>
                          <Button variant="outline" onClick={() => setEditing(null)} disabled={loading}>Cancelar</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold text-xl mb-2">{blog.title}</div>
                        <div className="text-gray-600 text-sm mb-1">Por: {blog.author || "Sin autor"}</div>
                        {blog.image && <img src={blog.image} alt={blog.title} className="w-full max-h-48 object-cover rounded mb-2" />}
                        <div className="text-gray-700 text-base mb-4 whitespace-pre-line line-clamp-6">{blog.content}</div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => setEditing(blog)} disabled={loading}>Editar</Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(blog.id)} disabled={loading}>Eliminar</Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      {(!loading && blogs.length === 0) && <div className="text-gray-500">No hay blogs registrados.</div>}
    </div>
  );
} 