"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User, Home, Users, Heart, Menu, ChevronLeft, ChevronRight, Building2} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { branding } from "@/lib/branding"

const menuIcons: Record<string, any> = {
  "/dashboard/profile": User,
  "/dashboard/properties": Building2,
  "/dashboard/users": Users,
  "/dashboard/favorites": Heart,
  
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { href: "/dashboard/profile", label: "Mi Perfil", roles: ["admin", "agent", "client"] },
    { href: "/dashboard/properties", label: "Propiedades", roles: ["admin", "agent"] },
    { href: "/dashboard/agents", label: "Agentes", roles: ["admin"] },
    { href: "/dashboard/users", label: "Usuarios", roles: ["admin"] },
    { href: "/dashboard/faqs", label: "FAQs", roles: ["admin"] },
    { href: "/dashboard/blogs", label: "Blogs", roles: ["admin"] },
    { href: "/dashboard/testimonials", label: "testimonials", roles: ["admin"] },
    { href: "/dashboard/favorites", label: "Favoritos", roles: ["client"] },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-slate-50">
        {/* Sidebar */}
        <aside className={cn("h-screen bg-white border-r border-slate-200 p-4 flex flex-col transition-all duration-300", collapsed ? "w-20" : "w-64") + " hidden md:flex"}>
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className={cn("text-xl font-bold text-blue-700 transition-all", collapsed && "hidden")}>{branding.appName}</Link>
            <button
              className="p-1 rounded hover:bg-blue-100 transition ml-auto"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Expandir/Colapsar sidebar"
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {links.filter(l => profile && l.roles.includes(profile.role)).map(link => {
              const Icon = menuIcons[link.href] || Home;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded transition-colors font-medium",
                    pathname === link.href ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? link.label : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>
        {/* Sidebar móvil */}
        <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 z-50">
          {links.filter(l => profile && l.roles.includes(profile.role)).map(link => {
            const Icon = menuIcons[link.href] || Home;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center px-2 py-1 rounded text-xs font-medium",
                  pathname === link.href ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                )}
                title={link.label}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </aside>
        {/* Contenido principal */}
        <main className="flex-1 p-6 md:ml-20 pb-20 md:pb-0 transition-all duration-300">{children}</main>
      </div>
      <Footer />
    </>
  );
} 