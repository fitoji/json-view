import { BookOpen, Timer } from 'lucide-react'
import Modal from '../Modal'

export default function ModeSelectionDialog({ open, onClose, onSelect }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-80 sm:w-96 flex flex-col items-center p-2">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Seleccionar modo
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Elegí cómo querés practicar hoy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Practice mode card */}
          <button
            onClick={() => onSelect('practica')}
            className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-primary/30 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-base mb-1">
              Pregunta Respuesta
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Preguntas aleatorias con corrección inmediata. Ideal para practicar.
            </p>
          </button>

          {/* Exam mode card */}
          <button
            onClick={() => onSelect('examen')}
            className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-warning/30 bg-warning/5 hover:border-warning/60 hover:bg-warning/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Timer className="w-7 h-7 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground text-base mb-1">
              Examen
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modo cronometrado sin retroalimentación. Revisión al finalizar.
            </p>
          </button>
        </div>
      </div>
    </Modal>
  )
}
