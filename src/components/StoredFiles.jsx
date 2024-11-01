import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SquarePlay, Trash2 } from 'lucide-react'
import { Separator } from './ui/separator'

export default function StoredFiles({ files, onSelect, onDelete, setTituloOff }) {
  const fileEntries = Object.entries(files)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center md:justify-start">Tests JSON Almacenados</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {fileEntries.length === 0 ? (
          <p>No hay archivos almacenados.</p>
        ) : (
          fileEntries.map(([fileName]) => (
            <div key={fileName} className="flex justify-between flex-col md:flex-row items-center mb-2 border-dotted border-2 border-slate-200">
              {/* <span className="">{fileName}</span> */}
              <span className="pl-4">{fileName.replace('.json', '')}</span>
              
                  <div className="flex flex-row items-center mx-2">
                    <Button onClick={() => { 
                      onSelect(fileName); 
                      setTituloOff(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                      }} className="rounded-xl bg-sky-500 mr-2 text-base text-white transition duration-200 hover:bg-sky-400 active:bg-green-100">
                      <SquarePlay />
                        <span className="hidden md:inline">
                        Ver
                        </span>
                      </Button>
                    <Button onClick={() => onDelete(fileName)} variant="destructive">
                      <Trash2 />
                      <span className="hidden md:inline">
                      Eliminar
                        </span>
                      
                      </Button>
                  </div>
                  
              </div>
            
          ))
        )}
      </CardContent>
    </Card>
  )
}