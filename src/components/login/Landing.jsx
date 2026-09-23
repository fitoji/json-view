import { lazy, Suspense, useEffect, useState } from 'react'
import FileDropZone from '../FileDropZone'
import FileViewer from '../FileViewer'
import StoredFiles from '../StoredFiles'
import { questionnaireIdentity } from '../../helpers/examSession.mjs'

import { useDriverPreference } from '@/hooks/useDriverPreferences'
import { useTituloOff } from '@/hooks/useTituloOff'

const FraseAleatoria = lazy(() => import('../frases/FraseAleatoria'))
const StorageUsage = lazy(() => import('../StorageUsage'))

const driverPromise = import('driver.js')

export default function Landing() {
  const [files, setFiles] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedQuestionnaireIdentity, setSelectedQuestionnaireIdentity] = useState(null)
  const [storageUsage, setStorageUsage] = useState(0)
  const { tituloOff, setTituloOff } = useTituloOff()
  const { isTourEnabled, hasSeenTour, markTourSeen } = useDriverPreference()

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
    // Auto-start runs once per user; re-enabling the tour via the menu switch clears the seen flag.
    if (isTourEnabled && !hasSeenTour) {
      driverPromise.then(({ driver }) => {
        import('driver.js/dist/driver.css')
        import('./driverjs.css')
        markTourSeen()
        const driverObj = driver({
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          doneBtnText: 'Listo',
          showProgress: true,
          showButtons: ['next', 'done', 'previous'],
          popoverClass: 'driverjs-theme',
          skipMissingElement: true,
          steps: [
            {
              element: '#driver-step-1',
              popover: {
                title: 'Visualizador de Tests en formato JSON',
                description:
                  '¡Bienvenido a la aplicación de visualización de tests en formato JSON! Aquí podrás visualizar tus tests en formato JSON y practicar con ellos. Realizaremos un pequeño tour por la aplicación.',
              },
            },
            {
              element: '#driver-step-2',
              popover: {
                title: '¡Elige tu cuestionario en tu PC!',
                description:
                  'Puedes seleccionar tu archivo haciendo clic aquí o arrastrándolo. El cuestionario puede ser .json o .txt, pero el formato debe ser el mismo que el de los ejemplos.',
              },
            },
            {
              element: '#driver-step-3',
              popover: {
                title:
                  'Aquí se almacenarán tus cuestionarios. Puedes verlos o eliminarlos.',
                description:
                  "Puedes cambiar el orden manteniendo el clic apretado y moviendo la tarjeta. En el ícono de 'PLAY' reproducirás el cuestionario y con el ícono del 'Cubo de basura' lo borrarás del almacén del explorador (¡no de tu disco duro!).",
              },
            },
            {
              element: '#driver-step-practicar',
              popover: {
                title: 'Modo Practicar',
                description:
                  'Este botón te lleva directo al modo Pregunta Respuesta: feedback inmediato después de cada respuesta, ideal para practicar y aprender.',
              },
            },
            {
              element: '#driver-step-examen',
              popover: {
                title: 'Modo Examen',
                description:
                  'Este botón te lleva al modo Examen: sin feedback inmediato, navegación libre entre preguntas, y revisión final con todas tus respuestas.',
              },
            },
            {
              element: '#driver-step-ver',
              popover: {
                title: 'Ver cuestionario',
                description:
                  'Este botón abre el selector de modo para que elijas cómo quieres realizar el test.',
              },
            },
            {
              element: '#driver-step-eliminar',
              popover: {
                title: 'Eliminar cuestionario',
                description:
                  'Este botón borra el cuestionario del almacén del navegador. ¡No lo elimina de tu disco duro!',
              },
            },
            {
              element: '#driver-step-4',
              popover: {
                title: 'Menu general.',
                description:
                  'Haciendo Click aquí se expandira un menu con opciones.',
              },
            },
            {
              element: '#driver-step-darkmode',
              popover: {
                title: 'Modo oscuro / claro',
                description:
                  'Este botón alterna entre el modo oscuro y el modo claro. Prueba el que más te guste.',
              },
            },
            {
              element: '#driver-step-temas',
              popover: {
                title: 'Personaliza los temas',
                description:
                  'Aquí podrás elegir entre más de 49 temas de color, cambiar las fuentes y el estilo de la aplicación.',
              },
            },
            {
              element: '#driver-step-5',
              popover: {
                title: 'Documentación de la aplicación',
                description:
                  'Aquí podrás encontrar información y ayuda para poder pedirle de manera correcta a ChatGPT para que realize los test de manera adecuada, también ayuda y consejos para poder usar la app.',
              },
            },
            {
              element: '#driver-step-7',
              popover: {
                title: 'Desactivar Tour',
                description:
                  'Si ya no quieres que vaya el tour, puedes desactivarlo aquí.',
              },
            },
          ],
        })
        driverObj.drive()
      })
    }
  }, [isTourEnabled, hasSeenTour])

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

  const [initialMode, setInitialMode] = useState(null)

  const handleFileSelect = (fileName, mode) => {
    const content = files[fileName]
    setSelectedFile(content)
    setSelectedQuestionnaireIdentity(questionnaireIdentity(content))
    setInitialMode(mode || null)
  }

  const handleFileDelete = (fileName) => {
    // Called when a row's exit animation finishes (may be from a timer).
    // Derive the next store from localStorage instead of the `files`
    // closure: two exit commits can land within the same tick on a rapid
    // double-delete, and a stale spread would resurrect the first deleted
    // file (same source-of-truth idiom as handleFileDrop).
    const storedFiles = JSON.parse(localStorage.getItem('jsonFiles') || '{}')
    const updatedFiles = { ...storedFiles }
    delete updatedFiles[fileName]
    setFiles(updatedFiles)
    localStorage.setItem('jsonFiles', JSON.stringify(updatedFiles))
    updateStorageUsage()
    if (selectedFile === files[fileName]) {
      setSelectedFile(null)
      setSelectedQuestionnaireIdentity(null)
    }
  }

  return (
    // No background class here: body.fito-fondo is the single background owner.
    // Skip link and #main-content landmark are owned by the App shell.
    <div className="flex flex-col min-h-dvh text-foreground">
      <div className="flex-1">
        <div className="flex flex-col w-full max-w-3xl mx-auto px-4 space-y-4">
          {tituloOff && (
            <div>
              <h1
                id="driver-step-1"
                className="text-2xl pt-4 font-bold tracking-tighter md:text-4xl lg:text-4xl/none text-foreground"
              >
                Visualizador de Tests en formato Json
              </h1>
              <p className="max-w-175 text-muted-foreground md:text-xl mb-8 md:mb-18">
                ¡Elegi tu archivo .json hecho con gpt y empieza a practicar!
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          {selectedFile && (
            <FileViewer
              content={selectedFile}
              questionnaireIdentity={selectedQuestionnaireIdentity}
              initialMode={initialMode}
            />
          )}
          <div id="driver-step-2">
            <FileDropZone onFileDrop={handleFileDrop} />
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
      </div>
    </div>
  )
}
