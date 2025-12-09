import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import samplePhoto from "../../../assets/images/Profile.jpg";

const testimonials = [
  {
    name: "Md. Shamim",
    role: "Mentor",
    image: samplePhoto,
    quote:
      "Sharing my skills here has been rewarding. The platform makes it easy to connect with learners and manage sessions seamlessly.",
    rating: 5,
  },
  {
    name: "Jane Cooper",
    role: "User",
    image: samplePhoto,
    quote:
      "I learned a lot from my mentor. The sessions were structured, interactive, and I could track my progress easily.",
    rating: 5,
  },
  {
    name: "Wade Warren",
    role: "User",
    image: samplePhoto,
    quote:
      "Excellent experience! The mentors are knowledgeable and the platform provides all the tools needed for learning effectively.",
    rating: 5,
  },
];

const UserTestimonials = () => {
  return (
    <section className="bg-card py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mt-4">
            Hear from our mentors and learners about their experiences on the
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-background relative">
              <CardContent className="p-8">
                <Quote
                  className="absolute top-4 left-4 text-primary"
                  size={48}
                />
                <div className="relative z-10">
                  <p className="text-muted-foreground mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="font-bold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-yellow-400 fill-current"
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
