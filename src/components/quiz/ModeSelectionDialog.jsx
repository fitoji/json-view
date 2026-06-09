import { BookOpen, Timer } from 'lucide-react'
import Modal from '../Modal'

export default function ModeSelectionDialog({ open, onClose, onSelect }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-80 sm:w-96 flex flex-col items-center p-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Seleccionar modo
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
          Elegí cómo querés practicar hoy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Practice mode card */}
          <button
            onClick={() => onSelect('practica')}
            className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-900/20 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-100/50 dark:hover:bg-sky-900/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Pregunta Respuesta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Preguntas aleatorias con corrección inmediata. Ideal para practicar.
            </p>
          </button>

          {/* Exam mode card */}
          <button
            onClick={() => onSelect('examen')}
            className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-100/50 dark:hover:bg-amber-900/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Timer className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Examen
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Modo cronometrado sin retroalimentación. Revisión al finalizar.
            </p>
          </button>
        </div>
      </div>
    </Modal>
  )
}
