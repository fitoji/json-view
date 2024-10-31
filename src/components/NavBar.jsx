import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  

  return (
    <nav className="navbar-fondo text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center h-20">
            <div className="flex flex-row">
              <img
                className="h-12"
                src="/mascot.webp"
                alt="SuperTest Mascota"
              />
              <span className="font-bold text-xl">SuperTest</span>
            </div>

            <div className="hidden md:block flex-grow">
              <div className="space-x-4">
                <a
                  href="/"
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-300"
                >
                  Inicio
                </a>
              
                
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-300"
                >
                  Contacto
                </a>
              </div>
            </div>
            <div className="ml-10">
              
            </div>
          </div>
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-200 bg-emerald-400 hover:text-white hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-300 focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-300"
            >
              Inicio
            </a>
            <a
              href="/lista"
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-300"
            >
              Tests
            </a>
            <a
              href="/chat"
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-300"
            >
              JavGPT
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-300"
            >
              Acerca de
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
