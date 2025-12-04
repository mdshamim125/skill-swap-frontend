/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";
import { getActiveMentors } from "@/services/mentor/mentor";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { getSkills } from "@/services/admin/skillsManagement";
import { Briefcase, DollarSign, Filter, MapPin } from "lucide-react";

interface MentorPageProps {
  searchParams: {
    page?: string | string[];
    searchTerm?: string | string[];
    category?: string | string[];
    skills?: string | string[];
  };
}

const toStringParam = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? value[0] : value ?? "";

const toArrayParam = (value: string | string[] | undefined): string[] =>
  !value ? [] : Array.isArray(value) ? value : [value];

export default async function MentorListPage({
  searchParams,
}: MentorPageProps) {
  // Pagination
  const page = Number(toStringParam(searchParams.page)) || 1;
  const limit = 9;

  // Filters
  const searchTerm = toStringParam(searchParams.searchTerm);
  const category = toStringParam(searchParams.category);
  const skills = toArrayParam(searchParams.skills);

  // Fetch mentors
  const result = await getActiveMentors(
    { searchTerm, category, skills },
    { page, limit }
  );

  const mentors = result?.data || [];
  const meta = result?.meta || { total: 0 };
  const totalPages = Math.ceil(meta.total / limit);

  // Skills list
  const skillResponse = await getSkills(1, 999);
  const skillList = skillResponse?.data || [];

  // Extract unique categories dynamically
  const uniqueCategories = Array.from(
    new Set(skillList.map((skill: any) => skill.category))
  );

  return (
    <div className="w-full container mx-auto md:py-8 py-6 px-6">
      {/* PAGE TITLE */}
      <h1 className="text-center text-4xl font-semibold">Find a Mentor</h1>

      {/* FILTER SECTION */}
      <div className="mt-6">
        <form
          action="/mentors"
          method="GET"
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          {/* SEARCH */}
          <Input
            name="searchTerm"
            placeholder="Search by name or expertise..."
            defaultValue={searchTerm}
            className="w-full md:w-[360px] h-9 rounded-xl border border-gray-300"
          />

          {/* CATEGORY */}
          <Select name="category" defaultValue={category || ""}>
            <SelectTrigger className="w-full md:w-[250px] h-12 rounded-xl border border-gray-300">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((cat: any) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* SKILLS */}
          <Select name="skills" defaultValue={skills[0] || ""}>
            <SelectTrigger className="w-full md:w-[250px] h-11 rounded-xl border border-gray-300">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {skillList.map((skill: any) => (
                <SelectItem key={skill.id} value={skill.title}>
                  {skill.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="h-9 px-6 flex items-center gap-2" type="submit">
            <Filter className="w-4 h-4" />
            Apply Filters
          </Button>
        </form>
      </div>

      {/* MENTORS GRID */}
      <div className="mt-8">
        {mentors.length === 0 ? (
          <div className="w-full border border-gray-200 bg-white rounded-3xl shadow-sm h-[300px] flex items-center justify-center">
            <p className="text-gray-500 text-lg">No mentors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor: any) => (
              <div
                key={mentor.id}
                className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="w-full h-44 rounded-2xl overflow-hidden">
                  <Image
                    src={mentor.profile?.avatarUrl || "/placeholder-avatar.png"}
                    alt="Mentor"
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 text-center">
                    {mentor.name}
                  </h3>

                  {/* Experience + Hourly Rate */}
                  <div className="flex justify-center gap-6 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{mentor.profile?.experience || "0"} yrs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${mentor.profile?.hourlyRate}/hr</span>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="flex justify-center items-center gap-1 text-gray-600 text-sm mt-2">
                    <MapPin className="w-4 h-4" />
                    {mentor.profile?.city}, {mentor.profile?.country}
                  </div>

                  {/* SKILLS */}
                  {mentor.profile?.skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {mentor.profile.skills.slice(0, 6).map((skill: any) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-medium"
                        >
                          {skill.title}
                        </span>
                      ))}

                      {mentor.profile.skills.length > 6 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{mentor.profile.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* VIEW BUTTON */}
                  <Button
                    className="w-full h-10 mt-6 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <Link href={`/mentors/${mentor.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/mentors?page=${page - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`/mentors?page=${pageNum}`}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/mentors?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
