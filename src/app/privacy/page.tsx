'use client';

import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";

export default function PrivacyPage() {
  return (
    <main className="bg-black-void min-h-screen">
      <Section className="pt-32 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <span className="text-gold-electric uppercase tracking-widest font-bold text-sm">Legal</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-bold font-display text-white uppercase tracking-tighter mb-12">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-lg text-neutral-300 font-light leading-relaxed">
            <p className="mb-8">Last Updated: December 2025</p>
            
            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, and any other information you choose to provide.
            </p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to respond to your comments and questions, and to send you related information, including confirmations and updates.
            </p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">3. Data Security</h3>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>

            <h3 className="text-white font-display text-2xl uppercase mt-12 mb-6">4. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:selvaofficialmail@gmail.com" className="text-gold-electric hover:underline">selvaofficialmail@gmail.com</a>.
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
