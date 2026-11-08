<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes

Next.js 16 App Router app (`src/app`), React 19.3, TypeScript strict. No tests, no CI.

## Commands

- `npm run dev` — dev server (localhost:3000). `npm run build`, `npm run lint` (`eslint`).
- No typecheck script; run `npx tsc --noEmit` for type-checking before considering work done.
- Verify runtime behavior with `npm run build` — build-time prerendering catches errors the dev server misses.

## Toolchain quirks (verify against bundled docs, not training data)

- **Turbopack is the bundler** for dev and build. Custom webpack config is not used; transforms go under `turbopack.rules` in `next.config.ts` (Tailwind's is already set up there).
- **`cacheComponents` + `partialPrefetching: true`** in `next.config.ts`: data fetching is dynamic by default; cache with the `use cache` directive. Dynamic data must render within a `<Suspense>` boundary or build fails. Route segment `runtime` exports are unsupported with this flag.
- **React Compiler is enabled** (`reactCompiler: true`)—don't hand-add `useMemo`/`useCallback` memoization.
- **Tailwind v4 via CSS**: no `tailwind.config`; theme variables live in `src/app/globals.css`. Prefer CSS variables over arbitrary utility overloads.

## shadcn/ui (Base UI — NOT Radix)

- Style is `base-nova` on `@base-ui/react`. Read existing components in `src/components/ui/` before writing similar ones; args differ from classic shadcn.
- Icons from `lucide-react`. Add components with `npx shadcn add <name>` rather than hand-writing.
- `cn` comes from the `cn` package, re-exported by `src/lib/utils.ts`. Path alias: `@/*` → `src/*`.
