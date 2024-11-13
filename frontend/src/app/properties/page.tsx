// src/app/properties/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import PropertyCard from '../../components/PropertyCard'
import Pagination from '../../components/Pagination'
import { api } from '../../lib/api'

interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  imageUrl: string
}

interface PaginatedResponse {
  properties: Property[]
  currentPage: number
  totalPages: number
  totalProperties: number
}

export default function Properties() {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const search = searchParams.get('search') || ''
        const minPrice = searchParams.get('minPrice') || ''
        const maxPrice = searchParams.get('maxPrice') || ''
        const page = searchParams.get('page') || '1'

        const queryParams = new URLSearchParams(searchParams.toString())
        queryParams.set('page', page)

        const data = await api.getProperties(queryParams.toString())
        setPaginatedData(data)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar las propiedades. Por favor, intenta de nuevo.')
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!paginatedData) {
    return <div>No se encontraron propiedades.</div>
  }

  const { properties, currentPage, totalPages } = paginatedData

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Propiedades disponibles</h1>
        <SearchBar />
        {properties.length === 0 ? (
          <p>No se encontraron propiedades que coincidan con tu búsqueda.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/properties"
            />
          </>
        )}
      </div>
    </div>
  )
}