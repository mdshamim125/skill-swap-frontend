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
  const limit = Number(params.limit) || 9;

  // Filters
  const searchTerm =
    (Array.isArray(params.searchTerm)
      ? params.searchTerm[0]
      : params.searchTerm) || "";

  const category =
    (Array.isArray(params.category) ? params.category[0] : params.category) ||
    "all";

  const skills = params.skills
    ? (Array.isArray(params.skills) ? params.skills : [params.skills]).filter(
        (s: string) => s
      )
    : [];

  // Mentor data
  const mentorsResponse = await getActiveMentors(
    { searchTerm, category, skills },
    { page, limit }
  );

  console.log(mentorsResponse);

  const mentors = mentorsResponse?.data || [];
  const totalPages = Math.ceil((mentorsResponse?.meta?.total || 0) / limit);

  // Skills for filters
  const skillResponse = await getSkills(1, 999);
  const skillList = skillResponse?.data || [];

  const categories: string[] = Array.from(
    new Set(skillList.map((s: any) => s.category))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-semibold">Find a Mentor</h1>

      {/* Filters */}
      <MentorSearchFilters categories={categories} skills={skillList} />

      {/* Mentor Grid */}
      {/* Mentors Grid */}
      <div className="mt-8">
        {mentors.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center border rounded-3xl shadow-sm">
            <p className="text-gray-500 text-lg">No mentors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor: any) => (
              <div
                key={mentor.id}
                className="bg-white border rounded-3xl shadow-sm p-6 hover:shadow-lg transition-all"
              >
                <div className="w-full h-44 rounded-2xl overflow-hidden">
                  <Image
                    src={mentor?.avatar || "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/480289536_1394443704855366_8149698206212697807_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=qGBu1L4WH44Q7kNvwHPYdLK&_nc_oc=Adm_t78VWRncVfXaBjTyjLRoNu-2VRvzO3nKKf31ybgB7_GLsXhnpI5pIdnzca-CZ7g&_nc_zt=23&_nc_ht=scontent.fdac31-1.fna&_nc_gid=Xpq5zQCatw-tCTGjl9uhVA&oh=00_Afm-GkYBPtK1UnR4W8Rx5rm1kYTq1awThlsJEbeMuf4pLw&oe=693C5712"}
                    alt="Mentor"
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-center">
                    {mentor.name}
                  </h3>

                  {/* Experience + Rate */}
                  <div className="flex justify-center gap-6 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {mentor.profile?.experience} yrs
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />$
                      {mentor.profile?.hourlyRate}/hr
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex justify-center items-center gap-1 text-gray-600 text-sm mt-2">
                    <MapPin className="w-4 h-4" />
                    {mentor.profile?.city}, {mentor.profile?.country}
                  </div>

                  {/* Skills */}
                  {mentor.profile?.skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {mentor.profile.skills.slice(0, 6).map((skill: any) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                        >
                          {skill.title}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full h-10 mt-6 bg-blue-600 text-white"
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
        <div className="mt-10 flex justify-center">
          <TablePagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
