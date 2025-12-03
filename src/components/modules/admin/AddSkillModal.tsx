"use client";

import { useActionState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createSkill } from "@/services/admin/skillsManagement";

// ZOD Schema
export const SkillSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
});

export type SkillFormValues = z.infer<typeof SkillSchema>;

export default function AddSkillModal() {
  const [state, action, pending] = useActionState(createSkill, {
    success: false,
    message: "",
  });

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  // Toasts
  useEffect(() => {
    if (state.success) {
      toast.success("Skill added successfully!");
      form.reset();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Skill</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new skill to the platform.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form action={action} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: FieldValues }) => (
                <FormItem>
                  <FormLabel>Skill Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }: { field: FieldValues }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Programming" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <DialogFooter>
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Saving..." : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
