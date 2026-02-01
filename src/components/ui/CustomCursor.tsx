'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Center the cursor with smooth GSAP animations
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
    const followerXTo = gsap.quickTo(follower, "x", { duration: 0.8, ease: "power3.out" });
    const followerYTo = gsap.quickTo(follower, "y", { duration: 0.8, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      followerXTo(e.clientX);
      followerYTo(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    // Add hover listeners to clickable elements
    const clickables = document.querySelectorAll('a, button, input, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Observer for new elements (like client-side routed pages)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const newClickables = node.querySelectorAll('a, button, input, [role="button"]');
            newClickables.forEach(el => {
              el.addEventListener('mouseenter', handleHoverStart);
              el.addEventListener('mouseleave', handleHoverEnd);
            });
            if (node.matches && (node.matches('a') || node.matches('button'))) {
              node.addEventListener('mouseenter', handleHoverStart);
              node.addEventListener('mouseleave', handleHoverEnd);
            }
          }
        })
      })
    });

    try {
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) {
      // Ignore optimization errors
      console.warn(e);
    }


    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block">
      {/* Inner Core - Small glowing dot */}
      <div
        ref={cursorRef}
        className={`absolute transition-all duration-300 ease-out ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Glow effect */}
          <div className="absolute inset-0 h-2 w-2 rounded-full bg-gold-electric blur-sm" />
          {/* Solid core */}
          <div className="relative h-2 w-2 rounded-full bg-gold-electric shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
        </div>
      </div>

      {/* Outer Ring - Elegant follower */}
      <div
        ref={followerRef}
        className={`absolute transition-all duration-500 ease-out ${isHovering
            ? 'scale-75 opacity-100'
            : 'scale-100 opacity-70'
          }`}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Outer glow ring */}
          <div className={`absolute inset-0 h-12 w-12 rounded-full bg-gold-electric/20 blur-md transition-all duration-500 ${isHovering ? 'scale-125 opacity-100' : 'scale-100 opacity-50'
            }`} />

          {/* Main ring with glass effect */}
          <div className={`relative h-12 w-12 rounded-full border-2 transition-all duration-500 backdrop-blur-sm ${isHovering
              ? 'border-gold-electric bg-gold-electric/10 shadow-[0_0_20px_rgba(255,215,0,0.4)]'
              : 'border-gold-electric/40 bg-transparent'
            }`} style={{ mixBlendMode: 'screen' }} />
        </div>
      </div>
    </div>
  );
}
