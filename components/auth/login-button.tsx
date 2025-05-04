"use client";

import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="button button-primary"
      style={{
        padding: '0.5rem 1.5rem',
        height: '2.5rem',
      }}
    >
      Sign in with Google
    </button>
  );
}