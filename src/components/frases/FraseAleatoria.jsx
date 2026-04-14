import React, { useState, useEffect } from "react";
import frases from "./frases-estoicas.json";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { X } from "lucide-react";

export default function FraseAleatoria() {
  const [visible, setVisible] = useState(true);
  const [fraseSeleccionada, setFraseSeleccionada] = useState(null);

  const seleccionarFraseAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * frases.frases.length);
    setFraseSeleccionada(frases.frases[indiceAleatorio]);
  };

  useEffect(() => {
    seleccionarFraseAleatoria();
  }, []);
  if (!visible) {
    return null;
  }
  if (!fraseSeleccionada) {
    return <div>Cargando...</div>;
  }

  return (
    <Card
      className=" bg-[#89eae0] bg-linear-to-br from-[#89eae0] to-[#f1e8fb]
       hover:bg-linear-to-br mt-16"
    >
      <CardHeader className="relative p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => setVisible(false)}
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="mt-4 px-20">
        <blockquote className="text-lg font-semibold text-slate-800">
          "{fraseSeleccionada.frase}"
        </blockquote>
        <p className="text-right text-sm text-gray-600 pt-8">
          - {fraseSeleccionada.autor}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        <Button
          onClick={seleccionarFraseAleatoria}
          className="w-6 h-6 p-0 bg-emerald-300 hover:bg-emerald-200 hover:text-emerald-900"
        >
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
