export function safeReturnPath(value: string | null): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /%(?![a-fA-F0-9]{2})/.test(value) ||
    /[\u0000-\u001F]/.test(value)
  )
    return "/";
  return value;
}
