import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNER_SLIDES = [
  { id: 1, src: '/1.jpeg', alt: 'Chinmaya Vidyalaya Commerce & Arts Toppers Banner' },
  { id: 2, src: '/2.jpeg?v=20261022', alt: 'Chinmaya Vidyalaya 12th Toppers 2026 - Science' },
];

export const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  return (
    <section 
      className="w-full bg-white relative overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Campus Banners Carousel"
    >
      <div className="relative w-full aspect-[1600/419] overflow-hidden bg-white">
        {BANNER_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-contain block"
            />
          </div>
        ))}

        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-sm flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95 border border-white/20 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-sm flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95 border border-white/20 hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
};
