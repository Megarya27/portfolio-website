## Repo snapshot

- Stack: Next.js (app router) + TypeScript + TailwindCSS. Entry points live in `app/` (server components by default).
- Local path alias: imports use `@/...` (see `tsconfig.json` -> `paths`).
- Dev flow: `npm run dev` (Next dev server), `npm run build`, `npm run start`, `npm run lint` (Next lint).

## Quick orientation for editing

- Pages & routes: `app/` contains the app-router pages and layout (`app/layout.tsx`, `app/page.tsx`).
- UI components: `components/` (page-level components often default-exported) and `components/ui/` (self-contained widgets, small primitives).
- Styling: Tailwind configured in `tailwind.config.ts`. Global CSS is `app/globals.css`.
- Utility helpers: `lib/utils.ts` exports `cn()` which composes `clsx` + `tailwind-merge` — use it for className merging.

## Important codebase conventions (do not assume defaults)

- Client vs Server components: This repo uses the app router. Files that use browser APIs, `useEffect`, or hooks include the React directive `"use client"` at the top (example: `components/ui/vortex.tsx`). Add that pragma for any new component that accesses the DOM, window, document, timers, or uses client hooks.
- Import style: Use the `@/` alias for imports (example: `import Hero from "@/components/Hero";`). That alias is defined in `tsconfig.json`.
- Export style: The repo mixes default and named exports. Match the existing file you are modifying: e.g., `components/Hero.tsx` uses default export, while `components/ui/vortex.tsx` exports a named `Vortex`.
- External runtime scripts: Vanta/Three are loaded via CDN in `components/ui/VantaNetEffect.js` using `next/script` with `strategy="beforeInteractive"` and guarded by `window.VANTA` checks; follow the same pattern for runtime CDN assets (load, guard, initialize, destroy on cleanup).

## Files to inspect for examples

- App entry / layout: `app/layout.tsx`, `app/page.tsx`
- Canvas/WebGL effects: `components/ui/vortex.tsx` (canvas-based Vortex), `components/ui/VantaNetEffect.js` (Vanta/Three CDN usage)
- Class merging util: `lib/utils.ts` (use `cn()` instead of hand-merging className strings)
- Tailwind config: `tailwind.config.ts` (where content paths and custom colors live)
- Script & runtime guidance: inspect `components/ui/VantaNetEffect.js` for `next/script` usage and cleanup patterns

## Developer workflows (explicit commands)

- Start local dev server: `npm run dev` (Next dev mode; use Chrome/Edge dev tools for DOM/canvas debugging)
- Build for production: `npm run build` then `npm run start` to run the production server
- Linting: `npm run lint` (relies on `eslint-config-next`)

## Small, actionable rules for AI agents

- When introducing browser code, add `"use client"` at file top and prefer effect cleanup (remove event listeners, destroy Vanta instances).
- Use the `@/` path alias for imports. If you refactor a file, keep its original export style (default vs named) unless you update all callers.
- Prefer `cn(...)` from `lib/utils.ts` for composing Tailwind classes; it prevents class duplication using `tailwind-merge`.
- If adding runtime external scripts, load via `next/script` with `strategy` and always guard with `typeof window !== 'undefined'` and a runtime-ready check (example: `window.VANTA`).
- Check `package.json` scripts before suggesting new commands—use the repository's npm scripts.

## Where to ask for clarification / next steps

- If a change touches routing or server props in `app/`, ask whether it should be server or client—this repo prefers the app-router server components by default.
- If adding new, heavy runtime packages (three, vanta, three examples), confirm whether to prefer CDN `next/script` usage (as in `VantaNetEffect.js`) or to add an NPM dependency (the project currently uses CDN for Vanta).

---
If anything here is unclear or you'd like the file to include more examples (e.g., common import blocks, a short code snippet showing correct `use client` placement), tell me which area to expand and I will update the file.
