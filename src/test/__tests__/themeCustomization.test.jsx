import { act, render, screen } from '@testing-library/react'
import { ThemeProvider, useThemeCustomization } from '../../components/providers/ThemeProvider'
import {
  DEFAULT_THEME_ID,
  contrastRatio,
  foregroundFor,
  getEffectiveTokens,
  getEffectiveStyleTokens,
  parseThemeState,
  THEME_PRESETS,
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
      <button onClick={() => updateOverrides({ font: 'editorial', shadow: 'none' })}>Typography</button>
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

    expect(foregroundFor(lightColor)).toBe('222.2 47.4% 11.2%')
    expect(foregroundFor(darkColor)).toBe('0 0% 100%')
    expect(contrastRatio(lightColor, foregroundFor(lightColor))).toBeGreaterThan(4.5)
    expect(contrastRatio(darkColor, foregroundFor(darkColor))).toBeGreaterThan(4.5)
  })

  it('applies allowlisted font and shadow tokens and round-trips them', () => {
    const imported = validateThemeImport(serializeThemeState({ presetId: 'ocean', overrides: { font: 'editorial', shadow: 'none' } }))
    expect(imported.error).toBeNull()
    expect(imported.state.overrides).toMatchObject({ font: 'editorial', shadow: 'none' })
  })

  it('rejects malformed, unknown, and oversized import values', () => {
    expect(validateThemeImport(JSON.stringify({ version: 1, presetId: 'ocean', overrides: { font: 'url(evil)' } })).state).toBeNull()
    expect(validateThemeImport(JSON.stringify({ version: 1, presetId: 'ocean', overrides: { unknown: 'value' } })).state).toBeNull()
    expect(validateThemeImport(`{"version":1,"presetId":"ocean","overrides":{"radius":"${'x'.repeat(129)}"}}`).state).toBeNull()
  })

  it('selects presets, applies tokens, persists, and resets overrides', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)

    await act(async () => screen.getByRole('button', { name: 'Ocean' }).click())
    expect(screen.getByTestId('preset')).toHaveTextContent('ocean')
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('199 89% 40%')
    expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY)).presetId).toBe('ocean')

    await act(async () => screen.getByRole('button', { name: 'Customize' }).click())
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('12 80% 55%')
    expect(screen.getByTestId('primary')).toHaveTextContent('12 80% 55%')

    await act(async () => screen.getByRole('button', { name: 'Reset' }).click())
    expect(screen.getByTestId('primary')).toBeEmptyDOMElement()
    expect(document.documentElement.style.getPropertyValue('--primary')).toBe('199 89% 40%')
  })

  it('applies the selected font and shadow CSS variables live', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)
    expect(getEffectiveStyleTokens({ presetId: 'verdant', overrides: {} }).font).toBe('system')
    await act(async () => screen.getByRole('button', { name: 'Typography' }).click())
    expect(document.documentElement.style.getPropertyValue('--font-family')).toContain('Georgia')
    expect(document.documentElement.style.getPropertyValue('--theme-shadow')).toBe('none')
  })

  it('keeps independent dark tokens when next-themes switches class', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)
    expect(getEffectiveTokens({ presetId: 'ocean', overrides: {} }, 'dark').background).toBe('213 48% 10%')

    await act(async () => screen.getByRole('button', { name: 'Ocean' }).click())
    await act(async () => document.documentElement.classList.replace('light', 'dark'))
    expect(document.documentElement.style.getPropertyValue('--background')).toBe('213 48% 10%')
  })
})
