/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

// ------------------------------
// GET ALL USERS
// ------------------------------
export const getAllUsers = async (
  page: number,
  search: string,
  role: string,
  // premium: string
) => {
  const url = `/user?page=${page}&search=${search}&role=${role}`;

  const res = await serverFetch.get(url, {
    method: "GET",
    credentials: "include", // ✅ Explicitly included
  });

  return res.json();
};

// ------------------------------
// UPDATE USER
// ------------------------------
export const updateUser = async (id: string, data: any) => {
  const res = await serverFetch.patch(`/users/${id}`, {
    method: "PATCH",
    credentials: "include", // ✅ Included
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("skills-list", "max");
  }

  return result;
};

// ------------------------------
// DELETE USER
// ------------------------------
export const deleteUser = async (id: string) => {
  const res = await serverFetch.delete(`/users/${id}`, {
    method: "DELETE",
    credentials: "include", // ✅ Included
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("skills-list", "max");
  }

  return result;
};

// ------------------------------
// TOGGLE STATUS (ACTIVE / PREMIUM)
// ------------------------------
export const toggleUserStatus = async (
  id: string,
  actionType: "active" | "premium"
) => {
  const res = await serverFetch.patch(`/users/${id}/toggle-${actionType}`, {
    method: "PATCH",
    credentials: "include", // ✅ Included
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("skills-list", "max");
  }

  return result;
};
