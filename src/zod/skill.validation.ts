import { z } from "zod";

export const createSkillZodSchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.string().min(2, "Category is required"),
});

export const updateSkillZodSchema = z.object({
  title: z.string().min(2, "Title is required").optional(),
  category: z.string().min(2, "Category is required").optional(),
});
