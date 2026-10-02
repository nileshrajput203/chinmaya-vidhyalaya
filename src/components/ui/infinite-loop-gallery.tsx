import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface InfiniteGalleryItem {
  id: string | number;
  title?: string;
  category?: string;
  desc?: string;
  url: string;
}

interface InfiniteLoopGalleryProps {
  row1Items: InfiniteGalleryItem[];
  row2Items: InfiniteGalleryItem[];
}

export const InfiniteLoopGallery: React.FC<InfiniteLoopGalleryProps> = ({
  row1Items,
  row2Items,
}) => {
  const [selectedItem, setSelectedItem] = useState<InfiniteGalleryItem | null>(null);

  // Combine items for modal navigation
  const allItems = [...row1Items, ...row2Items];

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = allItems.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % allItems.length;
    setSelectedItem(allItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = allItems.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    setSelectedItem(allItems[prevIndex]);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') setSelectedItem(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  // Pure clean image card — NO text overlay, NO badges, NO vignette inside card
  const renderCard = (item: InfiniteGalleryItem, index: number) => {
    return (
      <div
        key={`${item.id}-${index}`}
        onClick={() => setSelectedItem(item)}
        className="group relative flex-shrink-0 w-[290px] sm:w-[370px] lg:w-[430px] h-[190px] sm:h-[240px] lg:h-[270px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] select-none"
      >
        <img
          src={item.url}
          alt={item.title || "Campus Life"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  };

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 py-4 overflow-hidden">
      {/* ─── MARQUEE CONTAINER: END TO END, NO VIGNETTE ─── */}
      <div className="w-full space-y-4">
        {/* ROW 1: Moves Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 shrink-0 animate-loop-ltr pr-4">
            {row1Items.map((item, idx) => renderCard(item, idx))}
            {row1Items.map((item, idx) => renderCard(item, idx + row1Items.length))}
          </div>
        </div>

        {/* ROW 2: Moves Left to Right (Slightly varied pace for parallax depth) */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 shrink-0 animate-loop-ltr-slow pr-4">
            {row2Items.map((item, idx) => renderCard(item, idx))}
            {row2Items.map((item, idx) => renderCard(item, idx + row2Items.length))}
          </div>
        </div>
      </div>

      {/* ─── MINIMAL LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.url}
                alt={selectedItem.title || "Full Preview"}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteLoopGallery;
