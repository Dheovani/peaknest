# Fitness Platform

Foundation for a B2B2C fitness, nutrition, and professional coaching platform. The commercial name is undecided. Product behavior is defined in [the technical specification](docs/product/technical-specifications.md). Web personal registration, login, logout, and a protected account page are implemented. Workspaces, professional verification, workouts, nutrition, subscriptions, and mobile login are still pending.

## Prerequisites

- Node.js 24+, Corepack, pnpm 11.27.0, Docker Desktop or another Docker Compose environment.
- Android Studio/emulator for local Android checks; macOS with Xcode for iOS simulator checks.
- Playwright Chromium for browser E2E; Maestro for native E2E.

## Local setup

1. Run `corepack pnpm install` from the repository root.
2. Copy `.env.example` to `.env` and replace `BETTER_AUTH_SECRET` with a random value of at least 32 characters.
3. Run `docker compose up -d postgres` and `corepack pnpm db:migrate`.
4. Run `corepack pnpm dev:web` and open `http://localhost:3000/login`. Create a free personal account at `/register` to test the flow.

The web app starts at `http://localhost:3000`; the mobile app opens through Expo with `corepack pnpm dev:mobile`. On Windows PowerShell, use `pnpm.cmd` if execution policy blocks `pnpm.ps1`. An Android emulator uses `http://10.0.2.2:3000` for the host API once client calls are added. Set `EXPO_PUBLIC_API_URL` accordingly. No backend secret belongs in an `EXPO_PUBLIC_*` value.

## Commands

`pnpm dev`, `dev:web`, `dev:mobile`, `lint`, `format:check`, `typecheck`, `test`, `test:unit`, `test:integration`, `test:coverage`, `test:e2e:web`, `test:e2e:mobile`, `build`, `db:migrate`, and `db:seed` are root scripts. Integration tests require `TEST_DATABASE_URL` pointing to a disposable PostgreSQL database. Run `pnpm exec playwright install chromium` before web E2E and install Maestro before native E2E. `db:seed` validates database connectivity but inserts no invented domain data.

## Directory map

| Path          | Purpose                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `apps/web`    | Next.js App Router, dashboard shell, versioned JSON API                                              |
| `apps/mobile` | Expo Router app for Android and iOS                                                                  |
| `packages`    | Shared domain, schemas, API client, auth contracts, config, tokens, UI; server-only database adapter |
| `docs`        | Product specification, architecture, security, decisions, API contract, runbooks                     |
| `tests`       | PostgreSQL integration, Playwright web, and Maestro native tests                                     |
| `coverage`    | Generated reports, ignored by Git                                                                    |
| `scripts`     | Database migration and seed entry points                                                             |

The first feature slice is **Identity & Workspaces**; only web personal-account access is implemented so far. See [ADR-0001](docs/decisions/ADR-0001-repository-and-stack.md) for stack decisions and [testing strategy](docs/testing/strategy.md) for gates and current gaps.
