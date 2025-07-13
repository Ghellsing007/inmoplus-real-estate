"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export default function TestUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("Usuario actual:", user);
    console.log("Archivo:", file);
    if (!user) {
      setMsg("Debes iniciar sesión para subir archivos.");
      return;
    }
    if (!file) {
      setMsg("Selecciona un archivo.");
      return;
    }
    setMsg("Subiendo...");
    const { data, error } = await supabase.storage
      .from("properties")
      .upload(`prueba/${file.name}`, file, { upsert: true });
    if (error) {
      setMsg("Error: " + error.message);
      console.error("Error subiendo:", error);
    } else {
      setMsg("¡Subida exitosa!");
      console.log("Subida exitosa:", data);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Prueba de subida a Supabase Storage</h2>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Subir</button>
      </div>
      <div style={{ marginTop: 16, color: "red" }}>{msg}</div>
      <div style={{ marginTop: 16 }}>
        Usuario actual: {user ? user.email : "No autenticado"}
      </div>
    </div>
  );
} 