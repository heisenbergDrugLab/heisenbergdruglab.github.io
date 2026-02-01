'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import Section from '../ui/Section';

const stats = [
    { label: "Client Retention", value: 98, suffix: "%" },
    { label: "Projects Delivered", value: 150, suffix: "+" },
    { label: "Awards Won", value: 24, suffix: "" },
    { label: "Years Experience", value: 10, suffix: "+" },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString() + suffix;
            }
        })
    }, [springValue, suffix]);

    return <span ref={ref} className="text-6xl font-bold text-gold-electric md:text-8xl font-display">0{suffix}</span>;
}


export default function WhyUs() {
    return (
        <Section id="why-us" className="bg-gradient-to-b from-black-void to-slate-dark/20 text-white">
            <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
                <div>
                    <h2 className="text-4xl font-bold uppercase tracking-tighter text-white md:text-6xl font-display leading-[1.1]">
                        Data-Driven <br />
                        <span className="text-white/50">Excellence.</span>
                    </h2>
                    <p className="mt-4 md:mt-8 max-w-lg text-lg text-neutral-400">
                        We bridge the gap between aesthetics and performance. Every pixel is placed with purpose, every interaction designed for conversion.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 md:p-8 backdrop-blur-md transition-colors hover:bg-white/10"
                        >
                            <Counter value={stat.value} suffix={stat.suffix} />
                            <span className="mt-4 text-sm font-bold uppercase tracking-widest text-white/60">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
