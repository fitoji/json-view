import { useData } from '../context/DataContext'
import { Input } from '../ui/input'
import { useEffect } from 'react'

function JsonViewer() {
  const { data, setData, error, setError } = useData()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result)
        setData(content)
        setError('')
        console.log('Data stored:', content) // For verification
      } catch (err) {
        setError('Invalid JSON file')
        setData(null)
      }
    }
    reader.readAsText(file)
  }
  useEffect(() => {

    // Aquí puedes agregar la lógica para manejar los cambios en los datos
    setData(data)
    // Por ejemplo, podrías hacer una llamada a una API o actualizar el estado

  }, [data])

  return (
    <div>
      <div>
        <Input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="shadow-lg
   bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
    hover:bg-gradient-to-br hover:from-emerald-300 hover:to-emerald-100 transition-colors duration-200 ease-in-out"
        />
      </div>

      {error && <div>{error}</div>}
    </div>
  )
}

export default JsonViewer
