import {
  AnimatePresence,
  motion,
  type MotionProps,
  useInView,
  type UseInViewOptions,
  type Variants,
} from 'motion/react';
import { type ElementType, useRef } from 'react';

type MarginType = UseInViewOptions['margin'];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  as: Component = 'div',
  className,
  variant,
  duration = 0.3,
  delay = 0,
  offset = 6,
  direction = 'down',
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
  ...props
}: BlurFadeProps) {
  const MotionComponent = motion.create(Component);
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']:
        direction === 'right' || direction === 'down' ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <MotionComponent
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: 'easeOut',
        }}
        className={className}
        {...props}
      >
        {children}
      </MotionComponent>
    </AnimatePresence>
  );
}
