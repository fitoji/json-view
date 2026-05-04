# AGENTS.md

## Dev Commands
- `pnpm dev` - Start dev server
- `pnpm build` - Production build
- `pnpm preview` - Preview production build

## Tech Stack
- React 19 + Vite
- Tailwind 4 + shadcn/ui (Radix primitives)
- React Router 7
- Deployment: Vercel (visortests-gpt.vercel.app)

## Important Paths
- `src/App.jsx` - Main router (Landing + Docs routes)
- `src/components/login/` - Auth components (incomplete)
- `src/components/quiz/Test.jsx` - Quiz engine
- `src/components/chat/` - AI chat (HuggingFace integration)
- `src/components/Almacen.jsx` - File storage/management
- `public/` - Static assets (robots.txt here)

## Open Tasks (from todo.md)
- Login implementation (basic structure exists, not wired)
- Quiz with AI questions
- Toggle to disable random menu options
- Configurable number of quiz questions

## Gotchas
- `@` alias maps to `src/`
- Tailwind 4 uses `@tailwindcss/vite` plugin (not PostCSS)
- Component lazy loading used: `const Docs = lazy(() => import("./components/Docs"))`
- No lint/typecheck scripts in package.json (only `depcheck`)