export const THEME_STORAGE_KEY = 'visortests-theme-v1'
export const THEME_SCHEMA_VERSION = 1

export const THEME_FONTS = Object.freeze({
  system: 'ui-sans-serif, system-ui, sans-serif',
  editorial: 'Georgia, Cambria, "Times New Roman", serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
})

export const THEME_SHADOWS = Object.freeze({
  none: 'none',
  soft: '0 10px 30px -12px hsl(222 47% 11% / 0.28)',
  crisp: '0 4px 0 hsl(222 47% 11% / 0.16)',
})

const MAX_THEME_STRING_LENGTH = 128
const MAX_THEME_IMPORT_LENGTH = 32 * 1024

const sharedTokens = {
  card: '0 0% 100%',
  cardForeground: '222.2 84% 4.9%',
  popover: '0 0% 100%',
  popoverForeground: '222.2 84% 4.9%',
  secondary: '210 40% 96.1%',
  secondaryForeground: '222.2 47.4% 11.2%',
  muted: '210 40% 96.1%',
  mutedForeground: '215.4 16.3% 46.9%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  success: '142 71% 45%',
  successForeground: '0 0% 100%',
  warning: '38 92% 50%',
  warningForeground: '20 60% 10%',
  border: '214.3 31.8% 91.4%',
  input: '214.3 31.8% 91.4%',
  ring: '160 84% 39%',
}

const darkSharedTokens = {
  card: '222.2 47.4% 11.2%',
  cardForeground: '210 40% 98%',
  popover: '222.2 47.4% 11.2%',
  popoverForeground: '210 40% 98%',
  secondary: '217.2 32.6% 17.5%',
  secondaryForeground: '210 40% 98%',
  muted: '217.2 32.6% 17.5%',
  mutedForeground: '215 20.2% 65.1%',
  destructive: '0 62.8% 30.6%',
  destructiveForeground: '210 40% 98%',
  success: '142 70% 45%',
  successForeground: '0 0% 100%',
  warning: '38 92% 50%',
  warningForeground: '20 60% 10%',
  border: '217.2 32.6% 17.5%',
  input: '217.2 32.6% 17.5%',
  ring: '160 84% 55%',
}

export const THEME_PRESETS = [
  {
    id: 'verdant',
    name: 'Verdant',
    description: 'The familiar Visor Tests green',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '222.2 84% 4.9%',
      primary: '160 84% 39%', primaryForeground: '0 0% 100%',
      accent: '154 58% 91%', accentForeground: '160 70% 22%',
    },
    dark: {
      ...darkSharedTokens,
      background: '222.2 47.4% 8%', foreground: '210 40% 98%',
      primary: '160 76% 48%', primaryForeground: '160 80% 10%',
      accent: '160 45% 22%', accentForeground: '154 70% 88%',
    },
    radius: '0.65rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool focus for long study sessions',
    light: {
      ...sharedTokens,
      background: '204 45% 98%', foreground: '210 45% 15%',
      primary: '199 89% 40%', primaryForeground: '0 0% 100%',
      accent: '190 75% 90%', accentForeground: '201 80% 23%',
    },
    dark: {
      ...darkSharedTokens,
      background: '213 48% 10%', foreground: '210 40% 98%',
      primary: '195 85% 55%', primaryForeground: '211 60% 12%',
      accent: '201 45% 24%', accentForeground: '190 80% 88%',
    },
    radius: '0.9rem',
    font: 'mono',
    shadow: 'crisp',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm energy for a quick review',
    light: {
      ...sharedTokens,
      background: '30 100% 98%', foreground: '20 45% 16%',
      primary: '12 82% 55%', primaryForeground: '0 0% 100%',
      accent: '35 100% 88%', accentForeground: '23 75% 24%',
    },
    dark: {
      ...darkSharedTokens,
      background: '20 35% 10%', foreground: '35 60% 96%',
      primary: '18 86% 62%', primaryForeground: '20 60% 12%',
      accent: '28 45% 25%', accentForeground: '35 90% 90%',
    },
    radius: '0.45rem',
    font: 'editorial',
    shadow: 'soft',
  },
]

export const DEFAULT_THEME_ID = THEME_PRESETS[0].id

export function getThemePreset(id) {
  return THEME_PRESETS.find((preset) => preset.id === id) || THEME_PRESETS[0]
}

export function createThemeState(presetId = DEFAULT_THEME_ID, overrides = {}) {
  const preset = getThemePreset(presetId)
  return {
    version: THEME_SCHEMA_VERSION,
    presetId: preset.id,
    overrides: {
      primary: isSafeThemeString(overrides.primary) ? overrides.primary : null,
      accent: isSafeThemeString(overrides.accent) ? overrides.accent : null,
      radius: isSafeRadius(overrides.radius) ? overrides.radius : null,
      font: isKnownThemeValue(THEME_FONTS, overrides.font) ? overrides.font : null,
      shadow: isKnownThemeValue(THEME_SHADOWS, overrides.shadow) ? overrides.shadow : null,
    },
  }
}

export function parseThemeState(raw) {
  try {
    if (typeof raw !== 'string' || raw.length > MAX_THEME_IMPORT_LENGTH) return createThemeState()
    const parsed = JSON.parse(raw)
    if (!isValidThemeObject(parsed)) {
      return createThemeState()
    }
    return createThemeState(parsed.presetId, parsed.overrides)
  } catch {
    return createThemeState()
  }
}

export function validateThemeImport(raw) {
  try {
    if (typeof raw === 'string' && raw.length > MAX_THEME_IMPORT_LENGTH) return { state: null, error: 'El archivo es demasiado grande.' }
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (!isValidThemeObject(parsed)) return { state: null, error: 'El archivo no contiene un tema válido.' }
    return { state: createThemeState(parsed.presetId, parsed.overrides), error: null }
  } catch {
    return { state: null, error: 'El archivo no contiene JSON válido.' }
  }
}

export function serializeThemeState(state) {
  return JSON.stringify(createThemeState(state.presetId, state.overrides))
}

export function getEffectiveTokens(state, mode) {
  const preset = getThemePreset(state.presetId)
  const tokens = { ...preset[mode] }
  const { primary, accent } = state.overrides || {}
  if (primary) tokens.primary = primary
  if (accent) tokens.accent = accent
  if (primary) tokens.primaryForeground = foregroundFor(primary)
  if (accent) tokens.accentForeground = foregroundFor(accent)
  return tokens
}

export function getEffectiveStyleTokens(state) {
  const preset = getThemePreset(state.presetId)
  const overrides = state.overrides || {}
  const font = isKnownThemeValue(THEME_FONTS, overrides.font) ? overrides.font : preset.font
  const shadow = isKnownThemeValue(THEME_SHADOWS, overrides.shadow) ? overrides.shadow : preset.shadow
  return { font, shadow, fontFamily: THEME_FONTS[font], shadowValue: THEME_SHADOWS[shadow] }
}

function isKnownThemeValue(allowlist, value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH && Object.hasOwn(allowlist, value)
}

function isSafeThemeString(value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH && /^[\d.]+(?:\s+\d+(?:\.\d+)?%?){2}$/.test(value)
}

function isSafeRadius(value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH && /^(?:0|1(?:\.\d+)?|0\.\d+)rem$/.test(value)
}

function isValidThemeObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== THEME_SCHEMA_VERSION || !getThemePreset(value.presetId)) return false
  if (Object.keys(value).some((key) => !['version', 'presetId', 'overrides'].includes(key))) return false
  const overrides = value.overrides
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) return false
  return Object.keys(overrides).every((key) => ['primary', 'accent', 'radius', 'font', 'shadow'].includes(key))
    && (overrides.primary == null || isSafeThemeString(overrides.primary))
    && (overrides.accent == null || isSafeThemeString(overrides.accent))
    && (overrides.radius == null || isSafeRadius(overrides.radius))
    && (overrides.font == null || isKnownThemeValue(THEME_FONTS, overrides.font))
    && (overrides.shadow == null || isKnownThemeValue(THEME_SHADOWS, overrides.shadow))
}

export function foregroundFor(hslChannels) {
  const lightness = Number.parseFloat(hslChannels.split(/\s+/).at(-1))
  return lightness > 58 ? '222.2 47.4% 11.2%' : '0 0% 100%'
}

export function hexToHsl(hex) {
  const value = hex.replace('#', '')
  const channels = value.length === 3 ? value.split('').map((part) => part + part) : value.match(/.{2}/g)
  if (!channels || channels.length !== 3) return null
  const [red, green, blue] = channels.map((part) => Number.parseInt(part, 16) / 255)
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const lightness = (max + min) / 2
  if (max === min) return `0 0% ${Math.round(lightness * 100)}%`
  const delta = max - min
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  let hue
  if (max === red) hue = (green - blue) / delta + (green < blue ? 6 : 0)
  else if (max === green) hue = (blue - red) / delta + 2
  else hue = (red - green) / delta + 4
  return `${Math.round(hue * 60)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`
}

export function hslToHex(hslChannels) {
  const [hue, saturation, lightness] = hslChannels.match(/[\d.]+/g).map(Number)
  const s = saturation / 100
  const l = lightness / 100
  const chroma = (1 - Math.abs(2 * l - 1)) * s
  const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1))
  const m = l - chroma / 2
  const rgb = hue < 60 ? [chroma, x, 0] : hue < 120 ? [x, chroma, 0] : hue < 180 ? [0, chroma, x] : hue < 240 ? [0, x, chroma] : hue < 300 ? [x, 0, chroma] : [chroma, 0, x]
  return `#${rgb.map((channel) => Math.round((channel + m) * 255).toString(16).padStart(2, '0')).join('')}`
}
