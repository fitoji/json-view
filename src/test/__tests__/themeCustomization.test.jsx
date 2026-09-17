import { act, render, screen } from '@testing-library/react'
import { ThemeProvider, useThemeCustomization } from '../../components/providers/ThemeProvider'
import {
  DEFAULT_THEME_ID,
  getEffectiveTokens,
  parseThemeState,
  THEME_PRESETS,
  THEME_STORAGE_KEY,
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

  it('keeps independent dark tokens when next-themes switches class', async () => {
    render(<ThemeProvider><Harness /></ThemeProvider>)
    expect(getEffectiveTokens({ presetId: 'ocean', overrides: {} }, 'dark').background).toBe('213 48% 10%')

    await act(async () => screen.getByRole('button', { name: 'Ocean' }).click())
    await act(async () => document.documentElement.classList.replace('light', 'dark'))
    expect(document.documentElement.style.getPropertyValue('--background')).toBe('213 48% 10%')
  })
})
