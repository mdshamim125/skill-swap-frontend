import Link from "next/link";
import { Animate } from "../../ui/Animate";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center bg-linear-to-br from-blue-50 via-indigo-50 to-indigo-100">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <Animate
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Unlock Growth Through{" "}
              <span className="text-indigo-600">Skill Exchange</span>
            </h1>
          </Animate>

          <Animate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <p className="mt-6 text-xl text-gray-700 leading-relaxed max-w-2xl">
              MentorHub connects learners and experts through real-time
              mentorship, collaborative learning, and personalized guidance.
              Improve skills, share knowledge, and grow together.
            </p>
          </Animate>

          <Animate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="mt-10 flex flex-wrap gap-5">
              <Link href="/find-mentor">
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-medium shadow-lg hover:bg-indigo-700 hover:shadow-xl transition">
                  Find a Mentor
                </button>
              </Link>

              <Link href="/become-mentor">
                <button className="px-8 py-4 bg-white text-gray-800 rounded-xl text-lg font-medium shadow-md hover:bg-gray-100 transition">
                  Become a Mentor
                </button>
              </Link>
            </div>
          </Animate>
        </div>

        {/* Decorative Gradient Blobs */}
        <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-indigo-300 opacity-20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-300 opacity-20 blur-3xl rounded-full pointer-events-none" />
      </div>
    </section>
  );
}
