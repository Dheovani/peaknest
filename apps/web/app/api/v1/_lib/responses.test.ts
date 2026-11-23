import { describe, expect, it, vi } from "vitest";
import { apiErrorSchema } from "@fitness/schemas";
import { ApiFailure, apiErrorResponse, logApiRequest } from "./responses";

describe("API responses", () => {
  it("maps known failures to a stable error envelope", async () => {
    const response = apiErrorResponse(
      new ApiFailure("BAD_REQUEST", 400, "Invalid input"),
      "request_123",
    );
    expect(response.status).toBe(400);
    expect(apiErrorSchema.parse(await response.json()).error.code).toBe(
      "BAD_REQUEST",
    );
  });

  it("does not disclose unknown errors", async () => {
    const response = apiErrorResponse(
      new Error("private details"),
      "request_123",
    );
    expect(response.status).toBe(500);
    expect(JSON.stringify(await response.json())).not.toContain(
      "private details",
    );
  });

  it("logs request metadata without a body", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    try {
      logApiRequest({
        method: "GET",
        path: "/api/v1/health",
        status: 200,
        requestId: "request_123",
      });
      expect(JSON.parse(String(info.mock.calls[0]?.[0]))).toEqual({
        level: "info",
        event: "api.request",
        method: "GET",
        path: "/api/v1/health",
        status: 200,
        requestId: "request_123",
      });
    } finally {
      info.mockRestore();
    }
  });
});
