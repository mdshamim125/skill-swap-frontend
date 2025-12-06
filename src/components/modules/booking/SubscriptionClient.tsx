/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubscriptionCheckoutAPI } from "@/services/subscription/subscription";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Plan = {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  description: string | null;
  freeBookings?: number;
};

export default function SubscriptionClient({
  plans,
  user,
}: {
  plans: Plan[];
  user: any;
}) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const router = useRouter();

  console.log(user);

  const handleSubscribe = async (planId: string) => {
    setLoadingPlan(planId);

    if (!user.success) {
      toast("You must be logged in to subscribe.");
      router.push("/login");
      return;
    }

    try {
      const res = await createSubscriptionCheckoutAPI(planId);
      console.log(res);

      const paymentUrl = res?.data?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      // toast("Subscription successful!");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast(err?.message || "Subscription failed");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const isFree = plan.price === 0;
        const hasUsedFree =
          user?.freeBookingsLeft === 0 && plan.freeBookings === 3;

        return (
          <Card
            key={plan.id}
            className={`border shadow-sm hover:shadow-lg transition-all rounded-xl ${
              isFree ? "bg-green-50" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {plan.name}
                {isFree && (
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                )}
              </CardTitle>
              <p className="text-gray-500 text-sm">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <div className="text-4xl font-bold mb-4 flex items-baseline">
                {isFree ? (
                  "Free"
                ) : (
                  <>
                    ${(plan.price / 100).toFixed(2)}
                    <span className="text-sm text-gray-500 ml-1">
                      / {plan.durationDays} days
                    </span>
                  </>
                )}
              </div>

              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                {isFree && plan.freeBookings ? (
                  <>
                    <li>✓ {plan.freeBookings} free bookings included</li>
                    <li>✓ Basic platform access</li>
                    <li>⨯ No premium features</li>
                  </>
                ) : (
                  <>
                    <li>✓ Full premium access</li>
                    <li>✓ Priority support</li>
                    <li>✓ Enhanced visibility</li>
                    {user?.role === "MENTOR" && (
                      <li>✓ Higher ranking in search</li>
                    )}
                  </>
                )}
              </ul>

              {isFree ? (
                <Button
                  className="w-full"
                  variant="secondary"
                  disabled={hasUsedFree}
                >
                  {hasUsedFree
                    ? "Free Plan Already Used"
                    : "Free Plan Activated"}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  disabled={loadingPlan === plan.id}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : `Subscribe 
                    Now`}
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
