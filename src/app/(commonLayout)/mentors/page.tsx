/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

import { getActiveMentors } from "@/services/mentor/mentor";
import { getSkills } from "@/services/admin/skillsManagement";
import MentorSearchFilters from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { Button } from "@/components/ui/button";
import { Briefcase, DollarSign, MapPin } from "lucide-react";

export const revalidate = 600;

export default async function MentorListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 6;

  // Filters
  const searchTerm = Array.isArray(params.searchTerm)
    ? params.searchTerm[0]
    : params.searchTerm || "";

  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category || "all";

  const skills = params.skills
    ? (Array.isArray(params.skills) ? params.skills : [params.skills]).filter(
        (s: string) => s
      )
    : [];

  // Fetch mentors & skills
  const mentorsResponse = await getActiveMentors(
    { searchTerm, category, skills },
    { page, limit }
  );
  const mentors = mentorsResponse?.data || [];
  const totalPages = Math.ceil((mentorsResponse?.meta?.total || 0) / limit);

  const skillResponse = await getSkills(1, 999);
  const skillList = skillResponse?.data || [];
  const categories: string[] = Array.from(
    new Set(skillList.map((s: any) => s.category))
  );

  console.log(mentors[1].id)

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Find a Mentor</h1>

      {/* Filters */}
      <MentorSearchFilters categories={categories} skills={skillList} />

      {/* Mentors Grid */}
      <div className="mt-6">
        {mentors.length === 0 ? (
          <div className="h-72 flex items-center justify-center border rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">No mentors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor: any) => (
              <div
                key={mentor.id}
                className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-md transition"
              >
                <div className="w-full h-36 rounded-xl overflow-hidden">
                  <Image
                    src={
                      mentor?.avatar ||
                      "https://via.placeholder.com/300x200?text=Mentor"
                    }
                    alt={mentor.name}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-lg font-semibold">{mentor.name}</h3>

                  <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {mentor?.profile?.experience || 2} yrs
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />$
                      {mentor.profile?.hourlyRate || 0}/hr
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-1 text-gray-500 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    {mentor.profile?.city || "-"},{" "}
                    {mentor.profile?.country || "-"}
                  </div>

                  {mentor.profile?.skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 justify-center">
                      {mentor.profile.skills.slice(0, 6).map((skill: any) => (
                        <span
                          key={skill.id}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
                        >
                          {skill.title}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full mt-3 h-8 bg-blue-600 text-white text-sm"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <TablePagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
