import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeToggle } from '../../components/ui/ThemeToggle'

const { mockSetTheme } = vi.hoisted(() => ({
  mockSetTheme: vi.fn(),
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    themes: ['light', 'dark'],
  }),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
    delete document.startViewTransition
  })

  it('renders with the correct aria-label', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: /cambiar/i })).toBeInTheDocument()
  })

  it('falls back to changing the theme when View Transition API is unavailable', async () => {
    render(<ThemeToggle />)

    await waitFor(() => expect(screen.getByRole('button', { name: /noche/i })).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: /noche/i }), {
      clientX: 24,
      clientY: 36,
    })

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('starts a circular transition from the click point when motion is allowed', async () => {
    const startViewTransition = vi.fn((update) => ({
      finished: Promise.resolve(update()),
    }))
    document.startViewTransition = startViewTransition
    render(<ThemeToggle />)

    await waitFor(() => expect(screen.getByRole('button', { name: /noche/i })).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: /noche/i }), {
      clientX: 24,
      clientY: 36,
    })

    expect(startViewTransition).toHaveBeenCalledOnce()
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
    expect(document.documentElement.style.getPropertyValue('--theme-transition-x')).toBe('24px')
    expect(document.documentElement.style.getPropertyValue('--theme-transition-y')).toBe('36px')
  })

  it('falls back when reduced motion is enabled', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const startViewTransition = vi.fn()
    document.startViewTransition = startViewTransition
    render(<ThemeToggle />)

    await waitFor(() => expect(screen.getByRole('button', { name: /noche/i })).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: /noche/i }))

    expect(startViewTransition).not.toHaveBeenCalled()
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })
})
