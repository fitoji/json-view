# Tasks: Quiz Mode Selection Dialog & Exam Mode

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~510 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Mode dialog + Test.jsx orchestrator | PR 1 | Base branch: feat/quiz-mode-dialog |
| 2 | ExamScreen + ExamTimer core | PR 2 | Depends on PR 1 |
| 3 | Submit flow + ExamReview + persistence | PR 3 | Depends on PR 2 |

## Phase 1: Foundation

- [ ] 1.1 Create `ModeSelectionDialog.jsx` with 2 mode cards + `<Modal>` reuse
- [ ] 1.2 Add `mode` state (`null | 'practica' | 'examen'`) to `Test.jsx`
- [ ] 1.3 Branch render in `Test.jsx`: null → dialog, practica → existing flow, examen → `<ExamScreen>`

## Phase 2: Exam Timer

- [ ] 2.1 Create `ExamTimer.jsx` with `Date.now()` delta countdown (30 min default)
- [ ] 2.2 Handle timer=0: display `00:00`, pause countdown, no auto-submit
- [ ] 2.3 Export `remainingTime` and `isExpired` so ExamScreen can read them

## Phase 3: Exam Screen Core

- [ ] 3.1 Create `ExamScreen.jsx` with `activeIndex`, `userAnswers` state and free navigation (prev/next + question grid)
- [ ] 3.2 Render questions reusing `OpcionList` with `lock=false`, no feedback, no score
- [ ] 3.3 Build 3 layout variants (desktop 3-col, tablet sticky, mobile fixed bottom)
- [ ] 3.4 Add exam-mode keyboard handler (keys 1-5 select, arrows navigate, Ctrl+Enter submit)

## Phase 4: Submission & Review

- [ ] 4.1 Add "Entregar examen" button visible throughout + confirmation `<Modal>`
- [ ] 4.2 Create `ExamReview.jsx` with scrollable question list showing user answer / correct answer / "Sin responder"
- [ ] 4.3 Calculate score: correct/incorrect/unanswered, display pass/fail threshold (60%)

## Phase 5: Persistence & Integration

- [ ] 5.1 Save `userAnswers`, `remainingTime`, `activeIndex` to localStorage on each nav/answer change
- [ ] 5.2 On mount: detect saved exam session, offer "Continuar" or "Empezar nuevo"
- [ ] 5.3 Version-prefix localStorage schema, discard on mismatch
- [ ] 5.4 Hide "Preguntas Aleatorias" Switch in settings modal when `mode === 'examen'`
- [ ] 5.5 Add exam-mode styles to `Test.css` (nav grid, review cards, timer states)

## Phase 6: Testing

- [ ] 6.1 Unit test: ExamTimer countdown and Date.now() delta accuracy
- [ ] 6.2 Integration test: ExamScreen navigation (prev/next/grid) and answer changes
- [ ] 6.3 Integration test: submit confirmation → review screen with correct score
- [ ] 6.4 Integration test: localStorage save → restore → continue exam
- [ ] 6.5 Regression test: practice mode remains unchanged with no exam artifacts
