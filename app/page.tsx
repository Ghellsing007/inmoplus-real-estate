import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import PropertyCategories from "@/components/PropertyCategories"
import LifestyleSection from "@/components/LifestyleSection"
import PropertyGrid from "@/components/PropertyGrid"
import AboutUsSection from "@/components/AboutUsSection"
import Testimonials from "@/components/Testimonials"
import FaqSection from "@/components/FaqSection"
import Footer from "@/components/Footer"

export default function Home() {
  // Mock authentication state - In a real app, this would come from your auth provider
  const mockUser = {
    name: "Juan Pérez",
    email: "juan@example.com",
    avatar: "/images/agent-profile.png",
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar/>
      <HeroSection />
      <PropertyGrid />
      <AboutUsSection />
      <Testimonials />
      <FaqSection />
      <Footer />
    </div>
  )
}
