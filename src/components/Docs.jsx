
import { Undo2 } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Docs() {
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 pr-6 pt-1">
      <div className="flex justify-end">
      <div className="flex justify-end">
      <Link
        className="bg-emerald-300 mt-2 text-white font-bold rounded-lg p-2 hover:bg-emerald-200"
        to="/">
        <Undo2  />
      </Link>
      </div>
        
        </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-emerald-700 mb-6">Visor JsonTests - Documentación</h1>
        <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Introducción</AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-center">
            <img src="../public/visor.webp" alt="imagen visor json" className="rounded-lg mb-2 md:size-2/4 lg:size-3/4" />
          </div>
        Visor JsonTests es una aplicación diseñada para que los estudiantes puedan practicar con tests interactivos de manera rápida y eficiente. La aplicación toma cuestionarios en formato JSON y los convierte en tests interactivos, permitiendo a los usuarios repasar y aprender de manera dinámica.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Formato de Entrada</AccordionTrigger>
        <AccordionContent>
        <p>Visor JsonTests requiere que los cuestionarios estén en un formato JSON específico. Aquí tienes un ejemplo de cómo debe estructurarse cada pregunta:</p>
          <pre className="bg-emerald-100 p-4 rounded-md mt-2 overflow-x-auto">
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
          <p className="mt-4">Para convertir un cuestionario de formato PDF a formato JSON puedes utilizar ChatGPT con el siguiente prompt:</p>
          <p className="italic mt-2 bg-emerald-100 p-4 rounded-md mt-2 overflow-x-auto">"Utilizando el siguiente formato json, transforma el cuestionario del pdf, cambia los valores de asignatura a: '[valor indicado]' y tema a: '[tema indicado]'"</p>
          <p className="mt-4 mb-2">Ten en cuenta en el cuestionario que entregues a GPT tenga la siguiente estructura:</p>
          <div className="bg-emerald-100 rounded-md pt-3 pr-3 overflow-x-auto">
          <ol className="pl-5 ">
            <li className="font-semibold">Pregunta 1 - ¿Cuál de los siguientes porcentajes corresponde a la importancia del lenguaje no verbal en la comunicación?</li>
            <p className="pl-4">A) 7%</p>
            <p className="pl-4">B) 38%</p>
            <p className="pl-4">C) 55%</p>
            <p className="pl-4">D) 45%</p>
            <li className="font-semibold">Pregunta 2 - Según los axiomas de Paul Watzlawick, ¿qué afirma sobre la posibilidad de no comunicarse?</li>
            <p className="pl-4">A) Siempre es posible no comunicarse.</p>
            <p className="pl-4">B) No es posible no comunicarse.</p>
            <p className="pl-4">C) Solo es posible no comunicarse en situaciones específicas.</p>
            <p className="pl-4">D) No se menciona la posibilidad de no comunicarse.</p>
          <p>etc...</p>
          </ol>
          <ol className="list-decimal pl-5 mt-2 pb-4">
            <p className="font-semibold">Soluciones</p>
            <li>C) 55%</li>
            <li>B) No es posible no comunicarse.</li>
            <p>etc...</p>
          </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>FAQ</AccordionTrigger>
        <AccordionContent>
        <p>Preguntas Frequentes:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li className="font-semibold">¿Y cómo sabes el código de asignatura ("COA", "ESP"...)? ¿te acepta más o menos cualquiera?</li>
            <p className="pl-5 py-2">En los Campos "asignatura" y "tema" puedes poner el valor que corresponda a la asignatura estudiada, y en tema el numero o nombre del tema que el cuestionario indique, tambien se lo puedes pedir a GPT para que cambie automaticamente en todas las preguntas</p>
            <li className="font-semibold">¿Qué significa el "ans"?</li>
            <p className="pl-5 py-2">En el campo "ans" va el valor de la respuesta correcta ("answer"). a=1, b=2, c=3, d=4. Normalmente GPT lo detecta automaticamente, conviene verificar.</p>
            <li className="font-semibold">¿No entiendo nada de informática, pero quiero usar la app, ¿cómo puedo hacer?</li>
            <p className="pl-5 py-2">Lée Método Rápido, donde se explica como con solo una petición a ChatGPT puedes tener el cuestionario en el formato correcto, ¡sin tocar nada!.</p>
            <li className="font-semibold">Es que el formato no está bien, le he pedido al gpt que me lo arregle pero dice que en este momento no puede y me da el contenido para que lo pege en .txt</li>
            <p className="pl-5 py-2">¡Con la nueva version puedes agregar un archivo <strong>TXT</strong> y el Visor lo interpretara como un archivo JSON!</p>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Método Rápido</AccordionTrigger>
        <AccordionContent>
        <p>Si no quieres complicaciones con temas de informática. Aquí tienes un ejemplo de cómo preguntarle a ChatGPT:</p>
          <p className="bg-emerald-100 p-4 rounded-md my-2 overflow-y-auto">
          Considerando la siguiente documentación: https://visortests-gpt.vercel.app/docs
          crea un cuestionario de <strong className="text-rose-600">[ingresar numero de preguntas] </strong> preguntas sobre el tema <strong className="text-rose-600">[ingresar tema]</strong>  en formato json. Guárdalo en un archivo json.
          </p>
          <p>¡De esta manera ya tendrías listo tu cuestionario en el formato json para poder prácticar y seguir estudiando!</p>
          <p>No te olvides de ingresar el número de preguntas del test y el tema (cuanto más específico seas, más precisas serán las preguntas)!</p>
        
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>Modo de uso</AccordionTrigger>
        <AccordionContent>
        <ol className="list-decimal pl-5">
            <li>Carga tu archivos JSON de cuestionarios (puedes seleccionarlos uno a uno o arrastrarlos y soltarlos).</li>
            <li>En un componente se mostrarán los tests guardados correctamente.</li>
            <li>Clickea en VER y  <strong>¡empieza a practicar!</strong></li>
            <li>Comienza a responder las preguntas una por una.</li>
            <li>Recibe retroalimentación inmediata sobre tus respuestas.</li>
            <li>Al finalizar el test, tendrás la opción de repasar tus errores.</li>
        </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Características Principales</AccordionTrigger>
        <AccordionContent>
        <ul className="list-disc pl-5">
            <li><strong>Orden Aleatorio de preguntas:</strong> Las preguntas van en orden aleatorio (puede desactivarse esta opción en el MENU).</li>
            <li><strong>Orden Aleatorio de opciones:</strong> Las opciones a,b,c,d irán cambiando aleatoriamente, se mantiene referencia para aquellas respuestas que digan a y b son ciertas por ejemplo.</li>
            <li><strong>Retroalimentación Inmediata:</strong> Recibe información sobre cada respuesta a medida que avanzas en el test.</li>
            <li><strong>Repaso de Errores:</strong> Una vez finalizado el test, puedes repasar las preguntas que respondiste incorrectamente.</li>
            <li><strong>Almacenamiento en Local:</strong> Podrás almacenar cientos de Test en la memoria local de tu Navegador, tus cuestionarios están solo en tu Navegador y solo tu tendrás acceso.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Soporte y Contacto</AccordionTrigger>
        <AccordionContent>
        <p>
            Si tienes alguna pregunta, sugerencia o encuentras algún problema mientras usas Visor JsonTests, por favor contacta con nuestro equipo de soporte en <strong>fitoji@protonmail.com</strong>.
          </p>
          <p className="mt-2">
            ¡Esperamos que disfrutes usando Visor JsonTests para mejorar tu aprendizaje!
          </p>
        </AccordionContent>
      </AccordionItem>
      
      

    </Accordion>
    
    </div>
    </div>
  )
}