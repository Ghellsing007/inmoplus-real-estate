"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Building2, Users, Heart, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function DashboardHome() {
  const { profile } = useAuth();

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  // Accesos directos admin (puedes agregar más objetos a este array y el carrusel los mostrará automáticamente)
  const adminCards = [
    {
      title: "Gestión de Usuarios",
      icon: <Users className="h-5 w-5" />,
      desc: "Administra los usuarios de la plataforma, cambia roles y gestiona permisos.",
      href: "/dashboard/users",
      link: "Ir a Usuarios",
    },
    {
      title: "Gestión de Propiedades",
      icon: <Building2 className="h-5 w-5" />,
      desc: "Crea, edita y elimina propiedades de todos los agentes.",
      href: "/dashboard/properties",
      link: "Ir a Propiedades",
    },
    {
      title: "Gestión de Agentes",
      icon: <Users className="h-5 w-5" />,
      desc: "Crea, edita y elimina agentes inmobiliarios de la plataforma.",
      href: "/dashboard/agents",
      link: "Ir a Agentes",
    },
    {
      title: "Gestión de FAQs",
      icon: <Building2 className="h-5 w-5" />,
      desc: "Administra las preguntas frecuentes que se muestran a los usuarios en la web.",
      href: "/dashboard/faqs",
      link: "Ir a FAQs",
    },
    {
      title: "Gestión de Blogs",
      icon: <Building2 className="h-5 w-5" />,
      desc: "Crea, edita y elimina entradas del blog de la plataforma.",
      href: "/dashboard/blogs",
      link: "Ir a Blogs",
    },
    // Agrega aquí más accesos directos según se necesiten
  ];

  // Agrupar los accesos en slides de 4
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }
  const adminSlides = chunkArray(adminCards, 4);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {profile.role === "admin" && (
        <Carousel className="mb-8 w-full max-w-5xl mx-auto" opts={{ slidesToScroll: 1 }}>
          <CarouselContent>
            {adminSlides.map((slide, idx) => (
              <CarouselItem key={idx} className="flex gap-6">
                {slide.map((card) => (
                  <Card key={card.href} className="flex-1 min-w-0 max-w-xs w-full h-64 flex flex-col justify-between items-center p-4">
                    <CardHeader className="w-full flex flex-col items-center justify-center p-0 mb-2">
                      <CardTitle className="flex items-center gap-2 text-lg text-center w-full justify-center">{card.icon} {card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between w-full p-0">
                      <p className="mb-4 text-base text-center break-words line-clamp-4 max-h-20 overflow-hidden">{card.desc}</p>
                      <Link href={card.href} className="text-blue-600 hover:underline font-semibold mt-auto block text-center truncate w-full">{card.link}</Link>
                    </CardContent>
                  </Card>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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