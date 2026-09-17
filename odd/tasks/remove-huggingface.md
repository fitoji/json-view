# Remove Hugging Face Integration

## Objective

Remove the non-working Hugging Face/JavGPT feature from Visor Tests while preserving the quiz, documentation about generating questionnaires with external AI tools, and a future BYOK direction.

## Scope

- Remove the in-quiz JavGPT control and the general-menu AI placeholder.
- Delete the Hugging Face/chat implementation files when no longer referenced.
- Remove the `@huggingface/inference` dependency and lockfile entries.
- Remove the obsolete local environment variable without exposing its value; Vercel cleanup requires an authenticated session.
- Update tour copy and project TODO/documentation to reflect that in-app AI is deferred.
- Verify tests and production build.

## Constraints

- Do not remove documentation explaining how external AI tools can generate questionnaire JSON.
- Do not touch unrelated untracked artifacts.
- Do not expose or reproduce any secret value.
- Preserve the quiz, exam persistence, navigation, and non-AI menu behavior.

## Tasks

- [x] AI-001 Remove AI controls from quiz, menu, and tour copy.
- [x] AI-002 Delete unused chat/provider source and remove the dependency/lockfile entries.
- [x] AI-003 Remove the local `VITE_REACT_HUGGINGFACE` variable safely; Vercel removal remains blocked by missing CLI credentials.
- [x] AI-004 Update TODO/documentation to defer in-app AI and record the future BYOK direction.
- [x] AI-005 Run tests, build, diff checks, and inspect the final candidate.

## Acceptance Criteria

- No source import or dependency references Hugging Face, JavGPT, or the removed in-app chat.
- Local `.env` no longer contains `VITE_REACT_HUGGINGFACE`; Vercel environment configuration still requires authenticated cleanup.
- External-AI questionnaire-generation documentation remains available.
- The quiz and exam flows render without the removed AI controls.
- Tests and production build pass.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`
- Search source/config for removed provider references without printing secret values.

## Progress

- Status: blocked on remote environment cleanup.
- Evidence: removed `Test.jsx` and `menu-exp.jsx` AI imports/controls, removed the AI tour step, deleted the six unused chat/provider components, removed package/lockfile entries, cleaned the local variable without printing its value, and preserved `docs/ai-generation.md` external-AI instructions.
- Verification: `pnpm test`, `pnpm build`, `git diff --check`, and sanitized source/package searches passed.
- Blocker: Vercel CLI reported no existing credentials while inspecting the Visor Tests project; no remote retry or mutation was attempted.
