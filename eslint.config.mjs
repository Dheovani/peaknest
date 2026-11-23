import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
  {
    ignores: [
      ".corepack/**",
      ".local-bin/**",
      ".playwright-browsers/**",
      ".pnpm-store/**",
      ".cache/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.expo/**",
      "coverage/**",
      "tests/artifacts/**",
      "apps/mobile/assets/**",
    ],
  },
  ...nextVitals.map((entry) => ({
    ...entry,
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
  })),
  ...nextTypescript,
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  {
    files: ["**/*.config.{js,mjs}"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  {
    files: [
      "apps/mobile/**/*.{ts,tsx}",
      "packages/{domain,schemas,api-client,auth,design-tokens,ui-mobile,ui-web}/src/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@peaknest/database",
                "@peaknest/database/*",
                "server-only",
                "next/*",
              ],
              message:
                "Server-only modules must not be imported into shared or mobile code.",
            },
          ],
        },
      ],
    },
  },
];
