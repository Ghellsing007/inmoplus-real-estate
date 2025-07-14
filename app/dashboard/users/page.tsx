"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"

const ROLES = ["admin", "agent", "client"] as const;

type UserRow = {
  id: string;
  display_name?: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.role === "admin") {
      fetchUsers();
    }
    // eslint-disable-next-line
  }, [profile]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.from("users").select("id, display_name, email, role");
    if (error) setError(error.message);
    else setUsers(data || []);
    setLoading(false);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdating(userId);
    const { error } = await supabase.from("users").update({ role: newRole }).eq("id", userId);
    if (error) setError(error.message);
    else await fetchUsers();
    setUpdating(null);
  };

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
          {loading ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Rol</th>
                    <th className="p-2 border">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(4)].map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 border"><Skeleton className="h-4 w-24" /></td>
                      <td className="p-2 border"><Skeleton className="h-4 w-32" /></td>
                      <td className="p-2 border"><Skeleton className="h-4 w-16" /></td>
                      <td className="p-2 border flex gap-2"><Skeleton className="h-8 w-20" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No hay usuarios registrados.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Rol</th>
                    <th className="p-2 border">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2 border">{user.display_name || <span className="text-gray-400">Sin nombre</span>}</td>
                      <td className="p-2 border">{user.email}</td>
                      <td className="p-2 border font-semibold">{user.role}</td>
                      <td className="p-2 border">
                        <Select
                          value={user.role}
                          onValueChange={newRole => handleRoleChange(user.id, newRole)}
                          disabled={updating === user.id}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLES.map(role => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {updating === user.id && <span className="ml-2 text-xs text-blue-600">Actualizando...</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 