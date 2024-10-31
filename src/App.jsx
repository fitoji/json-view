import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
//import NavBar from './components/NavBar'


import { Toaster } from '@/components/ui/sonner'
import Landing from './components/login/Landing'
import Footer from './components/Footer'
import Cargador from './components/Cargador'
import Docs from './components/Docs'
//import Login from './components/login/Login'
//import Register from './components/login/Register'
//import { AuthProvider } from './components/context/authContext'
//import { ProtectedRoute } from './components/login/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Suspense
            fallback={
              <div>
                Cargando...
                <Cargador className="absolute inset-0 flex justify-center items-center h-screen" />
              </div>
            }>
             {/* <NavBar /> */}
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/docs" element={<Docs />} />
                {/* <Route path="/register" element={<Register />} />  */}
                             
              </Routes>
           
          </Suspense>
        </main>
        <Toaster />

        <Separator />
        <Footer className="w-full shrink-0 border-t bg-sky-50" />
      </div>
    </BrowserRouter>
  )
}

export default App
