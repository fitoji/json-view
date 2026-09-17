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
    <Card className="bg-card/80 backdrop-blur-xl shadow-lg border border-border/50 mt-8 max-w-2xl mx-auto">
      <CardHeader className="relative p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-muted-foreground hover:bg-accent"
          onClick={() => setVisible(false)}
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <blockquote className="text-lg font-medium text-card-foreground italic">
          "{fraseSeleccionada.frase}"
        </blockquote>
        <p className="text-right text-sm text-muted-foreground pt-4">
          - {fraseSeleccionada.autor}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end p-4 pt-0">
        <Button
          onClick={seleccionarFraseAleatoria}
          className="p-2 bg-success hover:bg-success/90 text-success-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
