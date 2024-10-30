import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/lista')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className="flex w-full max-w-xs m-auto flex-col">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Email
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="tucorreo@email.com"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></Input>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Contraseña
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></Input>
        </div>

        <Button className="bg-sky-500 hover:bg-sky-300 font-bold focus:outline-none focus:shadow-outline">
          ¡Registrarse!
        </Button>
      </form>
      <div className="bg-white rounded-lg shadow-md">
        <p className="my-4 flex justify-between px-4 text-slate-700 flex-col text-sm">
          ¿Ya tienes una cuenta? Inicia sesión
          <Link
            className="bg-emerald-400 mt-2 text-white font-bold rounded-lg p-2 hover:bg-emerald-300"
            to="/login"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
