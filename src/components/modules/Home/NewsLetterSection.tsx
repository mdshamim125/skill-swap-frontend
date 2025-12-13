// components/sections/NewsletterSection.tsx

import { Mail, Check } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-indigo-700 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-white/90">
              SkillSwap Newsletter
            </span>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Learn Faster. <br className="hidden sm:block" />
              Grow Smarter.
            </h2>

            <p className="mt-5 max-w-xl text-base text-white/90">
              Get expert mentorship insights, newly launched skills, exclusive
              mentor highlights, and platform updates — curated and delivered
              straight to your inbox.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-white" />
                Weekly curated learning resources
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-white" />
                Early access to top mentors
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-white" />
                Community insights & success stories
              </li>
            </ul>
          </div>

          {/* Right Form */}
          <div className="relative rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-semibold text-gray-900">
              Stay in the loop
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              No spam. Unsubscribe anytime.
            </p>

            <form className="mt-6 space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40"
              >
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Blurs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
    </section>
  );
};

export default NewsletterSection;
