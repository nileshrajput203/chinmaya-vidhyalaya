import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, Filter, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { contentService } from '../services/contentService';
import { GalleryItem } from '../types/gallery';
import { GALLERY_YEARS, GALLERY_EVENTS } from '../data/gallery';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedEvent, setSelectedEvent] = useState<string>('All Events');
  const [loading, setLoading] = useState(true);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      const data = await contentService.getGallery({
        academicYear: selectedYear,
        event: selectedEvent
      });
      setItems(data);
      setLoading(false);
    }
    loadGallery();
  }, [selectedYear, selectedEvent]);

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

  const handleResetFilters = () => {
    setSelectedYear('All Years');
    setSelectedEvent('All Events');
  };

  const isFiltered = selectedYear !== 'All Years' || selectedEvent !== 'All Events';

  return (
    <div className="bg-[#FAF8F5] text-[#181C20] pb-24 font-sans">
      <PageHero 
        title="Visual Archives & Event Gallery" 
        subtitle="Chronological glimpses into academic life, sacred traditions, athletic tournaments, and annual celebrations at Chinmaya Vidyalaya Tarapur." 
        badge="Archival Showcase" 
      />
      <Breadcrumb items={[{ label: "Gallery" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Filter Matrix Card */}
        <div className="bg-white border border-[#E7E2D8] p-5 sm:p-6 shadow-sm space-y-6">
          
          {/* Top Bar: Title & Year Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-5">
            <div>
              <div className="flex items-center gap-2 text-[#DF711B] text-xs font-mono font-bold uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" />
                <span>Filter By Academic Session</span>
              </div>
              <p className="text-xs text-[#555555] mt-0.5">
                Browse official photographic archives recorded across school academic years.
              </p>
            </div>

            {/* Year Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {GALLERY_YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border ${
                    selectedYear === yr
                      ? 'bg-[#181818] text-white border-[#181818] shadow-sm'
                      : 'bg-[#FAF8F5] border-[#D5CEC2] text-[#444444] hover:bg-white hover:border-[#DF711B] hover:text-[#DF711B]'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Event Filters */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#DF711B] text-xs font-mono font-bold uppercase tracking-widest">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter By Event / Program</span>
              </div>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#777777] hover:text-[#DF711B] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {GALLERY_EVENTS.map((ev) => (
                <button
                  key={ev}
                  onClick={() => setSelectedEvent(ev)}
                  className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all border ${
                    selectedEvent === ev
                      ? 'bg-[#DF711B] text-white border-[#DF711B] font-bold shadow-xs'
                      : 'bg-white border-[#E7E2D8] text-[#555555] hover:border-[#DF711B] hover:text-[#181818]'
                  }`}
                >
                  {ev}
                </button>
              ))}
            </div>
          </div>

          {/* Active Summary Bar */}
          <div className="flex items-center justify-between pt-2 text-xs font-mono text-[#777777] border-t border-[#F3EFE6]">
            <span>
              Viewing: <strong className="text-[#181818]">{selectedYear}</strong> • <strong className="text-[#181818]">{selectedEvent}</strong>
            </span>
            <span>
              <strong>{items.length}</strong> photo{items.length !== 1 ? 's' : ''} found
            </span>
          </div>

        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#777777] text-xs font-mono">
            Loading visual archives...
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-[#E7E2D8] p-12 text-center space-y-4 shadow-sm">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-display font-bold text-lg text-[#181818]">No Visuals Found</h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              No photos currently match both the session "{selectedYear}" and event "{selectedEvent}". Try choosing different filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#DF711B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c85f12] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => setActiveLightboxIndex(idx)}
                className="cursor-pointer group bg-white border border-[#E7E2D8] hover:border-[#DF711B] transition-all shadow-sm hover:shadow-md flex flex-col"
              >
                {/* Photo frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#181818]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Metadata pills */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
                    {item.academicYear && (
                      <span className="text-[10px] font-mono text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 border border-white/20">
                        {item.academicYear}
                      </span>
                    )}
                    {item.event && (
                      <span className="text-[10px] font-mono text-[#FFB740] bg-black/60 backdrop-blur-sm px-2 py-0.5 border border-white/20">
                        {item.event}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card details */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#181818] uppercase tracking-tight group-hover:text-[#DF711B] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p className="text-xs text-[#555555] font-normal leading-relaxed line-clamp-2 mt-1">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#F3EFE6] flex items-center justify-between text-[11px] font-mono text-[#777777]">
                    <span>{item.date || item.academicYear}</span>
                    <span className="text-[#DF711B] font-bold group-hover:translate-x-0.5 transition-transform">
                      View ›
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#121417]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Body */}
            <div 
              className="relative max-w-4xl w-full bg-[#181A1E] border border-white/15 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[65vh] overflow-hidden flex items-center justify-center bg-black">
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.title} 
                  className="w-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 space-y-2 bg-[#1C1F24] border-t border-white/10 text-white">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {activeItem.academicYear && (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 uppercase tracking-wider">
                        Session {activeItem.academicYear}
                      </span>
                    )}
                    {activeItem.event && (
                      <span className="text-[10px] font-mono text-white/90 bg-white/10 border border-white/20 px-2 py-0.5 uppercase tracking-wider">
                        {activeItem.event}
                      </span>
                    )}
                  </div>
                  {activeLightboxIndex !== null && (
                    <span className="text-xs font-mono text-white/50">
                      {activeLightboxIndex + 1} of {items.length}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                  {activeItem.title}
                </h3>

                {activeItem.caption && (
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {activeItem.caption}
                  </p>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
