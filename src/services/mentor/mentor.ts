
import { serverFetch } from "@/lib/server-fetch";

interface MentorSearchParams {
  searchTerm?: string;
  skills?: string[]; // array of tags
  category?: string;
}

interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Get active mentors (filters + pagination)
 * Matches backend controller structure
 */
// export async function getActiveMentors(
//   params: MentorSearchParams = {},
//   options: PaginationOptions = {}
// ) {
//   try {
//     const query = new URLSearchParams();

//     // Filters
//     if (params.searchTerm) query.append("searchTerm", params.searchTerm);
//     if (params.category) query.append("category", params.category);

//     // Skills must be sent as comma-separated string
//     if (params.skills?.length) {
//       query.append("skills", params.skills.join(","));
//     }

//     // Pagination + sorting
//     if (options.page) query.append("page", String(options.page));
//     if (options.limit) query.append("limit", String(options.limit));
//     if (options.sortBy) query.append("sortBy", options.sortBy);
//     if (options.sortOrder) query.append("sortOrder", options.sortOrder);

//     const response = await serverFetch.get(`/mentors?${query.toString()}`, {
//       cache: "no-store",
//       next: { tags: ["active-mentors"] },
//     });

//     const res = await response.json();
//     return res;
//   } catch (error: any) {
//     console.error("getActiveMentors error:", error);

//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? error?.message
//           : "Failed to fetch mentors",
//     };
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

interface MentorSearchParams {
  searchTerm?: string;
  category?: string;
  skills?: string[]; // array like ["React", "Leadership"]
}

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export async function getActiveMentors(
  params: MentorSearchParams = {},
  options: PaginationOptions = {}
) {
  try {
    const query = new URLSearchParams();

    // 🔍 Search
    if (params.searchTerm) {
      query.set("searchTerm", params.searchTerm);
    }

    // 🏷 Category
    if (params.category && params.category !== "all") {
      query.set("category", params.category);
    }

    // 🧩 Skills (CSV)
    if (params.skills?.length && !params.skills.includes("all")) {
      query.set("skills", params.skills.join(","));
    }

    // 📄 Pagination
    if (options.page) query.set("page", String(options.page));
    if (options.limit) query.set("limit", String(options.limit));

    const response = await serverFetch.get(`/mentors?${query.toString()}`, {
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Mentor fetch failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch mentors",
    };
  }
}

/**
 * Fetch a mentor by ID
 */
export async function getMentorById(id: string) {
  try {
    const response = await serverFetch.get(`/mentors/${id}`, {
      cache: "no-cache",
      next: { tags: [`mentor-${id}`] },
    });

    const res = await response.json();
    return res;
  } catch (error: any) {
    console.error("getMentorById error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Failed to fetch mentor details",
    };
  }
}
