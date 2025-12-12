import Hero from "@/components/modules/Home/Hero";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedMentors from "@/components/modules/Home/TopRatedMentors";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MentorHub - Growth Your Skills</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        {/* <Specialities /> */}
        <TopRatedMentors />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}
