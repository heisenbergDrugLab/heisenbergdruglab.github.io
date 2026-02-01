'use client';

import { motion } from 'framer-motion';
import TransitionLink from './TransitionLink';
import { IoLogoInstagram, IoLogoLinkedin, IoLogoDribbble, IoArrowForward } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black-void overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-electric/30 to-transparent" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Main Content - Editorial Layout */}
        <div className="py-16 md:py-32 lg:py-40">
          {/* Hero Statement - Magazine Style */}
          <div className="mb-12 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TransitionLink href="/">
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-8 hover:text-gold-electric transition-colors duration-300 cursor-pointer">
                  Voxel
                </h2>
              </TransitionLink>

              <p className="text-xl md:text-2xl lg:text-3xl text-neutral-400 font-light tracking-wide max-w-3xl leading-relaxed">
                Crafting digital excellence where innovation meets elegance.
              </p>
            </motion.div>
          </div>

          {/* Grid Layout - Editorial Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 mb-12 md:mb-32">
            {/* Left Column - Navigation */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-sm uppercase tracking-[0.15em] text-neutral-400 font-bold mb-6">
                  Navigate
                </h3>
                <nav className="space-y-4">
                  {[
                    { name: 'Work', href: '/work' },
                    { name: 'About', href: '/about' },
                    { name: 'Contact', href: '/contact' }
                  ].map((link) => (
                    <div key={link.name}>
                      <TransitionLink href={link.href}>
                        <span className="text-2xl md:text-3xl font-display font-bold text-white hover:text-gold-electric transition-colors duration-300 cursor-pointer tracking-tight">
                          {link.name}
                        </span>
                      </TransitionLink>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Center Column - Contact */}
            <div className="lg:col-span-4">
              <h3 className="text-sm uppercase tracking-[0.15em] text-neutral-400 font-bold mb-6">
                Connect
              </h3>
              <div className="space-y-6">
                <a
                  href="mailto:selvaofficialmail@gmail.com"
                  className="block text-lg md:text-xl text-neutral-300 hover:text-gold-electric transition-colors duration-300 font-light tracking-wide"
                >
                  contact@voxel.com
                </a>

                {/* Social Links - Minimalist */}
                <div className="pt-6">
                  <div className="flex gap-6">
                    {[
                      { Icon: IoLogoInstagram, name: 'Instagram', href: '#' },
                      { Icon: IoLogoLinkedin, name: 'LinkedIn', href: '#' },
                      { Icon: FaXTwitter, name: 'X', href: '#' },
                      { Icon: IoLogoDribbble, name: 'Dribbble', href: '#' }
                    ].map(({ Icon, name, href }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        aria-label={name}
                      >
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-gold-electric hover:border-gold-electric transition-all duration-300 group-hover:scale-110">
                          <Icon className="text-xl" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Newsletter */}
            <div className="lg:col-span-4">
              <h3 className="text-sm uppercase tracking-[0.15em] text-neutral-400 font-bold mb-6">
                Stay Informed
              </h3>
              <p className="text-neutral-400 mb-8 font-light text-base leading-relaxed">
                Subscribe to receive our latest projects and insights.
              </p>
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-b border-white/20 py-4 pr-12 text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold-electric transition-colors text-base tracking-wide"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-4 text-neutral-300 hover:text-gold-electric transition-colors"
                    aria-label="Subscribe"
                  >
                    <IoArrowForward className="text-xl" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar - Minimal */}
          <div className="pt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">

              {/* Crafted Badge */}
              <div className="text-sm md:text-base text-neutral-400 tracking-[0.1em] uppercase font-medium">
                Crafted with <span className="text-gold-electric">Excellence</span>
              </div>


              {/* Legal Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 text-sm md:text-base text-neutral-400 font-medium">
                <TransitionLink href="/privacy">
                  <span className="hover:text-gold-electric transition-colors tracking-wide cursor-pointer">
                    Privacy Policy
                  </span>
                </TransitionLink>
                <TransitionLink href="/terms">
                  <span className="hover:text-gold-electric transition-colors tracking-wide cursor-pointer">
                    Terms of Service
                  </span>
                </TransitionLink>
              </div>
              {/* Copyright */}
              <div className="text-sm md:text-base text-neutral-400 tracking-wide font-medium">
                © {currentYear} Voxel. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gold Accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-electric/50 to-transparent" />
    </footer>
  );
}
