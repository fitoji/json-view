import React, { useState } from "react";
import { Input } from "./ui/input";
import { ArrowDownToLine } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";

// MIME types browsers report for .json/.txt files, plus the extension fallback
// (drag & drop often delivers an empty or generic type for local files).
const ACCEPTED_MIME_TYPES = [
  "application/json",
  "text/json",
  "application/x-json",
  "text/plain",
];

const isSupportedFile = (file) =>
  Boolean(file) &&
  (ACCEPTED_MIME_TYPES.includes(file.type?.toLowerCase()) ||
    /\.(json|txt)$/i.test(file.name));

const toastError = (message) =>
  toast.error(message, { duration: 5000 });

export default function FileDropZone({ onFileDrop }) {
  const [isDragging, setIsDragging] = useState(false);

  // Shared upload path used by both the file input and drag & drop drops.
  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        toast.success("¡El cuestionario ha sido cargado exitosamente!", {
          duration: 3000,
        });
        onFileDrop(file.name, jsonContent);
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
        toastError("'El archivo no es un JSON válido'");
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (isSupportedFile(file)) {
      processFile(file);
    } else {
      toastError("Solo se admiten archivos .json o .txt");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      processFile(file);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 bg-card border border-border",
        isDragging && "ring-2 ring-ring bg-accent/60 cursor-pointer",
      )}
      role="region"
      aria-label="Cargar cuestionario desde archivo"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col justify-center w-full max-w-sm items-center gap-2">
        <Label htmlFor="fileInput" className="sr-only">
          Cargar archivo JSON de cuestionario
        </Label>
        <div className="flex flex-row items-center text-wrap px-2">
          <span id="file-help">Clickea o arrastra un cuestionario .json aquí</span>
          <ArrowDownToLine />
        </div>
        <Input
          id="fileInput"
          type="file"
          accept=".json, .txt"
          onChange={handleFileUpload}
          aria-describedby="file-help"
          className="shadow-lg hover:bg-accent transition-colors duration-300"
        />
      </div>
    </div>
  );
}