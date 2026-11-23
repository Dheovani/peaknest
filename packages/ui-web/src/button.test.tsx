import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button";

describe("Button", () => {
  it("renders a disabled action with an accessible name", () => {
    const html = renderToStaticMarkup(
      <Button disabled aria-label="Unavailable">
        Wait
      </Button>,
    );
    expect(html).toContain('aria-label="Unavailable"');
    expect(html).toContain("disabled");
  });

  it("renders the outline variant", () => {
    const html = renderToStaticMarkup(<Button variant="outline">Open</Button>);
    expect(html).toContain("border-border");
    expect(html).toContain("cursor-pointer");
  });

  it("renders a link as the focusable element", () => {
    const html = renderToStaticMarkup(
      <Button asChild>
        <a href="/start">Start</a>
      </Button>,
    );
    expect(html).toContain('href="/start"');
    expect(html).not.toContain("<button");
  });
});
