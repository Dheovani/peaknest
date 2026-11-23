import { healthResponseSchema } from "@fitness/schemas";

export async function getApiHealth(
  baseUrl: string,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher(new URL("/api/v1/health", baseUrl));
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return healthResponseSchema.parse(await response.json());
}
