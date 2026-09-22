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
      className="flex flex-col md:flex-row items-start md:items-center md:justify-between p-3 border-b border-border last:border-b-0 hover:bg-accent transition-colors ease-out duration-200"
    >
      <HoverCard>
        <HoverCardTrigger>
          <Button
            {...attributes}
            {...listeners}
            className="touch-none cursor-grab active:cursor-grabbing p-2 min-h-11 min-w-11 bg-secondary hover:bg-accent rounded-lg mr-2"
          >
            <GripVertical className="w-4 h-4 text-secondary-foreground" />
          </Button>
          <span className="font-medium text-foreground">
            {fileName.replace(".json", "")}
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          Clickea, mantén apretado y mueve la tarjeta hacia donde quieras, para
          cambiar el orden.
        </HoverCardContent>
      </HoverCard>

      <div className="flex flex-row flex-wrap items-center justify-center pr-2 gap-2 mt-2 md:mt-0 md:justify-end">
        <HoverCard>
          <HoverCardTrigger>
            <Button
              id="driver-step-practicar"
              onClick={() => {
                onSelect(fileName, 'practica');
                setTituloOff(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="min-h-11 min-w-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Practicar</span>
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
              className="min-h-11 min-w-11 bg-warning hover:bg-warning/90 text-warning-foreground"
              size="sm"
            >
              <Timer className="w-4 h-4 mr-2" />
              <span>Examen</span>
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
              className="min-h-11 min-w-11 bg-success hover:bg-success/90 text-success-foreground"
              size="sm"
            >
              <CircleArrowRight className="w-4 h-4 mr-2" />
              <span>Ver</span>
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
              className="min-h-11 min-w-11"
              variant="destructive"
              size="sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Eliminar</span>
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
