import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeCustomizer } from '../../components/ui/ThemeCustomizer'
import { ThemeProvider, useThemeCustomization } from '../../components/providers/ThemeProvider'
import {
  DEFAULT_THEME_ID,
  THEME_FONTS,
  THEME_LEGACY_STORAGE_KEYS,
  contrastRatio,
  createThemeState,
  foregroundFor,
  getEffectiveTokens,
  getEffectiveStyleTokens,
  isSafeLetterSpacing,
  isSafeSpacing,
  migrateThemeState,
  normalizeThemeColor,
  parseThemeColor,
  parseThemeState,
  THEME_PRESETS,
  THEME_SCHEMA_VERSION,
  THEME_STORAGE_KEY,
  serializeThemeState,
  validateThemeImport,
} from '../../theme/themePresets'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
}))

function Harness() {
  const { themeState, selectPreset, updateOverrides, resetTheme } = useThemeCustomization()
  return (
    <div>
      <output data-testid="preset">{themeState.presetId}</output>
      <output data-testid="primary">{themeState.overrides.primary}</output>
      <button onClick={() => selectPreset('ocean')}>Ocean</button>
      <button onClick={() => updateOverrides({ primary: '12 80% 55%', radius: '1rem' })}>Customize</button>
      <button onClick={() => updateOverrides({ sans: 'editorial', shadow: 'none' })}>SansSerif</button>
      <button onClick={() => updateOverrides({ mono: 'system' })}>SetMono</button>
      <button onClick={resetTheme}>Reset</button>
    </div>
  )
}

describe('theme customization', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = 'light'
    document.documentElement.removeAttribute('style')
  })

  it('recovers malformed or incompatible persistence to the default preset', () => {
    expect(parseThemeState('{not-json').presetId).toBe(DEFAULT_THEME_ID)
    expect(parseThemeState(JSON.stringify({ version: 99, presetId: 'ocean' })).presetId).toBe(DEFAULT_THEME_ID)
  })

  // ── COLOR-008: read-time pickup of the shipped legacy storage key ─────────────
  describe('legacy storage pickup', () => {
    it('boots from a v1 document under the legacy key and rewrites the v3 key', () => {
      localStorage.setItem(
        THEME_LEGACY_STORAGE_KEYS[0],
        JSON.stringify({
          version: 1,
          presetId: 'ocean',
          overrides: { primary: '12 80% 55%', accent: '220 80% 18%', radius: '1rem', font: 'editorial', shadow: 'soft' },
        }),
      )

      render(<ThemeProvider><Harness /></ThemeProvider>)

      expect(screen.getByTestId('preset')).toHaveTextContent('ocean')
      // Channel triple migrated to a complete CSS colour
      expect(screen.getByTestId('primary')).toHaveTextContent('hsl(12 80% 55%)')

      const persisted = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY))
      expect(persisted.version).toBe(THEME_SCHEMA_VERSION)
      expect(persisted.presetId).toBe('ocean')
      // v1 overrides.font carried into v3 overrides.sans
      expect(persisted.overrides.sans).toBe('editorial')
      expect(persisted.overrides.primary).toBe('hsl(12 80% 55%)')

      // Legacy key is left in place: removing it would destroy the theme for a
      // rollback to a v1-reading build.
      expect(localStorage.getItem(THEME_LEGACY_STORAGE_KEYS[0])).toBeTruthy()
    })

    it('recovers a valid legacy theme when the v3 key is corrupted', () => {
      localStorage.setItem(THEME_STORAGE_KEY, '{not-json')
      localStorage.setItem(
        THEME_LEGACY_STORAGE_KEYS[0],
        JSON.stringify({ version: 1, presetId: 'sunset', overrides: { font: 'mono', shadow: 'crisp' } }),
      )

      render(<ThemeProvider><Harness /></ThemeProvider>)

      expect(screen.getByTestId('preset')).toHaveTextContent('sunset')
      const persisted = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY))
      expect(persisted.version).toBe(THEME_SCHEMA_VERSION)
      expect(persisted.overrides.sans).toBe('mono')
    })

    it('falls back to the default state on corrupted legacy data, without throwing', () => {
      localStorage.setItem(THEME_LEGACY_STORAGE_KEYS[0], '{not-json')

      render(<ThemeProvider><Harness /></ThemeProvider>)

      expect(screen.getByTestId('preset')).toHaveTextContent(DEFAULT_THEME_ID)
      // Whatever the mount effect persisted is a clean, valid v3 default — the
      // corrupted document is rejected, never sanitised into acceptability.
      expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY))).toEqual(createThemeState())
    })

    it('returns the default state when nothing is stored at all', () => {
      render(<ThemeProvider><Harness /></ThemeProvider>)

      expect(screen.getByTestId('preset')).toHaveTextContent(DEFAULT_THEME_ID)
      expect(screen.getByTestId('primary')).toBeEmptyDOMElement()
    })
  })

  it('provides semantic success and warning tokens for every theme mode', () => {
    THEME_PRESETS.forEach((preset) => {
      for (const mode of ['light', 'dark']) {
        const tokens = getEffectiveTokens({ presetId: preset.id, overrides: {} }, mode)
        expect(tokens.success).toBeTruthy()
        expect(tokens.successForeground).toBeTruthy()
        expect(tokens.warning).toBeTruthy()
        expect(tokens.warningForeground).toBeTruthy()
      }
    })
  })

  it('chooses the higher-contrast foreground for light and dark custom colors', () => {
    const lightColor = '45 100% 85%'
    const darkColor = '220 80% 18%'

    expect(foregroundFor(lightColor)).toBe('hsl(222.2 47.4% 11.2%)')
    expect(foregroundFor(darkColor)).toBe('hsl(0 0% 100%)')
    expect(contrastRatio(lightColor, foregroundFor(lightColor))).toBeGreaterThan(4.5)
    expect(contrastRatio(darkColor, foregroundFor(darkColor))).toBeGreaterThan(4.5)
  })

  it('applies allowlisted font and shadow tokens and round-trips them', () => {
    const imported = validateThemeImport(serializeThemeState({ presetId: 'ocean', overrides: { sans: 'editorial', serif: 'mono', mono: 'system', shadow: 'none' } }))
    expect(imported.error).toBeNull()
    expect(imported.state.overrides).toMatchObject({ sans: 'editorial', serif: 'mono', mono: 'system', shadow: 'none' })
  })

  it('rejects malformed, unknown, and oversized import values', () => {
    // Validation is all-or-nothing for every supported schema version: a document that
    // is invalid for its own version is rejected, never sanitised into acceptability.
    // That keeps migration compatibility without widening what can reach setProperty.
    const rejects = (doc) => validateThemeImport(JSON.stringify(doc)).state

    expect(rejects({ version: 1, presetId: 'ocean', overrides: { font: 'url(evil)' } })).toBeNull()
    expect(rejects({ version: 1, presetId: 'ocean', overrides: { unknown: 'value' } })).toBeNull()
    expect(rejects({ version: 1, presetId: 'ocean', overrides: { sans: 'mono' } })).toBeNull()
    expect(rejects({ version: 2, presetId: 'ocean', overrides: { sans: 'url(evil)' } })).toBeNull()
    expect(rejects({ version: 2, presetId: 'ocean', overrides: { unknown: 'value' } })).toBeNull()
    expect(rejects({ version: 2, presetId: 'ocean', overrides: { font: 'mono' } })).toBeNull()
    expect(rejects({ version: 3, presetId: 'ocean', overrides: { primary: '#fff;} body{display:none' } })).toBeNull()
    expect(rejects({ version: 3, presetId: 'nope', overrides: {} })).toBeNull()
    expect(rejects({ version: 4, presetId: 'ocean', overrides: {} })).toBeNull()
    expect(validateThemeImport(`{"version":2,"presetId":"ocean","overrides":{"radius":"${'x'.repeat(129)}"}}`).state).toBeNull()

    // A complete colour inside a v2 document is legal input, not a rejection: v2
    // accepts legacy channel triples and complete colours alike.
    const v2 = validateThemeImport(JSON.stringify({ version: 2, presetId: 'ocean', overrides: { primary: 'hsl(199 89% 40%)' } }))
    expect(v2.state.overrides.primary).toBe('hsl(199 89% 40%)')
  })

  it('selects presets, applies tokens, persists, and resets overrides', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)

    await act(async () => screen.getByRole('button', { name: 'Ocean' }).click())
    expect(screen.getByTestId('preset')).toHaveTextContent('ocean')
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('hsl(199 89% 40%)')
    expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY)).presetId).toBe('ocean')

    await act(async () => screen.getByRole('button', { name: 'Customize' }).click())
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('hsl(12 80% 55%)')
    expect(screen.getByTestId('primary')).toHaveTextContent('hsl(12 80% 55%)')

    await act(async () => screen.getByRole('button', { name: 'Reset' }).click())
    expect(screen.getByTestId('primary')).toBeEmptyDOMElement()
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('hsl(199 89% 40%)')
  })

  it('applies the selected font and shadow CSS variables live', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)
    const tokens = getEffectiveStyleTokens({ presetId: 'verdant', overrides: {} })
    expect(tokens.sans).toBe('system')
    expect(tokens.serif).toBe('editorial')
    expect(tokens.mono).toBe('mono')
    await act(async () => screen.getByRole('button', { name: 'SansSerif' }).click())
    expect(document.documentElement.style.getPropertyValue('--theme-font-sans')).toContain('Georgia')
    expect(document.documentElement.style.getPropertyValue('--theme-shadow')).toBe('none')
  })

  // FONTS-005: font-slot-specific tests
  describe('three font slots', () => {
    it('resolves default slot values for a system preset', () => {
      const state = createThemeState('verdant', {})
      const tokens = getEffectiveStyleTokens(state)
      expect(tokens.sans).toBe('system')
      expect(tokens.serif).toBe('editorial')
      expect(tokens.mono).toBe('mono')
      expect(tokens.sansFamily).toBe(THEME_FONTS.system)
      expect(tokens.serifFamily).toBe(THEME_FONTS.editorial)
      expect(tokens.monoFamily).toBe(THEME_FONTS.mono)
    })

    it('resolves default slot values for a mono preset (font: mono)', () => {
      const state = createThemeState('ocean', {})
      const tokens = getEffectiveStyleTokens(state)
      expect(tokens.sans).toBe('mono')
      expect(tokens.serif).toBe('mono')
      expect(tokens.mono).toBe('mono')
    })

    it('resolves default slot values for an editorial preset (font: editorial)', () => {
      const state = createThemeState('sunset', {})
      const tokens = getEffectiveStyleTokens(state)
      expect(tokens.sans).toBe('editorial')
      expect(tokens.serif).toBe('editorial')
      expect(tokens.mono).toBe('mono')
    })

    it('overrides a single slot without disturbing the others', () => {
      const base = getEffectiveStyleTokens(createThemeState('verdant', {}))
      const over = getEffectiveStyleTokens(createThemeState('verdant', { mono: 'system' }))
      expect(over.sans).toBe(base.sans)
      expect(over.serif).toBe(base.serif)
      expect(over.mono).toBe('system')
    })

    it('migrates v1 overrides.font into v2 sans', () => {
      const migrated = migrateThemeState({ version: 1, presetId: 'ocean', overrides: { font: 'editorial' } })
      expect(migrated.overrides.sans).toBe('editorial')
      expect(migrated.overrides.serif).toBeNull()
      expect(migrated.overrides.mono).toBeNull()
      expect(migrated.overrides.shadow).toBeNull()
    })

    it('accepts a v1 JSON document via validateThemeImport', () => {
      const v1json = JSON.stringify({ version: 1, presetId: 'sunset', overrides: { font: 'editorial', shadow: 'soft' } })
      const result = validateThemeImport(v1json)
      expect(result.error).toBeNull()
      expect(result.state.overrides.sans).toBe('editorial')
      expect(result.state.overrides.shadow).toBe('soft')
    })

    it('writes all three --theme-font-* properties when applyTokens runs', async () => {
      render(<ThemeProvider><Harness /></ThemeProvider>)
      // Default verdant: sans=system, serif=editorial, mono=mono
      expect(document.documentElement.style.getPropertyValue('--theme-font-sans')).toBe(THEME_FONTS.system)
      expect(document.documentElement.style.getPropertyValue('--theme-font-serif')).toBe(THEME_FONTS.editorial)
      expect(document.documentElement.style.getPropertyValue('--theme-font-mono')).toBe(THEME_FONTS.mono)
      // Override mono -> system; sans and serif must stay unchanged
      await act(async () => screen.getByRole('button', { name: 'SetMono' }).click())
      expect(document.documentElement.style.getPropertyValue('--theme-font-sans')).toBe(THEME_FONTS.system)
      expect(document.documentElement.style.getPropertyValue('--theme-font-serif')).toBe(THEME_FONTS.editorial)
      expect(document.documentElement.style.getPropertyValue('--theme-font-mono')).toBe(THEME_FONTS.system)
    })
  })

  it('keeps independent dark tokens when next-themes switches class', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)
    expect(getEffectiveTokens({ presetId: 'ocean', overrides: {} }, 'dark').background).toBe('hsl(213 48% 10%)')

    await act(async () => screen.getByRole('button', { name: 'Ocean' }).click())
    await act(async () => document.documentElement.classList.replace('light', 'dark'))
    expect(document.documentElement.style.getPropertyValue('--background')).toBe('hsl(213 48% 10%)')
  })

  // ── COLOR-006: oklch round-trip export → import ─────────────────────────────
  it('survives an oklch export → import round-trip', () => {
    const oklchPrimary = 'oklch(0.59 0.306 325.4)'
    const state = createThemeState('verdant', { primary: oklchPrimary })
    const json = serializeThemeState(state)
    const { state: imported } = validateThemeImport(json)
    expect(imported.overrides.primary).toBe(oklchPrimary)
  })

  // ── Defect 1: parseThemeColor must never throw ────────────────────────────────
  describe('parseThemeColor total function', () => {
    it('returns null (never throws) for hsl without percent signs', () => {
      expect(() => parseThemeColor('hsl(210 40 98)')).not.toThrow()
      expect(parseThemeColor('hsl(210 40 98)')).toBeNull()
    })

    it('contrastRatio returns 1 for malformed hsl without percent signs', () => {
      expect(contrastRatio('hsl(210 40 98)', '#fff')).toBe(1)
    })

    it('foregroundFor returns a default for malformed hsl without percent signs', () => {
      const result = foregroundFor('hsl(210 40 98)')
      expect(result).toMatch(/^hsl\(0 0% \d+(\.)?\d*%\)$/)
    })
  })

  // ── Defect 2: normalizeThemeColor is the strict gate ────────────────────────
  describe('normalizeThemeColor injection rejection', () => {
    it('rejects hex injection', () => {
      expect(normalizeThemeColor('#fff;} body{display:none')).toBeNull()
    })

    it('rejects oklch injection', () => {
      expect(normalizeThemeColor('oklch(0.99 0 0); }')).toBeNull()
    })

    it('preserves valid oklch verbatim', () => {
      expect(normalizeThemeColor('oklch(0.99 0 0)')).toBe('oklch(0.99 0 0)')
    })

    it('lowercases uppercase hex', () => {
      expect(normalizeThemeColor('#FFFFFF')).toBe('#ffffff')
    })

    it('rejects url injection', () => {
      expect(normalizeThemeColor('url(evil)')).toBeNull()
    })

    it('accepts modern slash-alpha hsl syntax', () => {
      expect(normalizeThemeColor('hsl(0 0% 100% / 0.5)')).toBe('hsl(0 0% 100% / 0.5)')
    })
  })

  describe('complete-colour format guarantees', () => {
    it('keeps every authored preset token a complete CSS colour', () => {
      // The stored format IS the CSS value now, so a bare channel triple left in an
      // authored preset would surface as an invalid declaration at the point of use.
      const offenders = []
      for (const preset of THEME_PRESETS) {
        for (const mode of ['light', 'dark']) {
          for (const [key, value] of Object.entries(preset[mode])) {
            if (typeof value !== 'string' || key === 'radius' || key === 'shadow') continue
            if (normalizeThemeColor(value) === null) offenders.push(`${preset.id}.${mode}.${key}: ${value}`)
          }
        }
      }
      expect(offenders).toEqual([])
    })

    it('renders preset swatches with a usable background colour', async () => {
      // A swatch with no background means a consumer re-wrapped a stored complete
      // colour: `hsl(hsl(160 84% 39%))` is invalid CSS, so the browser drops the
      // declaration. jsdom drops it the same way, which turns the check into an
      // assertion instead of a screenshot.
      render(
        <ThemeProvider>
          <ThemeCustomizer />
        </ThemeProvider>,
      )
      await userEvent.click(screen.getByRole('button', { name: 'Abrir estudio de temas' }))

      const swatches = Array.from(document.querySelectorAll('[aria-pressed] span')).filter(
        (span) => span.hasAttribute('style'),
      )
      expect(swatches).toHaveLength(THEME_PRESETS.length * 2)
      for (const swatch of swatches) {
        expect(swatch.style.backgroundColor).not.toBe('')
      }
    })
  })

  // ── Spacing & letter-spacing style tokens ───────────────────────────────────
  it('accepts bounded spacing and letterSpacing overrides and applies them', () => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({
        version: 3,
        presetId: 'ocean',
        overrides: { spacing: '0.24rem', letterSpacing: '0.03em' },
      }),
    )

    render(<ThemeProvider><Harness /></ThemeProvider>)

    expect(document.documentElement.style.getPropertyValue('--spacing')).toBe('0.24rem')
    expect(document.documentElement.style.getPropertyValue('--theme-letter-spacing')).toBe('0.03em')

    // Persisted state round-trips the new keys intact
    const persisted = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY))
    expect(persisted.overrides.spacing).toBe('0.24rem')
    expect(persisted.overrides.letterSpacing).toBe('0.03em')
  })

  it('rejects out-of-range spacing and letterSpacing', () => {
    expect(isSafeSpacing('0.21rem')).toBe(false)
    expect(isSafeSpacing('0.29rem')).toBe(false)
    expect(isSafeSpacing('0.15rem')).toBe(false)
    expect(isSafeSpacing('0.25rem')).toBe(true)
    expect(isSafeLetterSpacing('-0.1em')).toBe(false)
    expect(isSafeLetterSpacing('0.1em')).toBe(false)
    expect(isSafeLetterSpacing('normal')).toBe(false)
    expect(isSafeLetterSpacing('1px')).toBe(false)
    expect(isSafeLetterSpacing('0em')).toBe(true)
    expect(isSafeLetterSpacing('-0.02em')).toBe(true)
    expect(isSafeLetterSpacing('0.04em')).toBe(true)
  })

  it('v3 document with new keys passes validation; legacy v1/v2 migration still works', () => {
    const result = validateThemeImport(
      JSON.stringify({
        version: 3,
        presetId: 'ocean',
        overrides: { spacing: '0.27rem', letterSpacing: '0.03em' },
      }),
    )
    expect(result.error).toBeNull()
    expect(result.state.overrides.spacing).toBe('0.27rem')
    expect(result.state.overrides.letterSpacing).toBe('0.03em')

    // Existing v1 document (no new keys) still migrates; the new keys normalize to null
    const v1 = validateThemeImport(
      JSON.stringify({ version: 1, presetId: 'ocean', overrides: { font: 'editorial', shadow: 'soft' } }),
    )
    expect(v1.error).toBeNull()
    expect(v1.state.overrides.sans).toBe('editorial')
    expect(v1.state.overrides.spacing).toBeNull()
    expect(v1.state.overrides.letterSpacing).toBeNull()

    // Same for v2 documents
    const v2 = validateThemeImport(
      JSON.stringify({ version: 2, presetId: 'ocean', overrides: { primary: 'hsl(12 80% 55%)', shadow: 'crisp' } }),
    )
    expect(v2.error).toBeNull()
    expect(v2.state.overrides.spacing).toBeNull()
    expect(v2.state.overrides.letterSpacing).toBeNull()
  })

  it('default rendering is unchanged', () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)

    // Defaults are no-ops: Tailwind v4 --spacing and a zero tracking offset
    expect(document.documentElement.style.getPropertyValue('--spacing')).toBe('0.25rem')
    expect(document.documentElement.style.getPropertyValue('--theme-letter-spacing')).toBe('0em')

    const tokens = getEffectiveStyleTokens(createThemeState())
    expect(tokens.spacing).toBe('0.25rem')
    expect(tokens.letterSpacing).toBe('0em')
  })
})
