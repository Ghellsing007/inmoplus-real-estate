import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const operation = searchParams.get("operation")
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const location = searchParams.get("location")
    const city = searchParams.get("city") // por compatibilidad

    let query = supabase.from("properties").select("*")

    // Filtros
    if (operation && operation !== "all") {
      query = query.eq("operation", operation)
    }
    if (type && type !== "all") {
      query = query.eq("type", type)
    }
    if (minPrice) {
      query = query.gte("price", Number(minPrice))
    }
    if (maxPrice) {
      query = query.lte("price", Number(maxPrice))
    }
    // location puede ser ciudad o barrio, priorizamos city
    if (city && city.trim() !== "") {
      query = query.ilike("city", `%${city}%`)
    } else if (location && location.trim() !== "") {
      query = query.ilike("city", `%${location}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: false })
    if (error) throw error

    return NextResponse.json({
      properties: data || [],
      total: data?.length || 0,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties", success: false }, { status: 500 })
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ error: "POST no implementado. Usa Supabase para crear propiedades." }, { status: 501 })
}
