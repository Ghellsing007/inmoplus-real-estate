"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { profile, updateProfile, resetPassword } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    display_name: profile?.display_name || "",
    phone: profile?.phone || ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Cargando perfil...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const { error } = await updateProfile({ display_name: form.display_name, phone: form.phone });
    setLoading(false);
    if (error) {
      setError(typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : JSON.stringify(error) || "Error al guardar los cambios");
    } else {
      setSuccess("Perfil actualizado correctamente");
      setEditMode(false);
    }
  };

  const handlePasswordReset = async () => {
    setPwLoading(true);
    setPwSuccess("");
    setPwError("");
    const { error } = await resetPassword(profile.email);
    setPwLoading(false);
    if (error) {
      setPwError("Error al enviar el email de cambio de contraseña");
    } else {
      setPwSuccess("Te hemos enviado un email para cambiar tu contraseña.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Mi Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="font-semibold">Nombre:</label>
                  <Input name="display_name" value={form.display_name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="font-semibold">Teléfono:</label>
                  <Input name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)} disabled={loading}>Cancelar</Button>
                </div>
                {success && <div className="text-green-600 text-sm">{success}</div>}
                {error && <div className="text-red-600 text-sm">{error}</div>}
              </form>
            ) : (
              <>
                <div>
                  <span className="font-semibold">Nombre:</span> {profile.display_name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {profile.email}
                </div>
                <div>
                  <span className="font-semibold">Rol:</span> {profile.role}
                </div>
                <div>
                  <span className="font-semibold">Teléfono:</span> {profile.phone || "-"}
                </div>
                <div className="pt-4 flex gap-2">
                  <Button variant="outline" onClick={() => setEditMode(true)}>Editar datos</Button>
                  <Button variant="secondary" onClick={handlePasswordReset} disabled={pwLoading}>{pwLoading ? "Enviando..." : "Cambiar contraseña"}</Button>
                </div>
                {pwSuccess && <div className="text-green-600 text-sm mt-2">{pwSuccess}</div>}
                {pwError && <div className="text-red-600 text-sm mt-2">{pwError}</div>}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 