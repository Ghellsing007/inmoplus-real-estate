import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import PropertyDetails from "@/components/PropertyDetails"
import Footer from "@/components/Footer"
import { propertyService } from '@/lib/services'

export default async function PropertyPage({ params }: { params: { id: string } }) {
  // Obtener la propiedad real desde Supabase
  const property = await propertyService.getPropertyById(params.id)
  if (!property) {
    notFound()
  }

  // Obtener el agente real desde Supabase
  let agent = null
  if (property.agent_id) {
    agent = await propertyService.getAgentById(property.agent_id)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <PropertyDetails property={property} agent={agent} />
      <Footer />
    </div>
  )
}
