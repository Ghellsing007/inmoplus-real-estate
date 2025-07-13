import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las tablas de Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone?: string
          role: 'client' | 'agent' | 'admin'
          avatar?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string
          role?: 'client' | 'agent' | 'admin'
          avatar?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          role?: 'client' | 'agent' | 'admin'
          avatar?: string
          created_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          price: number
          location: string
          city: string
          address: string
          image: string
          images: string[]
          bedrooms: number
          bathrooms: number
          area: number
          type: 'casa' | 'apartamento' | 'oficina' | 'local' | 'terreno'
          operation: 'venta' | 'alquiler'
          description: string
          features: string[]
          furnished: boolean
          parking: boolean
          agent_id: string
          coordinates: {
            lat: number
            lng: number
          }
          featured?: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          price: number
          location: string
          city: string
          address: string
          image: string
          images?: string[]
          bedrooms: number
          bathrooms: number
          area: number
          type: 'casa' | 'apartamento' | 'oficina' | 'local' | 'terreno'
          operation: 'venta' | 'alquiler'
          description: string
          features?: string[]
          furnished?: boolean
          parking?: boolean
          agent_id: string
          coordinates?: {
            lat: number
            lng: number
          }
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          price?: number
          location?: string
          city?: string
          address?: string
          image?: string
          images?: string[]
          bedrooms?: number
          bathrooms?: number
          area?: number
          type?: 'casa' | 'apartamento' | 'oficina' | 'local' | 'terreno'
          operation?: 'venta' | 'alquiler'
          description?: string
          features?: string[]
          furnished?: boolean
          parking?: boolean
          agent_id?: string
          coordinates?: {
            lat: number
            lng: number
          }
          featured?: boolean
          created_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          avatar: string
          specialization: string
          rating: number
          reviews: number
          properties_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          avatar?: string
          specialization: string
          rating?: number
          reviews?: number
          properties_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          avatar?: string
          specialization?: string
          rating?: number
          reviews?: number
          properties_count?: number
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          property_id: string
          client_name: string
          client_email: string
          client_phone: string
          date: string
          time: string
          message?: string
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          client_name: string
          client_email: string
          client_phone: string
          date: string
          time: string
          message?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          client_name?: string
          client_email?: string
          client_phone?: string
          date?: string
          time?: string
          message?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          property_id: string
          agent_id: string
          client_name: string
          client_email: string
          client_phone: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          agent_id: string
          client_name: string
          client_email: string
          client_phone: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          agent_id?: string
          client_name?: string
          client_email?: string
          client_phone?: string
          message?: string
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
      }
    }
  }
} 