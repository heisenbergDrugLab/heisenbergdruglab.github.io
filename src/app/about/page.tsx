'use client';

import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";
import GridDistortion from "@/components/ui/GridDistortion";
import { motion } from "framer-motion";

// Note: For SEO in client components, metadata is set via layout.tsx or generateMetadata in a separate file

export default function AboutPage() {
    return (
        <main className="bg-black-void min-h-screen">
            <Section className="pt-32">
                <div className="mb-20">
                    <span className="text-gold-electric uppercase tracking-widest font-bold text-sm">Our Story</span>
                    <h1 className="mt-4 text-6xl md:text-8xl font-bold font-display text-white uppercase tracking-tighter leading-none">
                        We Architect <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-electric to-white">Digital Luxury</span>
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
                    <div className="text-xl text-neutral-300 font-light leading-relaxed space-y-8">
                        <p>
                            Born from a desire to bridge the gap between <span className="text-gold-electric font-bold">functional technology</span> and <span className="text-gold-electric font-bold">high-end aesthetics</span>, we established ourselves as a <span className="text-gold-electric font-bold">boutique digital atelier</span>. We don't just build websites; we craft <span className="text-gold-electric font-bold">immersive digital experiences</span> that resonate on an emotional level.
                        </p>
                        <p>
                            We believe in <span className="text-gold-electric font-bold">intentional design</span> and <span className="text-gold-electric font-bold">technical excellence</span>. Every project we undertake is a <span className="text-gold-electric font-bold">unique collaboration</span>, crafted with precision to elevate your brand and create a lasting <span className="text-gold-electric font-bold">digital impact</span>.
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm">
                        <GridDistortion
                            imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                            grid={12}
                            mouse={0.12}
                            strength={0.18}
                            relaxation={0.9}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                <div className="mb-32">
                    <h2 className="text-4xl font-display font-bold text-white uppercase mb-12 text-center">The Founding Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {[
                            { name: "Sharan", role: "Chief Executive Officer", title: "CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", portfolio: "https://sharan-raj-ai.github.io/" },
                            { name: "Selva", role: "Chief Technical Officer", title: "CTO", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", portfolio: "https://selva-aiworks.github.io" }
                        ].map((member, i) => (
                            <div key={i} className="group text-center">
                                <div className="aspect-[3/4] overflow-hidden bg-neutral-900 mb-4 rounded-lg">
                                    <GridDistortion
                                        imageSrc={member.img}
                                        grid={10}
                                        mouse={0.15}
                                        strength={0.2}
                                        relaxation={0.9}
                                        className="w-full h-full"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white font-display uppercase">{member.name}</h3>
                                <p className="text-gold-electric text-sm tracking-widest uppercase mt-2">{member.title}</p>
                                <p className="text-neutral-400 text-sm mt-1">{member.role}</p>
                                <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-gold-electric hover:text-white transition-colors underline underline-offset-4">
                                    View Portfolio →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
            <Footer />
        </main>
    );
}
