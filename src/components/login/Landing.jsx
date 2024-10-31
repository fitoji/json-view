import React, { useState } from 'react'
import { DataProvider } from '../context/DataContext'
import V0json from '../quiz/V0json'
import { CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'

// Componente de carga
const LoadingFallback = () => <div>Cargando...</div>

export default function Landing() {
  const [tituloOff,setTituloOff] = useState(true)
  
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <div className="flex justify-end pr-6 pt-1">
          <Link
            className="bg-emerald-300 mt-2 text-white font-bold rounded-lg p-2 hover:bg-emerald-200"
            to="/docs">
            <CircleHelp />       
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
         {tituloOff &&
         <div>
          <h1 className="text-2xl font-bold tracking-tighter md:text-4xl lg:text-4xl/none text-emerald-700">
            Visualizador de Tests en formato Json
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            ¡Elegi tu archivo .json hecho con gpt y empieza a practicar!
          </p>
         </div>
        }
        </div>
        <DataProvider>
          <V0json  setTituloOff={setTituloOff} />
        </DataProvider>
         
        
      </main>
    </div>
  )
}
