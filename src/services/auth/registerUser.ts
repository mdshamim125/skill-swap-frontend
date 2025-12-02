/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (_state: any, formData: FormData) => {
  try {
    // Normalize and extract values from FormData
    const payload = {
      email: formData.get("email") ?? "",
      name: formData.get("name") ?? "",
      password: formData.get("password") ?? "",
      confirmPassword: formData.get("confirmPassword") ?? "",

      // Avatar should be stored separately later (upload endpoint)
      avatar: null,

      isVerified: false,
      isPremium: false,

      profile: {
        bio: formData.get("bio") || null,
        country: formData.get("country") || null,
        city: formData.get("city") || null,
        expertise: formData.get("expertise") || null,
        phone: formData.get("phone") || null,
      },
    };

    // Validate payload
    const validation = zodValidator(payload, registerUserValidationZodSchema);
    if (!validation.success) return validation;

    const validatedData = validation.data;

    // Call backend
    const response = await serverFetch.post("/user/create", {
      body: JSON.stringify(validatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("REGISTER RESPONSE:", result);

    // Auto login on success
    if (result.success) {
      await loginUser(_state, formData);
    }

    return result;
  } catch (error: any) {
    // Allow Next.js redirect exceptions
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    console.error("REGISTER ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
