/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FormInput } from "./form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFields = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFields) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setServerError(result.message || "Login failed");
        return;
      }

      // Redirect after login
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error(error);
      setServerError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto p-6 rounded-xl border bg-card shadow-sm"
      )}
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Welcome Back 👋
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      {/* Already Registered + Forgot Password */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Don’t have an account?{" "}
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
