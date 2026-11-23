# Web app

Next.js App Router hosts the responsive personal-account entry pages, protected `/account`, Better Auth routes at `/api/auth/*`, and the versioned `/api/v1/health` route. Run `pnpm dev:web` from the repository root after starting PostgreSQL and applying migrations. Open `/login` or `/register` to test web account access. Workspaces, professional verification, recovery email, and product resources remain separate slices.

The `components/ui/badge.tsx` primitive was generated with the official shadcn/ui CLI. `packages/ui-web` contains a separate shared web Button. Both use Tailwind CSS semantic tokens; `globals.css` explicitly scans the shared package for utility classes. Native UI lives in `packages/ui-mobile`.
