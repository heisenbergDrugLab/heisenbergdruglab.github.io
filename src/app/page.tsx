import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ServiceDetails from "@/components/sections/ServiceDetails";
import WhyUs from "@/components/sections/WhyUs";
import BlogSection from "@/components/sections/BlogSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ServiceDetails />
      {/* <WhyUs /> */}
      <BlogSection />
      <Footer />
    </main>
  );
}
