import { useData } from '../context/DataContext'

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

  return (
    <div>
      <h1 className="flex text-center justify-center">Test con Gpt y .JSON</h1>

      <div className="upload-section">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>

      {error && <div>{error}</div>}
    </div>
  )
}

export default JsonViewer
