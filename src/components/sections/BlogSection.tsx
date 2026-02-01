'use client';

import Section from '../ui/Section';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TransitionLink from '../ui/TransitionLink';
import GridDistortion from '../ui/GridDistortion';

const projects = [
  {
    title: "G Selva Portfolio",
    category: "Web Development",
    year: "2025",
    image: "/assets/works/web-1a.webp",
    cols: "md:col-span-2",
    aspect: "aspect-[16/9]"
  },
  {
    title: "Dove Hair Care Campaign",
    category: "Graphic Design",
    year: "2025",
    image: "/assets/works/graphic-3.webp",
    cols: "md:col-span-1",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Sharan Raj Portfolio",
    category: "Web Development",
    year: "2025",
    image: "/assets/works/web-2-trimmed.webm",
    cols: "md:col-span-3",
    aspect: "aspect-[21/9]",
    isVideo: true
  },
];

export default function KeyProjects() {
  return (
    <Section id="projects" className="bg-black-void">
      <div className="mb-10 md:mb-20 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-white md:text-6xl font-display">
            Key Projects
          </h2>
          <div className="mt-4 h-1 w-24 bg-gold-electric" />
        </div>
        <Link href="/work">
          <button className="hidden text-sm uppercase tracking-widest text-white transition-colors hover:text-gold-electric md:block">
            View All Work
          </button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, index) => (
          <Link href="/work" key={index} className={`block ${project.cols}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className={`w-full overflow-hidden ${project.aspect}`}>
                {'isVideo' in project && project.isVideo ? (
                  <video
                    src={project.image}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLVideoElement).pause();
                      (e.currentTarget as HTMLVideoElement).currentTime = 0;
                    }}
                  />
                ) : (
                  <GridDistortion
                    imageSrc={project.image}
                    grid={10}
                    mouse={0.12}
                    strength={0.15}
                    relaxation={0.9}
                    className="w-full h-full"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black-void via-black-void/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />
              </div>

              <div className="absolute bottom-0 left-0 p-8">
                <div className="mb-2 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold-electric">
                  <span>{project.category}</span>
                  <span className="h-1 w-1 rounded-full bg-current" />
                  <span>{project.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-gold-electric font-display">{project.title}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="mt-8 md:mt-12 flex justify-center md:hidden">
        <Link href="/work">
          <button className="text-sm uppercase tracking-widest text-white transition-colors hover:text-gold-electric">
            View All Work
          </button>
        </Link>
      </div>
    </Section>
  );
}
