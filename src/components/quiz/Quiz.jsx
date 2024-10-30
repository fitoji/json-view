import { useData } from '../context/DataContext'
import { Button } from '@/components/ui/button'

function Quiz() {
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

  return (
    <div className="container">
      <h1 className="bg-emerald-400 font-bold">Test preba</h1>

      {error && <div className="error">{error}</div>}

      {data && (
        <div className="json-display">
          <h2 className="bg-sky-600">Test JSON:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Quiz
