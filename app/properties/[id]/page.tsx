import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import PropertyDetails from "@/components/PropertyDetails"
import Footer from "@/components/Footer"

// Mock data - In a real app, this would come from your database
const getProperty = async (id: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100))

  const properties = [
    {
      id: "1",
      title: "Villa mediterránea con vista al mar",
      price: 850000,
      location: "Costa Brava, España",
      address: "Calle del Mar 123, Costa Brava, España",
      images: [
        "/images/modern-villa.jpg",
        "/images/coastal-bay.jpg",
        "/images/modern-interior.jpg",
        "/images/garden-house.jpg",
      ],
      bedrooms: 4,
      bathrooms: 3,
      area: 320,
      type: "villa",
      operation: "venta" as const,
      description:
        "Espectacular villa mediterránea ubicada en primera línea de mar con vistas panorámicas al Mediterráneo. Esta propiedad única combina el lujo moderno con el encanto tradicional mediterráneo. Cuenta con amplios espacios, acabados de primera calidad y un diseño que maximiza la entrada de luz natural. La villa incluye una piscina infinita, jardines paisajísticos y acceso directo a una playa privada.",
      features: ["garage", "garden", "pool", "security", "wifi"],
      furnished: true,
      parking: true,
      coordinates: {
        lat: 41.9794,
        lng: 2.8214,
      },
      agent: {
        id: "1",
        name: "Carlos Mendoza",
        phone: "+34 123 456 789",
        email: "carlos@inmoplus.com",
        avatar: "/images/agent-profile.png",
      },
    },
    {
      id: "9",
      title: "Cabaña elevada en el bosque",
      price: 320000,
      location: "Bosques del Norte, Canadá",
      address: "Forest Trail 456, Northern Woods, Canadá",
      images: ["/images/treehouse-cabin.jpg", "/images/forest-aframe.jpg", "/images/log-cabin.jpg"],
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      type: "cabaña",
      operation: "venta" as const,
      description:
        "Una experiencia única de vida en armonía con la naturaleza. Esta cabaña elevada ofrece una perspectiva única del bosque circundante, con un diseño sostenible que respeta el entorno natural. Perfecta para quienes buscan un refugio tranquilo lejos del bullicio urbano.",
      features: ["garden", "wifi", "security"],
      furnished: false,
      parking: true,
      coordinates: {
        lat: 45.4215,
        lng: -75.6972,
      },
      agent: {
        id: "2",
        name: "María González",
        phone: "+1 555 123 4567",
        email: "maria@inmoplus.com",
        avatar: "/images/agent-profile.png",
      },
    },
  ]

  return properties.find((p) => p.id === id)
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    return {
      title: "Propiedad no encontrada - InmoPlus",
    }
  }

  return {
    title: `${property.title} - InmoPlus`,
    description: property.description.substring(0, 160),
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <PropertyDetails property={property} />
      <Footer />
    </div>
  )
}
