"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PropertyCard, { PropertyCardSkeleton } from "@/components/PropertyCard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react"

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { profile, loading: loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      timeout = setTimeout(() => {
        setError("La carga está tardando más de lo normal. Por favor, espera o recarga la página.");
      }, 7000); // 7 segundos
      const { data, error } = await supabase
        .from("properties")
        .select("id,title,price,images,city,address,bedrooms,bathrooms,area_sq_meters")
        .order("created_at", { ascending: false })
        .limit(20);
      console.log("PROPS:", data, error);
      clearTimeout(timeout);
      if (error) setError(error.message);
      else setProperties(data || []);
      setLoading(false);
    };
    fetchProperties();
    return () => clearTimeout(timeout);
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/properties/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Error al eliminar: " + error.message);
    }
  };

  const canManage = (profile: any) => {
    return profile && (profile.role === "admin" || profile.role === "agent");
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Propiedades disponibles</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          onClick={() => router.push("/dashboard/properties/new")}
        >
          <Plus className="h-5 w-5" />
          Nueva propiedad
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [...Array(6)].map((_, i) => <PropertyCardSkeleton key={i} />)
          : properties.map((prop) => (
              <div key={prop.id} className="relative group">
                <PropertyCard property={prop} />
                {canManage(profile) && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(prop.id)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(prop.id)}>
                      Eliminar
                    </Button>
                  </div>
                )}
              </div>
            ))}
      </div>
      {(!loading && properties.length === 0) && (
        <div className="text-center text-gray-500 mt-10">No hay propiedades disponibles.</div>
      )}
    </div>
  );
} 