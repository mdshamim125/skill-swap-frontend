import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "MENTOR", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/dashboard/my-profile`,
          icon: "User",
          roles: ["USER", "MENTOR", "ADMIN"],
        },
        {
          title: "Chat",
          href: `/dashboard/chat`,
          icon: "MessageCircle",
          roles: ["USER", "MENTOR", "ADMIN"],
        },
      ],
    },
  ];
};

export const mentorNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Appointments",
        href: "/dashboard/mentor/appointments",
        icon: "Calendar", // ✅ String
        badge: "3",
        roles: ["MENTOR"],
      },
      {
        title: "My Schedules",
        href: "/dashboard/mentor/my-schedules",
        icon: "Clock", // ✅ String
        roles: ["MENTOR"],
      },
      {
        title: "Prescriptions",
        href: "/dashboard/mentor/prescriptions",
        icon: "FileText",
        roles: ["MENTOR"],
      },
    ],
  },
];

export const userNavItems: NavSection[] = [
  {
    title: "",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: "Calendar", // ✅ String
        roles: ["USER"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "User Management",
        href: "/dashboard/admin/user-management",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Skill Management",
    items: [
      {
        title: "Skill Management",
        href: "/dashboard/admin/skill-management",
        icon: "Tools", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "MENTOR":
      return [...commonNavItems, ...mentorNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
