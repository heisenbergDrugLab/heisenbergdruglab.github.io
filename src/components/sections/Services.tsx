'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, useAnimation } from 'framer-motion';
import TransitionLink from '../ui/TransitionLink';
import Section from '../ui/Section';
import NextImage from 'next/image';
import GridDistortion from '../ui/GridDistortion';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Website Building",
    subtitle: "Digital Solutions",
    description: "Custom websites and applications tailored to your business needs. From elegant WordPress sites to cutting-edge React applications, we build digital experiences that convert visitors into customers. Every line of code is crafted for performance, scalability, and user delight.",
    image: "/assets/services/web-dev-v2.webp",
    offerings: [
      "WordPress Development",
      "Custom Coded Solutions",
      "Next.js & React Applications",
      "E-commerce Platforms"
    ]
  },
  {
    title: "Graphic Design",
    subtitle: "Visual Identity",
    description: "We design visually strong and consistent brand assets that communicate clearly and leave a lasting impression. Our graphic design solutions are crafted to enhance brand identity across all platforms.",
    image: "/assets/services/ui-ux-design-card.webp",
    offerings: [
      "Logo & brand identity design",
      "Social media & digital creatives",
      "Marketing & promotional materials",
      "Posters, banners & ad designs"
    ]
  },
  {
    title: "SEO",
    subtitle: "Search Authority",
    description: "Data-driven strategies to dominate search results and drive targeted traffic. We engineer your digital visibility through technical excellence and content optimization. Watch your rankings soar as we transform your website into a lead-generating machine that works 24/7.",
    image: "/assets/services/seo.webp",
    offerings: [
      "Technical SEO Audits",
      "Keyword Strategy & Research",
      "Content Optimization",
      "Backlink Profile Management"
    ]
  },
  {
    title: "Hosting & Domain Management",
    subtitle: "Infrastructure Solutions",
    description: "Complete hosting and domain services from purchase to ongoing management. We handle the technical complexities so you don't have to. From securing the perfect domain to ensuring lightning-fast load times. Your digital foundation, expertly managed and always secure.",
    image: "/assets/services/hosting.webp",
    offerings: [
      "Domain & Hosting Purchase",
      "Server Setup & Configuration",
      "Website Migration Services",
      "SSL & Security Management"
    ]
  }
];

// Separate component to handle individual card state
const ServiceCard = ({
  service,
  totalPanels,
  disable3D = false,
  onFlipChange
}: {
  service: typeof services[0],
  totalPanels: number,
  disable3D?: boolean,
  onFlipChange?: (isFlipped: boolean) => void
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const widthPercentage = 100 / totalPanels;

  const toggleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    if (onFlipChange) onFlipChange(nextFlipped);
  };

  return (
    <div
      className="service-card flex h-full flex-shrink-0 items-center justify-center p-4 md:p-6"
      style={{ width: `${widthPercentage}%` }}
      onClick={() => {
        if (disable3D) toggleFlip(); // Only allow flip on mobile via card click
      }}
    >
      <div
        className="group relative h-full w-full max-w-lg [perspective:1000px]"
        onMouseLeave={() => !disable3D && setIsFlipped(false)}
      >
        <motion.div
          className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] grid place-items-stretch ${isFlipped ? '[transform:rotateY(180deg)]' : 'md:group-hover:[transform:rotateY(180deg)]'}`}
        >
          {/* Front Face */}
          <div className="col-start-1 row-start-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-dark [backface-visibility:hidden] flex flex-col justify-end relative min-h-[400px]">
            <div className="absolute inset-0 h-full w-full z-0">
              {disable3D ? (
                <div className="absolute inset-0 h-full w-full bg-black-void">
                  <NextImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 85vw, 30vw"
                    priority={totalPanels === 1} // Priority for mobile
                  />
                </div>
              ) : (
                <GridDistortion
                  imageSrc={service.image}
                  grid={10}
                  mouse={0.12}
                  strength={0.15}
                  relaxation={0.9}
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black-void via-black-void/50 to-transparent opacity-90 pointer-events-none z-0" />

            <div className="relative z-10 p-6 md:p-8 pt-40 pointer-events-none">
              <div className="mb-4 h-1 w-12 bg-gold-electric" />
              <h3 className="text-3xl md:text-4xl font-bold text-white font-display uppercase leading-none">{service.title}</h3>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/70">{service.subtitle}</p>
              <button
                className="mt-6 flex items-center gap-2 text-gold-electric group-hover:text-white transition-colors"
              >
                <span className="text-xs uppercase tracking-widest">Flip for details</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Back Face */}
          <div className="col-start-1 row-start-1 w-full rounded-2xl border border-gold-electric/20 bg-black-void p-6 md:p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] min-h-[400px]">
            <div className="flex h-full flex-col justify-center">
              <h3 className="mb-2 text-xl md:text-2xl font-bold text-gold-electric font-display">{service.title}</h3>
              <p className="mb-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">We Offer:</h4>
                <ul className="space-y-2">
                  {service.offerings.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-neutral-300">
                      <span className="h-1 w-1 rounded-full bg-gold-electric flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-2 flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip();
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white md:hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                </button>
                <TransitionLink href="/contact" className="flex-1" onClick={(e) => e.stopPropagation()}>
                  <button className="w-full rounded-full border border-white/20 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-gold-electric hover:text-black-void">
                    Start Project
                  </button>
                </TransitionLink>
              </div>
            </div>
          </div>
        </motion.div>
      </div >
    </div >
  );
};

const ServicesContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalPanels = services.length;

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCount, setFlippedCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, cardPlusGap: 0 });

  // Auto-scroll is paused if any card is flipped or if user is dragging
  const isPaused = flippedCount > 0 || isDragging;

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        const cardW = Math.min(window.innerWidth * 0.85, 400);
        const gap = 16;
        setDimensions({ width: window.innerWidth, cardPlusGap: cardW + gap });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Desktop GSAP horizontal scroll (unchanged)
  useLayoutEffect(() => {
    if (isMobile) return;

    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".service-card");
      if (panels.length === 0) return;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + sliderRef.current!.offsetWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [totalPanels, isMobile]);

  // Mobile carousel state - with useAnimation for control
  const controls = useAnimation();
  const currentIndex = useRef(services.length); // Start at middle set
  const [activeIdx, setActiveIdx] = useState(0);

  // Create duplicated services array for seamless loop
  const duplicatedServices = [...services, ...services, ...services];

  const animateToNext = async (instant = false) => {
    if (dimensions.cardPlusGap === 0) return;

    // Increment index
    currentIndex.current += 1;
    setActiveIdx(currentIndex.current % services.length);

    const targetX = -currentIndex.current * dimensions.cardPlusGap;

    if (instant) {
      controls.set({ x: targetX });
    } else {
      await controls.start({
        x: targetX,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      });
    }

    // Seamless reset after animation
    if (currentIndex.current >= services.length * 2) {
      currentIndex.current -= services.length;
      controls.set({ x: -currentIndex.current * dimensions.cardPlusGap });
    }
  };

  // Seamless infinite scroll animation
  useEffect(() => {
    if (!isMobile || isPaused || dimensions.cardPlusGap === 0) {
      return;
    }

    // Initial position setup - start at middle set
    controls.set({ x: -currentIndex.current * dimensions.cardPlusGap });

    const interval = setInterval(() => {
      animateToNext();
    }, 4500);

    return () => {
      clearInterval(interval);
      controls.stop();
    };
  }, [isMobile, isPaused, dimensions.cardPlusGap, controls]);

  // Drag handling
  const handleDragEnd = async (event: any, info: any) => {
    setIsDragging(false);
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    const threshold = dimensions.cardPlusGap / 4;

    // Use velocity and distance to determine direction
    if (velocity < -500 || offset < -threshold) {
      currentIndex.current += 1;
    } else if (velocity > 500 || offset > threshold) {
      currentIndex.current -= 1;
    }

    setActiveIdx(currentIndex.current % services.length);

    // Animate to the new position (even if it's in a side set)
    await controls.start({
      x: -currentIndex.current * dimensions.cardPlusGap,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    });

    // Seamless wrap-around jump after the snap animation finishes
    if (currentIndex.current < services.length) {
      currentIndex.current += services.length;
      controls.set({ x: -currentIndex.current * dimensions.cardPlusGap });
    } else if (currentIndex.current >= services.length * 2) {
      currentIndex.current -= services.length;
      controls.set({ x: -currentIndex.current * dimensions.cardPlusGap });
    }
  };

  // Desktop render (unchanged)
  if (!isMobile) {
    return (
      <div ref={containerRef} id="services" className="relative h-screen w-full overflow-hidden bg-black-void">
        <Section className="flex h-full flex-col justify-center">
          <div className="mb-8 px-6 md:px-12">
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-white md:text-6xl font-display">
              Our Services
            </h2>
            <div className="h-1 w-24 bg-gold-electric mt-4" />
          </div>

          <div
            ref={sliderRef}
            className="flex h-[70vh] px-6 md:px-12"
            style={{ width: `${totalPanels * 45}%` }}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} totalPanels={totalPanels} />
            ))}
          </div>
        </Section>
      </div>
    );
  }

  // Mobile carousel render with seamless infinite loop
  return (
    <div id="services" className="relative min-h-screen w-full bg-black-void py-4">
      <Section>
        <div className="mb-4 px-6">
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-white font-display">
            Our Services
          </h2>
          <div className="h-1 w-24 bg-gold-electric mt-3" />
        </div>

        {/* Mobile Seamless Infinite Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 px-6 touch-pan-y"
            animate={controls}
            drag="x"
            dragElastic={0.1}
            dragConstraints={{
              left: -(duplicatedServices.length - 1) * dimensions.cardPlusGap,
              right: 0
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {duplicatedServices.map((service, index) => (
              <div key={index} className="w-[85vw] max-w-[400px] h-auto flex-shrink-0">
                <ServiceCard
                  service={service}
                  totalPanels={1}
                  disable3D={true}
                  onFlipChange={(flipped) => {
                    setFlippedCount(prev => flipped ? prev + 1 : Math.max(0, prev - 1));
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  currentIndex.current = services.length + index;
                  setActiveIdx(index);
                  controls.start({
                    x: -currentIndex.current * dimensions.cardPlusGap,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  });
                }}
                className={`h-2 rounded-full transition-all duration-300 ${activeIdx === index
                  ? 'w-8 bg-gold-electric'
                  : 'w-2 bg-white/30'
                  }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

export default ServicesContent;
