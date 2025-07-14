"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { propertyService } from "@/lib/services";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";
import { Skeleton } from "@/components/ui/skeleton"

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

function FormSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-1/4 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-5 w-1/4 mb-2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-5 w-1/4 mb-2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-5 w-1/4 mb-2" />
              <Skeleton className="h-10 w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { startUpload } = useUploadThing("inmuebleImage");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado para tipos y operaciones dinámicos
  const [propertyTypes, setPropertyTypes] = useState<{ value: string, label: string }[]>([])
  const [operations, setOperations] = useState<{ value: string, label: string }[]>([])
  useEffect(() => {
    async function fetchTypesAndOperations() {
      // Tipos de propiedad
      const { data: typesData } = await supabase
        .from('properties')
        .select('property_type')
        .neq('property_type', null)
        .neq('property_type', '')
        .order('property_type', { ascending: true })
      if (typesData) {
        const uniqueTypes = Array.from(new Set(typesData.map((d: any) => d.property_type)))
        setPropertyTypes(uniqueTypes.map((type: string) => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) })))
      }
      // Operaciones
      const { data: opsData } = await supabase
        .from('properties')
        .select('operation')
        .neq('operation', null)
        .neq('operation', '')
        .order('operation', { ascending: true })
      if (opsData) {
        const uniqueOps = Array.from(new Set(opsData.map((d: any) => d.operation)))
        setOperations(uniqueOps.map((op: string) => ({ value: op, label: op.charAt(0).toUpperCase() + op.slice(1) })))
      }
    }
    fetchTypesAndOperations()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: typeof form) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev =>
        [...prev, ...Array.from(e.target.files)].slice(0, 4)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!profile?.id) throw new Error("No se pudo identificar al agente.");
      if (profile.role !== "admin" && profile.role !== "agent") {
        throw new Error("Solo agentes o administradores pueden crear propiedades.");
      }
      // Subir imágenes solo al guardar
      let urls: string[] = [];
      if (selectedFiles.length > 0) {
        const res = await startUpload(selectedFiles);
        urls = (res ?? []).map((r: any) => r.url);
        setImageUrls(urls);
      }
      // Verificar si el agente existe, si no, crearlo
      const agentId = profile.id;
      const agentEmail = profile.email;
      const agentName = profile.display_name || profile.name || agentEmail;
      const agentPhone = profile.phone || '';
      const agentAvatar = profile.avatar || '';
      const { data: existingAgent } = await supabase
        .from('agents')
        .select('id')
        .eq('id', agentId)
        .single();
      if (!existingAgent) {
        await supabase.from('agents').insert([{
          id: agentId,
          name: agentName,
          email: agentEmail,
          phone: agentPhone,
          avatar_url: agentAvatar,
          bio: '',
          specialties: [],
          experience_years: 0,
          languages: [],
          certifications: [],
          rating: 0,
          total_sales: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      }
      const propertyData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        location: form.city,
        address: form.address,
        city: form.city,
        property_type: form.type,
        operation: form.operation,
        status: "disponible",
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area_sq_meters: Number(form.area),
        year_built: null,
        features: form.features.split(",").map((f: string) => f.trim()).filter(Boolean),
        amenities: [],
        images: urls,
        image: urls[0] || "",
        agent_id: profile.id,
        furnished: form.furnished,
        parking: form.parking,
        latitude: 0,
        longitude: 0,
        coordinates: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await propertyService.createProperty(propertyData);
      if (!result || !result.id) throw new Error("No se pudo guardar la propiedad.");
      router.push("/dashboard/properties");
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <FormSkeleton />

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
                  <Select name="type" value={form.type} onValueChange={(value: string) => setForm((prev) => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Operación</label>
                  <Select name="operation" value={form.operation} onValueChange={(value: string) => setForm((prev) => ({ ...prev, operation: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Operación" />
                    </SelectTrigger>
                    <SelectContent>
                      {operations.map((op) => (
                        <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                      ))}
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
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  max={4}
                  onChange={handleFileChange}
                />
                <div className="flex gap-2 mt-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="relative w-20 h-20">
                      <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className="w-20 h-20 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        title="Eliminar imagen"
                      >
                        ×
                      </button>
                    </div>
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