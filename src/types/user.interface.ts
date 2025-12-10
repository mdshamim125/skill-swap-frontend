import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;

  // premium system
  isPremium: boolean;
  premiumExpires: Date | null;

  // additional recommended fields
  avatar?: string | null; // for profile photo
  averageRating?: number; // mentor rating
  reviewsCount?: number; // total reviews
}

// import { UserRole } from "@/lib/auth-utils";

// export interface UserInfo {
//     name: string;
//     email: string;
//     role: UserRole;
// }
