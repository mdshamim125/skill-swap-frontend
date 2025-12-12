/* eslint-disable @typescript-eslint/no-explicit-any */

import { getMentorById } from "@/services/mentor/mentor";
import Image from "next/image";
import { MapPin, Phone, BadgeCheck, Briefcase, Mail, Star } from "lucide-react";
import BookingClientWrapper from "@/components/modules/booking/BookingClientWrapper";
import ReviewForm from "@/components/modules/reviews/ReviewForm";
import ReviewList from "@/components/modules/reviews/ReviewList";

export default async function MentorDetails({ params }: any) {
  const resolved = await params;
  const id = resolved?.value?.id;

  console.log("FINAL ID:", id);

  console.log("params:", params, "id:", id);

  const mentorData = await getMentorById(id);
  console.log(id, mentorData);

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
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* ================================================================== */}
      {/*                           TOP SECTION                              */}
      {/* ================================================================== */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white p-6 rounded-2xl shadow-md border">
        {/* Avatar */}
        <Image
          src={
            mentor?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Mentor Avatar"
          width={220}
          height={220}
          className="w-48 h-48 object-cover rounded-2xl shadow-sm"
        />

        {/* Basic Info */}
        <div className="flex-1 space-y-3">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            {mentor.name}
            <BadgeCheck className="text-blue-600 w-6 h-6" />
          </h1>

          <p className="text-gray-600 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {mentor.profile?.city}, {mentor.profile?.country}
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            {mentor.profile?.bio}
          </p>

          {/* Pricing / Experience / Level */}
          <div className="mt-6 flex flex-wrap gap-10 items-center">
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
            <p className="mt-2 flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              {mentor.profile.phone}
            </p>
          )}

          {/* Email */}
          {mentor.email && (
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4" />
              {mentor.email}
            </p>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/*                 SKILLS • INTERESTS • LANGUAGES • BOOKING           */}
      {/* ================================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {/* ======================= SKILLS ======================= */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
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

        {/* ======================= INTERESTS ======================= */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
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

        {/* ======================= LANGUAGES ======================= */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
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
      </div>

      {/* ======================= BOOKING CARD spans full width ======================= */}
      <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Book a Session?</h2>
        <p className="text-lg opacity-90 mb-6">
          Connect with {mentor.name} and accelerate your growth.
        </p>

        <BookingClientWrapper mentor={mentor} />
      </div>

      {/* ================================================================== */}
      {/*                         REVIEW SECTION                              */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          Reviews
          <Star className="text-yellow-500 w-7 h-7" />
        </h2>

        {/* Review Form */}
        <ReviewForm mentorId={mentor.id} />

        {/* Review List */}
        <ReviewList reviews={mentor.reviewsReceived || []} />
      </section>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { getMentorById } from "@/services/mentor/mentor";
// import Image from "next/image";
// import { MapPin, Phone, BadgeCheck, Briefcase, Mail } from "lucide-react";
// import BookingClientWrapper from "@/components/modules/booking/BookingClientWrapper";

// export default async function MentorDetails({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;
//   const mentorData = await getMentorById(id);

//   if (!mentorData?.success) {
//     return (
//       <div className="p-10 text-center text-red-600">
//         Failed to load mentor information.
//       </div>
//     );
//   }

//   const mentor = mentorData.data;
//   console.log(mentor);

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">
//       {/* ======= TOP SECTION ======= */}
//       <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white p-6 rounded-xl shadow-sm border">
//         {/* Avatar */}
//         <Image
//           src={
//             mentor?.avatar ||
//             "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/480289536_1394443704855366_8149698206212697807_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=qGBu1L4WH44Q7kNvwHPYdLK&_nc_oc=Adm_t78VWRncVfXaBjTyjLRoNu-2VRvzO3nKKf31ybgB7_GLsXhnpI5pIdnzca-CZ7g&_nc_zt=23&_nc_ht=scontent.fdac31-1.fna&_nc_gid=Xpq5zQCatw-tCTGjl9uhVA&oh=00_Afm-GkYBPtK1UnR4W8Rx5rm1kYTq1awThlsJEbeMuf4pLw&oe=693C5712"
//           }
//           alt="Avatar"
//           width={200}
//           height={200}
//           className="w-48 h-48 object-cover rounded-xl shadow-md"
//         />

//         {/* Basic Info */}
//         <div className="flex-1">
//           <h1 className="text-4xl font-bold flex items-center gap-2">
//             {mentor.name}
//             <BadgeCheck className="text-blue-600 w-6 h-6" />
//           </h1>

//           <p className="text-gray-600 mt-1 flex items-center gap-1">
//             <MapPin className="w-4 h-4" />
//             {mentor.profile?.city}, {mentor.profile?.country}
//           </p>

//           <p className="text-gray-700 mt-4 text-lg leading-relaxed">
//             {mentor.profile?.bio}
//           </p>

//           <div className="mt-6 flex items-center justify-start gap-6">
//             <div>
//               <p className="text-gray-500 text-sm">Hourly Rate</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 ${mentor.profile?.hourlyRate}/hr
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-500 text-sm">Experience</p>
//               <p className="text-xl font-semibold flex items-center gap-1">
//                 <Briefcase className="w-5 h-5" />
//                 {mentor.profile?.experience || 0} yrs
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-500 text-sm">Expertise Level</p>
//               <p className="capitalize font-semibold">
//                 {mentor.profile?.expertise?.toLowerCase()}
//               </p>
//             </div>
//           </div>

//           {/* Phone */}
//           {mentor.profile?.phone && (
//             <p className="mt-4 flex items-center gap-2 text-gray-700">
//               <Phone className="w-4 h-4" />
//               {mentor.profile.phone}
//             </p>
//           )}

//           {/* Email */}
//           {mentor.email && (
//             <p className="mt-2 flex items-center gap-2 text-gray-700">
//               <Mail className="w-4 h-4" />
//               {mentor.email}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ======= SKILLS ======= */}
//       <section>
//         <h2 className="text-2xl font-bold mb-4">Skills</h2>
//         <div className="flex flex-wrap gap-3">
//           {mentor.profile?.skills?.map((skill: any) => (
//             <span
//               key={skill.id}
//               className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium"
//             >
//               {skill.title}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* ======= INTERESTS ======= */}
//       <section>
//         <h2 className="text-2xl font-bold mb-4">Interests</h2>
//         <div className="flex flex-wrap gap-3">
//           {mentor.profile?.interests?.map((interest: string) => (
//             <span
//               key={interest}
//               className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm font-medium"
//             >
//               {interest}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* ======= LANGUAGES ======= */}
//       <section>
//         <h2 className="text-2xl font-bold mb-4">Languages</h2>
//         <div className="flex flex-wrap gap-3">
//           {mentor.profile?.languages?.map((lang: string) => (
//             <span
//               key={lang}
//               className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium"
//             >
//               {lang}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* ======= CONTACT & BOOKING ======= */}
//       <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
//         <h2 className="text-3xl font-bold mb-4">Ready to Book a Session?</h2>
//         <p className="text-lg opacity-90 mb-6">
//           Connect with {mentor.name} and accelerate your growth.
//         </p>

//         <BookingClientWrapper mentor={mentor} />
//       </div>
//     </div>
//   );
// }
