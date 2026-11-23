import { z } from "zod";

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string(),
  }),
});

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  version: z.literal("v1"),
});
