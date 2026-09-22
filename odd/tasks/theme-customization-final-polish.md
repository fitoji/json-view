# Theme Customization — Final Surface Polish

## Objective

Finish the theme migration across shared components and documentation surfaces so the active theme is visually consistent throughout Visor Tests.

## Scope

- Migrate FileDropZone, StorageUsage, FraseAleatoria, Modal, TourGuideToggle, ToggleButton, FileViewer, and Docs to semantic tokens.
- Preserve existing layout, interactions, upload behavior, documentation navigation, and accessibility.
- Keep external asset references and unrelated feature behavior unchanged.
- Add only token-level CSS changes where shared components require them.

## Constraints

- Use existing semantic Tailwind/shadcn tokens; no new per-component palette.
- Do not redesign Docs or add new functionality.
- Do not touch unrelated untracked artifacts.
- Preserve light/dark and custom preset behavior.

## Tasks

- [x] THEME-FINAL-001 Migrate shared upload/storage/modal/tour controls.
- [x] THEME-FINAL-002 Migrate Docs navigation/content surfaces and remaining shared backgrounds.
- [x] THEME-FINAL-003 Search for remaining raw palette classes, run tests/build/diff checks, and update this task evidence.
- [x] THEME-FINAL-004 Migrate StoredFiles, SortableFileItem, and Temporizador to semantic tokens.

## Acceptance Criteria

- Shared non-quiz surfaces respond to presets and custom primary/accent/radius values.
- Docs remains readable in light/dark and custom themes.
- Upload/storage/modal/tour interactions are unchanged.
- Remaining raw palette matches are limited to intentional third-party/asset contexts or documented exceptions.
- Tests and build pass.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`
- Sanitized search for raw palette classes in `src/`.

## Progress

- Branch: `themes`
- Previous delivery: `0910549`.
- Status: complete.

## Evidence

- Shared upload, storage, quote, modal, tour, toggle, and viewer surfaces now use the existing semantic background, foreground, card, muted, primary, accent, secondary, border, success, and destructive tokens.
- Docs navigation, mobile shell, content card, headings, code blocks, table headers, table borders, and secondary text now use semantic tokens without changing Spanish copy, structure, navigation, or behavior.
- Toast success/error inline styles now reference the semantic success/destructive CSS variables rather than fixed colors.
- Stored file cards and controls now use card, foreground, muted, primary, warning, success, secondary, accent, and border tokens; the timer uses card/muted gradient tokens.
- `pnpm test` — passed (5 files, 15 tests).
- `pnpm build` — passed.
- `git diff --check` — passed.
- Sanitized raw-palette search in `src/` — no matches remain in the three authorized components or the previously migrated shared surfaces; remaining matches are limited to intentional quiz/asset or other out-of-scope contexts.
