# Architecture overview

Two clients will use a versioned JSON API in Next.js. Protected route handlers will validate input with Zod, resolve the authenticated actor server-side, apply domain policies, and use PostgreSQL through Drizzle. Shared client code cannot import server-only database modules. The mobile app never receives database credentials.

The foundation exposes `GET /api/v1/health`. The first web identity slice now uses Better Auth for free personal registration, email/password login, logout, and PostgreSQL-backed sessions. Its library-owned routes live at `/api/auth/*`; resource routes remain versioned under `/api/v1/*`. The server reads the session for `/account`; no client-supplied user ID or role is trusted. Professional credential verification, workspaces, invitations, recovery email, and mobile auth remain in later slices. TanStack Query remains deferred until a product resource needs client caching. The health route returns a request ID and logs request metadata. Protected resource routes will follow the same pattern without logging health payloads.

This implements the web entry subset of RF-001 and RN-001/RN-002, with server session checks for RNF-002 and accessible form controls for RNF-009. RF-001 recovery and all workspace/professional authorization remain open.

## Dependency direction

`apps/web` → `packages/database`, `schemas`, `domain`, `ui-web`. The database package blocks browser and React Native conditional exports.

`apps/mobile` → `packages/api-client`, `schemas`, `domain`, `ui-mobile`.

`ui-web` and `ui-mobile` → `design-tokens`; neither imports the other.
