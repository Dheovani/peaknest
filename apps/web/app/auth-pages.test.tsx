import { describe, expect, it, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import LoginPage from "./login/page";
import RegisterPage from "./register/page";

vi.mock("next/navigation", () => ({ useRouter: () => ({}) }));
vi.mock("../lib/auth-client", () => ({ authClient: {} }));

describe("authentication pages", () => {
  it("renders the login page in Portuguese", () => {
    const html = renderToStaticMarkup(<LoginPage />);
    expect(html).toContain("Peaknest");
    expect(html).toContain("Bom ter você de volta.");
    expect(html).toContain("Entrar na minha conta");
    expect(html).toContain('href="/register"');
  });

  it("renders the personal registration page", () => {
    const html = renderToStaticMarkup(<RegisterPage />);
    expect(html).toContain("Comece pelo seu espaço.");
    expect(html).toContain("Criar conta gratuita");
    expect(html).toContain('name="name"');
  });
});
