import z from "zod";

const profileSchema = z.object({
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  interests: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  expertise: z.string().optional(),
  travelStyles: z.array(z.string()).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  experience: z.string().optional(),
  hourlyRate: z.number().optional(),
  phone: z.string().optional(),
});

export const registerUserValidationZodSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .max(100, "Confirm Password must be at most 100 characters"),

    // Flattened fields (NO `user: {...}`)
    email: z.string().email("Valid email is required"),
    name: z.string().min(1, "Name is required"),

    avatar: z.string().url().optional(),
    isVerified: z.boolean().optional(),
    isPremium: z.boolean().optional(),
    premiumExpires: z.string().datetime().optional(),
    profile: profileSchema.optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationZodSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});
