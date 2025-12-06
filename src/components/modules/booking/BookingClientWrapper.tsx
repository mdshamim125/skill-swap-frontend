/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookingClientWrapper({ mentor }: { mentor: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Book a Session
      </button>

      <BookingModal open={open} setOpen={setOpen} mentor={mentor} />
    </>
  );
}
