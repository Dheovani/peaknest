import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout from "./layout";

describe("root layout", () => {
  it("declares the Brazilian Portuguese language", () => {
    expect(
      renderToStaticMarkup(
        <RootLayout>
          <main>Content</main>
        </RootLayout>,
      ),
    ).toContain('lang="pt-BR"');
  });
});
