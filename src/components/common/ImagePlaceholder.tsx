import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  category?: string;
  aspectRatio?: 'hero' | 'landscape' | 'portrait' | 'square';
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  category = 'School Photography',
  aspectRatio = 'landscape',
  className = '',
}) => {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'hero':
        return 'aspect-[21/9] min-h-[260px] md:min-h-[380px]';
      case 'portrait':
        return 'aspect-[3/4] min-h-[220px]';
      case 'square':
        return 'aspect-square min-h-[160px]';
      case 'landscape':
      default:
        return 'aspect-[16/9] min-h-[200px]';
    }
  };

  return (
    <div
      className={`w-full ${getAspectClass()} bg-slate-100/90 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center select-none group hover:bg-slate-100 transition-colors ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
        <ImageIcon className="w-6 h-6" />
      </div>

      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
        IMAGE PLACEHOLDER • {category}
      </span>

      <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xs leading-snug">
        {label}
      </p>

      <span className="text-[10px] text-slate-400 italic mt-2">
        Final photograph to be added
      </span>
    </div>
  );
};
