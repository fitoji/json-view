export const THEME_STORAGE_KEY = 'visortests-theme-v3'
export const THEME_SCHEMA_VERSION = 3

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

// ─── Colour core ──────────────────────────────────────────────────────────────

/**
 * Parse any supported colour format to an RGB object.
 * Accepts: #RGB, #RGBA, #RRGGBB, #RRGGBBAA, rgb()/rgba() (space & comma syntax),
 * hsl()/hsla() (space & comma syntax), oklch(), oklab(), and a bare legacy channel
 * triple "h s% l%" (for migration input only).
 *
 * Returns { r, g, b, a } where r/g/b are 0-255 and a is 0-1; or null on parse failure.
 */
export function parseThemeColor(value) {
  if (typeof value !== 'string') return null
  const s = value.trim()

  // #RGB / #RRGGBB / #RGBA / #RRGGBBAA
  if (s.startsWith('#')) {
    const hex = s.slice(1)
    let r, g, b, a = 1
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16)
      g = parseInt(hex[1] + hex[1], 16)
      b = parseInt(hex[2] + hex[2], 16)
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16)
      g = parseInt(hex.slice(2, 4), 16)
      b = parseInt(hex.slice(4, 6), 16)
    } else if (hex.length === 4) {
      r = parseInt(hex[0] + hex[0], 16)
      g = parseInt(hex[1] + hex[1], 16)
      b = parseInt(hex[2] + hex[2], 16)
      a = parseInt(hex[3] + hex[3], 16) / 255
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16)
      g = parseInt(hex.slice(2, 4), 16)
      b = parseInt(hex.slice(4, 6), 16)
      a = parseInt(hex.slice(6, 8), 16) / 255
    } else {
      return null
    }
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null
    return { r, g, b, a: isNaN(a) ? 1 : a }
  }

  // rgb() / rgba()
  if (/^(?:rgba?)\(/i.test(s)) {
    const nums = s.replace(/rgba?\(/i, '').replace(/\)$/, '')
    const parts = nums.split(/[,\s]+/).filter(Boolean)
    if (parts.length < 3) return null
    const [r0, g0, b0, a0 = '1'] = parts
    let r, g, b, a

    if (r0.endsWith('%')) {
      r = (parseFloat(r0) / 100) * 255
      g = (parseFloat(g0) / 100) * 255
      b = (parseFloat(b0) / 100) * 255
    } else {
      r = parseFloat(r0)
      g = parseFloat(g0)
      b = parseFloat(b0)
    }
    a = parseFloat(a0.endsWith('%') ? (parseFloat(a0) / 100).toString() : a0)
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null
    a = isNaN(a) ? 1 : a
    return { r: Math.max(0, Math.min(255, r)), g: Math.max(0, Math.min(255, g)), b: Math.max(0, Math.min(255, b)), a: Math.max(0, Math.min(1, a)) }
  }

  // hsl() / hsla()
  if (/^(?:hsla?)\(/i.test(s)) {
    const inside = s.replace(/hsla?\(/i, '').replace(/\)$/, '')
    const parts = inside.split(/[,\s]+/).filter(Boolean)
    if (parts.length < 3) return null
    const [h0, s0, l0, a0 = '1'] = parts
    let h = parseFloat(h0)
    // Saturation and lightness MUST carry '%' per CSS Color 4; reject otherwise.
    if (!s0.endsWith('%') || !l0.endsWith('%')) return null
    let sv = parseFloat(s0)
    let l = parseFloat(l0)
    let a = parseFloat(a0.endsWith('%') ? (parseFloat(a0) / 100).toString() : a0)
    if (isNaN(h) || isNaN(sv) || isNaN(l) || isNaN(a)) return null
    sv = sv / 100
    l = l / 100
    const chroma = (1 - Math.abs(2 * l - 1)) * sv
    const x = chroma * (1 - Math.abs(((h % 360) / 60) % 2 - 1))
    const m = l - chroma / 2
    const hh = ((h % 360) + 360) % 360
    let r, g, b
    if (hh < 60) { r = chroma; g = x; b = 0 }
    else if (hh < 120) { r = x; g = chroma; b = 0 }
    else if (hh < 180) { r = 0; g = chroma; b = x }
    else if (hh < 240) { r = 0; g = x; b = chroma }
    else if (hh < 300) { r = x; g = 0; b = chroma }
    else { r = chroma; g = 0; b = x }
    return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255), a: Math.max(0, Math.min(1, isNaN(a) ? 1 : a)) }
  }

  // oklch() — matrix from spec verbatim; gamut clipping is intended behaviour
  if (/^oklch\(/i.test(s)) {
    const inside = s.replace(/oklch\(/i, '').replace(/\)$/, '')
    const parts = inside.split(/[,\s]+/).filter(Boolean)
    if (parts.length < 3) return null
    let [l0, c0, h0] = parts
    let L = parseFloat(l0.endsWith('%') ? l0 : l0)
    const C = parseFloat(c0)
    let H = parseFloat(h0)
    if (isNaN(L) || isNaN(C) || isNaN(H)) return null
    if (l0.endsWith('%')) L = L / 100
    H = H * Math.PI / 180
    const a = C * Math.cos(H)
    const bSin = C * Math.sin(H)
    const l_ = L + 0.3963377774 * a + 0.2158037573 * bSin
    const m_ = L - 0.1055613458 * a - 0.0638541728 * bSin
    const s_ = L - 0.0894841775 * a - 1.2914855480 * bSin
    const l = l_ * l_ * l_
    const m = m_ * m_ * m_
    const ss = s_ * s_ * s_
    let rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * ss
    let gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * ss
    let bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * ss
    const toSrgb = (x) => x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
    return {
      r: Math.round(Math.max(0, Math.min(255, toSrgb(rLin) * 255))),
      g: Math.round(Math.max(0, Math.min(255, toSrgb(gLin) * 255))),
      b: Math.round(Math.max(0, Math.min(255, toSrgb(bLin) * 255))),
      a: 1,
    }
  }

  // oklab()
  if (/^oklab\(/i.test(s)) {
    const inside = s.replace(/oklab\(/i, '').replace(/\)$/, '')
    const parts = inside.split(/[,\s]+/).filter(Boolean)
    if (parts.length < 3) return null
    let [l0, a0, b0] = parts
    let L = parseFloat(l0.endsWith('%') ? l0 : l0)
    const aVal = parseFloat(a0)
    const bVal = parseFloat(b0)
    if (isNaN(L) || isNaN(aVal) || isNaN(bVal)) return null
    if (l0.endsWith('%')) L = L / 100
    const l = L + 0.3963377774 * aVal + 0.2158037573 * bVal
    const m = L - 0.1055613458 * aVal - 0.0638541728 * bVal
    const s = L - 0.0894841775 * aVal - 1.2914855480 * bVal
    const l3 = l * l * l
    const m3 = m * m * m
    const s3 = s * s * s
    let rLin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
    let gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
    let bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3
    const toSrgb = (x) => x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
    return {
      r: Math.round(Math.max(0, Math.min(255, toSrgb(rLin) * 255))),
      g: Math.round(Math.max(0, Math.min(255, toSrgb(gLin) * 255))),
      b: Math.round(Math.max(0, Math.min(255, toSrgb(bLin) * 255))),
      a: 1,
    }
  }

  // Bare legacy channel triple "h s% l%" — accepted only for migration input
  const bareMatch = s.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/)
  if (bareMatch) {
    const h = parseFloat(bareMatch[1])
    const sv = parseFloat(bareMatch[2]) / 100
    const l = parseFloat(bareMatch[3]) / 100
    if (isNaN(h) || isNaN(sv) || isNaN(l)) return null
    const chroma = (1 - Math.abs(2 * l - 1)) * sv
    const x = chroma * (1 - Math.abs((((h % 360) + 360) % 360) / 60 % 2 - 1))
    const m = l - chroma / 2
    const hh = ((h % 360) + 360) % 360
    let r, g, b
    if (hh < 60) { r = chroma; g = x; b = 0 }
    else if (hh < 120) { r = x; g = chroma; b = 0 }
    else if (hh < 180) { r = 0; g = chroma; b = x }
    else if (hh < 240) { r = 0; g = x; b = chroma }
    else if (hh < 300) { r = x; g = 0; b = chroma }
    else { r = chroma; g = 0; b = x }
    return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255), a: 1 }
  }

  return null
}

/**
 * Normalise a colour value to a canonical complete-colour string.
 * Canonical form for a bare legacy triple is "hsl(h s% l%)".
 * For hex/oklch/rgb input, preserves the caller's function and formatting.
 * Returns null if unparseable.
 *
 * Grammar accepted and canonical outputs:
 *   #RGB        → #rgb       (lowercase, 3 chars)
 *   #RGBA       → #rgba      (lowercase, 4 chars)
 *   #RRGGBB     → #rrggbb   (lowercase, 6 chars)
 *   #RRGGBBAA   → #rrggbbaa (lowercase, 8 chars)
 *   oklch(L C H)  → oklch(L C H)   (preserves numeric text)
 *   oklab(L A B)  → oklab(L A B)   (preserves numeric text)
 *   hsl(h s% l%)  → hsl(h s% l%)
 *   hsl(h s% l% / α) → hsl(h s% l% / α)  (modern slash-alpha)
 *   rgb/rgba      → hsl(h s% l%)
 *   bare triple   → hsl(h s% l%)   (legacy migration only)
 *   anything else → null
 */
export function normalizeThemeColor(value) {
  if (typeof value !== 'string') return null
  const s = value.trim()

  // ── hex: strict numeric grammar, re-emit lowercased ──────────────────────────
  if (s.startsWith('#')) {
    const hex = s.slice(1)
    if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{1})?$|^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(hex)) return null
    return s.toLowerCase()
  }

  // ── oklch / oklab: validate L(C/a)(H/b) plus optional / alpha, re-emit ─────
  if (/^oklch\(/i.test(s) || /^oklab\(/i.test(s)) {
    const fn = s.match(/^(oklch|oklab)/i)?.[1].toLowerCase()
    // Non-greedy +? to stop at the first ')' matching the opening paren,
    // then reject anything after it (injection after the closing paren).
    const match = s.match(/^(oklch|oklab)\(([^)]+?)\)$/i)
    if (!match) return null
    // Reject if any forbidden injection character appears after the closing ')'
    const afterClose = s.slice(s.lastIndexOf(')')).slice(1)
    if (/[;{}@<\\]/.test(afterClose)) return null
    const inside = match[2]

    // Split on '/' to separate channels from alpha
    const slashIdx = inside.indexOf('/')
    const channels = slashIdx >= 0 ? inside.slice(0, slashIdx).trim() : inside.trim()
    const alphaStr = slashIdx >= 0 ? inside.slice(slashIdx + 1).trim() : null

    const channelParts = channels.split(/[,\s]+/).filter(Boolean)
    if (channelParts.length < 3) return null

    let [l0, c0, h0] = channelParts
    // L: number or '%'
    if (!l0.endsWith('%')) { if (isNaN(parseFloat(l0))) return null }
    else { if (isNaN(parseFloat(l0.slice(0, -1)))) return null }
    // C / a / b: number (no %)
    if (isNaN(parseFloat(c0))) return null
    if (isNaN(parseFloat(h0))) return null

    // Alpha: optional, number or '%'
    if (alphaStr !== null) {
      if (alphaStr.endsWith('%')) {
        if (isNaN(parseFloat(alphaStr.slice(0, -1)))) return null
      } else {
        if (isNaN(parseFloat(alphaStr))) return null
      }
    }

    // Re-emit canonically — preserve the caller's numeric text verbatim
    const L = l0
    const C = c0
    const H = h0
    const alpha = alphaStr !== null ? ` / ${alphaStr}` : ''
    return fn === 'oklch'
      ? `oklch(${L} ${C} ${H}${alpha})`
      : `oklab(${L} ${C} ${H}${alpha})`
  }

  // ── hsl / hsla: validate complete-colour grammar, re-emit ───────────────────
  const hslMatch = s.match(/^(hsla?)\(([^)]+)\)$/i)
  if (hslMatch) {
    const inner = hslMatch[2]
    // Handle modern slash-alpha: "h s% l% / .5" or "h s% l% / 50%"
    const slashIdx = inner.indexOf('/')
    let channelStr, alphaStr
    if (slashIdx >= 0) {
      channelStr = inner.slice(0, slashIdx).trim()
      alphaStr = inner.slice(slashIdx + 1).trim()
      // Validate alpha
      if (alphaStr.endsWith('%')) {
        if (isNaN(parseFloat(alphaStr.slice(0, -1)))) return null
      } else {
        if (isNaN(parseFloat(alphaStr))) return null
      }
    } else {
      channelStr = inner
      alphaStr = null
    }
    const parts = channelStr.split(/[,\s]+/).filter(Boolean)
    if (parts.length < 3) return null
    const [h0, s0, l0] = parts
    // H: number
    const h = parseFloat(h0)
    // S, L: MUST carry '%'
    if (!s0.endsWith('%') || !l0.endsWith('%')) return null
    const sv = parseFloat(s0)
    const lv = parseFloat(l0)
    if (isNaN(h) || isNaN(sv) || isNaN(lv)) return null

    if (alphaStr !== null) {
      return `hsl(${h} ${s0} ${l0} / ${alphaStr})`
    }
    return `hsl(${h} ${s0} ${l0})`
  }

  // ── rgb / rgba: convert to hsl ──────────────────────────────────────────────
  const rgbMatch = s.match(/^(rgba?)\(([^)]+)\)$/i)
  if (rgbMatch) {
    const inner = rgbMatch[2]
    const parts = inner.split(/[,\s]+/).filter(Boolean)
    const [r0, g0, b0] = parts
    let r, g, b
    if (r0.endsWith('%')) {
      r = (parseFloat(r0) / 100) * 255
      g = (parseFloat(g0) / 100) * 255
      b = (parseFloat(b0) / 100) * 255
    } else {
      r = parseFloat(r0)
      g = parseFloat(g0)
      b = parseFloat(b0)
    }
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    if (max === min) return `hsl(0 0% ${Math.round(l * 100)}%)`
    const d = max - min
    const sv = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    let h
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
    else if (max === g) h = ((b - r) / d + 2) * 60
    else h = ((r - g) / d + 4) * 60
    return `hsl(${Math.round(h)} ${Math.round(sv * 100)}% ${Math.round(l * 100)}%)`
  }

  // ── Bare channel triple → wrap in hsl() (legacy migration only) ─────────────
  const bareMatch = s.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/)
  if (bareMatch) {
    return `hsl(${bareMatch[1]} ${bareMatch[2]}% ${bareMatch[3]}%)`
  }

  return null
}

/** Convert an {r,g,b} object (0-255 each) to "#rrggbb". */
export function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
}

/** WCAG relative luminance of an RGB triple (linearisation + sRGB gamma). */
function relativeLuminance({ r, g, b }) {
  const toLinear = (channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

/**
 * WCAG contrast ratio between two colours.
 * Accepts any supported colour format via parseThemeColor.
 */
export function contrastRatio(colorA, colorB) {
  const rgbA = parseThemeColor(colorA)
  const rgbB = parseThemeColor(colorB)
  if (!rgbA || !rgbB) return 1
  const lA = relativeLuminance(rgbA)
  const lB = relativeLuminance(rgbB)
  const lighter = Math.max(lA, lB)
  const darker = Math.min(lA, lB)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Choose the higher-contrast foreground for a given background.
 * Returns complete colour strings (hsl(...)) so consumers never double-wrap.
 */
export function foregroundFor(color) {
  const lightFg = 'hsl(0 0% 100%)'
  const darkFg = 'hsl(222.2 47.4% 11.2%)'
  return contrastRatio(color, lightFg) >= contrastRatio(color, darkFg) ? lightFg : darkFg
}

// ─── Preset data ───────────────────────────────────────────────────────────────

const sharedTokens = {
  card: 'hsl(0 0% 100%)',
  cardForeground: 'hsl(222.2 84% 4.9%)',
  popover: 'hsl(0 0% 100%)',
  popoverForeground: 'hsl(222.2 84% 4.9%)',
  secondary: 'hsl(210 40% 96.1%)',
  secondaryForeground: 'hsl(222.2 47.4% 11.2%)',
  muted: 'hsl(210 40% 96.1%)',
  mutedForeground: 'hsl(215.4 16.3% 46.9%)',
  destructive: 'hsl(0 84.2% 60.2%)',
  destructiveForeground: 'hsl(210 40% 98%)',
  success: 'hsl(142 71% 45%)',
  successForeground: 'hsl(0 0% 100%)',
  warning: 'hsl(38 92% 50%)',
  warningForeground: 'hsl(20 60% 10%)',
  border: 'hsl(214.3 31.8% 91.4%)',
  input: 'hsl(214.3 31.8% 91.4%)',
  ring: 'hsl(160 84% 39%)',
}

const darkSharedTokens = {
  card: 'hsl(222.2 47.4% 11.2%)',
  cardForeground: 'hsl(210 40% 98%)',
  popover: 'hsl(222.2 47.4% 11.2%)',
  popoverForeground: 'hsl(210 40% 98%)',
  secondary: 'hsl(217.2 32.6% 17.5%)',
  secondaryForeground: 'hsl(210 40% 98%)',
  muted: 'hsl(217.2 32.6% 17.5%)',
  mutedForeground: 'hsl(215 20.2% 65.1%)',
  destructive: 'hsl(0 62.8% 30.6%)',
  destructiveForeground: 'hsl(210 40% 98%)',
  success: 'hsl(142 70% 45%)',
  successForeground: 'hsl(0 0% 100%)',
  warning: 'hsl(38 92% 50%)',
  warningForeground: 'hsl(20 60% 10%)',
  border: 'hsl(217.2 32.6% 17.5%)',
  input: 'hsl(217.2 32.6% 17.5%)',
  ring: 'hsl(160 84% 55%)',
}

export const THEME_PRESETS = [
  {
    id: 'verdant',
    name: 'Verdant',
    description: 'The familiar Visor Tests green',
    light: {
      ...sharedTokens,
      background: 'hsl(0 0% 100%)', foreground: 'hsl(222.2 84% 4.9%)',
      primary: 'hsl(160 84% 39%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(154 58% 91%)', accentForeground: 'hsl(160 70% 22%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(222.2 47.4% 8%)', foreground: 'hsl(210 40% 98%)',
      primary: 'hsl(160 76% 48%)', primaryForeground: 'hsl(160 80% 10%)',
      accent: 'hsl(160 45% 22%)', accentForeground: 'hsl(154 70% 88%)',
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
      background: 'hsl(204 45% 98%)', foreground: 'hsl(210 45% 15%)',
      primary: 'hsl(199 89% 40%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(190 75% 90%)', accentForeground: 'hsl(201 80% 23%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(213 48% 10%)', foreground: 'hsl(210 40% 98%)',
      primary: 'hsl(195 85% 55%)', primaryForeground: 'hsl(211 60% 12%)',
      accent: 'hsl(201 45% 24%)', accentForeground: 'hsl(190 80% 88%)',
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
      background: 'hsl(30 100% 98%)', foreground: 'hsl(20 45% 16%)',
      primary: 'hsl(12 82% 55%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(35 100% 88%)', accentForeground: 'hsl(23 75% 24%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(20 35% 10%)', foreground: 'hsl(35 60% 96%)',
      primary: 'hsl(18 86% 62%)', primaryForeground: 'hsl(20 60% 12%)',
      accent: 'hsl(28 45% 25%)', accentForeground: 'hsl(35 90% 90%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(240 10% 3.9%)',
      primary: 'hsl(240 5.9% 10%)', primaryForeground: 'hsl(0 0% 98%)',
      accent: 'hsl(240 4.8% 95.9%)', accentForeground: 'hsl(240 5.9% 10%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(240 10% 3.9%)', foreground: 'hsl(0 0% 98%)',
      primary: 'hsl(0 0% 98%)', primaryForeground: 'hsl(240 5.9% 10%)',
      accent: 'hsl(240 3.7% 15.9%)', accentForeground: 'hsl(0 0% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(222.2 84% 4.9%)',
      primary: 'hsl(222.2 47.4% 11.2%)', primaryForeground: 'hsl(210 40% 98%)',
      accent: 'hsl(210 40% 96.1%)', accentForeground: 'hsl(222.2 47.4% 11.2%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(222.2 84% 4.9%)', foreground: 'hsl(210 40% 98%)',
      primary: 'hsl(210 40% 98%)', primaryForeground: 'hsl(222.2 47.4% 11.2%)',
      accent: 'hsl(217.2 32.6% 17.5%)', accentForeground: 'hsl(210 40% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(20 14.3% 4.1%)',
      primary: 'hsl(24 9.8% 10%)', primaryForeground: 'hsl(60 9.1% 97.8%)',
      accent: 'hsl(60 4.8% 95.9%)', accentForeground: 'hsl(24 9.8% 10%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(20 14.3% 4.1%)', foreground: 'hsl(60 9.1% 97.8%)',
      primary: 'hsl(60 9.1% 97.8%)', primaryForeground: 'hsl(24 9.8% 10%)',
      accent: 'hsl(12 6.5% 15.1%)', accentForeground: 'hsl(60 9.1% 97.8%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(224 71.4% 4.1%)',
      primary: 'hsl(220.9 39.3% 11%)', primaryForeground: 'hsl(210 20% 98%)',
      accent: 'hsl(220 14.3% 95.9%)', accentForeground: 'hsl(220.9 39.3% 11%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(224 71.4% 4.1%)', foreground: 'hsl(210 20% 98%)',
      primary: 'hsl(210 20% 98%)', primaryForeground: 'hsl(220.9 39.3% 11%)',
      accent: 'hsl(215 27.9% 16.9%)', accentForeground: 'hsl(210 20% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(0 0% 3.9%)',
      primary: 'hsl(0 0% 9%)', primaryForeground: 'hsl(0 0% 98%)',
      accent: 'hsl(0 0% 96.1%)', accentForeground: 'hsl(0 0% 9%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(0 0% 3.9%)', foreground: 'hsl(0 0% 98%)',
      primary: 'hsl(0 0% 98%)', primaryForeground: 'hsl(0 0% 9%)',
      accent: 'hsl(0 0% 14.9%)', accentForeground: 'hsl(0 0% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(0 0% 3.9%)',
      primary: 'hsl(0 72.2% 50.6%)', primaryForeground: 'hsl(0 85.7% 97.3%)',
      accent: 'hsl(0 0% 96.1%)', accentForeground: 'hsl(0 0% 9%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(0 0% 3.9%)', foreground: 'hsl(0 0% 98%)',
      primary: 'hsl(0 72.2% 50.6%)', primaryForeground: 'hsl(0 85.7% 97.3%)',
      accent: 'hsl(0 0% 14.9%)', accentForeground: 'hsl(0 0% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(240 10% 3.9%)',
      primary: 'hsl(346.8 77.2% 49.8%)', primaryForeground: 'hsl(355.7 100% 97.3%)',
      accent: 'hsl(240 4.8% 95.9%)', accentForeground: 'hsl(240 5.9% 10%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(20 14.3% 4.1%)', foreground: 'hsl(0 0% 95%)',
      primary: 'hsl(346.8 77.2% 49.8%)', primaryForeground: 'hsl(355.7 100% 97.3%)',
      accent: 'hsl(12 6.5% 15.1%)', accentForeground: 'hsl(0 0% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(20 14.3% 4.1%)',
      primary: 'hsl(24.6 95% 53.1%)', primaryForeground: 'hsl(60 9.1% 97.8%)',
      accent: 'hsl(60 4.8% 95.9%)', accentForeground: 'hsl(24 9.8% 10%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(20 14.3% 4.1%)', foreground: 'hsl(60 9.1% 97.8%)',
      primary: 'hsl(20.5 90.2% 48.2%)', primaryForeground: 'hsl(60 9.1% 97.8%)',
      accent: 'hsl(12 6.5% 15.1%)', accentForeground: 'hsl(60 9.1% 97.8%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(240 10% 3.9%)',
      primary: 'hsl(142.1 76.2% 36.3%)', primaryForeground: 'hsl(355.7 100% 97.3%)',
      accent: 'hsl(240 4.8% 95.9%)', accentForeground: 'hsl(240 5.9% 10%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(20 14.3% 4.1%)', foreground: 'hsl(0 0% 95%)',
      primary: 'hsl(142.1 70.6% 45.3%)', primaryForeground: 'hsl(144.9 80.4% 10%)',
      accent: 'hsl(12 6.5% 15.1%)', accentForeground: 'hsl(0 0% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(222.2 84% 4.9%)',
      primary: 'hsl(221.2 83.2% 53.3%)', primaryForeground: 'hsl(210 40% 98%)',
      accent: 'hsl(210 40% 96.1%)', accentForeground: 'hsl(222.2 47.4% 11.2%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(222.2 84% 4.9%)', foreground: 'hsl(210 40% 98%)',
      primary: 'hsl(217.2 91.2% 59.8%)', primaryForeground: 'hsl(222.2 47.4% 11.2%)',
      accent: 'hsl(217.2 32.6% 17.5%)', accentForeground: 'hsl(210 40% 98%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(20 14.3% 4.1%)',
      primary: 'hsl(47.9 95.8% 53.1%)', primaryForeground: 'hsl(26 83.3% 14.1%)',
      accent: 'hsl(60 4.8% 95.9%)', accentForeground: 'hsl(24 9.8% 10%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(20 14.3% 4.1%)', foreground: 'hsl(60 9.1% 97.8%)',
      primary: 'hsl(47.9 95.8% 53.1%)', primaryForeground: 'hsl(26 83.3% 14.1%)',
      accent: 'hsl(12 6.5% 15.1%)', accentForeground: 'hsl(60 9.1% 97.8%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(224 71.4% 4.1%)',
      primary: 'hsl(262.1 83.3% 57.8%)', primaryForeground: 'hsl(210 20% 98%)',
      accent: 'hsl(220 14.3% 95.9%)', accentForeground: 'hsl(220.9 39.3% 11%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(224 71.4% 4.1%)', foreground: 'hsl(210 20% 98%)',
      primary: 'hsl(263.4 70% 50.4%)', primaryForeground: 'hsl(210 20% 98%)',
      accent: 'hsl(215 27.9% 16.9%)', accentForeground: 'hsl(210 20% 98%)',
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
      background: 'hsl(220 23% 95%)', foreground: 'hsl(234 16% 35%)',
      primary: 'hsl(266 85% 58%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(197 97% 46%)', accentForeground: 'hsl(0 0% 100%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(240 21% 12%)', foreground: 'hsl(226 64% 88%)',
      primary: 'hsl(267 84% 81%)', primaryForeground: 'hsl(240 21% 15%)',
      accent: 'hsl(189 71% 73%)', accentForeground: 'hsl(240 21% 15%)',
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
      background: 'hsl(36 33% 97%)', foreground: 'hsl(34 16% 9%)',
      primary: 'hsl(30 100% 39%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(31 100% 94%)', accentForeground: 'hsl(30 100% 39%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(24 10% 10%)', foreground: 'hsl(33 16% 89%)',
      primary: 'hsl(26 81% 52%)', primaryForeground: 'hsl(24 10% 10%)',
      accent: 'hsl(33 55% 23%)', accentForeground: 'hsl(26 81% 52%)',
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
      background: 'hsl(38 36% 96%)', foreground: 'hsl(9 28% 19%)',
      primary: 'hsl(123 46% 34%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(122 37% 84%)', accentForeground: 'hsl(124 55% 24%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(133 20% 14%)', foreground: 'hsl(33 27% 92%)',
      primary: 'hsl(122 39% 49%)', primaryForeground: 'hsl(126 51% 8%)',
      accent: 'hsl(123 43% 39%)', accentForeground: 'hsl(33 27% 92%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(0 0% 7%)',
      primary: 'hsl(0 0% 0%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(0 0% 98%)', accentForeground: 'hsl(0 0% 7%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(0 0% 0%)', foreground: 'hsl(0 0% 98%)',
      primary: 'hsl(0 0% 100%)', primaryForeground: 'hsl(0 0% 0%)',
      accent: 'hsl(0 0% 7%)', accentForeground: 'hsl(0 0% 100%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(213 13% 14%)',
      primary: 'hsl(212 92% 45%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(199 100% 93%)', accentForeground: 'hsl(212 92% 45%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(216 28% 7%)', foreground: 'hsl(208 35% 93%)',
      primary: 'hsl(212 100% 67%)', primaryForeground: 'hsl(216 28% 7%)',
      accent: 'hsl(219 80% 23%)', accentForeground: 'hsl(212 100% 67%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(0 11% 9%)',
      primary: 'hsl(141 73% 42%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(145 52% 94%)', accentForeground: 'hsl(141 73% 42%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(0 0% 7%)', foreground: 'hsl(0 0% 100%)',
      primary: 'hsl(141 73% 42%)', primaryForeground: 'hsl(0 0% 0%)',
      accent: 'hsl(144 36% 11%)', accentForeground: 'hsl(141 73% 42%)',
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
      background: 'hsl(0 0% 80%)', foreground: 'hsl(0 0% 12%)',
      primary: 'hsl(0 84% 41%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(210 33% 50%)', accentForeground: 'hsl(0 0% 100%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(0 0% 10%)', foreground: 'hsl(0 0% 88%)',
      primary: 'hsl(0 72% 55%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(210 48% 68%)', accentForeground: 'hsl(0 0% 0%)',
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
      background: 'hsl(220 20% 97%)', foreground: 'hsl(222 47% 11%)',
      primary: 'hsl(294 87% 57%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(175 100% 45%)', accentForeground: 'hsl(0 0% 100%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(240 23% 5%)', foreground: 'hsl(205 80% 80%)',
      primary: 'hsl(306 100% 69%)', primaryForeground: 'hsl(240 23% 5%)',
      accent: 'hsl(172 100% 50%)', accentForeground: 'hsl(240 23% 5%)',
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
      background: 'hsl(0 0% 100%)', foreground: 'hsl(0 0% 0%)',
      primary: 'hsl(23 97% 46%)', primaryForeground: 'hsl(0 0% 100%)',
      accent: 'hsl(217 91% 60%)', accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 0% 0%)',
      input: 'hsl(0 0% 0%)',
    },
    dark: {
      ...darkSharedTokens,
      background: 'hsl(0 0% 0%)', foreground: 'hsl(0 0% 100%)',
      primary: 'hsl(25 95% 53%)', primaryForeground: 'hsl(0 0% 0%)',
      accent: 'hsl(239 84% 67%)', accentForeground: 'hsl(0 0% 0%)',
      border: 'hsl(0 0% 100%)',
      input: 'hsl(0 0% 100%)',
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

// ─── Schema & validation ───────────────────────────────────────────────────────

/**
 * Strict colour grammar validator — delegates to normalizeThemeColor.
 * A value is safe iff normalizeThemeColor returns a non-null canonical string.
 * Length cap is the only additional constraint.
 */
function isSafeThemeColor(value) {
  if (typeof value !== 'string' || value.length > MAX_THEME_STRING_LENGTH) return false
  return normalizeThemeColor(value) !== null
}

/**
 * Legacy bare-triple check — kept for v1 migration input only.
 * New code should use isSafeThemeColor.
 */
function isSafeThemeString(value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH &&
    /^[\d.]+(?:\s+\d+(?:\.\d+)?%?){2}$/.test(value)
}

function isSafeRadius(value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH &&
    /^(?:0|1(?:\.\d+)?|0\.\d+)rem$/.test(value)
}

function isKnownThemeValue(allowlist, value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH &&
    Object.hasOwn(allowlist, value)
}

/**
 * Legacy documents (v1/v2) stored bare HSL channel triples; v3 stores complete
 * colours. A legacy colour is therefore either a safe channel triple or an
 * already-complete colour. Both grammars stay strict — neither is a passthrough.
 */
function isSafeLegacyColor(value) {
  return isSafeThemeString(value) || isSafeThemeColor(value)
}

/**
 * Strict preset existence check. getThemePreset deliberately falls back to the
 * default preset for rendering, so it can never serve as a validation guard:
 * `!getThemePreset(id)` is always false, even for an unknown id.
 */
function isKnownThemePreset(id) {
  return THEME_PRESETS.some((preset) => preset.id === id)
}

/**
 * Shape checks shared by every schema version. Enforced for migrated documents too,
 * so accepting an older version never means accepting a laxer document.
 */
function hasThemeShape(value, version) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  if (value.version !== version || !isKnownThemePreset(value.presetId)) return false
  if (Object.keys(value).some((key) => !['version', 'presetId', 'overrides'].includes(key))) return false
  const overrides = value.overrides
  return Boolean(overrides) && typeof overrides === 'object' && !Array.isArray(overrides)
}

/** v1 document: one `font` slot and channel-triple colours. */
function isValidV1ThemeObject(value) {
  if (!hasThemeShape(value, 1)) return false
  const { overrides } = value
  return Object.keys(overrides).every((key) => ['primary', 'accent', 'radius', 'font', 'shadow'].includes(key))
    && (overrides.primary == null || isSafeLegacyColor(overrides.primary))
    && (overrides.accent == null || isSafeLegacyColor(overrides.accent))
    && (overrides.radius == null || isSafeRadius(overrides.radius))
    && (overrides.font == null || isKnownThemeValue(THEME_FONTS, overrides.font))
    && (overrides.shadow == null || isKnownThemeValue(THEME_SHADOWS, overrides.shadow))
}

/** v2 document: three font slots and channel-triple colours. */
function isValidV2ThemeObject(value) {
  if (!hasThemeShape(value, 2)) return false
  const { overrides } = value
  return Object.keys(overrides).every((key) => ['primary', 'accent', 'radius', 'sans', 'serif', 'mono', 'shadow'].includes(key))
    && (overrides.primary == null || isSafeLegacyColor(overrides.primary))
    && (overrides.accent == null || isSafeLegacyColor(overrides.accent))
    && (overrides.radius == null || isSafeRadius(overrides.radius))
    && (overrides.sans == null || isKnownThemeValue(THEME_FONTS, overrides.sans))
    && (overrides.serif == null || isKnownThemeValue(THEME_FONTS, overrides.serif))
    && (overrides.mono == null || isKnownThemeValue(THEME_FONTS, overrides.mono))
    && (overrides.shadow == null || isKnownThemeValue(THEME_SHADOWS, overrides.shadow))
}

/** Validate a v3 theme object (native validation — no migration needed). */
function isValidThemeObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
    value.version !== THEME_SCHEMA_VERSION || !isKnownThemePreset(value.presetId)) return false
  if (Object.keys(value).some((key) => !['version', 'presetId', 'overrides'].includes(key))) return false
  const overrides = value.overrides
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) return false
  return Object.keys(overrides).every((key) =>
    ['primary', 'accent', 'radius', 'sans', 'serif', 'mono', 'shadow'].includes(key)
  ) && (
    (overrides.primary == null || isSafeThemeColor(overrides.primary)) &&
    (overrides.accent == null || isSafeThemeColor(overrides.accent)) &&
    (overrides.radius == null || isSafeRadius(overrides.radius)) &&
    (overrides.sans == null || isKnownThemeValue(THEME_FONTS, overrides.sans)) &&
    (overrides.serif == null || isKnownThemeValue(THEME_FONTS, overrides.serif)) &&
    (overrides.mono == null || isKnownThemeValue(THEME_FONTS, overrides.mono)) &&
    (overrides.shadow == null || isKnownThemeValue(THEME_SHADOWS, overrides.shadow))
  )
}

/**
 * Ordered migration chain. v1 → v2 (single `font` slot → `sans`) → v3 (channel
 * triple → complete colour). Callers validate the document first: migration maps
 * fields, it never decides what is acceptable.
 */
function migrateV2ThemeState(v2) {
  const overrides = { ...v2.overrides }
  if (overrides.primary != null) overrides.primary = normalizeThemeColor(overrides.primary)
  if (overrides.accent != null) overrides.accent = normalizeThemeColor(overrides.accent)
  return createThemeState(v2.presetId, overrides)
}

export function migrateThemeState(v1) {
  const overrides = { ...v1.overrides }
  if (overrides.font != null) {
    overrides.sans = overrides.font
    delete overrides.font
  }
  return migrateV2ThemeState({ ...v1, version: 2, overrides })
}

export function createThemeState(presetId = DEFAULT_THEME_ID, overrides = {}) {
  const preset = getThemePreset(presetId)
  return {
    version: THEME_SCHEMA_VERSION,
    presetId: preset.id,
    overrides: {
      // Normalise on write so what reaches setProperty is always a string we produced
      primary: normalizeThemeColor(overrides.primary) ?? null,
      accent: normalizeThemeColor(overrides.accent) ?? null,
      radius: isSafeRadius(overrides.radius) ? overrides.radius : null,
      sans: isKnownThemeValue(THEME_FONTS, overrides.sans) ? overrides.sans : null,
      serif: isKnownThemeValue(THEME_FONTS, overrides.serif) ? overrides.serif : null,
      mono: isKnownThemeValue(THEME_FONTS, overrides.mono) ? overrides.mono : null,
      shadow: isKnownThemeValue(THEME_SHADOWS, overrides.shadow) ? overrides.shadow : null,
    },
  }
}

/**
 * Single resolution path shared by the localStorage read and the file import.
 * A document is accepted only when it is valid for its own schema version; older
 * versions are migrated from there. Returns null to reject: migration never
 * sanitises an invalid document into acceptability.
 */
function resolveThemeSource(parsed) {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
  const { version } = parsed
  if (version === THEME_SCHEMA_VERSION) {
    return isValidThemeObject(parsed) ? createThemeState(parsed.presetId, parsed.overrides) : null
  }
  if (version === 2) return isValidV2ThemeObject(parsed) ? migrateThemeState(parsed) : null
  if (version === 1) return isValidV1ThemeObject(parsed) ? migrateThemeState(parsed) : null
  return null
}

export function parseThemeState(raw) {
  try {
    if (typeof raw !== 'string' || raw.length > MAX_THEME_IMPORT_LENGTH) return createThemeState()
    return resolveThemeSource(JSON.parse(raw)) ?? createThemeState()
  } catch {
    return createThemeState()
  }
}

export function validateThemeImport(raw) {
  try {
    if (typeof raw === 'string' && raw.length > MAX_THEME_IMPORT_LENGTH) {
      return { state: null, error: 'El archivo es demasiado grande.' }
    }
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    const state = resolveThemeSource(parsed)
    if (!state) return { state: null, error: 'El archivo no contiene un tema válido.' }
    return { state, error: null }
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
  const shadow = isKnownThemeValue(THEME_SHADOWS, overrides.shadow) ? overrides.shadow : preset.shadow
  const sans = overrides.sans ?? preset.font ?? 'system'
  const serif = overrides.serif ?? (preset.font === 'mono' ? 'mono' : 'editorial')
  const mono = overrides.mono ?? 'mono'
  return {
    sans,
    serif,
    mono,
    sansFamily: THEME_FONTS[sans],
    serifFamily: THEME_FONTS[serif],
    monoFamily: THEME_FONTS[mono],
    shadow,
    shadowValue: THEME_SHADOWS[shadow],
  }
}


