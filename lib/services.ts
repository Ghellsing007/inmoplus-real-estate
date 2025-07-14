import { supabase } from './supabase'
import type { Database } from './supabase'

// Tipos de las tablas
type User = Database['public']['Tables']['users']['Row']
type Property = Database['public']['Tables']['properties']['Row']
type Agent = Database['public']['Tables']['agents']['Row']
type Appointment = Database['public']['Tables']['appointments']['Row']
type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
type Favorite = Database['public']['Tables']['favorites']['Row']

// ===== SERVICIOS DE USUARIOS =====
export const userService = {
  // Obtener usuario por ID
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    
    return data
  },

  // Obtener usuario por email
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) {
      console.error('Error fetching user by email:', error)
      return null
    }
    
    return data
  },

  // Crear nuevo usuario
  async createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user:', error)
      return null
    }
    
    return data
  },

  // Actualizar usuario
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user:', error)
      return null
    }
    
    return data
  },

  // Eliminar usuario
  async deleteUser(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting user:', error)
      return false
    }
    
    return true
  }
}

// ===== SERVICIOS DE PROPIEDADES =====
export const propertyService = {
  // Obtener todas las propiedades
  async getAllProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching properties:', error)
      return []
    }
    
    return data || []
  },

  // Obtener propiedades con filtros
  async getPropertiesWithFilters(filters: {
    city?: string
    property_type?: string
    status?: string
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
    bathrooms?: number
    minArea?: number
    maxArea?: number
    furnished?: boolean
    parking?: boolean
  }): Promise<Property[]> {
    try {
      console.log('Filtros recibidos en el servicio:', filters)
      
      let query = supabase.from('properties').select('*')
      
      if (filters.city) {
        query = query.eq('city', filters.city)
      }
      if (filters.property_type) {
        query = query.eq('property_type', filters.property_type)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }
      if (filters.bedrooms) {
        query = query.eq('bedrooms', filters.bedrooms)
      }
      if (filters.bathrooms) {
        query = query.eq('bathrooms', filters.bathrooms)
      }
      if (filters.minArea) {
        query = query.gte('area_sq_meters', filters.minArea)
      }
      if (filters.maxArea) {
        query = query.lte('area_sq_meters', filters.maxArea)
      }
      if (filters.furnished !== undefined) {
        query = query.eq('furnished', filters.furnished)
      }
      if (filters.parking !== undefined) {
        query = query.eq('parking', filters.parking)
      }
      
      console.log('Ejecutando consulta...')
      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching properties with filters:', error)
        console.error('Detalles del error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        return []
      }
      
      console.log('Propiedades encontradas:', data?.length || 0)
      return data || []
    } catch (error) {
      console.error('Error inesperado en getPropertiesWithFilters:', error)
      return []
    }
  },

  // Obtener propiedad por ID
  async getPropertyById(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching property:', error)
      return null
    }
    
    return data
  },

  // Obtener propiedades por agente
  async getPropertiesByAgent(agentId: string): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching properties by agent:', error)
      return []
    }
    
    return data || []
  },

  // Obtener propiedades destacadas
  async getFeaturedProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching featured properties:', error)
      return []
    }
    
    return data || []
  },

  // Crear nueva propiedad
  async createProperty(propertyData: Omit<Property, 'id' | 'created_at'>): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating property:', error)
      return null
    }
    
    return data
  },

  // Actualizar propiedad
  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating property:', error)
      return null
    }
    
    return data
  },

  // Eliminar propiedad
  async deleteProperty(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting property:', error)
      return false
    }
    
    return true
  },

  // Obtener agente por ID
  async getAgentById(id: string): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching agent:', error)
      return null
    }
    
    return data
  }
}

// ===== SERVICIOS DE AGENTES =====
export const agentService = {
  // Obtener todos los agentes
  async getAllAgents(): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('rating', { ascending: false })
    
    if (error) {
      console.error('Error fetching agents:', error)
      return []
    }
    
    return data || []
  },

  // Obtener agente por ID
  async getAgentById(id: string): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching agent:', error)
      return null
    }
    
    return data
  },

  // Crear nuevo agente
  async createAgent(agentData: Omit<Agent, 'id' | 'created_at'>): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .insert([agentData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating agent:', error)
      return null
    }
    
    return data
  },

  // Actualizar agente
  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating agent:', error)
      return null
    }
    
    return data
  }
}

// ===== SERVICIOS DE CITAS =====
export const appointmentService = {
  // Obtener citas por propiedad
  async getAppointmentsByProperty(propertyId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('property_id', propertyId)
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Error fetching appointments:', error)
      return []
    }
    
    return data || []
  },

  // Obtener citas por cliente
  async getAppointmentsByClient(clientEmail: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('client_email', clientEmail)
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Error fetching client appointments:', error)
      return []
    }
    
    return data || []
  },

  // Crear nueva cita
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at'>): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating appointment:', error)
      return null
    }
    
    return data
  },

  // Actualizar estado de cita
  async updateAppointmentStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating appointment status:', error)
      return null
    }
    
    return data
  },

  // Eliminar cita
  async deleteAppointment(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting appointment:', error)
      return false
    }
    
    return true
  }
}

// ===== SERVICIOS DE MENSAJES DE CONTACTO =====
export const contactMessageService = {
  // Obtener mensajes por agente
  async getMessagesByAgent(agentId: string): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching contact messages:', error)
      return []
    }
    
    return data || []
  },

  // Obtener mensajes por propiedad
  async getMessagesByProperty(propertyId: string): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching property messages:', error)
      return []
    }
    
    return data || []
  },

  // Crear nuevo mensaje
  async createMessage(messageData: Omit<ContactMessage, 'id' | 'created_at'>): Promise<ContactMessage | null> {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating contact message:', error)
      return null
    }
    
    return data
  },

  // Eliminar mensaje
  async deleteMessage(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting contact message:', error)
      return false
    }
    
    return true
  }
}

// ===== SERVICIOS DE FAVORITOS =====
export const favoriteService = {
  // Obtener favoritos de un usuario
  async getUserFavorites(userId: string): Promise<Property[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        property_id,
        properties (*)
      `)
      .eq('user_id', userId)
    
    if (error) {
      console.error('Error fetching user favorites:', error)
      return []
    }
    
    return data?.map(item => item.properties as Property[]).flat().filter(Boolean) || []
  },

  // Verificar si una propiedad está en favoritos
  async isPropertyFavorited(userId: string, propertyId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()
    
    if (error) {
      return false
    }
    
    return !!data
  },

  // Agregar a favoritos
  async addToFavorites(userId: string, propertyId: string): Promise<boolean> {
    console.log('[addToFavorites] userId:', userId, 'propertyId:', propertyId)
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, property_id: propertyId }])
    
    if (error) {
      console.error('Error adding to favorites:', error)
      console.error('Detalles del error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return false
    }
    
    return true
  },

  // Remover de favoritos
  async removeFromFavorites(userId: string, propertyId: string): Promise<boolean> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)
    
    if (error) {
      console.error('Error removing from favorites:', error)
      return false
    }
    
    return true
  }
} 

// ===== FUNCIONES DE CONVENIENCIA =====
// Función para obtener todas las propiedades (alias de getAllProperties)
export const getProperties = propertyService.getAllProperties

// Función para obtener todos los agentes (alias de getAllAgents)
export const getAgents = agentService.getAllAgents 

export const getPropertiesWithFilters = propertyService.getPropertiesWithFilters 