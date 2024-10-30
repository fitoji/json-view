import React from 'react'
import { Accordion, AccordionItem,AccordionTrigger,AccordionContent } from './ui/accordion'

const FAQ = () => {
  return (
    <div>
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-emerald-700">Preguntas frecuentes</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-emerald-700">¿Cómo funciona SuperTest?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                SuperTest es una plataforma de cuestionarios diseñada para que practiques de manera fácil y rápida. Con una interfaz amigable y divertida, hacemos que la práctica sea lo menos aburrida posible. Adapta los cuestionarios a tu tiempo disponible y mejora practicando tus errores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-emerald-700">¿Cuánto cuesta usar SuperTest?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Supertest esta en modo Alpha, por lo que es 100% gratis para los usuarios que tengan disponible el link.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-emerald-700">¿Puedo ayudar a que este proyecto sea mejor?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Si, al estar en modo Alpha, cualquier aporte es bienvenido y el equipo evaluara las recomendaciones y criticas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
    </div>
  )
}

export default FAQ