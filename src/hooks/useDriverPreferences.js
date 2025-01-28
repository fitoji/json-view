import { useState, useEffect } from "react"

export function useDriverPreference() {
  const [isTourEnabled, setIsTourEnabled] = useState(false)

  useEffect(() => {
    const storedPreference = localStorage.getItem("driverTourEnabled")
    setIsTourEnabled(storedPreference === null ? true : storedPreference === "true")
  }, [])

  const toggleTour = () => {
    const newValue = !isTourEnabled
    setIsTourEnabled(newValue)
    localStorage.setItem("driverTourEnabled", String(newValue))
  }

  return { isTourEnabled, toggleTour }
}

