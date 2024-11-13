// src/app/favorites/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import PropertyCard from '../../components/PropertyCard'
import { api } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'

interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  imageUrl: string
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchFavorites = async () => {
      try {
        const data = await api.getFavorites()
        setFavorites(data)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los favoritos. Por favor, intenta de nuevo.')
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, router])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>
        {favorites.length === 0 ? (
          <p>No tienes propiedades favoritas guardadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard key={property.id} {...property} isFavorite={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}