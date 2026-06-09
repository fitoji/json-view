import React from 'react'
import './cargador.css'

const Cargador = () => {
  return (
    <div
    className="spinner"
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