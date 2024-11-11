import React, { useState } from 'react'
import { CircleHelp, Menu, Undo2, X } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const NavBar = () => {
  const location = useLocation(); // ... código existente ...

  return (
    <nav className="navbar-fondo text-white">
      <div className="flex flex-row items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <div className="flex items-center">
          <img
            className="h-12"
            src="/mascot.webp"
            alt="SuperTest Mascota"
          />
          <span className="font-bold text-xl">Visor JsonTest </span>
        </div>
        <div className="flex justify-end pr-2 pt-1">
          <Link
            className="bg-emerald-300 mt-2 text-white font-bold rounded-lg p-2 hover:bg-emerald-200"
            to={location.pathname === '/' ? '/docs' : '/'}>
            {location.pathname === '/' && <CircleHelp />}
            {location.pathname === '/docs' && <Undo2  />       }
          </Link>
        </div>
      </div>

    
    </nav>
  )
}

export default NavBar
