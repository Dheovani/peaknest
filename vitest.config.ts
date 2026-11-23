import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "react-native": fileURLToPath(
        new URL("./tests/unit/react-native-mock.ts", import.meta.url),
      ),
    },
  },
  esbuild: { jsx: "automatic" },
  test: {
    projects: [
      {
        resolve: {
          alias: {
            "react-native": fileURLToPath(
              new URL("./tests/unit/react-native-mock.ts", import.meta.url),
            ),
          },
        },
        test: {
          name: "unit",
          include: [
            "packages/**/*.test.{ts,tsx}",
            "apps/web/**/*.test.{ts,tsx}",
            "tests/unit/**/*.test.{ts,tsx}",
          ],
        },
      },
      {
        test: {
          name: "integration",
          include: ["tests/integration/**/*.test.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: [
        "packages/{api-client,auth,config,database,design-tokens,domain,schemas,ui-mobile,ui-web}/src/**/*.{ts,tsx}",
        "apps/web/app/**/*.{ts,tsx}",
        "apps/web/components/**/*.{ts,tsx}",
        "apps/web/lib/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.d.ts",
        "packages/database/src/schema.ts",
      ],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage/web-and-shared",
      thresholds: { lines: 90, statements: 90, branches: 90, functions: 90 },
    },
  },
});
