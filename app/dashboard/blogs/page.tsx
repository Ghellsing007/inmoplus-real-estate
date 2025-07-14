"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        <Input
          placeholder="URL de la imagen"
          value={newBlog.image}
          onChange={e => setNewBlog({ ...newBlog, image: e.target.value })}
          className="mb-2"
        />
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
      <div className="space-y-6">
        {blogs.map((blog, idx) => (
          <div key={blog.id} className="p-4 border rounded-lg bg-white flex flex-col gap-2">
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
                <Input
                  value={editing.image}
                  onChange={e => setEditing({ ...editing, image: e.target.value })}
                  className="mb-2"
                />
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
                <div className="font-semibold text-lg">{blog.title}</div>
                <div className="text-gray-600 text-sm mb-1">Por: {blog.author || "Sin autor"}</div>
                {blog.image && <img src={blog.image} alt={blog.title} className="w-full max-h-48 object-cover rounded mb-2" />}
                <div className="text-gray-700 whitespace-pre-line line-clamp-4">{blog.content}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => setEditing(blog)} disabled={loading}>Editar</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(blog.id)} disabled={loading}>Eliminar</Button>
                </div>
              </>
            )}
          </div>
        ))}
        {blogs.length === 0 && <div className="text-gray-500">No hay blogs registrados.</div>}
      </div>
    </div>
  );
} 