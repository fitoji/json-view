import { render, screen } from '@testing-library/react'
import { ThemeToggle } from '../../components/ui/ThemeToggle'

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    themes: ['light', 'dark'],
  }),
}))

describe('ThemeToggle', () => {
  it('renders with the correct aria-label', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: /cambiar/i })).toBeInTheDocument()
  })
})
