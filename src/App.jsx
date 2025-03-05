import React, { lazy, Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import NavBar from "./components/NavBar";

import { Toaster } from "@/components/ui/sonner";
import Landing from "./components/login/Landing";
import Footer from "./components/Footer";
import Cargador from "./components/Cargador";

import { Analytics } from "@vercel/analytics/react";
import { TituloOffProvider } from "./hooks/useTituloOff";
//import Docs from './components/Docs'
const Docs = lazy(() => import("./components/Docs"));

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <TituloOffProvider>
          <main className="flex-grow">
            <Suspense
              fallback={
                <Cargador className="absolute inset-0 flex justify-center items-center h-screen" />
              }
            >
              <NavBar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/docs" element={<Docs />} />
              </Routes>
            </Suspense>
          </main>
        </TituloOffProvider>
        <Toaster />

        <Separator />
        <Footer className="w-full shrink-0 border-t bg-sky-50" />
        <Analytics />
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
}

export default App;
