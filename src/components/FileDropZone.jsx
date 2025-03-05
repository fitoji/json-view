import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  FileIcon,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";

export default function FileDropZone({ onFileDrop, tituloOff }) {
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
      className="rounded-md pt-4 pb-4 bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
       hover:bg-gradient-to-br flex justify-center"
    >
      {/*<div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`
    >
    {isDragging ? 'Suelta el test aquí' : 'Arrastra y suelta un test JSON aquí'}  
    </div>*/}
      <div className="flex flex-col justify-center w-full max-w-sm items-center gap-1.5">
        <div className="flex flex-row items-center text-wrap px-2">
          <Label htmlFor="fileInput">
            Clickea o arrastra y suelta un cuestionario .json aquí
          </Label>
          <ArrowDownToLine />
        </div>

        <div className="relative group">
          <Input
            id="fileInput"
            type="file"
            accept=".json, .txt"
            onChange={handleFileUpload}
            className="pl-10 shadow-lg hover:bg-emerald-100 group-hover:scale-125 transition-all duration-300"
          />
          <FileText className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500 transition-all duration-300 group-hover:scale-125" />
        </div>
      </div>
    </div>
  );
}
