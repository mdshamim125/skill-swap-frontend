"use client";

import { getMyBookings } from "@/services/booking/bookingService";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Booking {
  id: string;
  scheduledAt: string;
  status: string;
  mentor: {
    id: string;
    name: string;
    profile?: {
      bio?: string;
      avatar?: string;
    };
  };
  skill: {
    id: string;
    name: string;
    title: string;
  };
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);

      const query = `?page=${page}&limit=10&sortBy=scheduledAt&sortOrder=desc`;
      const res = await getMyBookings(query);

      if (res?.data) {
        setBookings(res.data.data);
        setMeta(res.data.meta);
      }

      setLoading(false);
    }

    load();
  }, [page]);

  console.log(bookings);

  if (loading)
    return <p className="p-4 text-center text-lg">Loading bookings...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="border rounded-lg shadow-sm bg-white">
          <Table>
            <TableCaption>Your booking history</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
                  {/* Mentor */}
                  <TableCell className="font-semibold">
                    {b.mentor.name}
                  </TableCell>

                  {/* Skill */}
                  <TableCell>{b.skill.title}</TableCell>

                  {/* Date */}
                  <TableCell>
                    {new Date(b.scheduledAt).toLocaleString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={
                        b.status === "CONFIRMED"
                          ? "bg-green-600"
                          : b.status === "CANCELLED"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }
                    >
                      {b.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ---- SHADCN PAGINATION ---- */}
          <div className="p-4 border-t bg-gray-50">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      page === 1 ? "pointer-events-none opacity-40" : ""
                    }
                    onClick={() => page > 1 && setPage(page - 1)}
                  />
                </PaginationItem>

                <span className="px-4 py-1 text-sm">
                  Page <strong>{meta.page}</strong> of{" "}
                  <strong>{Math.ceil(meta.total / meta.limit)}</strong>
                </span>

                <PaginationItem>
                  <PaginationNext
                    className={
                      meta.page * meta.limit >= meta.total
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                    onClick={() =>
                      meta.page * meta.limit < meta.total && setPage(page + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
