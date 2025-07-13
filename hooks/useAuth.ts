'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['users']['Row']

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        // No intentar obtener el perfil automáticamente para evitar errores
        // El perfil se obtendrá solo cuando sea necesario
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        setUser(session?.user ?? null)
        
        // Limpiar perfil cuando el usuario se desconecta
        if (!session?.user) {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Sincronización automática: crear usuario en la tabla users si no existe
  useEffect(() => {
    const syncUserProfile = async () => {
      if (!user) return
      // Buscar el perfil en la tabla users
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()
      if (!data) {
        // Crear el usuario en la tabla users
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email,
              phone: user.phone || null
            }
          ])
        if (insertError) {
          console.error('Error creando usuario sincronizado:', insertError)
        } else {
          console.log('Usuario sincronizado en tabla users')
        }
      }
    }
    syncUserProfile()
  }, [user])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId)
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // Si el perfil no existe, no es un error crítico
        if (error.code === 'PGRST116') {
          console.log('Profile not found for user:', userId, '- This is normal for new users')
          setProfile(null)
          return
        }
        
        // Para otros errores, solo logear pero no mostrar error al usuario
        console.log('Error fetching profile (non-critical):', error.message)
        setProfile(null)
        return
      }

      console.log('Profile fetched successfully:', data)
      setProfile(data)
    } catch (error) {
      // Capturar cualquier error inesperado y no mostrarlo al usuario
      console.log('Unexpected error fetching profile (non-critical):', error)
      setProfile(null)
    }
  }

  const signUp = async (email: string, password: string, userData: {
    full_name: string
    phone?: string
  }) => {
    try {
      console.log('Signing up user:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone
          }
        }
      })

      if (error) throw error

      // Crear perfil en la tabla users
      if (data.user) {
        console.log('Creating profile for user:', data.user.id)
        
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: email,
              full_name: userData.full_name,
              phone: userData.phone
            }
          ])

        if (profileError) {
          console.error('Error creating profile:', profileError)
          // No lanzar error aquí, el usuario ya se registró
        } else {
          console.log('Profile created successfully')
          // Actualizar el perfil local
          await fetchProfile(data.user.id)
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Error in signUp:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      console.log('Sign in successful:', data.user?.id)
      
      // Intentar obtener el perfil después del login exitoso
      if (data.user) {
        await fetchProfile(data.user.id)
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Error in signIn:', error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      console.log('Signing out user')
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setProfile(null)
      
      console.log('Sign out successful')
      return { error: null }
    } catch (error) {
      console.error('Error in signOut:', error)
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      console.log('Updating profile for user:', user.id)
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setProfile(data)
      console.log('Profile updated successfully')
      return { data, error: null }
    } catch (error) {
      console.error('Error in updateProfile:', error)
      return { data: null, error }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      console.log('Resetting password for:', email)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error

      console.log('Password reset email sent')
      return { error: null }
    } catch (error) {
      console.error('Error in resetPassword:', error)
      return { error }
    }
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    fetchProfile // Exportar la función para uso manual
  }
} 