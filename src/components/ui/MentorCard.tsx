/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MentorCardProps {
  mentor: any;
  index: number;
}

export default function MentorCard({ mentor, index }: MentorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 text-center"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <Image
            src={mentor.avatar || "/default-avatar.png"}
            alt={mentor.name}
            fill
            className="rounded-full object-cover border-2 border-indigo-100 shadow-sm"
            sizes="80px"
          />
        </div>

        <h3 className="mt-2 text-base font-semibold text-gray-900">
          {mentor.name}
        </h3>

        <p className="text-yellow-500 font-medium text-xs mt-1">
          ⭐ {mentor.averageRating?.toFixed(1) || "0.0"}
        </p>

        <p className="text-indigo-600 font-medium text-xs mt-1">
          {mentor.profile?.expertise || "Expert"}
        </p>

        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {mentor.profile?.skills?.slice(0, 3).map((skill: any) => (
            <span
              key={skill.id}
              className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-md"
            >
              {skill.title}
            </span>
          ))}
        </div>

        <Link href={`/mentors/${mentor.id}`}>
          <button className="mt-3 px-4 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 transition">
            View Profile
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
