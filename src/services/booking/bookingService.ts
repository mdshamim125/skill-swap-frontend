/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";

export async function createBookingAPI(payload: {
  mentorId: string;
  skillId: string;
  scheduledAt: string;
  durationMin: number;
}) {
  try {
    const res = await serverFetch.post("/bookings/create", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("createBookingAPI error:", err);
    return { success: false, message: err?.message || "Booking failed" };
  }
}

export async function getMyBookings(options: string = "") {
  try {
    const response = await serverFetch.get(`/bookings/my-bookings${options}`, {
      cache: "no-cache",
      credentials: "include",
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.error("getMyBookings error:", error);
    return {
      success: false,
      message: "Failed to fetch bookings",
    };
  }
}
