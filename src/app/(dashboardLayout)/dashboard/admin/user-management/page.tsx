// app/(dashboard)/admin/users/page.tsx
import { getAllUsers } from "@/services/user/user.actions";
import UserManagementClient from "./UserManagementClient";

interface UsersPageProps {
  searchParams?: {
    page?: string;
    search?: string;
    role?: string;
  };
}

export default async function UsersManagementPage({
  searchParams,
}: UsersPageProps) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const role = searchParams?.role || "";

  // Fetch initial data on the server
  const result = await getAllUsers(page, search, role);
  const users = result?.data || [];
  const total = result?.meta?.total || 0;
  const limit = result?.meta?.limit || 10;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <UserManagementClient
        initialUsers={users}
        initialTotalPages={totalPages}
        initialPage={page}
        initialSearch={search}
        initialRole={role}
      />
    </div>
  );
}