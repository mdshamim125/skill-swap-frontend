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
    title: "Appointments",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: "Calendar", // ✅ String
        roles: ["USER"],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList", // ✅ String
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText", // ✅ String
        roles: ["USER"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity", // ✅ String
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
        title: "Admins",
        href: "/dashboard/admin/admins-management",
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Mentors",
        href: "/dashboard/admin/mentors-management",
        icon: "Stethoscope", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Patients",
        href: "/dashboard/admin/patients-management",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/dashboard/admin/appointments-management",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/dashboard/admin/schedules-management",
        icon: "Clock", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/dashboard/admin/specialities-management",
        icon: "Hospital", // ✅ String
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
