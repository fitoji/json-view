import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableFileItem } from "./SortableFileItem";

export default function StoredFiles({
  files,
  onSelect,
  onDelete,
  setTituloOff,
  onFileAdd,
  onReorder,
}) {
  const [orderedFiles, setOrderedFiles] = useState([]);

  // ── Enter/exit presence bookkeeping (row bridge) ──────────────────────
  // prevIdsRef seeds with the first non-empty snapshot (hydration / page
  // load), so boot rows mount class-free and a refresh never replays the
  // enter animation across the whole list. Ids that join later diff against
  // the previous snapshot and play the enter animation once.
  const prevIdsRef = useRef(null);
  const enterIdsRef = useRef(new Set());
  // Rows whose delete was requested but whose exit animation has not
  // finished yet. A Set so rapid double-deletes run independently and the
  // list never blocks.
  const [deletingIds, setDeletingIds] = useState(() => new Set());

  useEffect(() => {
    const loadDefaultFile = async () => {
      if (Object.keys(files).length === 0 && onFileAdd) {
        try {
          // Primero intentamos cargar archivos del localStorage
          const storedFiles = JSON.parse(
            localStorage.getItem("jsonFiles") || "{}",
          );
          if (Object.keys(storedFiles).length > 0) {
            // Si hay archivos guardados, los restauramos
            Object.entries(storedFiles).forEach(([fileName, content]) => {
              onFileAdd(fileName, content);
            });
          } else {
            // Si no hay archivos guardados, cargamos el ejemplo
            const response = await fetch("/Cuestionario de ejemplo.json");
            if (response.ok) {
              const ejemploJson = await response.json();
              onFileAdd("Cuestionario de ejemplo.json", ejemploJson);
            }
          }
        } catch (error) {
          console.error("Error al cargar archivos:", error);
        }
      }
    };

    loadDefaultFile();

    // Actualizar el estado local cuando cambien los archivos externos
    const storedOrderedFiles =
      JSON.parse(localStorage.getItem("orderedFiles")) || [];
    const currentFiles = Object.keys(files);

    const newOrderedFiles = [
      ...storedOrderedFiles.filter((file) => currentFiles.includes(file)),
      ...currentFiles.filter((file) => !storedOrderedFiles.includes(file)),
    ];

    // Enter-animation gate: first non-empty snapshot boots class-free;
    // anything that appears afterwards is marked for one enter pass.
    if (prevIdsRef.current === null) {
      if (newOrderedFiles.length > 0) {
        prevIdsRef.current = new Set(newOrderedFiles);
      }
    } else {
      for (const fileName of newOrderedFiles) {
        if (!prevIdsRef.current.has(fileName)) {
          enterIdsRef.current.add(fileName);
        }
      }
      prevIdsRef.current = new Set(newOrderedFiles);
    }
    // Prune exit bookkeeping for ids that left the list (committed or gone).
    setDeletingIds((prev) => {
      const kept = [...prev].filter((id) => newOrderedFiles.includes(id));
      return kept.length === prev.size ? prev : new Set(kept);
    });

    setOrderedFiles(newOrderedFiles);

    // Guardar el orden actualizado en localStorage
    if (currentFiles.length > 0) {
      localStorage.setItem("orderedFiles", JSON.stringify(newOrderedFiles));
    }
  }, [files, onFileAdd]);

  // A delete click only starts the row's exit animation; the actual
  // state/storage removal is committed by handleExitComplete below.
  const handleRequestDelete = (fileName) => {
    setDeletingIds((prev) => {
      if (prev.has(fileName)) return prev;
      const next = new Set(prev);
      next.add(fileName);
      return next;
    });
  };

  const handleExitComplete = (fileName) => {
    // The row's exit animation finished (animationend, or the hook's
    // durationMs fallback in environments without CSS animations). Commit
    // the removal now via the parent. deletingIds keeps the row invisible
    // until orderedFiles drops it, so it can never flash back in.
    enterIdsRef.current.delete(fileName);
    if (onDelete) {
      onDelete(fileName);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = orderedFiles.indexOf(active.id);
      const newIndex = orderedFiles.indexOf(over.id);

      const newOrderedFiles = arrayMove(orderedFiles, oldIndex, newIndex);
      setOrderedFiles(newOrderedFiles);
      localStorage.setItem("orderedFiles", JSON.stringify(newOrderedFiles));
      // Notificar al componente padre sobre el nuevo orden
      if (onReorder) {
        onReorder(newOrderedFiles);
      }
      // localStorage.setItem('orderedFiles', JSON.stringify(newOrderedFiles));
    }
  };

  const handleFileDrop = (e) => {};

  return (
    <Card
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
      className="w-full max-w-none p-3 md:p-4"
    >
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="flex justify-center md:justify-start text-base md:text-lg text-card-foreground text-center md:text-left leading-tight">
          Tests JSON Almacenados
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col relative min-h-[200px] pt-0 md:pt-0">
        {orderedFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg px-4">
            <p>No hay cuestionarios almacenados.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={orderedFiles}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 md:space-y-2">
                {orderedFiles.map((fileName) => (
                  <SortableFileItem
                    key={fileName}
                    fileName={fileName}
                    onSelect={onSelect}
                    onDelete={handleRequestDelete}
                    setTituloOff={setTituloOff}
                    isVisible={!deletingIds.has(fileName)}
                    isNew={enterIdsRef.current.has(fileName)}
                    onExitComplete={handleExitComplete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
}
