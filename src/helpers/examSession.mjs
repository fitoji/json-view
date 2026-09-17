export const LEGACY_STORAGE_KEY = 'quiz-exam-v1'
export const SESSION_VERSION = 2
export const STORAGE_KEY_PREFIX = 'quiz-exam-v2:'

function normalizeValue(value) {
  if (Array.isArray(value)) return value.map(normalizeValue)
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        if (value[key] !== undefined) result[key] = normalizeValue(value[key])
        return result
      }, {})
  }
  return value
}

export function validateQuestionnaire(questions) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { valid: false, reason: 'Questionnaire must contain at least one question.' }
  }

  const ids = new Set()
  for (const question of questions) {
    if (!question || typeof question !== 'object' || question.id === undefined || question.id === null) {
      return { valid: false, reason: 'Every question must have an id.' }
    }
    const id = `${typeof question.id}:${String(question.id)}`
    if (ids.has(id)) return { valid: false, reason: 'Question ids must be unique.' }
    ids.add(id)
  }

  return { valid: true, reason: null }
}

export function canonicalizeQuestionnaire(questions) {
  if (!validateQuestionnaire(questions).valid) return null
  return JSON.stringify(normalizeValue(questions))
}

function hashString(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

export function questionnaireIdentity(questions) {
  const canonical = canonicalizeQuestionnaire(questions)
  return canonical === null ? null : `q-${hashString(canonical)}`
}

export function sessionStorageKey(identity) {
  return identity ? `${STORAGE_KEY_PREFIX}${identity}` : null
}

function isAnswersObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
}

export function validateExamSession(session, questions, identity) {
  const canonical = canonicalizeQuestionnaire(questions)
  if (!session || session.version !== SESSION_VERSION || session.identity !== identity) return false
  if (canonical === null || canonicalizeQuestionnaire(session.questions) !== canonical) return false
  if (!isAnswersObject(session.userAnswers)) return false
  if (!Number.isInteger(session.activeIndex) || session.activeIndex < 0 || session.activeIndex >= questions.length) return false
  return Number.isFinite(session.startTime) && Number.isFinite(session.elapsed)
}

export function canMigrateLegacySession(session, questions) {
  if (!session || session.version !== '1') return false
  if (canonicalizeQuestionnaire(session.questions) !== canonicalizeQuestionnaire(questions)) return false
  return isAnswersObject(session.userAnswers)
}

export function createExamSession({ identity, questions, userAnswers, activeIndex, startTime, elapsed }) {
  return {
    version: SESSION_VERSION,
    identity,
    questions,
    userAnswers,
    activeIndex,
    startTime,
    elapsed,
  }
}
