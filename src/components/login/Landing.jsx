import React, { useState, useEffect } from "react";
import { DataProvider } from "../context/DataContext";
import FileDropZone from "../FileDropZone";
import StoredFiles from "../StoredFiles";
import StorageUsage from "../StorageUsage";
import FileViewer from "../FileViewer";
import FraseAleatoria from "../frases/FraseAleatoria";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./driverjs.css";

const driverObj = driver({
  /* translations: {
    // Cambia el texto "of"
    of: "de",
  }, */
  prevBtnText: "Anterior",
  nextBtnText: "Siguiente",
  doneBtnText: "Listo",

  //overlayColor: "green",
  showProgress: true,
  showButtons: ["next", "done", "previous"],
  popoverClass: "driverjs-theme",
  steps: [
    {
      element: "#driver-step-1",
      popover: {
        title: "Visualizador de Tests en formato JSON",
        description:
          "¡Bienvenido a la aplicación de visualización de tests en formato JSON! Aquí podrás visualizar tus tests en formato JSON y practicar con ellos. Realizaremos un pequeño tour por la aplicación.",
      },
    },
    {
      element: "#driver-step-2",
      popover: {
        title: "¡Elige tu cuestionario en tu PC!",
        description:
          "Puedes seleccionar tu archivo haciendo clic aquí o arrastrándolo. El cuestionario puede ser .json o .txt, pero el formato debe ser el mismo que el de los ejemplos.",
      },
    },
    {
      element: "#driver-step-3",
      popover: {
        title:
          "Aquí se almacenarán tus cuestionarios. Puedes verlos o eliminarlos.",
        description:
          "Puedes cambiar el orden manteniendo el clic apretado y moviendo la tarjeta. En el ícono de 'PLAY' reproducirás el cuestionario y con el ícono del 'Cubo de basura' lo borrarás del almacén del explorador (¡no de tu disco duro!).",
      },
    },
    {
      element: "#driver-step-4",
      popover: {
        title: "Documentación de la aplicación",
        description:
          "Aquí podrás encontrar información y ayuda para poder pedirle de manera correcta a ChatGPT para que realize los test de manera adecuada, también ayuda y consejos para poder usar la app.",
      },
    },
  ],
});
driverObj.drive();

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
              <h1
                id="driver-step-1"
                className="text-2xl pt-4 font-bold tracking-tighter md:text-4xl lg:text-4xl/none text-emerald-700"
              >
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
            <div id="driver-step-2">
              <FileDropZone onFileDrop={handleFileDrop} tituloOff={tituloOff} />
            </div>
            <div id="driver-step-3" className="mt-4">
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
