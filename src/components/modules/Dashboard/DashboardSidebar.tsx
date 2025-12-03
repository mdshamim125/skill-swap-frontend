"use client";

import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";

const DashboardSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}) => {
  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
