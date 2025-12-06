// src/app/(dashboard)/subscriptions/page.tsx
import SubscriptionClient from "../../../components/modules/booking/SubscriptionClient";
import { subscriptionPlans } from "@/lib/plan";
import { getMyProfile } from "@/services/profile/profileManagement";

export default async function SubscriptionPage() {
  const user = await getMyProfile();

  // Instead of Prisma — using static JSON plans
  const plans = subscriptionPlans;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">
        Choose Your {user?.role === "MENTOR" ? "Mentor" : "User"} Plan
      </h1>

      <p className="text-gray-500 mb-10">
        Upgrade your account to unlock all premium features.
      </p>

      <SubscriptionClient plans={plans} user={user} />
    </div>
  );
}
