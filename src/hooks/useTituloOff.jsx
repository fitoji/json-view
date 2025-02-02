import React, { createContext, useContext, useState } from "react";

const TituloOffContext = createContext();

export function TituloOffProvider({ children }) {
  const [tituloOff, setTituloOff] = useState(true);

  const value = {
    tituloOff,
    setTituloOff,
  };

  return (
    <TituloOffContext.Provider value={value}>
      {children}
    </TituloOffContext.Provider>
  );
}

export function useTituloOff() {
  const context = useContext(TituloOffContext);
  if (context === undefined) {
    throw new Error(
      "useTituloOff debe ser usado dentro de un TituloOffProvider"
    );
  }
  return context;
}
