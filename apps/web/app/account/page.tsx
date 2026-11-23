import { ptBR } from "@fitness/config/messages";
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "../../components/sign-out-button";
import { getAuth } from "../../lib/auth";

export default async function AccountPage() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm font-semibold text-primary">{ptBR.auth.brand}</p>
      <h1 className="text-4xl font-semibold tracking-tight">
        {ptBR.auth.accountTitle}
      </h1>
      <p className="text-lg text-muted-foreground">
        {ptBR.auth.accountDescription}
      </p>
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="font-medium">{session.user.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {session.user.email}
        </p>
      </div>
      <div>
        <SignOutButton />
      </div>
    </main>
  );
}
