/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";

export async function createSubscriptionCheckoutAPI(planId: string) {
  try {
    const res = await serverFetch.post("/subscriptions/create", {
      body: JSON.stringify({ planId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("createSubscriptionCheckoutAPI error:", err);
    return { success: false, message: err?.message || "Subscription failed" };
  }
}
