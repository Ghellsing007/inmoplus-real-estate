"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send } from "lucide-react"
import { contactMessageService } from "@/lib/services"
import { useAuth } from "@/hooks/useAuth"

interface ContactAgentFormProps {
  propertyId: string
  agentId: string
  agentEmail: string
  propertyTitle: string
  onClose: () => void
}

export default function ContactAgentForm({ propertyId, agentId, agentEmail, propertyTitle, onClose }: ContactAgentFormProps) {
  const { profile } = useAuth()
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo no es válido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const messageData = {
        property_id: propertyId,
        agent_id: agentId,
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        message: formData.message,
      }

      // Guardar en la base de datos
      const result = await contactMessageService.createMessage(messageData)

      // Enviar email al agente
      // Aquí debes obtener el email y título de la propiedad (puedes pasarlos como props o consultarlos)
      // Por simplicidad, aquí hago un fetch con datos de ejemplo:
      await fetch('/api/contact-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentEmail,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          message: formData.message,
          propertyTitle,
        })
      })

      if (result) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
        }, 2000)
      } else {
        throw new Error('Error al crear el mensaje')
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setErrors({ submit: "Error al enviar el mensaje. Por favor intenta de nuevo." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contactar Agente</CardTitle>
          <Button size="icon" onClick={onClose} className="bg-transparent">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Tu nombre completo"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="message">Mensaje *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Estoy interesado en esta propiedad. Me gustaría obtener más información..."
                rows={4}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
            </div>

            {errors.submit && (
              <div className="text-sm text-red-500 text-center">{errors.submit}</div>
            )}

            {success && (
              <div className="text-sm text-green-600 text-center font-medium">
                ¡Mensaje enviado exitosamente! El agente se pondrá en contacto contigo pronto.
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-transparent border border-gray-300"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isSubmitting || success}>
                {isSubmitting ? (
                  "Enviando..."
                ) : success ? (
                  "¡Enviado!"
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
