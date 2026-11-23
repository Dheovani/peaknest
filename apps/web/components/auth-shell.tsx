import { ptBR } from "@peaknest/config/messages";
import Link from "next/link";
import React from "react";
import type { ReactNode } from "react";

const copy = ptBR.auth;

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.9fr)]">
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
        <Link
          href="/"
          className="flex w-fit items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
        >
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground"
          >
            P
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {copy.brand}
          </span>
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {description}
          </p>
          {children}
        </div>
      </section>

      <aside
        className="relative hidden overflow-hidden bg-[#103b2a] text-white lg:flex lg:flex-col lg:justify-between lg:p-14"
        aria-label="Sobre a plataforma"
      >
        <div
          aria-hidden="true"
          className="absolute -right-32 top-24 size-96 rounded-full border border-white/15"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 top-40 size-72 rounded-full border border-white/15"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-10rem] left-[-8rem] size-96 rounded-full bg-emerald-300/10 blur-3xl"
        />
        <span className="relative text-xs font-semibold tracking-[0.18em] text-emerald-100/80">
          {copy.sideEyebrow}
        </span>
        <div className="relative max-w-xl">
          <div aria-hidden="true" className="mb-10 flex h-28 items-end gap-3">
            {["40%", "70%", "55%", "85%", "100%"].map((height, index) => (
              <span
                key={height}
                className="w-10 rounded-t-lg bg-emerald-200/20"
                style={{ height, opacity: 0.45 + index * 0.12 }}
              />
            ))}
          </div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            {copy.sideTitle}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-emerald-50/75">
            {copy.sideDescription}
          </p>
        </div>
        <p className="relative text-sm text-emerald-100/75">{copy.sideNote}</p>
      </aside>
    </main>
  );
}
