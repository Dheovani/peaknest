import { describe, expect, it, vi } from "vitest";
import { authClient } from "./auth-client";

const mocks = vi.hoisted(() => ({
  createAuthClient: vi.fn(() => ({ kind: "client" })),
}));

vi.mock("better-auth/react", () => ({
  createAuthClient: mocks.createAuthClient,
}));

describe("browser authentication client", () => {
  it("uses the same-origin Better Auth endpoint", () => {
    expect(mocks.createAuthClient).toHaveBeenCalledWith();
    expect(authClient).toEqual({ kind: "client" });
  });
});
