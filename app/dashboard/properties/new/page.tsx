"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "casa",
    operation: "venta",
    address: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnished: false,
    parking: false,
    features: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Aquí iría la lógica para guardar la propiedad en Supabase
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/properties");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Nueva Propiedad</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Título</label>
                <Input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Descripción</label>
                <Textarea name="description" value={form.description} onChange={handleChange} required rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Precio (USD)</label>
                  <Input name="price" type="number" value={form.price} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Área (m²)</label>
                  <Input name="area" type="number" value={form.area} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Habitaciones</label>
                  <Input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Baños</label>
                  <Input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Tipo</label>
                  <Select name="type" value={form.type} onValueChange={(value) => setForm((prev) => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="oficina">Oficina</SelectItem>
                      <SelectItem value="local">Local Comercial</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Operación</label>
                  <Select name="operation" value={form.operation} onValueChange={(value) => setForm((prev) => ({ ...prev, operation: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Operación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venta">Venta</SelectItem>
                      <SelectItem value="alquiler">Alquiler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Dirección</label>
                <Input name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Ciudad</label>
                <Input name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="furnished" checked={form.furnished} onChange={handleChange} /> Amueblado
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="parking" checked={form.parking} onChange={handleChange} /> Parqueo
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Características (separadas por coma)</label>
                <Input name="features" value={form.features} onChange={handleChange} placeholder="Ej: piscina, jardín, seguridad" />
              </div>
              {/* Aquí puedes agregar subida de imágenes más adelante */}
              {error && <div className="text-red-500 text-center">{error}</div>}
              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Propiedad"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 