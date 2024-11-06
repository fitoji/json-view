import { CSS } from '@dnd-kit/utilities';
import { useSortable} from '@dnd-kit/sortable';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  

import { CircleArrowRight, GripVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function SortableFileItem({ fileName, onSelect, onDelete, setTituloOff }) {
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
        className="flex flex-col md:flex-row items-center md:justify-between p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-md"
      >
        <div className="flex items-center p-1 gap-2">
        <HoverCard>
            <HoverCardTrigger>
                <Button
                    {...attributes}
                    {...listeners}
                    className="touch-none cursor-grab active:cursor-grabbing p-1 bg-gray-100 hover:bg-gray-50 rounded"
                >
                <GripVertical className="w-4 h-4 text-gray-400" />
                </Button>
                <span className="font-medium text-gray-700">
                    {fileName.replace('.json', '')}
                </span>
            </HoverCardTrigger>
        <HoverCardContent>
    Clickea, mantén apretado y mueve la tarjeta hacia donde quieras, para cambiar el orden.
  </HoverCardContent>
</HoverCard>

          
        </div>
  
        <div className="flex flex-row items-center pr-2 gap-2 mt-2 md:mt-0">
        <HoverCard>
            <HoverCardTrigger>
                <Button
                    onClick={() => {
                    onSelect(fileName);
                    setTituloOff(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-emerald-300 hover:bg-emerald-200 text-white"
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
            className="hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden md:inline">Eliminar</span>
          </Button>
            </HoverCardTrigger>
            <HoverCardContent>
                Elimina el cuestionario de la lista almacenada del Navegador. (no lo borra en tu ordenador)
            </HoverCardContent>
            </HoverCard>
  
         
        </div>
      </div>
    );
  }
  