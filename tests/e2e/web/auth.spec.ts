import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

test("personal registration, sign-out, sign-in and account protection", async ({
  page,
}) => {
  const email = `web-test-${randomUUID()}@example.test`;
  const password = "web-test-password-123";

  await page.goto("/account");
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole("link", { name: "Criar conta" }).click();
  await expect(
    page.getByRole("heading", { name: "Comece pelo seu espaço." }),
  ).toBeVisible();
  await page.getByLabel("Nome").fill("Test User");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Criar conta gratuita" }).click();

  await expect(
    page.getByRole("heading", { name: "Sua conta está pronta." }),
  ).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();
  await page.reload();
  await expect(page.getByText(email)).toBeVisible();

  await page.getByRole("button", { name: "Sair da conta" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto("/account");
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("wrong-password");
  await page.getByRole("button", { name: "Entrar na minha conta" }).click();
  await expect(
    page.getByText("Não foi possível entrar.", { exact: false }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar na minha conta" }).click();
  await expect(
    page.getByRole("heading", { name: "Sua conta está pronta." }),
  ).toBeVisible();
});
