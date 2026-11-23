# Fitness Platform — Technical Product & Engineering Specification

**Status:** Approved product scope / implementation baseline  
**Version:** 1.1  
**Date:** 2026-11-23  
**Working project name:** `fitness-platform` (brand name TBD)  
**Primary audience:** Codex, engineering contributors, product owner  
**Language:** English for all project documentation, code, comments, tests, commit messages, API descriptions, and architecture records; initial end-user locale: `pt-BR`.

> This specification is the source of truth for the initial release. It describes the product requirements, business rules, architectural constraints, verification strategy, and implementation boundaries. Do not silently reinterpret a rule: document open decisions in `docs/decisions/` and obtain a product decision where necessary. Avoid generating a massive application in one unreviewed change; work in independently testable vertical slices.

## 1. Product overview

Build a business-to-business-to-consumer (B2B2C) platform connecting independent fitness users, physical education professionals, and registered dietitians/nutritionists. Individuals use personal workout logging, food diaries, and progress monitoring for free. Verified professionals subscribe to a workspace plan tiered by number of active students and may prescribe workout and/or nutrition plans within their regulated scope. Students retain their personal histories regardless of professional relationships or subscription status.

### 1.1 Approved decisions

- **DEC-001 Personal workout fork:** Students may create and edit **personal copies** of professionally prescribed workouts. They **cannot modify the professional's original prescription**. Personal forks retain immutable provenance pointing to the originating professional plan/version.
- **DEC-002 Professional collaboration:** A professional may invite another verified professional as a workspace collaborator. **Each student's explicit, granular authorization** is required before sharing that student's data with the collaborator. Invitation alone grants no student data access.
- **DEC-003 Billing:** Students and personal users are free. A professional workspace owner pays a subscription **tiered by active students**; one student counts once per workspace even when monitored by multiple collaborators.
- **DEC-004 First release:** The MVP includes workout planning/logging, cardio, nutrition diary/macronutrients, professional nutrition prescriptions, progress, professional collaboration, and subscription management.

### 1.2 Actors and capabilities

- **User:** A single identity, optionally having several capabilities and memberships; owns personal records and can work independently.
- **Student:** A user with an accepted, active relationship with a professional workspace; **not** a separate account type.
- **Instructor:** Verified physical education professional; may author workout prescriptions, view authorized student workout/progress data, and collaborate according to granted scope.
- **Nutritionist:** Verified appropriately credentialed professional; may author dietary prescriptions and view authorized nutrition/progress data.
- **Workspace owner:** The professional/account responsible for subscription, workspace membership and billing; its administrative capabilities do not imply unrestricted access to student health data.
- **Collaborator:** A professional working in a workspace. Access is independently constrained by role, membership, student relationship, purpose, and grant.
- **Platform administrator:** Manages user moderation, credential-verification workflow, subscriptions, platform catalogs and audits. Elevated data access must be restricted, justified and audited.

Role is contextual, not an exclusive `user.type`. Enforce authorization on the server for every protected resource; hiding UI controls does not constitute authorization.

## 2. Release boundaries

### 2.1 MVP (launch-blocking)

1. Identity, personal profile, professional enrollment and credential-verification workflow.
2. Personal training planning and execution; professional workout prescriptions and personal forks; plan/session provenance and versioning.
3. Cardio entry, duration/distance/speed/intensity where applicable, transparent approximate calorie calculation.
4. Food catalog, quantified food diary, daily calories/macros/goals; verified nutritionist-authored nutritional plans, versioning, and compliance entry.
5. Weight/body measurements, training calendar, simple trends for strength and body metrics.
6. Professional dashboard, student invitations/acceptance/termination, collaborator invites, granular student authorization/revocation.
7. Workspace subscriptions, billing status and active-student tier enforcement.
8. Platform administration, relevant notifications, audit logs, privacy rights workflows.
9. Observability, migrations, CI, tests, documentation, usable mobile and web interfaces.

### 2.2 Explicitly excluded from MVP

Public gyms/reviews/rankings/search; native smartwatch/HealthKit/Health Connect sync; real-time messaging; real-time AI prescription/medical advice; booking and calendar; advanced team hierarchies; barcode scanning; sophisticated recipe composition and auto dietary substitutions; advanced reports; progress photos; full offline-first synchronization; gamification; social network; gym billing or POS.

**Note:** The mobile native app is an Expo application; the professional web console is Next.js. The web app may also provide a usable responsive personal interface, but a single shared DOM component tree is not required or recommended.

## 3. Functional requirements catalog

Priority labels: `MVP`, `V1` (first post-launch expansion), `FUTURE`. IDs are stable and must be preserved in issues, tests, pull requests, and documentation.

### 3.1 Identity and relationships

| ID | Requirement | Priority |
|---|---|---|
| RF-001 | Sign up, sign in, sign out, and recover account access. | MVP |
| RF-002 | Maintain profile, goals, physical information and preferences. | MVP |
| RF-003 | Use personal features without a professional relationship. | MVP |
| RF-004 | Register instructor and nutritionist professional profiles. | MVP |
| RF-005 | Send/accept/reject student invitations and establish relationships. | MVP |
| RF-006 | Support simultaneous relationships with multiple professionals/workspaces. | MVP |
| RF-007 | Let students view, limit and revoke access authorizations. | MVP |
| RF-008 | Verify professional credentials before professional prescriptions are enabled. | MVP |
| RF-009 | Terminate relationships without deleting the student's personal history. | MVP |

### 3.2 Training planning/execution

| ID | Requirement | Priority |
|---|---|---|
| RF-010 | Organize workout plans by day. | MVP |
| RF-011 | Support named workout splits (ABC, ABCDE, full body, etc.). | MVP |
| RF-012 | Browse/search an exercise catalog by muscle group and equipment. | MVP |
| RF-013 | Create custom exercises. | MVP |
| RF-014 | Configure planned sets, repetitions, load, rest, and notes. | MVP |
| RF-015 | Record actual sets, repetitions, and loads. | MVP |
| RF-016 | Record completed, partially completed, and missed workouts. | MVP |
| RF-017 | Provide a rest timer. | MVP |
| RF-018 | Record perceived exertion (RPE) and reps in reserve (RIR). | V1 |
| RF-019 | Suggest equipment-based exercise substitutions. | V1 |
| RF-020 | Plan automated load/volume progression. | V1 |
| RF-021 | Copy, archive, and version workout plans. | MVP |
| RF-022 | Provide exercise demonstration photos/videos. | V1 |

### 3.3 Cardio

| ID | Requirement | Priority |
|---|---|---|
| RF-023 | Log cardio by activity type. | MVP |
| RF-024 | Store duration, distance, speed and intensity when applicable. | MVP |
| RF-025 | Estimate activity energy expenditure. | MVP |
| RF-026 | View cardio activity history and trends. | MVP |
| RF-027 | Record heart rate when available. | V1 |
| RF-028 | Integrate wearables/fitness services. | FUTURE |
| RF-029 | Compare estimated food intake versus energy expenditure. | V1 |

### 3.4 Food and nutrition

| ID | Requirement | Priority |
|---|---|---|
| RF-030 | Log meals and foods consumed. | MVP |
| RF-031 | Search a catalog containing nutritional data and sources. | MVP |
| RF-032 | Compute meal calories, protein, carbohydrates and fat from quantities. | MVP |
| RF-033 | Aggregate daily nutrient intake. | MVP |
| RF-034 | Set personal nutritional goals. | MVP |
| RF-035 | Let verified nutritionists author and assign dietary prescriptions. | MVP |
| RF-036 | Record adherence and actual deviations from dietary prescriptions. | MVP |
| RF-037 | Create custom foods and composite recipes. | V1 |
| RF-038 | Offer substitutions previously defined by the nutritionist. | V1 |
| RF-039 | Track water intake. | V1 |
| RF-040 | Scan packaged food barcodes. | FUTURE |

### 3.5 Personal progress

| ID | Requirement | Priority |
|---|---|---|
| RF-041 | Log body weight and anthropometric measurements. | MVP |
| RF-042 | Show completed/missed workout calendar. | MVP |
| RF-043 | Plot strength, repetition, and training volume progress. | MVP |
| RF-044 | Plot body weight/measurement changes. | MVP |
| RF-045 | Maintain private progress photos. | V1 |
| RF-046 | Calculate adherence rates. | V1 |
| RF-047 | Compare distinct periods. | V1 |
| RF-048 | Detect personal records. | V1 |
| RF-049 | Export advanced progress reports. | V1 |

### 3.6 Professional workflows

| ID | Requirement | Priority |
|---|---|---|
| RF-050 | Show active students in a professional dashboard. | MVP |
| RF-051 | Let verified instructors issue individualized workouts. | MVP |
| RF-052 | Let professionals inspect authorized student activity/progress. | MVP |
| RF-053 | Revise prescriptions without overwriting previous versions. | MVP |
| RF-054 | Invite professional collaborators. | MVP |
| RF-055 | Grant collaborators narrowly scoped, role-appropriate permissions. | MVP |
| RF-056 | Provide professional feedback/comments. | V1 |
| RF-057 | Share educational documents/materials. | V1 |
| RF-058 | Generate advanced individual reports. | V1 |
| RF-059 | Flag persistently inactive students. | V1 |
| RF-060 | Manage advanced team structures and hierarchy. | V1 |
| RF-061 | Save reusable prescription templates. | V1 |
| RF-062 | Book/manage sessions or assessments. | FUTURE |

### 3.7 Gyms/discovery

| ID | Requirement | Priority |
|---|---|---|
| RF-063 | Register physical gym locations. | FUTURE |
| RF-064 | Associate users and professionals with gyms. | FUTURE |
| RF-065 | Allow eligible gym reviews. | FUTURE |
| RF-066 | Allow eligible professional reviews. | FUTURE |
| RF-067 | Search gyms/professionals by area. | FUTURE |
| RF-068 | Moderate, contest, and remove public reviews. | FUTURE |

### 3.8 Billing

| ID | Requirement | Priority |
|---|---|---|
| RF-069 | Subscribe a professional workspace to a paid plan. | MVP |
| RF-070 | Enforce active-student limits by tier. | MVP |
| RF-071 | Handle payment and subscription state updates/cancellations. | MVP |
| RF-072 | Gate paid professional features by workspace entitlement. | MVP |
| RF-073 | Offer advanced organization/team plans. | V1 |
| RF-074 | Provide detailed invoice/payment history. | V1 |
| RF-075 | Offer trial periods. | V1 |

### 3.9 Administration/notifications

| ID | Requirement | Priority |
|---|---|---|
| RF-076 | Administer users, verification requests and subscriptions. | MVP |
| RF-077 | Manage the platform exercise catalog. | MVP |
| RF-078 | Send relevant invite, permission and plan-change notifications. | MVP |
| RF-079 | Offer private in-app professional messaging. | V1 |
| RF-080 | Audit security-relevant changes and accesses. | MVP |
| RF-081 | Manage reports and content moderation workflows. | V1 |
| RF-082 | Show advanced platform operating metrics. | V1 |

### 3.10 Additional approved requirements

| ID | Requirement | Priority |
|---|---|---|
| RF-083 | Fork a professional workout into a personally editable version. | MVP |
| RF-084 | Keep immutable origin/provenance of personal workout forks. | MVP |
| RF-085 | Require each student's authorization for collaborator data sharing. | MVP |
| RF-086 | Link every workout session to the exact plan/version used. | MVP |
| RF-087 | Provide an access-grant review/revocation panel. | MVP |
| RF-088 | Track credential verification states. | MVP |
| RF-089 | Version professional nutrition prescriptions. | MVP |
| RF-090 | Count active students per workspace. | MVP |
| RF-091 | Block activations beyond the subscribed tier, without harming existing users. | MVP |
| RF-092 | Store food-data source, serving units and consumed quantity. | MVP |
| RF-093 | Provide rights-request flows for personal data export/correction/deletion, subject to retention obligations. | MVP |
| RF-094 | Attribute plan changes to author and origin. | MVP |
| RF-095 | Keep evidence of sharing authorizations and revocations. | MVP |
| RF-096 | Support prescription states: draft, active, superseded, archived. | MVP |

## 4. Business rules

These rules are normative. Enforcement must occur in the service/domain layer and be backed by tests, not only UI.

### 4.1 Identity/relationship

- **RN-001** A person has one platform user identity but may have several contextual roles/memberships.
- **RN-002** Personal registration and base usage are free.
- **RN-003** A professional/student relationship is active only after the student's acceptance.
- **RN-004** A student may have multiple active relationships at the same time.
- **RN-005** Ending a relationship does not erase the student's personal history.
- **RN-006** Professional prescriptions require verified, appropriate credentials.

### 4.2 Workouts

- **RN-007** Every professional plan has an author, recipient student, and version history.
- **RN-008** A student cannot edit an original professional prescription.
- **RN-009** A student may fork/copy and freely customize a personal workout.
- **RN-010** A personal fork references the specific source prescription version and is not automatically overwritten by later revisions.
- **RN-011** Completed/partial sessions reference the exact personal/professional plan version in effect.
- **RN-012** Actual execution data and planned data are recorded separately; actuals drive execution reporting.
- **RN-013** Publishing a new plan version never rewrites historical completed sessions.
- **RN-014** A student fork must be visibly identified as personal and not mistaken for a professional prescription.

### 4.3 Nutrition

- **RN-015** Users can log food and view nutritional estimates without a professional relationship.
- **RN-016** Self-defined nutritional goals are not professional dietary prescriptions; only a qualified, verified nutritionist can issue the latter.
- **RN-017** Dietary prescriptions have author, publication date, and immutable version history.
- **RN-018** Actual food consumption is distinct from prescribed meals.
- **RN-019** Energy/macronutrients are computed from portion quantities and recorded, sourced nutritional values.
- **RN-020** Calculated energy expenditure, calorie totals, and body-composition metrics are estimates rather than clinical measurements.

### 4.4 Collaboration/privacy

- **RN-021** A professional-to-professional invitation alone never exposes a student's records.
- **RN-022** Each student authorizes a collaborator explicitly with visible data scopes.
- **RN-023** Access is limited by purpose and data category (workouts, nutrition, body progress, etc.).
- **RN-024** Revocation stops future unauthorized access; separately required legal record retention may still apply.
- **RN-025** Cross-workspace access is denied unless a valid relationship and resource-specific authorization exist.
- **RN-026** Material prescription, permission, and access events are auditable.

### 4.5 Billing

- **RN-027** Students/personal users are not billed by the platform in the MVP.
- **RN-028** The workspace owner is the subscriber and billing contact.
- **RN-029** An active student is one with an accepted, currently active workspace enrollment (regardless of recent training activity).
- **RN-030** A student counts once within a workspace even when followed by several collaborators.
- **RN-031** Pending invites and expired/terminated enrollments do not count towards the active-student tier.
- **RN-032** At a student limit, new enrollments cannot be activated unless the tier/capacity changes. Existing students and their records remain accessible under appropriate entitlements.
- **RN-033** Nonpayment/cancellation must not immediately delete student-owned history; professional features are restricted according to an explicit policy and applicable legal obligations.
- **RN-034** A collaborator works within the owner-funded workspace subject to permissions and plan limits; an independent portfolio requires that professional's own workspace.

## 5. Non-functional requirements

| ID | Constraint / measurable verification target | Priority |
|---|---|---|
| RNF-001 | Encrypt transit with TLS, protect data at rest, never expose secrets/client credentials. | MVP |
| RNF-002 | Server checks identity, role, workspace, relationship, and resource permission on every protected operation. | MVP |
| RNF-003 | Data inventory/purpose/legal basis documented; GDPR/LGPD-style data rights workflow (LGPD is binding launch context). | MVP |
| RNF-004 | Automated tests verify there is no unauthorized cross-workspace/student data access. | MVP |
| RNF-005 | Target >=99.9% monthly availability after production stabilization; monitor and report against target. | MVP |
| RNF-006 | Target API p95 <500ms for documented normal-load operations and environment; measure under load. | MVP |
| RNF-007 | API/worker deployment can scale independently without changing domain model. | MVP |
| RNF-008 | Log a normal planned set in no more than three user actions on mobile; usability test against this goal. | MVP |
| RNF-009 | Web UI target WCAG 2.2 AA; apply native accessibility labels and equivalent accessibility checks in mobile. | MVP |
| RNF-010 | Expo Android/iOS mobile interface and responsive Next.js professional web interface. | MVP |
| RNF-011 | Offline-first record/reconnect sync for workout sessions. | V1 |
| RNF-012 | Idempotent repeatable writes where appropriate; no duplicate workout sessions/webhook effects. | MVP |
| RNF-013 | Log actor, action, resource, time and necessary context for sensitive operations; protect audit log content. | MVP |
| RNF-014 | Automated backups and tested restore; initial *targets* RPO <=24h, RTO <=4h. | MVP |
| RNF-015 | User data export in structured machine-readable formats, respecting other persons' privacy. | MVP |
| RNF-016 | Modular organization, automated unit/integration tests and CI gates. | MVP |
| RNF-017 | Structured logging, trace/request IDs, error monitoring and alerts without PHI leakage. | MVP |
| RNF-018 | All source/docs English; user-facing initial locale pt-BR with translatable keys. | MVP |
| RNF-019 | Store estimate formula/version, source and parameters to explain calculated figures. | MVP |
| RNF-020 | Ending relationships/subscriptions never deletes a student's personally owned session/food/body records by accident. | MVP |

### 5.1 Mandatory engineering quality gates (additional implementation constraints)

- **At least 90% coverage each for statements, lines, functions, and branches**, as measured by maintained unit/component/integration suites on instrumented application/domain code. Enforce in CI on applicable packages. Use explicit instrumented source inclusion so untested source counts as uncovered; only exclude generated files, test files, declarations, migration snapshots and purely declarative configuration. Do not exclude difficult application code to increase the number.
- **Security-sensitive domain/auth/billing/consent code must independently reach >=90% coverage per module** wherever meaningful; include negative authorization cases, not only happy paths.
- Web E2E **must use Playwright** and cover critical functional paths; native iOS/Android E2E **must use Maestro** (or an explicitly documented, justified native E2E framework). Browser Playwright tests do not count as verification of native UI.
- All pull requests: lint, formatting, TypeScript typecheck, unit/integration tests, coverage, web E2E smoke. Native E2E on appropriate emulator runners for main/release (nightly during early development if CI cost dictates; document schedule).
- No unimplemented stubs presented as finished work, no fake tests, no placeholder success screens, no committed secrets, no disabled tests to pass a gate.

## 6. Proposed architecture and repository layout

### 6.1 Stack (initial design decision)

- **Language:** TypeScript strict throughout.
- **Monorepo:** pnpm workspaces + Turborepo. Commit only one root lockfile.
- **Mobile:** Expo + React Native + Expo Router; NativeWind with a stable Expo-compatible React Native Reusables/shadcn-inspired component collection.
- **Web:** Next.js App Router + Tailwind CSS + official shadcn/ui.
- **Initial API:** Next.js Route Handlers in `apps/web` under versioned `/api/v1/**`; both clients call the same backend. Do not expose database credentials to the mobile bundle. Extract `apps/api` only if architecture/requirements warrant it later.
- **Database:** PostgreSQL + Drizzle ORM; migration files versioned. Prefer `numeric/decimal` semantics for food weights, amounts and money.
- **Auth:** Better Auth with documented Expo integration; secure native token/cookie storage, supported cookie/redirect/deep-link configuration. Domain authorization is implemented separately from authentication.
- **Validation:** shared Zod schemas at trust boundaries; consistent API error format.
- **Data fetching:** TanStack Query; a typed shared client in `packages/api-client`.
- **Payments:** provider adapter plus verified webhook processing; do not hardwire business rules to a provider. Pick the supported provider only after checking Brazil subscription requirements (currency, invoices, taxation, retries).
- **Testing:** Vitest for TypeScript domain/API/web components; Jest + React Native Testing Library for native components if required by Expo tooling; Playwright for web; Maestro for native. Merge eligible coverage output to root `coverage/` where practical.
- **Infrastructure:** Docker Compose for local PostgreSQL; environment templates and secrets managed per deployment.

**UI sharing boundary:** share design tokens, icons guidelines, validation schemas, data models and domain utilities. Do **not** import shadcn/ui DOM components directly into React Native. Maintain distinct `packages/ui-web` and `packages/ui-mobile` (or local app layers) backed by compatible semantic tokens.

### 6.2 Required root-level layout

```text
fitness-platform/
├── apps/
│   ├── mobile/                  # Expo / React Native / Expo Router
│   └── web/                     # Next.js, web console, /api/v1 backend
├── packages/
│   ├── api-client/              # Shared typed API client
│   ├── auth/                    # Shared auth contracts/helpers (server secrets stay server-side)
│   ├── config/                  # TypeScript, ESLint, tooling config
│   ├── database/                # Drizzle schemas/migrations/server-only access
│   ├── domain/                  # Pure domain services, policies and calculations
│   ├── schemas/                 # Zod contracts, shared DTOs
│   ├── ui-web/                  # shadcn/ui-compatible web components
│   ├── ui-mobile/               # React Native Reusables-based components
│   └── design-tokens/          # Semantic colors, spacing, typography
├── docs/
│   ├── product/                 # Requirements and user journeys
│   ├── architecture/            # System context, bounded contexts, data flows
│   ├── api/                     # Endpoints/OpenAPI contracts
│   ├── security/                # Data classification, roles, permissions, LGPD
│   ├── testing/                 # Test strategy, coverage definition
│   ├── runbooks/                # Local setup, CI, incidents and restore
│   └── decisions/               # ADR-0001... architecture decision records
├── tests/
│   ├── e2e/web/                 # Playwright specs, fixtures, helpers
│   ├── e2e/mobile/              # Maestro flows
│   ├── integration/             # Cross-package / DB integration tests
│   └── fixtures/                # Deterministic non-sensitive test data
├── coverage/                    # Generated; gitignored (optionally .gitkeep)
├── scripts/                     # Scaffolding, checks, seed, tooling
├── .github/workflows/
├── .env.example
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── pnpm-lock.yaml
├── AGENTS.md                     # Concise instructions for Codex
├── README.md
└── LICENSE                       # Only if licensing decision is made
```

`docs/`, `tests/`, `coverage/`, and `packages/` are **siblings of `apps/`, not nested inside it**. Package-local tests may live beside their source, but integrated E2E suites and shared test infrastructure must remain in root `tests/`. Coverage artifacts are centralized under root `coverage/` and must never be committed.

### 6.3 Domain modules

- Identity & Credentials
- Workspaces, Memberships & Student Enrollments
- Access Grants & Audit
- Exercise Catalog & Workout Prescription Versions
- Workout Forks & Execution Sessions
- Cardio & Energy Estimation
- Food Catalog, Nutrition Prescription Versions & Food Diary
- Body Metrics & Progress
- Billing, Tiers & Entitlements
- Notifications & Administration

Prefer a **modular monolith** for MVP, with explicit domain boundaries, rather than microservices. Shared domain packages must not depend on Next.js, Expo, or database clients when they can be pure TypeScript. Only server-side code may import database/provider adapters.

## 7. Candidate domain model

Conceptual entities (exact schemas to be refined in migration PR):

- `users`, `user_profiles`, `professional_profiles`, `credential_verifications`.
- `workspaces`, `workspace_memberships`, `student_invitations`, `student_enrollments`.
- `access_grants`, `consent_events`, `audit_events`.
- `exercises`, `custom_exercises`, `workout_plans`, `workout_plan_versions`, `workout_days`, `planned_exercises`, `planned_sets`.
- `personal_workout_forks` with immutable `source_plan_version_id` and author.
- `workout_sessions`, `performed_sets`, `cardio_sessions`.
- `foods`, `food_servings`, `food_data_sources`, `food_entries`, `nutrition_goals`.
- `nutrition_plans`, `nutrition_plan_versions`, `planned_meals`, `planned_foods`.
- `body_measurements`.
- `subscription_tiers`, `workspace_subscriptions`, `billing_webhook_events`.
- `notifications`, `data_subject_requests`.

### 7.1 Data-model invariants

- Use stable UUID/ULID identifiers and UTC timestamps; preserve the user's IANA timezone for calendar grouping.
- Plans have a **mutable draft** and **immutable published versions**. Sessions must reference a published version or immutable snapshot; never silently change historical meaning.
- Personal forks can evolve through their own versions; never mutate source professional versions.
- Quantities and nutrient values use defined canonical units and decimal precision; record original unit and conversion where needed.
- Billing tier counts are computed from distinct active `student_enrollments` scoped to a workspace; do not count pending invitations or duplicate collaborator relationships.
- A relationship is **not** proof of authorization to every resource; grants should be data-category scoped, revocable, timestamped, and linked to actor and purpose.
- Retention vs user-deletion obligations need explicit policy. Use soft-delete only when justified; avoid indefinite retention by default.
- Isolate workspace queries at server-level and consider database row-level security only as defense in depth, not a substitute for domain checks.

### 7.2 Proposed lifecycle states

- Professional verification: `pending`, `under_review`, `verified`, `rejected`, `suspended`.
- Student invitation: `pending`, `accepted`, `rejected`, `expired`, `cancelled`.
- Enrollment: `active`, `ended`, `suspended` (suspension behavior documented).
- Access grant: `active`, `revoked`, `expired`.
- Prescription: `draft`, `active`, `superseded`, `archived`.
- Session: `in_progress`, `completed`, `partial`, `cancelled`.
- Subscription: map provider states to domain states (e.g., `active`, `past_due`, `cancelled`, `inactive`) in a well-tested adapter.

## 8. Suggested API resources (MVP)

`/api/v1` hosts an authenticated, versioned JSON API consumed by web and mobile. Validate inputs, paginate list endpoints, authorize each resource, and return stable typed error codes.

- `GET/PATCH /me`; `POST /me/exports`; `POST /me/data-requests`.
- `POST/GET /professional-profiles`; `POST /professional-profiles/{id}/verification` (safe admin workflow).
- `POST/GET /workspaces`; `/workspaces/{id}/members`; `/workspaces/{id}/student-invitations`.
- `POST /student-invitations/{id}/accept` and `/reject`; relationship end endpoint.
- `GET/POST /access-grants`; `POST /access-grants/{id}/revoke`.
- `GET /exercises`; workout plans create/list/get; publish plan version; fork a version.
- `POST/GET /workout-sessions`; add/update actual sets; complete/partial session.
- `POST/GET /cardio-sessions`; `GET /progress/workouts`; `GET /progress/body`.
- `GET /foods`; `POST/GET /food-entries`; `GET/PUT /nutrition-goals`.
- `POST/GET /nutrition-plans`; publish a nutrition plan version; nutrition adherence.
- `GET/POST /body-measurements`.
- `GET /billing/tiers`; workspace checkout/portal access; provider webhook route (signature verified, event idempotency).
- `GET /notifications`; admin verification/catalog/billing endpoints protected by distinct policies.

These are resource sketches, **not a locked public API**. Draft OpenAPI/contract documentation before implementing each vertical slice. Keep privileged webhook/auth paths separate from normal versioned resources as appropriate.

## 9. Acceptance scenarios (end-to-end)

Implement deterministic E2E fixtures, positive paths, and failure/negative cases. A feature is not "done" unless the relevant documented scenarios and tests pass.

- **AC-001 Free user:** Register, create a personal split, start and finish a workout, record sets, see calendar and progress; no payment demanded.
- **AC-002 Nutrition diary:** Add a food portion with known nutritional facts, view meal and daily macro totals, edit/remove entry and observe correct recalculation.
- **AC-003 Cardio:** Log a timed activity and display a clearly labelled calorie estimate and its method.
- **AC-004 Professional onboarding:** Verify professional credential via authorized admin; create subscribed workspace; invite student; student accepts; instructor publishes a versioned plan.
- **AC-005 Personal fork:** Student forks prescribed version V1, edits the fork and completes a session. Professional V1 remains unchanged; session points to the fork's exact version.
- **AC-006 Version history:** Professional publishes V2; completed sessions associated with V1/fork are unchanged and still readable.
- **AC-007 Nutrition prescription:** Authorized nutritionist publishes a meal plan; student records actual intake and sees differences; no other professional can silently issue it.
- **AC-008 Collaborator authorization:** Instructor invites collaborator, collaborator accepts, but cannot read student's records before grant; student grants only allowed categories; then reads permitted records but not blocked categories.
- **AC-009 Revocation:** Student revokes grant; previous access no longer works on subsequent requests; event is audited.
- **AC-010 Tenant isolation:** A separate workspace user guesses resource IDs and receives denial/non-disclosure; no cross-tenant data leak.
- **AC-011 Billing capacity:** One accepted enrollment counts once despite multiple collaborators; pending invite counts zero; activating student beyond tier is denied; existing students remain unaffected.
- **AC-012 Billing webhook:** Duplicate and out-of-order provider events do not cause double counting or unauthorized activation.
- **AC-013 Relationship end:** End enrollment; student retains personal history; professional no longer has unauthorized access; legal professional records handled per policy.
- **AC-014 Data portability:** Student can request/export their data securely; secrets and third-party private data excluded.
- **AC-015 Mobile:** Native app can sign in, log a workout and food entry, then display progress on an emulator/device.

## 10. Detailed testing strategy

1. **Unit / property-like tests:** Domain invariants, permissions, plan forking, version immutability, decimal nutrient calculations, cardio estimations, tier counting, state transitions, time zones. No external network.
2. **Integration tests:** Real disposable PostgreSQL, Drizzle migrations, authenticated API requests, tenant isolation, transactions, webhook idempotency, access revocation. Use isolated test database/container.
3. **Component tests:** Important form states, accessibility, error and validation paths for web and mobile.
4. **Web E2E Playwright:** Account access, free workout flow, food tracking, professional onboarding with mocked payment provider, invitation/acceptance, personal fork, consent/revoke, tier limits, permission denials. Tests live in `tests/e2e/web`; store Playwright artifacts outside source folders, e.g. `tests/artifacts/` (gitignored).
5. **Native E2E Maestro:** Login, execute a workout/set, food logging, progress display, basic invitation acceptance, validation errors. Native tests in `tests/e2e/mobile`.
6. **Security regression:** Verify IDOR/BOLA, role escalation, invalid grants, admin restriction, webhook signature failures, cross-tenant lookup denials, credential privilege gaps.
7. **Coverage:** Configure Vitest/Jest thresholds for **90% minimum in all four metrics** (statement, branch, function, line); combine/assess packages fairly. Do not count E2E test existence as code coverage. Collect HTML/LCOV/text summaries in `coverage/`.
8. **CI:** `lint`, `format:check`, `typecheck`, `test:unit`, `test:integration`, `test:coverage`, `test:e2e:web`, `build` as appropriate; mobile E2E on compatible simulator runners. Fail on threshold violation. Avoid permanent E2E skips; if infrastructure cannot run a native test locally, document how CI runs it.

### 10.1 Reference scripts expected at root

```text
pnpm dev
pnpm dev:web
pnpm dev:mobile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:coverage
pnpm test:e2e:web
pnpm test:e2e:mobile
pnpm build
pnpm db:migrate
pnpm db:seed
```

Implement scripts so that they actually work, not as placeholders. Document any local prerequisites (Android emulator, macOS/Xcode for iOS, Docker, environment configuration).

## 11. Security, compliance and user safety

- Brazilian **LGPD** applies to personal data; health-related information is sensitive personal data. Document processing purposes and legal bases with legal counsel. Granular sharing grants are product controls; do not assume a click authorizes every processing purpose forever.
- Verify professional status as applicable to Brazilian practice before issuing professional prescriptions. Store verification evidence securely, allow re-review and suspension.
- The system assists qualified professionals and individual tracking. It does **not** diagnose conditions, prescribe medication or autonomously create professional nutrition/exercise prescriptions in the MVP.
- Defend against broken object-level authorization (BOLA/IDOR), privilege escalation, tenant leakage, enumeration and account takeover.
- Apply rate limiting, secure session management and login protection; do not store mobile secrets or service-role database credentials in Expo client code.
- All sensitive requests must be authorized server-side against the actual data subject and purpose. Test denial after relationship termination and grant revocation.
- Log audit metadata without raw health payloads. Protect any credential documents and personal exports through authorized access and reasonable expiration.
- Implement account export/deletion workflows subject to applicable retention duties; define retention rules in `docs/security/data-retention.md` before production.
- Transparent energy estimation: version formulas, unit conversions, assumptions and source. Avoid unsupported accuracy claims or medical interpretations.

## 12. Definition of Done

A change may be marked done only when:

- Relevant RF/RN/RNF references are stated in the issue/PR.
- Inputs, authorization, data isolation and error handling are implemented.
- Domain invariants and adverse/negative cases have tests.
- Existing user histories, origins and plan versions are preserved.
- Relevant documentation and OpenAPI contracts are updated **in English**.
- Formatting, linting, strict TS checks and unit/integration tests pass.
- Coverage gates (all four >=90%) pass on the configured instrumented source set.
- Key cross-role flows have Playwright specs; native key flows have Maestro specs where relevant.
- Database changes have committed migrations and a rollback/mitigation strategy.
- No secrets are committed and no unreviewed logging of sensitive personal data is introduced.
- The feature is usable on target form factors and has meaningful loading/empty/error states.

## 13. Initial delivery sequence

1. **Foundation:** Scaffold pnpm + Turbo + Next.js + Expo, root folders, English docs, `AGENTS.md`, format/lint/TS, CI, initial component themes. Demonstrate web/mobile launch.
2. **Identity & workspace:** PostgreSQL/Drizzle/Better Auth Expo support, verified roles, workspace memberships, student invites, consent grants, negative authorization tests.
3. **Training vertical slice:** Exercise catalog, plan versions, personal fork, set logging, cardio and progress; full web Playwright and mobile Maestro smoke flows.
4. **Nutrition vertical slice:** Food catalog with documented source, portions and macros, daily diary, nutritionist prescription versions, adherence; deterministic calculations and tests.
5. **Professional dashboard:** Student views authorized by role/scope, collaborator invites and grants/revocation.
6. **Billing + admin:** Subscription tiers, provider checkout/webhooks, active student counting, admin verification and observability.
7. **Hardening:** Data rights workflow, load/performance baseline, backup/restore drill, security review, all acceptance scenarios and coverage gates.

## 14. Open decisions / do not invent silently

- **Product branding:** name and store identifiers undecided; use neutral working identifiers until chosen.
- **Billing currency/provider/prices:** tiers are agreed; actual prices, student caps and payment provider need commercial confirmation. A preliminary illustrative set may be 10 / 30 / 100 / >100 active students, but **these are not approved price tiers**.
- **Exact professional verification mechanism:** verification workflow and Brazilian profession-specific obligations need legal/operational review.
- **Food database/license:** choose documented, lawful data source(s); do not claim accuracy from an unsourced catalog.
- **Data retention periods:** require legal analysis, especially professional recordkeeping and rights requests.
- **Deployment:** hosting and secrets infrastructure can be selected separately after core scaffold.
- **API style:** REST versioned is the default, but document justified deviation in an ADR.
- **Native testing tooling:** prefer Maestro as stated; if SDK incompatibility arises, retain native E2E coverage and record migration ADR.

## 15. Engineering references (official documentation)

- Expo create project: https://docs.expo.dev/get-started/create-a-project/
- Expo monorepos: https://docs.expo.dev/guides/monorepos/
- Turborepo: https://turborepo.dev/docs/reference/create-turbo
- pnpm workspaces: https://pnpm.io/workspaces/
- shadcn/ui Next.js: https://ui.shadcn.com/docs/installation/next
- React Native Reusables: https://github.com/founded-labs/react-native-reusables
- Better Auth Expo: https://better-auth.com/docs/integrations/expo
- Expo native E2E / Maestro: https://docs.expo.dev/tutorial/cicd/e2e-tests/
- Vitest coverage: https://vitest.dev/config/coverage
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers

**Implementation instruction:** Build actual working, reviewable code in small stages. Prefer correctness, authorization and tests over breadth. Do not silently treat `V1`/`FUTURE` features as MVP.
