"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormInput } from "./form-input"; // same component you used
import { useActionState } from "react";
import { loginAction } from "@/services/auth/loginAction";
import { toast } from "sonner";

export default function LoginForm() {
  const [serverError, setServerError] = useState("");

  // Using action-based login (as you already built)
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Show server error from the action state
  if (state && !state.success && state.message !== serverError) {
    setServerError(state.message || "Login failed");
  }

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }

    if (state.success) {
      toast.success("Login successful!");
      setTimeout(() => {}, 400);
    }
  }, [state]);

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto p-6 rounded-xl border bg-card shadow-sm"
      )}
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Welcome Back 👋
      </h2>

      <form className="space-y-4" action={formAction}>
        <FormInput
          label="Email"
          type="email"
          placeholder="example@mail.com"
          name="email"
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          name="password"
        />

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button className="w-full h-11" type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          New here?{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
