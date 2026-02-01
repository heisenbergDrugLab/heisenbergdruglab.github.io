'use client';

import { motion } from 'framer-motion';
import { useTransition, TRANSITION_CONFIG } from '@/context/TransitionContext';
import { useEffect, useState } from 'react';

export default function PixelOverlay() {
  const { isTransitioning } = useTransition();
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      setPhase('exit');
    } else {
      if (phase === 'exit') {
        setPhase('enter');
        // Total duration calculation for phase cleanup
        const totalDuration = (TRANSITION_CONFIG.ROWS * TRANSITION_CONFIG.ROW_DELAY * 1000) + (TRANSITION_CONFIG.PIXEL_DURATION * 1000);
        setTimeout(() => setPhase('idle'), totalDuration);
      }
    }
  }, [isTransitioning, phase]);

  const columns = 30;
  const rows = TRANSITION_CONFIG.ROWS;
  const totalBlocks = columns * rows;

  const getDelay = (i: number) => {
    const row = Math.floor(i / columns);
    return (row * TRANSITION_CONFIG.ROW_DELAY);
  };

  // Get opacity value - always returns a number
  const getOpacity = (): number => {
    if (phase === 'exit') return 1;
    return 0;
  };

  if (!hasMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(${rows},1fr)] pointer-events-none`}
    >
      {Array.from({ length: totalBlocks }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-black-void relative -m-[1px] border-[0.5px] border-black-void"
          initial={{ opacity: 0 }}
          animate={{ opacity: getOpacity() }}
          transition={{
            duration: TRANSITION_CONFIG.PIXEL_DURATION,
            ease: "easeInOut",
            delay: getDelay(i)
          }}
        />
      ))}
    </div>
  );
}
