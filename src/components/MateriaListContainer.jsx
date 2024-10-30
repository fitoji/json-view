import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config.mjs'
import { useAuth } from './context/authContext'
import { Button } from './ui/button'
import MateriaList from './MateriaList'
import { useNavigate } from 'react-router-dom'


const MateriaListContainer = () => {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <h1>Cargando...</h1>
  const [materias, setMaterias] = useState([])

  useEffect(() => {
    const materiasRef = collection(db, 'materias')
    getDocs(materiasRef).then((resp) => {
      setMaterias(
        resp.docs.map((mat) => {
          return { ...mat.data(), id: mat.id }
        })
      )
    })
  }, [])

  return (
    <div>
     {/*  <p>Bienvenido {user.displayName || user.email}</p>
     
      <Button onClick={handleLogout}>Cerrar Sesión</Button> */}
      <MateriaList materias={materias} />
    </div>
  )
}

export default MateriaListContainer
