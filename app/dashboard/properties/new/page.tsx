"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { propertyService } from "@/lib/services";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function NewPropertyPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
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
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 4);
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const uploadImagesToSupabase = async (propertyId: string) => {
    const urls: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const ext = file.name.split('.').pop();
      const filePath = `properties/${propertyId}/${i === 0 ? 'main' : 'img' + i}.${ext}`;
      const { data, error } = await supabase.storage.from('properties').upload(filePath, file, { upsert: true });
      if (error) throw new Error('Error subiendo imagen: ' + error.message);
      const { data: urlData } = supabase.storage.from('properties').getPublicUrl(filePath);
      urls.push(urlData.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!profile?.id) throw new Error("No se pudo identificar al agente.");
      // 1. Crear la propiedad sin imágenes para obtener el ID
      const propertyData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        type: form.type,
        operation: form.operation,
        address: form.address,
        city: form.city,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
        furnished: form.furnished,
        parking: form.parking,
        features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
        images: [],
        agent_id: profile.id,
        created_at: new Date().toISOString(),
      };
      const result = await propertyService.createProperty(propertyData);
      if (!result || !result.id) throw new Error("No se pudo guardar la propiedad.");
      // 2. Subir imágenes a Supabase Storage
      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImagesToSupabase(result.id);
        // 3. Actualizar la propiedad con las URLs de las imágenes
        await propertyService.updateProperty(result.id, { images: imageUrls });
      }
      router.push("/dashboard/properties");
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
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
              <div>
                <label className="block font-medium mb-1">Imágenes (máx. 4)</label>
                <Input type="file" accept="image/*" multiple onChange={handleImageChange} max={4} />
                <div className="flex gap-2 mt-2">
                  {imagePreviews.map((src, idx) => (
                    <img key={idx} src={src} alt={`preview-${idx}`} className="w-20 h-20 object-cover rounded-lg border" />
                  ))}
                </div>
              </div>
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