import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, FileText, Award, ShieldCheck, ChevronRight, X, 
  Sparkles, Download, BookOpen, Phone, CheckCircle2, GraduationCap
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO, OFFICIAL_PRINCIPAL_INFO } from '../../data/school';
import { SCHOOL_IMAGES } from '../../data/images';
import { contentService } from '../../services/contentService';
import { Notice } from '../../types/news';
import { QuickAdmissionDrawer } from '../../components/common/QuickAdmissionDrawer';
import { FaqSection } from '../../components/common/FaqSection';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activeFacility, setActiveFacility] = useState<number>(0);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState<boolean>(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const noticeList = await contentService.getNotices(3);
      setNotices(noticeList);
    }
    loadData();

    // Choreographed GSAP Hero Intro Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(heroEyebrowRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })
      .from(heroTitleRef.current?.querySelectorAll('.hero-line') || [], {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1
      }, '-=0.5')
      .from(heroDescRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from(heroCtaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7
      }, '-=0.5')
      .from(heroCardRef.current, {
        scale: 0.94,
        y: 30,
        opacity: 0,
        duration: 1.2
      }, '-=0.8');

      // Scroll reveals for editorial cards
      gsap.utils.toArray<HTMLElement>('.editorial-reveal').forEach((el) => {
        gsap.from(el, {
          y: 50,
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

  // The Chinmaya Vision Program 4 Pillars
  const cvpPillars = [
    {
      num: "01",
      title: "Integrated Development",
      subtitle: "Physical, Mental, Intellectual & Spiritual",
      desc: "Nurturing the fourfold personality of the child—instilling physical vitality through yoga, emotional balance, sharp analytical reasoning, and spiritual awakening.",
      tag: "Holistic Core",
      image: SCHOOL_IMAGES.CLASSROOM_LEARNING,
      points: [
        "Daily Yoga, Pranayama & Surya Namaskar",
        "Activity-oriented scientific inquiry",
        "Value-based education framework",
        "Personalized mentoring (max 40 per class)"
      ]
    },
    {
      num: "02",
      title: "Indian Culture",
      subtitle: "Ancient Heritage & Timeless Ethos",
      desc: "Immersing students in India's glorious philosophical heritage, Vedic wisdom, festival celebrations, and daily Guru Paduka Pooja.",
      tag: "Cultural Root",
      image: "/images/guru-paduka-pooja.webp",
      points: [
        "Daily Guru Paduka Pooja for peace & clarity",
        "Annual Gita Chanting Championship",
        "Matru-Pitru Pujan & Chinmaya Jayanti",
        "Sanskrit, Hindi & Marathi language studies"
      ]
    },
    {
      num: "03",
      title: "Patriotism",
      subtitle: "Devotion to Motherland & Civic Leadership",
      desc: "Fostering disciplined citizenship, national pride, environmental stewardship (Jal Pakhwada), and selfless service toward societal upliftment.",
      tag: "National Duty",
      image: SCHOOL_IMAGES.STUDENTS_ACTIVITY,
      points: [
        "Jal Pakhwada & Environmental campaigns",
        "Active student council & house governance",
        "Celebration of National Days & Constitution",
        "Community awareness & social initiatives"
      ]
    },
    {
      num: "04",
      title: "Universal Outlook",
      subtitle: "Vasudhaiva Kutumbakam & Global Mindset",
      desc: "Instilling broad-minded global empathy, respect for all faiths and cultures, ecological consciousness, and harmonious coexistence.",
      tag: "Global Vision",
      image: SCHOOL_IMAGES.SPORTS_DAY,
      points: [
        "Universal prayer & inter-faith harmony",
        "Global scientific & technological curriculum",
        "Ecological sustainability and green campus",
        "Empathy, compassion, and world brotherhood"
      ]
    }
  ];

  // Campus Facilities & Learning Sanctuaries
  const facilities = [
    {
      id: "fac-chem",
      title: "Chemistry & Sciences Lab",
      subtitle: "Hands-on Analytical Experimentation",
      description: "Dedicated, CBSE-compliant laboratory with safety fixtures, precision apparatus, and faculty-supervised experiment workstations.",
      image: "/images/CHEM1.jpeg",
      tag: "Science & Discovery",
      specs: "Fully Equipped • Individual Workstations • Safety Certified"
    },
    {
      id: "fac-phys",
      title: "Physics & Optics Lab",
      subtitle: "Conceptual Mechanics & Modern Physics",
      description: "Equipped with advanced optical benches, electrical circuit trainers, mechanics kits, and digital measurement tools.",
      image: "/images/phys.jpeg",
      tag: "STEM Innovation",
      specs: "Advanced Apparatus • Practical Demonstration • Project Hub"
    },
    {
      id: "fac-lib",
      title: "Central Smart Library",
      subtitle: "Sanctuary of Knowledge & Literature",
      description: "Vast repository of encyclopedias, reference textbooks, periodicals, fiction, and designated reading hours for students and parents.",
      image: "/images/lib.jpg",
      tag: "Research & Reading",
      specs: "Thousands of Titles • Quiet Study Lounge • Parent Timings"
    },
    {
      id: "fac-spiritual",
      title: "Spiritual Life & Assembly Hall",
      subtitle: "Daily Meditation & Guru Paduka Pooja",
      description: "Serene sanctum for daily morning prayers, monthly bhajan sessions on the 3rd Saturday, and satsangs with visiting Swamis.",
      image: "/images/guru-paduka-pooja.webp",
      tag: "Inner Awakening",
      specs: "Daily Pooja • Monthly Bhajans • Visiting Acharyas"
    },
    {
      id: "fac-sports",
      title: "Athletics & Sports Grounds",
      subtitle: "Endurance, Teamwork & Sportsmanship",
      description: "Spacious fields for football, cricket, volleyball, track events, and annual inter-house athletic championships.",
      image: SCHOOL_IMAGES.SPORTS_DAY,
      tag: "Physical Fitness",
      specs: "Full Athletic Track • Multi-Sport Field • Inter-House Leagues"
    },
    {
      id: "fac-tours",
      title: "Educational Tours & Industry Visits",
      subtitle: "Learning Beyond the Classroom Walls",
      description: "Regular study trips to Tarapur MIDC industrial plants, nuclear power stations, botanical gardens, and historical heritage sites.",
      image: "/images/tour.jpg",
      tag: "Experiential Learning",
      specs: "Annual Field Trips • Industrial Exposure • Nature Trails"
    }
  ];

  // Gallery Visual Archive Preview
  const galleryItems = [
    { id: 1, src: SCHOOL_IMAGES.CAMPUS_HERO, title: "Main Academic Complex", cat: "Campus Infrastructure", span: "md:col-span-8" },
    { id: 2, src: "/images/guru-paduka-pooja.webp", title: "Guru Paduka Pooja & Spiritual Assembly", cat: "Spiritual Values", span: "md:col-span-4" },
    { id: 3, src: "/images/CHEM1.jpeg", title: "Chemistry & STEM Laboratory", cat: "Academics", span: "md:col-span-4" },
    { id: 4, src: SCHOOL_IMAGES.SPORTS_DAY, title: "Annual Athletic & Sports Meet", cat: "Sports & Fitness", span: "md:col-span-4" },
    { id: 5, src: "/images/lib.jpg", title: "Central Library & Research Sanctuary", cat: "Knowledge Hub", span: "md:col-span-4" },
  ];

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] overflow-hidden selection:bg-[#D97745] selection:text-white">
      
      {/* ----------------------------------------------------
          SECTION 01 — MASTER EDITORIAL HERO (LUXURY ARCHITECTURAL)
         ---------------------------------------------------- */}
      <section 
        ref={heroRef}
        className="relative min-h-[86vh] lg:min-h-[92vh] flex items-center justify-center bg-[#0B1D30] text-white overflow-hidden"
      >
        {/* Background Visual Canvas with Subtle Parallax Depth */}
        <div className="absolute inset-0 z-0">
          <img
            src={SCHOOL_IMAGES.CAMPUS_HERO}
            alt="Chinmaya Vidyalaya Tarapur Main Campus"
            className="w-full h-full object-cover opacity-30 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D30]/95 via-[#0B1D30]/80 to-[#0B1D30]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D30] via-transparent to-[#0B1D30]/60" />
          {/* Noise texture */}
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Large Architectural Typography */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Eyebrow Stamp */}
              <div ref={heroEyebrowRef} className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/20 rounded-full text-[11px] font-mono tracking-widest text-[#D97745] uppercase font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>CBSE AFFILIATED NO. {OFFICIAL_SCHOOL_INFO.affiliationNo}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-widest hidden sm:inline">
                  ESTD. 1999 • BOISAR / TARAPUR
                </span>
              </div>

              {/* Main Headline with Split Mask Rise */}
              <h1 
                ref={heroTitleRef}
                className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-white"
              >
                <div className="text-mask">
                  <span className="hero-line block">WHERE WISDOM</span>
                </div>
                <div className="text-mask">
                  <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-[#D97745] via-[#F39C12] to-[#FADBD8]">
                    MEETS EXCELLENCE.
                  </span>
                </div>
              </h1>

              {/* Supporting Editorial Copy */}
              <p 
                ref={heroDescRef}
                className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-light font-sans"
              >
                Founded on the timeless philosophy of <strong className="text-white font-semibold">Swami Chinmayananda</strong>, Chinmaya Vidyalaya Tarapur blends modern CBSE academic rigor with character building, daily spiritual grounding, and personalized mentoring in Boisar.
              </p>

              {/* Action Buttons */}
              <div ref={heroCtaRef} className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsAdmissionDrawerOpen(true)}
                  data-cursor="APPLY"
                  className="group px-8 py-4 bg-[#D97745] hover:bg-[#C8652D] text-white font-bold text-xs uppercase tracking-widest transition-all rounded-full flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Admissions 2026-27</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                <Link
                  to="/about/history"
                  data-cursor="EXPLORE"
                  className="group px-7 py-4 bg-white hover:bg-slate-100 text-[#0B1D30] font-bold text-xs uppercase tracking-widest transition-all rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <span>Our Heritage</span>
                  <div className="w-7 h-7 rounded-full bg-[#0B1D30]/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0B1D30]" />
                  </div>
                </Link>

                <Link
                  to="/about/mandatory-information"
                  className="px-6 py-4 bg-[#122B48] hover:bg-[#183960] text-slate-200 hover:text-white font-mono text-xs rounded-full transition-all border border-[#1E436E] flex items-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#D97745]" />
                  <span>CBSE SARAS Disclosures</span>
                </Link>
              </div>
            </div>

            {/* Hero Right: Floating Architectural Institutional Badge Card */}
            <div ref={heroCardRef} className="lg:col-span-4">
              <div className="bg-[#FCFBF7]/95 backdrop-blur-lg text-[#181C20] p-7 rounded-3xl border border-white/40 shadow-float space-y-5">
                <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-3">
                  <div className="flex items-center gap-2">
                    <img src="/images/Chinmaya_Logo.webp" alt="Logo" className="w-7 h-7 object-contain" />
                    <span className="font-cinzel text-xs font-bold text-[#0B1D30] uppercase tracking-wider">
                      Vidyalaya At A Glance
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#D97745] font-bold bg-[#FAF3E8] px-2 py-0.5 rounded-full">
                    Co-Ed
                  </span>
                </div>

                <div className="space-y-3.5 text-xs font-sans">
                  <div className="flex justify-between items-center py-1 border-b border-[#E7E2D8]/60">
                    <span className="text-[#4A5568]">Affiliation No:</span>
                    <strong className="font-mono text-[#0B1D30] font-bold">{OFFICIAL_SCHOOL_INFO.affiliationNo}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E7E2D8]/60">
                    <span className="text-[#4A5568]">School Code:</span>
                    <strong className="font-mono text-[#0B1D30] font-bold">{OFFICIAL_SCHOOL_INFO.schoolCode}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E7E2D8]/60">
                    <span className="text-[#4A5568]">U-DISE Code:</span>
                    <strong className="font-mono text-[#0B1D30] font-bold">{OFFICIAL_SCHOOL_INFO.udiseNo}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E7E2D8]/60">
                    <span className="text-[#4A5568]">Class Capacity:</span>
                    <strong className="text-[#D97745] font-bold">Capped ≤ 40 Students</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#4A5568]">Governing Body:</span>
                    <strong className="text-[#0B1D30] font-semibold text-right">Chinmaya Mission</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsAdmissionDrawerOpen(true)}
                    className="w-full py-3 bg-[#0B1D30] hover:bg-[#D97745] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Download Registration Forms</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Announcement Marquee Ribbon */}
        <div className="absolute bottom-0 inset-x-0 bg-[#071320] border-t border-white/10 py-3 px-4 overflow-hidden z-20">
          <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs font-mono">
            <span className="bg-[#D97745] text-white px-2.5 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider shrink-0 animate-pulse">
              LATEST HIGHLIGHTS
            </span>
            <div className="truncate text-slate-300">
              ✦ Respected Principal Sri. B. Anilkumar appointed to Academic Assessment & Guidance Team (Chinmaya Education Cell) • 100% AISSE Class X Board Results • Evaluation III Papers Available (Classes 1 to 5) • Registration Open for Nursery to Std IX
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 02 — EDITORIAL HERITAGE & INSTITUTIONAL NARRATIVE
         ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#FCFBF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-8 editorial-reveal">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.25em] block">
                  INSTITUTIONAL HERITAGE
                </span>
                <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1D30] leading-[1.15] tracking-tight">
                  Started with 72 students <br />
                  <span className="italic font-serif font-normal text-[#D97745]">and four teachers.</span>
                </h2>
              </div>

              <div className="space-y-4 text-slate-600/90 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  Chinmaya Vidyalaya is affiliated to the CBSE Delhi Board. A school with a difference, it began its noble journey in Boisar/Tarapur with humble beginnings and has blossomed into a premier full-fledged educational institution.
                </p>
                <p>
                  Emulating the holistic vision of the illustrious founder, the Great Vedantic Master <strong className="text-[#0B1D30] font-semibold">Swami Chinmayananda</strong>, the Vidyalaya imparts a practical and judicious combination of academic excellence, extra-curricular pursuits, character building, and personality development.
                </p>
              </div>

              {/* Key Metric Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E7E2D8]">
                <div>
                  <span className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#0B1D30] block">100%</span>
                  <span className="text-xs text-slate-500 font-mono mt-1 block uppercase tracking-wider">AISSE Pass Rate</span>
                </div>
                <div>
                  <span className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#D97745] block">≤40</span>
                  <span className="text-xs text-slate-500 font-mono mt-1 block uppercase tracking-wider">Students / Class</span>
                </div>
                <div>
                  <span className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#0B1D30] block">25+</span>
                  <span className="text-xs text-slate-500 font-mono mt-1 block uppercase tracking-wider">Years Legacy</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about/history"
                  data-cursor="READ"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <span>Explore Institutional History</span>
                  <ArrowRight className="w-4 h-4 text-[#D97745] group-hover:text-white" />
                </Link>
              </div>
            </div>

            {/* Right Overlapping Layered Composition */}
            <div className="lg:col-span-6 relative editorial-reveal">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={SCHOOL_IMAGES.CAMPUS_BUILDING}
                  alt="Chinmaya Vidyalaya Academic Block"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0B1D30]/90 to-transparent text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D97745] block font-bold">
                    CAMPUS SANCTUARY
                  </span>
                  <p className="font-serif italic text-sm text-slate-200 mt-0.5">
                    Lush green, modern learning environment in Vidyanagar, Boisar
                  </p>
                </div>
              </div>

              {/* Overlapping Floating Emblem Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-[#E7E2D8] hidden sm:flex items-center gap-4 z-20">
                <img src="/images/Chinmaya_Logo.webp" alt="Emblem" className="w-12 h-12 object-contain" />
                <div>
                  <span className="font-cinzel font-bold text-xs text-[#0B1D30] block">Chinmaya Vision Program</span>
                  <span className="text-[11px] text-[#4A5568] font-mono">4 Holistic Dimensions</span>
                </div>
              </div>

              {/* Decorative Background Frame */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-[#F7F3EB] rounded-3xl -z-0 border border-[#E7E2D8] hidden sm:block" />
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 03 — CHINMAYA VISION PROGRAM (4 CORE PILLARS)
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#0B1D30] text-white relative overflow-hidden">
        {/* Background Mandala Watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97745]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/15 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.3em] block">
                FOUNDATIONAL PHILOSOPHY
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                Chinmaya Vision Program
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-300/80 max-w-md font-normal leading-relaxed">
              Formulated under the guidance of Pujya Gurudev Swami Chinmayananda to foster integrated growth and noble life values.
            </p>
          </div>

          {/* Interactive 4 Pillars Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Pillar Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {cvpPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  onMouseEnter={() => setActivePillar(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    activePillar === idx
                      ? 'bg-white/15 border-[#D97745] shadow-xl translate-x-2'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D97745]">
                        {pillar.num}
                      </span>
                      <div>
                        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                          {pillar.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-300/80 block mt-0.5">
                          {pillar.subtitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activePillar === idx ? 'text-[#D97745] translate-x-1' : 'text-white/30'}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Active Pillar Preview Card */}
            <div className="lg:col-span-7 bg-[#FCFBF7] text-[#181C20] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#E7E2D8] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider block">
                      Pillar {cvpPillars[activePillar].num} • {cvpPillars[activePillar].tag}
                    </span>
                    <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#0B1D30] mt-1">
                      {cvpPillars[activePillar].title}
                    </h3>
                  </div>
                  <span className="font-serif italic text-xs text-[#4A5568] bg-[#F7F3EB] px-3 py-1.5 rounded-full border border-[#E7E2D8]">
                    {cvpPillars[activePillar].subtitle}
                  </span>
                </div>

                <p className="text-base text-slate-600/90 leading-relaxed font-normal">
                  {cvpPillars[activePillar].desc}
                </p>

                {/* Key Points */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#0B1D30] font-bold block">
                    Key Institutional Implementations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cvpPillars[activePillar].points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#181C20] bg-[#F7F3EB] p-2.5 rounded-xl border border-[#E7E2D8]">
                        <CheckCircle2 className="w-4 h-4 text-[#D97745] shrink-0" />
                        <span className="font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E2D8] flex items-center justify-between">
                <Link
                  to="/about/philosophy"
                  className="px-5 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Read Full CVP Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-slate-400">Chinmaya Mission Tarapur</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 04 — PRINCIPAL LEADERSHIP & HONORS SPOTLIGHT
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#F7F3EB] border-y border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Principal Photo & Badges */}
            <div className="lg:col-span-5 relative editorial-reveal">
              <div className="bg-white p-3 rounded-3xl border border-[#E7E2D8] shadow-xl overflow-hidden">
                <img
                  src="/images/board-of-management/principal-b-anilkumar.webp"
                  alt="Principal Sri. B. Anilkumar"
                  className="w-full h-96 sm:h-[420px] object-cover object-top rounded-2xl"
                />
                <div className="p-4 bg-[#0B1D30] text-white text-center rounded-xl mt-3 space-y-1">
                  <h3 className="font-cinzel font-bold text-xl text-white leading-tight">
                    Sri. B. Anilkumar
                  </h3>
                  <p className="text-xs text-[#D97745] font-mono">
                    Principal & Academic Guide (Chinmaya Education Cell)
                  </p>
                </div>
              </div>
            </div>

            {/* Principal Message & Honors */}
            <div className="lg:col-span-7 space-y-6 editorial-reveal">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.25em] block">
                  LEADERSHIP & DISTINCTION
                </span>
                <h2 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#0B1D30] tracking-tight">
                  Guided by Visionary Leadership
                </h2>
              </div>

              <blockquote className="font-serif italic text-base sm:text-xl text-slate-700/90 leading-relaxed border-l-4 border-[#D97745] pl-6 py-3 bg-white/80 rounded-r-2xl">
                "{OFFICIAL_PRINCIPAL_INFO.message}"
              </blockquote>

              {/* Recognitions Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0B1D30] font-bold block">
                  National Honors & Institutional Appointments:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-sm flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#D97745] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1D30] block">Chinmaya Education Cell</strong>
                      <span className="text-[#4A5568]">Member of Academic Assessment & Guidance Team, Coimbatore</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-sm flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#D97745] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1D30] block">CBSE Inspection Committee</strong>
                      <span className="text-[#4A5568]">Member of Composite Provisional Affiliation Committee</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-sm flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#D97745] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1D30] block">Rajiv Gandhi Siromani Award</strong>
                      <span className="text-[#4A5568]">Conferred in New Delhi for Outstanding Education Contributions</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-sm flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#D97745] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1D30] block">Shiksha Ratna & Gold Medal</strong>
                      <span className="text-[#4A5568]">Rashtriya Samatha Swatantra Manch, Delhi (National Level)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about/management"
                  className="px-6 py-3 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <span>View Board of Management</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 05 — CAMPUS FACILITIES & LEARNING SANCTUARIES
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#FCFBF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E7E2D8] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.25em] block">
                CAMPUS ARCHITECTURE
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1D30] tracking-tight">
                State-of-the-Art Infrastructure
              </h2>
            </div>
            <Link
              to="/academics/infrastructure"
              className="px-5 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Explore All Labs & Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Facility Tabs Switcher */}
          <div className="flex flex-wrap gap-2 justify-start pb-2 overflow-x-auto scrollbar-none">
            {facilities.map((fac, idx) => (
              <button
                key={fac.id}
                onClick={() => setActiveFacility(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeFacility === idx
                    ? 'bg-[#0B1D30] text-white border-[#0B1D30] shadow-md font-bold'
                    : 'bg-white border-[#E7E2D8] text-[#4A5568] hover:bg-[#F7F3EB] hover:text-[#0B1D30]'
                }`}
              >
                {fac.title}
              </button>
            ))}
          </div>

          {/* Active Facility Card */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E7E2D8] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E7E2D8] h-72 sm:h-96 relative group">
              <img
                src={facilities[activeFacility].image}
                alt={facilities[activeFacility].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#0B1D30]/90 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                {facilities[activeFacility].tag}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-widest block">
                {facilities[activeFacility].specs}
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#0B1D30]">
                {facilities[activeFacility].title}
              </h3>
              <h4 className="font-serif italic text-base text-[#D97745]">
                "{facilities[activeFacility].subtitle}"
              </h4>
              <p className="text-sm sm:text-base text-slate-600/90 leading-relaxed font-normal">
                {facilities[activeFacility].description}
              </p>

              <div className="pt-4 border-t border-[#E7E2D8] flex flex-wrap items-center gap-3">
                <Link
                  to="/academics/curriculum"
                  className="px-5 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <span>Curriculum Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsAdmissionDrawerOpen(true)}
                  className="px-5 py-2.5 bg-[#D97745] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <span>Visit Campus</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 06 — ADMISSIONS, SAMPLE PAPERS & DOWNLOADS SHELF
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#0B1D30] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/15 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.25em] block">
                RESOURCES & FORMS
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                Downloads & Academic Center
              </h2>
            </div>
            <Link
              to="/downloads"
              className="px-5 py-2.5 bg-white hover:bg-[#D97745] text-[#0B1D30] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>View All Official PDFs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Registration Forms */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D97745] p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#D97745]/20 text-[#D97745] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-white">Admissions 2026</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Download official admission forms for Nursery, Kindergarten (KG), and Classes I to IX.
                </p>
              </div>
              <button
                onClick={() => setIsAdmissionDrawerOpen(true)}
                className="w-full py-2.5 bg-[#D97745] hover:bg-[#C8652D] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Forms</span>
              </button>
            </div>

            {/* Box 2: Sample Papers Std 1 - 10 */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D97745] p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#D97745]/20 text-[#D97745] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-white">Sample Papers</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Official CBSE pattern question papers for Standard 1 to Standard 10 board prep.
                </p>
              </div>
              <Link
                to="/downloads/sample-papers"
                className="w-full py-2.5 bg-white hover:bg-[#D97745] text-[#0B1D30] hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Browse Papers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Box 3: Evaluation III Papers */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D97745] p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#D97745]/20 text-[#D97745] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-white">Evaluation III</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Evaluation III question papers for Standard 1, 2, 3, 4, and 5 student assessment.
                </p>
              </div>
              <Link
                to="/downloads/evaluation-papers"
                className="w-full py-2.5 bg-white hover:bg-[#D97745] text-[#0B1D30] hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Std 1-5 Papers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Box 4: CBSE SARAS Disclosures */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D97745] p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#D97745]/20 text-[#D97745] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-white">Public Disclosures</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Fire safety, structural stability, potable water clearance, affiliation and NOC certificates.
                </p>
              </div>
              <Link
                to="/about/mandatory-information"
                className="w-full py-2.5 bg-white hover:bg-[#D97745] text-[#0B1D30] hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Disclosures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Active Notices & Circulars Row */}
          {notices.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase tracking-widest text-[#D97745] font-bold">
                  ★ Active Notice Board & Circulars
                </span>
                <Link to="/news/circulars" className="text-slate-300 hover:text-[#D97745] flex items-center gap-1">
                  <span>View All Circulars</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span className="uppercase text-[#D97745] font-bold">{notice.category}</span>
                      <span>{notice.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white line-clamp-1">{notice.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">{notice.summary}</p>
                    {notice.fileUrl && (
                      <a
                        href={notice.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#D97745] hover:underline font-semibold pt-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Document</span>
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
          SECTION 07 — VISUAL ARCHIVE & LIGHTBOX MASONRY
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#FCFBF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E7E2D8] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.25em] block">
                CAMPUS GALLERY
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1D30] tracking-tight">
                Moments of Life at Chinmaya
              </h2>
            </div>
            <Link
              to="/gallery"
              className="px-5 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>View Full Photo Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryImg(item.src)}
                data-cursor="EXPAND"
                className={`${item.span} group relative rounded-3xl overflow-hidden shadow-card border border-[#E7E2D8] cursor-pointer h-72 sm:h-80`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D30]/90 via-[#0B1D30]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-mono text-[#D97745] uppercase tracking-widest font-bold">
                    {item.cat}
                  </span>
                  <h4 className="font-cinzel font-bold text-lg text-white mt-1">
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
            className="fixed inset-0 z-50 bg-[#0B1D30]/95 backdrop-blur-md flex items-center justify-center p-4"
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
          SECTION 07.5 — PUJYA GURUDEV TRIBUTE & FAQ
         ---------------------------------------------------- */}
      <section className="py-16 bg-[#F7F3EB] border-y border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B1D30] to-[#122A44] text-white p-8 md:p-12 rounded-3xl border border-[#D97745]/30 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#D97745] shadow-xl shrink-0">
              <img
                src="/images/swami.jpeg"
                alt="Pujya Gurudev Swami Chinmayananda"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#D97745]">
                <Quote className="w-5 h-5 opacity-75" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97745]">
                  Vision of Pujya Gurudev Swami Chinmayananda
                </span>
              </div>
              <blockquote className="font-cinzel text-xl sm:text-3xl italic text-white/95 leading-relaxed">
                "Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations."
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-300/80 font-normal">
                Founder of Chinmaya Mission & Guide of Chinmaya Vidyalaya Tarapur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section on Home */}
      <FaqSection previewCount={6} id="home-faq" />

      {/* ----------------------------------------------------
          SECTION 08 — MASTER FINAL CONVERSION BANNER (ADMISSIONS)
         ---------------------------------------------------- */}
      <section className="py-24 sm:py-32 bg-[#0B1D30] text-white relative overflow-hidden border-t-4 border-[#D97745]">
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#D97745] uppercase font-bold border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>SESSION 2026-27 ADMISSIONS OPEN</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Shape a Future of <br />
            <span className="italic font-serif font-normal text-[#D97745]">Wisdom and Distinction.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300/85 max-w-2xl mx-auto font-normal leading-relaxed">
            Join the Chinmaya family in Tarapur/Boisar. Download the application forms, schedule a campus visit, or connect with our admissions counselors today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setIsAdmissionDrawerOpen(true)}
              data-cursor="APPLY"
              className="group px-8 py-4 bg-[#D97745] hover:bg-[#C8652D] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Online & Download Forms</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <Link
              to="/contact"
              className="group px-8 py-4 bg-white hover:bg-slate-100 text-[#0B1D30] font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Phone className="w-4 h-4 text-[#D97745]" />
              <span>Contact Campus Office</span>
              <div className="w-7 h-7 rounded-full bg-[#0B1D30]/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-[#0B1D30]" />
              </div>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span>P-201 MIDC Area, Boisar 401501</span>
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
