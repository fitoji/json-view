import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700"
        aria-label="Cambiar tema"
      >
        <span className="w-5 h-5 block" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="shadow-md w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-amber-200 text-white transition-colors"
      aria-label={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  )
}
