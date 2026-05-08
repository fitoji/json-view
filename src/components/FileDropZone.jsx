import React, { useState } from "react";
import { Input } from "./ui/input";
import { ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";

export default function FileDropZone({ onFileDrop }) {
  const [isDragging, setIsDragging] = useState(false);

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
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          let jsonContent = JSON.parse(event.target.result);

          onFileDrop(file.name, jsonContent);
        } catch (error) {
          //   console.error('Error parsing JSON:', error)
        }
      };
      reader.readAsText(file);
    }
  };

  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setIsLoading(true);
      setJsonData(null); // Limpiar datos anteriores
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          let jsonContent = JSON.parse(event.target.result);
          if (file.type === "text/plain") {
            // Si el archivo es .txt, cambiar su extensión a .json
            jsonContent = JSON.parse(event.target.result);
            setFileName(file.name.replace(".txt", ".json"));
          } else {
            jsonContent = JSON.parse(event.target.result);
          }
          toast.success("¡El cuestionario ha sido cargado exitosamente!", {
            duration: 3000,
            style: {
              backgroundColor: "#3399ff",
              color: "#fff",
            },
          });
          setJsonData(jsonContent);
          onFileDrop(file.name, jsonContent);
        } catch (error) {
          console.error("Error al parsear el JSON:", error);
          toast.error("'El archivo no es un JSON válido'", {
            duration: 5000,
            style: {
              backgroundColor: "#ff0066",
              color: "#fff",
            },
          });
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsText(file);
    } else {
      setFileName("");
      setJsonData(null);
    }
  };

  return (
    <div
      className="rounded-xl p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all"
      role="region"
      aria-label="Cargar cuestionario desde archivo"
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
          className="shadow-lg hover:bg-emerald-100 transition-all duration-300"
        />
      </div>
    </div>
  );
}
