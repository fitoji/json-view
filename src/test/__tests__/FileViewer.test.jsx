import { render, screen } from '@testing-library/react'
import FileViewer from '../../components/FileViewer'

// Mock the complex Test component to isolate FileViewer's rendering
vi.mock('../../components/quiz/Test', () => ({
  default: () => <div data-testid="mock-test">Test Mock</div>,
}))

describe('FileViewer', () => {
  it('renders without crashing when content is null', () => {
    render(<FileViewer content={null} />)
    expect(screen.getByTestId('mock-test')).toBeInTheDocument()
  })
})
