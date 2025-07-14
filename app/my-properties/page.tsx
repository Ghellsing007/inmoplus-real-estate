"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MyPropertiesPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("agent_id", user.id)
        .order("created_at", { ascending: false });
      setProperties(data || []);
      setLoading(false);
    };
    fetchProperties();
  }, [user]);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/properties/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) return;
    setDeleting(id);
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Error al eliminar: " + error.message);
    }
    setDeleting(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Mis Propiedades</h1>
        {loading ? (
          <div className="text-center py-12">Cargando propiedades...</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No has publicado ninguna propiedad aún.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="relative group">
                <PropertyCard property={property} />
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(property.id)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(property.id)} disabled={deleting === property.id}>
                    {deleting === property.id ? "Eliminando..." : "Eliminar"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 