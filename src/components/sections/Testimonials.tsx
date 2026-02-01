'use client';

import { useRef } from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Sterling",
    role: "CEO, Sterling Dynamics",
    content: "The level of detail and craftsmanship is unmatched. They didn't just build a website; they forged our digital identity.",
    video: null // Placeholder for video functionality
  },
  {
    name: "Elena Vostokova",
    role: "Founder, Zenith Art",
    content: "An absolute masterpiece. The 3D integration blew our clients away.",
    video: null
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials" className="bg-black-void">
      <div className="mb-10 md:mb-20 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-tighter text-white md:text-6xl font-display">
          Client Stories
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
          >
            {/* Video Placeholder Area */}
            <div className="aspect-video w-full bg-slate-800 transition-colors group-hover:bg-slate-700">
              <div className="flex h-full w-full items-center justify-center">
                <span className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="p-8">
              <p className="mb-6 text-xl font-light italic text-white/90">"{testimonial.content}"</p>
              <div>
                <h4 className="text-lg font-bold text-white font-display">{testimonial.name}</h4>
                <p className="text-sm uppercase tracking-widest text-gold-electric">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
