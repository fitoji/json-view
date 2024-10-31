import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Test from './Test'

import { Button } from '../ui/button';
import { ArrowDownToLine, FileJson, Mail } from "lucide-react";

export default function V0json() {
    const [jsonData, setJsonData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fileName, setFileName] = useState("")
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        setIsLoading(true)
        setJsonData(null) // Limpiar datos anteriores
        setFileName(file.name)
        
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result)
            setJsonData(json)
          } catch (error) {
            console.error('Error al parsear el JSON:', error)
            alert('El archivo no es un JSON válido')
          } finally {
            setIsLoading(false)
          }
        }
        reader.readAsText(file)
      } else {
        setFileName("")
        setJsonData(null)
      }
    }
  
    return (
      <div className="container mx-auto p-2">
        <div className="mb-2">
          {/* <Label className="flex flex-row justify-center text-slate-600">Selecciona un archivo o arrastra y sueltalo aquí
          <ArrowDownToLine />
          </Label> */}
           <div className="relative">
           <Input
            id="fileInput"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="shadow-lg
   bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
    hover:bg-gradient-to-br hover:from-emerald-300 hover:to-emerald-100 transition-colors duration-200 ease-in-out"
      
          />
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <FileJson  size={16} strokeWidth={2} aria-hidden="true" />
        </div>
           </div>
            
        </div>
         {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-2">Cargando archivo...</p>
          </div>
        ) : jsonData ? (
          <Test data={jsonData} />
        ) : (
          <p className="text-gray-500">No se ha seleccionado ningún archivo JSON.</p>
        )}
      </div>
    )
  }


