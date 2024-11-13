// src/components/FavoriteButton.tsx
'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'

interface FavoriteButtonProps {
  propertyId: string
  initialIsFavorite: boolean
}

export default function FavoriteButton({ propertyId, initialIsFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const { user } = useAuth()

  const handleToggleFavorite = async () => {
    if (!user) {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      // o mostrar un mensaje para que inicie sesión
      return
    }

    try {
      if (isFavorite) {
        await api.removeFavorite(propertyId)
      } else {
        await api.addFavorite(propertyId)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error al cambiar el estado de favorito:', error)
    }
  }

  return (
    <Button
      variant={isFavorite ? "secondary" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart className={isFavorite ? "fill-current" : ""} />
    </Button>
  )
}