import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ESIMERentHub',
  description: 'Plataforma de alquiler de propiedades',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-gray-100">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}