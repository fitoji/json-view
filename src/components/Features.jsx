import React from 'react'
import { CheckCircle, BarChart, Users } from 'lucide-react'

const Features = () => {
  return (
    <div>
         <section className="w-full py-12 md:py-24 lg:py-24 bg-gradient-to-b from-sky-100 to-sky-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-emerald-700 ">Características principales</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2 text-emerald-700">Fácil de usar</h3>
                <p className="text-gray-600">Interfaz intuitiva para crear empezar en minutos.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2 text-emerald-700">Análisis detallado</h3>
                <p className="text-gray-600">Obtén insights valiosos con nuestras herramientas de análisis.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2 text-emerald-700">Colaboración en equipo</h3>
                <p className="text-gray-600">Práctica preguntas de manera aleatoria, tanto el orden de las preguntas como el de las opciones.</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Features