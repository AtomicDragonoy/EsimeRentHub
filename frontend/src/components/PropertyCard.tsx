// src/components/PropertyCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'

interface PropertyCardProps {
  id: string
  title: string
  description: string
  price: number
  location: string
  imageUrl: string
  isFavorite: boolean
}

export default function PropertyCard({ id, title, description, price, location, imageUrl, isFavorite }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image src={imageUrl} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <FavoriteButton propertyId={id} initialIsFavorite={isFavorite} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description.substring(0, 100)}...</p>
        <p className="text-gray-700 font-bold mb-2">${price.toLocaleString()} / mes</p>
        <p className="text-gray-600 mb-4">{location}</p>
        <Link href={`/property/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Ver detalles
        </Link>
      </div>
    </div>
  )
}