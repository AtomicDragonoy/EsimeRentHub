// src/components/Header.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../contexts/AuthContext'
import { Heart } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="ESIMERentHub Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-gray-800">ESIMERentHub</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            {user ? (
              <>
                <li>
                  <Link href="/favorites" className="text-gray-600 hover:text-gray-800">
                    <Heart className="inline-block mr-1" size={20} />
                    Favoritos
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                    Perfil
                  </Link>
                </li>
                {user.role === 'arrendador' && (
                  <li>
                    <Link href="/my-properties" className="text-gray-600 hover:text-gray-800">
                      Mis Propiedades
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={logout} className="text-gray-600 hover:text-gray-800">
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-gray-600 hover:text-gray-800">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}