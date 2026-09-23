import React from 'react'
import './cargador.css'

const Cargador = ({ className }) => {
  return (
    <div
    className={`spinner${className ? ` ${className}` : ''}`}
    role="status"
    aria-live="polite"
    aria-label="Cargando"
  >
    <span
      className="visually-hidden">
      Cargando...
    </span>
  </div>
  )
}

export default Cargador