import { describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";

const mocks = vi.hoisted(() => ({ handler: vi.fn() }));

vi.mock("../../../../lib/auth", () => ({
  getAuth: () => ({ handler: mocks.handler }),
}));

describe("Better Auth route", () => {
  it("forwards GET requests to Better Auth", async () => {
    const request = new Request("http://localhost:3000/api/auth/get-session");
    mocks.handler.mockResolvedValue(new Response(null, { status: 204 }));
    expect((await GET(request)).status).toBe(204);
    expect(mocks.handler).toHaveBeenCalledWith(request);
  });

  it("forwards POST requests to Better Auth", async () => {
    const request = new Request(
      "http://localhost:3000/api/auth/sign-in/email",
      {
        method: "POST",
      },
    );
    mocks.handler.mockResolvedValue(new Response(null, { status: 200 }));
    expect((await POST(request)).status).toBe(200);
    expect(mocks.handler).toHaveBeenCalledWith(request);
  });
});
