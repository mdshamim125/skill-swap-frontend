"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FormInput } from "./form-input"; // adjust path if needed
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { serverFetch } from "@/lib/server-fetch";
import { toast } from "sonner";

const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFields = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: RegisterFields) => {
    setLoading(true);
    setServerError("");

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await serverFetch.post("/user/create", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setServerError(result.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");
      setTimeout(() => {
        // Redirect to login page
        window.location.href = "/login";
      }, 400);
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
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
        Create Your Account 🎉
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
