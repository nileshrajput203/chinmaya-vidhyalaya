import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface BentoTile {
  id: string;
  type: 'cutout' | 'photo' | 'feature';
  src?: string;
  alt?: string;
  colSpanClass: string;
  rowSpanClass: string;
}

export interface TabData {
  id: string;
  prefix: string;
  keyword: string;
  featureTitle: string;
  featureSubtitle: string;
  href: string;
  tiles: BentoTile[];
}

const BENTO_TILES: BentoTile[] = [
  // Row 1: Col 1 (tall tile 2 rows), Cols 2-3 (feature 2 cols), Col 4 (photo 1 col) -> 4 cols
  {
    id: 'tile-1',
    type: 'photo',
    src: '/images/pages/home/bento/tile-01-academics.jpg',
    alt: 'Academic Research & Compound Microscopy Laboratory',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-2'
  },
  {
    id: 'tile-2',
    type: 'feature',
    colSpanClass: 'col-span-2',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-3',
    type: 'photo',
    src: '/images/pages/home/bento/tile-03-optics-lab.jpg',
    alt: 'Physics Optics Laboratory Experiment',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  // Row 2: (Col 1 taken by tile-1), Col 2 (photo), Col 3 (photo), Col 4 (photo) -> 4 cols
  {
    id: 'tile-4',
    type: 'photo',
    src: '/images/pages/home/bento/tile-04-smart-class.jpg',
    alt: 'Smart Digital Interactive Classroom',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-5',
    type: 'photo',
    src: '/images/pages/home/bento/tile-05-library.jpg',
    alt: 'Central Reference Library and Scholastic Lounge',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-6',
    type: 'photo',
    src: '/images/pages/home/bento/tile-06-olympiad.jpg',
    alt: 'Mathematics Olympiad & Analytical Drill',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  // Row 3: Col 1 (photo), Col 2 (photo), Cols 3-4 (photo wide 2 cols) -> 4 cols
  {
    id: 'tile-7',
    type: 'photo',
    src: '/images/pages/home/bento/tile-07-seminar.jpg',
    alt: 'Collaborative Seminars & Class Discussion',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-8',
    type: 'photo',
    src: '/images/pages/home/bento/tile-08-cultural.jpg',
    alt: 'Cultural Heritage & Creative Expression',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-9',
    type: 'photo',
    src: '/images/pages/home/bento/tile-09-exam-focus.jpg',
    alt: 'Scholastic Examination Hall & Student Focus',
    colSpanClass: 'col-span-2',
    rowSpanClass: 'row-span-1'
  },
  // Row 4: Col 1 (photo), Cols 2-3 (photo wide 2 cols), Col 4 (photo) -> 4 cols
  {
    id: 'tile-10',
    type: 'photo',
    src: '/images/pages/home/bento/tile-10-stem-robotics.jpg',
    alt: 'STEM Electronics & Hardware Robotics Workstation',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-11',
    type: 'photo',
    src: '/images/pages/home/bento/tile-11-it-lab.jpg',
    alt: 'Modern IT Laboratory & Coding Stations',
    colSpanClass: 'col-span-2',
    rowSpanClass: 'row-span-1'
  },
  {
    id: 'tile-12',
    type: 'photo',
    src: '/images/chinmaya/academics/classroom_learning_003.jpg',
    alt: 'Faculty Mentorship & Smart Classroom Learning',
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1'
  }
];

export const ExperienceBentoGrid: React.FC = () => {
  return (
    <section
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="w-full py-20 lg:py-28 select-none border-t border-[var(--color-border)]"
    >
      {/* ------------------------------------------------------------------
          HEADING (CENTERED)
          ------------------------------------------------------------------ */}
      <div className="text-center mb-10 lg:mb-14 px-4">
        <p
          style={{ color: 'var(--color-text)' }}
          className="text-base sm:text-lg lg:text-xl uppercase font-bold tracking-[0.25em] font-sans"
        >
          EXPERIENCE
        </p>
        <h2
          style={{ color: 'var(--color-primary)' }}
          className="text-2xl xs:text-3xl sm:text-5xl lg:text-[clamp(32px,5.5vw,84px)] font-display font-black uppercase tracking-tight leading-[0.95] mt-1"
        >
          CHINMAYA VIDYALAYA
        </h2>
      </div>

      {/* ------------------------------------------------------------------
          BENTO GRID CONTAINER (~84% of viewport width, 4 columns, tight dense packing)
          ------------------------------------------------------------------ */}
      <div className="w-[94%] sm:w-[90%] xl:w-[84%] max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 [grid-auto-flow:dense] gap-4 auto-rows-[220px] sm:auto-rows-[240px] xl:auto-rows-[260px]"
        >
          {BENTO_TILES.map((tile) => {
            if (tile.type === 'feature') {
              return (
                <div
                  key={tile.id}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-text)'
                  }}
                  className={`
                    ${tile.colSpanClass} ${tile.rowSpanClass}
                    p-5 sm:p-8 lg:p-10 flex flex-col justify-between rounded-none shadow-sm relative overflow-hidden group
                  `}
                >
                  <div>
                    <p className="text-white/80 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold mb-1">
                      EXPLORE
                    </p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-white leading-tight mt-1">
                      ACADEMICS & LIFE
                    </h3>
                  </div>

                  <div className="pt-6">
                    <a
                      href="/academics"
                      style={{
                        backgroundColor: 'var(--color-dark)',
                        color: 'var(--color-dark-text)'
                      }}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-none uppercase font-bold text-xs sm:text-sm tracking-wider transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    >
                      <span>DISCOVER MORE</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            }

            // Authentic School Photo Tile without any caption badges
            return (
              <div
                key={tile.id}
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-dark)'
                }}
                className={`
                  ${tile.colSpanClass} ${tile.rowSpanClass}
                  relative rounded-none overflow-hidden group border
                `}
              >
                <img
                  src={tile.src}
                  alt={tile.alt || 'Chinmaya Vidyalaya Campus Activity'}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark vignette on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
