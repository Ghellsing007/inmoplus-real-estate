import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Obtener todos los testimonios
export async function GET() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Crear un nuevo testimonio
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, role, testimonial, rating, image, order_index } = body;
  const { data, error } = await supabase
    .from("testimonials")
    .insert([{ name, role, testimonial, rating, image, order_index }])
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// Actualizar un testimonio existente
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, name, role, testimonial, rating, image, order_index } = body;
  const { data, error } = await supabase
    .from("testimonials")
    .update({ name, role, testimonial, rating, image, order_index })
    .eq("id", id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// Eliminar un testimonio
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
} 