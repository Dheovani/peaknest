import { describe, expect, it } from "vitest";
import { normalizeRequestId } from "./index";

describe("normalizeRequestId", () => {
  it("retains a safe supplied ID", () => {
    expect(normalizeRequestId("client_1234")).toBe("client_1234");
  });

  it.each([null, "short", "unsafe value", "a".repeat(65)])(
    "replaces invalid IDs",
    (value) => {
      expect(normalizeRequestId(value)).toMatch(/^[a-f0-9-]{36}$/);
    },
  );
});
