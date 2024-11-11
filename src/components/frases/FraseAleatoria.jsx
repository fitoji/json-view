import React, { useState, useEffect } from 'react'
import frases from './frases-estoicas.json'
import { Card, CardContent } from "../ui/card"
//import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ChevronRight } from 'lucide-react'
import { X } from "lucide-react"

export default function FraseAleatoria() {
  const [visible, setVisible] = useState(true)
  const [fraseSeleccionada, setFraseSeleccionada] = useState(null)

  const seleccionarFraseAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * frases.frases.length)
    setFraseSeleccionada(frases.frases[indiceAleatorio])
  }

  useEffect(() => {
    seleccionarFraseAleatoria()
  }, [])
  if (!visible) {
    return null
  }
  if (!fraseSeleccionada) {
    return <div>Cargando...</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto relative mt-2 bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
       hover:bg-gradient-to-br">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => setVisible(false)}
        aria-label="Cerrar"
      >
        <X className="h-4 w-4" />
      </Button>
      <CardContent className="p-6 mt-4">
        <blockquote className="text-lg font-semibold mb-4 text-slate-800">
          "{fraseSeleccionada.frase}"
        </blockquote>
        <p className="text-right text-sm text-gray-600 mb-4">
          - {fraseSeleccionada.autor}
        </p>
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {fraseSeleccionada.categoria.map((cat, index) => (
            <Badge key={index} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div> */}
        <div className='flex justify-end'>
        <Button 
          onClick={seleccionarFraseAleatoria}
          className="w-10 p-0 bg-emerald-300 hover:bg-emerald-200"
        >
          <ChevronRight />
          
        </Button>
        </div>
        
      </CardContent>
    </Card>
  )
}