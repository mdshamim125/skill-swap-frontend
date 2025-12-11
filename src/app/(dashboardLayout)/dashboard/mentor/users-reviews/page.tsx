/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface SmallUser {
  id?: string;
  name?: string;
  avatar?: string | null;
}

interface BookingInfo {
  id: string;
  createdAt?: string | null;
}

interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  reviewer?: SmallUser | null;
  targetUser?: SmallUser | null;
  booking?: BookingInfo | null;
}

const UsersReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setDeletingId] = useState<string | null>(null);
  const [q, setQ] = useState<string>("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/mentor`,
        {
          credentials: "include",
          cache: "no-cache",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch reviews");
      setReviews(data.data || []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete review");

      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Review deleted");
    } catch (err: any) {
      toast.error(err?.message || "Could not delete review");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = reviews.filter((r) => {
    if (!q.trim()) return true;
    const term = q.toLowerCase();
    return (
      r.reviewer?.name?.toLowerCase().includes(term) ||
      r.targetUser?.name?.toLowerCase().includes(term) ||
      (r.comment || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">User Reviews</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Reviews left by users — reviewer, target, rating, comment and
                booking.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by reviewer or comment..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="ghost" onClick={() => setQ("")}>
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              No reviews found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Booking</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id} className="align-top">
                      {/* Reviewer */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={r.reviewer?.avatar || ""} />
                            <AvatarFallback>
                              {r.reviewer?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {r.reviewer?.name || "Unknown User"}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <Badge
                          className="px-3 py-1"
                          variant={r.rating >= 4 ? "secondary" : "destructive"}
                        >
                          {r.rating} / 5
                        </Badge>
                      </TableCell>

                      {/* Comment */}
                      <TableCell className="max-w-xs truncate">
                        {r.comment || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>

                      {/* Created */}
                      <TableCell>
                        <div className="text-sm">
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              window.open(`/mentors/${r.id}`, "_blank")
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <ConfirmDialog
                            title="Delete Review?"
                            description="Are you sure you want to permanently delete this review?"
                            onConfirm={() => handleDelete(r.id)}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </ConfirmDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersReviewsPage;
