import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowBigRightDash,
  CheckCircle,
  Settings,
  TriangleAlert,
  XCircle,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { preguntasAleatorias } from '../../helpers/funcionesTest.mjs'
import Modal from '../Modal'
import Temporizador from '../Temporizador'
import BotonJavGpt from '../boton-jav'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Progress } from '../ui/progress'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'
import './Test.css'

const Test = ({ data }) => {
  useEffect(() => {
    reset()
    setNPreguntas(data.length)
    const newQuestions = preguntasAleatorias(
      data.length,
      data,
      preguntaAleatoria,
    )
    setQuestions(newQuestions)
    setQuestion(newQuestions[0])
  }, [data])

  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [isRunning, setIsRunning] = useState(true)
  const [preguntaAleatoria, setPreguntaAleatoria] = useState(data.length)
  const [numero, setNumero] = useState(0)
  const [index, setIndex] = useState(0)
  const [npreguntas, setNPreguntas] = useState(data.length)
  const [questions, setQuestions] = useState(
    preguntasAleatorias(npreguntas, data, preguntaAleatoria),
  )
  const [question, setQuestion] = useState(questions[0])
  const [equiv, setEquiv] = useState([])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [mal, setMal] = useState(0)
  const [result, setResult] = useState(false)

  const Option1 = useRef(null)
  const Option2 = useRef(null)
  const Option3 = useRef(null)
  const Option4 = useRef(null)
  const Option5 = useRef(null)
  const option_array = [Option1, Option2, Option3, Option4]

  const [scoreFlash, setScoreFlash] = useState('neutral')
  useEffect(() => {
    if (score > 0) {
      setScoreFlash('correct')
      const timer = setTimeout(() => setScoreFlash('neutral'), 300)
      return () => clearTimeout(timer)
    }
  }, [score])

  const [malFlash, setMalFlash] = useState('neutral')
  useEffect(() => {
    if (mal > 0) {
      setMalFlash('wrong')
      const timer = setTimeout(() => setMalFlash('neutral'), 300)
      return () => clearTimeout(timer)
    }
  }, [mal])

  const generarNumeroAleatorio = () => {
    setNumero(Math.floor(Math.random() * 4))
  }

  const handlePreguntasChange = () => {
    setPreguntaAleatoria((prev) => {
      const newVal = !prev
      setQuestions(preguntasAleatorias(npreguntas, data, newVal))
      return newVal
    })
  }

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('right')
        toast.success('¡Correcto!', {
          duration: 1500,
          icon: <CheckCircle />,
          style: {
            background: '#10b981',
            color: '#fff',
            border: 'none',
          },
        })
        setScore((s) => s + 1)
      } else {
        if (question.ans === 0) {
          setOpenAlert(true)
        } else {
          e.target.classList.add('wrong')
          toast.error('Incorrecto', {
            duration: 1500,
            icon: <XCircle />,
            style: {
              background: '#ef4444',
              color: '#fff',
              border: 'none',
            },
          })
          if (
            question.ans >= 1 &&
            question.ans <= 5 &&
            option_array[question.ans - 1]?.current
          ) {
            option_array[question.ans - 1].current.classList.add('right')
          }
          setMal((m) => m + 1)
          setEquiv((prev) => [...prev, question])
        }
      }
      setLock(true)
    }
  }

  const next = () => {
    if (lock) {
      if (index >= npreguntas - 1) {
        setIsRunning(false)
        toast.success('¡Cuestionario Completo!', { duration: 2000 })
        setResult(true)
        return
      }
      generarNumeroAleatorio()
      setIndex((i) => i + 1)
      setQuestion(questions[index + 1])
      setLock(false)
      option_array.forEach((opt) => {
        if (opt.current) {
          opt.current.classList.remove('wrong', 'right')
        }
      })
    }
  }

  const temporizadorRef = useRef()
  const reset = () => {
    setIndex(0)
    setNPreguntas(data.length)
    const newQuestions = preguntasAleatorias(
      npreguntas,
      data,
      preguntaAleatoria,
    )
    setQuestions(newQuestions)
    setQuestion(newQuestions[0])
    setScore(0)
    setMal(0)
    setLock(false)
    setResult(false)
    generarNumeroAleatorio()
    setEquiv([])
    if (temporizadorRef.current) {
      temporizadorRef.current.handleResetTemp()
    }
  }

  const resetErrores = () => {
    setIndex(0)
    setScore(0)
    setMal(0)
    setIsRunning(true)
    setQuestions(equiv)
    setQuestion(equiv[0])
    setNPreguntas(equiv.length)
    setLock(false)
    setResult(false)
    setEquiv([])
  }

  const handleInputChange = (event) => {
    const num = Number(event.target.value)
    setNPreguntas(num)
    setQuestions(preguntasAleatorias(num, data, preguntaAleatoria))
    setQuestion(questions[0])
    setIndex(0)
  }

  const handleSubmit = () => {
    setOpen(false)
    reset()
  }

  const progressPercent = ((index + 1) * 100) / npreguntas

  // Renderiza las opciones según el orden aleatorio
  const renderOpciones = (isMobile = false) => {
    const opciones = [
      { ref: Option1, letra: 'a', texto: question.option1, ans: 1 },
      { ref: Option2, letra: 'b', texto: question.option2, ans: 2 },
      { ref: Option3, letra: 'c', texto: question.option3, ans: 3 },
      { ref: Option4, letra: 'd', texto: question.option4, ans: 4 },
      { ref: Option5, letra: 'e', texto: question.option5, ans: 5 },
    ].filter((o) => o.texto && o.texto !== '')

    // Reordenar según numero
    const renderOrder = [0, 1, 2, 3, 4].map(
      (i) => (i + numero) % opciones.length,
    )
    return renderOrder.map((i) => {
      const opt = opciones[i]
      if (!opt) return null
      return (
        <li key={opt.ans}>
          <button
            type="button"
            ref={opt.ref}
            className="quiz-option w-full text-left"
            onClick={(e) => checkAns(e, opt.ans)}
          >
            <span className="quiz-option-letter">{opt.letra}</span>
            {opt.texto}
          </button>
        </li>
      )
    })
  }

  return (
    <div className="quiz-wrapper min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Desktop Layout - lg+ (1024px+): full 3-column layout */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:min-h-screen">
        {/* Sidebar izq */}
        <aside className="col-span-2 p-6 pt-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
          <div className="sticky top-20 space-y-6">
            <div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Módulo
              </span>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                {question.asignatura}
              </h1>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>{question.tema}</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">
                {npreguntas} preguntas
              </p>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`quiz-score quiz-score-correct ${scoreFlash === 'correct' ? 'animate-pulse-success' : ''}`}
                >
                  <CheckCircle size={18} />
                  <span>{score}</span>
                </div>
                <span className="text-sm text-slate-500">Correctas</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`quiz-score quiz-score-wrong ${malFlash === 'wrong' ? 'animate-shake-wrong' : ''}`}
                >
                  <XCircle size={18} />
                  <span>{mal}</span>
                </div>
                <span className="text-sm text-slate-500">Incorrectas</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main card - full width para lg */}
        <main className="col-span-8 p-4 lg:p-8 flex flex-col max-h-screen overflow-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pregunta {index + 1} de {npreguntas}
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress
              value={progressPercent}
              className="h-2 bg-slate-200 dark:bg-slate-700"
            />
          </div>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl">
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="min-h-[300px]"
                >
                  {result ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl font-bold text-emerald-500"
                      >
                        {score}
                        <span className="text-2xl text-slate-400">
                          /{npreguntas}
                        </span>
                      </motion.div>
                      <p className="text-lg text-slate-600 dark:text-slate-300">
                        Respuestas correctas
                      </p>
                      <div className="px-6 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Tiempo:{' '}
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {temporizadorRef.current?.getTime()}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-3 flex-wrap justify-center">
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-6 rounded-xl font-semibold transition-all hover:scale-105"
                          onClick={reset}
                        >
                          <ArrowBigRightDash /> Repetir
                        </Button>
                        {mal > 0 && (
                          <Button
                            className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-6 rounded-xl font-semibold transition-all hover:scale-105"
                            onClick={resetErrores}
                          >
                            <TriangleAlert className="mr-2" /> Revisar errores (
                            {mal})
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="quiz-question-number">
                          Pregunta #{question.id}
                        </span>
                        <Separator orientation="vertical" className="h-4" />
                        <span className="text-sm text-slate-500">
                          {question.tema}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
                        {question.question}
                      </h2>
                      <ul className="quiz-options space-y-3" role="listbox">
                        {renderOpciones(false)}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>

            {!result && (
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-300 dark:text-slate-900 dark:hover:bg-sky-400 text-white px-6 py-6 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={next}
                  disabled={!lock}
                >
                  <ArrowBigRightDash className="mr-2" /> Siguiente pregunta
                </Button>
              </CardFooter>
            )}
          </Card>
        </main>

        {/* Sidebar der */}
        <aside className="col-span-2 p-6 pt-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-l border-slate-200 dark:border-slate-700 overflow-y-auto">
          <div className="sticky top-20 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <Temporizador
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                ref={temporizadorRef}
              />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <BotonJavGpt question={question} />
            </div>
            <Button
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl py-3"
              onClick={() => setOpen(true)}
            >
              <Settings className="mr-2" /> Configuración
            </Button>
          </div>
        </aside>
      </div>

      {/* Tablet/Mobile Layout - md to lg (768px-1023px): header + main card only */}
      <div className="hidden md:block lg:hidden flex flex-col min-h-screen">
        {/* Header con score + timer */}
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="quiz-score quiz-score-correct">
                <CheckCircle size={16} />
                <span>{score}</span>
              </div>
              <div className="quiz-score quiz-score-wrong">
                <XCircle size={16} />
                <span>{mal}</span>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                <Temporizador
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  ref={temporizadorRef}
                />
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(true)}
              className="rounded-full"
            >
              <Settings size={20} />
            </Button>
          </div>
          <Progress value={progressPercent} className="mt-3 h-1.5" />
        </header>

        {/* Main card */}
        <main className="flex-1 p-4 overflow-auto">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-[250px]"
                >
                  {result ? (
                    <div className="flex flex-col items-center text-center space-y-4 py-6">
                      <div className="text-5xl font-bold text-emerald-500">
                        {score}
                        <span className="text-xl text-slate-400">
                          /{npreguntas}
                        </span>
                      </div>
                      <Button className="bg-emerald-500" onClick={reset}>
                        Repetir
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <span className="quiz-question-number text-xs">
                        #{question.id}
                      </span>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        {question.question}
                      </h2>
                      <ul className="quiz-options space-y-2">
                        {renderOpciones(false)}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            {!result && (
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-sky-500"
                  onClick={next}
                  disabled={!lock}
                >
                  <ArrowBigRightDash /> Siguiente
                </Button>
              </CardFooter>
            )}
          </Card>
        </main>
      </div>

      {/* Mobile Layout - small screens (<768px) */}
      <div className="md:hidden flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="quiz-score quiz-score-correct">
                <CheckCircle size={16} />
                <span className="text-sm">{score}</span>
              </div>
              <div className="quiz-score quiz-score-wrong">
                <XCircle size={16} />
                <span className="text-sm">{mal}</span>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(true)}
              className="rounded-full"
            >
              <Settings size={20} />
            </Button>
          </div>
          <Progress value={progressPercent} className="mt-3 h-1.5" />
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
          <Card className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl border-0">
            <CardContent className="p-5 h-full flex flex-col overflow-y-auto max-h-[60vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 flex-1 flex flex-col"
                >
                  {result ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="text-5xl font-bold text-emerald-500">
                        {score}
                        <span className="text-xl text-slate-400">
                          /{npreguntas}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        respuestas correctas
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          className="w-full bg-emerald-500"
                          onClick={reset}
                        >
                          Repetir
                        </Button>
                        {mal > 0 && (
                          <Button
                            className="w-full bg-amber-500 hover:bg-amber-600"
                            onClick={resetErrores}
                          >
                            Revisar errores
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="quiz-question-number">
                          #{question.id}
                        </span>
                        <span>{question.asignatura}</span>
                      </div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {question.question}
                      </h2>
                      <ul className="space-y-2 mt-4">{renderOpciones(true)}</ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            {!result && (
              <CardFooter className="p-4 pt-2">
                <Button
                  className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-4 rounded-xl font-semibold"
                  onClick={next}
                  disabled={!lock}
                >
                  <ArrowBigRightDash className="mr-2" /> Siguiente
                </Button>
              </CardFooter>
            )}
          </Card>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between z-40 md:hidden">
          <Temporizador
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            ref={temporizadorRef}
          />
          <span className="text-sm text-slate-500">
            {index + 1}/{npreguntas}
          </span>
        </footer>
      </div>

      {/* Modals */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-80 flex flex-col items-center p-4">
          <Settings
            size={40}
            className="text-slate-600 dark:text-slate-300 mb-4"
          />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Configuración
          </h3>
          <Separator className="w-full mb-4" />
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="preguntas-random" className="text-sm font-medium">
                Preguntas Aleatorias
              </Label>
              <Switch
                id="preguntas-random"
                checked={preguntaAleatoria}
                onCheckedChange={handlePreguntasChange}
              />
            </div>
          </div>
          <Button
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600"
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </div>
      </Modal>

      <Modal open={openAlert} onClose={() => setOpenAlert(false)}>
        <div className="text-center w-64 py-4">
          <TriangleAlert size={48} className="mx-auto text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Atención
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Pregunta con respuesta cuestionable. Consultá en documentation.
          </p>
          <Button
            className="w-full bg-slate-900 dark:bg-white"
            onClick={() => setOpenAlert(false)}
          >
            Continuar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Test
