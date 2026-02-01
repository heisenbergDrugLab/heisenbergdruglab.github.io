'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../ui/Section';
import NextImage from 'next/image';

const projects = [
  {
    title: "Neon Horizon",
    category: "Digital Experiences",
    year: "2024",
    description: "A futuristic e-commerce platform for high-end streetwear.",
    // Abstract Neon City/Structure
    image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Zenith Banking",
    category: "Mobile Solutions",
    year: "2023",
    description: "The next generation of mobile banking with AI-driven insights.",
    // Abstract Blue/Black Tech
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Cyber Aesthetics",
    category: "Branding",
    year: "2024",
    description: "Complete brand identity for a leading cybersecurity firm.",
    // Abstract Gold/Dark Texture
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div ref={ref} className="group relative flex min-h-[60vh] md:min-h-[80vh] w-full flex-col items-center justify-center py-10 md:py-32">
      <div className="relative w-full max-w-6xl">
        {/* Image Container with Parallax */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:aspect-[2/1] border border-white/10 group-hover:border-gold-electric/30 transition-colors duration-500">
          {/* Safe parallax container */}
          <motion.div style={{ y }} className="absolute -top-[20%] left-0 h-[140%] w-full">
            {/* Optimized Next.js Image */}
            <div className="relative h-full w-full bg-slate-900">
              <NextImage
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-20" />
        </div>

        {/* Content Overlay */}
        <div className="absolute -bottom-10 left-6 z-10 w-full md:bottom-10 md:left-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 text-gold-electric">
              <span className="text-sm uppercase tracking-widest">{project.category}</span>
              <span className="h-px w-10 bg-gold-electric" />
              <span className="text-sm uppercase tracking-widest">{project.year}</span>
            </div>
            <h3 className="mt-2 text-5xl font-bold uppercase text-white md:text-8xl font-display">{project.title}</h3>
            <p className="mt-4 max-w-xl text-lg text-white/80 md:text-xl font-light">{project.description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


export default function Portfolio() {
  return (
    <Section id="work" className="bg-black-void">
      <div className="mb-10 md:mb-20">
        <h2 className="text-4xl font-bold uppercase tracking-tighter text-white md:text-6xl font-display">
          Selected Work
        </h2>
        <div className="mt-4 h-1 w-24 bg-gold-electric" />
      </div>

      <div className="flex flex-col gap-6 md:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 md:mt-20 flex justify-center">
        <button className="rounded-full border border-white/20 px-10 py-4 text-sm uppercase tracking-widest text-white transition-all hover:bg-gold-electric hover:text-black-void">
          View All Projects
        </button>
      </div>
    </Section>
  );
}
