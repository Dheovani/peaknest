import { describe, expect, it } from "vitest";
import { Button } from "../../packages/ui-mobile/src/button";

describe("native Button contract", () => {
  it("exposes a button role and a touch target of at least 44 points", () => {
    const element = Button({ label: "Continuar" });
    expect(element.props.accessibilityRole).toBe("button");
    expect(element.props.style.minHeight).toBeGreaterThanOrEqual(44);
  });
});
