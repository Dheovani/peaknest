import { describe, expect, it } from "vitest";
import { tokens } from "./index";

describe("semantic tokens", () => {
  it("offers distinct light and dark surfaces with a usable spacing scale", () => {
    expect(tokens.color.light.background).not.toBe(
      tokens.color.dark.background,
    );
    expect(tokens.spacing.xs).toBeLessThan(tokens.spacing.sm);
    expect(tokens.spacing.sm).toBeLessThan(tokens.spacing.md);
  });
});
