import { Button } from "@fitness/ui-web/button";
import { ptBR } from "@fitness/config/messages";
import { Badge } from "../components/ui/badge";
import React from "react";

const copy = ptBR.foundation;

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <Badge
        variant="outline"
        className="w-fit rounded-full border-border bg-card px-4 py-2 text-sm text-muted-foreground"
      >
        {copy.status}
      </Badge>
      <div className="max-w-2xl space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {copy.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>
      <div>
        <Button disabled aria-label={copy.action}>
          {copy.action}
        </Button>
      </div>
    </main>
  );
}
