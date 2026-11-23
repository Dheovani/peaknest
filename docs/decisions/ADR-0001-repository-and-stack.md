# ADR-0001: Repository and foundation stack

**Status:** Accepted for the foundation. **Date:** 2026-11-23.

## Context

The specification requires two clients, a shared versioned API, strict TypeScript, and separate native/web UI implementations. Generated Turborepo examples contained an extra docs app and an npm lockfile.

## Decision

Use pnpm 11 workspaces and Turborepo 2. Keep only Next.js App Router (`apps/web`) and Expo SDK 58 with Expo Router (`apps/mobile`) runnable. Use Next.js route handlers for `/api/v1/**`. Share pure domain code, Zod schemas, API client, auth contracts, config, and semantic tokens. Keep Drizzle/PostgreSQL in a server-only package with `browser` and `react-native` exports blocked. Web UI uses Tailwind 4 and an official shadcn/ui CLI-generated Badge alongside a shared shadcn-style Button. Mobile uses NativeWind 4.2.7 and a documented native shadcn-inspired Pressable/Text primitive instead of importing DOM components. NativeWind compatibility has been checked with Expo Doctor and Android/iOS exports; emulator runtime remains to be validated. No billing provider, tier caps, credential verification procedure, food catalog, or retention period is chosen here.

## Consequences

The root has one pnpm lockfile and a modular monolith boundary. React versions differ between Next.js and Expo as required by each framework. Mobile and web components are implemented separately. Identity, Better Auth integration, and actual domain migrations start in the next vertical slice; the current schema is intentionally empty.
