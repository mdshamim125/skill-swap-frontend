"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await serverFetch.get("/auth/me");

    const result = await response.json();

    if (!result.success) return null;

    const data = result.data;

    return {
      name:
        data.admin?.name ||
        data.mentor?.name ||
        data.user?.name ||
        data.name ||
        "Unknown User",

      email:
        data.admin?.email ||
        data.mentor?.email ||
        data.user?.email ||
        data.email ||
        "",

      role:
        data.admin?.role ||
        data.mentor?.role ||
        data.user?.role ||
        data.role ||
        "USER",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
