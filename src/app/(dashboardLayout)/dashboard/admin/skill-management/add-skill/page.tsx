/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";

// shadcn/ui components (adjust paths if your project differs)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Zod schema ---
const SkillLevelEnum = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const);

const AddSkillSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  description: z.string().max(2000).optional(),
  level: SkillLevelEnum.default("BEGINNER"),
  pricePerHour: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") return undefined;
        const parsed = parseInt(trimmed, 10);
        return Number.isNaN(parsed) ? undefined : parsed;
      }
      return val ?? undefined;
    }),
  tags: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return [] as string[];
      return val
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }),
  isPublished: z.boolean().optional().default(true),
  isCustom: z.boolean().optional().default(false),
  createdBy: z.string().optional(),
});

type AddSkillForm = z.infer<typeof AddSkillSchema>;

export default function AddSkillsPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<AddSkillForm>({
    resolver: zodResolver(AddSkillSchema),
    defaultValues: {
      level: "BEGINNER",
      isPublished: true,
      isCustom: false,
      tags: "",
    } as any,
  });

  const isCustom = watch("isCustom");

  async function onSubmit(values: AddSkillForm) {
    try {
      // Prepare payload: zod already transformed price and tags
      const payload = {
        title: values.title,
        category: values.category,
        description: values.description || null,
        level: values.level,
        pricePerHour: values.pricePerHour ?? null,
        tags: values.tags,
        isPublished: !!values.isPublished,
        isCustom: !!values.isCustom,
        createdBy: values.isCustom ? values.createdBy ?? null : null,
      };

      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to create skill");
      }

      toast.success("Skill created");
      reset();
      // Optionally navigate to skill list
      router.push("/admin/skills");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="eg. UI/UX Design"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="eg. Design"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={6}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="level">Level</Label>
                <Select defaultValue="BEGINNER">
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {/* react-hook-form + shadcn Select requires a controlled approach; use a hidden input */}
                <input type="hidden" {...(register("level") as any)} />
                {errors.level && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.level.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pricePerHour">Price / Hour (BDT)</Label>
                <Input
                  id="pricePerHour"
                  placeholder="eg. 500"
                  {...register("pricePerHour" as any)}
                />
                {errors.pricePerHour && (
                  <p className="text-sm text-red-600 mt-1">
                    {(errors.pricePerHour as any)?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="eg. figma, prototyping"
                  {...register("tags" as any)}
                />
                {errors.tags && (
                  <p className="text-sm text-red-600 mt-1">
                    {(errors.tags as any)?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="isPublished"
                  {...register("isPublished" as any)}
                  defaultChecked
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch id="isCustom" {...register("isCustom" as any)} />
                <Label htmlFor="isCustom">Custom Skill</Label>
              </div>
            </div>

            {isCustom && (
              <div>
                <Label htmlFor="createdBy">Created By (optional)</Label>
                <Input
                  id="createdBy"
                  placeholder="Author or company name"
                  {...(register("createdBy") as any)}
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(isSubmitting && "opacity-70")}
              >
                {isSubmitting ? "Saving..." : "Add Skill"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
