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

export const signInSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2).max(100),
  password: z.string().min(8).max(128),
});
