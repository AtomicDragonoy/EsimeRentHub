// src/app/property/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Header from '../../../components/Header'
import Reviews from '../../../components/Reviews'
import { api } from '../../../lib/api'
import { useAuth } from '../../../contexts/AuthContext'

interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  imageUrl: string
  owner: {
    id: string
    name: string
    email: string
  }
}

interface Review {
  id: string
  userId: string
  propertyId: string
  rating: number
  comment: string
  createdAt: string
  user: {
    name: string
  }
}

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const fetchPropertyAndReviews = async () => {
      try {
        const [propertyData, reviewsData] = await Promise.all([
          api.getProperty(id as string),
          api.getPropertyReviews(id as string)
        ])
        setProperty(propertyData)
        setReviews(reviewsData)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los detalles de la propiedad. Por favor, intenta de nuevo.')
        setLoading(false)
      }
    }

    fetchPropertyAndReviews()
  }, [id])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!property) {
    return <div>Propiedad no encontrada</div>
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image src={property.imageUrl} alt={property.title} width={800} height={400} className="w-full h-96 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-600 mb-4">{property.description}</p>
            <p className="text-2xl font-bold text-blue-500 mb-4">${property.price.toLocaleString()} / mes</p>
            <p className="text-gray-600 mb-4">
              <strong>Ubicación:</strong> {property.location}
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Información del propietario</h2>
              <p>
                <strong>Nombre:</strong> {property.owner.name}
              </p>
              <p>
                <strong>Email:</strong> {property.owner.email}
              </p>
            </div>
            {user && user.role === 'inquilino' && (
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
                Contactar al propietario
              </button>
            )}
          </div>
        </div>
        <Reviews propertyId={property.id} initialReviews={reviews} />
      </div>
    </div>
  )
}