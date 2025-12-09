/* eslint-disable @typescript-eslint/no-explicit-any */
import MentorCard from "@/components/ui/MentorCard";

export default async function TopRatedMentors() {
  const res = await fetch(
    "http://localhost:5000/api/v1/user/top-rated-mentors",
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data: mentors } = await res.json();
  console.log(mentors);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900">
          Our Top Rated Mentors
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          Learn from highly experienced & verified mentors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">
          {mentors?.slice(0, 6).map((mentor: any, i: number) => (
            <MentorCard key={mentor.id} mentor={mentor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
