import React, { Children, cloneElement, ReactElement, useState } from 'react';
import { motion, Transition } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: ReactElement<{ 'data-id'?: string; className?: string; onClick?: (e: React.MouseEvent) => void; children?: React.ReactNode }>[];
  defaultValue?: string;
  onValueChange?: (newVal: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  defaultValue,
  onValueChange,
  className = '',
  transition = {
    type: 'spring',
    bounce: 0.15,
    duration: 0.35,
  },
  enableHover = false,
}) => {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);

  const handleInteraction = (id: string) => {
    setActiveId(id);
    if (onValueChange) onValueChange(id);
  };

  return (
    <>
      {Children.map(children, (child, index) => {
        const id = child.props['data-id'] ?? index.toString();
        const isSelected = activeId === id;

        return cloneElement(
          child,
          {
            key: id,
            className: `${child.props.className ?? ''} relative`,
            ...(enableHover
              ? {
                  onMouseEnter: () => handleInteraction(id),
                }
              : {
                  onClick: (e: React.MouseEvent) => {
                    child.props.onClick?.(e);
                    handleInteraction(id);
                  },
                }),
          },
          <>
            {isSelected && (
              <motion.div
                layoutId={`animated-bg-${defaultValue || 'shared'}`}
                className={`absolute inset-0 -z-10 ${className}`}
                transition={transition}
              />
            )}
            {child.props.children}
          </>
        );
      })}
    </>
  );
};
