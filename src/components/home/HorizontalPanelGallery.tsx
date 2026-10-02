import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';
import { SCHOOL_IMAGES } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalPanelGallery: React.FC = () => {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const pinSpacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable scroll-jacked horizontal hijack on desktops / tablets (>= 992px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      const track = trackRef.current;
      const pinWrap = pinWrapRef.current;
      const pinSpacer = pinSpacerRef.current;

      if (!track || !pinWrap || !pinSpacer) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrap,
          start: 'top top',
          end: () => '+=' + getScrollDistance(),
          scrub: 0.3,
          pin: pinSpacer,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const slideNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  const valuesData = [
    {
      num: '01',
      title: 'CURIOSITY',
      desc: 'Embrace lifelong learning & inquiry',
      image: SCHOOL_IMAGES.SCIENCE_LAB,
      link: '/academics/curriculum',
    },
    {
      num: '02',
      title: 'INTEGRITY',
      desc: 'Rooted in timeless Vedic character',
      image: '/images/guru-paduka-pooja.webp',
      link: '/about/philosophy',
    },
    {
      num: '03',
      title: 'EXCELLENCE',
      desc: '100% AISSE board distinction standard',
      image: SCHOOL_IMAGES.CLASSROOM_LEARNING,
      link: '/about/history',
    },
    {
      num: '04',
      title: 'VITALITY',
      desc: 'Sportsmanship, athletics & vigor',
      image: SCHOOL_IMAGES.SPORTS_DAY,
      link: '/academics/co-curricular',
    },
  ];

  const col1Photos = [
    { src: SCHOOL_IMAGES.CAMPUS_BUILDING, title: 'Main Campus Building' },
    { src: SCHOOL_IMAGES.SCIENCE_LAB, title: 'STEM & Science Lab' },
    { src: '/images/chinmaya/sports/sports_athletic_meet_001.jpg', title: 'Track Championship' },
    { src: '/images/tour.webp', title: 'Educational Excursion' },
    { src: SCHOOL_IMAGES.PHYSICS_LAB, title: 'Physics Laboratory' },
    { src: SCHOOL_IMAGES.LIBRARY_STUDY, title: 'Central Library' },
    { src: SCHOOL_IMAGES.SPORTS_DAY, title: 'Annual Sports Meet' },
    { src: '/images/chinmaya-web-science.webp', title: 'Science Exhibition' },
  ];

  const col2Photos = [
    { src: SCHOOL_IMAGES.IT_LAB, title: 'Computer & Coding Lab' },
    { src: SCHOOL_IMAGES.BIOLOGY_LAB, title: 'Biology & Life Sciences' },
    { src: '/images/banner-9.webp', title: 'Cultural Fest Stage' },
    { src: '/images/guru-paduka-pooja.webp', title: 'Guru Paduka Pooja' },
    { src: SCHOOL_IMAGES.CLASSROOM_LEARNING, title: 'Smart Interactive Classes' },
    { src: '/images/chinmaya/cultural/cultural_celebration_015.jpg', title: 'Performing Arts' },
    { src: '/images/chinmaya/cultural/cultural_celebration_040.jpg', title: 'Youth Choir' },
    { src: '/images/chinmaya/leadership/faculty_member_01.jpg', title: 'Faculty & Mentors' },
  ];

  return (
    <div 
      ref={pinWrapRef} 
      className="pin-wrap relative w-full bg-[#FFFFFF]"
      style={{
        // Desktop height provides scroll runway for horizontal panels
      }}
    >
      <style>{`
        .font-pencil {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-weight: 700;
          font-style: italic;
        }
        @keyframes pencilBounce {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-3px) rotate(0.8deg); }
        }
        .animate-pencil-hint {
          animation: pencilBounce 3s ease-in-out infinite;
        }
        @keyframes wiggleArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-wiggle-arrow {
          animation: wiggleArrow 1.5s ease-in-out infinite;
        }
        @keyframes marqueeUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-up {
          animation: marqueeUp 24s linear infinite;
        }
        .animate-marquee-up-slow {
          animation: marqueeUp 32s linear infinite;
        }
        .animate-marquee-up:hover, .animate-marquee-up-slow:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div 
        ref={pinSpacerRef} 
        className="pin-spacer w-full overflow-hidden lg:h-screen lg:sticky lg:top-0"
      >
        <div 
          ref={trackRef} 
          className="track flex flex-col lg:flex-row flex-nowrap w-full lg:w-[200vw] will-change-transform"
        >
          {/* ============================================================
              PANEL A — "START STATE" (WE VALUE GRID)
              ============================================================ */}
          <section className="panel panel--values w-full lg:w-screen lg:h-screen shrink-0 bg-[#FFFFFF] flex flex-col justify-center px-[6%] lg:px-[8%] py-16 lg:py-10 border-b lg:border-b-0 lg:border-r border-[#E5E5E5] box-border relative">
            {/* Top-left Big Headline & Hand-Drawn Pencil Scroll Cue */}
            <div className="mb-6 lg:mb-8 shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold mb-2">
                  CORE FOUNDATION • CVP ETHOS
                </span>
                <h2 className="font-display text-[44px] sm:text-[54px] lg:text-[60px] xl:text-[64px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                  WE VALUE
                </h2>
              </div>

              {/* Hand-Drawn Pencil "Scroll to View" Callout */}
              <div
                onClick={slideNext}
                className="hidden lg:flex items-center gap-3.5 bg-[#FAF8F5] hover:bg-[#FAF3E8] border-2 border-dashed border-[#DF711B]/40 hover:border-[#DF711B] px-5 py-2.5 rounded-2xl shadow-xs transition-all duration-300 animate-pencil-hint select-none cursor-pointer group"
                title="Scroll down with mouse/trackpad to slide through panels (or click here)"
              >
                {/* Hand-drawn pencil sketch icon */}
                <div className="w-8 h-8 rounded-full bg-[#FAF3E8] border border-[#DF711B]/50 flex items-center justify-center text-[#DF711B] shrink-0 group-hover:rotate-12 transition-transform shadow-2xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 font-pencil text-2xl xl:text-3xl text-[#0B1D30] group-hover:text-[#DF711B] font-bold leading-none tracking-wide transition-colors">
                    <span>scroll to view</span>
                    <span className="text-[#DF711B] animate-wiggle-arrow">➔</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider mt-1 font-semibold">
                    (slides sideways through panels)
                  </span>
                </div>

                {/* Hand-drawn curvy pencil sketch arrow */}
                <svg className="w-12 h-6 text-[#DF711B] group-hover:translate-x-1.5 transition-transform" viewBox="0 0 80 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 5 18 Q 38 4, 68 15" strokeDasharray="3 2" />
                  <path d="M 58 7 L 72 15 L 60 23" />
                </svg>
              </div>
            </div>

            {/* 4-Column Equal-Width Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 w-full max-w-[1400px]">
              {valuesData.map((item) => (
                <div key={item.num} className="flex flex-col group">
                  {/* Large Numeral overlapping the photo top-left */}
                  <div className="relative mb-[-18px] z-10 pl-2">
                    <span className="font-display text-[46px] lg:text-[54px] font-black text-[#DF711B] leading-none tracking-tighter drop-shadow-sm select-none">
                      {item.num}
                    </span>
                  </div>

                  {/* Near-Square Photo (hard square corners, no border-radius) */}
                  <div className="w-full aspect-square bg-[#F0ECE1] overflow-hidden border border-[#181818]/10 shadow-xs relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                    />
                    <div className="absolute inset-0 bg-[#DF711B]/5 group-hover:opacity-0 transition-opacity" />
                  </div>

                  {/* Text Details Below Photo */}
                  <div className="pt-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-[22px] lg:text-[24px] xl:text-[26px] font-black text-[#DF711B] uppercase tracking-tight leading-tight m-0">
                        {item.title}
                      </h3>
                      <p className="text-[14px] lg:text-[15px] text-[#555555] font-normal leading-snug mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Small Solid-Black Rectangular Button with "›" glyph */}
                    <div className="pt-3">
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[11px] xl:text-[12px] uppercase tracking-wider transition-colors select-none"
                      >
                        <span className="text-[#FFB740] font-bold text-sm">›</span>
                        <span>LEARN MORE</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* ============================================================
              PANEL B — "END STATE" (ACHIEVEMENT + VERTICAL MOVING GALLERY)
              ============================================================ */}
          <section className="panel panel--award w-full lg:w-screen lg:h-screen shrink-0 bg-[#FFFFFF] flex flex-col lg:flex-row items-stretch border-b lg:border-b-0 box-border relative overflow-hidden">
            
            {/* ZONE A — LEFT (~26% width): Studio Backdrop & Cutout Composite Image */}
            <div className="w-full lg:w-[26%] xl:w-[25%] relative flex items-center justify-center min-h-[420px] lg:min-h-full overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
              <img 
                src="/images/panel_b_achiever_design.png" 
                alt="Chinmaya Vidyalaya Student Achiever Studio Design" 
                className="w-full h-full object-cover object-center relative z-10"
              />
            </div>

            {/* ZONE B — MIDDLE (~40% width): Typography, Stats & Text-Link Rule CTA */}
            <div className="w-full lg:w-[40%] xl:w-[39%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-14 py-10 lg:py-12 box-border border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
              <div className="max-w-[560px] space-y-5">
                
                {/* Small Eyebrow Line */}
                <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-display font-black text-[#DF711B] uppercase tracking-[0.2em] leading-tight">
                  THAT'S WHY FOR THREE DECADES IN A ROW, WE ARE
                </div>

                {/* Big Display Headline */}
                <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[46px] xl:text-[54px] font-black text-[#181818] tracking-tight leading-[1.05] uppercase m-0">
                  PALGHAR DISTRICT'S BEST CBSE SCHOOL
                </h2>

                {/* Supporting Body Paragraph */}
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#555555] font-normal leading-relaxed">
                  Imparting value-integrated academic brilliance at Tarapur under the aegis of the Chinmaya Vision Programme. Recognized by CBSE New Delhi (Affiliation No. {OFFICIAL_SCHOOL_INFO.affiliationNo}) with consecutive 100% AISSE board distinctions, modern STEM laboratories, and holistic spiritual grounding.
                </p>

                {/* Metrics Callout Strip */}
                <div className="grid grid-cols-3 gap-3 pt-2 pb-2 border-y border-[#E5E5E5]">
                  <div>
                    <span className="font-display text-[22px] lg:text-[28px] font-black text-[#DF711B] leading-none block">
                      100%
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      AISSE Pass
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[22px] lg:text-[28px] font-black text-[#DF711B] leading-none block">
                      30+
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      Years Legacy
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[22px] lg:text-[28px] font-black text-[#DF711B] leading-none block">
                      1:25
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      Mentor Ratio
                    </span>
                  </div>
                </div>

                {/* Text-Link CTA followed by thin horizontal rule ending in "+" icon */}
                <div className="pt-2">
                  <Link 
                    to="/about/history" 
                    className="group flex items-center justify-between gap-4 text-[#DF711B] hover:text-[#181818] transition-colors"
                  >
                    <span className="font-display text-[14px] lg:text-[15px] font-black uppercase tracking-wider shrink-0">
                      READ MORE
                    </span>
                    
                    {/* Thin Horizontal Rule */}
                    <div className="flex-1 h-[1px] bg-[#DF711B]/30 group-hover:bg-[#181818] transition-colors" />

                    {/* Small "+" Icon flush right */}
                    <div className="w-6 h-6 rounded-full border border-[#DF711B]/40 group-hover:border-[#181818] flex items-center justify-center shrink-0 transition-transform group-hover:rotate-90">
                      <Plus className="w-3.5 h-3.5 text-[#DF711B] group-hover:text-[#181818]" />
                    </div>
                  </Link>
                </div>

              </div>
            </div>

            {/* ZONE C — RIGHT (~34-36% width): VERTICAL MOVING UPWARD IMAGE GALLERY */}
            <div className="w-full lg:w-[34%] xl:w-[36%] h-[480px] lg:h-full bg-[#FAF8F5] relative overflow-hidden flex gap-3.5 p-3 sm:p-4 box-border">
              
              {/* Column 1 (Scrolls UP continuously) */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 flex flex-col gap-3.5 animate-marquee-up">
                  {[...col1Photos, ...col1Photos].map((photo, i) => (
                    <div 
                      key={`col1-${i}`}
                      className="group relative w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden rounded-xl border border-[#181818]/10 shadow-xs shrink-0"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 (Scrolls UP continuously at varied speed) */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 flex flex-col gap-3.5 animate-marquee-up-slow">
                  {[...col2Photos, ...col2Photos].map((photo, i) => (
                    <div 
                      key={`col2-${i}`}
                      className="group relative w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden rounded-xl border border-[#181818]/10 shadow-xs shrink-0"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Top & Bottom Fade Overlays for seamless loop */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

            </div>

          </section>

        </div>
      </div>
    </div>
  );
};
