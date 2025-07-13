"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Building2, Users, Heart, User } from "lucide-react";

export default function DashboardHome() {
  const { profile } = useAuth();

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Admin: ver todo */}
      {profile.role === "admin" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Administra los usuarios de la plataforma, cambia roles y gestiona permisos.</p>
              <Link href="/dashboard/users" className="text-blue-600 hover:underline font-semibold">Ir a Usuarios</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Gestión de Propiedades</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Crea, edita y elimina propiedades de todos los agentes.</p>
              <Link href="/dashboard/properties" className="text-blue-600 hover:underline font-semibold">Ir a Propiedades</Link>
            </CardContent>
          </Card>
        </>
      )}
      {/* Agente: solo propiedades */}
      {profile.role === "agent" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Mis Propiedades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Gestiona tus propiedades, crea nuevas y edita las existentes.</p>
            <Link href="/dashboard/properties" className="text-blue-600 hover:underline font-semibold">Ir a Mis Propiedades</Link>
          </CardContent>
        </Card>
      )}
      {/* Cliente: solo favoritos */}
      {profile.role === "client" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5" /> Mis Favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Visualiza y gestiona tus propiedades favoritas.</p>
            <Link href="/dashboard/favorites" className="text-blue-600 hover:underline font-semibold">Ir a Favoritos</Link>
          </CardContent>
        </Card>
      )}
      {/* Todos: perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Mi Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Edita tu información personal y cambia tu contraseña.</p>
          <Link href="/dashboard/profile" className="text-blue-600 hover:underline font-semibold">Ir a Mi Perfil</Link>
        </CardContent>
      </Card>
    </div>
  );
} 