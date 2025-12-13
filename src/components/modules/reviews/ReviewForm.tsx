/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Star, SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMyBookings } from "@/services/booking/bookingService";

export default function ReviewForm({ mentorId }: { mentorId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookings, setBookings] = useState<{ id: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load bookings from server action
  useEffect(() => {
    const loadBookings = async () => {
      const result = await getMyBookings(`?mentorId=${mentorId}`);

      console.log(result);

      if (result?.success && Array.isArray(result?.data?.data)) {
        setBookings(result?.data?.data);
      }
      // else {
      //   toast.error("You haven't booking this yet!");
      // }

      setLoading(false);
    };

    loadBookings();
  }, [mentorId]);

  const handleSubmit = async () => {
    if (!bookingId) return toast.error("Please select a booking or booking first.");
    if (!rating) return toast.error("Rating is required.");
    if (!comment.trim()) return toast.error("Comment cannot be empty.");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetUserId: mentorId,
        bookingId,
        rating,
        comment,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) return toast.error(data.message || "Failed to submit review");

    toast.success("Review submitted!");
    setRating(0);
    setComment("");
    setBookingId("");

    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mt-10">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

      {/* --- Booking Selector (shadcn) --- */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Select Booking
      </label>

      <Select onValueChange={setBookingId}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue
            placeholder={loading ? "Loading..." : "Choose Booking"}
          />
        </SelectTrigger>

        <SelectContent>
          {bookings.length === 0 && (
            <SelectItem value="none" disabled>
              You haven&apos;t booking this yet!
            </SelectItem>
          )}

          {bookings.map((b: any) => (
            <SelectItem key={b.id} value={b.id}>
              Booking on {b?.skill?.category || "Unknown Category"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Rating Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            onClick={() => setRating(n)}
            className={`cursor-pointer w-7 h-7 ${
              rating >= n ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <textarea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-lg p-3 text-sm"
        rows={4}
      ></textarea>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        <SendHorizonal className="w-4 h-4" />
        Submit Review
      </button>
    </div>
  );
}
