import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Obtener todas las FAQs
export async function GET() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Crear una nueva FAQ
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Aquí deberías validar que el usuario es admin (opcional: si tienes auth en Next)
  const { question, answer, order_index } = body;
  const { data, error } = await supabase
    .from("faqs")
    .insert([{ question, answer, order_index }])
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// Actualizar una FAQ existente
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, question, answer, order_index } = body;
  const { data, error } = await supabase
    .from("faqs")
    .update({ question, answer, order_index })
    .eq("id", id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// Eliminar una FAQ
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase
    .from("faqs")
    .delete()
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
} 