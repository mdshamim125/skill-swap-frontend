"use client";

import { BookOpenIcon, LogInIcon, LogOutIcon } from "lucide-react";
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

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on first mount
  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      setUser(data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboardRedirect = () => {
    if (!user) return;

    switch (user.role) {
      case "ADMIN":
        router.push("/admin");
        break;
      case "MENTOR":
        router.push("/mentor");
        break;
      default:
        router.push("/dashboard");
    }
  };

  // Avatar initials
  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={"/avatar.jpg"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        {/* Header */}
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate text-sm font-medium">
            {loading ? "Loading..." : user?.name || "Guest User"}
          </span>
          <span className="text-muted-foreground truncate text-xs">
            {loading ? "..." : user?.email || "No Email"}
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
