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

interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  rating: number;
  image: string;
  order_index: number;
}

export default function TestimonialsDashboardPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", testimonial: "", rating: 5, image: "" });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleCreate() {
    if (!newTestimonial.name.trim() || !newTestimonial.testimonial.trim()) return;
    setLoading(true);
    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTestimonial, order_index: testimonials.length }),
    });
    setNewTestimonial({ name: "", role: "", testimonial: "", rating: 5, image: "" });
    setImagePreview("");
    fetchTestimonials();
  }

  async function handleEdit() {
    if (!editing) return;
    setLoading(true);
    await fetch("/api/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchTestimonials();
  }

  async function handleDelete(id: string) {
    setLoading(true);
    await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTestimonials();
  }

  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }
  const testimonialSlides = chunkArray(testimonials, 1);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Gestión de Testimonios</h1>
      {/* Crear nuevo testimonio */}
      <div className="mb-8 p-4 bg-slate-50 rounded-lg border">
        <h2 className="font-semibold mb-2">Agregar nuevo testimonio</h2>
        <Input
          placeholder="Nombre"
          value={newTestimonial.name}
          onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Rol (ej: Comprador de Casa)"
          value={newTestimonial.role}
          onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
          className="mb-2"
        />
        <div className="mb-2">
          <label className="block font-medium mb-1">Imagen del cliente</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <UploadButton
              endpoint="inmuebleImage"
              onClientUploadComplete={(res) => {
                if (res && res[0]?.url) {
                  setNewTestimonial((prev) => ({ ...prev, image: res[0].url }));
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
            value={newTestimonial.image}
            onChange={e => {
              setNewTestimonial({ ...newTestimonial, image: e.target.value });
              setImagePreview(e.target.value);
            }}
            className="mt-2"
          />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="w-full max-h-40 object-cover rounded mt-2" />
          )}
        </div>
        <Textarea
          placeholder="Testimonio"
          value={newTestimonial.testimonial}
          onChange={e => setNewTestimonial({ ...newTestimonial, testimonial: e.target.value })}
          className="mb-2"
        />
        <Input
          type="number"
          min={1}
          max={5}
          placeholder="Rating (1-5)"
          value={newTestimonial.rating}
          onChange={e => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
          className="mb-2"
        />
        <Button onClick={handleCreate} disabled={loading || !newTestimonial.name || !newTestimonial.testimonial}>
          Agregar
        </Button>
      </div>
      {/* Listado de testimonios */}
      <Carousel className="mb-8 w-full max-w-5xl mx-auto" opts={{ slidesToScroll: 1 }}>
        <CarouselContent>
          {testimonialSlides.map((slide, idx) => (
            <CarouselItem key={idx} className="flex justify-center">
              {slide.map((t) => (
                <div key={t.id} className="w-full max-w-2xl p-6 border rounded-lg bg-white flex flex-col gap-2 shadow-md">
                  {editing?.id === t.id ? (
                    <>
                      <Input
                        value={editing.name}
                        onChange={e => setEditing({ ...editing, name: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        value={editing.role}
                        onChange={e => setEditing({ ...editing, role: e.target.value })}
                        className="mb-2"
                      />
                      <div className="mb-2">
                        <label className="block font-medium mb-1">Imagen del cliente</label>
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
                        value={editing.testimonial}
                        onChange={e => setEditing({ ...editing, testimonial: e.target.value })}
                        className="mb-2"
                      />
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={editing.rating}
                        onChange={e => setEditing({ ...editing, rating: Number(e.target.value) })}
                        className="mb-2"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleEdit} disabled={loading}>Guardar</Button>
                        <Button variant="outline" onClick={() => setEditing(null)} disabled={loading}>Cancelar</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 mb-2">
                        {t.image && <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border" />}
                        <div>
                          <div className="font-semibold text-lg">{t.name}</div>
                          <div className="text-blue-600 text-sm">{t.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">★</span>
                        ))}
                        {Array.from({ length: 5 - t.rating }).map((_, i) => (
                          <span key={i} className="text-gray-300 text-xl">★</span>
                        ))}
                      </div>
                      <div className="italic text-gray-700 text-base mb-4 whitespace-pre-line line-clamp-6">"{t.testimonial}"</div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" onClick={() => setEditing(t)} disabled={loading}>Editar</Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(t.id)} disabled={loading}>Eliminar</Button>
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
      {testimonials.length === 0 && <div className="text-gray-500">No hay testimonios registrados.</div>}
    </div>
  );
} 