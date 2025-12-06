/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMentorById } from "@/services/mentor/mentor";
import Image from "next/image";
import { MapPin, Phone, BadgeCheck, Briefcase, Mail } from "lucide-react";
import BookingClientWrapper from "@/components/modules/booking/BookingClientWrapper";

export default async function MentorDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const mentorData = await getMentorById(id);

  if (!mentorData?.success) {
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load mentor information.
      </div>
    );
  }

  const mentor = mentorData.data;
  console.log(mentor);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* ======= TOP SECTION ======= */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white p-6 rounded-xl shadow-sm border">
        {/* Avatar */}
        <Image
          src={mentor.profile?.avatarUrl || "/placeholder-avatar.png"}
          alt="Avatar"
          width={200}
          height={200}
          className="w-48 h-48 object-cover rounded-xl shadow-md"
        />

        {/* Basic Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            {mentor.name}
            <BadgeCheck className="text-blue-600 w-6 h-6" />
          </h1>

          <p className="text-gray-600 mt-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {mentor.profile?.city}, {mentor.profile?.country}
          </p>

          <p className="text-gray-700 mt-4 text-lg leading-relaxed">
            {mentor.profile?.bio}
          </p>

          <div className="mt-6 flex items-center justify-start gap-6">
            <div>
              <p className="text-gray-500 text-sm">Hourly Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                ${mentor.profile?.hourlyRate}/hr
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Experience</p>
              <p className="text-xl font-semibold flex items-center gap-1">
                <Briefcase className="w-5 h-5" />
                {mentor.profile?.experience || 0} yrs
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Expertise Level</p>
              <p className="capitalize font-semibold">
                {mentor.profile?.expertise?.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Phone */}
          {mentor.profile?.phone && (
            <p className="mt-4 flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              {mentor.profile.phone}
            </p>
          )}

          {/* Email */}
          {mentor.email && (
            <p className="mt-2 flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4" />
              {mentor.email}
            </p>
          )}
        </div>
      </div>

      {/* ======= SKILLS ======= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {mentor.profile?.skills?.map((skill: any) => (
            <span
              key={skill.id}
              className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium"
            >
              {skill.title}
            </span>
          ))}
        </div>
      </section>

      {/* ======= INTERESTS ======= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Interests</h2>
        <div className="flex flex-wrap gap-3">
          {mentor.profile?.interests?.map((interest: string) => (
            <span
              key={interest}
              className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* ======= LANGUAGES ======= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        <div className="flex flex-wrap gap-3">
          {mentor.profile?.languages?.map((lang: string) => (
            <span
              key={lang}
              className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* ======= CONTACT & BOOKING ======= */}
      <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Book a Session?</h2>
        <p className="text-lg opacity-90 mb-6">
          Connect with {mentor.name} and accelerate your growth.
        </p>

        <BookingClientWrapper mentor={mentor} />
      </div>
    </div>
  );
}
