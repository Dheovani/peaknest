module.exports = {
  rootDir: "../..",
  preset: "jest-expo",
  testMatch: ["<rootDir>/apps/mobile/src/**/*.test.tsx"],
  roots: ["<rootDir>/apps/mobile/src"],
  moduleNameMapper: { "\\.css$": "<rootDir>/apps/mobile/test/style-mock.js" },
  collectCoverageFrom: ["apps/mobile/src/**/*.tsx"],
  coverageDirectory: "coverage/mobile",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: { branches: 90, functions: 90, lines: 90, statements: 90 },
  },
};
