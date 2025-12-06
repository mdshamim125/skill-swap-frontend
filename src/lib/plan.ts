// /data/plans.ts
export const subscriptionPlans = [
  {
    id: "free",
    name: "Free Basic Plan",
    price: 0,
    durationDays: 0, // free plan has no duration
    description: "Includes 3 free bookings for new users",
    freeBookings: 3,
  },
  {
    id: "monthly",
    name: "Monthly Premium",
    price: 1000,
    durationDays: 30,
    description: "Access all premium features for 1 month",
  },
  {
    id: "yearly",
    name: "Yearly Premium",
    price: 10000,
    durationDays: 365,
    description: "Access all premium features for 1 year",
  },
];
