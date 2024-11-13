// src/components/SearchBar.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    if (searchTerm) queryParams.append('search', searchTerm)
    if (minPrice) queryParams.append('minPrice', minPrice)
    if (maxPrice) queryParams.append('maxPrice', maxPrice)
    
    router.push(`/properties?${queryParams.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar por ubicación o título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Buscar
      </button>
    </form>
  )
}