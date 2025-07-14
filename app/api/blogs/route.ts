import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Obtener todos los blogs
export async function GET() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Crear un nuevo blog
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, author, image, order_index } = body;
  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, content, author, image, order_index }])
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// Actualizar un blog existente
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, title, content, author, image, order_index } = body;
  const { data, error } = await supabase
    .from("blogs")
    .update({ title, content, author, image, order_index })
    .eq("id", id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// Eliminar un blog
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
} 