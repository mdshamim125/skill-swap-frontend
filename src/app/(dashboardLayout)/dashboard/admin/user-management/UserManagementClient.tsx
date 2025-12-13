/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllUsers } from "@/services/user/user.actions";
import UserManagementTable from "@/components/modules/admin/UserManagementTable";
import TablePagination from "@/components/shared/TablePagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserManagementClientProps {
  initialUsers: any[];
  initialTotalPages: number;
  initialPage: number;
  initialSearch: string;
  initialRole: string;
}

export default function UserManagementClient({
  initialUsers,
  initialTotalPages,
  initialPage: serverPage,
  initialSearch: serverSearch,
  initialRole: serverRole,
}: UserManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Always read current state from URL
  const page = Number(searchParams.get("page")) || serverPage;
  const search = searchParams.get("search") || serverSearch;
  const role = searchParams.get("role") || serverRole;

  const [users, setUsers] = useState(initialUsers);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  // Fetch users whenever page/search/role changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllUsers(page, search, role);
      setUsers(result?.data || []);
      const total = result?.meta?.total || 0;
      const limit = result?.meta?.limit || 10;
      setTotalPages(Math.ceil(total / limit));
    };

    fetchData();
  }, [page, search, role]);

  // Helper to update URL
  const updateUrl = (updates: Record<string, string | undefined>) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === "" || value == null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filtering
      if ("search" in updates || "role" in updates) {
        params.set("page", "1");
      }

      router.push(`?${params.toString()}`);
    });
  };

  const refreshCurrentPage = () => {
    startTransition(() => router.refresh());
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Name or email..."
            value={search}
            onChange={(e) => updateUrl({ search: e.target.value })}
            disabled={isPending}
          />
        </div> */}

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Role</label>
          <Select
            value={role || "ALL"}
            onValueChange={(val) =>
              updateUrl({ role: val === "ALL" ? "" : val })
            }
            disabled={isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="MENTOR">Mentor</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <UserManagementTable
        users={users}
        onActionComplete={refreshCurrentPage}
      />

      {/* Pagination - Now ALWAYS visible when needed */}
      <div className="flex justify-center mt-8">
        <TablePagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}


