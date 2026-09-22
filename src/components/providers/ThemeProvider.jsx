"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {
  createThemeState,
  getEffectiveTokens,
  getEffectiveStyleTokens,
  parseThemeState,
  serializeThemeState,
  THEME_PRESETS,
  THEME_STORAGE_KEY,
} from "@/theme/themePresets"

const ThemeCustomizationContext = React.createContext(null)

function readThemeState() {
  try {
    return parseThemeState(window.localStorage.getItem(THEME_STORAGE_KEY) || '')
  } catch {
    return createThemeState()
  }
}

function applyTokens(state) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const lightTokens = getEffectiveTokens(state, 'light')
  const darkTokens = getEffectiveTokens(state, 'dark')
  const styleTokens = getEffectiveStyleTokens(state)

  Object.entries(lightTokens).forEach(([name, value]) => root.style.setProperty(`--${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value))
  root.style.setProperty('--radius', state.overrides.radius || THEME_PRESETS.find((preset) => preset.id === state.presetId)?.radius || '0.65rem')
  root.style.setProperty('--font-family', styleTokens.fontFamily)
  root.style.setProperty('--theme-shadow', styleTokens.shadowValue)

  Object.entries(darkTokens).forEach(([name, value]) => root.style.setProperty(`--theme-dark-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value))
}

function ThemeCustomizationProvider({ children }) {
  const [themeState, setThemeState] = React.useState(readThemeState)

  React.useEffect(() => {
    applyTokens(themeState)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, serializeThemeState(themeState))
    } catch {
      // Private browsing and blocked storage should not prevent live theming.
    }
  }, [themeState])

  React.useEffect(() => {
    const root = document.documentElement
    const syncModeTokens = () => {
      const mode = root.classList.contains('dark') ? 'dark' : 'light'
      const tokens = getEffectiveTokens(themeState, mode)
      Object.entries(tokens).forEach(([name, value]) => root.style.setProperty(`--${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value))
    }
    syncModeTokens()
    const observer = new MutationObserver(syncModeTokens)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [themeState])

  const value = React.useMemo(() => ({
    themeState,
    presets: THEME_PRESETS,
    selectPreset: (presetId) => setThemeState(createThemeState(presetId)),
    updateOverrides: (overrides) => setThemeState((current) => createThemeState(current.presetId, { ...current.overrides, ...overrides })),
    resetTheme: () => setThemeState((current) => createThemeState(current.presetId)),
  }), [themeState])

  return <ThemeCustomizationContext.Provider value={value}>{children}</ThemeCustomizationContext.Provider>
}

export function useThemeCustomization() {
  const context = React.useContext(ThemeCustomizationContext)
  if (!context) throw new Error('useThemeCustomization must be used within ThemeProvider')
  return context
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      enableSystem={false}
      {...props}
    >
      <ThemeCustomizationProvider>{children}</ThemeCustomizationProvider>
    </NextThemesProvider>
  )
}
