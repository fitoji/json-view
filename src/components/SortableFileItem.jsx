import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useTituloOff } from "@/hooks/useTituloOff"; // Añadir este import

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CircleArrowRight, GripVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function SortableFileItem({ fileName, onSelect, onDelete }) {
  const { setTituloOff } = useTituloOff(); // Añadir esta línea
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
    zIndex: isDragging ? 1 : 0,
    position: "relative",
    opacity: isDragging ? 1 : 0.8,
    scale: isDragging ? 1.02 : 1,
    boxShadow: isDragging ? "0 8px 16px rgba(0,0,0,0.1)" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`
        flex items-center justify-between p-3 
        bg-white rounded-lg border
        transition-all duration-200 ease-in-out
        ${
          isDragging
            ? "border-emerald-400 shadow-lg"
            : "border-gray-200 shadow-sm"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <button
          className="cursor-grab active:cursor-grabbing hover:text-emerald-500"
          {...listeners}
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <span>{fileName}</span>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            onSelect(fileName);
            setTituloOff(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-emerald-300 hover:bg-emerald-200 text-white"
          size="sm"
        >
          <CircleArrowRight className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Ver</span>
        </Button>
        <Button
          onClick={() => onDelete(fileName)}
          variant="destructive"
          size="sm"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
