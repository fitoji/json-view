import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Undo2 } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export default function Docs() {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const Section = ({ title, id, children }) => (
    <div className="mb-6">
      <Button
        onClick={() => toggleSection(id)}
        className="flex justify-between items-center w-full text-left text-lg font-semibold shadow-lg
   bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
    hover:bg-gradient-to-br hover:from-emerald-300 hover:to-emerald-100 transition-colors duration-200 ease-in-out text-emerald-700"
      >
        {title}
        {openSection === id ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
      </Button>
      {openSection === id && (
        <div className="mt-2 text-slate-700">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 pr-6 pt-1">
      <div className="flex justify-end">
        <Button className="bg-emerald-300 mt-2 text-emerald-700 font-bold rounded-lg hover:bg-emerald-200 flex p-2 justify-center">
          <Link to="/">
            <Undo2  />
          </Link>
        </Button>
        </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-emerald-700 mb-6">JsonTests - Documentación</h1>

        <Section title="Introducción" id="introduccion">
          <p>
            JsonTests es una aplicación diseñada para que los estudiantes puedan practicar con tests interactivos de manera rápida y eficiente. La aplicación toma cuestionarios en formato JSON y los convierte en tests interactivos, permitiendo a los usuarios repasar y aprender de manera dinámica.
          </p>
        </Section>
        <Section title="Formato de Entrada" id="formato">
          <p>JsonTests requiere que los cuestionarios estén en un formato JSON específico. Aquí tienes un ejemplo de cómo debe estructurarse cada pregunta:</p>
          <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
            {JSON.stringify({
              "id": 1,
              "question": "Aqui hay una PREGUNTA:",
              "option1": "respuesta uno",
              "option2": "Respuesta dos",
              "option3": "Respuesta tres",
              "option4": "Respuesta cuatro",
              "ans": 1,
              "asignatura": "COA",
              "tema": "alguno"
            }, null, 2)}
          </pre>
          <p className="mt-4">Para convertir un cuestionario de formato PDF a este formato JSON, puedes utilizar ChatGPT con el siguiente prompt:</p>
          <p className="italic mt-2">"Utilizando el siguiente formato json, transforma el cuestionario del pdf, cambia los valores de asignatura a: '[valor indicado]' y tema a: '[tema indicado]'"</p>
        </Section>

        <Section title="Primeros pasos" id="instalacion">
          <p>Para comenzar a usar la aplicación:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Asegúrate de tener tu cuestionario en formato JSON (ver Formato de Entrada para más detalles).</li>
            <li>Carga tu archivo JSON utilizando el input proporcionado o seleccionándolo desde el explorador de archivos.</li>
          </ol>
          <p className="mt-2">¡Y eso es todo! Estás listo para empezar a practicar.</p>
        </Section>

        <Section title="Modo de uso" id="uso">
          <ol className="list-decimal pl-5">
            <li>Carga tu archivo JSON de cuestionarios.</li>
            <li>La aplicación convertirá automáticamente el JSON en un test interactivo.</li>
            <li>Comienza a responder las preguntas una por una.</li>
            <li>Recibe retroalimentación inmediata sobre tus respuestas.</li>
            <li>Al finalizar el test, tendrás la opción de repasar tus errores.</li>
          </ol>
        </Section>

        <Section title="Características Principales" id="caracteristicas">
          <ul className="list-disc pl-5">
            <li><strong>Tests Interactivos:</strong> Practica con preguntas de opción múltiple de manera dinámica.</li>
            <li><strong>Retroalimentación Inmediata:</strong> Recibe información sobre cada respuesta a medida que avanzas en el test.</li>
            <li><strong>Repaso de Errores:</strong> Una vez finalizado el test, puedes repasar las preguntas que respondiste incorrectamente.</li>
            <li><strong>Flexibilidad:</strong> Utiliza cuestionarios en formato JSON, lo que permite una fácil integración y creación de nuevos tests.</li>
          </ul>
        </Section>

        <Section title="Soporte y Contacto" id="soporte">
          <p>
            Si tienes alguna pregunta o encuentras algún problema mientras usas JsonTests, por favor contacta con nuestro equipo de soporte en [fitoji@protonmail.com].
          </p>
          <p className="mt-2">
            ¡Esperamos que disfrutes usando JsonTests para mejorar tu aprendizaje!
          </p>
        </Section>
        <div className="flex justify-end">
        <Button className="bg-emerald-300 mt-2 text-emerald-700 font-bold rounded-lg p-2 hover:bg-emerald-200 flex p-2 justify-center">
          <Link to="/">
            <Undo2  />
          </Link>
        </Button>
        </div>
        
      </div>
    </div>
  )
}