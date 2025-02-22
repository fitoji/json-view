import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Card, CardContent } from "./ui/card"

const Temporizador = forwardRef(({ isRunning, setIsRunning }, ref) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isRunning && interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
    localStorage.setItem('tiempoGuardado', time.toString())
  }

  const handleResetTemp = () => {
    setTime(0) // Reinicia el tiempo a 0
    setIsRunning(true)
    //console.log("reseteo temporizador")
  }

  // Exponer la función handleResetTemp
  useImperativeHandle(ref, () => ({
    handleResetTemp,
    getTime: () => formatTime(time), 
  }));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
    hover:bg-gradient-to-br">
      <CardContent className="flex flex-col items-center space-y-1 p-3">
        <div className="text-xl md:text-2xl text-slate-700 font-bold" >
          {formatTime(time)}
        </div>
      </CardContent>
    </Card>
  )
});

export default Temporizador;