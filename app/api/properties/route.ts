import { NextResponse } from "next/server"

// Mock data - In a real application, this would come from a database
const properties = [
  {
    id: "1",
    title: "Villa mediterránea con vista al mar",
    price: 850000,
    location: "Costa Brava, España",
    type: "casa",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    description: "Espectacular villa mediterránea con vistas panorámicas al mar, piscina privada y jardín tropical.",
    images: ["/images/modern-villa.jpg"],
    featured: true,
    operation: "venta",
    agent_id: "1",
    created_at: new Date().toISOString(),
    features: ["garage", "garden", "pool", "security"],
  },
  {
    id: "2",
    title: "Apartamento en casco histórico",
    price: 2200,
    location: "Sevilla, Centro Histórico",
    type: "apartamento",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    description: "Encantador apartamento en el corazón del casco histórico sevillano, completamente renovado.",
    images: ["/images/european-street.jpg"],
    featured: false,
    operation: "alquiler",
    agent_id: "2",
    created_at: new Date().toISOString(),
    features: ["balcony", "elevator", "security"],
  },
  {
    id: "3",
    title: "Casa colonial con encanto",
    price: 650000,
    location: "Cádiz, Zona Antigua",
    type: "casa",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description: "Hermosa casa colonial restaurada con todos los detalles arquitectónicos originales preservados.",
    images: ["/images/colonial-building.jpg"],
    featured: false,
    operation: "venta",
    agent_id: "3",
    created_at: new Date().toISOString(),
    features: ["balcony", "garden"],
  },
  {
    id: "4",
    title: "Propiedad única en acantilado",
    price: 1200000,
    location: "Cuenca, Casas Colgadas",
    type: "casa",
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    description: "Propiedad histórica única construida en el acantilado con vistas espectaculares al valle.",
    images: ["/images/cliff-houses.jpg"],
    featured: true,
    operation: "venta",
    agent_id: "1",
    created_at: new Date().toISOString(),
    features: ["security", "garden"],
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const operation = searchParams.get("operation")
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const location = searchParams.get("location")

    let filteredProperties = properties

    // Apply filters
    if (operation && operation !== "all") {
      filteredProperties = filteredProperties.filter((p) => p.operation === operation)
    }

    if (type && type !== "all") {
      filteredProperties = filteredProperties.filter((p) => p.type === type)
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price <= Number.parseInt(maxPrice))
    }

    if (location) {
      filteredProperties = filteredProperties.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()))
    }

    return NextResponse.json({
      properties: filteredProperties,
      total: filteredProperties.length,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties", success: false }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "price", "location", "type", "bedrooms", "bathrooms", "area", "operation"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}`, success: false }, { status: 400 })
      }
    }

    // Create new property
    const newProperty = {
      id: (properties.length + 1).toString(),
      ...body,
      created_at: new Date().toISOString(),
      featured: false,
    }

    properties.push(newProperty)

    return NextResponse.json(
      {
        property: newProperty,
        message: "Property created successfully",
        success: true,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Failed to create property", success: false }, { status: 500 })
  }
}
