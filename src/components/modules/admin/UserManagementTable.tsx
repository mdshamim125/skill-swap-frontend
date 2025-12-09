/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { deleteUser, updateUserStatus } from "@/services/auth/getUserInfo";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface UserManagementTableProps {
  users: any[];
  onActionComplete: () => void;
}

export default function UserManagementTable({
  users,
  onActionComplete,
}: UserManagementTableProps) {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [newRole, setNewRole] = useState("");

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteUser(id, {
        id: "admin-id-placeholder",
        role: "ADMIN",
      });
      if (res.success) {
        onActionComplete();
      } else {
        alert(res.message || "Failed to delete user");
      }
    });
  };

  const handleEdit = () => {
    if (!selectedUser || !newRole) return;

    startTransition(async () => {
      const res = await updateUserStatus(
        selectedUser.id,
        { role: newRole },
        { id: "admin-id-placeholder", role: "ADMIN" }
      );

      if (res.success) {
        setEditOpen(false);
        onActionComplete();
      } else {
        alert(res.message || "Failed to update role");
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left font-medium">Name</th>
            <th className="p-3 text-left font-medium">Email</th>
            <th className="p-3 text-left font-medium">Role</th>
            <th className="p-3 text-left font-medium">Status</th>
            <th className="p-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-muted-foreground">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user: any) => (
              <tr key={user.id} className="border-b hover:bg-muted/50">
                <td className="p-3">{user.name || "—"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className="font-medium">{user.role}</span>
                </td>
                <td className="p-3">
                  {user.isPremium ? (
                    <span className="text-green-600 font-medium">Premium</span>
                  ) : (
                    <span className="text-gray-500">Free</span>
                  )}
                </td>
                <td className="p-3 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setNewRole(user.role);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete {selectedUser?.name || "user"}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(selectedUser?.id)}
                          disabled={isPending}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Role Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
          </DialogHeader>

          {selectedUser?.role === "ADMIN" ? (
            <p className="text-red-600 font-medium py-4">
              You cannot change the role of an ADMIN.
            </p>
          ) : (
            <div className="space-y-4 py-4">
              <p>
                Change role for <strong>{selectedUser?.name}</strong>
              </p>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="MENTOR">MENTOR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              disabled={isPending || selectedUser?.role === "ADMIN" || !newRole}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}