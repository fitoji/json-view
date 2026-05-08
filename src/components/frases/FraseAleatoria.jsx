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
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 mt-8 max-w-2xl mx-auto">
      <CardHeader className="relative p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={() => setVisible(false)}
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <blockquote className="text-lg font-medium text-slate-800 dark:text-slate-100 italic">
          "{fraseSeleccionada.frase}"
        </blockquote>
        <p className="text-right text-sm text-slate-500 dark:text-slate-400 pt-4">
          - {fraseSeleccionada.autor}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end p-4 pt-0">
        <Button
          onClick={seleccionarFraseAleatoria}
          className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}