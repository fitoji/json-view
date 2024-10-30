import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/menu')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleResetPassword = async () => {
    if (!user.email) return setError('Por favor ingrese un correo')
    try {
      await resetPassword(user.email)
      setError('Te hemos enviado un correo para cambiar la contraseña')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate('/menu')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex w-full max-w-xs m-auto flex-col">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white mt-8 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="tucorreo@email.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          ></Input>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          ></Input>
        </div>

        <div className="gap-8 flex items-center justify-between">
          <Button className="bg-emerald-400 hover:bg-emerald-300 font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
            Iniciar Sesión!
          </Button>
        </div>

        <Button
          onClick={handleGoogleLogin}
          className="bg-sky-500 mt-2 hover:bg-sky-300 shadow-md py-2 px-4 mb-2"
        >
          Iniciar sesion con Google
        </Button>
      </form>
      <div className="flex justify-end">
        <a
          href="#!"
          className=" mb-4 inline-block align-baseline font-bold text-sm text-emerald-700 hover:text-emerald-600"
          onClick={handleResetPassword}
        >
          Olvidé mi contraseña
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <p className="my-4 flex justify-between px-4 text-slate-700 flex-col text-sm">
          ¿No tienes una cuenta? Registrate y crea una cuenta.
          <Link
            className="bg-emerald-400 mt-2 text-white font-bold rounded-lg p-2 hover:bg-emerald-300"
            to="/register"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
