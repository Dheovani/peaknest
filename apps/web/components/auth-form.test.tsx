// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "./auth-form";

const mocks = vi.hoisted(() => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("../lib/auth-client", () => ({
  authClient: {
    signIn: { email: mocks.signIn },
    signUp: { email: mocks.signUp },
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace, refresh: mocks.refresh }),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

async function fillCredentials() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("E-mail"), "person@example.com");
  await user.type(screen.getByLabelText("Senha"), "strong-password-123");
  return user;
}

describe("web authentication form", () => {
  it("shows an accessible sign-in form and toggles password visibility", async () => {
    render(<AuthForm mode="login" />);
    expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute(
      "href",
      "/register",
    );
    const password = screen.getByLabelText("Senha");
    expect(password).toHaveAttribute("type", "password");
    await userEvent.click(
      screen.getByRole("button", { name: "Mostrar senha" }),
    );
    expect(password).toHaveAttribute("type", "text");
    await userEvent.click(
      screen.getByRole("button", { name: "Ocultar senha" }),
    );
    expect(password).toHaveAttribute("type", "password");
  });

  it("validates email and password before calling the server", async () => {
    render(<AuthForm mode="login" />);
    await userEvent.click(
      screen.getByRole("button", { name: "Entrar na minha conta" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Digite um e-mail válido.",
    );
    await userEvent.type(screen.getByLabelText("E-mail"), "person@example.com");
    await userEvent.click(
      screen.getByRole("button", { name: "Entrar na minha conta" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Digite sua senha.");
    expect(mocks.signIn).not.toHaveBeenCalled();
  });

  it("does not navigate when credentials are rejected or a request fails", async () => {
    mocks.signIn.mockResolvedValueOnce({ error: { code: "INVALID" } });
    mocks.signIn.mockRejectedValueOnce(new Error("network"));
    render(<AuthForm mode="login" />);
    const user = await fillCredentials();
    await user.click(
      screen.getByRole("button", { name: "Entrar na minha conta" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível entrar",
    );
    await user.click(
      screen.getByRole("button", { name: "Entrar na minha conta" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível entrar",
    );
    expect(mocks.replace).not.toHaveBeenCalled();
  });

  it("navigates to the protected account after sign-in", async () => {
    mocks.signIn.mockResolvedValue({ data: { user: { id: "u1" } } });
    render(<AuthForm mode="login" />);
    const user = await fillCredentials();
    await user.click(
      screen.getByRole("button", { name: "Entrar na minha conta" }),
    );
    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/account"));
    expect(mocks.signIn).toHaveBeenCalledWith({
      email: "person@example.com",
      password: "strong-password-123",
    });
    expect(mocks.refresh).toHaveBeenCalled();
  });

  it("validates registration name and password", async () => {
    render(<AuthForm mode="register" />);
    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute(
      "href",
      "/login",
    );
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("E-mail"), "person@example.com");
    await user.type(screen.getByLabelText("Senha"), "strong-password-123");
    await user.click(
      screen.getByRole("button", { name: "Criar conta gratuita" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent("nome");
    await user.type(screen.getByLabelText("Nome"), "Ana");
    await user.clear(screen.getByLabelText("Senha"));
    await user.type(screen.getByLabelText("Senha"), "short");
    await user.click(
      screen.getByRole("button", { name: "Criar conta gratuita" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent("8 caracteres");
    expect(mocks.signUp).not.toHaveBeenCalled();
  });

  it("creates a personal account and reports server errors", async () => {
    mocks.signUp.mockResolvedValueOnce({ error: { code: "FAILED" } });
    mocks.signUp.mockResolvedValueOnce({ data: { user: { id: "u1" } } });
    render(<AuthForm mode="register" />);
    const user = await fillCredentials();
    await user.type(screen.getByLabelText("Nome"), "Ana Silva");
    await user.click(
      screen.getByRole("button", { name: "Criar conta gratuita" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível criar a conta",
    );
    await user.click(
      screen.getByRole("button", { name: "Criar conta gratuita" }),
    );
    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/account"));
    expect(mocks.signUp).toHaveBeenCalledWith({
      name: "Ana Silva",
      email: "person@example.com",
      password: "strong-password-123",
    });
  });
});
