# Architecture overview

Two clients will use a versioned JSON API in Next.js. Protected route handlers will validate input with Zod, resolve the authenticated actor server-side, apply domain policies, and use PostgreSQL through Drizzle. Shared client code cannot import server-only database modules. The mobile app never receives database credentials.

The foundation currently exposes only `GET /api/v1/health`. Authentication, authorization, audit persistence, and feature resources begin with Identity & Workspaces. TanStack Query and Better Auth are deferred until that slice has actual client state and credentials to manage. The health route returns a request ID and logs request metadata. Protected routes will follow the same pattern without logging health payloads.

## Dependency direction

`apps/web` → `packages/database`, `schemas`, `domain`, `ui-web`. The database package blocks browser and React Native conditional exports.

`apps/mobile` → `packages/api-client`, `schemas`, `domain`, `ui-mobile`.

`ui-web` and `ui-mobile` → `design-tokens`; neither imports the other.
