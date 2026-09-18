import React, { useRef } from 'react';
import { motion, useInView, Variant, Transition } from 'framer-motion';

interface InViewProps {
  children: React.ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: {
    once?: boolean;
    margin?: string;
    amount?: 'some' | 'all' | number;
  };
  className?: string;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const InView: React.FC<InViewProps> = ({
  children,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  viewOptions = { once: true, margin: '-40px' },
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions as any);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};
