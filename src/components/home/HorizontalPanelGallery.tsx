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
      link: '/activities/sports',
    },
  ];

  const sevenPhotos = [
    { src: SCHOOL_IMAGES.CAMPUS_BUILDING, title: 'Main Campus Building', category: 'Campus' },
    { src: SCHOOL_IMAGES.SCIENCE_LAB, title: 'STEM & Science Lab', category: 'Academics' },
    { src: '/images/img1.jpg', title: 'Student Activities', category: 'Student Life' },
    { src: '/images/tour.jpg', title: 'Educational Excursion', category: 'Tours' },
    { src: SCHOOL_IMAGES.PHYSICS_LAB, title: 'Physics Laboratory', category: 'Academics' },
    { src: SCHOOL_IMAGES.LIBRARY_STUDY, title: 'Central Library', category: 'Learning' },
    { src: SCHOOL_IMAGES.SPORTS_DAY, title: 'Annual Sports Meet', category: 'Athletics' },
  ];

  return (
    <div 
      ref={pinWrapRef} 
      className="pin-wrap relative w-full bg-[#FFFFFF]"
      style={{
        // Desktop height provides scroll runway for 3 panels
      }}
    >
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-up {
          animation: marqueeUp 22s linear infinite;
        }
        .animate-marquee-up-slow {
          animation: marqueeUp 30s linear infinite;
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
          className="track flex flex-col lg:flex-row flex-nowrap w-full lg:w-[260vw] xl:w-[250vw] will-change-transform"
        >
          {/* ------------------------------------------------------------
              PANEL A — "START STATE" (WE VALUE GRID)
              ------------------------------------------------------------ */}
          <section className="panel panel--values w-full lg:w-screen lg:h-screen shrink-0 bg-[#FFFFFF] flex flex-col justify-center px-[6%] lg:px-[8%] py-16 lg:py-10 border-b lg:border-b-0 lg:border-r border-[#E5E5E5] box-border">
            {/* Top-left Big Headline */}
            <div className="mb-6 lg:mb-8 shrink-0">
              <span className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold mb-2">
                CORE FOUNDATION • CVP ETHOS
              </span>
              <h2 className="font-display text-[44px] sm:text-[54px] lg:text-[60px] xl:text-[64px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                WE VALUE
              </h2>
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

          {/* ------------------------------------------------------------
              PANEL B — "END STATE" (ACHIEVEMENT / STUDIO CUTOUT PANEL)
              ------------------------------------------------------------ */}
          <section className="panel panel--award w-full lg:w-screen lg:h-screen shrink-0 bg-[#FFFFFF] flex flex-col lg:flex-row items-stretch border-b lg:border-b-0 lg:border-r border-[#E5E5E5] box-border relative overflow-hidden">
            
            {/* ZONE A — LEFT (~32% width): User Provided Studio Backdrop & Cutout Composite Image */}
            <div className="w-full lg:w-[32%] xl:w-[30%] relative flex items-center justify-center min-h-[500px] lg:min-h-full overflow-hidden shrink-0">
              <img 
                src="/images/panel_b_achiever_design.png" 
                alt="Chinmaya Vidyalaya Student Achiever Studio Design" 
                className="w-full h-full object-cover object-center relative z-10"
              />
            </div>

            {/* ZONE B — RIGHT (~60% width): Typography, Stats & Text-Link Rule CTA */}
            <div className="w-full lg:w-[60%] xl:w-[62%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-12 lg:py-16 box-border">
              <div className="max-w-[620px] space-y-6">
                
                {/* Small Eyebrow Line */}
                <div className="text-[13px] sm:text-[14px] lg:text-[15px] font-display font-black text-[#DF711B] uppercase tracking-[0.2em] leading-tight">
                  THAT'S WHY FOR THREE DECADES IN A ROW, WE ARE
                </div>

                {/* Big Display Headline (near-black #181818, heavy grotesk, tight line-height) */}
                <h2 className="font-display text-[38px] sm:text-[50px] lg:text-[58px] xl:text-[66px] font-black text-[#181818] tracking-tight leading-[1.04] uppercase m-0">
                  TARAPUR DISTRICT'S BEST CBSE SCHOOL
                </h2>

                {/* Supporting Body Paragraph (gray #555555 - #777777, ~18px) */}
                <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#555555] font-normal leading-relaxed max-w-[520px]">
                  Imparting value-integrated academic brilliance under the aegis of the Chinmaya Vision Programme. Recognized by CBSE New Delhi (Affiliation No. {OFFICIAL_SCHOOL_INFO.affiliationNo}) with consecutive 100% AISSE board distinctions, modern STEM laboratories, and holistic spiritual grounding.
                </p>

                {/* Metrics Callout Strip */}
                <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y border-[#E5E5E5]">
                  <div>
                    <span className="font-display text-[26px] lg:text-[32px] font-black text-[#DF711B] leading-none block">
                      100%
                    </span>
                    <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      AISSE Pass
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[26px] lg:text-[32px] font-black text-[#DF711B] leading-none block">
                      30+
                    </span>
                    <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      Years Legacy
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[26px] lg:text-[32px] font-black text-[#DF711B] leading-none block">
                      1:25
                    </span>
                    <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      Mentor Ratio
                    </span>
                  </div>
                </div>

                {/* Text-Link CTA followed by thin horizontal rule ending in "+" icon */}
                <div className="pt-4">
                  <Link 
                    to="/about/history" 
                    className="group flex items-center justify-between gap-4 text-[#DF711B] hover:text-[#181818] transition-colors"
                  >
                    <span className="font-display text-[15px] lg:text-[16px] font-black uppercase tracking-wider shrink-0">
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

            {/* Peeking sliver of Panel C on the right edge (~8% of width) with vertical moving photos */}
            <div className="hidden lg:flex w-[8%] xl:w-[8%] bg-[#FAF8F5] border-l border-[#E5E5E5] shrink-0 flex-col justify-center opacity-80 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 flex flex-col gap-2.5 animate-marquee-up p-2 pointer-events-none">
                {[...sevenPhotos, ...sevenPhotos].map((item, idx) => (
                  <div key={idx} className="w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden border border-[#181818]/10 shrink-0">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------
              PANEL C — "SIDE GALLERY" (7 PHOTOS CONTINUOUSLY SCROLLING UP)
              ------------------------------------------------------------ */}
          <section className="panel panel--gallery w-full lg:w-[68vw] xl:w-[62vw] lg:h-screen shrink-0 bg-[#FAF8F5] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 py-12 lg:py-0 box-border relative overflow-hidden">
            
            {/* Left Column: Heading & Information CTA */}
            <div className="w-full lg:w-[38%] py-8 lg:py-0 pr-0 lg:pr-6 shrink-0 space-y-5">
              <span className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                SIDE GALLERY • VIBRANT CAMPUS
              </span>
              <h3 className="font-display text-[32px] sm:text-[40px] lg:text-[44px] font-black text-[#181818] uppercase tracking-tight leading-tight m-0">
                LIFE AT CHINMAYA VIDYALAYA
              </h3>
              <p className="text-[15px] lg:text-[16px] text-[#555555] font-normal leading-relaxed">
                Take a glimpse into our vibrant daily atmosphere, featuring state-of-the-art laboratories, sports tournaments, cultural heritage, and holistic learning environments.
              </p>
              
              <div className="pt-2">
                <Link
                  to="/activities/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#DF711B] hover:bg-[#181818] text-[#FFFFFF] font-sans font-bold text-[12px] uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>EXPLORE FULL GALLERY</span>
                  <Plus className="w-4 h-4 text-amber-300" />
                </Link>
              </div>
            </div>

            {/* Right Column: 2-Column Vertical Scrolling Photo Wall (7 Photos Going UP Continuously) */}
            <div className="w-full lg:w-[60%] h-[500px] lg:h-screen relative overflow-hidden flex gap-4 p-2 lg:p-4">
              
              {/* Column 1 (Scrolls UP at standard speed) */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 flex flex-col gap-4 animate-marquee-up">
                  {[...sevenPhotos, ...sevenPhotos].map((photo, i) => (
                    <div 
                      key={`col1-${i}`}
                      className="group relative w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden border border-[#181818]/15 shadow-sm shrink-0"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB740] font-bold block">
                          {photo.category}
                        </span>
                        <h4 className="text-[13px] font-display font-bold text-white uppercase tracking-tight m-0">
                          {photo.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 (Scrolls UP at slightly offset speed & staggered order) */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 flex flex-col gap-4 animate-marquee-up-slow">
                  {/* Rotated array order for visual variety */}
                  {[...sevenPhotos.slice(3), ...sevenPhotos.slice(0, 3), ...sevenPhotos.slice(3), ...sevenPhotos.slice(0, 3)].map((photo, i) => (
                    <div 
                      key={`col2-${i}`}
                      className="group relative w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden border border-[#181818]/15 shadow-sm shrink-0"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB740] font-bold block">
                          {photo.category}
                        </span>
                        <h4 className="text-[13px] font-display font-bold text-white uppercase tracking-tight m-0">
                          {photo.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top & Bottom Fade Overlays for seamless aesthetic */}
              <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

            </div>

          </section>

        </div>
      </div>
    </div>
  );
};
