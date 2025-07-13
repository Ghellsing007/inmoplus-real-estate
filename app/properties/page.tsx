import Navbar from "@/components/Navbar"
import PropertyGrid from "@/components/PropertyGrid"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Propiedades - InmoPlus",
  description:
    "Explora nuestra amplia selección de propiedades en venta y alquiler. Encuentra tu hogar ideal con InmoPlus.",
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Todas las Propiedades</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora nuestra completa base de datos de propiedades disponibles para compra y alquiler
            </p>
          </div>
        </div>
        <PropertyGrid />
      </div>
      <Footer />
    </div>
  )
}
