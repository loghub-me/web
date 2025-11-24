'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface ScrollProgressBarProps {
  className?: string;
}

export default function ScrollProgressBar({ className }: Readonly<ScrollProgressBarProps>) {
  const barRef = useRef<HTMLHRElement | null>(null);
  const [scrollableHeight, setScrollableHeight] = useState(1);

  useEffect(() => {
    const calcScrollableHeight = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const height = scrollHeight - clientHeight;
      setScrollableHeight(height > 0 ? height : 1);
    };

    calcScrollableHeight();
    window.addEventListener('resize', calcScrollableHeight);

    return () => {
      window.removeEventListener('resize', calcScrollableHeight);
    };
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const rawProgress = scrollY / scrollableHeight;
        const progress = Math.min(1, Math.max(0, rawProgress));

        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollableHeight]);

  return (
    <hr
      ref={barRef}
      className={cn('sticky top-16 z-10 border-2 border-primary origin-left will-change-transform', className)}
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
