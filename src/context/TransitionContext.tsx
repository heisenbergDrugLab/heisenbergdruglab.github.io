'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

// Centralized transition configuration for easy tuning
export const TRANSITION_CONFIG = {
  PIXEL_DURATION: 0.40,    // Duration of individual pixel animation
  ROW_DELAY: 0.09,        // Delay between each row starting
  ROWS: 12,               // Number of rows in PixelOverlay
  COVER_BUFFER: 150,      // Extra ms to wait after last row starts before pushing router
  REVEAL_PAUSE: 200,      // Pause in ms after navigation before revealing new page
};

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const startTransition = (href: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Calculate total wait time for pixels to cover screen
    const waitTime = (TRANSITION_CONFIG.ROWS * TRANSITION_CONFIG.ROW_DELAY * 1000) + TRANSITION_CONFIG.COVER_BUFFER;

    setTimeout(() => {
      router.push(href);

      // Pause while new page hydrates before starting reveal animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_CONFIG.REVEAL_PAUSE);
    }, waitTime);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
