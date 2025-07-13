"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function DashboardPropertiesPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (profile && profile.role === "client"))) {
      router.push("/");
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Mis Propiedades</CardTitle>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/dashboard/properties/new")}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Nueva Propiedad
            </Button>
          </CardHeader>
          <CardContent>
            {/* Aquí irá el listado de propiedades del agente/admin */}
            <div className="text-gray-500 text-center py-12">Aún no tienes propiedades registradas.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 