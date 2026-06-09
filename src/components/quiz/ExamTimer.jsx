import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const ExamTimer = forwardRef(({ startTime, paused }, ref) => {
  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    if (paused) return

    const tick = () => {
      const elapsed = Date.now() - startTime
      setElapsedMs(Math.max(0, elapsed))
    }

    tick() // initial call
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [startTime, paused])

  useImperativeHandle(ref, () => ({
    getElapsedMs: () => elapsedMs,
  }))

  const minutes = Math.floor(elapsedMs / 60000)
  const seconds = Math.floor((elapsedMs % 60000) / 1000)

  return (
    <div className="font-bold font-mono tracking-wider tabular-nums text-xl md:text-2xl text-slate-700 dark:text-slate-300">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
})

ExamTimer.displayName = 'ExamTimer'

export { ExamTimer }
