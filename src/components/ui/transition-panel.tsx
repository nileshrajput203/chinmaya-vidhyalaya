import React from 'react';
import { AnimatePresence, motion, Transition } from 'framer-motion';

interface TransitionPanelProps {
  children: React.ReactNode;
  activeIndex: number | string;
  className?: string;
  transition?: Transition;
}

export const TransitionPanel: React.FC<TransitionPanelProps> = ({
  children,
  activeIndex,
  className = '',
  transition = { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
}) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={transition}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
