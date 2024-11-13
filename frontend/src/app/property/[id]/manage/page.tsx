// src/app/property/manage/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../../../components/Header'
import { api } from '../../../lib/api'
import { useAuth } from '../../../contexts/AuthContext'

interface PropertyFormData {
  title: string
  description: string
  price: number
  location: string
  imageUrl: string
}

export default function ManageProperty() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: 0,
    location: '',
    imageUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const propertyId = searchParams.get('id')
  const isEditing = !!propertyId

  useEffect(() => {
    if (isEditing) {
      const fetchProperty = async () => {
        try {
          const data = await api.getProperty(propertyId)
          setFormData(data)
        } catch (err) {
          setError('Error al cargar los datos de la propiedad. Por favor, intenta de nuevo.')
        }
      }
      fetchProperty()
    }
  }, [isEditing, propertyId])

  useEffect(() => {
    if (!user || user.role !== 'arrendador') {
      router.push('/')
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isEditing) {
        await api.updateProperty(propertyId, formData)
      } else {
        await api.createProperty(formData)
      }
      router.push('/my-properties')
    } catch (err) {
      setError('Error al guardar la propiedad. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== 'arrendador') {
    return null
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Precio (por mes)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
              URL de la imagen
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Guardando...' : isEditing ? 'Actualizar Propiedad' : 'Agregar Propiedad'}
          </button>
        </form>
      </div>
    </div>
  )
}