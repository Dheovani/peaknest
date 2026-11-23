// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignOutButton } from "./sign-out-button";

const mocks = vi.hoisted(() => ({
  signOut: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("../lib/auth-client", () => ({
  authClient: { signOut: mocks.signOut },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace, refresh: mocks.refresh }),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("sign-out button", () => {
  it("clears the session and returns to sign-in", async () => {
    mocks.signOut.mockResolvedValue({ data: {} });
    render(<SignOutButton />);
    await userEvent.click(
      screen.getByRole("button", { name: "Sair da conta" }),
    );
    expect(mocks.replace).toHaveBeenCalledWith("/login");
    expect(mocks.refresh).toHaveBeenCalled();
  });

  it("keeps the account page when the server rejects sign-out", async () => {
    mocks.signOut.mockResolvedValue({ error: { code: "FAILED" } });
    render(<SignOutButton />);
    await userEvent.click(
      screen.getByRole("button", { name: "Sair da conta" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível sair",
    );
    expect(mocks.replace).not.toHaveBeenCalled();
  });

  it("reports a network failure without navigating", async () => {
    mocks.signOut.mockRejectedValue(new Error("network"));
    render(<SignOutButton />);
    await userEvent.click(
      screen.getByRole("button", { name: "Sair da conta" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível sair",
    );
    expect(mocks.replace).not.toHaveBeenCalled();
  });
});
