import React, { useState } from 'react'
import { Input } from './ui/input'

export default function FileDropZone({ onFileDrop }) {
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
          const jsonContent = JSON.parse(event.target.result)
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
          const jsonContent = JSON.parse(event.target.result)
          setJsonData(jsonContent)
          onFileDrop(file.name, jsonContent)
          
         
          
        } catch (error) {
          console.error('Error al parsear el JSON:', error)
          
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
    <div className="bg-white hover:bg-emerald-100">
<div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
        
      {isDragging ? 'Suelta el test aquí' : 'Arrastra y suelta un test JSON aquí'}
      
    </div>
    <Input
    id="fileInput"
    type="file"
    accept=".json"
    onChange={handleFileUpload}
    className="shadow-lg
hover:bg-emerald-100 transition-colors"

  />
    </div>
    
  )
}