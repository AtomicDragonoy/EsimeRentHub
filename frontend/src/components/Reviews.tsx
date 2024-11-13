// src/components/Reviews.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'

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

interface ReviewsProps {
  propertyId: string
  initialReviews: Review[]
}

export default function Reviews({ propertyId, initialReviews }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const { user } = useAuth()

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const createdReview = await api.createReview(propertyId, newReview)
      setReviews([createdReview, ...reviews])
      setNewReview({ rating: 5, comment: '' })
    } catch (error) {
      console.error('Error al enviar la reseña:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
      {user && user.role === 'inquilino' && (
        <form onSubmit={handleSubmitReview} className="mb-6">
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Calificación
            </label>
            <select
              id="rating"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'estrella' : 'estrellas'}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Comentario
            </label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar reseña
          </button>
        </form>
      )}
      {reviews.length === 0 ? (
        <p>No hay reseñas para esta propiedad.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="bg-white p-4 rounded-md shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{review.user.name}</span>
                <span className="text-yellow-500">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}