import React from 'react'
import './cargador.css'

const Cargador = () => {
  return (
    <div
    class="spinner"
    role="status"
    aria-live="polite"
    aria-label="Cargando"
  >
    <span
      class="visually-hidden">
      Cargando...
    </span>
  </div>
  )
}

export default Cargador