export type SupportedLocale = "pt-BR";

export function normalizeRequestId(value: string | null): string {
  return value && /^[a-zA-Z0-9_-]{8,64}$/.test(value)
    ? value
    : crypto.randomUUID();
}
