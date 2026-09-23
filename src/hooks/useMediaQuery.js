import { useCallback, useSyncExternalStore } from 'react'

// Minimal `(min-width)` / `(max-width)` evaluation against window.innerWidth,
// used only in environments where window.matchMedia is missing (exotic browsers;
// jsdom gets a full polyfill from src/test/setup.js instead).
// Returns null when the query cannot be evaluated, so callers fall back to false.
function evaluateWithInnerWidth(query) {
  if (typeof window === 'undefined' || typeof window.innerWidth !== 'number') {
    return null
  }
  const minWidth = query.match(/min-width:\s*([\d.]+)px/)
  const maxWidth = query.match(/max-width:\s*([\d.]+)px/)
  if (!minWidth && !maxWidth) return null
  // Strip width conditions; if anything meaningful remains (e.g.
  // prefers-color-scheme), we cannot evaluate this query reliably.
  const residue = query
    .replace(/\(\s*(min|max)-width:\s*[\d.]+px\s*\)/g, '')
    .replace(/\band\b/g, '')
    .replace(/[()\s]/g, '')
  if (residue) return null
  const width = window.innerWidth
  if (minWidth && width < parseFloat(minWidth[1])) return false
  if (maxWidth && width > parseFloat(maxWidth[1])) return false
  return true
}

function queryMatches(query) {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia(query).matches
  }
  // Documented fallback when matchMedia is unavailable: evaluate from
  // window.innerWidth once per read; if that is impossible too, report
  // "no match".
  return evaluateWithInnerWidth(query) ?? false
}

// Subscribes to a CSS media query (e.g. '(min-width: 1024px)') and returns a
// boolean that updates on the MediaQueryList 'change' event. Built on
// useSyncExternalStore: the snapshot is a primitive boolean, so there is no
// infinite re-render risk, and the subscription only re-establishes when the
// query string changes. Safe when window.matchMedia is undefined (SSR,
// unpatched jsdom): falls back to the innerWidth evaluation above and simply
// has no live updates until the next render.
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {}
      }
      const mql = window.matchMedia(query)
      // Older Safari only implements the deprecated addListener/removeListener
      // pair; prefer the standard EventTarget API when present.
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', onStoreChange)
        return () => mql.removeEventListener('change', onStoreChange)
      }
      mql.addListener(onStoreChange)
      return () => mql.removeListener(onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => queryMatches(query), [query])

  // getServerSnapshot keeps the hook usable in non-browser render contexts;
  // this SPA never server-renders, so "no match" is a safe placeholder there.
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
