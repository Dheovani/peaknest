import { ptBR } from "@fitness/config/messages";
import React from "react";
import { AuthForm } from "../../components/auth-form";
import { AuthShell } from "../../components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      title={ptBR.auth.loginTitle}
      description={ptBR.auth.loginDescription}
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
