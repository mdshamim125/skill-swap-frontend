/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (!reviews.length) return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <div className="space-y-5">
      {reviews.map((rev) => (
        <div
          key={rev.id}
          className="bg-white p-6 rounded-xl border shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">
              {rev.reviewer?.name || "Unknown User"}
            </h4>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rev.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700">{rev.comment}</p>

          <span className="text-sm text-gray-400">
            {new Date(rev.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}
