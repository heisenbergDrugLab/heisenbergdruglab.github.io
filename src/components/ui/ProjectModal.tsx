'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoArrowForward, IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  images?: string[];
  video?: string;
  client: string;
  description: string;
  tools: string[];
  link: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  const hasGallery = project?.images && project.images.length > 1;
  const hasVideo = project?.video;

  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60] flex justify-center items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Scrollable Container Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative z-[70] h-[90vh] w-[95vw] overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl flex flex-col ${project.category === 'Graphic Design' ? 'max-w-6xl md:flex-row' : 'max-w-5xl'
              }`}
          >
            {/* Header / Left Side Media */}
            <div className={`relative flex-shrink-0 bg-black ${project.category === 'Graphic Design'
              ? 'h-64 w-full md:h-full md:w-1/2'
              : 'h-[50vh] md:h-[50vh] w-full'
              }`}>

              {/* Video Player */}
              {hasVideo ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                /* Image Gallery */
                <>
                  <img
                    src={project.images?.[currentImageIndex] || project.image}
                    alt={project.title}
                    className="w-full h-full object-contain bg-black"
                  />

                  {/* Gallery Navigation Arrows */}
                  {hasGallery && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-gold-electric hover:text-black-void z-10"
                      >
                        <IoChevronBack className="text-xl" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-16 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-gold-electric hover:text-black-void z-10"
                      >
                        <IoChevronForward className="text-xl" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-4 py-1 text-white text-sm">
                        {currentImageIndex + 1} / {project.images!.length}
                      </div>
                    </>
                  )}
                </>
              )}

              <button
                onClick={onClose}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-gold-electric hover:text-black-void z-10"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div
              className={`flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar ${project.category === 'Graphic Design' ? 'md:w-1/2' : ''
                }`}
              data-lenis-prevent
            >
              <div className="mb-8">
                <span className="text-gold-electric uppercase tracking-widest text-xs font-bold">{project.category} — {project.year}</span>
                <h2 className="mt-2 text-4xl font-bold text-white font-display uppercase tracking-tight md:text-5xl">{project.title}</h2>
              </div>

              {/* Gallery Thumbnails for Web Projects */}
              {hasGallery && project.category === 'Web Development' && (
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                  {project.images!.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-gold-electric' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className={`grid gap-12 ${project.category === 'Graphic Design' ? 'grid-cols-1' : 'md:grid-cols-[2fr,1fr]'}`}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-3">About Project</h3>
                    <p className="text-lg text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-3">Tools Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map(tool => (
                        <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`space-y-8 rounded-2xl bg-black-void/50 p-6 border border-white/5 h-fit ${project.category === 'Graphic Design' ? 'mt-4' : ''}`}>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Client</h3>
                      <p className="text-white">{project.client}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Service</h3>
                      <p className="text-white">{project.category}</p>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Year</h3>
                      <p className="text-white">{project.year}</p>
                    </div>
                  </div>

                  {project.category === "Web Development" && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-bold uppercase tracking-widest text-black-void transition-colors hover:bg-gold-electric mt-4"
                    >
                      <span>Visit Project</span>
                      <IoArrowForward />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
