import { motion, useScroll } from 'motion/react';
import { useState } from 'react';
import { cn } from '~/lib/utils';

interface ScrollProgressBarProps {
  className?: string;
}

export default function ScrollProgressBar({ className }: Readonly<ScrollProgressBarProps>) {
  const [scaleX, setScaleX] = useState(0);
  const { scrollYProgress } = useScroll();

  scrollYProgress.on('change', (v) => setScaleX(v > 1 ? 1 : v));

  return (
    <motion.hr className={cn('sticky top-16 z-10 border-2 border-primary origin-left', className)} style={{ scaleX }} />
  );
}
