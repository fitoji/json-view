import React, { useState } from 'react'
import { Input } from './ui/input'
import { ArrowDownToLine, ArrowUpToLine } from 'lucide-react'
import { toast } from 'sonner';

export default function FileDropZone({ onFileDrop, tituloOff }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          let jsonContent = JSON.parse(event.target.result)
          
          onFileDrop(file.name, jsonContent)
        } catch (error) {
          console.error('Error parsing JSON:', error)
         
        }
      }
      reader.readAsText(file)
    }
  }

  const [jsonData, setJsonData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      setIsLoading(true)
      setJsonData(null) // Limpiar datos anteriores
      setFileName(file.name)
      
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          let jsonContent = JSON.parse(event.target.result)
          if (file.type === 'text/plain') {
            // Si el archivo es .txt, cambiar su extensión a .json
            jsonContent = JSON.parse(event.target.result);
            setFileName(file.name.replace('.txt', '.json'));
          } else {
            jsonContent = JSON.parse(event.target.result);
          }
          toast.success("¡El cuestionario ha sido cargado exitosamente!",
            {
              duration: 1000,
              style: {
                backgroundColor: '#3399ff',
                color: '#fff',
              },
            })
          setJsonData(jsonContent)
          onFileDrop(file.name, jsonContent)    
        } catch (error) {
          console.error('Error al parsear el JSON:', error)
          toast.error("'El archivo no es un JSON válido'",
            {
              duration: 5000,
              style: {
                backgroundColor: '#ff0066',
                color: '#fff',
              },
            }
          )
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
    <div className="bg-white rounded-md pt-4 pb-4">
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
   {tituloOff &&( <div className="flex justify-center pb-1">
    <ArrowDownToLine />
      
      Clickea o arrastra y suelta un cuestionario .json aquí
    <ArrowDownToLine />
    </div>)}
    
    <Input
    id="fileInput"
    type="file"
    accept=".json"
    onChange={handleFileUpload}
    className="shadow-lg hover:bg-emerald-100 transition-colors"
    />
    {tituloOff && (<div className="flex flex-row justify-center pt-2">
    <ArrowUpToLine />
      
      Clickea o arrastra y suelta un cuestionario .json aquí
      <ArrowUpToLine />
      
    </div>)
      }
   
    </div>
    
  )
}