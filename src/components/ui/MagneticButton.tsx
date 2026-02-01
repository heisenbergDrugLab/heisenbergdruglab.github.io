'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // How strong the magnetic pull is
}

export default function MagneticButton({
  children,
  className,
  strength = 0.5,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const textXTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * strength);
      yTo(y * strength);
      
      // Move text slightly less for parallax feel (optional, or same)
      textXTo(x * strength * 0.5);
      textYTo(y * strength * 0.5);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:border-gold-electric hover:bg-gold-electric/10 hover:text-gold-electric",
        className
      )}
      {...props}
    >
      <span ref={textRef} className="relative block z-10">
        {children}
      </span>
    </button>
  );
}
