import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

describe("GET /api/v1/health", () => {
  it("returns the version and a safe request ID", async () => {
    const response = GET(
      new NextRequest("http://localhost:3000/api/v1/health", {
        headers: { "x-request-id": "test_1234" },
      }),
    );
    expect(await response.json()).toEqual({ status: "ok", version: "v1" });
    expect(response.headers.get("x-request-id")).toBe("test_1234");
  });
});
