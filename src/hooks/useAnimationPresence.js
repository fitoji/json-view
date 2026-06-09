import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useAnimationPresence — replicates AnimatePresence behavior with CSS animations.
 *
 * When `isVisible` transitions:
 *   false → true : renders the element with `enterAnimation` class
 *   true  → false: applies `exitAnimation` class, waits for `onAnimationEnd`
 *                   then removes the element from the DOM.
 *
 * Cleans up pending timeouts on unmount and handles rapid toggles correctly.
 */
export function useAnimationPresence({
  isVisible,
  enterAnimation,
  exitAnimation,
  durationMs = 300,
}) {
  const [state, setState] = useState({
    shouldRender: isVisible,
    animationClass: isVisible ? enterAnimation : '',
  })

  const prevVisible = useRef(isVisible)
  const timeoutRef = useRef(null)
  const mountedRef = useRef(true)

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  // React to isVisible changes
  useEffect(() => {
    if (isVisible === prevVisible.current) return
    prevVisible.current = isVisible

    // Cancel any pending exit timeout from a previous transition
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (isVisible) {
      // Mount and animate in
      setState({ shouldRender: true, animationClass: enterAnimation })
    } else {
      // Animate out — keep rendering until onAnimationEnd
      setState((prev) => ({ ...prev, animationClass: exitAnimation }))

      // Fallback: if onAnimationEnd never fires, force removal
      timeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setState({ shouldRender: false, animationClass: '' })
        }
      }, durationMs + 50)
    }
  }, [isVisible, enterAnimation, exitAnimation, durationMs])

  const handleAnimationEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!isVisible) {
      // Exit animation finished → remove from DOM
      setState({ shouldRender: false, animationClass: '' })
    } else {
      // Enter animation finished → clear class
      setState((prev) => ({ ...prev, animationClass: '' }))
    }
  }, [isVisible])

  return {
    shouldRender: state.shouldRender,
    animationClass: state.animationClass,
    handleAnimationEnd,
  }
}
