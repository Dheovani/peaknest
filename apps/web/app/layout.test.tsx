import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata } from "./layout";

describe("root layout", () => {
  it("uses the approved Peaknest product name", () => {
    expect(metadata.title).toBe("Peaknest");
  });
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
