'use client'

import { useState, useEffect } from 'react'
import { favoriteService } from '@/lib/services'
import { useAuth } from './useAuth'
import type { Database } from '@/lib/supabase'

type Property = Database['public']['Tables']['properties']['Row']

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [favoritedProperties, setFavoritedProperties] = useState<Set<string>>(new Set())

  // Cargar favoritos del usuario
  const loadFavorites = async () => {
    if (!user) {
      setFavorites([])
      setFavoritedProperties(new Set())
      return
    }

    setLoading(true)
    try {
      const userFavorites = await favoriteService.getUserFavorites(user.id)
      setFavorites(userFavorites)
      
      // Crear un Set con los IDs de las propiedades favoritas para búsqueda rápida
      const favoritedIds = new Set(userFavorites.map(prop => prop.id))
      setFavoritedProperties(favoritedIds)
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  // Verificar si una propiedad está en favoritos
  const isFavorited = (propertyId: string): boolean => {
    return favoritedProperties.has(propertyId)
  }

  // Agregar a favoritos
  const addToFavorites = async (propertyId: string): Promise<boolean> => {
    if (!user) {
      console.error('User must be logged in to add favorites')
      return false
    }

    try {
      const success = await favoriteService.addToFavorites(user.id, propertyId)
      
      if (success) {
        // Actualizar estado local
        setFavoritedProperties(prev => new Set([...prev, propertyId]))
        
        // Recargar la lista completa de favoritos
        await loadFavorites()
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error adding to favorites:', error)
      return false
    }
  }

  // Remover de favoritos
  const removeFromFavorites = async (propertyId: string): Promise<boolean> => {
    if (!user) {
      console.error('User must be logged in to remove favorites')
      return false
    }

    try {
      const success = await favoriteService.removeFromFavorites(user.id, propertyId)
      
      if (success) {
        // Actualizar estado local
        setFavoritedProperties(prev => {
          const newSet = new Set(prev)
          newSet.delete(propertyId)
          return newSet
        })
        
        // Recargar la lista completa de favoritos
        await loadFavorites()
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error removing from favorites:', error)
      return false
    }
  }

  // Toggle favorito (agregar/remover)
  const toggleFavorite = async (propertyId: string): Promise<boolean> => {
    if (isFavorited(propertyId)) {
      return await removeFromFavorites(propertyId)
    } else {
      return await addToFavorites(propertyId)
    }
  }

  // Cargar favoritos cuando el usuario cambie
  useEffect(() => {
    loadFavorites()
  }, [user])

  return {
    favorites,
    loading,
    isFavorited,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    loadFavorites
  }
} 