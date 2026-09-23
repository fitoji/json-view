export const THEME_STORAGE_KEY = 'visortests-theme-v3'
// Pre-v3 storage keys that shipped historically. Read as a boot fallback so a
// saved theme migrates to the current key instead of being silently lost. v2
// never shipped in code, but probing an absent key costs nothing.
export const THEME_LEGACY_STORAGE_KEYS = Object.freeze(['visortests-theme-v1', 'visortests-theme-v2'])

export const THEME_SCHEMA_VERSION = 3

// Web-family names and order match tweakcn's font catalog. `Source Serif 4`
// deliberately replaces tweakcn's dead `Source Serif Pro` entry (Google removed
// Pro from css2; tweakcn's own preload link already loads 4).
export const THEME_FONTS = Object.freeze({
  // Local stacks — no network fetch, referenced directly by presets.
  system: 'ui-sans-serif, system-ui, sans-serif',
  editorial: 'Georgia, Cambria, "Times New Roman", serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  // Sans web families (Google Fonts), falling back to the sans category stack.
  Inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  Roboto: '"Roboto", ui-sans-serif, system-ui, sans-serif',
  'Open Sans': '"Open Sans", ui-sans-serif, system-ui, sans-serif',
  Poppins: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  Montserrat: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  Outfit: '"Outfit", ui-sans-serif, system-ui, sans-serif',
  'Plus Jakarta Sans': '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  'DM Sans': '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  'IBM Plex Sans': '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  Geist: '"Geist", ui-sans-serif, system-ui, sans-serif',
  Oxanium: '"Oxanium", ui-sans-serif, system-ui, sans-serif',
  'Architects Daughter': '"Architects Daughter", ui-sans-serif, system-ui, sans-serif',
  Antic: '"Antic", ui-sans-serif, system-ui, sans-serif',
  Quicksand: '"Quicksand", ui-sans-serif, system-ui, sans-serif',
  // Serif web families (Google Fonts), falling back to the serif category stack.
  Merriweather: '"Merriweather", ui-serif, Georgia, serif',
  'Playfair Display': '"Playfair Display", ui-serif, Georgia, serif',
  Lora: '"Lora", ui-serif, Georgia, serif',
  'Source Serif 4': '"Source Serif 4", ui-serif, Georgia, serif',
  'Libre Baskerville': '"Libre Baskerville", ui-serif, Georgia, serif',
  'Space Grotesk': '"Space Grotesk", ui-serif, Georgia, serif',
  // Monospace web families (Google Fonts), falling back to the mono category stack.
  'JetBrains Mono': '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'Fira Code': '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'Source Code Pro': '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'IBM Plex Mono': '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'Roboto Mono': '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'Space Mono': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'Geist Mono': '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  'Ubuntu Mono': '"Ubuntu Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
})

// Google Fonts css2 `family=` specs for every web family above. Copied verbatim
// from tweakcn's own preload link (authoritative), except IBM Plex Sans, which
// uses the standard spec. Keys are identical to the web-family keys of
// THEME_FONTS; the local stacks (system/editorial/mono) have no entry here by
// design — fontLoader.js only builds URLs from this closed map.
export const WEB_FONT_SPECS = Object.freeze({
  Inter: 'Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900',
  Roboto: 'Roboto:ital,wght@0,100..900;1,100..900',
  'Open Sans': 'Open+Sans:ital,wght@0,300..800;1,300..800',
  Poppins: 'Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900',
  Montserrat: 'Montserrat:ital,wght@0,100..900;1,100..900',
  Outfit: 'Outfit:wght@100..900',
  'Plus Jakarta Sans': 'Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800',
  'DM Sans': 'DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000',
  'IBM Plex Sans': 'IBM+Plex+Sans:ital,wght@0,100..700;1,100..700',
  Geist: 'Geist:wght@100..900',
  Oxanium: 'Oxanium:wght@200..800',
  'Architects Daughter': 'Architects+Daughter',
  Antic: 'Antic',
  Quicksand: 'Quicksand:wght@300..700',
  Merriweather: 'Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900',
  'Playfair Display': 'Playfair+Display:ital,wght@0,400..900;1,400..900',
  Lora: 'Lora:ital,wght@0,400..700;1,400..700',
  'Source Serif 4': 'Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900',
  'Libre Baskerville': 'Libre+Baskerville:ital,wght@0,400;0,700;1,400',
  'Space Grotesk': 'Space+Grotesk:wght@300..700',
  'JetBrains Mono': 'JetBrains+Mono:ital,wght@0,100..800;1,100..800',
  'Fira Code': 'Fira+Code:wght@300..700',
  'Source Code Pro': 'Source+Code+Pro:ital,wght@0,200..900;1,200..900',
  'IBM Plex Mono': 'IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700',
  'Roboto Mono': 'Roboto+Mono:ital,wght@0,100..700;1,100..700',
  'Space Mono': 'Space+Mono:ital,wght@0,400;0,700;1,400;1,700',
  'Geist Mono': 'Geist+Mono:wght@100..900',
  'Ubuntu Mono': 'Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700',
})

// Picker grouping: the first entry of each list is the local stack
// (system/editorial/mono); the rest are Google families loaded on demand.
// Every name is a THEME_FONTS key, and every non-legacy name has a
// WEB_FONT_SPECS entry (cross-checked by tests).
export const THEME_FONT_CATEGORIES = Object.freeze({
  sans: Object.freeze(['system', 'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Outfit', 'Plus Jakarta Sans', 'DM Sans', 'IBM Plex Sans', 'Geist', 'Oxanium', 'Architects Daughter', 'Antic', 'Quicksand']),
  serif: Object.freeze(['editorial', 'Merriweather', 'Playfair Display', 'Lora', 'Source Serif 4', 'Libre Baskerville', 'Space Grotesk']),
  mono: Object.freeze(['mono', 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'IBM Plex Mono', 'Roboto Mono', 'Space Mono', 'Geist Mono', 'Ubuntu Mono']),
})

export const THEME_SHADOWS = Object.freeze({
  none: 'none',
  soft: '0 10px 30px -12px hsl(222 47% 11% / 0.28)',
  crisp: '0 4px 0 hsl(222 47% 11% / 0.16)',
})

// Default no-op values for the optional v3 style tokens. Every preset renders
// identically when the overrides are absent: spacing matches Tailwind v4's
// default --spacing and letterSpacing adds nothing to the tracking scale.
export const THEME_DEFAULT_SPACING = '0.25rem'
export const THEME_DEFAULT_LETTER_SPACING = '0em'

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
  card: 'hsl(0 0% 99%)',
  cardForeground: 'hsl(222.2 84% 4.9%)',
  popover: 'hsl(0 0% 99%)',
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
      card: 'hsl(160 8% 99%)', popover: 'hsl(160 8% 99%)',
      background: 'hsl(160 8% 97%)', foreground: 'hsl(222.2 84% 4.9%)',
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
      card: 'hsl(204 8% 99%)', popover: 'hsl(204 8% 99%)',
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
      card: 'hsl(30 8% 99%)', popover: 'hsl(30 8% 99%)',
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
      card: 'hsl(222 6% 99%)', popover: 'hsl(222 6% 99%)',
      background: 'hsl(222 6% 97%)', foreground: 'hsl(222.2 84% 4.9%)',
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
      card: 'hsl(24 5% 99%)', popover: 'hsl(24 5% 99%)',
      background: 'hsl(24 5% 97%)', foreground: 'hsl(20 14.3% 4.1%)',
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
      card: 'hsl(221 4% 99%)', popover: 'hsl(221 4% 99%)',
      background: 'hsl(221 4% 97%)', foreground: 'hsl(224 71.4% 4.1%)',
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
      card: 'hsl(0 5% 99%)', popover: 'hsl(0 5% 99%)',
      background: 'hsl(0 5% 97%)', foreground: 'hsl(0 0% 3.9%)',
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
      card: 'hsl(347 5% 99%)', popover: 'hsl(347 5% 99%)',
      background: 'hsl(347 5% 97%)', foreground: 'hsl(240 10% 3.9%)',
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
      card: 'hsl(25 6% 99%)', popover: 'hsl(25 6% 99%)',
      background: 'hsl(25 6% 97%)', foreground: 'hsl(20 14.3% 4.1%)',
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
      card: 'hsl(142 5% 99%)', popover: 'hsl(142 5% 99%)',
      background: 'hsl(142 5% 97%)', foreground: 'hsl(240 10% 3.9%)',
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
      card: 'hsl(221 6% 99%)', popover: 'hsl(221 6% 99%)',
      background: 'hsl(221 6% 97%)', foreground: 'hsl(222.2 84% 4.9%)',
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
      card: 'hsl(48 8% 99%)', popover: 'hsl(48 8% 99%)',
      background: 'hsl(48 8% 97%)', foreground: 'hsl(20 14.3% 4.1%)',
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
      card: 'hsl(262 6% 99%)', popover: 'hsl(262 6% 99%)',
      background: 'hsl(262 6% 97%)', foreground: 'hsl(224 71.4% 4.1%)',
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
      card: 'hsl(266 6% 98%)', popover: 'hsl(266 6% 98%)',
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
      card: 'hsl(30 5% 98%)', popover: 'hsl(30 5% 98%)',
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
      card: 'hsl(123 5% 98%)', popover: 'hsl(123 5% 98%)',
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
      card: 'hsl(0 0% 4%)', popover: 'hsl(0 0% 3%)',
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
      card: 'hsl(212 6% 99%)', popover: 'hsl(212 6% 99%)',
      background: 'hsl(212 6% 97%)', foreground: 'hsl(213 13% 14%)',
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
      card: 'hsl(141 6% 99%)', popover: 'hsl(141 6% 99%)',
      background: 'hsl(141 6% 97%)', foreground: 'hsl(0 11% 9%)',
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
      card: 'hsl(0 4% 99%)', popover: 'hsl(0 4% 99%)',
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
      card: 'hsl(294 6% 98%)', popover: 'hsl(294 6% 98%)',
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
      card: 'hsl(0 0% 4%)', popover: 'hsl(0 0% 3%)',
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

  // ─── tweakcn ports ────────────────────────────────────────────────────────
  // The 25 built-in tweakcn presets, converted deterministically from the
  // reference snapshot (2026-09-22). Overlap tokens only (chart/sidebar skipped),
  // kebab keys camelCased, hex colours verbatim; per-slot font objects; optional
  // preset letterSpacing. radius is omitted where the source value (0px) fails
  // the rem grammar, falling back to engine default behaviour.
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Ported from tweakcn — Modern Minimal',
    light: {
      ...sharedTokens,
      background: 'hsl(217 6% 98%)', foreground: '#333333',
      card: 'hsl(217 6% 99%)', cardForeground: '#333333',
      popover: 'hsl(217 6% 99%)', popoverForeground: '#333333',
      primary: '#3b82f6', primaryForeground: '#ffffff',
      secondary: '#f3f4f6', secondaryForeground: '#4b5563',
      muted: '#f9fafb', mutedForeground: '#6b7280',
      accent: '#e0f2fe', accentForeground: '#1e3a8a',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#e5e7eb', input: '#e5e7eb',
      ring: '#3b82f6',
    },
    dark: {
      ...darkSharedTokens,
      background: '#171717', foreground: '#e5e5e5',
      card: '#262626', cardForeground: '#e5e5e5',
      popover: '#262626', popoverForeground: '#e5e5e5',
      primary: '#3b82f6', primaryForeground: '#ffffff',
      secondary: '#262626', secondaryForeground: '#e5e5e5',
      muted: '#1f1f1f', mutedForeground: '#a3a3a3',
      accent: '#1e3a8a', accentForeground: '#bfdbfe',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#404040', input: '#404040',
      ring: '#3b82f6',
    },
    radius: '0.375rem',
    font: { sans: 'Inter', serif: 'Source Serif 4', mono: 'JetBrains Mono' },
    shadow: 'soft',
  },
  {
    id: 'violet-bloom',
    name: 'Violet Bloom',
    description: 'Ported from tweakcn — Violet Bloom',
    light: {
      ...sharedTokens,
      background: '#fdfdfd', foreground: '#000000',
      card: '#fdfdfd', cardForeground: '#000000',
      popover: '#fcfcfc', popoverForeground: '#000000',
      primary: '#7033ff', primaryForeground: '#ffffff',
      secondary: '#edf0f4', secondaryForeground: '#080808',
      muted: '#f5f5f5', mutedForeground: '#525252',
      accent: '#e2ebff', accentForeground: '#1e69dc',
      destructive: '#e54b4f', destructiveForeground: '#ffffff',
      border: '#e7e7ee', input: '#ebebeb',
      ring: '#000000',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1a1b1e', foreground: '#f0f0f0',
      card: '#222327', cardForeground: '#f0f0f0',
      popover: '#222327', popoverForeground: '#f0f0f0',
      primary: '#8c5cff', primaryForeground: '#ffffff',
      secondary: '#2a2c33', secondaryForeground: '#f0f0f0',
      muted: '#2a2c33', mutedForeground: '#a0a0a0',
      accent: '#1e293b', accentForeground: '#79c0ff',
      destructive: '#f87171', destructiveForeground: '#ffffff',
      border: '#33353a', input: '#33353a',
      ring: '#8c5cff',
    },
    radius: '1.4rem',
    font: { sans: 'Plus Jakarta Sans', serif: 'Lora', mono: 'IBM Plex Mono' },
    letterSpacing: '-0.025em',
    shadow: 'soft',
  },
  {
    id: 't3-chat',
    name: 'T3 Chat',
    description: 'Ported from tweakcn — T3 Chat',
    light: {
      ...sharedTokens,
      background: '#faf5fa', foreground: '#501854',
      card: '#faf5fa', cardForeground: '#501854',
      popover: 'hsl(333 22% 98%)', popoverForeground: '#501854',
      primary: '#a84370', primaryForeground: '#ffffff',
      secondary: '#f1c4e6', secondaryForeground: '#77347c',
      muted: '#f6e5f3', mutedForeground: '#834588',
      accent: '#f1c4e6', accentForeground: '#77347c',
      destructive: '#ab4347', destructiveForeground: '#ffffff',
      border: '#efbdeb', input: '#e7c1dc',
      ring: '#db2777',
    },
    dark: {
      ...darkSharedTokens,
      background: '#221d27', foreground: '#d2c4de',
      card: '#2c2632', cardForeground: '#dbc5d2',
      popover: '#100a0e', popoverForeground: '#f8f1f5',
      primary: '#a3004c', primaryForeground: '#efc0d8',
      secondary: '#362d3d', secondaryForeground: '#d4c7e1',
      muted: '#28222d', mutedForeground: '#c2b6cf',
      accent: '#463753', accentForeground: '#f8f1f5',
      destructive: '#301015', destructiveForeground: '#ffffff',
      border: '#3b3237', input: '#3e343c',
      ring: '#db2777',
    },
    radius: '0.5rem',
    shadow: 'soft',
  },
  {
    id: 'mocha-mousse',
    name: 'Mocha Mousse',
    description: 'Ported from tweakcn — Mocha Mousse',
    light: {
      ...sharedTokens,
      background: '#F1F0E5', foreground: '#56453F',
      card: '#F1F0E5', cardForeground: '#56453F',
      popover: 'hsl(55 12% 98%)', popoverForeground: '#56453F',
      primary: '#A37764', primaryForeground: '#FFFFFF',
      secondary: '#BAAB92', secondaryForeground: '#ffffff',
      muted: '#E4C7B8', mutedForeground: '#8A655A',
      accent: '#E4C7B8', accentForeground: '#56453F',
      destructive: '#1f1a17', destructiveForeground: '#FFFFFF',
      border: '#BAAB92', input: '#BAAB92',
      ring: '#A37764',
    },
    dark: {
      ...darkSharedTokens,
      background: '#2d2521', foreground: '#F1F0E5',
      card: '#3c332e', cardForeground: '#F1F0E5',
      popover: '#3c332e', popoverForeground: '#F1F0E5',
      primary: '#C39E88', primaryForeground: '#2d2521',
      secondary: '#8A655A', secondaryForeground: '#F1F0E5',
      muted: '#56453F', mutedForeground: '#c5aa9b',
      accent: '#BAAB92', accentForeground: '#2d2521',
      destructive: '#E57373', destructiveForeground: '#2d2521',
      border: '#56453F', input: '#56453F',
      ring: '#C39E88',
    },
    radius: '0.5rem',
    font: { sans: 'DM Sans', serif: 'editorial', mono: 'mono' },
    shadow: 'soft',
  },
  {
    id: 'amethyst-haze',
    name: 'Amethyst Haze',
    description: 'Ported from tweakcn — Amethyst Haze',
    light: {
      ...sharedTokens,
      background: '#f8f7fa', foreground: '#3d3c4f',
      card: 'hsl(260 6% 98%)', cardForeground: '#3d3c4f',
      popover: 'hsl(260 6% 98%)', popoverForeground: '#3d3c4f',
      primary: '#8a79ab', primaryForeground: '#f8f7fa',
      secondary: '#dfd9ec', secondaryForeground: '#3d3c4f',
      muted: '#dcd9e3', mutedForeground: '#6b6880',
      accent: '#e6a5b8', accentForeground: '#4b2e36',
      destructive: '#d95c5c', destructiveForeground: '#f8f7fa',
      border: '#cec9d9', input: '#eae7f0',
      ring: '#8a79ab',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1a1823', foreground: '#e0ddef',
      card: '#232030', cardForeground: '#e0ddef',
      popover: '#232030', popoverForeground: '#e0ddef',
      primary: '#a995c9', primaryForeground: '#1a1823',
      secondary: '#5a5370', secondaryForeground: '#e0ddef',
      muted: '#242031', mutedForeground: '#a09aad',
      accent: '#372e3f', accentForeground: '#f2b8c6',
      destructive: '#e57373', destructiveForeground: '#1a1823',
      border: '#302c40', input: '#2a273a',
      ring: '#a995c9',
    },
    radius: '0.5rem',
    font: { sans: 'Geist', serif: 'Lora', mono: 'Fira Code' },
    shadow: 'soft',
  },
  {
    id: 'doom-64',
    name: 'Doom 64',
    description: 'Ported from tweakcn — Doom 64',
    light: {
      ...sharedTokens,
      background: '#cccccc', foreground: '#1f1f1f',
      card: '#b0b0b0', cardForeground: '#1f1f1f',
      popover: '#b0b0b0', popoverForeground: '#1f1f1f',
      primary: '#b71c1c', primaryForeground: '#ffffff',
      secondary: '#556b2f', secondaryForeground: '#ffffff',
      muted: '#b8b8b8', mutedForeground: '#4a4a4a',
      accent: '#4682b4', accentForeground: '#ffffff',
      destructive: '#ff6f00', destructiveForeground: '#000000',
      border: '#505050', input: '#505050',
      ring: '#b71c1c',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1a1a1a', foreground: '#e0e0e0',
      card: '#2a2a2a', cardForeground: '#e0e0e0',
      popover: '#2a2a2a', popoverForeground: '#e0e0e0',
      primary: '#e53935', primaryForeground: '#ffffff',
      secondary: '#689f38', secondaryForeground: '#000000',
      muted: '#252525', mutedForeground: '#a0a0a0',
      accent: '#64b5f6', accentForeground: '#000000',
      destructive: '#ffa000', destructiveForeground: '#000000',
      border: '#4a4a4a', input: '#4a4a4a',
      ring: '#e53935',
    },
    font: { sans: 'Oxanium', serif: 'editorial', mono: 'Source Code Pro' },
    shadow: 'soft',
  },
  {
    id: 'kodama-grove',
    name: 'Kodama Grove',
    description: 'Ported from tweakcn — Kodama Grove',
    light: {
      ...sharedTokens,
      background: '#e4d7b0', foreground: '#5c4b3e',
      card: '#e7dbbf', cardForeground: '#5c4b3e',
      popover: '#f3ead2', popoverForeground: '#5c4b3e',
      primary: '#8d9d4f', primaryForeground: '#fdfbf6',
      secondary: '#decea0', secondaryForeground: '#5c4b3e',
      muted: '#decea0', mutedForeground: '#85766a',
      accent: '#dbc894', accentForeground: '#5c4b3e',
      destructive: '#d98b7e', destructiveForeground: '#faf8f2',
      border: '#b19681', input: '#dbc894',
      ring: '#9db18c',
    },
    dark: {
      ...darkSharedTokens,
      background: '#3a3529', foreground: '#ede4d4',
      card: '#413c33', cardForeground: '#ede4d4',
      popover: '#413c33', popoverForeground: '#ede4d4',
      primary: '#8a9f7b', primaryForeground: '#2a2521',
      secondary: '#5a5345', secondaryForeground: '#ede4d4',
      muted: '#4a4439', mutedForeground: '#a8a096',
      accent: '#a18f5c', accentForeground: '#2a2521',
      destructive: '#b5766a', destructiveForeground: '#f0e9db',
      border: '#5a5345', input: '#5a5345',
      ring: '#8a9f7b',
    },
    radius: '0.425rem',
    font: { sans: 'Merriweather', serif: 'Source Serif 4', mono: 'JetBrains Mono' },
    shadow: 'soft',
  },
  {
    id: 'cosmic-night',
    name: 'Cosmic Night',
    description: 'Ported from tweakcn — Cosmic Night',
    light: {
      ...sharedTokens,
      background: '#f5f5ff', foreground: '#2a2a4a',
      card: 'hsl(250 8% 98%)', cardForeground: '#2a2a4a',
      popover: 'hsl(250 8% 98%)', popoverForeground: '#2a2a4a',
      primary: '#6e56cf', primaryForeground: '#ffffff',
      secondary: '#e4dfff', secondaryForeground: '#4a4080',
      muted: '#f0f0fa', mutedForeground: '#6c6c8a',
      accent: '#d8e6ff', accentForeground: '#2a2a4a',
      destructive: '#ff5470', destructiveForeground: '#ffffff',
      border: '#e0e0f0', input: '#e0e0f0',
      ring: '#6e56cf',
    },
    dark: {
      ...darkSharedTokens,
      background: '#0f0f1a', foreground: '#e2e2f5',
      card: '#1a1a2e', cardForeground: '#e2e2f5',
      popover: '#1a1a2e', popoverForeground: '#e2e2f5',
      primary: '#a48fff', primaryForeground: '#0f0f1a',
      secondary: '#2d2b55', secondaryForeground: '#c4c2ff',
      muted: '#222244', mutedForeground: '#a0a0c0',
      accent: '#303060', accentForeground: '#e2e2f5',
      destructive: '#ff5470', destructiveForeground: '#ffffff',
      border: '#303052', input: '#303052',
      ring: '#a48fff',
    },
    radius: '0.5rem',
    font: { sans: 'Inter', serif: 'editorial', mono: 'JetBrains Mono' },
    shadow: 'soft',
  },
  {
    id: 'quantum-rose',
    name: 'Quantum Rose',
    description: 'Ported from tweakcn — Quantum Rose',
    light: {
      ...sharedTokens,
      background: '#fff0f8', foreground: '#91185c',
      card: '#fff7fc', cardForeground: '#91185c',
      popover: '#fff7fc', popoverForeground: '#91185c',
      primary: '#e6067a', primaryForeground: '#ffffff',
      secondary: '#ffd6ff', secondaryForeground: '#91185c',
      muted: '#ffe3f2', mutedForeground: '#c04283',
      accent: '#ffc1e3', accentForeground: '#91185c',
      destructive: '#d13869', destructiveForeground: '#ffffff',
      border: '#ffc7e6', input: '#ffd6ff',
      ring: '#e6067a',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1a0922', foreground: '#ffb3ff',
      card: '#2a1435', cardForeground: '#ffb3ff',
      popover: '#2a1435', popoverForeground: '#ffb3ff',
      primary: '#ff6bef', primaryForeground: '#180518',
      secondary: '#46204f', secondaryForeground: '#ffb3ff',
      muted: '#331941', mutedForeground: '#d67ad6',
      accent: '#5a1f5d', accentForeground: '#ffb3ff',
      destructive: '#ff2876', destructiveForeground: '#f9f9f9',
      border: '#4a1b5f', input: '#46204f',
      ring: '#ff6bef',
    },
    radius: '0.5rem',
    font: { sans: 'Poppins', serif: 'Playfair Display', mono: 'Space Mono' },
    shadow: 'soft',
  },
  {
    id: 'bold-tech',
    name: 'Bold Tech',
    description: 'Ported from tweakcn — Bold Tech',
    light: {
      ...sharedTokens,
      background: 'hsl(258 7% 98%)', foreground: '#312e81',
      card: 'hsl(258 7% 99%)', cardForeground: '#312e81',
      popover: 'hsl(258 7% 99%)', popoverForeground: '#312e81',
      primary: '#8b5cf6', primaryForeground: '#ffffff',
      secondary: '#f3f0ff', secondaryForeground: '#4338ca',
      muted: '#f5f3ff', mutedForeground: '#7c3aed',
      accent: '#dbeafe', accentForeground: '#1e40af',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#e0e7ff', input: '#e0e7ff',
      ring: '#8b5cf6',
    },
    dark: {
      ...darkSharedTokens,
      background: '#0f172a', foreground: '#e0e7ff',
      card: '#1e1b4b', cardForeground: '#e0e7ff',
      popover: '#1e1b4b', popoverForeground: '#e0e7ff',
      primary: '#8b5cf6', primaryForeground: '#ffffff',
      secondary: '#1e1b4b', secondaryForeground: '#e0e7ff',
      muted: '#171447', mutedForeground: '#c4b5fd',
      accent: '#4338ca', accentForeground: '#e0e7ff',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#2e1065', input: '#2e1065',
      ring: '#8b5cf6',
    },
    radius: '0.625rem',
    font: { sans: 'Roboto', serif: 'Playfair Display', mono: 'Fira Code' },
    shadow: 'soft',
  },
  {
    id: 'elegant-luxury',
    name: 'Elegant Luxury',
    description: 'Ported from tweakcn — Elegant Luxury',
    light: {
      ...sharedTokens,
      background: '#faf7f5', foreground: '#1a1a1a',
      card: '#faf7f5', cardForeground: '#1a1a1a',
      popover: '#faf7f5', popoverForeground: '#1a1a1a',
      primary: '#9b2c2c', primaryForeground: '#ffffff',
      secondary: '#fdf2d6', secondaryForeground: '#805500',
      muted: '#f0ebe8', mutedForeground: '#57534e',
      accent: '#fef3c7', accentForeground: '#7f1d1d',
      destructive: '#991b1b', destructiveForeground: '#ffffff',
      border: '#f5e8d2', input: '#f5e8d2',
      ring: '#9b2c2c',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1c1917', foreground: '#f5f5f4',
      card: '#292524', cardForeground: '#f5f5f4',
      popover: '#292524', popoverForeground: '#f5f5f4',
      primary: '#b91c1c', primaryForeground: '#faf7f5',
      secondary: '#92400e', secondaryForeground: '#fef3c7',
      muted: '#1f1c1a', mutedForeground: '#d6d3d1',
      accent: '#b45309', accentForeground: '#fef3c7',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#44403c', input: '#44403c',
      ring: '#b91c1c',
    },
    radius: '0.375rem',
    font: { sans: 'Poppins', serif: 'Libre Baskerville', mono: 'IBM Plex Mono' },
    shadow: 'soft',
  },
  {
    id: 'amber-minimal',
    name: 'Amber Minimal',
    description: 'Ported from tweakcn — Amber Minimal',
    light: {
      ...sharedTokens,
      background: 'hsl(38 8% 98%)', foreground: '#262626',
      card: 'hsl(38 8% 99%)', cardForeground: '#262626',
      popover: 'hsl(38 8% 99%)', popoverForeground: '#262626',
      primary: '#f59e0b', primaryForeground: '#000000',
      secondary: '#f3f4f6', secondaryForeground: '#4b5563',
      muted: '#f9fafb', mutedForeground: '#6b7280',
      accent: '#fffbeb', accentForeground: '#92400e',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#e5e7eb', input: '#e5e7eb',
      ring: '#f59e0b',
    },
    dark: {
      ...darkSharedTokens,
      background: '#171717', foreground: '#e5e5e5',
      card: '#262626', cardForeground: '#e5e5e5',
      popover: '#262626', popoverForeground: '#e5e5e5',
      primary: '#f59e0b', primaryForeground: '#000000',
      secondary: '#262626', secondaryForeground: '#e5e5e5',
      muted: '#1f1f1f', mutedForeground: '#a3a3a3',
      accent: '#92400e', accentForeground: '#fde68a',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#404040', input: '#404040',
      ring: '#f59e0b',
    },
    radius: '0.375rem',
    font: { sans: 'Inter', serif: 'Source Serif 4', mono: 'JetBrains Mono' },
    shadow: 'soft',
  },
  {
    id: 'neo-brutalism',
    name: 'Neo Brutalism',
    description: 'Ported from tweakcn — Neo Brutalism',
    light: {
      ...sharedTokens,
      background: '#ffffff', foreground: '#000000',
      card: '#ffffff', cardForeground: '#000000',
      popover: '#ffffff', popoverForeground: '#000000',
      primary: '#ff3333', primaryForeground: '#ffffff',
      secondary: '#ffff00', secondaryForeground: '#000000',
      muted: '#f0f0f0', mutedForeground: '#333333',
      accent: '#0066ff', accentForeground: '#ffffff',
      destructive: '#000000', destructiveForeground: '#ffffff',
      border: '#000000', input: '#000000',
      ring: '#ff3333',
    },
    dark: {
      ...darkSharedTokens,
      background: '#000000', foreground: '#ffffff',
      card: '#333333', cardForeground: '#ffffff',
      popover: '#333333', popoverForeground: '#ffffff',
      primary: '#ff6666', primaryForeground: '#000000',
      secondary: '#ffff33', secondaryForeground: '#000000',
      muted: '#1a1a1a', mutedForeground: '#cccccc',
      accent: '#3399ff', accentForeground: '#000000',
      destructive: '#ffffff', destructiveForeground: '#000000',
      border: '#ffffff', input: '#ffffff',
      ring: '#ff6666',
    },
    font: { sans: 'DM Sans', serif: 'editorial', mono: 'Space Mono' },
    shadow: 'crisp',
  },
  {
    id: 'solar-dusk',
    name: 'Solar Dusk',
    description: 'Ported from tweakcn — Solar Dusk',
    light: {
      ...sharedTokens,
      background: '#FDFBF7', foreground: '#4A3B33',
      card: '#F8F4EE', cardForeground: '#4A3B33',
      popover: '#F8F4EE', popoverForeground: '#4A3B33',
      primary: '#B45309', primaryForeground: '#FFFFFF',
      secondary: '#E4C090', secondaryForeground: '#57534E',
      muted: '#F1E9DA', mutedForeground: '#78716C',
      accent: '#f2daba', accentForeground: '#57534E',
      destructive: '#991B1B', destructiveForeground: '#FFFFFF',
      border: '#E4D9BC', input: '#E4D9BC',
      ring: '#B45309',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1C1917', foreground: '#F5F5F4',
      card: '#292524', cardForeground: '#F5F5F4',
      popover: '#292524', popoverForeground: '#F5F5F4',
      primary: '#F97316', primaryForeground: '#FFFFFF',
      secondary: '#57534E', secondaryForeground: '#E7E5E4',
      muted: '#201d1a', mutedForeground: '#A8A29E',
      accent: '#1e4252', accentForeground: '#E7E5E4',
      destructive: '#DC2626', destructiveForeground: '#FFFFFF',
      border: '#44403C', input: '#44403C',
      ring: '#F97316',
    },
    radius: '0.3rem',
    font: { sans: 'Oxanium', serif: 'Merriweather', mono: 'Fira Code' },
    shadow: 'soft',
  },
  {
    id: 'pastel-dreams',
    name: 'Pastel Dreams',
    description: 'Ported from tweakcn — Pastel Dreams',
    light: {
      ...sharedTokens,
      background: '#f7f3f9', foreground: '#374151',
      card: 'hsl(258 8% 98%)', cardForeground: '#374151',
      popover: 'hsl(258 8% 98%)', popoverForeground: '#374151',
      primary: '#a78bfa', primaryForeground: '#ffffff',
      secondary: '#e9d8fd', secondaryForeground: '#4b5563',
      muted: '#f3e8ff', mutedForeground: '#6b7280',
      accent: '#f3e5f5', accentForeground: '#374151',
      destructive: '#fca5a5', destructiveForeground: '#ffffff',
      border: '#e9d8fd', input: '#e9d8fd',
      ring: '#a78bfa',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1c1917', foreground: '#e0e7ff',
      card: '#2d2535', cardForeground: '#e0e7ff',
      popover: '#2d2535', popoverForeground: '#e0e7ff',
      primary: '#c0aafd', primaryForeground: '#1c1917',
      secondary: '#3f324a', secondaryForeground: '#d1d5db',
      muted: '#20182b', mutedForeground: '#9ca3af',
      accent: '#4a3d5a', accentForeground: '#d1d5db',
      destructive: '#fca5a5', destructiveForeground: '#1c1917',
      border: '#3f324a', input: '#3f324a',
      ring: '#c0aafd',
    },
    radius: '1.5rem',
    font: { sans: 'Open Sans', serif: 'Source Serif 4', mono: 'IBM Plex Mono' },
    shadow: 'soft',
  },
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    description: 'Ported from tweakcn — Clean Slate',
    light: {
      ...sharedTokens,
      background: '#f8fafc', foreground: '#1e293b',
      card: 'hsl(234 6% 98%)', cardForeground: '#1e293b',
      popover: 'hsl(234 6% 98%)', popoverForeground: '#1e293b',
      primary: '#6366f1', primaryForeground: '#ffffff',
      secondary: '#e5e7eb', secondaryForeground: '#374151',
      muted: '#f3f4f6', mutedForeground: '#6b7280',
      accent: '#e0e7ff', accentForeground: '#374151',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#d1d5db', input: '#d1d5db',
      ring: '#6366f1',
    },
    dark: {
      ...darkSharedTokens,
      background: '#0f172a', foreground: '#e2e8f0',
      card: '#1e293b', cardForeground: '#e2e8f0',
      popover: '#1e293b', popoverForeground: '#e2e8f0',
      primary: '#818cf8', primaryForeground: '#0f172a',
      secondary: '#2d3748', secondaryForeground: '#d1d5db',
      muted: '#152032', mutedForeground: '#9ca3af',
      accent: '#374151', accentForeground: '#d1d5db',
      destructive: '#ef4444', destructiveForeground: '#0f172a',
      border: '#4b5563', input: '#4b5563',
      ring: '#818cf8',
    },
    radius: '0.5rem',
    font: { sans: 'Inter', serif: 'Merriweather', mono: 'JetBrains Mono' },
    shadow: 'soft',
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Ported from tweakcn — Ocean Breeze',
    light: {
      ...sharedTokens,
      background: '#f0f8ff', foreground: '#374151',
      card: 'hsl(140 6% 98%)', cardForeground: '#374151',
      popover: 'hsl(140 6% 98%)', popoverForeground: '#374151',
      primary: '#22c55e', primaryForeground: '#ffffff',
      secondary: '#e0f2fe', secondaryForeground: '#4b5563',
      muted: '#f3f4f6', mutedForeground: '#6b7280',
      accent: '#d1fae5', accentForeground: '#374151',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#e5e7eb', input: '#e5e7eb',
      ring: '#22c55e',
    },
    dark: {
      ...darkSharedTokens,
      background: '#0f172a', foreground: '#d1d5db',
      card: '#1e293b', cardForeground: '#d1d5db',
      popover: '#1e293b', popoverForeground: '#d1d5db',
      primary: '#34d399', primaryForeground: '#0f172a',
      secondary: '#2d3748', secondaryForeground: '#a1a1aa',
      muted: '#19212e', mutedForeground: '#6b7280',
      accent: '#374151', accentForeground: '#a1a1aa',
      destructive: '#ef4444', destructiveForeground: '#0f172a',
      border: '#4b5563', input: '#4b5563',
      ring: '#34d399',
    },
    radius: '0.5rem',
    font: { sans: 'DM Sans', serif: 'Lora', mono: 'IBM Plex Mono' },
    shadow: 'soft',
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    description: 'Ported from tweakcn — Retro Arcade',
    light: {
      ...sharedTokens,
      background: '#fdf6e3', foreground: '#073642',
      card: '#eee8d5', cardForeground: '#073642',
      popover: '#eee8d5', popoverForeground: '#073642',
      primary: '#d33682', primaryForeground: '#ffffff',
      secondary: '#2aa198', secondaryForeground: '#ffffff',
      muted: '#93a1a1', mutedForeground: '#073642',
      accent: '#cb4b16', accentForeground: '#ffffff',
      destructive: '#dc322f', destructiveForeground: '#ffffff',
      border: '#839496', input: '#839496',
      ring: '#d33682',
    },
    dark: {
      ...darkSharedTokens,
      background: '#002b36', foreground: '#93a1a1',
      card: '#073642', cardForeground: '#93a1a1',
      popover: '#073642', popoverForeground: '#93a1a1',
      primary: '#d33682', primaryForeground: '#ffffff',
      secondary: '#2aa198', secondaryForeground: '#ffffff',
      muted: '#586e75', mutedForeground: '#93a1a1',
      accent: '#cb4b16', accentForeground: '#ffffff',
      destructive: '#dc322f', destructiveForeground: '#ffffff',
      border: '#586e75', input: '#586e75',
      ring: '#d33682',
    },
    radius: '0.25rem',
    font: { sans: 'Outfit', serif: 'editorial', mono: 'Space Mono' },
    shadow: 'soft',
  },
  {
    id: 'midnight-bloom',
    name: 'Midnight Bloom',
    description: 'Ported from tweakcn — Midnight Bloom',
    light: {
      ...sharedTokens,
      background: '#f9f9f9', foreground: '#333333',
      card: 'hsl(250 5% 98%)', cardForeground: '#333333',
      popover: 'hsl(250 5% 98%)', popoverForeground: '#333333',
      primary: '#6c5ce7', primaryForeground: '#ffffff',
      secondary: '#a1c9f2', secondaryForeground: '#333333',
      muted: '#c9c4b5', mutedForeground: '#6e6e6e',
      accent: '#8b9467', accentForeground: '#ffffff',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#d4d4d4', input: '#d4d4d4',
      ring: '#6c5ce7',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1a1d23', foreground: '#e5e5e5',
      card: '#2f3436', cardForeground: '#e5e5e5',
      popover: '#2f3436', popoverForeground: '#e5e5e5',
      primary: '#6c5ce7', primaryForeground: '#ffffff',
      secondary: '#4b0082', secondaryForeground: '#e5e5e5',
      muted: '#444444', mutedForeground: '#a3a3a3',
      accent: '#6495ed', accentForeground: '#e5e5e5',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#444444', input: '#444444',
      ring: '#6c5ce7',
    },
    radius: '0.5rem',
    font: { sans: 'Montserrat', serif: 'Playfair Display', mono: 'Source Code Pro' },
    shadow: 'soft',
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    description: 'Ported from tweakcn — Northern Lights',
    light: {
      ...sharedTokens,
      background: '#f9f9fa', foreground: '#333333',
      card: 'hsl(140 5% 98%)', cardForeground: '#333333',
      popover: 'hsl(140 5% 98%)', popoverForeground: '#333333',
      primary: '#34a85a', primaryForeground: '#ffffff',
      secondary: '#6495ed', secondaryForeground: '#ffffff',
      muted: '#ddd9c4', mutedForeground: '#6e6e6e',
      accent: '#66d9ef', accentForeground: '#333333',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#d4d4d4', input: '#d4d4d4',
      ring: '#34a85a',
    },
    dark: {
      ...darkSharedTokens,
      background: '#1a1d23', foreground: '#e5e5e5',
      card: '#2f3436', cardForeground: '#e5e5e5',
      popover: '#2f3436', popoverForeground: '#e5e5e5',
      primary: '#34a85a', primaryForeground: '#ffffff',
      secondary: '#4682b4', secondaryForeground: '#e5e5e5',
      muted: '#444444', mutedForeground: '#a3a3a3',
      accent: '#6495ed', accentForeground: '#e5e5e5',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#444444', input: '#444444',
      ring: '#34a85a',
    },
    radius: '0.5rem',
    font: { sans: 'Plus Jakarta Sans', serif: 'Source Serif 4', mono: 'JetBrains Mono' },
    shadow: 'soft',
  },
  {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    description: 'Ported from tweakcn — Vintage Paper',
    light: {
      ...sharedTokens,
      background: '#f5f1e6', foreground: '#4a3f35',
      card: '#fffcf5', cardForeground: '#4a3f35',
      popover: '#fffcf5', popoverForeground: '#4a3f35',
      primary: '#a67c52', primaryForeground: '#ffffff',
      secondary: '#e2d8c3', secondaryForeground: '#5c4d3f',
      muted: '#ece5d8', mutedForeground: '#7d6b56',
      accent: '#d4c8aa', accentForeground: '#4a3f35',
      destructive: '#b54a35', destructiveForeground: '#ffffff',
      border: '#dbd0ba', input: '#dbd0ba',
      ring: '#a67c52',
    },
    dark: {
      ...darkSharedTokens,
      background: '#2d2621', foreground: '#ece5d8',
      card: '#3a322c', cardForeground: '#ece5d8',
      popover: '#3a322c', popoverForeground: '#ece5d8',
      primary: '#c0a080', primaryForeground: '#2d2621',
      secondary: '#4a4039', secondaryForeground: '#ece5d8',
      muted: '#312b26', mutedForeground: '#c5bcac',
      accent: '#59493e', accentForeground: '#ece5d8',
      destructive: '#b54a35', destructiveForeground: '#ffffff',
      border: '#4a4039', input: '#4a4039',
      ring: '#c0a080',
    },
    radius: '0.25rem',
    font: { sans: 'Libre Baskerville', serif: 'Lora', mono: 'IBM Plex Mono' },
    shadow: 'soft',
  },
  {
    id: 'sunset-horizon',
    name: 'Sunset Horizon',
    description: 'Ported from tweakcn — Sunset Horizon',
    light: {
      ...sharedTokens,
      background: '#fff9f5', foreground: '#3d3436',
      card: 'hsl(14 8% 98%)', cardForeground: '#3d3436',
      popover: 'hsl(14 8% 98%)', popoverForeground: '#3d3436',
      primary: '#ff7e5f', primaryForeground: '#ffffff',
      secondary: '#ffedea', secondaryForeground: '#b35340',
      muted: '#fff0eb', mutedForeground: '#78716C',
      accent: '#feb47b', accentForeground: '#3d3436',
      destructive: '#e63946', destructiveForeground: '#ffffff',
      border: '#ffe0d6', input: '#ffe0d6',
      ring: '#ff7e5f',
    },
    dark: {
      ...darkSharedTokens,
      background: '#2a2024', foreground: '#f2e9e4',
      card: '#392f35', cardForeground: '#f2e9e4',
      popover: '#392f35', popoverForeground: '#f2e9e4',
      primary: '#ff7e5f', primaryForeground: '#ffffff',
      secondary: '#463a41', secondaryForeground: '#f2e9e4',
      muted: '#30272c', mutedForeground: '#d7c6bc',
      accent: '#feb47b', accentForeground: '#2a2024',
      destructive: '#e63946', destructiveForeground: '#ffffff',
      border: '#463a41', input: '#463a41',
      ring: '#ff7e5f',
    },
    radius: '0.625rem',
    font: { sans: 'Montserrat', serif: 'Merriweather', mono: 'Ubuntu Mono' },
    shadow: 'soft',
  },
  {
    id: 'starry-night',
    name: 'Starry Night',
    description: 'Ported from tweakcn — Starry Night',
    light: {
      ...sharedTokens,
      background: '#f5f7fa', foreground: '#1a2238',
      card: '#e3eaf2', cardForeground: '#1a2238',
      popover: '#fffbe6', popoverForeground: '#1a2238',
      primary: '#3a5ba0', primaryForeground: '#fffbe6',
      secondary: '#f7c873', secondaryForeground: '#1a2238',
      muted: '#e5e5df', mutedForeground: '#3a5ba0',
      accent: '#6ea3c1', accentForeground: '#fffbe6',
      destructive: '#2d1e2f', destructiveForeground: '#fffbe6',
      border: '#b0b8c1', input: '#6ea3c1',
      ring: '#f7c873',
    },
    dark: {
      ...darkSharedTokens,
      background: '#181a24', foreground: '#e6eaf3',
      card: '#23243a', cardForeground: '#e6eaf3',
      popover: '#23243a', popoverForeground: '#ffe066',
      primary: '#3a5ba0', primaryForeground: '#ffe066',
      secondary: '#ffe066', secondaryForeground: '#23243a',
      muted: '#1d1e2f', mutedForeground: '#7a88a1',
      accent: '#bccdf0', accentForeground: '#181a24',
      destructive: '#a04a6c', destructiveForeground: '#ffe066',
      border: '#2d2e3e', input: '#3a5ba0',
      ring: '#ffe066',
    },
    radius: '0.5rem',
    font: { sans: 'Libre Baskerville', serif: 'editorial', mono: 'mono' },
    shadow: 'soft',
  },
  {
    id: 'soft-pop',
    name: 'Soft Pop',
    description: 'Ported from tweakcn — Soft Pop',
    light: {
      ...sharedTokens,
      background: '#f7f9f3', foreground: '#000000',
      card: 'hsl(238 5% 98%)', cardForeground: '#000000',
      popover: 'hsl(238 5% 98%)', popoverForeground: '#000000',
      primary: '#4f46e5', primaryForeground: '#ffffff',
      secondary: '#14b8a6', secondaryForeground: '#ffffff',
      muted: '#f0f0f0', mutedForeground: '#333333',
      accent: '#f59e0b', accentForeground: '#000000',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#000000', input: '#737373',
      ring: '#a5b4fc',
    },
    dark: {
      ...darkSharedTokens,
      background: '#000000', foreground: '#ffffff',
      card: '#1a212b', cardForeground: '#ffffff',
      popover: '#1a212b', popoverForeground: '#ffffff',
      primary: '#818cf8', primaryForeground: '#000000',
      secondary: '#2dd4bf', secondaryForeground: '#000000',
      muted: '#333333', mutedForeground: '#cccccc',
      accent: '#fcd34d', accentForeground: '#000000',
      destructive: '#f87171', destructiveForeground: '#000000',
      border: '#545454', input: '#ffffff',
      ring: '#818cf8',
    },
    radius: '1rem',
    font: { sans: 'DM Sans', serif: 'DM Sans', mono: 'Space Mono' },
    shadow: 'soft',
  },
  {
    id: 'sage-garden',
    name: 'Sage Garden',
    description: 'Ported from tweakcn — Sage Garden',
    light: {
      ...sharedTokens,
      background: '#f8f7f4', foreground: '#1a1f2e',
      card: 'hsl(140 5% 98%)', cardForeground: '#1a1f2e',
      popover: 'hsl(140 5% 98%)', popoverForeground: '#1a1f2e',
      primary: '#7c9082', primaryForeground: '#ffffff',
      secondary: '#ced4bf', secondaryForeground: '#1a1f2e',
      muted: '#e8e6e1', mutedForeground: '#6b7280',
      accent: '#bfc9bb', accentForeground: '#1a1f2e',
      destructive: '#c73e3a', destructiveForeground: '#ffffff',
      border: '#e8e6e1', input: '#ffffff',
      ring: '#7c9082',
    },
    dark: {
      ...darkSharedTokens,
      background: '#0a0a0a', foreground: '#f5f5f5',
      card: '#121212', cardForeground: '#f5f5f5',
      popover: '#121212', popoverForeground: '#f5f5f5',
      primary: '#7c9082', primaryForeground: '#000000',
      secondary: '#1a1a1a', secondaryForeground: '#f5f5f5',
      muted: '#1a1a1a', mutedForeground: '#a0a0a0',
      accent: '#36443a', accentForeground: '#f5f5f5',
      destructive: '#ef4444', destructiveForeground: '#ffffff',
      border: '#2a2a2a', input: '#121212',
      ring: '#7c9082',
    },
    radius: '0.35rem',
    font: { sans: 'Antic', serif: 'editorial', mono: 'JetBrains Mono' },
    shadow: 'soft',
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

/**
 * Strict bounded spacing grammar. Only `0.22rem`..`0.28rem` is accepted: the
 * value travels verbatim to setProperty as an inline `--spacing` on :root, so
 * the grammar itself must cap what can ever reach the declaration.
 */
export function isSafeSpacing(value) {
  return typeof value === 'string' && value.length <= MAX_THEME_STRING_LENGTH &&
    /^(?:0\.2[2-8])rem$/.test(value)
}

/**
 * Strict bounded letter-spacing grammar. Em units only (no bare numbers) plus a
 * numeric bound check (-0.025..0.05em). Strict because the value travels
 * verbatim to setProperty as an inline `--theme-letter-spacing`.
 */
export function isSafeLetterSpacing(value) {
  if (typeof value !== 'string' || value.length > MAX_THEME_STRING_LENGTH) return false
  if (!/^-?\d+(?:\.\d+)?em$/.test(value)) return false
  const n = Number.parseFloat(value)
  return n >= -0.025 && n <= 0.05
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
// spacing/letterSpacing are optional additive keys of the v3 overrides envelope:
// strict per-build validation is retained and no migration is needed because old
// v3 documents simply lack the keys and normalize to null/default on read.
function isValidThemeObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
    value.version !== THEME_SCHEMA_VERSION || !isKnownThemePreset(value.presetId)) return false
  if (Object.keys(value).some((key) => !['version', 'presetId', 'overrides'].includes(key))) return false
  const overrides = value.overrides
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) return false
  return Object.keys(overrides).every((key) =>
    ['primary', 'accent', 'radius', 'sans', 'serif', 'mono', 'shadow', 'spacing', 'letterSpacing'].includes(key)
  ) && (
    (overrides.primary == null || isSafeThemeColor(overrides.primary)) &&
    (overrides.accent == null || isSafeThemeColor(overrides.accent)) &&
    (overrides.radius == null || isSafeRadius(overrides.radius)) &&
    (overrides.sans == null || isKnownThemeValue(THEME_FONTS, overrides.sans)) &&
    (overrides.serif == null || isKnownThemeValue(THEME_FONTS, overrides.serif)) &&
    (overrides.mono == null || isKnownThemeValue(THEME_FONTS, overrides.mono)) &&
    (overrides.shadow == null || isKnownThemeValue(THEME_SHADOWS, overrides.shadow)) &&
    (overrides.spacing == null || isSafeSpacing(overrides.spacing)) &&
    (overrides.letterSpacing == null || isSafeLetterSpacing(overrides.letterSpacing))
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
      spacing: isSafeSpacing(overrides.spacing) ? overrides.spacing : null,
      letterSpacing: isSafeLetterSpacing(overrides.letterSpacing) ? overrides.letterSpacing : null,
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
  // Preset fonts come in two shapes: a single string slot (legacy presets, where
  // the value drives sans and the serif slot follows it) or a { sans, serif, mono }
  // object of THEME_FONTS keys (ported tweakcn presets, per-slot fidelity).
  // Normalise once to the object shape; string behaviour is preserved exactly.
  const pf = typeof preset.font === 'string' || !preset.font
    ? { sans: preset.font || 'system', serif: preset.font === 'mono' ? 'mono' : 'editorial', mono: 'mono' }
    : preset.font
  const sans = overrides.sans ?? pf.sans ?? 'system'
  const serif = overrides.serif ?? pf.serif ?? 'editorial'
  const mono = overrides.mono ?? pf.mono ?? 'mono'
  return {
    sans,
    serif,
    mono,
    sansFamily: THEME_FONTS[sans],
    serifFamily: THEME_FONTS[serif],
    monoFamily: THEME_FONTS[mono],
    shadow,
    shadowValue: THEME_SHADOWS[shadow],
    spacing: isSafeSpacing(overrides.spacing) ? overrides.spacing : THEME_DEFAULT_SPACING,
    // Resolution order: user override → preset-declared tracking → no-op default.
    // Preset values were validated at authoring time but re-check them here so a
    // hand-edited preset can never emit more than a bounded em string.
    letterSpacing: isSafeLetterSpacing(overrides.letterSpacing)
      ? overrides.letterSpacing
      : isSafeLetterSpacing(preset.letterSpacing)
        ? preset.letterSpacing
        : THEME_DEFAULT_LETTER_SPACING,
  }
}


