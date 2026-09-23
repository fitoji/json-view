import { useEffect, useRef } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useTituloOff } from "@/hooks/useTituloOff";
import { useAnimationPresence } from "@/hooks/useAnimationPresence";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { BookOpen, CircleArrowRight, GripVertical, Timer, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

// Prime the lazy Test chunk (same module FileViewer imports) so the quiz opens
// on click instead of on first fetch.
const prefetchTest = () => import("./quiz/Test");

export function SortableFileItem({
  fileName,
  onSelect,
  onDelete,
  // Row visibility bridge (StoredFiles owns it): false starts the exit
  // animation; the actual removal is committed once the exit completes.
  isVisible = true,
  // True only for rows added after the initial boot snapshot, so a page
  // refresh never replays the enter animation across the whole list.
  isNew = false,
  onExitComplete,
}) {
  const { setTituloOff } = useTituloOff();

  const { shouldRender, animationClass, handleAnimationEnd } =
    useAnimationPresence({
      isVisible,
      // Boot rows mount class-free; only rows added later animate in.
      enterAnimation: isNew ? "file-row-enter" : "",
      exitAnimation: "file-row-exit",
      // Exit keyframe is 150ms; +50ms fallback covers environments where
      // animationend never fires (jsdom tests). The real browser commits on
      // animationend ~150ms, so the invisible ghost window stays minimal.
      durationMs: 150,
    });

  // Once the exit animation is done (animationend or the hook's fallback),
  // report up so StoredFiles commits the removal from state/storage.
  const exitReported = useRef(false);
  useEffect(() => {
    if (!isVisible && !shouldRender && !exitReported.current) {
      exitReported.current = true;
      onExitComplete?.(fileName);
    }
  }, [isVisible, shouldRender, fileName, onExitComplete]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } =
    // An exiting row must not participate in sorting (no ghost dragging),
    // but stays registered so dnd-kit keeps measuring the list cleanly.
    useSortable({ id: fileName, disabled: !isVisible });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-b border-border last:border-b-0"
    >
      {/* Enter/exit animation host: the INNER wrapper, never the sortable
          root — the root carries dnd-kit's inline transform for reordering
          and a keyframe animating transform on the same element would
          collide with it. */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center md:justify-between p-3 hover:bg-accent transition-colors ease-out duration-200 ${animationClass}`}
        onAnimationEnd={(event) => {
          // Ignore bubbled animationend from Radix hover-card internals;
          // only the wrapper's own slide drives the lifecycle.
          if (event.target === event.currentTarget) {
            handleAnimationEnd();
          }
        }}
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
            Clickea, mantén apretado y mueve la tarjeta hacia donde quieras,
            para cambiar el orden.
          </HoverCardContent>
        </HoverCard>

        <div className="flex flex-row flex-wrap items-center justify-center pr-2 gap-2 mt-2 md:mt-0 md:justify-end">
          <HoverCard>
            <HoverCardTrigger>
              <Button
                id="driver-step-practicar"
                onPointerEnter={prefetchTest}
                onFocus={prefetchTest}
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
                onPointerEnter={prefetchTest}
                onFocus={prefetchTest}
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
                onPointerEnter={prefetchTest}
                onFocus={prefetchTest}
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
                id="driver-step-eliminar"
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
              Elimina el cuestionario de la lista almacenada del Navegador. (no
              lo borra en tu ordenador)
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
