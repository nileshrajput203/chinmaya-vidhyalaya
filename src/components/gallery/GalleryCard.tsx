import React from 'react';
import { GalleryItem } from '../../types/gallery';

interface GalleryCardProps {
  item: GalleryItem;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item }) => {
  return (
    <div className="bg-[#FCFBF8] border border-[#E2DCD2] overflow-hidden hover:border-[#102A43] transition-all shadow-sm flex flex-col justify-between">
      <div className="overflow-hidden border-b border-[#E2DCD2]">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 space-y-1.5">
        <span className="text-[11px] font-bold text-[#DF711B] uppercase tracking-wider block">
          {item.category}
        </span>
        <h4 className="font-serif font-bold text-[#102A43] text-base leading-snug">
          {item.title}
        </h4>
        {item.caption && (
          <p className="text-xs text-[#4A5568] leading-relaxed">
            {item.caption}
          </p>
        )}
      </div>
    </div>
  );
};
