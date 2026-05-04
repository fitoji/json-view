import { useEffect, useState, lazy, Suspense } from 'react'
import { DataProvider } from '../context/DataContext'
import FileDropZone from '../FileDropZone'
import FileViewer from '../FileViewer'
import StoredFiles from '../StoredFiles'

import { useDriverPreference } from '@/hooks/useDriverPreferences'
import { useTituloOff } from '@/hooks/useTituloOff'

const FraseAleatoria = lazy(() => import('../frases/FraseAleatoria'))
const StorageUsage = lazy(() => import('../StorageUsage'))

const driverPromise = import('driver.js')

export default function Landing() {
  const [files, setFiles] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [storageUsage, setStorageUsage] = useState(0)
  const { tituloOff, setTituloOff } = useTituloOff()
  const { isTourEnabled } = useDriverPreference()

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('jsonFiles') || '{}')
    if (Object.keys(storedFiles).length === 0) {
      setFiles({})
    } else {
      setFiles(storedFiles)
    }
    updateStorageUsage()
  }, [])

  useEffect(() => {
    if (Object.keys(files).length > 0) {
      localStorage.setItem('jsonFiles', JSON.stringify(files))
      updateStorageUsage()
    }
  }, [files])

  useEffect(() => {
    if (isTourEnabled) {
      driverPromise.then(({ driver }) => {
        import('driver.js/dist/driver.css')
        const driverObj = driver({
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          doneBtnText: 'Listo',
          showProgress: true,
          showButtons: ['next', 'done', 'previous'],
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#driver-step-1',
              popover: {
                title: 'Visualizador de Tests en formato JSON',
                description: '¡Bienvenido a la aplicación de visualización de tests en formato JSON! Aquí podrás visualizar tus tests en formato JSON y practicar con ellos. Realizaremos un pequeño tour por la aplicación.',
              },
            },
            {
              element: '#driver-step-2',
              popover: {
                title: '¡Elige tu cuestionario en tu PC!',
                description: 'Puedes seleccionar tu archivo haciendo clic aquí o arrastrándolo. El cuestionario puede ser .json o .txt, pero el formato debe ser el mismo que el de los ejemplos.',
              },
            },
            {
              element: '#driver-step-3',
              popover: {
                title: 'Aquí se almacenarán tus cuestionarios. Puedes verlos o eliminarlos.',
                description: "Puedes cambiar el orden manteniendo el clic apretado y moviendo la tarjeta. En el ícono de 'PLAY' reproducirás el cuestionario y con el ícono del 'Cubo de basura' lo borrarás del almacén del explorador (¡no de tu disco duro!).",
              },
            },
            {
              element: '#driver-step-4',
              popover: {
                title: 'Menu general.',
                description: 'Haciendo Click aquí se expandira un menu con opciones.',
              },
            },
            {
              element: '#driver-step-5',
              popover: {
                title: 'Documentación de la aplicación',
                description: 'Aquí podrás encontrar información y ayuda para poder pedirle de manera correcta a ChatGPT para que realize los test de manera adecuada, también ayuda y consejos para poder usar la app.',
              },
            },
            {
              element: '#driver-step-6',
              popover: {
                title: 'Preguntas a Inteligencia Artificial',
                description: 'Durante alguna pregunta de un test, cliquea en este botón y podrás preguntarle a la IA',
              },
            },
            {
              element: '#driver-step-7',
              popover: {
                title: 'Desactivar Tour',
                description: 'Si ya no quieres que vaya el tour, puedes desactivarlo aquí.',
              },
            },
          ],
        })
        driverObj.drive()
      })
    }
  }, [isTourEnabled])

  const updateStorageUsage = () => {
    const totalSpace = 5 * 1024 * 1024
    const usedSpace = new Blob([JSON.stringify(localStorage)]).size
    setStorageUsage((usedSpace / totalSpace) * 100)
  }

  const handleFileDrop = (fileName, content) => {
    const storedFiles = JSON.parse(localStorage.getItem('jsonFiles') || '{}')
    const updatedFiles = { ...storedFiles, ...files, [fileName]: content }
    setFiles(updatedFiles)
    localStorage.setItem('jsonFiles', JSON.stringify(updatedFiles))
    updateStorageUsage()
  }

  const handleFileSelect = (fileName) => {
    setSelectedFile(files[fileName])
  }

  const handleFileDelete = (fileName) => {
    const updatedFiles = { ...files }
    delete updatedFiles[fileName]
    setFiles(updatedFiles)
    localStorage.setItem('jsonFiles', JSON.stringify(updatedFiles))
    updateStorageUsage()
    if (selectedFile === files[fileName]) {
      setSelectedFile(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <main id="main-content" className="flex-1">
        <div className="flex flex-col items-center space-y-4 text-center">
          {tituloOff && (
            <div>
              <h1 id="driver-step-1" className="text-2xl pt-4 font-bold tracking-tighter md:text-4xl lg:text-4xl/none text-emerald-700">
                Visualizador de Tests en formato Json
              </h1>
              <p className="mx-auto max-w-175 text-gray-600 md:text-xl mb-8 md:mb-18">
                ¡Elegi tu archivo .json hecho con gpt y empieza a practicar!
              </p>
            </div>
          )}
        </div>
        <DataProvider>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            {selectedFile && <FileViewer content={selectedFile} />}
            <div id="driver-step-2">
              <FileDropZone onFileDrop={handleFileDrop} tituloOff={tituloOff} />
            </div>
            <div id="driver-step-3" className="mt-8 w-full px-4">
              <StoredFiles
                files={files || {}}
                onSelect={handleFileSelect}
                onDelete={handleFileDelete}
                setTituloOff={setTituloOff}
                onFileAdd={handleFileDrop}
              />
            </div>
            <Suspense fallback={null}>
              <FraseAleatoria />
            </Suspense>
            <Suspense fallback={null}>
              <StorageUsage usage={storageUsage} />
            </Suspense>
          </div>
        </DataProvider>
      </main>
    </div>
  )
}