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
import { Skeleton } from "@/components/ui/skeleton"

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
}

export default function FaqsDashboardPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);

  // Obtener FAQs
  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    setLoading(true);
    const res = await fetch("/api/faqs");
    const data = await res.json();
    setFaqs(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  // Crear FAQ
  async function handleCreate() {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    setLoading(true);
    await fetch("/api/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newFaq, order_index: faqs.length }),
    });
    setNewFaq({ question: "", answer: "" });
    fetchFaqs();
  }

  // Editar FAQ
  async function handleEdit() {
    if (!editing) return;
    setLoading(true);
    await fetch("/api/faqs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchFaqs();
  }

  // Eliminar FAQ
  async function handleDelete(id: string) {
    setLoading(true);
    await fetch("/api/faqs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchFaqs();
  }

  // Agrupar las FAQs en slides de 1
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }
  const faqSlides = chunkArray(faqs, 1);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Gestión de Preguntas Frecuentes (FAQs)</h1>

      {/* Crear nueva FAQ */}
      <div className="mb-8 p-4 bg-slate-50 rounded-lg border">
        <h2 className="font-semibold mb-2">Agregar nueva pregunta</h2>
        <Input
          placeholder="Pregunta"
          value={newFaq.question}
          onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Respuesta"
          value={newFaq.answer}
          onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleCreate} disabled={loading || !newFaq.question || !newFaq.answer}>
          Agregar
        </Button>
      </div>

      {/* Listado de FAQs */}
      {loading ? (
        <div className="flex gap-4 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full max-w-2xl p-6 border rounded-lg bg-white flex flex-col gap-2 shadow-md">
              <Skeleton className="h-6 w-3/4 mb-2" />
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
            {faqSlides.map((slide, idx) => (
              <CarouselItem key={idx} className="flex justify-center">
                {slide.map((faq) => (
                  <div key={faq.id} className="w-full max-w-2xl p-6 border rounded-lg bg-white flex flex-col gap-2 shadow-md">
                    {editing?.id === faq.id ? (
                      <>
                        <Input
                          value={editing.question}
                          onChange={e => setEditing({ ...editing, question: e.target.value })}
                          className="mb-2"
                        />
                        <Textarea
                          value={editing.answer}
                          onChange={e => setEditing({ ...editing, answer: e.target.value })}
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleEdit} disabled={loading}>Guardar</Button>
                          <Button variant="outline" onClick={() => setEditing(null)} disabled={loading}>Cancelar</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold text-xl mb-2">{faq.question}</div>
                        <div className="text-gray-700 text-base mb-4 whitespace-pre-line">{faq.answer}</div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => setEditing(faq)} disabled={loading}>Editar</Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(faq.id)} disabled={loading}>Eliminar</Button>
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
      {(!loading && faqs.length === 0) && <div className="text-gray-500">No hay preguntas frecuentes registradas.</div>}
    </div>
  );
} 