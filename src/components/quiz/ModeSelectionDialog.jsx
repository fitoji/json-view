import { BookOpen, Timer } from 'lucide-react'
import Modal from '../Modal'

export default function ModeSelectionDialog({ open, onClose, onSelect }) {
  return (
    <Modal open={open} onClose={onClose} title="Seleccionar modo">
      <div className="w-80 sm:w-96 flex flex-col p-2">
        <h2 className="text-xl font-bold text-foreground mb-1">
          Seleccionar modo
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Elegí cómo querés practicar hoy
        </p>

        <fieldset className="border-0 p-0 m-0">
          <legend className="sr-only">Modo del cuestionario</legend>

          <label className="flex items-start gap-3 py-3 border-b border-border cursor-pointer hover:bg-accent/60 transition-colors">
            <input
              type="radio"
              name="quiz-mode"
              className="mt-1 size-4 shrink-0 accent-primary"
              onChange={() => onSelect('practica')}
            />
            <BookOpen
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="flex flex-col">
              <span className="font-semibold text-base leading-tight text-foreground">
                Pregunta Respuesta
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                Preguntas aleatorias con corrección inmediata. Ideal para
                practicar.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 py-3 border-b border-border cursor-pointer hover:bg-accent/60 transition-colors">
            <input
              type="radio"
              name="quiz-mode"
              className="mt-1 size-4 shrink-0 accent-primary"
              onChange={() => onSelect('examen')}
            />
            <Timer
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="flex flex-col">
              <span className="font-semibold text-base leading-tight text-foreground">
                Examen
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                Modo cronometrado sin retroalimentación. Revisión al finalizar.
              </span>
            </span>
          </label>
        </fieldset>
      </div>
    </Modal>
  )
}
