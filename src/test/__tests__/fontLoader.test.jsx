import { render } from '@testing-library/react'
import { ThemeProvider } from '../../components/providers/ThemeProvider'
import { ensureWebFont, ensureWebFonts } from '../../theme/fontLoader'
import {
  DEFAULT_THEME_ID,
  THEME_FONTS,
  THEME_FONT_CATEGORIES,
  THEME_SCHEMA_VERSION,
  THEME_STORAGE_KEY,
  WEB_FONT_SPECS,
  createThemeState,
  serializeThemeState,
  validateThemeImport,
} from '../../theme/themePresets'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
}))

// The local stacks have no WEB_FONT_SPECS entry by design.
const LEGACY_FONT_KEYS = ['system', 'editorial', 'mono']
const INTER_HREF = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'

const fontLinks = () => Array.from(document.head.querySelectorAll('link[data-theme-font]'))

describe('fontLoader', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('style')
    fontLinks().forEach((link) => link.remove())
  })

  it('injects one link with the exact allowlisted href and dedups repeat calls', () => {
    ensureWebFonts(['Inter'])
    expect(fontLinks()).toHaveLength(1)
    expect(fontLinks()[0].href).toBe(INTER_HREF)
    expect(fontLinks()[0].rel).toBe('stylesheet')

    ensureWebFonts(['Inter'])
    expect(fontLinks()).toHaveLength(1)
  })

  it('never injects for the local stacks, which carry no spec', () => {
    LEGACY_FONT_KEYS.forEach((key) => ensureWebFonts([key]))
    expect(fontLinks()).toHaveLength(0)
  })

  it('rejects hostile or unknown keys outside the closed allowlist', () => {
    ensureWebFonts(['<script>'])
    ensureWebFonts(['https://evil.example'])
    ensureWebFonts(['Inter:wght@400&family=Evil'])
    ensureWebFonts([null])
    ensureWebFonts([42])
    ensureWebFonts([{}])
    ensureWebFont(undefined)
    // Prototype keys must not resolve through the allowlist check either.
    ensureWebFont('constructor')
    expect(fontLinks()).toHaveLength(0)
    expect(document.querySelector('link[href*="evil"]')).toBeNull()
    expect(document.querySelector('link[href*="script"]')).toBeNull()
  })

  it('dedups against a static preload link carrying the same data-theme-font', () => {
    const staticLink = document.createElement('link')
    staticLink.rel = 'stylesheet'
    staticLink.href = 'whatever'
    staticLink.dataset.themeFont = 'Inter'
    document.head.appendChild(staticLink)

    ensureWebFonts(['Inter'])

    // The static link satisfied the check: no new element was appended, and the
    // preloaded one is left untouched.
    expect(fontLinks()).toHaveLength(1)
    expect(fontLinks()[0]).toBe(staticLink)
  })

  it('ThemeProvider applies a web font from storage and loads its stylesheet', () => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({
        version: THEME_SCHEMA_VERSION,
        presetId: DEFAULT_THEME_ID,
        overrides: { sans: 'JetBrains Mono' },
      }),
    )

    render(<ThemeProvider><span data-testid="child" /></ThemeProvider>)

    expect(document.documentElement.style.getPropertyValue('--theme-font-sans')).toBe(THEME_FONTS['JetBrains Mono'])
    expect(document.querySelector('link[data-theme-font="JetBrains Mono"]')).not.toBeNull()
  })

  it('keeps the catalog consistent across THEME_FONTS, WEB_FONT_SPECS, and categories', () => {
    for (const [family, spec] of Object.entries(WEB_FONT_SPECS)) {
      expect(THEME_FONTS[family], `WEB_FONT_SPECS key "${family}" missing from THEME_FONTS`).toBeTruthy()
      expect(typeof spec).toBe('string')
      expect(spec.startsWith(`${family.replace(/ /g, '+')}:`) || spec === family.replace(/ /g, '+')).toBe(true)
    }
    for (const list of Object.values(THEME_FONT_CATEGORIES)) {
      for (const key of list) {
        expect(THEME_FONTS[key], `category key "${key}" missing from THEME_FONTS`).toBeTruthy()
        if (LEGACY_FONT_KEYS.includes(key)) {
          expect(Object.hasOwn(WEB_FONT_SPECS, key), `legacy key "${key}" must not have a spec`).toBe(false)
        } else {
          expect(Object.hasOwn(WEB_FONT_SPECS, key), `Google font "${key}" has no WEB_FONT_SPECS entry`).toBe(true)
        }
      }
    }
    // The Google names across the category lists are exactly the WEB_FONT_SPECS keys.
    const googleListed = Object.values(THEME_FONT_CATEGORIES).flat().filter((key) => !LEGACY_FONT_KEYS.includes(key))
    expect([...new Set(googleListed)].sort()).toEqual(Object.keys(WEB_FONT_SPECS).sort())
  })

  it('validates web font keys through theme state and the import round-trip', () => {
    expect(createThemeState(DEFAULT_THEME_ID, { sans: 'Inter' }).overrides.sans).toBe('Inter')

    const imported = validateThemeImport(
      JSON.stringify({ version: 3, presetId: 'ocean', overrides: { sans: 'Fira Code' } }),
    )
    expect(imported.error).toBeNull()
    expect(imported.state.overrides.sans).toBe('Fira Code')
    expect(JSON.parse(serializeThemeState(imported.state)).overrides.sans).toBe('Fira Code')
  })
})
