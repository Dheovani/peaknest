import { expect, test } from "@playwright/test";

test("foundation page and versioned health API are reachable", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Seu treino, no seu ritmo." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Entrar" })).toHaveAttribute(
    "href",
    "/login",
  );
  const response = await request.get("/api/v1/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({ status: "ok", version: "v1" });
  expect(response.headers()["x-request-id"]).toBeTruthy();
});
