// src/app/my-properties/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

export default function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'arrendador') {
      router.push('/')
    }
  }, [user, router])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await api.getProperties()
        setProperties(data.filter((property: Property) => property.owner.id === user?.id))
        setLoading(false)
      } catch (err) {
        setError('Error al cargar las propiedades. Por favor, intenta de nuevo.')
        setLoading(false)
      }
    }

    if (user && user.role === 'arrendador') {
      fetchProperties()
    }
  }, [user])

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      try {
        await api.deleteProperty(id)
        setProperties(properties.filter((property) => property.id !== id))
      } catch (err) {
        setError('Error al eliminar la propiedad. Por favor, intenta de nuevo.')
      }
    }
  }

  if (!user || user.role !== 'arrendador') {
    return null
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mis Propiedades</h1>
          <Link href="/property/manage" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Agregar Propiedad
          </Link>
        </div>
        {properties.length === 0 ? (
          <p>No tienes propiedades registradas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard {...property} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link
                    href={`/property/manage?id=${property.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}