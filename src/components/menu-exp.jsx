import { useDriverPreference } from '@/hooks/useDriverPreferences'
import { useAnimationPresence } from '@/hooks/useAnimationPresence'
import CircleHelp from 'lucide-react/dist/esm/icons/circle-help'
import Home from 'lucide-react/dist/esm/icons/home'
import Settings from 'lucide-react/dist/esm/icons/settings'
import Undo2 from 'lucide-react/dist/esm/icons/undo-2'
import { lazy, Suspense, useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { TourGuideToggle } from './TourGuideToggle'

// The theme studio is the only consumer of Radix Dialog in the app: keep it out
// of the initial bundle and load it when the header menu is about to be used.
const loadThemeCustomizer = () =>
  import('./ui/ThemeCustomizer').then((m) => ({ default: m.ThemeCustomizer }))
const ThemeCustomizerLazy = lazy(loadThemeCustomizer)

export default function MenuExp() {
  const location = useLocation()
  const { isTourEnabled, toggleTour } = useDriverPreference()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(isTourEnabled)
  }, [isTourEnabled])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const { shouldRender, animationClass, handleAnimationEnd } = useAnimationPresence({
    isVisible: isOpen,
    enterAnimation: 'animate-slide-in',
    exitAnimation: 'animate-slide-out',
    durationMs: 300,
  })

  const menuItems = [
    {
      icon: <Home size={20} />,
      href: '/',
      color: 'bg-primary hover:bg-primary/90',
    },

    {
      icon: <CircleHelp size={20} />,
      href: '/docs',
      color: 'bg-primary hover:bg-primary/90',
    },
  ]

  return (
    <div className="flex items-center">
      <div id="driver-step-4" className="relative">
        {/* Main button */}
        <button
          className="bg-secondary hover:bg-accent hover:text-accent-foreground text-secondary-foreground rounded-lg w-10 h-10 flex items-center justify-center shadow-lg z-20 relative transition-colors duration-150 active:scale-95"
          onClick={toggleOpen}
          onPointerEnter={loadThemeCustomizer}
        >
          <span
            className={`${isOpen ? 'rotate-[-45deg]' : 'rotate-0'} transition-transform duration-300 inline-block`}
          >
            <Settings className="w-5 h-5" />
          </span>
        </button>

        {/* Expandable menu */}
        {shouldRender && (
          <div
            className={`absolute top-0 right-16 flex flex-row-reverse gap-2 items-center ${animationClass}`}
            onAnimationEnd={handleAnimationEnd}
          >
            <div style={{ '--stagger-index': 0 }} onAnimationEnd={(e) => e.stopPropagation()}>
              <Link
                id="driver-step-5"
                className="bg-secondary hover:bg-accent hover:text-accent-foreground text-secondary-foreground w-10 h-10 mt-2 flex items-center justify-center rounded-lg shadow-md"
                to={location.pathname === '/' ? '/docs' : '/'}
              >
                {location.pathname === '/' ? (
                  <CircleHelp className="w-5 h-5" />
                ) : (
                  <Undo2 className="w-5 h-5" />
                )}
              </Link>
            </div>
            <div id="driver-step-7" className="mt-2" style={{ '--stagger-index': 1 }} onAnimationEnd={(e) => e.stopPropagation()}>
              <TourGuideToggle
                isTourEnabled={isTourEnabled}
                toggleTour={toggleTour}
              />
            </div>
            <div id="driver-step-temas" className="mt-2 rounded-lg bg-card text-card-foreground shadow-md" style={{ '--stagger-index': 2 }} onAnimationEnd={(e) => e.stopPropagation()}>
              <Suspense
                fallback={
                  <span
                    aria-hidden="true"
                    className="block w-10 h-10 rounded-lg bg-muted animate-pulse"
                  />
                }
              >
                <ThemeCustomizerLazy />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
