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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import EditSkillModal from "./EditSkillModal";
import { getSkills, deleteSkill } from "@/services/admin/skillsManagement";
import TablePagination from "@/components/shared/TablePagination";

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

import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  // get page from URL, fallback = 1
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageFromUrl);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Sync URL page → state when user navigates back/forward
  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

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
                      <button
                        className="px-3 py-1 border rounded"
                        onClick={() => handleEdit(skill)}
                      >
                        Edit
                      </button>

                      <AlertDialog
                        open={isDeleteOpen && deleteId === skill.id}
                        onOpenChange={setIsDeleteOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <button
                            className="px-3 py-1 bg-red-600 text-white rounded"
                            onClick={() => setDeleteId(skill.id)}
                          >
                            Delete
                          </button>
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

          {/* Pagination Component */}
          <div className="mt-6">
            <TablePagination currentPage={page} totalPages={totalPages} />
          </div>
        </>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingSkill && (
        <EditSkillModal
          skill={editingSkill}
          onClose={handleCloseModal}
          onUpdated={fetchSkills}
        />
      )}
    </div>
  );
}
