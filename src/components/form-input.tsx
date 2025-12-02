"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input className={cn(className)} {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
