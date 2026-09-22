# Theme Customization — Quiz Surfaces

## Objective

Make quiz and exam surfaces respond consistently to the active custom theme without changing quiz behavior.

## Scope

- Migrate hardcoded quiz/exam foreground, background, border, action, success, warning, and error colors to semantic tokens.
- Extend the token model only where the current semantic set is insufficient.
- Preserve answer-state meaning through semantic success/warning/destructive tokens.
- Keep layout, interaction, keyboard shortcuts, timers, and persistence unchanged.
- Add focused regression coverage for token classes or token availability where practical.

## Constraints

- Work on branch `themes`.
- Do not redesign the quiz or change behavior in this iteration.
- Do not touch unrelated untracked artifacts.
- Use existing Tailwind v4/shadcn semantic variables; avoid per-component custom palettes.
- Preserve light/dark contrast and reduced-motion behavior.

## Tasks

- [x] THEME-QUIZ-001 Inventory and classify hardcoded colors in quiz/exam components and Test.css.
- [x] THEME-QUIZ-002 Add any required semantic tokens and migrate quiz/exam components.
- [x] THEME-QUIZ-003 Verify practice/exam UI tests and production build.

## Acceptance Criteria

- Quiz/exam surfaces respond to preset and primary/accent changes where they previously used hardcoded theme colors.
- Correct/wrong/warning states remain visually distinguishable and semantically named.
- No quiz behavior, persistence, navigation, or keyboard behavior changes.
- Existing tests and build pass.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`

## Progress

- Branch: `themes`
- Status: complete.
- Previous delivery: commit `5ece1cc`.
- Completed: quiz/exam surfaces now use semantic theme tokens, including success and warning states.
- Verification: `pnpm test`, `pnpm build`, and `git diff --check` passed.
