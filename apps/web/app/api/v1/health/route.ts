import { normalizeRequestId } from "@peaknest/domain";
import { NextResponse, type NextRequest } from "next/server";
import { logApiRequest } from "../_lib/responses";

export function GET(request: NextRequest) {
  const requestId = normalizeRequestId(request.headers.get("x-request-id"));
  logApiRequest({
    method: "GET",
    path: "/api/v1/health",
    status: 200,
    requestId,
  });
  return NextResponse.json(
    { status: "ok", version: "v1" },
    { headers: { "x-request-id": requestId } },
  );
}
