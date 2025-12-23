// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { serverFetch } from "@/lib/server-fetch";

// /**
//  * Fetch logged-in user's profile
//  */

// export async function getMyProfile() {
//   try {
//     const response = await serverFetch.get(`/user/my-profile`, {
//       cache: "no-cache",
//       next: { tags: ["my-profile"] },
//       credentials: "include",
//     });

//     const res = await response.json();
//     console.log(res);

//     return res;
//   } catch (error: any) {
//     console.error("getMyProfile error:", error);

//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? error?.message
//           : "Failed to fetch profile",
//     };
//   }
// }

// /**
//  * Update profile (works with avatar upload)
//  * Must receive a FormData (including JSON payload + optional file)
//  */
// export async function updateMyProfile(payload: any) {
//   try {
//     const response = await serverFetch.patch(`/user`, {
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//       next: { tags: ["my-profile"] },
//       credentials: "include",
//     });

//     return await response.json();
//   } catch (error: any) {
//     console.error("updateMyProfile error:", error);

//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? error?.message
//           : "Failed to update profile",
//     };
//   }
// }

// export async function checkAuth() {
//   try {
//     const res = await fetch(`${process.env.BASE_API_URL}/user/my-profile`, {
//       credentials: "include",
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const data = await res.json();
//     return data?.data || null;
//   } catch {
//     return null;
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

/**
 * Fetch logged-in user's profile
 */
export async function getMyProfile() {
  try {
    const response = await fetch(`${BASE_API_URL}/user/my-profile`, {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log(res);

    return res;
  } catch (error: any) {
    console.error("getMyProfile error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Failed to fetch profile",
    };
  }
}

/**
 * Update profile (works with avatar upload)
 * Must receive a FormData (including JSON payload + optional file)
 */
export async function updateMyProfile(payload: any) {
  try {
    const response = await fetch(`${BASE_API_URL}/user`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error: any) {
    console.error("updateMyProfile error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Failed to update profile",
    };
  }
}

/**
 * Check if user is authenticated
 */
export async function checkAuth() {
  try {
    const res = await fetch(`${BASE_API_URL}/user/my-profile`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data || null;
  } catch {
    return null;
  }
}
