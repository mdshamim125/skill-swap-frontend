/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const payload = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),

      // Optional fields
      avatar: formData.get("avatar") || undefined,
      isVerified: false,
      isPremium: false,
      premiumExpires: undefined,

      // Profile fields
      profile: {
        bio: formData.get("bio") || undefined,
        country: formData.get("country") || undefined,
        city: formData.get("city") || undefined,
        expertise: formData.get("expertise") || undefined,
        phone: formData.get("phone") || undefined,
      },
    };

    // Validate with Zod
    const validation = zodValidator(payload, registerUserValidationZodSchema);
    if (validation.success === false) {
      return validation; // return validation error
    }

    const validatedData: any = validation.data;

    // Backend expects JSON in "data"
    const formattedRegisterData = {
      password: validatedData.password,

      email: validatedData.email,
      name: validatedData.name,
      avatar: validatedData.avatar,

      isVerified: validatedData.isVerified,
      isPremium: validatedData.isPremium,
      premiumExpires: validatedData.premiumExpires,

      profile: validatedData.profile,
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(formattedRegisterData));

    // Handle avatar file upload (optional)
    const avatarFile = formData.get("file");
    if (avatarFile instanceof Blob) {
      newFormData.append("file", avatarFile);
    }

    // API CALL — your backend route:
    const res = await serverFetch.post("/user/register", {
      body: newFormData,
    });

    const result = await res.json();

    // Auto login after successful registration
    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
