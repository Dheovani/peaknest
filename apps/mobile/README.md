# Mobile app

Expo SDK 58 and Expo Router provide Android and iOS entry points. Run `pnpm dev:mobile` from the repository root. NativeWind is configured through `metro.config.js` and `tailwind.config.js`; the native Button lives in `packages/ui-mobile`. No product sign-in or tracking flow is implemented in this foundation.

Build a local Android binary with `pnpm --filter @fitness/mobile exec expo run:android`; iOS requires macOS/Xcode and `expo run:ios`. The Maestro smoke flow in root `tests/e2e/mobile` requires a running emulator and installed app. See `docs/runbooks/local-development.md`.
