"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import EditSkillModal from "./EditSkillModal";
import { getSkills, deleteSkill } from "@/services/admin/skillsManagement";

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

interface Skill {
  id: string;
  title: string;
  category: string;
}

interface SkillsResponse {
  data: Skill[];
  meta: { page: number; limit: number; total: number };
  success?: boolean;
  message?: string;
}

export default function SkillsTable() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Fetch skills
  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res: SkillsResponse = await getSkills(page, limit);
      setSkills(res.data || []);
      setTotal(res.meta?.total || 0);
    } catch (err) {
      console.error(err);
      setSkills([]);
      setTotal(0);
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const totalPages = Math.ceil(total / limit);

  // Edit handlers
  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSkill(null);
    setIsModalOpen(false);
  };

  // Delete handlers
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const result = await deleteSkill(deleteId);
      if (result.success) {
        toast.success("Skill deleted successfully!");
        fetchSkills();
      } else {
        toast.error(result.message || "Failed to delete skill");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setDeleteId(null);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="mt-6 border rounded-xl p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">All Skills</h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {skills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No skills found
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill, index) => (
                  <TableRow key={skill.id}>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell className="font-medium">{skill.title}</TableCell>
                    <TableCell>{skill.category}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(skill)}
                      >
                        Edit
                      </Button>

                      {/* AlertDialog for Delete */}
                      <AlertDialog
                        open={isDeleteOpen && deleteId === skill.id}
                        onOpenChange={setIsDeleteOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteId(skill.id)}
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the skill.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingSkill && (
        <EditSkillModal
          skill={editingSkill}
          onClose={handleCloseModal}
          onUpdated={fetchSkills} // refresh table after edit
        />
      )}
    </div>
  );
}
