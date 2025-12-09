/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MentorCard({
  mentor,
  index,
}: {
  mentor: any;
  index: number;
}) {

  console.log(mentor);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-200"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <Image
            src={mentor.avatar || "/default-avatar.png"}
            alt={mentor.name}
            fill
            className="rounded-full object-cover border-4 border-indigo-100 shadow-md"
            sizes="96px"
          />
        </div>

        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          {mentor.name}
        </h3>

        <p className="text-yellow-500 font-medium text-lg mt-1">
          ⭐ {mentor.averageRating.toFixed(1)}
        </p>

        <p className="text-indigo-600 font-medium mt-1">
          {mentor.profile?.expertise || "Expert"}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {mentor.profile?.skills?.slice(0, 3).map((skill: any) => (
            <span
              key={skill.id}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-lg"
            >
              {skill.title}
            </span>
          ))}
        </div>

        <Link href={`/mentors/${mentor.id}`}>
          <button className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            View Profile
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
