import { useCallback, useEffect, useRef, useState } from 'react'
import KeyboardIcon from 'lucide-react/dist/esm/icons/keyboard'
import TriangleAlert from 'lucide-react/dist/esm/icons/triangle-alert'
import ArrowBigRightDash from 'lucide-react/dist/esm/icons/arrow-big-right-dash'
import ArrowBigLeftDash from 'lucide-react/dist/esm/icons/arrow-big-left-dash'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Progress } from '../ui/progress'
import { Separator } from '../ui/separator'
import Modal from '../Modal'
import { ExamTimer } from './ExamTimer'
import ExamReview from './ExamReview'
import './Test.css'

const STORAGE_KEY = 'quiz-exam-v1'

function loadSavedSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version === '1') return parsed
    localStorage.removeItem(STORAGE_KEY)
    return null
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function saveSession(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage might be full or unavailable
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

export default function ExamScreen({ questions: rawQuestions, onBackToMenu }) {
  // Sort questions sequentially by id for exam mode
  const questions = [...rawQuestions].sort((a, b) => a.id - b.id)

  // Check for existing saved session
  const savedSession = useRef(loadSavedSession())

  const [showResumeDialog, setShowResumeDialog] = useState(
    savedSession.current !== null,
  )
  const [initialized, setInitialized] = useState(false)

  const [userAnswers, setUserAnswers] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [examComplete, setExamComplete] = useState(false)
  const [examScore, setExamScore] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [paused, setPaused] = useState(true)

  const [startTime, setStartTime] = useState(Date.now())
  const timerRef = useRef(null)

  // Initialize or restore session
  useEffect(() => {
    if (initialized) return

    if (savedSession.current) {
      const s = savedSession.current
      setUserAnswers(s.userAnswers || {})
      setActiveIndex(s.activeIndex || 0)
      setStartTime(s.startTime || Date.now())
    } else {
      // Fresh exam — no saved session, start immediately
      setStartTime(Date.now())
      setPaused(false)
    }

    setInitialized(true)
  }, [initialized])

  // Start timer when resume dialog is dismissed (fresh or resume)
  const handleStartExam = useCallback(() => {
    setShowResumeDialog(false)
    setPaused(false)

    if (savedSession.current) {
      // Restore saved session — adjust startTime to account for elapsed
      const elapsed = savedSession.current.elapsed || 0
      setStartTime(Date.now() - elapsed)
    }
  }, [])

  const handleNewExam = useCallback(() => {
    clearSession()
    savedSession.current = null
    setUserAnswers({})
    setActiveIndex(0)
    setStartTime(Date.now())
    setShowResumeDialog(false)
    setPaused(false)
  }, [])

  // Save to localStorage on every answer or navigation change
  useEffect(() => {
    if (!initialized || paused || showResumeDialog) return

    const elapsed = Date.now() - startTime
    saveSession({
      version: '1',
      questions: questions,
      userAnswers,
      activeIndex,
      startTime,
      elapsed,
    })
  }, [userAnswers, activeIndex, startTime, initialized, paused, showResumeDialog, questions])

  const currentQuestion = questions[activeIndex]

  // Handle option selection
  const handleSelectOption = useCallback(
    (ans) => {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: ans,
      }))
    },
    [currentQuestion],
  )

  // Navigation
  const goToQuestion = useCallback((idx) => {
    setActiveIndex(idx)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(questions.length - 1, i + 1))
  }, [questions.length])

  // Submit exam
  const handleSubmit = useCallback(() => {
    if (paused) return // shouldn't happen

    let correct = 0
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.ans) {
        correct++
      }
    })

    setExamScore(correct)
    setElapsedMs(timerRef.current?.getElapsedMs() || 0)
    setExamComplete(true)
    setPaused(true)
    clearSession()
  }, [questions, userAnswers, paused])

  // Keyboard shortcuts
  useEffect(() => {
    if (examComplete || showResumeDialog) return

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
        return

      const q = currentQuestion
      if (!q) return

      // Build available options
      const optKeys = ['option1', 'option2', 'option3', 'option4', 'option5']
      const availableOptions = []
      optKeys.forEach((key, i) => {
        if (q[key] && q[key] !== '') {
          availableOptions.push(i + 1)
        }
      })

      // Keys 1-5 for options (natural order, no shuffle)
      const keyNum = parseInt(e.key)
      if (keyNum >= 1 && keyNum <= availableOptions.length) {
        e.preventDefault()
        handleSelectOption(keyNum)
        return
      }

      // Left/Right arrows for navigation
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
        return
      }

      // Ctrl+Enter for submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        setShowConfirmSubmit(true)
        return
      }

      // Space or Enter for next question
      if ((e.code === 'Space' || e.code === 'Enter') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        goNext()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    currentQuestion,
    examComplete,
    showResumeDialog,
    handleSelectOption,
    goPrev,
    goNext,
  ])

  // If showing resume dialog
  if (showResumeDialog) {
    return (
      <div className="quiz-wrapper min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl">
          <CardContent className="p-8 text-center">
            <TriangleAlert className="w-12 h-12 mx-auto text-amber-500 mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Examen sin terminar
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Tenés un examen guardado. ¿Querés continuar o empezar uno nuevo?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-5 rounded-xl font-semibold"
                onClick={handleStartExam}
              >
                Continuar examen
              </Button>
              <Button
                className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-5 rounded-xl font-semibold"
                onClick={handleNewExam}
              >
                Empezar nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If exam is complete, show review
  if (examComplete) {
    return (
      <ExamReview
        questions={questions}
        userAnswers={userAnswers}
        score={examScore}
        total={questions.length}
        elapsedMs={elapsedMs}
        onBackToMenu={onBackToMenu || (() => window.location.reload())}
      />
    )
  }

  // Submit confirmation modal
  const SubmitConfirmModal = (
    <Modal open={showConfirmSubmit} onClose={() => setShowConfirmSubmit(false)}>
      <div className="text-center w-72 py-4">
        <TriangleAlert size={48} className="mx-auto text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          ¿Estás seguro?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Vas a entregar el examen con{' '}
          {Object.keys(userAnswers).length} de {questions.length} preguntas
          respondidas.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-5 rounded-xl font-semibold"
            onClick={() => setShowConfirmSubmit(false)}
          >
            Seguir respondiendo
          </Button>
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-5 rounded-xl font-semibold"
            onClick={() => {
              setShowConfirmSubmit(false)
              handleSubmit()
            }}
          >
            Entregar
          </Button>
        </div>
      </div>
    </Modal>
  )

  // Build option data
  const options = [
    { num: 1, text: currentQuestion?.option1 },
    { num: 2, text: currentQuestion?.option2 },
    { num: 3, text: currentQuestion?.option3 },
    { num: 4, text: currentQuestion?.option4 },
    { num: 5, text: currentQuestion?.option5 },
  ].filter((o) => o.text && o.text !== '')

  const progressPercent = ((activeIndex + 1) * 100) / questions.length
  const answeredCount = Object.keys(userAnswers).length

  return (
    <div className="quiz-wrapper min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {SubmitConfirmModal}

      {/* Desktop Layout - lg+: 3-column */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:min-h-screen">
        {/* Left sidebar: Question navigation grid */}
        <aside className="col-span-3 p-6 pt-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
          <div className="sticky top-20 space-y-6">
            <div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Navegación
              </span>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                {questions.length} preguntas
              </h2>
            </div>
            <Separator />
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined
                const isCurrent = idx === activeIndex
                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`
                      w-full aspect-square rounded-lg text-sm font-semibold transition-all duration-150
                      ${isCurrent ? 'ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-slate-800' : ''}
                      ${isAnswered ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60' : ''}
                      ${!isAnswered ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600' : ''}
                    `}
                    aria-label={`Ir a pregunta ${idx + 1}${isAnswered ? ' (respondida)' : ''}`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/40 inline-block" />
              <span>Respondida</span>
              <span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-700 inline-block ml-2" />
              <span>Sin responder</span>
            </div>
          </div>
        </aside>

        {/* Center: Main content */}
        <main className="col-span-6 p-4 lg:p-8 flex flex-col max-h-screen overflow-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pregunta {activeIndex + 1} de {questions.length}
              </span>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
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
              <div key={activeIndex} className="min-h-75 animate-slide-in">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="quiz-question-number">
                      Pregunta #{currentQuestion.id}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm text-slate-500">
                      {currentQuestion.tema}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </h2>

                  {/* Options in exam mode - no feedback, just selection */}
                  <ul className="space-y-3">
                    {options.map((opt) => {
                      const isSelected = userAnswers[currentQuestion.id] === opt.num
                      let optionClass =
                        'quiz-option w-full text-left'

                      if (isSelected) {
                        optionClass += ' exam-selected'
                      }

                      return (
                        <li key={`option-${activeIndex}-${opt.num}`}>
                          <button
                            type="button"
                            className={optionClass}
                            onClick={() => handleSelectOption(opt.num)}
                          >
                            <span className="quiz-option-letter">
                              {String.fromCharCode(96 + opt.num)}
                            </span>
                            {opt.text}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex gap-3">
              <Button
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-6 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={goPrev}
                disabled={activeIndex === 0}
              >
                <ArrowBigLeftDash className="mr-2" /> Anterior
              </Button>
              <Button
                className="flex-1 bg-sky-500 hover:bg-sky-600 dark:bg-sky-300 dark:text-slate-900 dark:hover:bg-sky-400 text-white px-6 py-6 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={goNext}
                disabled={activeIndex === questions.length - 1}
              >
                Siguiente <ArrowBigRightDash className="ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Keyboard shortcuts card */}
          <Card className="flex flex-col bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 rounded-xl mt-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex justify-center items-center gap-2 text-slate-800 dark:text-slate-200">
                <KeyboardIcon className="w-4 h-4" />
                Atajos de teclado
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1 flex-wrap justify-center">
                <span>Usa</span>
                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-sm">
                  1
                </kbd>
                <span> - </span>
                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-sm">
                  {options.length}
                </kbd>
                <span>para responder,</span>
                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-sm">
                  ←
                </kbd>
                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-sm">
                  →
                </kbd>
                <span>para navegar,</span>
                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-sm">
                  Ctrl+Enter
                </kbd>
                <span>para entregar.</span>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Right sidebar: Timer + submit */}
        <aside className="col-span-3 p-6 pt-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-l border-slate-200 dark:border-slate-700 overflow-y-auto">
          <div className="sticky top-20 space-y-6">
            {/* Timer */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm text-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Tiempo restante
              </span>
              <div className="mt-2">
                <ExamTimer
                  ref={timerRef}
                  startTime={startTime}
                  paused={paused}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Respondidas</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {answeredCount}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Faltan</span>
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {questions.length - answeredCount}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Total</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {questions.length}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setShowConfirmSubmit(true)}
            >
              Entregar examen
            </Button>
          </div>
        </aside>
      </div>

      {/* Tablet Layout - md to lg */}
      <div className="hidden md:block lg:hidden min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <ExamTimer
                  ref={timerRef}
                  startTime={startTime}
                  paused={paused}
                />
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {answeredCount}/{questions.length}
              </span>
            </div>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-4 py-2 text-sm font-semibold"
              onClick={() => setShowConfirmSubmit(true)}
            >
              Entregar
            </Button>
          </div>
          <Progress value={progressPercent} className="mt-3 h-1.5" />
        </header>

        {/* Question nav strip */}
        <div className="bg-white/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 py-3 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined
              const isCurrent = idx === activeIndex
              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`
                    w-8 h-8 rounded-lg text-xs font-semibold transition-all flex-shrink-0
                    ${isCurrent ? 'ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-slate-800' : ''}
                    ${isAnswered ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' : ''}
                    ${!isAnswered ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400' : ''}
                  `}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl">
            <CardContent className="p-6">
              <div key={activeIndex} className="min-h-[250px] animate-slide-in">
                <span className="quiz-question-number text-xs">
                  #{currentQuestion.id}
                </span>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {currentQuestion.question}
                </h2>
                <ul className="space-y-2">
                  {options.map((opt) => {
                    const isSelected =
                      userAnswers[currentQuestion.id] === opt.num
                    let optionClass = 'quiz-option w-full text-left'
                    if (isSelected) {
                      optionClass +=
                        ' exam-selected'
                    }
                    return (
                      <li key={`option-${activeIndex}-${opt.num}`}>
                        <button
                          type="button"
                          className={optionClass}
                          onClick={() => handleSelectOption(opt.num)}
                        >
                          <span className="quiz-option-letter">
                            {String.fromCharCode(96 + opt.num)}
                          </span>
                          {opt.text}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl"
                onClick={goPrev}
                disabled={activeIndex === 0}
              >
                <ArrowBigLeftDash /> Anterior
              </Button>
              <Button
                className="flex-1 bg-sky-500 hover:bg-sky-600 dark:bg-sky-300 dark:text-slate-900 rounded-xl"
                onClick={goNext}
                disabled={activeIndex === questions.length - 1}
              >
                Siguiente <ArrowBigRightDash />
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>

      {/* Mobile Layout - <md */}
      <div className="md:hidden flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold font-mono tabular-nums">
              <ExamTimer
                ref={timerRef}
                startTime={startTime}
                paused={paused}
              />
            </div>
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold"
              onClick={() => setShowConfirmSubmit(true)}
            >
              Entregar
            </Button>
          </div>
          <Progress value={progressPercent} className="mt-3 h-1.5" />
        </header>

        {/* Question nav strip */}
        <div className="bg-white/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined
              const isCurrent = idx === activeIndex
              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`
                    w-7 h-7 rounded text-xs font-semibold transition-all flex-shrink-0
                    ${isCurrent ? 'ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-slate-800' : ''}
                    ${isAnswered ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' : ''}
                    ${!isAnswered ? 'bg-slate-100 dark:bg-slate-700 text-slate-400' : ''}
                  `}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </div>

        <main className="flex-1 p-4 overflow-y-auto">
          <Card className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl border-0">
            <CardContent className="p-5">
              <div key={activeIndex} className="space-y-4 animate-slide-in">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="quiz-question-number">#{currentQuestion.id}</span>
                  <span>{currentQuestion.asignatura}</span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {currentQuestion.question}
                </h2>
                <ul className="space-y-2">
                  {options.map((opt) => {
                    const isSelected =
                      userAnswers[currentQuestion.id] === opt.num
                    let optionClass = 'quiz-option w-full text-left'
                    if (isSelected) {
                      optionClass +=
                        ' exam-selected'
                    }
                    return (
                      <li key={`option-${activeIndex}-${opt.num}`}>
                        <button
                          type="button"
                          className={optionClass}
                          onClick={() => handleSelectOption(opt.num)}
                        >
                          <span className="quiz-option-letter">
                            {String.fromCharCode(96 + opt.num)}
                          </span>
                          {opt.text}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex gap-2">
              <Button
                className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-4 rounded-xl font-semibold"
                onClick={goPrev}
                disabled={activeIndex === 0}
              >
                <ArrowBigLeftDash /> Anterior
              </Button>
              <Button
                className="flex-1 bg-sky-500 hover:bg-sky-600 dark:bg-sky-300 dark:text-slate-900 text-white py-4 rounded-xl font-semibold"
                onClick={goNext}
                disabled={activeIndex === questions.length - 1}
              >
                Siguiente <ArrowBigRightDash />
              </Button>
            </CardFooter>
          </Card>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between z-40 md:hidden">
          <span className="text-sm text-slate-500">
            {answeredCount}/{questions.length} respondidas
          </span>
          <span className="text-sm text-slate-500">
            {activeIndex + 1}/{questions.length}
          </span>
        </footer>
      </div>
    </div>
  )
}
