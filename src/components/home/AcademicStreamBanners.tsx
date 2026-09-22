import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CarouselSlide {
  id: string;
  src: string;
  fallback: string;
  alt: string;
  title: string;
  subtitle: string;
  tag: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'arts-commerce',
    src: '/images/chinmaya-web-arts-and-commerce.jpg',
    fallback: '/images/banner-3.jpeg',
    alt: 'Chinmaya Vidyalaya Tarapur - Arts & Commerce Stream Banner',
    title: 'Senior Secondary • Arts & Commerce Stream',
    subtitle: 'Fostering analytical acumen, economic literacy, humanities, and visionary leadership.',
    tag: 'SENIOR SECONDARY • CLASS XI & XII',
  },
  {
    id: 'science',
    src: '/images/chinmaya-web-science.jpg',
    fallback: '/images/banner-4.jpeg',
    alt: 'Chinmaya Vidyalaya Tarapur - Science & STEM Stream Banner',
    title: 'Senior Secondary • Science & STEM Stream',
    subtitle: 'Advanced laboratories, experiential physics, chemistry, biology, and competitive entrance mentoring.',
    tag: 'DISCOVERY & RESEARCH • CBSE STEM',
  },
];

export const AcademicStreamCarouselBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-play interval (5.5s)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section 
      id="banner-stream-carousel"
      className="w-full bg-[#FAF8F5] relative py-4 sm:py-6 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Academic Stream Highlights Carousel"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Carousel Container */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl border border-[#E5E0D5] bg-[#10141A] aspect-[21/9] min-h-[240px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[500px]">
          
          {CAROUSEL_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
                aria-hidden={!isActive}
              >
                {/* Banner Image */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center select-none"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== slide.fallback) {
                      target.src = slide.fallback;
                    }
                  }}
                />

                {/* Subtle protective bottom vignette overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Overlay Caption & Stream Badges */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 flex flex-col justify-end text-white z-20 pointer-events-none">
                  <div className="max-w-3xl space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB740]" />
                      <span>{slide.tag}</span>
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
                      {slide.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 max-w-2xl font-sans [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Controls: Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous stream banner slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Controls: Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next stream banner slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-4 sm:bottom-6 right-5 sm:right-8 z-30 flex items-center gap-2">
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-8 h-2.5 bg-[#DF711B]' 
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/90'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export const SecondaryAcademicBanner: React.FC = () => {
  const bannerSrc = '/images/file_00000000129882308ffa3f6b1a6bab51.png';
  const fallbackSrc = '/images/file_00000000129882308ffa3f6b1a6bab51.jpg';

  return (
    <section 
      id="banner-secondary-feature"
      className="w-full bg-[#FAF8F5] relative py-4 sm:py-6 overflow-hidden"
      aria-label="Featured Campus and Academic Banner"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Image Container */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl border border-[#E5E0D5] bg-[#14181F] aspect-[21/9] min-h-[220px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[480px]">
          <img
            src={bannerSrc}
            alt="Chinmaya Vidyalaya Tarapur - Campus and Academic Excellence Feature Banner"
            className="w-full h-full object-cover object-center select-none"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== fallbackSrc) {
                target.src = fallbackSrc;
              }
            }}
          />

          {/* Subtle natural lighting gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Bottom Accent Detail */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 flex flex-col justify-end text-white z-10 pointer-events-none">
            <div className="max-w-2xl space-y-1.5">
              <span className="inline-block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FFB740]">
                CHINMAYA VIDYALAYA TARAPUR • CO-CURRICULAR & SCHOLASTIC EXCELLENCE
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
                Igniting Passion. Inspiring Purpose.
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
