'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TransitionLink from './TransitionLink';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoMenu } from 'react-icons/io5'; // Using react-icons

const navLinks = [
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-transparent py-4' : 'bg-transparent py-8'
          }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <TransitionLink href="/" className="group relative flex items-center">
            {/* Stylized curvy V with transparency */}
            <span className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-gold-electric via-amber-400 to-gold-electric font-display relative group-hover:scale-105 transition-transform duration-300" style={{ WebkitTextStroke: '1px rgba(212, 175, 55, 0.5)' }}>
              V
            </span>
            {/* Rest of the text */}
            <div className="flex items-center -ml-1">
              <span className="text-3xl font-bold tracking-tight text-white font-display group-hover:tracking-normal transition-all duration-300">
                OXEL
              </span>
              <span className="text-3xl font-black text-gold-electric ml-0.5 group-hover:scale-110 transition-transform duration-300">
                .
              </span>
            </div>
            {/* Subtle underline effect */}
            <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-electric to-transparent transition-all duration-500 group-hover:w-full" />
          </TransitionLink>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group relative z-50 flex flex-col items-end justify-center gap-2 p-2"
          >
            <span className="h-[3px] w-9 bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12 group-hover:bg-gold-electric" />
            <span className="h-[3px] w-9 bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-5 group-hover:bg-gold-electric" />
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[60] h-full w-full max-w-md bg-zinc-900 p-8 shadow-2xl md:w-[400px]"
            >
              <div className="mb-12 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold-electric hover:text-gold-electric transition-colors"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <TransitionLink
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl font-bold text-white transition-colors hover:text-gold-electric font-display"
                    >
                      {link.name}
                    </TransitionLink>
                  </motion.div>
                ))}
              </nav>

              <div className="absolute bottom-8 left-8 text-neutral-400">
                <p className="text-sm uppercase tracking-widest">Get in touch</p>
                <p className="mt-2 text-white">contact@voxel.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
