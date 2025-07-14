"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard, { PropertyCardSkeleton } from "@/components/PropertyCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      setLoading(true);
      // Obtener favoritos del usuario
      const { data: favs, error } = await supabase
        .from("favorites")
        .select("property_id, properties(*)")
        .eq("user_id", user.id);
      setFavorites(favs?.map(f => f.properties).filter(Boolean) || []);
      setLoading(false);
    };
    fetchFavorites();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Mis Favoritos</h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : (!loading && favorites.length === 0) ? (
          <div className="text-center text-gray-500 py-12">No tienes propiedades favoritas aún.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 