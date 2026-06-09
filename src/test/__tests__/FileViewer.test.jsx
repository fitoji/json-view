import { render, screen } from '@testing-library/react'
import FileViewer from '../../components/FileViewer'

describe('FileViewer', () => {
  it('renders Suspense fallback when content is null', () => {
    render(<FileViewer content={null} />)
    expect(screen.getByText('Cargando cuestionario…')).toBeInTheDocument()
  })
})
