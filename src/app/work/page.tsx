'use client';

import { useState } from 'react';
import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";
import ProjectModal from "@/components/ui/ProjectModal";
import GridDistortion from "@/components/ui/GridDistortion";
import WorkAnimation from "@/components/ui/WorkAnimation";

const allWork = [
  // Row 1: Web 1 (Big) + Graphic 1 (Small)
  {
    title: "G Selva Portfolio",
    category: "Web Development",
    year: "2025",
    image: "/assets/works/web-1a.webp",
    images: ["/assets/works/web-1a.webp", "/assets/works/web-1b.webp", "/assets/works/web-1c.webp", "/assets/works/web-1d.webp"],
    client: "CTO of Voxel",
    description: "A sleek and modern AI/ML engineer portfolio featuring dynamic animations, glassmorphism design, and interactive elements. Built with performance and visual impact in mind.",
    tools: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://selva-aiworks.github.io"
  },
  {
    title: "New Trends Style Poster",
    category: "Graphic Design",
    year: "2025",
    image: "/assets/works/graphic-1.webp",
    client: "Style Magazine",
    description: "Fashion editorial poster design featuring bold typographic treatments and modern azure blue color palette. Created layered text effects with contemporary model photography for Quiet Luxury fashion campaign.",
    tools: ["Photoshop", "Illustrator", "Figma"],
    link: "#"
  },
  // Row 2: Graphic 2 (Small) + Web 2 (Big - Video)
  {
    title: "CALYX Clarifying Shampoo",
    category: "Graphic Design",
    year: "2025",
    image: "/assets/works/graphic-2.webp",
    client: "CALYX Professional",
    description: "Eye-catching product advertisement for CALYX's Clarifying Shampoo line. Designed bold neon-lime visuals with dynamic diagonal ribbon elements showcasing the keratin treatment preparation formula.",
    tools: ["Photoshop", "Illustrator", "Figma"],
    link: "#"
  },
  {
    title: "Sharan Raj Portfolio",
    category: "Web Development",
    year: "2025",
    image: "/assets/works/web-2-trimmed.webm",
    video: "/assets/works/web-2-trimmed.webm",
    client: "CEO of Voxel",
    description: "A stunning developer portfolio with smooth animations, modern design aesthetics, and seamless user experience. Showcases professional work with elegant transitions and interactive components.",
    tools: ["Next.js", "React", "TypeScript", "Framer Motion"],
    link: "https://sharan-raj-ai.github.io/"
  },
  // Row 3: Web 3 (Big) + Graphic 3 (Small)
  {
    title: "Traimba Cold Pressed Oil",
    category: "Web Development",
    year: "2024",
    image: "/assets/works/web-3a.webp",
    images: ["/assets/works/web-3a.webp", "/assets/works/web-3b.webp", "/assets/works/web-3c.webp", "/assets/works/web-3d.webp"],
    client: "Traimba Home Made",
    description: "A warm and inviting e-commerce website for premium cold-pressed oils. Features clean product showcase, easy navigation, and trust-building design elements for organic food products.",
    tools: ["WordPress", "WooCommerce", "Elementor"],
    link: "https://traimba.com/"
  },
  {
    title: "Dove Hair Care Campaign",
    category: "Graphic Design",
    year: "2025",
    image: "/assets/works/graphic-3.webp",
    client: "Dove Nutritive Solutions",
    description: "Premium product advertisement design for Dove's Hair Fall Rescue line. Created nature-inspired visuals emphasizing eco-friendly brand values with fresh green aesthetics and clean layout composition.",
    tools: ["Photoshop", "Illustrator", "Canva"],
    link: "#"
  },
  // Row 4: Graphic 4 (Small) + Web 4 (Big)
  {
    title: "Food Gaadi Social Media",
    category: "Graphic Design",
    year: "2025",
    image: "/assets/works/graphic-4.webp",
    client: "Food Gaadi",
    description: "Mouth-watering social media promotional graphics for quick-service restaurant. Designed vibrant food photography compositions with energetic lime-green branding and appetizing visual hierarchy.",
    tools: ["Canva", "Photoshop", "Figma"],
    link: "#"
  },
  {
    title: "Geovora Fresh Produce",
    category: "Web Development",
    year: "2024",
    image: "/assets/works/web-4a.webp",
    images: ["/assets/works/web-4a.webp", "/assets/works/web-4b.webp", "/assets/works/web-4c.webp", "/assets/works/web-4d.webp"],
    client: "Geovora",
    description: "A vibrant e-commerce platform for fresh fruits and vegetables. Features appetizing product imagery, category-based navigation, and a seamless shopping experience for health-conscious consumers.",
    tools: ["WordPress", "WooCommerce", "Elementor"],
    link: "https://geovora.in/"
  }
];

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<typeof allWork[0] | null>(null);

  return (
    <main className="bg-black-void min-h-screen">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <Section className="pt-32 pb-0">
        <h1 className="text-6xl md:text-9xl font-bold font-display text-white uppercase tracking-tighter mb-8">
          Selected Work
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mb-20">
          A curated collection of projects that push the boundaries of design and technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allWork.map((work, index) => {
            // Web Development = Big Card (2 cols), Graphic Design = Small Card (1 col)
            const isBig = work.category === "Web Development";

            return (
              <motion.div
                key={index}
                layoutId={`project-${index}`}
                onClick={() => setSelectedProject(work)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl ${isBig ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
              >
                <div className={`w-full h-full overflow-hidden ${isBig ? 'aspect-[8/5]' : 'aspect-[4/5]'
                  }`}>
                  {'video' in work && work.video ? (
                    <video
                      src={work.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  ) : (
                    <GridDistortion
                      imageSrc={work.image}
                      grid={10}
                      mouse={0.12}
                      strength={0.15}
                      relaxation={0.9}
                      className="w-full h-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black-void via-black-void/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="mb-2 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold-electric">
                        <span>{work.category}</span>
                        <span className="h-1 w-1 rounded-full bg-current" />
                        <span>{work.year}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white transition-colors group-hover:text-gold-electric font-display">{work.title}</h3>
                    </div>
                    {work.category === "Web Development" && (
                      <div className="hidden md:block">
                        <span className="inline-block rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white transition-colors group-hover:bg-gold-electric group-hover:text-black-void group-hover:border-transparent">View Case</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-0">
          <WorkAnimation />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
