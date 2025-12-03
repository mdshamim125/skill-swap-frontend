/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createSkillZodSchema,
  updateSkillZodSchema,
} from "@/zod/skill.validation";

import { revalidateTag } from "next/cache";

// --------------------------------------------------
// CREATE
// --------------------------------------------------
export async function createSkill(_prevState: any, formData: FormData) {
  const validationPayload = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
  };

  const validatedPayload = zodValidator(
    validationPayload,
    createSkillZodSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.post("/skills", {
      body: JSON.stringify(validatedPayload.data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("skills-list", "max");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
      formData: validationPayload,
    };
  }
}

// --------------------------------------------------
// GET ALL
// --------------------------------------------------
export async function getSkills(page: number = 1, limit: number = 10) {
  try {
    const response = await serverFetch.get(
      `/skills?page=${page}&limit=${limit}`,
      {
        cache: "no-cache",
        next: { tags: ["skills-list"] },
      }
    );

    return await response.json();
  } catch (error: any) {
    console.error("Failed to fetch skills:", error);
    return {
      success: false,
      data: [],
      meta: { page, limit, total: 0 },
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

// --------------------------------------------------
// GET SINGLE
// --------------------------------------------------
export async function getSkillById(id: string) {
  try {
    const response = await serverFetch.get(`/skills/${id}`);
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

// --------------------------------------------------
// UPDATE
// --------------------------------------------------
export async function updateSkill(_prevState: any, formData: FormData) {
  const id = formData.get("id") as string;

  const validationPayload = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
  };

  const validatedPayload = zodValidator(
    validationPayload,
    updateSkillZodSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.patch(`/skills/${id}`, {
      body: JSON.stringify(validatedPayload.data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("skills-list", "max");
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
      formData: validationPayload,
    };
  }
}

// --------------------------------------------------
// DELETE
// --------------------------------------------------
export async function deleteSkill(id: string) {
  try {
    const response = await serverFetch.delete(`/skills/${id}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("skills-list", "max");
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
