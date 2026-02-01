'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../ui/Section';
import NextImage from 'next/image';
import GridDistortion from '../ui/GridDistortion';

const serviceDetails = [
  {
    title: "Web Development",
    subtitle: "Digital Solutions",
    image: "/assets/services/details-web-dev.webp",
    para1: "We craft <span class='text-gold-electric font-bold'>powerful digital solutions</span> tailored to your unique business needs. Whether you need a content-rich WordPress site or a fully custom-coded application, we deliver solutions that combine functionality with stunning design.",
    para2: "From <span class='text-gold-electric font-bold'>WordPress customization</span> to cutting-edge Next.js applications, our development approach ensures your website is fast, secure, and scalable. We build e-commerce platforms, business websites, and web applications that drive results and grow with your business."
  },
  {
    title: "Graphic Design",
    subtitle: "Visual Identity",
    image: "/assets/services/details-design.webp",
    para1: "We design visually strong and <span class='text-gold-electric font-bold'>consistent brand assets</span> that communicate clearly and leave a lasting impression. Our solutions are crafted to enhance brand identity across all platforms.",
    para2: "From <span class='text-gold-electric font-bold'>logos and marketing materials</span> to social media creatives and digital assets, we ensure your brand stands out and resonates with your audience. Our graphic design work is about more than just aesthetics; it's about clarity and impact."
  },
  {
    title: "SEO",
    subtitle: "Search Authority",
    image: "/assets/services/details-seo-v2.webp",
    para1: "Visibility is the currency of the digital age. We cut through the noise to amplify your <span class='text-gold-electric font-bold'>unique signal</span>. Our data-driven strategies go beyond vanity metrics, focusing on building sustainable organic traffic that converts.",
    para2: "We engineer <span class='text-gold-electric font-bold'>discoverability</span>. By optimizing site architecture, speed, and semantic relevance, we ensure that when your customers ask a question, you are the answer. Dominating the search results isn't luck; it's a calculated science."
  },
  {
    title: "Hosting & Domain Management",
    subtitle: "Infrastructure Solutions",
    image: "/assets/services/details-hosting-v2.webp",
    para1: "We handle the <span class='text-gold-electric font-bold'>complete lifecycle</span> of your online presence, from purchasing the perfect domain to setting up robust hosting infrastructure. Our comprehensive service includes domain registration, hosting procurement, server configuration, and seamless website migrations.",
    para2: "Your digital foundation deserves <span class='text-gold-electric font-bold'>expert care</span>. We manage SSL certificates, ensure optimal server performance, and handle all technical aspects of keeping your site secure and accessible. Whether you're launching a new site or migrating an existing one, we make the process smooth and worry-free."
  }
];

function ServiceDetailCard({ service, index }: { service: typeof serviceDetails[0], index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex min-h-[70vh] md:min-h-screen w-full items-center py-8 md:py-20 group/card">
      <div className={`mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-12 px-6 md:flex-row md:items-center md:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2">
          {/* Ambassador Glow - Consistent across all items */}
          <div className="absolute -inset-10 bg-gold-electric/20 rounded-full blur-[80px] opacity-20 group-hover/card:opacity-40 transition-opacity duration-700" />

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl md:aspect-[4/5] shadow-2xl shadow-gold-electric/10 border border-white/10 group-hover/card:border-gold-electric/30 transition-colors duration-500">
            <GridDistortion
              imageSrc={service.image}
              grid={12}
              mouse={0.15}
              strength={0.2}
              relaxation={0.9}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-gold-electric px-2">{service.subtitle}</span>
            <h3 className="mt-4 text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-white font-display leading-[0.9] px-2">{service.title}</h3>

            <div className="mt-6 md:mt-10 space-y-4 md:space-y-6">
              <p className="text-lg font-light leading-relaxed text-neutral-300 md:text-xl" dangerouslySetInnerHTML={{ __html: service.para1 }} />
              <p className="text-lg font-light leading-relaxed text-neutral-300 md:text-xl" dangerouslySetInnerHTML={{ __html: service.para2 }} />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default function ServiceDetails() {
  return (
    <Section id="service-details" className="bg-black-void relative z-10">
      {serviceDetails.map((service, index) => (
        <ServiceDetailCard key={index} service={service} index={index} />
      ))}
    </Section>
  );
}
