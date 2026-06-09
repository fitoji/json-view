import { CheckCircle, XCircle, MinusCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import ArrowBigRightDash from 'lucide-react/dist/esm/icons/arrow-big-right-dash'

export default function ExamReview({
  questions,
  userAnswers,
  score,
  total,
  elapsedMs,
  onBackToMenu,
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Score header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Resultado del Examen
          </h1>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-5xl font-bold text-emerald-500">{score}</span>
            <span className="text-2xl text-slate-400">/ {total}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
              ({total > 0 ? Math.round((score / total) * 100) : 0}%)
            </span>
          </div>
          <div className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            Tiempo:{' '}
            {String(Math.floor(elapsedMs / 60000)).padStart(2, '0')}:
            {String(Math.floor((elapsedMs % 60000) / 1000)).padStart(2, '0')}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAns = userAnswers[q.id]
            const isCorrect = userAns === q.ans
            const isUnanswered = userAns === undefined || userAns === null
            const isWrong = !isUnanswered && !isCorrect

            const options = [
              { num: 1, text: q.option1 },
              { num: 2, text: q.option2 },
              { num: 3, text: q.option3 },
              { num: 4, text: q.option4 },
              { num: 5, text: q.option5 },
            ].filter((o) => o.text && o.text !== '')

            return (
              <Card
                key={q.id}
                className={`
                  bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-md border rounded-2xl
                  ${isCorrect ? 'border-emerald-200 dark:border-emerald-800' : ''}
                  ${isWrong ? 'border-red-200 dark:border-red-800' : ''}
                  ${isUnanswered ? 'border-slate-200 dark:border-slate-700' : ''}
                `}
              >
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          #{q.id}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {q.tema}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect && (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      )}
                      {isWrong && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      {isUnanswered && (
                        <MinusCircle className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="ml-11 space-y-2">
                    {options.map((opt) => {
                      const isUserSelected = userAns === opt.num
                      const isCorrectAnswer = q.ans === opt.num

                      let optionClass =
                        'flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-sm md:text-base'

                      if (isCorrectAnswer) {
                        optionClass +=
                          ' border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                      } else if (isUserSelected && isWrong) {
                        optionClass +=
                          ' border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                      } else {
                        optionClass +=
                          ' border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }

                      return (
                        <div key={opt.num} className={optionClass}>
                          <span
                            className={`
                              flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold
                              ${isCorrectAnswer ? 'bg-emerald-400 text-white' : ''}
                              ${isUserSelected && isWrong ? 'bg-red-400 text-white' : ''}
                              ${!isCorrectAnswer && !(isUserSelected && isWrong) ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400' : ''}
                            `}
                          >
                            {String.fromCharCode(96 + opt.num)}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrectAnswer && (
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          )}
                          {isUserSelected && isWrong && (
                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                      )
                    })}

                    {/* Unanswered label */}
                    {isUnanswered && (
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm">
                        <MinusCircle className="w-4 h-4" />
                        <span className="font-medium">Sin responder</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Button
            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-6 rounded-xl font-semibold transition-all hover:scale-105"
            onClick={onBackToMenu}
          >
            <ArrowBigRightDash className="mr-2" /> Volver al menú
          </Button>
        </div>
      </div>
    </div>
  )
}
