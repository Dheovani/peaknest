import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import AccountPage from "./page";

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("../../lib/auth", () => ({
  getAuth: () => ({ api: { getSession: mocks.getSession } }),
}));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("../../components/sign-out-button", () => ({
  SignOutButton: () => "sign out",
}));

describe("protected account page", () => {
  it("redirects when no server session exists", async () => {
    mocks.getSession.mockResolvedValueOnce(null);
    await expect(AccountPage()).rejects.toThrow("redirected");
    expect(mocks.redirect).toHaveBeenCalledWith("/login");
  });

  it("shows only the authenticated session user's account", async () => {
    mocks.getSession.mockResolvedValueOnce({
      user: { name: "Ana Silva", email: "ana@example.test" },
    });
    const html = renderToStaticMarkup(await AccountPage());
    expect(html).toContain("Ana Silva");
    expect(html).toContain("ana@example.test");
    expect(html).toContain("sign out");
  });
});
