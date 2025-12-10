/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UserRole } from "@/lib/auth-utils";
import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";


export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await serverFetch.get("/auth/me");
    const result = await response.json();

    if (!result.success) return null;

    const data = result.data;

    // Role-based data extraction
    const userData =
      data.admin || data.mentor || data.user || data || {};
      // Add id field from userData
      userData.id = userData.id || "";

    return {
      id: userData.id || "",
      name: userData.name || "Unknown User",

      email: userData.email || "",

      role: (userData.role as UserRole) || "USER",

      // NEW PREMIUM FIELDS
      isPremium: Boolean(userData.isPremium) || false,
      premiumExpires: userData.premiumExpires || null,
    };
  } catch (error) {
    console.error("getUserInfo error:", error);
    return null;
  }
};


// export const getUserInfo = async (): Promise<UserInfo | null> => {
//   try {
//     const response = await serverFetch.get("/auth/me");

//     const result = await response.json();

//     if (!result.success) return null;

//     const data = result.data;

//     return {
//       name:
//         data.admin?.name ||
//         data.mentor?.name ||
//         data.user?.name ||
//         data.name ||
//         "Unknown User",

//       email:
//         data.admin?.email ||
//         data.mentor?.email ||
//         data.user?.email ||
//         data.email ||
//         "",

//       role:
//         data.admin?.role ||
//         data.mentor?.role ||
//         data.user?.role ||
//         data.role ||
//         "USER",
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const getAllUsers = async (
  params: any,
  options: any,
  requester: { id: string; role: UserRole }
) => {
  try {
    const query = new URLSearchParams({
      ...params,
      ...options,
      requesterId: requester.id,
      requesterRole: requester.role,
    });

    const response = await serverFetch.get(`/user?${query.toString()}`);
    const result = await response.json();

    if (!result.success) return [];

    // Ensure data is always an array
    return Array.isArray(result.data) ? result.data : [result.data];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function updateUserStatus(
  userId: string,
  statusPayload: Record<string, any>,
  requester: { id: string; role: UserRole }
) {
  try {
    const body = {
      role: statusPayload.role, // your backend expects { role }
      requesterId: requester.id,
      requesterRole: requester.role,
    };

    const response = await serverFetch.patch(`/user/${userId}/role`, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update role",
      };
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update user role",
    };
  }
}

export async function deleteUser(
  userId: string,
  requester: { id: string; role: UserRole }
) {
  try {
    const query = new URLSearchParams({
      requesterId: requester.id,
      requesterRole: requester.role,
    });

    const response = await serverFetch.delete(`/user/${userId}?${query}`);

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to delete user",
      };
    }

    return {
      success: true,
      message: "User deleted successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error deleting user:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete user",
    };
  }
}

export const getTopRatedMentors = async () => {
  try {
    const response = await serverFetch.get("/user/top-rated-mentors");
    const result = await response.json();

    if (!result.success) return [];

    // Ensure data is always an array
    return Array.isArray(result.data) ? result.data : [result.data];
  } catch (error) {
    console.error("Error fetching top-rated mentors:", error);
    return [];
  }
};
