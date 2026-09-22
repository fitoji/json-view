import { render } from '@testing-library/react'
import { ThemeProvider } from '../../components/providers/ThemeProvider'
import {
  THEME_FONTS,
  THEME_FONT_CATEGORIES,
  THEME_PRESETS,
  THEME_SCHEMA_VERSION,
  THEME_STORAGE_KEY,
  WEB_FONT_SPECS,
  createThemeState,
  getEffectiveStyleTokens,
  getEffectiveTokens,
  serializeThemeState,
  validateThemeImport,
} from '../../theme/themePresets'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
}))

// The 25 built-in tweakcn presets ported into THEME_PRESETS.
const PORTED_IDS = [
  'modern-minimal', 'violet-bloom', 't3-chat', 'mocha-mousse', 'amethyst-haze',
  'doom-64', 'kodama-grove', 'cosmic-night', 'quantum-rose', 'bold-tech',
  'elegant-luxury', 'amber-minimal', 'neo-brutalism', 'solar-dusk', 'pastel-dreams',
  'clean-slate', 'ocean-breeze', 'retro-arcade', 'midnight-bloom', 'northern-lights',
  'vintage-paper', 'sunset-horizon', 'starry-night', 'soft-pop', 'sage-garden',
]

const fontLinks = () => Array.from(document.head.querySelectorAll('link[data-theme-font]'))

describe('tweakcn preset port', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = 'light'
    document.documentElement.removeAttribute('style')
    fontLinks().forEach((link) => link.remove())
  })

  it('resolves every ported id through the validator and keeps 49 unique presets', () => {
    for (const id of PORTED_IDS) {
      const { state, error } = validateThemeImport(JSON.stringify({ version: THEME_SCHEMA_VERSION, presetId: id, overrides: {} }))
      expect(error, `presetId "${id}" rejected by the validator`).toBeNull()
      expect(state.presetId).toBe(id)
    }
    // 24 originals + 25 ports, and the port of doom-64 must not collide with doom64.
    expect(THEME_PRESETS).toHaveLength(49)
    expect(new Set(THEME_PRESETS.map((p) => p.id)).size).toBe(49)
  })

  it('preserves string-font behaviour exactly (verdant regression)', () => {
    const tokens = getEffectiveStyleTokens(createThemeState('verdant', {}))
    expect(tokens.sans).toBe('system')
    expect(tokens.serif).toBe('editorial')
    expect(tokens.mono).toBe('mono')
    // The mono-slot special case must survive the object normalisation too.
    const mono = getEffectiveStyleTokens(createThemeState('ocean', {}))
    expect(mono.sans).toBe('mono')
    expect(mono.serif).toBe('mono')
    expect(mono.mono).toBe('mono')
  })

  it('resolves per-slot object fonts from the preset declaration', () => {
    const tokens = getEffectiveStyleTokens(createThemeState('modern-minimal', {}))
    expect(tokens.sans).toBe('Inter')
    expect(tokens.serif).toBe('Source Serif 4')
    expect(tokens.mono).toBe('JetBrains Mono')
    expect(tokens.sansFamily).toBe(THEME_FONTS.Inter)
    // A user slot override still wins over the preset object form.
    const over = getEffectiveStyleTokens(createThemeState('modern-minimal', { serif: 'mono' }))
    expect(over.serif).toBe('mono')
    expect(over.sans).toBe('Inter')
  })

  it('renders an object-font preset: CSS vars and web-font link injection', () => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({ version: THEME_SCHEMA_VERSION, presetId: 'modern-minimal', overrides: {} }),
    )
    render(<ThemeProvider><span data-testid="child" /></ThemeProvider>)

    expect(document.documentElement.style.getPropertyValue('--theme-font-sans').startsWith('"Inter"')).toBe(true)
    expect(document.documentElement.style.getPropertyValue('--theme-font-serif').startsWith('"Source Serif 4"')).toBe(true)
    expect(document.querySelector('link[data-theme-font="JetBrains Mono"]')).not.toBeNull()
    // Colour fidelity reaches the live custom property verbatim.
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('#3b82f6')
  })

  it('carries preset letterSpacing with the documented resolution order', () => {
    // The one ported preset with tracking (violet-bloom, -0.025em) resolves it
    // with no user override; an override still wins; fieldless ports stay no-op.
    expect(getEffectiveStyleTokens(createThemeState('violet-bloom', {})).letterSpacing).toBe('-0.025em')
    expect(getEffectiveStyleTokens(createThemeState('violet-bloom', { letterSpacing: '0.02em' })).letterSpacing).toBe('0.02em')
    expect(getEffectiveStyleTokens(createThemeState('modern-minimal', {})).letterSpacing).toBe('0em')
    // Pre-existing string-font presets are untouched.
    expect(getEffectiveStyleTokens(createThemeState('verdant', {})).letterSpacing).toBe('0em')
  })

  it('ports colours verbatim for light and dark', () => {
    const minimal = THEME_PRESETS.find((p) => p.id === 'modern-minimal')
    expect(minimal.light.primary).toBe('#3b82f6')
    expect(getEffectiveTokens(createThemeState('modern-minimal', {}), 'light').primary).toBe('#3b82f6')
    const doom = THEME_PRESETS.find((p) => p.id === 'doom-64')
    expect(doom.dark.background).toBe('#1a1a1a')
    expect(getEffectiveTokens(createThemeState('doom-64', {}), 'dark').background).toBe('#1a1a1a')
    // Unported semantic pairs keep coming from the shared-token spread.
    expect(minimal.light.success).toBeTruthy()
    expect(minimal.dark.warningForeground).toBeTruthy()
  })

  it('registers the three new catalog families end to end', () => {
    expect(createThemeState('verdant', { sans: 'Antic' }).overrides.sans).toBe('Antic')
    expect(createThemeState('verdant', { sans: 'Quicksand' }).overrides.sans).toBe('Quicksand')
    expect(createThemeState('verdant', { mono: 'Ubuntu Mono' }).overrides.mono).toBe('Ubuntu Mono')
    expect(WEB_FONT_SPECS.Antic).toBe('Antic')
    expect(WEB_FONT_SPECS.Quicksand).toBe('Quicksand:wght@300..700')
    expect(WEB_FONT_SPECS['Ubuntu Mono']).toBe('Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700')
    expect(THEME_FONT_CATEGORIES.sans).toContain('Antic')
    expect(THEME_FONT_CATEGORIES.sans).toContain('Quicksand')
    expect(THEME_FONT_CATEGORIES.mono).toContain('Ubuntu Mono')
  })

  it('round-trips a v3 document on a ported presetId', () => {
    const first = validateThemeImport(JSON.stringify({ version: 3, presetId: 'retro-arcade', overrides: { sans: 'Space Mono' } }))
    expect(first.error).toBeNull()
    const second = validateThemeImport(serializeThemeState(first.state))
    expect(second.error).toBeNull()
    expect(second.state).toEqual(first.state)
    expect(second.state.presetId).toBe('retro-arcade')
    expect(second.state.overrides.sans).toBe('Space Mono')
  })
})
