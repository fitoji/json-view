import { useState, useEffect } from "react"

const TOGGLE_KEY = "driverTourEnabled"
const SEEN_KEY = "driverTourSeen"

export function useDriverPreference() {
  const [isTourEnabled, setIsTourEnabled] = useState(false)
  // Start as "seen" so the auto-start never fires before the stored flags load.
  const [hasSeenTour, setHasSeenTour] = useState(true)

  useEffect(() => {
    const storedPreference = localStorage.getItem(TOGGLE_KEY)
    setIsTourEnabled(storedPreference === null ? true : storedPreference === "true")
    setHasSeenTour(localStorage.getItem(SEEN_KEY) === "true")
  }, [])

  const toggleTour = () => {
    const newValue = !isTourEnabled
    setIsTourEnabled(newValue)
    localStorage.setItem(TOGGLE_KEY, String(newValue))
    // Switching the tour back on is an explicit request: allow one replay.
    if (newValue) localStorage.removeItem(SEEN_KEY)
  }

  const markTourSeen = () => {
    setHasSeenTour(true)
    localStorage.setItem(SEEN_KEY, "true")
  }

  return { isTourEnabled, toggleTour, hasSeenTour, markTourSeen }
}
