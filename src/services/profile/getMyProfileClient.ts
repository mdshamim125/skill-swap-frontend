/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getMyProfileClient() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/my-profile`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data || null;
  } catch (error: any) {
    console.error("getMyProfileClient error:", error);
    return null;
  }
}
