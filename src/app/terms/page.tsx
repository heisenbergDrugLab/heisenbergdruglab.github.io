'use client';

import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";

export default function TermsPage() {
  return (
    <main className="bg-black-void min-h-screen">
      <Section className="pt-32 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <span className="text-gold-electric uppercase tracking-widest font-bold text-sm">Legal</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-bold font-display text-white uppercase tracking-tighter mb-12">
            Terms of Service
          </h1>

          <div className="prose prose-invert prose-lg text-neutral-300 font-light leading-relaxed">
            <p className="mb-8">Last Updated: December 2025</p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">1. Agreement to Terms</h3>
            <p>
              By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
            </p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">2. Intellectual Property</h3>
            <p>
              The materials contained in this website are protected by applicable copyright and trademark law. All content, designs, and code are the exclusive property of Voxel.
            </p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">3. Disclaimer</h3>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">4. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
