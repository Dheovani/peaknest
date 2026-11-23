import { ptBR } from "@fitness/config/messages";
import React from "react";
import { AuthForm } from "../../components/auth-form";
import { AuthShell } from "../../components/auth-shell";

export default function RegisterPage() {
  return (
    <AuthShell
      title={ptBR.auth.registerTitle}
      description={ptBR.auth.registerDescription}
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
