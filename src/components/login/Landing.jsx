import React, { lazy, Suspense } from 'react'
import { useAuth, AuthProvider } from '../context/authContext'
import { Link } from 'react-router-dom'

import './landing.css'
import { DataProvider } from '../context/DataContext'
import JsonViewer from '../quiz/JsonViewer'
import Quiz from '../quiz/Quiz'

// Componentes para las secciones
const Features = lazy(() => import('../Features'))
const Testimonials = lazy(() => import('../Testimonials'))

// Componente de carga
const LoadingFallback = () => <div>Cargando...</div>

export default function Landing() {
  const { user } = useAuth()
  //const { user } = AuthProvider()

  console.log(user)
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-10  ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-2xl lg:text-4xl/none text-emerald-700">
                  Visualizador de Tests en formato Json
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  ¡Elegi tu archivo .json hecho con gpt y empieza a practicar!
                </p>
                <div>
                  <DataProvider>
                    <div className="bg-emerald-400 rounded-lg font-bold">
                      <JsonViewer />
                      <Quiz />
                    </div>
                  </DataProvider>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <div>
                  <img
                    className="rounded-lg"
                    width={400}
                    src="/hero.webp"
                    alt="hero imagen"
                  />
                </div>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
