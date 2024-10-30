import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
//import NavBar from './components/NavBar'
//import MateriaListContainer from "./components/MateriaListContainer"
//import MateriaDetailContainer from "./components/MateriaDetailContainer"
//import TestContainer from "./components/TestContainer"
const MateriaDetailContainer = lazy(() =>
  import('./components/MateriaDetailContainer')
)
const MateriaListContainer = lazy(() =>
  import('./components/MateriaListContainer')
)
const TestContainer = lazy(() => import('./components/TestContainer'))
import { Toaster } from '@/components/ui/sonner'
import Landing from './components/login/Landing'
import Footer from './components/Footer'
import Cargador from './components/Cargador'
//import Login from './components/login/Login'
//import Register from './components/login/Register'
import { AuthProvider } from './components/context/authContext'
import { ProtectedRoute } from './components/login/ProtectedRoute'

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
            }
          >
            <AuthProvider>
              {/* <NavBar /> */}
              <Routes>
                <Route path="/" element={<Landing />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> */}
                <Route
                  path="/lista"
                  element={
                    <ProtectedRoute>
                      <MateriaListContainer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/materia/:id"
                  element={<MateriaDetailContainer />}
                />

                <Route
                  path="/materia/:id/:subItem"
                  element={<TestContainer />}
                />
              </Routes>
            </AuthProvider>
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
