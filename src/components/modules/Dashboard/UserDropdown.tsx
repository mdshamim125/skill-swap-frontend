"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { Home } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="text-sm font-semibold">
            {userInfo.name.charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* --- User Info Section --- */}
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* --- Profile --- */}
        <DropdownMenuItem asChild>
          <Link
            href={`/`}
            className="cursor-pointer flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back Home
          </Link>
        </DropdownMenuItem>

        {/* --- Settings --- */}

        <DropdownMenuSeparator />

        {/* --- Logout --- */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 font-medium"
        >
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
