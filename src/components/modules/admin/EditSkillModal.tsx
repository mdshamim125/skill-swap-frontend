"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { updateSkill } from "@/services/admin/skillsManagement";
import { z } from "zod";

const updateSkillZodSchema = z.object({
  title: z.string().min(2).max(100),
  category: z.string().min(2).max(50),
  id: z.string(),
});

type EditSkillFormValues = z.infer<typeof updateSkillZodSchema>;

interface Props {
  skill: { id: string; title: string; category: string };
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditSkillModal({ skill, onClose, onUpdated }: Props) {
  const form = useForm<EditSkillFormValues>({
    resolver: zodResolver(updateSkillZodSchema),
    defaultValues: { ...skill },
  });

  useEffect(() => {
    form.reset(skill);
  }, [skill, form]);

  const onSubmit = async (values: EditSkillFormValues) => {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("title", values.title);
    formData.append("category", values.category);

    const result = await updateSkill(null, formData);

    if (result.success) {
      toast.success("Skill updated successfully!");
      onUpdated();
      onClose();
    } else {
      toast.error(result.message || "Failed to update skill");
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Skill</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
