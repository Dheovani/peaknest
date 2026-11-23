<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": true` in the root `turbo.json` or `turbo.jsonc` to opt in; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

## Project rules

- Lead responses with the next action, number multi-step work, state progress, and end with one action that takes under two minutes.
- Read `docs/product/technical-specifications.md` before application changes. It overrides other project documentation.
- Keep documentation, code comments, identifiers, API descriptions, and test names in English. User-facing copy starts in `pt-BR` and belongs behind localization keys.
- Keep only `apps/web` and `apps/mobile` runnable. Database and auth secrets stay server-side; mobile and shared packages must not import `@peaknest/database`.
- Implement one product vertical slice at a time with RF/RN/RNF traceability, authorization checks, migrations, API contract, client UI, and negative-case tests.
- Before reporting a change complete, run formatting, lint, strict typecheck, unit/integration tests, coverage (90% each metric), and relevant web/native E2E where infrastructure exists. Report any unrun command accurately.
- Preserve the managed Turborepo block above. Read installed `turbo/docs/README.md` and relevant local pages before changing Turbo configuration.
