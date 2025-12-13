import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="bg-background">
      {/* ---------------- HERO ---------------- */}
      <section className="bg-linear-to-br from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Have questions, feedback, or partnership ideas?
            We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* ---------------- CONTACT CONTENT ---------------- */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* -------- Contact Info -------- */}
          <div>
            <h2 className="text-3xl font-semibold">
              Contact Information
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Reach out to our team anytime. We typically respond within
              24–48 business hours.
            </p>

            <div className="mt-8 space-y-6">
              <InfoItem
                icon={<Mail />}
                title="Email"
                value="support@skillswap.com"
              />
              <InfoItem
                icon={<Phone />}
                title="Phone"
                value="+880 1234 567 890"
              />
              <InfoItem
                icon={<MapPin />}
                title="Location"
                value="Dhaka, Bangladesh"
              />
            </div>
          </div>

          {/* -------- Contact Form -------- */}
          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Send Us a Message
            </h3>

            <form className="mt-6 space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input placeholder="Subject" />
              <Textarea
                placeholder="Write your message here..."
                rows={5}
              />

              <Button className="w-full flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER CTA ---------------- */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">
            Let’s Build Knowledge Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            SkillSwap is built for learners and mentors who believe in
            growth through collaboration.
          </p>
        </div>
      </section>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const InfoItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
      {icon}
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);

export default ContactPage;
