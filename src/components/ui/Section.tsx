'use client';

import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export default function Section({ children, className, id, fullWidth = false }: SectionProps) {
  const hasPointerNone = className?.includes('pointer-events-none');

  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-12 md:py-32",
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={cn("mx-auto max-w-[1400px] px-6 md:px-12", hasPointerNone && "pointer-events-none")}>
          {children}
        </div>
      )}
    </section>
  );
}
