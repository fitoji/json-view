# Theme Customization

## Objective

Give Visor Tests a tweakcn-inspired theme system so users can select and customize visual themes beyond the binary light/dark toggle.

## First Delivery Scope

- Establish a versioned semantic design-token model compatible with Tailwind v4/shadcn CSS variables.
- Provide curated theme presets with independent light/dark token sets.
- Persist the selected theme and custom token overrides in localStorage.
- Add a compact theme selector/customizer accessible from the existing menu.
- Migrate the core shell and common UI surfaces away from hardcoded colors where practical.
- Preserve existing `next-themes` light/dark behavior and the quiz/exam workflows.

## Constraints

- Use the current Vite + React + Tailwind 4 + shadcn/Radix stack; do not adopt tweakcn's Next.js/backend/database application.
- Keep all theme state client-side for this first delivery.
- Use semantic CSS variables; do not create a separate color system per component.
- Persist state with a versioned localStorage schema and recover safely from malformed state.
- Preserve accessibility, reduced-motion behavior, and existing non-theme functionality.

## Tasks

- [x] THEME-001 Normalize the Tailwind v4/shadcn token foundation and define the versioned theme schema in `src/index.css`, `components.json`, and `src/theme/themePresets.js`.
- [x] THEME-002 Add three presets, runtime token application, versioned localStorage persistence, malformed-state recovery, reset, and serializable overrides.
- [x] THEME-003 Add the compact accessible theme studio to the expandable settings menu; preset, primary/accent color, and radius changes apply live.
- [x] THEME-004 Migrate navigation, footer, landing shell, dialogs, buttons, progress, switch, and theme toggle to semantic tokens. Quiz-specific hardcoded colors remain out of scope.
- [x] THEME-005 Add Vitest coverage for preset selection, persistence recovery, token application, reset, and light/dark switching in `src/test/__tests__/themeCustomization.test.jsx`.
- [x] THEME-006 Verified `pnpm test` (5 files/11 tests), `pnpm build`, and `git diff --check` successfully on branch `themes`.

## Acceptance Criteria

- Users can select at least three visual presets.
- Users can customize the primary/accent/radius values and see changes without reload.
- Theme preferences survive reload and malformed localStorage falls back safely.
- Light and dark palettes remain independently usable.
- Footer, navigation, landing shell, dialogs, cards, and common controls respond to semantic tokens.
- Existing tests and production build pass.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`

## Progress

- Branch: `themes`
- Status: complete for the first client-side delivery slice.
- Evidence: all acceptance criteria are covered by the implementation and passing verification commands above.
- Follow-up: migrate remaining quiz/exam-specific hardcoded color classes in a separate slice; this delivery intentionally avoids refactoring the quiz UI.
