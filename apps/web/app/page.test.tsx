import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("foundation page", () => {
  it("shows a Portuguese foundation state", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain("Seu treino, no seu ritmo.");
    expect(html).toContain("Entrar em breve");
  });
});
