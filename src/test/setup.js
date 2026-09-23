import '@testing-library/jest-dom/vitest'

// jsdom ships without window.matchMedia, which useMediaQuery relies on for
// viewport-tree selection. Polyfill it by computing `matches` from
// window.innerWidth: the default 1024px jsdom viewport activates the desktop
// branch. Width-based queries are evaluated; anything else (e.g.
// prefers-color-scheme) always reports no-match, matching jsdom's historical
// stub semantics. State is shared per query string (a browser keeps one
// MediaQueryList per query alive anyway), and a single resize listener
// dispatches 'change' events like the real API — so hook subscriptions
// update live in tests.
function matchesWidthQuery(query) {
  const minWidth = query.match(/min-width:\s*([\d.]+)px/)
  const maxWidth = query.match(/max-width:\s*([\d.]+)px/)
  if (!minWidth && !maxWidth) return false
  // Unknown residue (conditions we cannot evaluate) → never match.
  const residue = query
    .replace(/\(\s*(min|max)-width:\s*[\d.]+px\s*\)/g, '')
    .replace(/\band\b/g, '')
    .replace(/[()\s]/g, '')
  if (residue) return false
  const width = window.innerWidth
  if (minWidth && width < parseFloat(minWidth[1])) return false
  if (maxWidth && width > parseFloat(maxWidth[1])) return false
  return true
}

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  /** @type {Map<string, { matches: boolean, listeners: Set<Function> }>} */
  const registry = new Map()

  function entryFor(query) {
    let entry = registry.get(query)
    if (!entry) {
      entry = { matches: matchesWidthQuery(query), listeners: new Set() }
      registry.set(query, entry)
    }
    return entry
  }

  window.matchMedia = function matchMedia(query) {
    const entry = entryFor(query)
    const mql = {
      // Always read live from innerWidth, like a browser would.
      get matches() {
        return matchesWidthQuery(query)
      },
      media: query,
      onchange: null,
      addEventListener(type, cb) {
        if (type === 'change') entry.listeners.add(cb)
      },
      removeEventListener(type, cb) {
        if (type === 'change') entry.listeners.delete(cb)
      },
      // Deprecated listener API kept for parity with real MediaQueryList.
      addListener(cb) {
        entry.listeners.add(cb)
      },
      removeListener(cb) {
        entry.listeners.delete(cb)
      },
      dispatchEvent() {
        return true
      },
    }
    return mql
  }

  window.addEventListener('resize', () => {
    registry.forEach((entry, query) => {
      const next = matchesWidthQuery(query)
      if (next === entry.matches) return
      entry.matches = next
      const event = { type: 'change', media: query, matches: next }
      entry.listeners.forEach((cb) => cb(event))
    })
  })
}
