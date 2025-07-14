"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { startUpload } = useUploadThing("inmuebleImage");

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

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (error) setError(error.message);
      else setProperty(data);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  // Manejo de imágenes (array de URLs)
  const handleImageChange = (idx: number, value: string) => {
    const newImages = [...(property.images || [])];
    newImages[idx] = value;
    setProperty({ ...property, images: newImages });
  };
  const handleAddImage = () => {
    setProperty({ ...property, images: [...(property.images || []), ""] });
  };
  const handleRemoveImage = (idx: number) => {
    const newImages = [...(property.images || [])];
    newImages.splice(idx, 1);
    setProperty({ ...property, images: newImages });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev =>
        [...prev, ...Array.from(e.target.files)].slice(0, 4 - (property.images?.length || 0))
      );
    }
  };
  const handleUploadImages = async () => {
    setUploading(true);
    try {
      if (selectedFiles.length > 0) {
        const res = await startUpload(selectedFiles);
        const urls = (res ?? []).map((r: any) => r.url);
        setProperty((prev: any) => ({ ...prev, images: [...(prev.images || []), ...urls] }));
        setSelectedFiles([]);
      }
    } catch (err) {
      alert("Error subiendo imágenes");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error } = await supabase
      .from("properties")
      .update({
        title: property.title,
        price: property.price,
        address: property.address,
        city: property.city,
        description: property.description,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area_sq_meters: property.area_sq_meters,
        images: property.images || [],
      })
      .eq("id", id);
    setSaving(false);
    if (error) setError(error.message);
    else router.push("/dashboard/properties");
  };

  if (loading) return <div className="p-8">Cargando propiedad...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!property) return <div className="p-8">Propiedad no encontrada.</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Editar propiedad</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          name="title"
          value={property.title || ""}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="price"
          type="number"
          value={property.price || ""}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="address"
          value={property.address || ""}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="city"
          value={property.city || ""}
          onChange={handleChange}
          placeholder="Ciudad"
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          name="description"
          value={property.description || ""}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="bedrooms"
          type="number"
          value={property.bedrooms || ""}
          onChange={handleChange}
          placeholder="Habitaciones"
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="bathrooms"
          type="number"
          value={property.bathrooms || ""}
          onChange={handleChange}
          placeholder="Baños"
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="area_sq_meters"
          type="number"
          value={property.area_sq_meters || ""}
          onChange={handleChange}
          placeholder="Área (m²)"
        />
        {/* Select dinámico para tipo */}
        <Select name="property_type" value={property.property_type || ""} onValueChange={(value: string) => setProperty({ ...property, property_type: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de propiedad" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Select dinámico para operación */}
        <Select name="operation" value={property.operation || ""} onValueChange={(value: string) => setProperty({ ...property, operation: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Operación" />
          </SelectTrigger>
          <SelectContent>
            {operations.map((op) => (
              <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Campo para editar imágenes (array de URLs) con subida */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold">Imágenes (máx. 4)</label>
            <Button type="button" size="sm" onClick={handleAddImage} disabled={(property.images?.length || 0) + selectedFiles.length >= 4}>
              + Añadir URL manual
            </Button>
          </div>
          <div className="space-y-2">
            {(property.images || []).map((img: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  className="w-full border rounded px-3 py-2"
                  value={img}
                  onChange={e => handleImageChange(idx, e.target.value)}
                  placeholder="URL de la imagen"
                />
                {img && (
                  <img src={img} alt="preview" className="w-16 h-16 object-cover rounded" />
                )}
                <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveImage(idx)}>
                  ×
                </Button>
              </div>
            ))}
          </div>
          {/* Subida de nuevas imágenes */}
          <div className="mt-4">
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              multiple
              max={4 - (property.images?.length || 0)}
              onChange={handleFileChange}
              disabled={(property.images?.length || 0) >= 4}
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
            {selectedFiles.length > 0 && (
              <Button type="button" className="mt-2" onClick={handleUploadImages} disabled={uploading}>
                {uploading ? "Subiendo..." : "Subir imágenes"}
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/properties")}>Cancelar</Button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
} 