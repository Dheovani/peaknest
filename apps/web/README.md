# Web app

Next.js App Router hosts the responsive foundation page and `/api/v1/health`. Run `pnpm dev:web` from the repository root. Product routes are added one vertical slice at a time; the current disabled entry action is an explicit foundation state.

The `components/ui/badge.tsx` primitive was generated with the official shadcn/ui CLI. `packages/ui-web` contains a separate shared web Button. Both use Tailwind CSS semantic tokens; native UI lives in `packages/ui-mobile`.
