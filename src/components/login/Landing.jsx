import React, { lazy, Suspense } from 'react'
//import { useAuth, AuthProvider } from '../context/authContext'
import { DataProvider } from '../context/DataContext'
import V0json from '../quiz/V0json'

// Componente de carga
const LoadingFallback = () => <div>Cargando...</div>

export default function Landing() {
  //const { user } = useAuth()
  //const { user } = AuthProvider()
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="mt-5 text-2xl font-bold tracking-tighter sm:text-4xl md:text-2xl lg:text-4xl/none text-emerald-700">
            Visualizador de Tests en formato Json
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            ¡Elegi tu archivo .json hecho con gpt y empieza a practicar!
          </p>

          <DataProvider>
            <V0json/>
          </DataProvider>
         {/*  <div>
            <img
              className="rounded-lg"
              width={400}
              src="/hero.webp"
              alt="hero imagen"
            />
          </div> */}
          {/* <div className="bg-emerald-200 rounded-md p-1 shadow-md">
                  <span class="background">
                    <Link to={'/login'} class="button">
                      <svg>
                        <rect
                          x="0"
                          y="0"
                          fill="none"
                          width="100%"
                          height="100%"
                        />
                      </svg>
                      ¡Inicia Sesion!
                    </Link>
                  </span>
                </div> */}
        </div>
      </main>
    </div>
  )
}
