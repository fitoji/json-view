import {
  canMigrateLegacySession,
  canonicalizeQuestionnaire,
  questionnaireIdentity,
  sessionStorageKey,
  validateExamSession,
  validateQuestionnaire,
} from '../../helpers/examSession.mjs'

const questions = [
  {
    id: 1,
    question: 'One',
    option1: 'A',
    option2: 'B',
    ans: 2,
    tema: 'Test',
  },
  {
    id: 2,
    question: 'Two',
    option1: 'C',
    option2: 'D',
    ans: 1,
    tema: 'Test',
  },
]

describe('exam session identity and validation', () => {
  it('normalizes object keys but preserves questionnaire order', () => {
    const reordered = questions.map(({ id, question, option1, option2, ans, tema }) => ({
      tema,
      ans,
      option2,
      option1,
      question,
      id,
    }))

    expect(canonicalizeQuestionnaire(questions)).toBe(canonicalizeQuestionnaire(reordered))
    expect(questionnaireIdentity(questions)).not.toBe(
      questionnaireIdentity([...questions].reverse()),
    )
  })

  it('shares identity for identical content from different filenames', () => {
    expect(questionnaireIdentity(questions)).toBe(questionnaireIdentity(JSON.parse(JSON.stringify(questions))))
    expect(sessionStorageKey(questionnaireIdentity(questions))).toMatch(/^quiz-exam-v2:q-/)
  })

  it('isolates changed content', () => {
    const changed = questions.map((question) => ({ ...question }))
    changed[0].question = 'Changed'
    expect(questionnaireIdentity(changed)).not.toBe(questionnaireIdentity(questions))
  })

  it('migrates legacy sessions only for an exact questionnaire match', () => {
    const legacy = { version: '1', questions, userAnswers: { 1: 2 } }
    expect(canMigrateLegacySession(legacy, JSON.parse(JSON.stringify(questions)))).toBe(true)
    expect(canMigrateLegacySession(legacy, [{ ...questions[0], question: 'Changed' }, questions[1]])).toBe(false)
  })

  it('rejects malformed sessions and invalid questionnaires', () => {
    const identity = questionnaireIdentity(questions)
    const validSession = {
      version: 2,
      identity,
      questions,
      userAnswers: {},
      activeIndex: 0,
      startTime: Date.now(),
      elapsed: 0,
    }

    expect(validateExamSession(validSession, questions, identity)).toBe(true)
    expect(validateExamSession({ ...validSession, userAnswers: [] }, questions, identity)).toBe(false)
    expect(validateExamSession({ ...validSession, identity: 'q-other' }, questions, identity)).toBe(false)
    expect(validateQuestionnaire([]).valid).toBe(false)
    expect(validateQuestionnaire([questions[0], questions[0]]).valid).toBe(false)
    expect(questionnaireIdentity([])).toBeNull()
  })
})
