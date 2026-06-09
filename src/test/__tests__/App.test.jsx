import { render, screen } from '@testing-library/react'
import App from '../../App'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
  useTheme: () => ({ theme: 'light', setTheme: vi.fn(), themes: ['light', 'dark'] }),
}))

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

describe('App', () => {
  it('renders without crashing and displays the skip link', () => {
    render(<App />)
    expect(screen.getByText('Saltar al contenido principal')).toBeInTheDocument()
  })
})
