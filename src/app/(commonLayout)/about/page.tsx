import Image from "next/image";
import { Users, Target, ShieldCheck, Sparkles } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-background">
      {/* ---------------- HERO ---------------- */}
      <section className="relative bg-linear-to-br from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Empowering Learning Through Mentorship
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            SkillSwap connects learners with experienced mentors to share
            real-world skills, accelerate growth, and build meaningful
            professional relationships.
          </p>
        </div>
      </section>

      {/* ---------------- MISSION ---------------- */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe learning should be practical, accessible, and driven by
              real experience. SkillSwap was built to break the barriers of
              traditional education by enabling direct skill-to-skill knowledge
              exchange between mentors and learners.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you are advancing your career, switching fields, or
              sharing your expertise, SkillSwap empowers you to grow together.
            </p>
          </div>

          <div className="relative h-64 md:h-80">
            <Image
              src="https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Mentorship"
              fill
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ---------------- VALUES ---------------- */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-semibold">
            Our Core Values
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={<Users />}
              title="Community First"
              description="Learning thrives in strong, supportive communities built on trust and collaboration."
            />
            <ValueCard
              icon={<Target />}
              title="Practical Learning"
              description="We focus on real-world skills that create measurable impact and growth."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Trust & Safety"
              description="Verified profiles, secure payments, and transparent interactions."
            />
            <ValueCard
              icon={<Sparkles />}
              title="Continuous Growth"
              description="We evolve constantly to support lifelong learning."
            />
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-semibold">
          How SkillSwap Works
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Step
            step="01"
            title="Discover Mentors"
            description="Browse verified mentors by skill, category, or expertise."
          />
          <Step
            step="02"
            title="Book Sessions"
            description="Schedule one-on-one sessions that fit your goals and availability."
          />
          <Step
            step="03"
            title="Learn & Grow"
            description="Gain hands-on knowledge and apply it immediately."
          />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold">
            Join a Community Built on Knowledge Sharing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Whether you want to learn or mentor, SkillSwap gives you the tools
            to succeed.
          </p>
        </div>
      </section>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const ValueCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="rounded-2xl bg-background p-6 text-center shadow-sm transition hover:shadow-md">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);

const Step = ({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) => (
  <div className="rounded-2xl border p-6 text-center">
    <span className="text-sm font-semibold text-blue-600">{step}</span>
    <h3 className="mt-2 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);

export default AboutPage;
