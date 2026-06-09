import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useTituloOff } from "@/hooks/useTituloOff";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { BookOpen, CircleArrowRight, GripVertical, Timer, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function SortableFileItem({ fileName, onSelect, onDelete }) {
  const { setTituloOff } = useTituloOff();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fileName });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col mb-2 md:flex-row items-start md:items-center md:justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all ease-out duration-200 shadow-sm"
    >
      <HoverCard>
        <HoverCardTrigger>
          <Button
            {...attributes}
            {...listeners}
            className="touch-none cursor-grab active:cursor-grabbing p-2 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-200 dark:hover:bg-emerald-600 rounded-lg mr-2"
          >
            <GripVertical className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </Button>
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {fileName.replace(".json", "")}
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          Clickea, mantén apretado y mueve la tarjeta hacia donde quieras, para
          cambiar el orden.
        </HoverCardContent>
      </HoverCard>

      <div className="flex flex-row items-center justify-center pr-2 gap-2 mt-2 md:mt-0 md:justify-end">
        <HoverCard>
          <HoverCardTrigger>
            <Button
              id="driver-step-practicar"
              onClick={() => {
                onSelect(fileName, 'practica');
                setTituloOff(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white"
              size="sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Practicar</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Inicia el test en modo Pregunta Respuesta
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Button
              id="driver-step-examen"
              onClick={() => {
                onSelect(fileName, 'examen');
                setTituloOff(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white"
              size="sm"
            >
              <Timer className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Examen</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Inicia el test en modo Examen cronometrado
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Button
              id="driver-step-ver"
              onClick={() => {
                onSelect(fileName);
                setTituloOff(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white dark:text-white"
              size="sm"
            >
              <CircleArrowRight className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Ver</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Click aquí para iniciar el visualizador Test
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Button
              onClick={() => onDelete(fileName)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Eliminar</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Elimina el cuestionario de la lista almacenada del Navegador. (no lo
            borra en tu ordenador)
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}