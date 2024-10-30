import { useData } from '../context/DataContext'
import { useEffect } from 'react'
import Test from './Test'

function LaunchTest() {
  const { data, setData, error, setError } = useData()
  useEffect(() => {

    // Aquí puedes agregar la lógica para manejar los cambios en los datos
    setData(data)
    // Por ejemplo, podrías hacer una llamada a una API o actualizar el estado

  }, [data])
  

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}

      {data && data.length>0 && (
        <div>
         <Test data={data} />
        </div>
      )}
    </div>
  )
}

export default LaunchTest
