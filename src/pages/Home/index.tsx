import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  X, Image as ImageIcon,
  Sparkles, Phone, ArrowRight
} from 'lucide-react';
import { OFFICIAL_PRINCIPAL_INFO } from '../../data/school';
import { SCHOOL_IMAGES } from '../../data/images';
import { BLOG_POSTS } from '../../data/blog';
import { QuickAdmissionDrawer } from '../../components/common/QuickAdmissionDrawer';
import Faq05 from '@/components/ui/faq-05';
import MarqueeAlongSvgPathDemo from '@/components/ui/demo';
import { soundFx } from '../../utils/audio';
import { HorizontalPanelGallery } from '../../components/home/HorizontalPanelGallery';
import { NoticeEventBoard } from '../../components/home/NoticeEventBoard';
import { HeroScrollytellingFilm } from '../../components/home/HeroScrollytellingFilm';
import { BannerCarousel } from '../../components/home/BannerCarousel';

gsap.registerPlugin(ScrollTrigger);

const GUIDING_QUOTES = [
  {
    id: 'swami-1',
    quote: '"Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami.jpeg',
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
    image: '/images/swami.jpeg',
    label: 'GURUDEV ON GIVING',
  },
  {
    id: 'swami-4',
    quote: '"What you have is His gift to you. What you do with what you have is your gift to Him."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami.jpeg',
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
    image: '/images/swami.jpeg',
    label: 'ON SELF-DISCIPLINE',
  },
  {
    id: 'swami-7',
    quote: '"The world is a great university. Life is the greatest teacher. But without a guru, how will the student know what to study?"',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami.jpeg',
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
    image: '/images/swami.jpeg',
    label: 'ON HAPPINESS',
  },
  {
    id: 'swami-10',
    quote: '"Your real wealth is what you are, not what you have."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/swami.jpeg',
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
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState<boolean>(false);
  const [activeQuote, setActiveQuote] = useState<number>(0);

  // GSAP Animation References
  const homeWrapperRef = useRef<HTMLDivElement>(null);
  const pillarPreviewRef = useRef<HTMLDivElement>(null);

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

  // Handle interactive pillar selection with GSAP transition & haptic chime
  const handleSelectPillar = (idx: number) => {
    if (idx === activePillar) return;
    setActivePillar(idx);
    soundFx.playChime(560 + idx * 40, 0.08);

    if (pillarPreviewRef.current) {
      gsap.fromTo(
        pillarPreviewRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      );
    }
  };

  // The Chinmaya Vision Program 4 Pillars
  const cvpPillars = [
    {
      num: "01",
      title: "Integrated Development",
      sanskrit: "Sharirik, Bauddhik & Manasik Vikas",
      desc: "Nurturing the complete fourfold personality of the child. Instilling physical vitality through yoga, mental stability through mindfulness, and sharp intellectual discernment through scientific inquiry.",
      tag: "Holistic Core",
      image: "/images/1.jpeg",
      targetUrl: "/features/holistic-development",
      ctaText: "EXPLORE HOLISTIC DEVELOPMENT",
      points: [
        "Daily Yoga, Pranayama & Surya Namaskar routine",
        "Experiential STEM laboratories & analytical inquiry",
        "Personalized mentoring with 1:25 teacher-student focus",
        "Sportsmanship, athletics & inter-house tournaments"
      ]
    },
    {
      num: "02",
      title: "Indian Culture & Ethos",
      sanskrit: "Bhartiya Sanskriti & Parampara",
      desc: "Immersing students in India's timeless philosophical heritage, Vedic principles, classical arts, festival celebrations, and daily Guru Paduka Pooja for moral rectitude.",
      tag: "Cultural Root",
      image: "/images/guru-paduka-pooja.webp",
      targetUrl: "/features/spiritual-activities",
      ctaText: "EXPLORE SPIRITUAL & CULTURAL ETHOS",
      points: [
        "Daily Guru Paduka Pooja for mental tranquility",
        "Annual Gita Chanting & Shloka recitation forum",
        "Matru-Pitru Pujan & Chinmaya Jayanti observances",
        "Linguistic depth in Sanskrit, Hindi, and Marathi"
      ]
    },
    {
      num: "03",
      title: "Patriotism & Civic Duty",
      sanskrit: "Rashtra Prem & Nagarik Kartavya",
      desc: "Fostering disciplined citizenship, national pride, environmental stewardship, and dedicated service toward societal progress without regional or communal bias.",
      tag: "National Duty",
      image: "/images/school_events/School_Event_2026-09-27_007.jpg",
      targetUrl: "/features/4-pillars#pillar-3",
      ctaText: "EXPLORE PATRIOTISM & CIVIC LIFE",
      points: [
        "Jal Pakhwada, tree plantation & green initiatives",
        "Elected Student Council & democratic house governance",
        "Celebration of Republic, Independence & Constitution Days",
        "Community outreach & civic responsibility drives"
      ]
    },
    {
      num: "04",
      title: "Universal Outlook",
      sanskrit: "Vasudhaiva Kutumbakam",
      desc: "Instilling broad-minded global empathy, respect for all faiths and cultures, ecological consciousness, and harmonious coexistence with the global community.",
      tag: "Global Vision",
      image: "/images/banner-8.webp",
      targetUrl: "/features/4-pillars#pillar-4",
      ctaText: "EXPLORE UNIVERSAL OUTLOOK",
      points: [
        "Universal prayer & inter-faith respect framework",
        "Global curriculum aligned with CBSE AISSE standards",
        "Ecological sustainability and green campus stewardship",
        "Compassion, world brotherhood, and ethical leadership"
      ]
    }
  ];

  // Gallery Visual Archive Preview
  const galleryItems = [
    { id: 1, src: SCHOOL_IMAGES.CAMPUS_HERO, title: "Campus Building & Courtyard", cat: "Campus Architecture", span: "md:col-span-8" },
    { id: 2, src: "/images/guru-paduka-pooja.webp", title: "Guru Paduka Pooja & Spiritual Assembly", cat: "Value Foundation", span: "md:col-span-4" },
    { id: 3, src: "/images/CHEM1.jpeg", title: "Chemistry Lab", cat: "Science & Discovery", span: "md:col-span-4" },
    { id: 4, src: SCHOOL_IMAGES.SPORTS_DAY, title: "Annual Athletic & Track Meet", cat: "Sports & Vitality", span: "md:col-span-4" },
    { id: 5, src: "/images/lib.jpg", title: "Central Library & Research Repository", cat: "Scholastic Sanctuary", span: "md:col-span-4" },
  ];

  return (
    <div ref={homeWrapperRef} className="bg-[#FAF8F5] text-[#181C20] overflow-x-clip selection:bg-[#DF711B] selection:text-white font-sans">
      
      {/* ----------------------------------------------------
          SECTION 01 — MASTER SCROLLYTELLING CAMPUS FILM & NARRATIVE AXIS
         ---------------------------------------------------- */}
      <HeroScrollytellingFilm onOpenAdmissions={() => setIsAdmissionDrawerOpen(true)} />

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
      <section className="w-full bg-[#FAF8F5] relative overflow-hidden">
        <img 
          src="/file_00000000129882308ffa3f6b1a6bab51.png" 
          alt="Banner Image" 
          className="w-full h-auto object-cover block"
        />
      </section>

      {/* ----------------------------------------------------
          SECTION 03 — PRINCIPAL LEADERSHIP & DISTINCTION SPOTLIGHT
         ---------------------------------------------------- */}
      <section className="min-h-screen lg:h-screen flex items-center py-6 lg:py-8 bg-[#FAF8F5] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Principal Photo */}
            <div className="lg:col-span-5 relative editorial-reveal">
              <div className="bg-white p-2.5 border border-[#D5CEC2] shadow-sm">
                <div className="border border-[#E7E2D8] bg-[#FAF8F5] flex items-center justify-center min-h-[280px]">
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

              {/* Transparent Background Image (No Container) */}
              <div className="w-full flex items-center justify-start py-2">
                <div className="w-full h-72 sm:h-80 flex items-center justify-center relative">
                  {/* Transparent Cutout Image (When user uploads transparent PNG to /images/leadership-cutout.png) */}
                  <img
                    src="/images/leadership-cutout.png"
                    alt="Leadership Feature"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('leadership-transparent-placeholder');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                    className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-md"
                  />
                  
                  {/* Subtle placeholder guide (transparent background, no card/container box) */}
                  <div 
                    id="leadership-transparent-placeholder"
                    className="hidden w-full h-full flex-col items-center justify-center p-6 text-center space-y-2 border-2 border-dashed border-[#DF711B]/35 hover:border-[#DF711B]/60 transition-colors"
                  >
                    <ImageIcon className="w-10 h-10 text-[#DF711B]/50" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#181818] font-bold">
                      Transparent Background Image Placeholder
                    </span>
                    <span className="text-[11px] font-mono text-[#777777] max-w-md">
                      Upload your transparent image to <code className="text-[#DF711B] font-bold">/public/images/leadership-cutout.png</code>
                      <span className="block mt-0.5 text-[10px] text-[#999999]">(No container • image sits directly on background)</span>
                    </span>
                  </div>
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
      <MarqueeAlongSvgPathDemo />

      {/* ----------------------------------------------------
          SECTION 04 — FOUNDATIONAL MATRIX: CHINMAYA VISION PROGRAM (CVP)
         ---------------------------------------------------- */}
      <section className="py-8 lg:py-12 bg-[#F3EFE6] text-[#181C20] relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          {/* Section Header matching Section 02 Typography */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#D5CEC2] pb-3.5">
            <div className="space-y-1">
              <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                THE PEDAGOGIC ARCHITECTURE • CVP FRAMEWORK
              </span>
              <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[36px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                CHINMAYA VISION PROGRAM
              </h2>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#555555] max-w-md font-normal leading-relaxed m-0">
              Formulated under the sublime vision of Pujya Gurudev Swami Chinmayananda. A quadruple matrix engineered to awaken the fullest human potential.
            </p>
          </div>

          {/* Interactive 4 Pillars Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Pillar Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {cvpPillars.map((pillar, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectPillar(idx)}
                    onMouseEnter={() => handleSelectPillar(idx)}
                    className={`p-3 sm:p-3.5 rounded-none border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF7DF] border-[#DF711B] shadow-sm translate-x-1'
                        : 'bg-white border-[#D5CEC2] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`font-display text-[20px] sm:text-[22px] font-black ${isSelected ? 'text-[#DF711B]' : 'text-slate-400'}`}>
                          {pillar.num}
                        </span>
                        <div>
                          <h3 className="font-display text-[14px] sm:text-[15px] font-black text-[#181818] uppercase tracking-tight m-0">
                            {pillar.title}
                          </h3>
                          <span className="text-[9px] sm:text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-0.5">
                            {pillar.sanskrit}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={pillar.targetUrl}
                        onClick={(e) => e.stopPropagation()}
                        title={`Visit ${pillar.title}`}
                        className={`p-1.5 rounded transition-all ${
                          isSelected
                            ? 'text-white bg-[#DF711B]'
                            : 'text-slate-400 hover:text-[#DF711B] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Active Pillar Preview Card */}
            <div 
              ref={pillarPreviewRef}
              className="lg:col-span-7 bg-white text-[#181C20] rounded-none p-4 sm:p-4.5 shadow-sm border border-[#D5CEC2] flex flex-col space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-[#E7E2D8] pb-2">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#DF711B] font-bold block">
                      PILLAR {cvpPillars[activePillar].num} • {cvpPillars[activePillar].tag}
                    </span>
                    <h3 className="font-display text-[18px] sm:text-[20px] font-black text-[#181818] uppercase tracking-tight mt-0.5 m-0">
                      {cvpPillars[activePillar].title}
                    </h3>
                  </div>
                  <span className="font-serif italic text-[11px] text-[#555555] bg-[#F3EFE6] px-2.5 py-0.5 border border-[#D5CEC2]">
                    {cvpPillars[activePillar].sanskrit}
                  </span>
                </div>

                {/* Pillar Image Container */}
                <div className="relative w-full h-[175px] sm:h-[185px] lg:h-[190px] overflow-hidden border border-[#E7E2D8] bg-[#181818] group">
                  <img
                    key={cvpPillars[activePillar].image}
                    src={cvpPillars[activePillar].image}
                    alt={cvpPillars[activePillar].title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/95 uppercase tracking-wider bg-black/60 backdrop-blur-sm px-2 py-0.5 border border-white/20">
                      {cvpPillars[activePillar].tag}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#DF711B] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-0.5">
                      {cvpPillars[activePillar].num} / 04
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#E7E2D8] flex flex-wrap items-center justify-between gap-2">
                <Link
                  to={cvpPillars[activePillar].targetUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DF711B] hover:bg-[#C45B0E] text-[#FFFFFF] font-sans font-bold text-[11px] uppercase tracking-wider transition-colors shadow-sm select-none"
                >
                  <span className="text-[#FFB740] font-bold text-xs">›</span>
                  <span>{cvpPillars[activePillar].ctaText}</span>
                </Link>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <Link
                    to="/features/4-pillars"
                    className="text-[#181818] font-bold hover:text-[#DF711B] underline uppercase tracking-wider"
                  >
                    All 4 Pillars →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 05 — EXPLORE OUR LABORATORIES & SANCTUARIES
         ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] relative overflow-hidden">
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
                {/* Lab Image with subtle hover badge */}
                <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Floating Action Pill on Hover */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#0B1E34]/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                    <span>Inspect Lab Details</span>
                    <span className="text-[#FFB740]">›</span>
                  </div>
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
          SECTION 07 — VISUAL ARCHIVE & MASONRY EXHIBITION
         ---------------------------------------------------- */}
      <section className="min-h-screen lg:h-screen flex items-center py-6 lg:py-8 bg-[#FAF8F5] relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#E7E2D8] pb-3">
            <div className="space-y-1">
              <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                CAMPUS GALLERY • PHOTOGRAPHIC ARCHIVE
              </span>
              <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                MOMENTS OF LIFE AT CHINMAYA VIDYALAYA
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors select-none shrink-0"
            >
              <span className="text-[#FFB740] font-bold text-xs">›</span>
              <span>FULL PHOTOGRAPHIC ARCHIVE</span>
            </Link>
          </div>

          {/* Masonry Layout with Section 02 Hard Corners & Borders */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryImg(item.src)}
                className={`${item.span} group relative overflow-hidden border border-[#181818]/15 shadow-sm cursor-pointer h-48 sm:h-56 lg:h-64`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/90 via-[#181818]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                    {item.cat}
                  </span>
                  <h4 className="font-display font-black text-[16px] text-white uppercase tracking-tight mt-0.5 m-0">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#181C20]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryImg(null)}
          >
            <button 
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedGalleryImg} 
              alt="Enlarged Campus Visual" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/20 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          SECTION 07.5 — GUIDING VOICES CAROUSEL
         ---------------------------------------------------- */}
      <section className="py-6 sm:py-8 bg-[#FAF8F5] relative overflow-hidden">
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
                className="bg-white text-[#181C20] p-8 md:p-12 lg:p-16 border border-[#E7E2D8] shadow-sm flex flex-col md:flex-row items-center gap-8 lg:gap-12"
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
                  <span className="inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold bg-[#FAF3E8] px-3 py-1">
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
      <section className="py-12 sm:py-16 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E7E2D8]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#E7E2D8] pb-4">
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
                className="group bg-white rounded-2xl overflow-hidden border border-[#E7E2D8] hover:border-[#DF711B]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
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

      {/* Frequently Asked Questions Section on Home */}
      <Faq05 />

      {/* ====================================================
          ESCALATION SUPPORT CARD & STUDENT CUTOUT (Helpdesk & Inquiry)
         ==================================================== */}
      <section className="bg-[#FAF8F5] pb-20 sm:pb-28 pt-8 relative overflow-visible">
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



      {/* Quick Admission Drawer */}
      <QuickAdmissionDrawer
        isOpen={isAdmissionDrawerOpen}
        onClose={() => setIsAdmissionDrawerOpen(false)}
      />

    </div>
  );
};


