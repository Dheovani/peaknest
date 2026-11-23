"use client";

import { ptBR } from "@peaknest/config/messages";
import { signInSchema, signUpSchema } from "@peaknest/schemas";
import { Button } from "@peaknest/ui-web/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, type FormEvent } from "react";
import { authClient } from "../lib/auth-client";

const copy = ptBR.auth;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "").trim();
    const result =
      mode === "login"
        ? signInSchema.safeParse({ email, password })
        : signUpSchema.safeParse({ email, password, name });

    if (!result.success) {
      const field = result.error.issues[0]?.path[0];
      setError(
        field === "email"
          ? copy.invalidEmail
          : field === "name"
            ? copy.invalidName
            : mode === "register"
              ? copy.shortPassword
              : copy.invalidPassword,
      );
      return;
    }

    setPending(true);
    try {
      const response =
        mode === "login"
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({ email, password, name });

      if (response.error) {
        setError(mode === "login" ? copy.loginError : copy.registerError);
        return;
      }

      router.replace("/account");
      router.refresh();
    } catch {
      setError(mode === "login" ? copy.loginError : copy.registerError);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-9 space-y-5" noValidate>
      {mode === "register" && (
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {copy.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder={copy.namePlaceholder}
            className="auth-input"
          />
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          {copy.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={copy.emailPlaceholder}
          className="auth-input"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          {copy.password}
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            required
            minLength={mode === "register" ? 8 : undefined}
            maxLength={128}
            className="auth-input pr-20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-3 px-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:rounded focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={showPassword ? copy.hidePassword : copy.showPassword}
            aria-pressed={showPassword}
          >
            {showPassword ? copy.hide : copy.show}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/50 dark:text-red-200"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="min-h-12 w-full rounded-lg text-base"
      >
        {pending
          ? copy.loading
          : mode === "login"
            ? copy.loginAction
            : copy.registerAction}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? copy.noAccount : copy.hasAccount}{" "}
        <Link
          href={mode === "login" ? "/register" : "/login"}
          className="font-semibold text-foreground underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-primary"
        >
          {mode === "login" ? copy.registerLink : copy.loginLink}
        </Link>
      </p>
    </form>
  );
}
