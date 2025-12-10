"use client";

import { BookOpenIcon, LogInIcon, LogOutIcon, CrownIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { logoutUser } from "@/services/auth/logoutUser";

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount
  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      setUser(data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboardRedirect = () => {
    if (!user) return;
    router.push(getDefaultDashboardRoute(user.role));
  };

  // Avatar initials
  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "U";

  // Premium check
  const isPremiumActive =
    user?.isPremium &&
    user?.premiumExpires &&
    new Date(user.premiumExpires) > new Date();

  console.log("User:", user);
  console.log("isPremium:", user?.isPremium);
  console.log("premiumExpires:", user?.premiumExpires);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={user?.avatar || "/avatar.jpg"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        {/* Header */}
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">
              {loading ? "Loading..." : user?.name || "Guest User"}
            </span>

            {/* Premium Badge */}
            {isPremiumActive && (
              <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-0.5 text-xs rounded-full font-medium border border-yellow-300">
                <CrownIcon size={13} className="text-yellow-600" />
                Premium
              </span>
            )}
          </div>

          <span className="text-muted-foreground text-xs truncate">
            {loading ? "..." : user?.email || "No Email"}
          </span>

          {/* Show Premium Expiration */}
          {isPremiumActive && (
            <span className="text-yellow-700 text-xs mt-0.5">
              Expires: {new Date(user.premiumExpires!).toLocaleDateString()}
            </span>
          )}

          <span className="text-muted-foreground text-xs">
            {loading ? "..." : user?.role}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Dashboard */}
        {user && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleDashboardRedirect}>
                <BookOpenIcon size={16} className="opacity-60" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Login / Logout */}
        {user ? (
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon size={16} className="opacity-60" />
            <span>Logout</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/login")}>
            <LogInIcon size={16} className="opacity-60" />
            <span>Login</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
