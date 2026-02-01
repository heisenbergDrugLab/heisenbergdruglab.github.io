'use client';

import Link, { LinkProps } from 'next/link';
import { useTransition } from '@/context/TransitionContext';
import { ReactNode } from 'react';

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({ children, href, onClick, ...props }: TransitionLinkProps) {
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    
    // Only intercept internal links
    if (typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'))) {
        e.preventDefault();
        startTransition(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
