// Shared circular-reveal driver for theme changes (see `theme-transition-reveal`
// in src/index.css). Extracted from ThemeToggle so every whole-theme swap —
// dark/light toggle, preset selection, reset — gets the identical reveal:
//   1. skip the animation under prefers-reduced-motion or without View Transitions
//   2. anchor the reveal origin to the pointer position
//   3. apply the change inside document.startViewTransition
export function runWithThemeViewTransition(event, applyChanges) {
  const prefersReducedMotion = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (
    prefersReducedMotion ||
    typeof document.startViewTransition !== 'function'
  ) {
    applyChanges()
    return
  }

  // Keyboard activation (or programmatic calls) pass no pointer coordinates;
  // fall back to the viewport center so the reveal still plays without a crash.
  const x = event?.clientX ?? window.innerWidth / 2
  const y = event?.clientY ?? window.innerHeight / 2

  const root = document.documentElement
  root.style.setProperty('--theme-transition-x', `${x}px`)
  root.style.setProperty('--theme-transition-y', `${y}px`)

  document.startViewTransition(() => applyChanges())
}
