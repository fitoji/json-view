import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

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

  useEffect(() => {
    const loadDefaultFile = async () => {
      if (Object.keys(files).length === 0 && onFileAdd) {
        try {
          // Primero intentamos cargar archivos del localStorage
          const storedFiles = JSON.parse(
            localStorage.getItem("jsonFiles") || "{}"
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

    setOrderedFiles(newOrderedFiles);

    // Guardar el orden actualizado en localStorage
    if (currentFiles.length > 0) {
      localStorage.setItem("orderedFiles", JSON.stringify(newOrderedFiles));
    }
  }, [files, onFileAdd]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrderedFiles((items) => {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      localStorage.setItem("orderedFiles", JSON.stringify(orderedFiles));
      // Notificar al componente padre sobre el nuevo orden
      if (onReorder) {
        onReorder(orderedFiles);
      }
    }
  };

  const handleFileDrop = (e) => {};

  return (
    <Card
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
      className="transition-all duration-200"
    >
      <CardHeader>
        <CardTitle className="flex justify-center">
          Tests JSON Almacenados
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col relative min-h-[200px]">
        {orderedFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            <p>No hay cuestionarios almacenados.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={orderedFiles}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {orderedFiles.map((fileName) => (
                  <SortableFileItem
                    key={fileName}
                    fileName={fileName}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    setTituloOff={setTituloOff}
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
