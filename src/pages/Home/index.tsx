import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, ChevronRight, X, 
  Download, BookOpen, GraduationCap,
  MapPin, FileText, Image as ImageIcon,
  Sparkles, Phone, ArrowRight
} from 'lucide-react';
import { OFFICIAL_PRINCIPAL_INFO } from '../../data/school';
import { SCHOOL_IMAGES } from '../../data/images';
import { contentService } from '../../services/contentService';
import { Notice } from '../../types/news';
import { QuickAdmissionDrawer } from '../../components/common/QuickAdmissionDrawer';
import Faq05 from '@/components/ui/faq-05';
import MarqueeAlongSvgPathDemo from '@/components/ui/demo';
import { soundFx } from '../../utils/audio';
import { HorizontalPanelGallery } from '../../components/home/HorizontalPanelGallery';
import { NoticeEventBoard } from '../../components/home/NoticeEventBoard';

gsap.registerPlugin(ScrollTrigger);

const GUIDING_QUOTES = [
  {
    id: 'swami-1',
    quote: '"Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission & Eternal Guide of Chinmaya Vidyalaya Tarapur',
    image: '/images/swami.jpeg',
    label: 'VISION OF PUJYA GURUDEV',
  },
  {
    id: 'swami-2',
    quote: '"The tragedy of human history is decreasing happiness in the midst of increasing comforts."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission & Eternal Guide of Chinmaya Vidyalaya Tarapur',
    image: '/images/swami_chinmayananda_cutout.png',
    label: 'WISDOM OF THE MASTER',
  },
  {
    id: 'swami-3',
    quote: '"When you give what you have, more will come to you. When you hold on to what you have, even that will go away from you."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission & Eternal Guide of Chinmaya Vidyalaya Tarapur',
    image: '/images/swami.jpeg',
    label: 'GURUDEV ON GIVING',
  },
  {
    id: 'principal-1',
    quote: '"Rooted in the Chinmaya Vision Programme, we integrate value education with academic distinction to prepare noble global citizens who dare to dream and develop new realities."',
    author: OFFICIAL_PRINCIPAL_INFO.name,
    role: 'Principal, Chinmaya Vidyalaya Tarapur',
    image: '/images/principal2.jpeg',
    label: "PRINCIPAL'S MESSAGE",
  },
];

export const HomePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState<boolean>(false);
  const [activeQuote, setActiveQuote] = useState<number>(0);

  // GSAP Animation References
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const pillarPreviewRef = useRef<HTMLDivElement>(null);

  // Load active notices from content service
  useEffect(() => {
    async function loadData() {
      const noticeList = await contentService.getNotices(3);
      setNotices(noticeList);
    }
    loadData();

    // GSAP Master Timeline & ScrollTrigger choreographies
    const ctx = gsap.context(() => {

      // Parallax scroll scrub on hero backdrop
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 20,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      // Kinetic masked headline reveal removed

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Guiding Voices Carousel auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % GUIDING_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = GUIDING_QUOTES[activeQuote];

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
      image: SCHOOL_IMAGES.CLASSROOM_LEARNING,
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
      image: SCHOOL_IMAGES.STUDENTS_ACTIVITY,
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
      image: SCHOOL_IMAGES.SPORTS_DAY,
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
    { id: 1, src: SCHOOL_IMAGES.CAMPUS_HERO, title: "Main Academic Complex & Courtyard", cat: "Campus Architecture", span: "md:col-span-8" },
    { id: 2, src: "/images/guru-paduka-pooja.webp", title: "Guru Paduka Pooja & Spiritual Assembly", cat: "Value Foundation", span: "md:col-span-4" },
    { id: 3, src: "/images/CHEM1.jpeg", title: "Chemistry & STEM Laboratory", cat: "Science & Discovery", span: "md:col-span-4" },
    { id: 4, src: SCHOOL_IMAGES.SPORTS_DAY, title: "Annual Athletic & Track Meet", cat: "Sports & Vitality", span: "md:col-span-4" },
    { id: 5, src: "/images/lib.jpg", title: "Central Library & Research Repository", cat: "Scholastic Sanctuary", span: "md:col-span-4" },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#181C20] overflow-hidden selection:bg-[#DF711B] selection:text-white font-sans">
      
      {/* ----------------------------------------------------
          SECTION 01 — MASTER EDITORIAL HERO (LUXURY ARCHITECTURAL)
         ---------------------------------------------------- */}
      <section 
        ref={heroRef}
        className="relative min-h-[92vh] lg:min-h-[98vh] flex items-center justify-center bg-[#FAF8F5] overflow-hidden pt-36 lg:pt-44 pb-20"
      >
        {/* Running Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={SCHOOL_IMAGES.CAMPUS_HERO}
            className="w-full h-full object-cover scale-105 will-change-transform pointer-events-none"
          >
            <source src="/videos/school-hero.mp4" type="video/mp4" />
          </video>
        </div>

      </section>

      {/* ----------------------------------------------------
          SECTION 02 — SCROLL-JACKED HORIZONTAL PANEL GALLERY
          Panel A: "WE VALUE" 4-Column Grid
          Panel B: "TARAPUR DISTRICT'S BEST CBSE SCHOOL" Studio Cutout
          Panel C: Campus Architectural Gallery Preview
         ---------------------------------------------------- */}
      <HorizontalPanelGallery />

      {/* ----------------------------------------------------
          SECTION 2.5 — PLAIN BANNER (IMAGE UPLOAD PENDING)
         ---------------------------------------------------- */}
      <section className="w-full bg-[#FAF8F5] relative overflow-hidden">
        <div className="w-full h-auto min-h-[200px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center bg-[#E5E5E5]">
          {/* Placeholder for the banner image to be uploaded later */}
          <span className="text-[#999999] font-mono text-sm uppercase tracking-widest">Banner Image Placeholder 1</span>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 2.6 — PLAIN BANNER 2 (IMAGE UPLOAD PENDING)
         ---------------------------------------------------- */}
      <section className="w-full bg-[#FAF8F5] relative overflow-hidden">
        <div className="w-full h-auto min-h-[200px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center bg-[#DFDFDF]">
          {/* Placeholder for the banner image to be uploaded later */}
          <span className="text-[#888888] font-mono text-sm uppercase tracking-widest">Banner Image Placeholder 2</span>
        </div>
      </section>



      {/* ----------------------------------------------------
          SECTION 03 — FOUNDATIONAL MATRIX: CHINMAYA VISION PROGRAM (CVP)
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
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#DF711B] translate-x-1' : 'text-slate-400'}`} />
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

              <div className="pt-2 border-t border-[#E7E2D8] flex items-center justify-between">
                <Link
                  to="/about/philosophy"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[10px] uppercase tracking-wider transition-colors select-none"
                >
                  <span className="text-[#FFB740] font-bold text-xs">›</span>
                  <span>COMPREHENSIVE CVP TREATISE</span>
                </Link>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#777777] uppercase tracking-wider">Chinmaya Mission Tarapur</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 04 — PRINCIPAL LEADERSHIP & DISTINCTION SPOTLIGHT
         ---------------------------------------------------- */}
      <section className="min-h-screen lg:h-screen flex items-center py-6 lg:py-8 bg-[#FAF8F5] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Principal Photo */}
            <div className="lg:col-span-5 relative editorial-reveal">
              <div className="bg-white p-2.5 border border-[#D5CEC2] shadow-sm">
                <div className="border border-[#E7E2D8] bg-[#FAF8F5] flex items-center justify-center min-h-[280px]">
                  <div className="p-5 text-center space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#DF711B] text-white flex items-center justify-center font-display font-black text-xl shadow-sm">
                      DM
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
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 border-2 border-dashed border-[#DF711B]/35 hover:border-[#DF711B]/60 transition-colors"
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

          {/* 2x2 Verified Chinmaya Vidyalaya Laboratories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                id: 'lab-physics',
                title: 'Physics & Optics Laboratory',
                image: '/images/phys.jpeg',
              },
              {
                id: 'lab-chemistry',
                title: 'Chemistry & STEM Laboratory',
                image: '/images/CHEM1.jpeg',
              },
              {
                id: 'lab-computer',
                title: 'Computer & Information Tech Lab',
                image: '/images/img2.jpg',
              },
              {
                id: 'lab-library',
                title: 'Central Knowledge & Research Library',
                image: '/images/lib.jpg',
              },
            ].map((card) => (
              <div
                key={card.id}
                className="rounded-[1.75rem] border-[3.5px] border-[#DF711B] bg-[#DF711B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Lab Image */}
                <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Solid Terracotta Banner */}
                <div className="bg-[#DF711B] text-white py-3.5 sm:py-4 px-6 relative flex items-center">
                  <p className="font-sans font-bold text-xs sm:text-sm text-white uppercase tracking-wider m-0 leading-tight">
                    {card.title} in Chinmaya Vidyalaya
                  </p>
                </div>
              </div>
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
          SECTION 06 — ACADEMIC REPOSITORY & VERIFIED PDF DOWNLOADS
         ---------------------------------------------------- */}
      <section className="min-h-screen lg:h-screen flex items-center py-6 lg:py-8 bg-[#FAF8F5] text-[#181C20] relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#E7E2D8] pb-3">
            <div className="space-y-1">
              <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                AUTHENTIC RESOURCES • ADMISSION SHELF
              </span>
              <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                DOWNLOADS & ACADEMIC CENTER
              </h2>
            </div>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors select-none shrink-0"
            >
              <span className="text-[#FFB740] font-bold text-xs">›</span>
              <span>VIEW ALL OFFICIAL PDFS</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Box 1: Registration Forms */}
            <div className="bg-white border border-[#E7E2D8] p-4 space-y-2.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#DF711B]/10 text-[#DF711B] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-display text-[16px] font-black text-[#181818] uppercase tracking-tight m-0">Admissions 2026-27</h3>
                <p className="text-[12px] sm:text-[13px] text-[#666666] font-normal leading-relaxed m-0">
                  Download official admission forms for Nursery, Kindergarten (KG), and Classes I to IX.
                </p>
              </div>
              <button
                onClick={() => setIsAdmissionDrawerOpen(true)}
                className="w-full py-2 bg-[#181818] hover:bg-[#DF711B] text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="text-[#FFB740] font-bold text-xs">›</span>
                <span>GET FORMS</span>
              </button>
            </div>

            {/* Box 2: Sample Papers Std 1 - 10 */}
            <div className="bg-white border border-[#E7E2D8] p-4 space-y-2.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#DF711B]/10 text-[#DF711B] flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-display text-[16px] font-black text-[#181818] uppercase tracking-tight m-0">Sample Papers</h3>
                <p className="text-[12px] sm:text-[13px] text-[#666666] font-normal leading-relaxed m-0">
                  Official CBSE pattern question papers for Standard 1 to Standard 10 board preparation.
                </p>
              </div>
              <Link
                to="/downloads/sample-papers"
                className="w-full py-2 bg-[#181818] hover:bg-[#DF711B] text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="text-[#FFB740] font-bold text-xs">›</span>
                <span>BROWSE PAPERS</span>
              </Link>
            </div>

            {/* Box 3: Evaluation III Papers */}
            <div className="bg-white border border-[#E7E2D8] p-4 space-y-2.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#DF711B]/10 text-[#DF711B] flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-display text-[16px] font-black text-[#181818] uppercase tracking-tight m-0">Evaluation III</h3>
                <p className="text-[12px] sm:text-[13px] text-[#666666] font-normal leading-relaxed m-0">
                  Evaluation III question papers for Standard 1, 2, 3, 4, and 5 formative assessment.
                </p>
              </div>
              <Link
                to="/downloads/evaluation-papers"
                className="w-full py-2 bg-[#181818] hover:bg-[#DF711B] text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="text-[#FFB740] font-bold text-xs">›</span>
                <span>VIEW STD 1-5 PAPERS</span>
              </Link>
            </div>

            {/* Box 4: CBSE SARAS Disclosures */}
            <div className="bg-white border border-[#E7E2D8] p-4 space-y-2.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#DF711B]/10 text-[#DF711B] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-display text-[16px] font-black text-[#181818] uppercase tracking-tight m-0">Public Disclosures</h3>
                <p className="text-[12px] sm:text-[13px] text-[#666666] font-normal leading-relaxed m-0">
                  Fire safety, structural stability, potable water test clearance, affiliation and NOC.
                </p>
              </div>
              <Link
                to="/about/mandatory-information"
                className="w-full py-2 bg-[#181818] hover:bg-[#DF711B] text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="text-[#FFB740] font-bold text-xs">›</span>
                <span>VIEW DISCLOSURES</span>
              </Link>
            </div>

          </div>

          {/* Active Notices & Circulars Row */}
          {notices.length > 0 && (
            <div className="pt-3 border-t border-[#E7E2D8] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase tracking-widest text-[#DF711B] font-bold text-[11px]">
                  Official Bulletin & Campus Circulars
                </span>
                <Link to="/news/circulars" className="text-[#555555] hover:text-[#DF711B] flex items-center gap-1 font-mono font-bold text-[11px]">
                  <span>VIEW ALL CIRCULARS</span>
                  <span className="text-amber-500 font-bold text-xs">›</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3 bg-white border border-[#E7E2D8] space-y-1 shadow-xs"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#777777]">
                      <span className="uppercase text-[#DF711B] font-bold">{notice.category}</span>
                      <span>{notice.date}</span>
                    </div>
                    <h4 className="font-display font-black text-[13px] text-[#181818] uppercase tracking-tight line-clamp-1 m-0">{notice.title}</h4>
                    <p className="text-[11px] text-[#666666] line-clamp-1 leading-normal font-normal m-0">{notice.summary}</p>
                    {notice.fileUrl && (
                      <a
                        href={notice.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-[#DF711B] hover:underline font-bold pt-0.5 uppercase tracking-wider"
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>DOWNLOAD DOCUMENT</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 06.5 — CAMPUS LIFE MARQUEE ALONG SVG PATH
         ---------------------------------------------------- */}
      <MarqueeAlongSvgPathDemo />

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
                MOMENTS OF LIFE AT CHINMAYA
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

          {/* Quote Carousel Card */}
          <div className="relative">
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
            {GUIDING_QUOTES.map((q, i) => (
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

      {/* Frequently Asked Questions Section on Home */}
      <Faq05 />

      {/* ====================================================
          ESCALATION SUPPORT CARD & STUDENT CUTOUT (Helpdesk & Inquiry)
         ==================================================== */}
      <section className="bg-[#FAF8F5] pb-16 sm:pb-24 pt-6 relative overflow-visible">
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
                  <span>Contact Admissions Desk</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>

            </div>
          </div>

          {/* Student Cutout on the Right with Question Mark on Head */}
          <div className="shrink-0 flex justify-center lg:justify-end items-end relative self-center lg:self-end">
            <div className="relative">
              {/* Subtle ambient light behind student */}
              <div className="absolute -inset-4 bg-gradient-to-t from-[#DF711B]/15 via-[#DF711B]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              <img
                src="/images/student_question_cutout.png"
                alt="Chinmaya Vidyalaya Student with Inquiry"
                className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto object-contain pointer-events-none relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 08 — MASTER FINAL CONVERSION BANNER (ADMISSIONS)
         ---------------------------------------------------- */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-[#DF711B] via-[#C45B0E] to-[#9C3E08] text-white relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 text-[11px] font-mono tracking-widest text-[#FFB740] uppercase font-bold border border-white/20">
            <GraduationCap className="w-4 h-4" />
            <span>SESSION 2026-27 ADMISSIONS OPEN</span>
          </div>

          <h2 className="font-display text-[40px] sm:text-[58px] lg:text-[68px] font-black text-white tracking-tight leading-[1.03] uppercase m-0">
            SHAPE A FUTURE OF <br />
            <span className="text-[#FFB740]">WISDOM AND DISTINCTION.</span>
          </h2>

          <p className="text-[16px] sm:text-[18px] text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Join the Chinmaya family in Boisar / Tarapur. Download application forms, schedule a campus visit, or connect with our academic admissions office today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setIsAdmissionDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#181818] text-[#DF711B] hover:text-white font-sans font-bold text-[12px] uppercase tracking-wider transition-colors shadow-lg"
            >
              <span className="text-[#DF711B] hover:text-white font-bold text-base">›</span>
              <span>APPLY ONLINE & DOWNLOAD FORMS</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/40 font-sans font-bold text-[12px] uppercase tracking-wider transition-colors"
            >
              <span className="text-[#FFB740] font-bold text-base">›</span>
              <span>CONTACT CAMPUS OFFICE</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/80">
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


