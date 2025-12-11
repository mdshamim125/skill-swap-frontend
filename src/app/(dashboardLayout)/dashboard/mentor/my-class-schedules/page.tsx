"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Clock, User2, Wallet } from "lucide-react";

interface Booking {
  id: string;
  scheduledAt: string;
  durationMin: number;
  status: string;
  pricePaid: number | null;
  mentee: {
    name: string;
    avatar: string | null;
  };
  skill: {
    name: string;
  };
}

const statusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "CONFIRMED":
      return "bg-green-100 text-green-700";
    case "COMPLETED":
      return "bg-blue-100 text-blue-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const MentorSchedulesPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/mentor-schedules`,
        {
          credentials: "include",
          cache: "no-cache",
        }
      );

      const data = await res.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error("Failed to fetch mentor schedules", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mentor Schedules
          </h1>
          <p className="text-gray-500 mt-1">
            Review and manage all of your upcoming and past mentoring sessions.
          </p>
        </div>

        {!loading && bookings.length > 0 && (
          <Badge variant="outline" className="text-sm px-4 py-1">
            {bookings.length} sessions
          </Badge>
        )}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        // Empty State
        <Card className="text-center py-12">
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-700">
              No sessions scheduled yet
            </h2>
            <p className="text-gray-500 mt-2">
              Once mentees book sessions with you, they will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="shadow-sm border hover:shadow-md hover:border-gray-300 transition-all rounded-xl"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span className="font-semibold">{booking.skill.name}</span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Mentee Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={booking.mentee.avatar || ""} />
                    <AvatarFallback>
                      {booking.mentee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium flex items-center gap-1">
                      <User2 className="h-4 w-4 text-gray-500" />
                      {booking.mentee.name}
                    </p>
                    <p className="text-gray-500 text-sm">Mentee</p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Date:{" "}
                      <b>
                        {new Date(booking.scheduledAt).toLocaleDateString()}
                      </b>
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      Time:{" "}
                      <b>
                        {new Date(booking.scheduledAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </b>
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      Duration: <b>{booking.durationMin} minutes</b>
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gray-500" />
                    <span>
                      Price:{" "}
                      <b>
                        {booking.pricePaid
                          ? `${booking.pricePaid}৳`
                          : "Free Session"}
                      </b>
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorSchedulesPage;
