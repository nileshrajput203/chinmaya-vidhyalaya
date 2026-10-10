import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { contentService } from '../services/contentService';
import { GalleryItem } from '../types/gallery';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const PAGE_SIZE = 24;

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Lock scroll and Lenis while lightbox is open
  useBodyScrollLock(activeLightboxIndex !== null);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      const data = await contentService.getGallery();
      setItems(data);
      setVisibleCount(PAGE_SIZE);
      setLoading(false);
    }
    loadGallery();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowLeft' && items.length > 0) {
        setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1));
      } else if (e.key === 'ArrowRight' && items.length > 0) {
        setActiveLightboxIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, items.length]);

  const activeItem = activeLightboxIndex !== null ? items[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null && items.length > 0) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null && items.length > 0) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % items.length);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#181C20] pb-24 font-sans">
      <Breadcrumb items={[{ label: "Gallery" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Simple & Clean Header */}
        <div className="space-y-2 border-b border-[#E7E2D8] pb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#FFF0E6] text-[#DF711B] text-[11px] font-mono font-bold uppercase tracking-widest border border-[#DF711B]/20">
            <span>Visual Archives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#181818] tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] max-w-2xl font-normal leading-relaxed">
            A visual glimpse into campus life, academic activities, events, and moments at Chinmaya Vidyalaya, Tarapur.
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-24 text-[#777777] text-xs font-mono">
            Loading gallery photographs...
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-[#E7E2D8] p-12 text-center text-xs text-[#777777] font-mono">
            No gallery photographs available at this moment.
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {items.slice(0, visibleCount).map((item, idx) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="cursor-pointer group relative aspect-[4/3] overflow-hidden bg-slate-900 border border-[#E7E2D8] hover:border-[#DF711B] transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Campus Photograph"}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle hover overlay with expand icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Photographs */}
            {visibleCount < items.length && (
              <div className="pt-6 flex flex-col items-center justify-center gap-3 border-t border-[#E7E2D8]">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="px-8 py-3.5 bg-[#DF711B] hover:bg-[#181818] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
                >
                  <span>Load More Photographs</span>
                  <span className="text-amber-300 group-hover:translate-y-0.5 transition-transform">↓</span>
                </button>
                <span className="text-xs font-mono text-[#777777]">
                  Showing {Math.min(visibleCount, items.length)} of {items.length} photographs
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Clean Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none overscroll-contain"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-xs font-mono text-white/70 bg-white/10 px-3 py-1 rounded-full z-50">
              {(activeLightboxIndex ?? 0) + 1} / {items.length}
            </div>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/25 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/25 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div 
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeItem.imageUrl} 
                alt={activeItem.title || "Campus Photograph"} 
                className="max-h-[85vh] max-w-full object-contain rounded-xs shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
