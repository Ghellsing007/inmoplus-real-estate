"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specialization: string;
  rating: number;
  reviews: number;
  properties_count: number;
}

const initialForm: Partial<Agent> = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
  specialization: "Residencial",
  rating: 0,
  reviews: 0,
  properties_count: 0,
};

export default function AgentsDashboardPage() {
  const { profile } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Agent | null>(null);
  const [form, setForm] = useState<Partial<Agent>>(initialForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.role === "admin") {
      fetchAgents();
    }
    // eslint-disable-next-line
  }, [profile]);

  const fetchAgents = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.from("agents").select("*");
    if (error) setError(error.message);
    else setAgents(data || []);
    setLoading(false);
  };

  const handleEdit = (agent: Agent) => {
    setEditing(agent);
    setForm(agent);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este agente?")) return;
    setDeleting(id);
    const { error } = await supabase.from("agents").delete().eq("id", id);
    if (error) setError(error.message);
    else await fetchAgents();
    setDeleting(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!form.name || !form.email || !form.phone) throw new Error("Nombre, email y teléfono son obligatorios");
      if (editing) {
        // Editar
        const { error } = await supabase.from("agents").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        // Crear
        const { error } = await supabase.from("agents").insert([{ ...form }]);
        if (error) throw error;
      }
      setEditing(null);
      setForm(initialForm);
      await fetchAgents();
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Cargando agentes...</div>;
  }

  if (profile.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Acceso denegado. Solo administradores pueden ver esta sección.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Agentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando agentes...</div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">{error}</div>
          ) : (
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Teléfono</th>
                    <th className="p-2 border">Especialización</th>
                    <th className="p-2 border">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-b">
                      <td className="p-2 border">{agent.name}</td>
                      <td className="p-2 border">{agent.email}</td>
                      <td className="p-2 border">{agent.phone}</td>
                      <td className="p-2 border">{agent.specialization}</td>
                      <td className="p-2 border">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(agent)}>
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="ml-2"
                          onClick={() => handleDelete(agent.id)}
                          disabled={deleting === agent.id}
                        >
                          {deleting === agent.id ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Formulario de crear/editar */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">{editing ? "Editar Agente" : "Agregar Nuevo Agente"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Nombre"
                value={form.name || ""}
                onChange={handleFormChange}
                required
              />
              <Input
                name="email"
                placeholder="Email"
                value={form.email || ""}
                onChange={handleFormChange}
                required
              />
              <Input
                name="phone"
                placeholder="Teléfono"
                value={form.phone || ""}
                onChange={handleFormChange}
                required
              />
              <Input
                name="avatar"
                placeholder="Avatar URL"
                value={form.avatar || ""}
                onChange={handleFormChange}
              />
              <Input
                name="specialization"
                placeholder="Especialización"
                value={form.specialization || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Guardando..." : editing ? "Guardar Cambios" : "Agregar Agente"}
              </Button>
              {editing && (
                <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm(initialForm); }}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 