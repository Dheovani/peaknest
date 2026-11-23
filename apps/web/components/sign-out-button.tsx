"use client";

import { ptBR } from "@fitness/config/messages";
import { Button } from "@fitness/ui-web/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function signOut() {
    setPending(true);
    setError(false);
    try {
      const response = await authClient.signOut();
      if (response.error) {
        setError(true);
        return;
      }
      router.replace("/login");
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          {ptBR.auth.signOutError}
        </p>
      )}
      <Button
        variant="outline"
        type="button"
        onClick={signOut}
        disabled={pending}
        className="min-h-11 px-5"
      >
        {ptBR.auth.signOut}
      </Button>
    </div>
  );
}
