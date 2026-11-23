import { describe, expect, it } from "vitest";
import { safeReturnPath } from "./index";

describe("safeReturnPath", () => {
  it.each([
    null,
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/%",
    "/\nunsafe",
  ])("rejects unsafe paths", (value) => {
    expect(safeReturnPath(value)).toBe("/");
  });

  it("preserves a local path and query", () => {
    expect(safeReturnPath("/dashboard?tab=1")).toBe("/dashboard?tab=1");
  });
});
