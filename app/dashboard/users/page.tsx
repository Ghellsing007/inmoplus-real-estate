"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  const { profile } = useAuth();

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Cargando usuarios...</div>;
  }

  if (profile.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Acceso denegado. Solo administradores pueden ver esta sección.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Aquí podrás ver, editar y cambiar roles de los usuarios. (Funcionalidad próximamente)</p>
        </CardContent>
      </Card>
    </div>
  );
} 