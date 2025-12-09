"use client";

import { useState } from "react";
import { deleteUser, toggleUserStatus } from "@/services/user/user.actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface UserManagementActionsProps {
  userId: string;
  onActionComplete?: () => void; // callback to refresh table
}

export default function UserManagementActions({
  userId,
  onActionComplete,
}: UserManagementActionsProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteUser(userId);
      if (res.success) {
        toast.success("User deleted successfully");
        setIsDeleteOpen(false);
        onActionComplete?.();
      } else {
        toast.error(res.message || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleToggleStatus = async (type: "active" | "premium") => {
    try {
      const res = await toggleUserStatus(userId, type);
      if (res.success) {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} status updated`);
        onActionComplete?.();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Toggle Active */}
      <button
        className="btn btn-outline btn-sm"
        onClick={() => handleToggleStatus("active")}
      >
        Toggle Active
      </button>

      {/* Toggle Premium */}
      <button
        className="btn btn-outline btn-sm"
        onClick={() => handleToggleStatus("premium")}
      >
        Toggle Premium
      </button>

      {/* Delete Button */}
      <button
        className="btn btn-destructive btn-sm"
        onClick={() => setIsDeleteOpen(true)}
      >
        Delete
      </button>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
