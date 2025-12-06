/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { createBookingAPI } from "@/services/booking/bookingService";
import { toast } from "sonner";
import { getMyProfileClient } from "@/services/profile/getMyProfileClient";

type Skill = { id: string; title: string; pricePerHour?: number };
type Mentor = {
  id: string;
  name: string;
  profile?: any;
  offeredSkills?: Skill[];
};

export default function BookingModal({
  open,
  setOpen,
  mentor,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  mentor: Mentor;
}) {
  const router = useRouter();

  const [skillId, setSkillId] = useState<string | undefined>(
    mentor.profile?.skills?.[0]?.id
  );

  const [scheduledAt, setScheduledAt] = useState<string>("");
  const [durationMin, setDurationMin] = useState<number>(60);
  const [loading, setLoading] = useState(false);

  //   const handleSubmit = async () => {
  //     if (!skillId || !scheduledAt) {
  //       alert("Please fill all fields");
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       const payload = {
  //         mentorId: mentor.id,
  //         skillId,
  //         scheduledAt,
  //         durationMin,
  //       };

  //       const res = await createBookingAPI(payload);
  //       console.log(res);
  //       const paymentUrl = res?.data?.paymentUrl || res?.paymentUrl;

  //       if (paymentUrl) {
  //         window.location.href = paymentUrl;
  //         return;
  //       }

  //       alert("Booking confirmed!");
  //       setOpen(false);
  //       router.refresh();
  //     } catch (err: any) {
  //       console.error(err);
  //       alert(err?.message || "Booking failed");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async () => {
    // 1. Check login
    const authCheck = await getMyProfileClient();

    if (!authCheck) {
      toast("You must be logged in to book a session.");
      router.push("/login");
      return;
    }

    // 2. Validate input
    if (!skillId || !scheduledAt) {
      toast("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        mentorId: mentor.id,
        skillId,
        scheduledAt: new Date(scheduledAt).toISOString(), // FIX
        durationMin,
      };

      const res = await createBookingAPI(payload);
      console.log(res);
      const paymentUrl = res?.booking?.paymentUrl || res?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      toast("Booking confirmed!");
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast(err?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-blue-600">
            {mentor.name}
          </DialogTitle>
        </DialogHeader>

        {/* Skill */}
        <div className="space-y-4 mt-4">
          <div>
            <Label>Choose Skill</Label>
            <Select value={skillId} onValueChange={setSkillId}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>

              <SelectContent>
                {mentor.profile?.skills?.map((skill: any) => (
                  <SelectItem key={skill.id} value={skill.id}>
                    {skill.title}
                    {skill.pricePerHour ? ` — $${skill.pricePerHour}/hr` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div>
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Duration */}
          <div>
            <Label>Duration (minutes)</Label>
            <Select
              value={durationMin.toString()}
              onValueChange={(v) => setDurationMin(Number(v))}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 hr</SelectItem>
                <SelectItem value="120">2 hr</SelectItem>
                <SelectItem value="180">3 hr</SelectItem>
                <SelectItem value="240">4 hr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
