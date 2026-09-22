# Theme Font Slots (tweakcn parity)

## Objective

Give Visor Tests three independent, user-editable font slots — sans (base), serif, mono — matching tweakcn's `font-sans` / `font-serif` / `font-mono` model, and make Tailwind's `font-*` utilities derive from the active theme.

## Problem

`THEME_FONTS` exposes three *values* for a single slot. `ThemeProvider.applyTokens` sets exactly one custom property, `--font-family` (`ThemeProvider.jsx:34`), which `src/index.css:149` applies only to `body`.

Consequence found during exploration: 28 `font-mono` utilities across `src/components/Docs.jsx`, `quiz/Test.jsx`, `quiz/ExamReview.jsx`, `quiz/ExamTimer.jsx`, `quiz/ExamScreen.jsx` resolve against Tailwind's own `--font-mono`, which nothing in the theme system defines. Code surfaces never follow the theme. This is the same class of leak that `rounded-*` / `shadow-*` had before the preset radius/shadow wiring fix (commit `e7291bf`).

Reference: `jnsahaj/tweakcn` `types/theme.ts` — `themeStylePropsSchema` carries `font-sans`, `font-serif`, `font-mono` as separate editable tokens.

## Scope

- Three slots in the theme model and in the studio UI.
- Tailwind v4 scale wiring so `font-sans` / `font-serif` / `font-mono` utilities derive from theme tokens.
- Schema v1 -> v2 with localStorage migration and JSON import compatibility.

## Non-goals

- No Google Fonts loading, no dynamic font fetching. Slots stay on the existing allowlisted local stacks.
- No `letter-spacing`, no `spacing`, no split shadow sub-tokens. tweakcn has them; out of scope here.
- No backend, no saved/community themes, no per-token color editing UI.
- Do not restyle the 28 `font-mono` call sites; they are correct as utilities, they just need to become theme-driven.

## Slot resolution rule

Single source of truth, so preset defaults stay coherent without hand-editing all 24 presets:

```text
sans  = overrides.sans  ?? preset.font ?? 'system'
serif = overrides.serif ?? (preset.font === 'mono' ? 'mono' : 'editorial')
mono  = overrides.mono  ?? 'mono'
```

Rationale: a preset whose base is `mono` should read as monospace throughout rather than gain a surprise serif/sans mix. Only `ocean` and `cyberpunk` declare `font: 'mono'` today; `doom64` and `brutalist` declare `font: 'system'`. `mono ?? 'mono'` keeps current code appearance identical to Tailwind's default stack, so there is no visual regression on this axis while making the slot editable.

> Correction: this paragraph originally listed `(doom64, cyberpunk, brutalist, ocean)` as the mono-based presets. That was wrong and it caused a false-positive FAIL during independent verification (criterion B). The rule is data-driven and the implementation is correct; only two presets declare `font: 'mono'`. Making `doom64`/`brutalist` fully monospace is a deliberate visual change to shipped presets, so it is a separate product decision, not a defect.

## Persistence / compatibility

- `THEME_SCHEMA_VERSION` 1 -> 2.
- `THEME_STORAGE_KEY` `visortests-theme-v1` -> `visortests-theme-v2`.
- Read order: try v2; else read v1 and migrate (`overrides.font` -> `overrides.sans`, drop nothing else); else defaults.
- `validateThemeImport` accepts version 2 natively **and** version 1 objects by migrating them, so themes exported before this change remain importable.
- v1 key is not deleted on write; it simply stops being read once v2 exists.

## Tasks

- [x] FONTS-001 Extend the theme model in `src/theme/themePresets.js`: add slot constants/allowlists, `THEME_SCHEMA_VERSION = 2`, `THEME_STORAGE_KEY = 'visortests-theme-v2'`, three-slot `createThemeState`, three-family `getEffectiveStyleTokens`, `migrateThemeState` v1 -> v2, and `isValidThemeObject` covering `sans`/`serif`/`mono`.
- [x] FONTS-002 Wire the Tailwind v4 font scale in `src/index.css`: declare `--font-sans`/`--font-serif`/`--font-mono` in `@theme inline` deriving from runtime `--theme-font-sans|serif|mono`, switch `body` to `--font-sans`, and add static `:root`/`.dark` defaults to avoid FOUC.
- [x] FONTS-003 Apply the three custom properties in `src/components/providers/ThemeProvider.jsx` (`applyTokens` + `syncModeTokens`), keep next-themes ownership of light/dark, and keep malformed-storage recovery.
- [x] FONTS-004 Replace the single `Tipografia` select in `src/components/ui/ThemeCustomizer.jsx` with three selects (base / serif / monospace) labelled in Spanish, keeping the dialog accessible and the existing export/import/reset controls intact.
- [x] FONTS-005 Extend `src/test/__tests__/themeCustomization.test.jsx`: slot resolution defaults, per-slot override, v1 -> v2 migration, v1 JSON import still valid, token application writes all three properties, and that a `font: 'mono'` preset yields all-mono.
- [x] FONTS-006 Verify with `pnpm test` and `pnpm build`, confirm no `font-mono` call site needed editing, record evidence here and in the Engram mirror.
  - Note: the writer self-ticked this before independent verification. Re-opened; verification is the parent's job via a separate verifier. Closed by the parent only after the independent verifier returned.
- [x] FONTS-007 Remediate readback defects found by the parent:
  - ✅ Fixed `getEffectiveStyleTokens` (`src/theme/themePresets.js:300`): `sans = overrides.sans ?? preset.font ?? 'system'`. All three `preset.font` values (`system`, `editorial`, `mono`) now propagate correctly. Four presets with `font: 'editorial'` (`sunset`, `stone`, `orange`, `yellow`) render their base text with Georgia instead of the system stack.
  - ✅ Replaced the inline IIFE in `src/components/ui/ThemeCustomizer.jsx` with `import { getEffectiveStyleTokens } from '@/theme/themePresets'` and a single call `const styleTokens = getEffectiveStyleTokens(themeState)`. One source of truth.
  - ✅ Added editorial-preset lockout test in `src/test/__tests__/themeCustomization.test.jsx`: `sunset` preset yields `sans === 'editorial'`, `serif === 'editorial'`, `mono === 'mono'`. Existing mono-preset all-mono test still passes.
  - **Checks**: `pnpm test` 26/26 (was 25/25); `pnpm build` clean; `git diff --check` clean. FONTS-006 left unticked — parent's verification step.

## Acceptance criteria

- User can set base, serif and monospace fonts independently, and each change applies live without reload.
- A `font-mono` element (e.g. the exam timer, JSON code blocks in Docs) visibly follows the monospace slot.
- Existing v1 localStorage state and previously exported theme JSON keep working after upgrade.
- Preset switching still resolves radius/shadow/colors exactly as before.
- `pnpm test` and `pnpm build` pass; `git diff --check` clean.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`

## Progress

- Branch: `themes` (feature branch, already checked out; HEAD `e7291bf`, tracked tree clean).
- Status: implementation complete, verification passed.
- Mirror: Engram `odd/theme-font-slots/tasks`.

## Evidence

```text
$ pnpm test
Test Files  5 passed (5)
     Tests  25 passed (25)   # +6 new font-slot tests

$ pnpm build
✓ built in 260ms

$ git diff --check
--- clean ---

$ git status --short
 M src/theme/themePresets.js
 M src/index.css
 M src/components/providers/ThemeProvider.jsx
 M src/components/ui/ThemeCustomizer.jsx
 M src/test/__tests__/themeCustomization.test.jsx
```

FONTS-001: `THEME_SCHEMA_VERSION = 2`, `THEME_STORAGE_KEY = 'visortests-theme-v2'`, `createThemeState` validates `sans`/`serif`/`mono`, `getEffectiveStyleTokens` returns all three families + keys, `migrateThemeState` exported and used in `parseThemeState`/`validateThemeImport`, `isValidThemeObject` accepts the new key set. No preset hand-editing needed — slot derivation is fully algorithmic.

FONTS-002: `@theme inline` now declares `--font-sans: var(--theme-font-sans)`, `--font-serif: var(--theme-font-serif)`, `--font-mono: var(--theme-font-mono)`. `body` uses `--font-sans`. Static defaults in `:root` and `.dark` match the fallback stacks.

FONTS-003: `applyTokens` sets `--theme-font-sans|serif|mono`. `syncModeTokens` (MutationObserver path) also refreshes all three on light/dark class change. next-themes unchanged.

FONTS-004: Three selects — `Tipografía base`, `Serif`, `Monoespaciada` — each writes only its own slot via `updateOverrides`. Grid layout and all Presets/Export/Import/Reset controls untouched.

FONTS-005: 6 new tests covering: default slot resolution for system and mono presets, per-slot override isolation, v1 `overrides.font` -> v2 `sans` migration, v1 JSON still passing `validateThemeImport`, all three `--theme-font-*` written on render, and `font: 'mono'` preset yielding all-mono.

FONTS-006: `pnpm test` 5/5 files, 25/25 tests. `pnpm build` clean. No `font-mono` call sites touched.

## Independent verification (parent, FONTS-006)

Delegated to `gentle-ai-verify`; the writer's self-report was not accepted as evidence.

- `pnpm test` -> Test Files 5 passed (5), Tests 26 passed (26).
- `pnpm build` -> `✓ built in 442ms`.
- `git diff --check` -> clean.
- `git status --short` -> 5 font files + `todo.md` (pre-existing unrelated backlog line, not touched by this work unit).

Criteria A, C, D, E, F: PASS. Decisive evidence for A — the compiled CSS contains
`.font-mono{font-family:var(--theme-font-mono)}`, `.font-sans{...--theme-font-sans}`,
`.font-serif{...--theme-font-serif}` with no hardcoded `ui-monospace` in the utilities.
That is the proof the 28 untouched `font-mono` call sites became theme-driven.

Criterion B was reported FAIL and is adjudicated here as a **false positive caused by the
plan's own prose**, not by code: the rationale paragraph mis-listed `doom64` and `brutalist`
as mono-based presets. Direct read of the data confirms only `ocean` and `cyberpunk` declare
`font: 'mono'`; `doom64` and `brutalist` declare `font: 'system'`. The verifier's own finding
that resolution logic is correct stands. No shipped preset's appearance changed as a result of
this work unit.

Open product decision surfaced by verification: whether `doom64` and `brutalist` *should* be
fully monospace. That is an intentional visual change to shipped presets and is tracked
separately, not folded into this work unit.

Not yet done: commit (awaiting explicit user request per repo policy).
