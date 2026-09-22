import React, { useState, useEffect } from 'react';

const BANNER_SLIDES = [
  { id: 1, src: '/1.jpeg', alt: 'Chinmaya Vidyalaya Campus Banner 1' },
  { id: 2, src: '/2.jpeg', alt: 'Chinmaya Vidyalaya Campus Banner 2' },
];

export const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#FAF8F5] relative overflow-hidden select-none">
      <div className="relative w-full aspect-[1600/419] overflow-hidden">
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
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
