import Moon from 'lucide-react/dist/esm/icons/moon'
import Sun from 'lucide-react/dist/esm/icons/sun'
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
        id="driver-step-darkmode"
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground text-secondary-foreground"
        aria-label="Cambiar tema"
      >
        <span className="w-5 h-5 block" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  const handleThemeChange = (event) => {
    const nextTheme = isDark ? 'light' : 'dark'
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (
      prefersReducedMotion ||
      typeof document.startViewTransition !== 'function'
    ) {
      setTheme(nextTheme)
      return
    }

    const root = document.documentElement
    root.style.setProperty('--theme-transition-x', `${event.clientX}px`)
    root.style.setProperty('--theme-transition-y', `${event.clientY}px`)

    document.startViewTransition(() => setTheme(nextTheme))
  }

  return (
    <button
      id="driver-step-darkmode"
      onClick={handleThemeChange}
      className="shadow-md w-10 h-10 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground text-secondary-foreground transition-colors"
      aria-label={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-primary" />
      )}
    </button>
  )
}
