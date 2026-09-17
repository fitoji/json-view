# Theme Customization — Typography and Portability

## Objective

Extend the theme studio with typography/shadow controls and portable theme export/import.

## Scope

- Add safe built-in font and shadow options to the versioned theme schema.
- Apply font and shadow tokens at runtime without external font downloads.
- Add export-to-JSON and import-from-JSON actions with validation.
- Keep current presets, color controls, persistence, and light/dark palettes compatible.
- Add focused tests for schema round-tripping and invalid import recovery.

## Constraints

- Client-side only; no backend or account system.
- Do not execute imported content or accept arbitrary CSS.
- Use an allowlist for font/shadow values.
- Preserve existing quiz/exam behavior and accessibility.

## Tasks

- [x] THEME-PORT-001 Extend presets/schema and CSS mappings for font/shadow tokens.
- [x] THEME-PORT-002 Add live typography/shadow controls to the theme studio.
- [x] THEME-PORT-003 Add validated JSON export/import and persistence tests.
- [x] THEME-PORT-004 Run tests, build, diff checks, and inspect the branch.

## Acceptance Criteria

- Users can select a supported font and shadow style live.
- Exported theme JSON can be imported to restore the same preset/overrides.
- Invalid or oversized import data is rejected safely with user feedback.
- No arbitrary CSS or untrusted values are applied to the document.
- Existing tests and production build pass.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`

## Progress

- Branch: `themes`
- Previous delivery: `7a62582`.
- Status: complete.
