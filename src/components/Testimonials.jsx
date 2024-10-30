import React from 'react'
import { Star } from 'lucide-react'

const Testimonials = () => {
  return (
    <div>
        <section className="w-full py-12 md:py-24 bg-emerald-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-emerald-700">Lo que dicen nuestros usuarios</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                  <Star className="h-12 w-12 mb-4 text-yellow-400" />
                  <p className="text-gray-600 mb-4">
                    "SuperTest ha revolucionado la forma en que creo y administro mis cuestionarios. ¡Es increíblemente fácil de usar!"
                  </p>
                  <p className="font-bold text-emerald-700">Usuario {i}</p>
                  <p className="text-sm text-slate-500">Educador</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  )
}

export default Testimonials