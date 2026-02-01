'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import TransitionLink from '../ui/TransitionLink';
import Hero3DBackground from '../canvas/Hero3DBackground';
import MagneticButton from '../ui/MagneticButton';
import Section from '../ui/Section';

export default function Hero() {
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      headlineRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
    )
      .fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=1'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      );
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-visible md:overflow-hidden" style={{ touchAction: 'pan-y' }}>
      <Hero3DBackground />

      <Section className="flex min-h-[100dvh] flex-col justify-center pt-24 md:pt-32 pb-4 md:pb-40 md:pointer-events-none">
        <div className="relative z-10 max-w-4xl px-4">
          <h1 ref={headlineRef} className="opacity-0 font-display text-5xl font-bold leading-tight tracking-tight text-white md:text-8xl lg:text-9xl">
            CRAFTING <br />
            <span className="text-gold-electric">DIGITAL EXCELLENCE</span>
          </h1>

          <p ref={subtextRef} className="opacity-0 mt-8 max-w-xl text-lg text-neutral-400 md:text-xl font-light tracking-wide">
            Where innovation meets elegance. We build bespoke digital experiences that position your brand at the forefront of the future.
          </p>

          <div ref={ctaRef} className="opacity-0 mt-12 mb-20 md:mb-0">
            {/* Button Container - Only this is clickable */}
            <div className="button-container opacity-0 translate-y-8 mt-12 mb-20 md:mb-0 pointer-events-auto">
              <TransitionLink href="/work">
                <MagneticButton>
                  Explore Our Work
                </MagneticButton>
              </TransitionLink>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
