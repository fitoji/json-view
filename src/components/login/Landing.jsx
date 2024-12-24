import React, { useState, useEffect } from "react";
import { DataProvider } from "../context/DataContext";

import FileDropZone from "../FileDropZone";
import StoredFiles from "../StoredFiles";
import StorageUsage from "../StorageUsage";
import FileViewer from "../FileViewer";
import FraseAleatoria from "../frases/FraseAleatoria";

export default function Landing() {
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [storageUsage, setStorageUsage] = useState(0);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("jsonFiles") || "{}");
    setFiles(storedFiles);
    updateStorageUsage();
  }, []);
  const updateStorageUsage = () => {
    const totalSpace = 5 * 1024 * 1024; // 5MB (ejemplo de límite)
    const usedSpace = new Blob([JSON.stringify(localStorage)]).size;
    setStorageUsage((usedSpace / totalSpace) * 100);
  };
  const handleFileDrop = (fileName, content) => {
    const updatedFiles = { ...files, [fileName]: content };
    setFiles(updatedFiles);
    localStorage.setItem("jsonFiles", JSON.stringify(updatedFiles));
    updateStorageUsage();
  };

  const handleFileSelect = (fileName) => {
    setSelectedFile(files[fileName]);
  };

  const handleFileDelete = (fileName) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fileName];
    setFiles(updatedFiles);
    localStorage.setItem("jsonFiles", JSON.stringify(updatedFiles));
    updateStorageUsage();
    if (selectedFile === files[fileName]) {
      setSelectedFile(null);
    }
  };
  const [tituloOff, setTituloOff] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="flex flex-col items-center space-y-4 text-center">
          {tituloOff && (
            <div>
              <h1 className="text-2xl pt-4 font-bold tracking-tighter md:text-4xl lg:text-4xl/none text-emerald-700">
                Visualizador de Tests en formato Json
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                ¡Elegi tu archivo .json hecho con gpt y empieza a practicar!
              </p>
            </div>
          )}
        </div>
        <DataProvider>
          <div className="container mx-auto">
            {selectedFile && <FileViewer content={selectedFile} />}
            <FileDropZone onFileDrop={handleFileDrop} tituloOff={tituloOff} />
            <div className="mt-4">
              <StoredFiles
                files={files || {}}
                onSelect={handleFileSelect}
                onDelete={handleFileDelete}
                setTituloOff={setTituloOff}
              />
            </div>
            <FraseAleatoria />
            <StorageUsage usage={storageUsage} />
          </div>
        </DataProvider>
      </main>
    </div>
  );
}
