import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import React from "react";

import { getUserInfo } from "@/services/auth/getUserInfo";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ✅ Fetch user from server (SAFE)
  const userInfo = await getUserInfo();

  // If you want to prevent layout crash
  if (!userInfo) {
    return <div className="p-6">Failed to load user session.</div>;
  }

  // Generate nav items & home URL
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Pass data to sidebar (client component) */}
      <DashboardSidebar
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
