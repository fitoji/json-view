import { render, screen, within, act } from '@testing-library/react'
import Test from '../../components/quiz/Test'
import ExamScreen from '../../components/quiz/ExamScreen'

const questions = [
  { id: 1, asignatura: 'A', tema: 'T', question: 'Q1?', option1: 'o1', option2: 'o2', ans: 1 },
  { id: 2, asignatura: 'A', tema: 'T', question: 'Q2?', option1: 'o1', option2: 'o2', ans: 2 },
]

function setViewport(width) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: width })
  act(() => { window.dispatchEvent(new Event('resize')) })
}

beforeEach(() => { localStorage.clear(); setViewport(1024) })

// 'o1' exists once per mounted tree. With the old triple DOM every viewport
// mounted three trees → 3 hits. Exactly 1 proves single-tree rendering.
const optionHits = () => screen.getAllByText('o1').length

describe('single-tree mount', () => {
  it('Test: desktop only at 1024', () => {
    render(<Test data={questions} initialMode="practica" />)
    expect(optionHits()).toBe(1)
    expect(screen.getAllByText('Siguiente pregunta')).toHaveLength(1)
  })
  it('Test: tablet only at 800', () => {
    setViewport(800)
    render(<Test data={questions} initialMode="practica" />)
    expect(optionHits()).toBe(1)
    expect(screen.queryByText('Siguiente pregunta')).toBeNull() // desktop-only
    expect(screen.getAllByText('Siguiente')).toHaveLength(1)
  })
  it('Test: mobile only at 375', () => {
    setViewport(375)
    render(<Test data={questions} initialMode="practica" />)
    expect(optionHits()).toBe(1)
    expect(screen.getAllByText('Siguiente')).toHaveLength(1)
    expect(document.querySelector('footer.fixed')).not.toBeNull() // fixed footer inside mobile tree
  })
  it('Test: live swap desktop->mobile on resize', () => {
    render(<Test data={questions} initialMode="practica" />)
    expect(screen.getAllByText('Siguiente pregunta')).toHaveLength(1)
    setViewport(375)
    expect(screen.queryByText('Siguiente pregunta')).toBeNull()
    expect(screen.getAllByText('Siguiente')).toHaveLength(1)
    expect(optionHits()).toBe(1)
  })
  it('ExamScreen: desktop only at 1024', () => {
    render(<ExamScreen questions={questions} />)
    expect(optionHits()).toBe(1)
    expect(screen.getAllByText('Entregar examen')).toHaveLength(1)
  })
  it('ExamScreen: mobile only at 375', () => {
    setViewport(375)
    render(<ExamScreen questions={questions} />)
    expect(screen.queryByText('Entregar examen')).toBeNull()
    // The always-mounted <dialog> submit-confirm also contains an 'Entregar'
    // button, so scope to the mobile header to count viewport-tree hits.
    expect(within(document.querySelector('header')).getAllByText('Entregar')).toHaveLength(1)
    expect(document.querySelector('footer.fixed')).not.toBeNull()
  })
})
