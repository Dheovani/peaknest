import { NextResponse } from "next/server";

export class ApiFailure extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export function apiErrorResponse(error: unknown, requestId: string) {
  const failure =
    error instanceof ApiFailure
      ? error
      : new ApiFailure("INTERNAL_ERROR", 500, "An unexpected error occurred.");
  return NextResponse.json(
    { error: { code: failure.code, message: failure.message, requestId } },
    { status: failure.status, headers: { "x-request-id": requestId } },
  );
}

export function logApiRequest(details: {
  method: string;
  path: string;
  status: number;
  requestId: string;
}) {
  console.info(
    JSON.stringify({ level: "info", event: "api.request", ...details }),
  );
}
