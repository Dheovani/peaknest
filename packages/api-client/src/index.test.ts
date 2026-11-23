import { describe, expect, it, vi } from "vitest";
import { getApiHealth } from "./index";

describe("getApiHealth", () => {
  it("validates successful responses", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: "ok", version: "v1" }), {
        status: 200,
      }),
    );
    await expect(
      getApiHealth("http://localhost:3000", fetcher),
    ).resolves.toEqual({ status: "ok", version: "v1" });
    expect(fetcher).toHaveBeenCalledWith(
      new URL("http://localhost:3000/api/v1/health"),
    );
  });

  it("rejects an HTTP failure", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 503 }));
    await expect(
      getApiHealth("http://localhost:3000", fetcher),
    ).rejects.toThrow("503");
  });
});
