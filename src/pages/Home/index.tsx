import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  X,
  Sparkles, Phone, ArrowRight, GraduationCap, MapPin
} from 'lucide-react';
import { OFFICIAL_PRINCIPAL_INFO } from '../../data/school';
import { BLOG_POSTS } from '../../data/blog';
import { QuickAdmissionDrawer } from '../../components/common/QuickAdmissionDrawer';
import Faq05 from '@/components/ui/faq-05';
import MarqueeAlongSvgPathDemo from '@/components/ui/marquee-demo';
import { HorizontalPanelGallery } from '../../components/home/HorizontalPanelGallery';
import { NoticeEventBoard } from '../../components/home/NoticeEventBoard';
import { ScrollExpandingMosaic } from '../../components/home/ScrollExpandingMosaic';
import { ExperienceBentoGrid } from '../../components/home/ExperienceBentoGrid';
import { ChinmayaVisionPillarsShowcase } from '../../components/home/ChinmayaVisionPillarsShowcase';
import { HeroScrollytellingFilm } from '../../components/home/HeroScrollytellingFilm';
import { MobileHeroSection } from '../../components/home/MobileHeroSection';
import { BannerCarousel } from '../../components/home/BannerCarousel';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

gsap.registerPlugin(ScrollTrigger);

const GUIDING_QUOTES = [
  {
    id: 'swami-1',
    quote: '"Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'VISION OF PUJYA GURUDEV',
  },
  {
    id: 'swami-2',
    quote: '"The tragedy of human history is decreasing happiness in the midst of increasing comforts."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'WISDOM OF THE MASTER',
  },
  {
    id: 'swami-3',
    quote: '"When you give what you have, more will come to you. When you hold on to what you have, even that will go away from you."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'GURUDEV ON GIVING',
  },
  {
    id: 'swami-4',
    quote: '"What you have is His gift to you. What you do with what you have is your gift to Him."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON PURPOSE',
  },
  {
    id: 'swami-5',
    quote: '"The mind is like a restless bird; the more it gets, the more it wants, and still remains unsatisfied."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON THE MIND',
  },
  {
    id: 'swami-6',
    quote: '"Be strict and eternally vigilant about the quality of your inner thoughts."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON SELF-DISCIPLINE',
  },
  {
    id: 'swami-7',
    quote: '"The world is a great university. Life is the greatest teacher. But without a guru, how will the student know what to study?"',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON LEARNING',
  },
  {
    id: 'swami-8',
    quote: '"In all adversities, there is always in its depth, a treasure of spiritual blessings secretly hidden."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON RESILIENCE',
  },
  {
    id: 'swami-9',
    quote: '"Happiness depends on what you can give, not on what you can get."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON HAPPINESS',
  },
  {
    id: 'swami-10',
    quote: '"Your real wealth is what you are, not what you have."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'ON TRUE WEALTH',
  },
  {
    id: 'principal-1',
    quote: '"Rooted in the Chinmaya Vision Programme, we integrate value education with academic distinction to prepare noble global citizens who dare to dream and develop new realities."',
    author: OFFICIAL_PRINCIPAL_INFO.name,
    role: 'Principal, Chinmaya Vidyalaya',
    image: '/images/principal-photo.jpg',
    label: "PRINCIPAL'S MESSAGE",
  },
];

// Shuffle utility for no-repeat quote display
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const SHUFFLED_QUOTES = shuffleArray(GUIDING_QUOTES);

export const HomePage: React.FC = () => {
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState<boolean>(false);
  const [activeQuote, setActiveQuote] = useState<number>(0);

  // Lock body/Lenis scrolling when enlarged gallery image is active
  useBodyScrollLock(!!selectedGalleryImg);

  // GSAP Animation References
  const homeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Master Timeline & ScrollTrigger choreographies
    const ctx = gsap.context(() => {
      // Scroll reveals for architectural sections
      gsap.utils.toArray<HTMLElement>('.editorial-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, homeWrapperRef);

    return () => ctx.revert();
  }, []);

  // Guiding Voices Carousel auto-rotation with no-repeat
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);
  useEffect(() => {
    if (isQuoteHovered) return;
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % SHUFFLED_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isQuoteHovered]);

  const currentQuote = SHUFFLED_QUOTES[activeQuote];

  return (
    <div ref={homeWrapperRef} className="bg-white text-[#181C20] overflow-x-clip selection:bg-[#DF711B] selection:text-white font-sans">
      
      {/* ----------------------------------------------------
          SECTION 01 — HERO SECTION
          Desktop (>= 1024px): Master Scrollytelling Film
          Mobile (< 1024px): School Campus Hero & 2x2 Stats Grid (Navkar-inspired)
         ---------------------------------------------------- */}
      <div className="hidden lg:block">
        <HeroScrollytellingFilm onOpenAdmissions={() => setIsAdmissionDrawerOpen(true)} />
      </div>

      <div className="block lg:hidden">
        <MobileHeroSection onOpenAdmissions={() => setIsAdmissionDrawerOpen(true)} />
      </div>

      {/* ----------------------------------------------------
          SECTION 02 — SCROLL-JACKED HORIZONTAL PANEL GALLERY
          Panel A: "WE VALUE" 4-Column Grid
          Panel B: "PALGHAR DISTRICT'S BEST CBSE SCHOOL" Studio Cutout
          Panel C: Campus Architectural Gallery Preview
         ---------------------------------------------------- */}
      <HorizontalPanelGallery />

      {/* ----------------------------------------------------
          SECTION 2.5 — BANNER CAROUSEL (1.jpeg & 2.jpeg)
         ---------------------------------------------------- */}
      <BannerCarousel />

      {/* ----------------------------------------------------
          SECTION 2.6 — BANNER IMAGE 2
         ---------------------------------------------------- */}
      <section className="w-full bg-white relative overflow-hidden">
        <img 
          src="/file_00000000129882308ffa3f6b1a6bab51.png" 
          alt="Banner Image" 
          className="w-full h-auto object-cover block"
        />
      </section>

      {/* ----------------------------------------------------
          SECTION 03 — PRINCIPAL LEADERSHIP & DISTINCTION SPOTLIGHT
         ---------------------------------------------------- */}
      <section className="min-h-screen lg:h-screen flex items-center py-6 lg:py-8 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Principal Photo */}
            <div className="lg:col-span-5 relative editorial-reveal">
              <div className="bg-white p-2.5 border border-slate-200 shadow-sm">
                <div className="border border-slate-200 bg-white flex items-center justify-center min-h-[280px]">
                  <div className="p-5 text-center space-y-3">
                    {/* Official Photograph of Principal Mam */}
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#DF711B] via-amber-300 to-[#DF711B] shadow-md shrink-0">
                      <img
                        src="/images/principal-photo.jpg"
                        alt={OFFICIAL_PRINCIPAL_INFO.name}
                        className="w-full h-full object-cover object-center rounded-full border-2 border-white shadow-xs"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-display font-black text-[19px] text-[#181818] uppercase tracking-tight m-0">
                        {OFFICIAL_PRINCIPAL_INFO.name}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                        {OFFICIAL_PRINCIPAL_INFO.designation} & Member of the Board
                      </p>
                      <p className="text-[11px] text-[#777777] font-sans">
                        Chinmaya Vidyalaya • Affiliation No: 1130058 (Code: 30040)
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#E7E2D8] space-y-0.5 text-[11px] font-mono text-[#555555]">
                      <div>Tel: <a href="tel:7775872266" className="text-[#DF711B] hover:underline font-bold">7775872266</a></div>
                      <div>Email: <a href="mailto:cv.principal@chinmayamission.com" className="text-[#DF711B] hover:underline font-bold">cv.principal@chinmayamission.com</a></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#DF711B] text-white text-center mt-2.5 space-y-0.5 shadow-sm">
                  <h3 className="font-display font-black text-[15px] text-white uppercase tracking-wider m-0">
                    {OFFICIAL_PRINCIPAL_INFO.name}
                  </h3>
                  <p className="text-[10px] text-[#FFF7DF] font-mono uppercase tracking-widest">
                    Educationist & Institutional Leader
                  </p>
                </div>
              </div>
            </div>

            {/* Principal Message & Honors */}
            <div className="lg:col-span-7 space-y-4 editorial-reveal">
              <div className="space-y-1">
                <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                  LEADERSHIP & DISTINCTION • PRINCIPAL'S DESK
                </span>
                <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-black text-[#181818] tracking-tight leading-[1.04] uppercase m-0">
                  GUIDED BY VISIONARY LEADERSHIP
                </h2>
              </div>

              {/* Leadership & Conference Facility Image */}
              <div className="w-full flex items-center justify-start py-2">
                <div className="w-full h-72 sm:h-80 flex items-center justify-center relative">
                  <picture className="h-full flex items-center justify-center">
                    <source srcSet="/images/board-conference-room.webp" type="image/webp" />
                    <img
                      src="/images/board-conference-room.png"
                      alt="Executive Boardroom & Leadership Suite"
                      className="max-h-full max-w-full object-contain rounded-sm shadow-md border border-slate-200 pointer-events-none"
                    />
                  </picture>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about/management"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors select-none"
                >
                  <span className="text-[#FFB740] font-bold text-xs">›</span>
                  <span>BOARD OF MANAGEMENT</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          CAMPUS LIFE PHOTOGRAPHIC MARQUEE STREAM
         ---------------------------------------------------- */}
      <div className="hidden md:block">
        <MarqueeAlongSvgPathDemo />
      </div>

      {/* ----------------------------------------------------
          SECTION 04 — FOUNDATIONAL MATRIX: CHINMAYA VISION PROGRAM (CVP)
         ---------------------------------------------------- */}
      <ChinmayaVisionPillarsShowcase />

      {/* ----------------------------------------------------
          SECTION 05 — EXPLORE OUR LABORATORIES & SANCTUARIES
         ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
              CAMPUS INFRASTRUCTURE • LEARNING SANCTUARIES
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-black text-[#181818] tracking-tight uppercase leading-none m-0">
              EXPLORE OUR LABORATORIES
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed m-0 pt-1">
              CBSE-compliant science laboratories, computer innovation centers, and scholastic resources designed for hands-on discovery, critical inquiry, and academic distinction.
            </p>
          </div>

          {/* 2x2 Verified Chinmaya Vidyalaya Laboratories Grid (Clickable to Infrastructure Page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                id: 'lab-physics',
                targetId: 'physics-lab',
                title: 'Physics Lab',
                image: '/images/phys.jpeg',
                tagline: 'CBSE Senior Secondary Optics, Mechanics & Circuits',
                to: '/academics/infrastructure#physics-lab',
              },
              {
                id: 'lab-chemistry',
                targetId: 'chemistry-lab',
                title: 'Chemistry Lab',
                image: '/images/CHEM1.jpeg',
                tagline: 'Analytical Titration, Reagents & Fume Hoods',
                to: '/academics/infrastructure#chemistry-lab',
              },
              {
                id: 'lab-biology',
                targetId: 'biology-lab',
                title: 'Biology Lab',
                image: '/images/biology-lab.jpg',
                tagline: 'Compound Microscopes, Specimen Archives & Histology',
                to: '/academics/infrastructure#biology-lab',
              },
              {
                id: 'lab-it',
                targetId: 'it-lab',
                title: 'IT Lab',
                image: '/images/it-lab.jpg',
                tagline: 'Networked Workstations, Python, Java & Cyber Labs',
                to: '/academics/infrastructure#it-lab',
              },
            ].map((card) => (
              <Link
                key={card.id}
                to={card.to}
                className="rounded-[1.75rem] border-[3.5px] border-[#DF711B] bg-[#DF711B] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1"
                title={`Explore ${card.title} Infrastructure and Apparatus`}
              >
                {/* Lab Image */}
                <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Solid Terracotta Banner with title & arrow */}
                <div className="bg-[#DF711B] text-white py-3.5 sm:py-4 px-6 relative flex items-center justify-between">
                  <div>
                    <p className="font-sans font-black text-sm sm:text-base text-white uppercase tracking-wider m-0 leading-tight">
                      {card.title}
                    </p>
                    <p className="font-sans text-[11px] text-amber-100/90 font-medium m-0 mt-0.5">
                      {card.tagline}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#DF711B] flex items-center justify-center transition-colors shrink-0 shadow-xs">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Action */}
          <div className="text-center pt-2">
            <Link
              to="/academics/infrastructure"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#181818] hover:bg-[#DF711B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm rounded-full"
            >
              <span>Explore All Labs & Campus Grounds</span>
              <span className="text-[#FFB740] font-bold text-sm">›</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 05.5 — LIVE NOTICE & EVENT BOARD
         ---------------------------------------------------- */}
      <NoticeEventBoard />

      {/* ----------------------------------------------------
          SECTION 05.6 — SCROLL-EXPANDING MEDIA MOSAIC
         ---------------------------------------------------- */}
      <ScrollExpandingMosaic />

      {/* ----------------------------------------------------
          SECTION 05.7 — EXPERIENCE TABBED BENTO GRID
         ---------------------------------------------------- */}
      <ExperienceBentoGrid />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#181C20]/95 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain select-none"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={() => setSelectedGalleryImg(null)}
          >
            <button 
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedGalleryImg} 
              alt="Enlarged Campus Visual" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/20 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          SECTION 07.5 — GUIDING VOICES CAROUSEL
         ---------------------------------------------------- */}
      <section className="py-6 sm:py-8 bg-white relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          <div 
            className="relative"
            onMouseEnter={() => setIsQuoteHovered(true)}
            onMouseLeave={() => setIsQuoteHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="bg-white text-[#181C20] p-8 md:p-12 lg:p-16 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 lg:gap-12"
              >
                {/* Author Image */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 overflow-hidden border-2 border-[#DF711B]/40 shadow-sm shrink-0">
                  <img
                    src={currentQuote.image}
                    alt={currentQuote.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quote Content */}
                <div className="space-y-4 text-center md:text-left flex-1">
                  <span className="inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold bg-amber-50 border border-amber-200/60 px-3 py-1">
                    {currentQuote.label}
                  </span>

                  <blockquote className="font-display text-[18px] sm:text-[22px] lg:text-[26px] font-black text-[#181818] uppercase tracking-tight leading-snug m-0">
                    {currentQuote.quote}
                  </blockquote>

                  <div className="space-y-0.5">
                    <p className="text-sm sm:text-base text-[#181818] font-bold font-mono m-0">
                      — {currentQuote.author}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#777777] font-normal uppercase tracking-wider font-mono m-0">
                      {currentQuote.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-3">
            {SHUFFLED_QUOTES.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setActiveQuote(i)}
                className={`transition-all duration-300 ${
                  i === activeQuote
                    ? 'w-8 h-2 bg-[#DF711B] rounded-full'
                    : 'w-2 h-2 bg-[#D5CEC2] rounded-full hover:bg-[#DF711B]/50'
                }`}
                aria-label={`View quote ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 07.8 — FROM OUR BLOG & EDUCATIONAL INSIGHTS
         ---------------------------------------------------- */}
      {BLOG_POSTS.length > 0 && (
        <section className="py-12 sm:py-16 bg-white relative overflow-hidden border-t border-slate-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                  THOUGHT LEADERSHIP • EDUCATIONAL PERSPECTIVES
                </span>
                <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[40px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                  FROM OUR SCHOOL BLOG & INSIGHTS
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors select-none shrink-0"
              >
                <span className="text-[#FFB740] font-bold text-xs">›</span>
                <span>EXPLORE ALL ARTICLES</span>
              </Link>
            </div>

            {/* 3 Featured Blog Articles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog?post=${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#DF711B]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2.5 right-3.5 text-[10.5px] font-mono text-slate-200">
                      <span>{post.publishDate}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-cinzel text-base font-bold text-[#0B1E34] group-hover:text-[#DF711B] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#DF711B]/40 shrink-0"
                        />
                        <span className="text-[11px] font-bold text-[#0C1E34] truncate">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#DF711B] group-hover:translate-x-1 transition-transform flex items-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Frequently Asked Questions Section on Home */}
      <Faq05 />

      {/* ====================================================
          ESCALATION SUPPORT CARD & STUDENT CUTOUT (Helpdesk & Inquiry)
         ==================================================== */}
      <section className="hidden md:block bg-white pb-20 sm:pb-28 pt-8 relative overflow-visible">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 lg:gap-8 relative">
          
          {/* Shifted Left Helpdesk Container */}
          <div className="flex-1 w-full p-1 sm:p-1.5 rounded-3xl bg-[#0B1D30]/10 border border-[#DF711B]/30 shadow-2xl">
            <div className="bg-gradient-to-br from-[#0B1D30] to-[#162E4A] text-white p-6 sm:p-8 md:p-9 rounded-[calc(1.5rem-0.375rem)] flex flex-col xl:flex-row items-center justify-between gap-6">
              
              <div className="space-y-3 text-center xl:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF711B]/20 text-[#DF711B] text-xs font-mono font-bold uppercase tracking-widest border border-[#DF711B]/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dedicated Administrative Helpdesk</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
                  Have a unique query not covered here?
                </h3>
                <p className="text-sm sm:text-base text-slate-300/85 max-w-lg font-normal leading-relaxed">
                  Our admissions counselors, student coordinators, and principal desk at Vidyanagar, Boisar are ready to assist you.
                </p>
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 text-xs font-mono text-slate-300 pt-1">
                  <a href="tel:9322054713" className="flex items-center gap-1.5 hover:text-[#DF711B] transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
                    <span>+91 9322054713 / 9823517700</span>
                  </a>
                  <span>•</span>
                  <span>Mon – Sat: 8:30 AM – 3:30 PM</span>
                </div>
              </div>

              {/* Button-in-Button Trailing Icon CTA */}
              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                >
                  <span>Contact Administration</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>

            </div>
          </div>

          {/* Student Cutout on the Right with Question Mark on Head */}
          <div className="shrink-0 flex justify-center lg:justify-end items-end relative self-center lg:self-end pb-3 sm:pb-4">
            <div className="relative">
              {/* Subtle ambient light behind student */}
              <div className="absolute -inset-4 bg-gradient-to-t from-[#DF711B]/15 via-[#DF711B]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              <img
                src="/images/student_question_cutout.png"
                alt="Chinmaya Vidyalaya Student with Inquiry"
                className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto object-contain pointer-events-none relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out origin-bottom"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 08 — MASTER FINAL CONVERSION BANNER (ADMISSIONS)
         ---------------------------------------------------- */}
      <section className="hidden md:block py-20 sm:py-28 bg-gradient-to-br from-[#DF711B] via-[#C45B0E] to-[#9C3E08] text-white relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-7 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 text-[11px] font-mono tracking-widest text-[#FFB740] uppercase font-bold border border-white/20 rounded-full">
            <GraduationCap className="w-4 h-4" />
            <span>SESSION 2026-27 ADMISSIONS OPEN</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
            SHAPE A FUTURE OF <br />
            <span className="text-[#FFB740]">WISDOM AND DISTINCTION.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Join the Chinmaya Vidyalaya family in Boisar / Tarapur. Download application forms, schedule a campus visit, or connect with our academic admissions office today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsAdmissionDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#181C20] text-[#DF711B] hover:text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              <span className="text-[#DF711B] font-bold text-sm">›</span>
              <span>APPLY ONLINE & DOWNLOAD FORMS</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/40 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              <span className="text-[#FFB740] font-bold text-sm">›</span>
              <span>CONTACT CAMPUS OFFICE</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFB740]" />
              P-201 MIDC Area, Boisar 401501
            </span>
            <span>•</span>
            <span>Tel: 9322054713 / 9823517700</span>
            <span>•</span>
            <span>cvtarapur@chinmayamission.com</span>
          </div>
        </div>
      </section>



      {/* Quick Admission Drawer */}
      <QuickAdmissionDrawer
        isOpen={isAdmissionDrawerOpen}
        onClose={() => setIsAdmissionDrawerOpen(false)}
      />

    </div>
  );
};


