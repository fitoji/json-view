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
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Score header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Resultado del Examen
          </h1>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border">
            <span className="text-5xl font-bold text-success">{score}</span>
            <span className="text-2xl text-muted-foreground">/ {total}</span>
            <span className="text-sm text-muted-foreground ml-2">
              ({total > 0 ? Math.round((score / total) * 100) : 0}%)
            </span>
          </div>
          <div className="mt-3 text-sm text-muted-foreground font-mono tabular-nums">
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
                  bg-card border rounded-2xl
                  ${isCorrect ? 'border-success/40' : ''}
                  ${isWrong ? 'border-destructive/40' : ''}
                  ${isUnanswered ? 'border-border' : ''}
                `}
              >
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          #{q.id}
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          {q.tema}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
                        {q.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect && (
                        <CheckCircle className="w-6 h-6 text-success" />
                      )}
                      {isWrong && (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                      {isUnanswered && (
                        <MinusCircle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="ml-11 space-y-2">
                    {options.map((opt) => {
                      const isUserSelected = userAns === opt.num
                      const isCorrectAnswer = q.ans === opt.num

                      let optionClass =
                        'flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors text-sm md:text-base'

                      if (isCorrectAnswer) {
                        optionClass +=
                          ' border-success bg-success/10 text-foreground'
                      } else if (isUserSelected && isWrong) {
                        optionClass +=
                          ' border-destructive bg-destructive/10 text-foreground'
                      } else {
                        optionClass +=
                          ' border-border bg-card text-card-foreground'
                      }

                      return (
                        <div key={opt.num} className={optionClass}>
                          <span
                            className={`
                              flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold
                              ${isCorrectAnswer ? 'bg-success text-success-foreground' : ''}
                              ${isUserSelected && isWrong ? 'bg-destructive text-destructive-foreground' : ''}
                              ${!isCorrectAnswer && !(isUserSelected && isWrong) ? 'bg-muted text-muted-foreground' : ''}
                            `}
                          >
                            {String.fromCharCode(96 + opt.num)}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrectAnswer && (
                            <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          )}
                          {isUserSelected && isWrong && (
                            <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                          )}
                        </div>
                      )
                    })}

                    {/* Unanswered label */}
                    {isUnanswered && (
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground text-sm">
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
            className="bg-primary text-primary-foreground px-8 py-6 rounded-xl font-semibold transition-colors hover:bg-primary/90"
            onClick={onBackToMenu}
          >
            <ArrowBigRightDash className="mr-2" /> Volver al menú
          </Button>
        </div>
      </div>
    </div>
  )
}
