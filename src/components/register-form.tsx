"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { registerUser } from "@/services/auth/registerUser";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              disabled={isPending}
            />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              disabled={isPending}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isPending}
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>

          <FieldDescription className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </FieldDescription>
        </div>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
