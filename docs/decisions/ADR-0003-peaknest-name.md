# ADR-0003: Peaknest product name

**Status:** Accepted. **Date:** 2026-11-23.

## Context

The initial scaffold used a generic temporary name. The product owner confirmed Peaknest as the product name.

## Decision

Use Peaknest in user-facing copy, page metadata, product documentation, API title, repository package name, and the internal `@peaknest/*` workspace scope. Use `peaknest` as the Expo slug and URL scheme. Use `com.peaknest.mobile` as a provisional native app identifier until app store ownership is confirmed.

## Consequences

The single pnpm lockfile and workspace imports are updated together. No account, database, or authentication data is renamed. Existing locally installed native builds with the previous provisional identifier must be rebuilt when mobile testing begins.
