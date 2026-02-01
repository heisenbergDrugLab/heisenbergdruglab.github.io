'use client';

import { useState } from 'react';
import Section from "@/components/ui/Section";

const WORKER_URL = 'https://chat.colabmldrive.workers.dev';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch(`${WORKER_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: `Service Interest: ${formData.service}\n\n${formData.message}`
                })
            });

            if (!response.ok) throw new Error('Failed to send');

            setSubmitStatus('success');
            setFormData({ name: '', email: '', service: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-black-void min-h-screen relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-electric/5 rounded-full blur-[120px] pointer-events-none" />

            <Section className="pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-20">
                    <div>
                        <span className="text-gold-electric uppercase tracking-widest font-bold text-sm">Get in Touch</span>
                        <h1 className="mt-4 text-6xl md:text-8xl font-bold font-display text-white uppercase tracking-tighter leading-none mb-12">
                            Let's Build <br /> The Future.
                        </h1>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-widest mb-4">Contact</h3>
                                <p className="text-neutral-400 text-lg hover:text-white transition-colors cursor-pointer">selvaofficialmail@gmail.com</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-widest mb-4">Studio</h3>
                                <p className="text-neutral-400 text-lg">
                                    Global (Remote-first studio)
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-widest mb-4">Socials</h3>
                                <div className="flex gap-6 text-neutral-400">
                                    {['Instagram', 'LinkedIn', 'Twitter', 'Dribbble'].map(social => (
                                        <span key={social} className="hover:text-gold-electric transition-colors cursor-pointer border-b border-transparent hover:border-gold-electric pb-0.5">{social}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-dark/30 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
                        {submitStatus === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="text-6xl mb-6">✨</div>
                                <h3 className="text-3xl font-bold text-white font-display mb-4">Message Sent!</h3>
                                <p className="text-neutral-400">We'll be in touch within 24 hours.</p>
                                <button
                                    onClick={() => setSubmitStatus('idle')}
                                    className="mt-8 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black-void transition-colors"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                            className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold-electric focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                            className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold-electric focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Service Interest</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Web Development', 'Graphic Design', 'SEO', 'Hosting & Domain Management'].map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, service: tag }))}
                                                className={`px-4 py-2 rounded-full border text-sm transition-all ${formData.service === tag
                                                    ? 'bg-gold-electric text-black-void border-gold-electric'
                                                    : 'border-white/10 text-neutral-300 hover:bg-white hover:text-black-void'
                                                    }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Project Details</label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        required
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold-electric focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us about your next masterpiece..."
                                    />
                                </div>

                                {submitStatus === 'error' && (
                                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black-void font-bold uppercase tracking-widest py-4 rounded-full hover:bg-gold-electric transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </Section>
        </main>
    );
}

