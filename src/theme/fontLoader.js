import { WEB_FONT_SPECS } from './themePresets'

/**
 * Ensures the Google Fonts stylesheet for a validated theme font key is present.
 * SECURITY: the URL is built ONLY from WEB_FONT_SPECS entries — a key that is not
 * in the closed allowlist (including the local system stacks, which have no spec)
 * can never reach the href. Mirrors tweakcn's loadGoogleFont with href+attribute
 * dedup: the `data-theme-font` attribute also lets a preloaded static <link>
 * (see index.html) satisfy the check without a duplicate injection.
 */
export function ensureWebFont(fontKey) {
  if (typeof document === 'undefined') return
  if (typeof fontKey !== 'string' || !Object.hasOwn(WEB_FONT_SPECS, fontKey)) return
  const spec = WEB_FONT_SPECS[fontKey]
  const href = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`
  const existing = document.querySelector(`link[data-theme-font="${fontKey}"], link[href="${href}"]`)
  if (existing) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.themeFont = fontKey
  document.head.appendChild(link)
}

export function ensureWebFonts(fontKeys) {
  fontKeys.forEach(ensureWebFont)
}
