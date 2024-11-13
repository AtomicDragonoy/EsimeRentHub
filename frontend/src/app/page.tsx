import Header from '../components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a ESIMERentHub</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ejemplo de tarjeta de propiedad */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/placeholder.jpg" alt="Propiedad" width={400} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Apartamento en el centro</h2>
              <p className="text-gray-600 mb-2">Ciudad de México, CDMX</p>
              <p className="text-lg font-bold text-blue-600">$5,000 / mes</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">4.5 ★★★★☆</span>
                <Link href="/property/1" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
          {/* Repite esta estructura para más propiedades */}
        </div>
      </main>
    </div>
  )
}