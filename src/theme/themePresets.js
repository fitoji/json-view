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
  {
    id: 'zinc',
    name: 'Zinc',
    description: 'Clean neutral grays, no tint',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      primary: '240 5.9% 10%', primaryForeground: '0 0% 98%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
    },
    dark: {
      ...darkSharedTokens,
      background: '240 10% 3.9%', foreground: '0 0% 98%',
      primary: '0 0% 98%', primaryForeground: '240 5.9% 10%',
      accent: '240 3.7% 15.9%', accentForeground: '0 0% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Subtle blue-gray, calm and focused',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '222.2 84% 4.9%',
      primary: '222.2 47.4% 11.2%', primaryForeground: '210 40% 98%',
      accent: '210 40% 96.1%', accentForeground: '222.2 47.4% 11.2%',
    },
    dark: {
      ...darkSharedTokens,
      background: '222.2 84% 4.9%', foreground: '210 40% 98%',
      primary: '210 40% 98%', primaryForeground: '222.2 47.4% 11.2%',
      accent: '217.2 32.6% 17.5%', accentForeground: '210 40% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'stone',
    name: 'Stone',
    description: 'Warm earthy tones, natural feel',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '20 14.3% 4.1%',
      primary: '24 9.8% 10%', primaryForeground: '60 9.1% 97.8%',
      accent: '60 4.8% 95.9%', accentForeground: '24 9.8% 10%',
    },
    dark: {
      ...darkSharedTokens,
      background: '20 14.3% 4.1%', foreground: '60 9.1% 97.8%',
      primary: '60 9.1% 97.8%', primaryForeground: '24 9.8% 10%',
      accent: '12 6.5% 15.1%', accentForeground: '60 9.1% 97.8%',
    },
    radius: '0.95rem',
    font: 'editorial',
    shadow: 'soft',
  },
  {
    id: 'gray',
    name: 'Gray',
    description: 'Classic cool gray, timeless',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '224 71.4% 4.1%',
      primary: '220.9 39.3% 11%', primaryForeground: '210 20% 98%',
      accent: '220 14.3% 95.9%', accentForeground: '220.9 39.3% 11%',
    },
    dark: {
      ...darkSharedTokens,
      background: '224 71.4% 4.1%', foreground: '210 20% 98%',
      primary: '210 20% 98%', primaryForeground: '220.9 39.3% 11%',
      accent: '215 27.9% 16.9%', accentForeground: '210 20% 98%',
    },
    radius: '0.35rem',
    font: 'system',
    shadow: 'crisp',
  },
  {
    id: 'neutral',
    name: 'Neutral',
    description: 'Pure grayscale, zero saturation',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '0 0% 3.9%',
      primary: '0 0% 9%', primaryForeground: '0 0% 98%',
      accent: '0 0% 96.1%', accentForeground: '0 0% 9%',
    },
    dark: {
      ...darkSharedTokens,
      background: '0 0% 3.9%', foreground: '0 0% 98%',
      primary: '0 0% 98%', primaryForeground: '0 0% 9%',
      accent: '0 0% 14.9%', accentForeground: '0 0% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'red',
    name: 'Red',
    description: 'Bold and urgent, high contrast',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '0 0% 3.9%',
      primary: '0 72.2% 50.6%', primaryForeground: '0 85.7% 97.3%',
      accent: '0 0% 96.1%', accentForeground: '0 0% 9%',
    },
    dark: {
      ...darkSharedTokens,
      background: '0 0% 3.9%', foreground: '0 0% 98%',
      primary: '0 72.2% 50.6%', primaryForeground: '0 85.7% 97.3%',
      accent: '0 0% 14.9%', accentForeground: '0 0% 98%',
    },
    radius: '0.4rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Soft pink warmth, gentle and inviting',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
    },
    dark: {
      ...darkSharedTokens,
      background: '20 14.3% 4.1%', foreground: '0 0% 95%',
      primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%',
      accent: '12 6.5% 15.1%', accentForeground: '0 0% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'orange',
    name: 'Orange',
    description: 'Energetic and playful, stands out',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '20 14.3% 4.1%',
      primary: '24.6 95% 53.1%', primaryForeground: '60 9.1% 97.8%',
      accent: '60 4.8% 95.9%', accentForeground: '24 9.8% 10%',
    },
    dark: {
      ...darkSharedTokens,
      background: '20 14.3% 4.1%', foreground: '60 9.1% 97.8%',
      primary: '20.5 90.2% 48.2%', primaryForeground: '60 9.1% 97.8%',
      accent: '12 6.5% 15.1%', accentForeground: '60 9.1% 97.8%',
    },
    radius: '0.95rem',
    font: 'editorial',
    shadow: 'soft',
  },
  {
    id: 'green',
    name: 'Green',
    description: 'Fresh and balanced, easy on the eyes',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      primary: '142.1 76.2% 36.3%', primaryForeground: '355.7 100% 97.3%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
    },
    dark: {
      ...darkSharedTokens,
      background: '20 14.3% 4.1%', foreground: '0 0% 95%',
      primary: '142.1 70.6% 45.3%', primaryForeground: '144.9 80.4% 10%',
      accent: '12 6.5% 15.1%', accentForeground: '0 0% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'blue',
    name: 'Blue',
    description: 'Classic trusty blue, reliable and clear',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%', primaryForeground: '210 40% 98%',
      accent: '210 40% 96.1%', accentForeground: '222.2 47.4% 11.2%',
    },
    dark: {
      ...darkSharedTokens,
      background: '222.2 84% 4.9%', foreground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%', primaryForeground: '222.2 47.4% 11.2%',
      accent: '217.2 32.6% 17.5%', accentForeground: '210 40% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'yellow',
    name: 'Yellow',
    description: 'Bright and optimistic, high energy',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '20 14.3% 4.1%',
      primary: '47.9 95.8% 53.1%', primaryForeground: '26 83.3% 14.1%',
      accent: '60 4.8% 95.9%', accentForeground: '24 9.8% 10%',
    },
    dark: {
      ...darkSharedTokens,
      background: '20 14.3% 4.1%', foreground: '60 9.1% 97.8%',
      primary: '47.9 95.8% 53.1%', primaryForeground: '26 83.3% 14.1%',
      accent: '12 6.5% 15.1%', accentForeground: '60 9.1% 97.8%',
    },
    radius: '0.95rem',
    font: 'editorial',
    shadow: 'soft',
  },
  {
    id: 'violet',
    name: 'Violet',
    description: 'Creative and distinctive, elegant depth',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '224 71.4% 4.1%',
      primary: '262.1 83.3% 57.8%', primaryForeground: '210 20% 98%',
      accent: '220 14.3% 95.9%', accentForeground: '220.9 39.3% 11%',
    },
    dark: {
      ...darkSharedTokens,
      background: '224 71.4% 4.1%', foreground: '210 20% 98%',
      primary: '263.4 70% 50.4%', primaryForeground: '210 20% 98%',
      accent: '215 27.9% 16.9%', accentForeground: '210 20% 98%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    description: 'Soothing pastels for cozy productivity',
    light: {
      ...sharedTokens,
      background: '220 23% 95%', foreground: '234 16% 35%',
      primary: '266 85% 58%', primaryForeground: '0 0% 100%',
      accent: '197 97% 46%', accentForeground: '0 0% 100%',
    },
    dark: {
      ...darkSharedTokens,
      background: '240 21% 12%', foreground: '226 64% 88%',
      primary: '267 84% 81%', primaryForeground: '240 21% 15%',
      accent: '189 71% 73%', accentForeground: '240 21% 15%',
    },
    radius: '0.35rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Warm terracotta, Anthropic signature look',
    light: {
      ...sharedTokens,
      background: '36 33% 97%', foreground: '34 16% 9%',
      primary: '30 100% 39%', primaryForeground: '0 0% 100%',
      accent: '31 100% 94%', accentForeground: '30 100% 39%',
    },
    dark: {
      ...darkSharedTokens,
      background: '24 10% 10%', foreground: '33 16% 89%',
      primary: '26 81% 52%', primaryForeground: '24 10% 10%',
      accent: '33 55% 23%', accentForeground: '26 81% 52%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Fresh greens inspired by natural landscapes',
    light: {
      ...sharedTokens,
      background: '38 36% 96%', foreground: '9 28% 19%',
      primary: '123 46% 34%', primaryForeground: '0 0% 100%',
      accent: '122 37% 84%', accentForeground: '124 55% 24%',
    },
    dark: {
      ...darkSharedTokens,
      background: '133 20% 14%', foreground: '33 27% 92%',
      primary: '122 39% 49%', primaryForeground: '126 51% 8%',
      accent: '123 43% 39%', accentForeground: '33 27% 92%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Sleek black and white minimalism',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '0 0% 7%',
      primary: '0 0% 0%', primaryForeground: '0 0% 100%',
      accent: '0 0% 98%', accentForeground: '0 0% 7%',
    },
    dark: {
      ...darkSharedTokens,
      background: '0 0% 0%', foreground: '0 0% 98%',
      primary: '0 0% 100%', primaryForeground: '0 0% 0%',
      accent: '0 0% 7%', accentForeground: '0 0% 100%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'crisp',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Official GitHub dark and light theme',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '213 13% 14%',
      primary: '212 92% 45%', primaryForeground: '0 0% 100%',
      accent: '199 100% 93%', accentForeground: '212 92% 45%',
    },
    dark: {
      ...darkSharedTokens,
      background: '216 28% 7%', foreground: '208 35% 93%',
      primary: '212 100% 67%', primaryForeground: '216 28% 7%',
      accent: '219 80% 23%', accentForeground: '212 100% 67%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Official Spotify green for music apps',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '0 11% 9%',
      primary: '141 73% 42%', primaryForeground: '0 0% 100%',
      accent: '145 52% 94%', accentForeground: '141 73% 42%',
    },
    dark: {
      ...darkSharedTokens,
      background: '0 0% 7%', foreground: '0 0% 100%',
      primary: '141 73% 42%', primaryForeground: '0 0% 0%',
      accent: '144 36% 11%', accentForeground: '141 73% 42%',
    },
    radius: '0.5rem',
    font: 'system',
    shadow: 'soft',
  },
  {
    id: 'doom64',
    name: 'Doom 64',
    description: 'Retro gaming red and dark theme',
    light: {
      ...sharedTokens,
      background: '0 0% 80%', foreground: '0 0% 12%',
      primary: '0 84% 41%', primaryForeground: '0 0% 100%',
      accent: '210 33% 50%', accentForeground: '0 0% 100%',
    },
    dark: {
      ...darkSharedTokens,
      background: '0 0% 10%', foreground: '0 0% 88%',
      primary: '0 72% 55%', primaryForeground: '0 0% 100%',
      accent: '210 48% 68%', accentForeground: '0 0% 0%',
    },
    radius: '0rem',
    font: 'system',
    shadow: 'crisp',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-powered futuristic aesthetics',
    light: {
      ...sharedTokens,
      background: '220 20% 97%', foreground: '222 47% 11%',
      primary: '294 87% 57%', primaryForeground: '0 0% 100%',
      accent: '175 100% 45%', accentForeground: '0 0% 100%',
    },
    dark: {
      ...darkSharedTokens,
      background: '240 23% 5%', foreground: '205 80% 80%',
      primary: '306 100% 69%', primaryForeground: '240 23% 5%',
      accent: '172 100% 50%', accentForeground: '240 23% 5%',
    },
    radius: '0.25rem',
    font: 'mono',
    shadow: 'crisp',
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Bold borders, high contrast, raw aesthetic',
    light: {
      ...sharedTokens,
      background: '0 0% 100%', foreground: '0 0% 0%',
      primary: '23 97% 46%', primaryForeground: '0 0% 100%',
      accent: '217 91% 60%', accentForeground: '0 0% 100%',
      border: '0 0% 0%',
      input: '0 0% 0%',
    },
    dark: {
      ...darkSharedTokens,
      background: '0 0% 0%', foreground: '0 0% 100%',
      primary: '25 95% 53%', primaryForeground: '0 0% 0%',
      accent: '239 84% 67%', accentForeground: '0 0% 0%',
      border: '0 0% 100%',
      input: '0 0% 100%',
    },
    radius: '0rem',
    font: 'system',
    shadow: 'crisp',
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
  const lightForeground = '0 0% 100%'
  const darkForeground = '222.2 47.4% 11.2%'
  return contrastRatio(hslChannels, lightForeground) >= contrastRatio(hslChannels, darkForeground)
    ? lightForeground
    : darkForeground
}

export function contrastRatio(background, foreground) {
  const backgroundLuminance = relativeLuminance(hslToRgb(background))
  const foregroundLuminance = relativeLuminance(hslToRgb(foreground))
  const lighter = Math.max(backgroundLuminance, foregroundLuminance)
  const darker = Math.min(backgroundLuminance, foregroundLuminance)
  return (lighter + 0.05) / (darker + 0.05)
}

function hslToRgb(hslChannels) {
  const [hue, saturation, lightness] = hslChannels.match(/[\d.]+/g).map(Number)
  const h = (hue % 360) / 360
  const s = saturation / 100
  const l = lightness / 100
  const chroma = (1 - Math.abs(2 * l - 1)) * s
  const x = chroma * (1 - Math.abs((h * 6) % 2 - 1))
  const m = l - chroma / 2
  const rgb = h < 1 / 6
    ? [chroma, x, 0]
    : h < 2 / 6
      ? [x, chroma, 0]
      : h < 3 / 6
        ? [0, chroma, x]
        : h < 4 / 6
          ? [0, x, chroma]
          : h < 5 / 6
            ? [x, 0, chroma]
            : [chroma, 0, x]
  return rgb.map((channel) => channel + m)
}

function relativeLuminance([red, green, blue]) {
  const toLinear = (channel) => channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4
  const [r, g, b] = [red, green, blue].map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
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
