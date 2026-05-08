import { Separator } from '@/components/ui/separator'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'

import { Toaster } from '@/components/ui/sonner'
import Cargador from './components/Cargador'
import Footer from './components/Footer'
import Landing from './components/login/Landing'

import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { TituloOffProvider } from './hooks/useTituloOff'
//import Docs from './components/Docs'
const Docs = lazy(() => import('./components/Docs'))

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <TituloOffProvider>
            <main className="grow">
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
          <Footer className="w-full shrink-0 border-t" />
          <Analytics />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
