import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, ArrowUpRight, Award, ShieldCheck, ChevronRight, X, 
  Download, BookOpen, Phone, CheckCircle2, GraduationCap, Quote,
  Compass, Landmark, Layers, MapPin, FileText
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO, OFFICIAL_PRINCIPAL_INFO } from '../../data/school';
import { SCHOOL_IMAGES } from '../../data/images';
import { contentService } from '../../services/contentService';
import { Notice } from '../../types/news';
import { QuickAdmissionDrawer } from '../../components/common/QuickAdmissionDrawer';
import { FaqSection } from '../../components/common/FaqSection';
import { MagneticButton } from '../../components/common/MagneticButton';
import { soundFx } from '../../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activeFacility, setActiveFacility] = useState<number>(0);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState<boolean>(false);

  // GSAP Animation References
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroTelemetryRef = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

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

      // Kinetic masked headline reveal
      tl.from(heroEyebrowRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.15
      })
      .from(heroTitleRef.current?.querySelectorAll('.split-word') || [], {
        yPercent: 120,
        opacity: 0,
        stagger: 0.06,
        duration: 1.1,
        ease: 'power4.out'
      }, '-=0.5')
      .from(heroDescRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from(heroCtaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from(heroTelemetryRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9
      }, '-=0.6');

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

  // Campus Facilities & Learning Sanctuaries
  const facilities = [
    {
      id: "fac-chem",
      title: "Chemistry & STEM Laboratory",
      subtitle: "Hands-on Analytical Experimentation",
      description: "CBSE-compliant research laboratory equipped with safety-tested gas manifolds, digital precision balances, reagent stations, and individual student workstations supervised by certified faculty.",
      image: "/images/CHEM1.jpeg",
      tag: "Physical Sciences",
      specs: "Fully Outfitted • Fire-Safety Certified • Individual Workstations"
    },
    {
      id: "fac-phys",
      title: "Physics & Optics Research Lab",
      subtitle: "Conceptual Mechanics & Applied Physics",
      description: "High-spec laboratory featuring precision optical benches, electrical resistance apparatus, spectrometer sets, and modern mechanics equipment for Class IX to XII practical training.",
      image: "/images/phys.jpeg",
      tag: "STEM Innovation",
      specs: "Optical Benches • Circuit Trainers • CBSE Board Practical Hub"
    },
    {
      id: "fac-lib",
      title: "Central Smart Library",
      subtitle: "Repository of Wisdom & Literature",
      description: "An expansive collection of encyclopedias, national research journals, classical literature, and curriculum reference volumes, complete with a silent reading lounge and designated parent hours.",
      image: "/images/lib.jpg",
      tag: "Knowledge Sanctuary",
      specs: "10,000+ Reference Titles • Silent Study Lounge • Reading Club"
    },
    {
      id: "fac-spiritual",
      title: "Spiritual Sanctum & Assembly Hall",
      subtitle: "Daily Meditation & Moral Assembly",
      description: "A consecrated campus hall dedicated to morning prayers, meditation, monthly bhajan gatherings on the 3rd Saturday, and interactive satsangs with visiting Swamis from Chinmaya Mission.",
      image: "/images/guru-paduka-pooja.webp",
      tag: "Inner Awakening",
      specs: "Daily Paduka Pooja • Monthly Bhajans • Visiting Swamis"
    },
    {
      id: "fac-sports",
      title: "Athletics & Sports Grounds",
      subtitle: "Physical Vitality & Team Spirit",
      description: "Expansive green playing fields accommodating football, cricket, volleyball, running tracks, and annual inter-house athletic meets fostering endurance and true sportsmanship.",
      image: SCHOOL_IMAGES.SPORTS_DAY,
      tag: "Athletic Excellence",
      specs: "Multi-Sport Grounds • Annual Athletic Meet • Track & Field"
    },
    {
      id: "fac-tours",
      title: "Educational Field Studies",
      subtitle: "Experiential Learning Beyond Classrooms",
      description: "Curated academic expeditions to Tarapur MIDC scientific and nuclear facilities, botanical reserves, and historic sites to bridge classroom theory with real-world industry application.",
      image: "/images/tour.jpg",
      tag: "Experiential Learning",
      specs: "Annual Field Expeditions • Industrial Exposure • Nature Trails"
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
        className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center justify-center bg-[#181C20] text-white overflow-hidden"
      >
        {/* Parallax Background Canvas with Double Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            ref={heroBgRef}
            src={SCHOOL_IMAGES.CAMPUS_HERO}
            alt="Chinmaya Vidyalaya Tarapur Campus"
            className="w-full h-full object-cover opacity-25 scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181C20] via-[#181C20]/85 to-[#181C20]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181C20] via-transparent to-[#181C20]/75" />
          
          {/* Swiss Grid Hairline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full flex flex-col justify-between min-h-[80vh]">
          
          {/* Top Architectural Metadata Strip */}
          <div 
            ref={heroEyebrowRef} 
            className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6 text-[11px] font-mono tracking-widest text-[#CBD5E1]"
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DF711B] ring-4 ring-[#DF711B]/20" />
              <span className="text-white font-bold uppercase tracking-[0.25em]">CHINMAYA MISSION EDUCATIONAL CELL</span>
            </div>
            
            <div className="flex items-center gap-6 text-[#CBD5E1]">
              <span className="hidden sm:inline">ESTD. 1993 • BOISAR, MAHARASHTRA</span>
              <span className="text-white/20 hidden sm:inline">/</span>
              <span className="text-white font-semibold">CBSE AFFILIATION NO. {OFFICIAL_SCHOOL_INFO.affiliationNo}</span>
            </div>
          </div>

          {/* Core Master Kinetic Headline */}
          <div className="my-auto py-12 space-y-8 max-w-5xl">
            
            <h1 
              ref={heroTitleRef}
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
            >
              <div className="overflow-hidden">
                <span className="inline-block split-word">Nurturing</span>{' '}
                <span className="inline-block split-word">Noble</span>{' '}
                <span className="inline-block split-word">Minds.</span>
              </div>
              <div className="overflow-hidden mt-1 sm:mt-2">
                <span className="inline-block split-word italic font-serif text-[#DF711B] font-normal">Illuminating</span>{' '}
                <span className="inline-block split-word">Generations.</span>
              </div>
            </h1>

            <p 
              ref={heroDescRef}
              className="text-base sm:text-lg lg:text-xl text-[#CBD5E1] max-w-2xl font-light leading-relaxed"
            >
              Imparting value-integrated CBSE education under the sublime guidance of Pujya Gurudev Swami Chinmayananda. Where academic rigor converges with timeless Vedic character.
            </p>

            {/* Kinetic Magnetic Actions */}
            <div 
              ref={heroCtaRef}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                onClick={() => setIsAdmissionDrawerOpen(true)}
                className="group px-8 py-4 bg-[#DF711B] hover:bg-[#C45B0E] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-2xl flex items-center gap-3 transition-colors border border-[#DF711B]"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Admissions 2026-27</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </MagneticButton>

              <Link
                to="/about/philosophy"
                className="group px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full backdrop-blur-md transition-all border border-white/20 flex items-center gap-2"
              >
                <span>CVP Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Bottom Telemetry & Institutional Pillars Ribbon */}
          <div 
            ref={heroTelemetryRef}
            className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">BOARD AFFILIATION</span>
              <strong className="text-white text-sm block font-sans">CBSE Senior Secondary</strong>
              <span className="text-[11px] text-[#FFB740]">School Code: 45041</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">ACADEMIC RECORD</span>
              <strong className="text-white text-sm block font-sans">100% AISSE Pass</strong>
              <span className="text-[11px] text-[#22C55E]">Centum Distinctions</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">PEDAGOGIC RATIO</span>
              <strong className="text-white text-sm block font-sans">1:25 Focused Mentoring</strong>
              <span className="text-[11px] text-slate-300">Max 40 Per Classroom</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">CAMPUS SCALE</span>
              <strong className="text-white text-sm block font-sans">5-Acre Sanctuary</strong>
              <span className="text-[11px] text-[#DF711B]">Boisar MIDC Palghar</span>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 02 — ACCREDITED INSTITUTIONAL BENCHMARKS (SWISS GRID)
         ---------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E7E2D8] relative">
        {/* Subtle corner crosshairs for Swiss precision */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Context Statement */}
            <div className="lg:col-span-5 space-y-5 editorial-reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D5CEC2] text-[10px] font-mono uppercase tracking-widest text-[#DF711B] font-bold">
                <Landmark className="w-3.5 h-3.5" />
                <span>CENTRAL BOARD RECOGNITION</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181C20] tracking-tight leading-tight">
                Three Decades of Pedagogic Eminence
              </h2>

              <p className="text-base text-[#334155] leading-relaxed font-normal">
                Established in 1993, Chinmaya Vidyalaya Tarapur offers an uninterrupted continuum of learning from Nursery to Senior Secondary. Our graduates embody academic supremacy alongside the profound cultural convictions of the Chinmaya Vision Program.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about/history"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#DF711B] hover:text-[#181C20] transition-colors"
                >
                  <span>Our Institutional Chronicle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Architectural Metric Quadrants */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 editorial-reveal">
              
              {/* Metric 1 */}
              <div className="bg-white p-7 rounded-2xl border border-[#D5CEC2] shadow-sm space-y-2 relative group hover:border-[#DF711B] transition-all">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>CBSE AISSE (CLASS X)</span>
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#181C20]">
                  100%
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Consecutive cent-percent passing result with students securing top CBSE merit rankings across the district.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-white p-7 rounded-2xl border border-[#D5CEC2] shadow-sm space-y-2 relative group hover:border-[#DF711B] transition-all">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>PEDAGOGIC LEGACY</span>
                  <Award className="w-4 h-4 text-[#FFB740]" />
                </div>
                <div className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#181C20]">
                  30+ Yrs
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Nurturing leaders since 1993 under the Central Chinmaya Mission Trust (CCMT) Educational Cell.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-white p-7 rounded-2xl border border-[#D5CEC2] shadow-sm space-y-2 relative group hover:border-[#DF711B] transition-all">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>MENTORING PROPORTION</span>
                  <Layers className="w-4 h-4 text-[#DF711B]" />
                </div>
                <div className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#181C20]">
                  1:25
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Carefully proportioned educator-to-student balance ensuring no child is left unguided during critical formative years.
                </p>
              </div>

              {/* Metric 4 */}
              <div className="bg-white p-7 rounded-2xl border border-[#D5CEC2] shadow-sm space-y-2 relative group hover:border-[#DF711B] transition-all">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>INFRASTRUCTURE SCALE</span>
                  <Compass className="w-4 h-4 text-[#181C20]" />
                </div>
                <div className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#181C20]">
                  5 Acres
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Lush verdant grounds, specialized chemistry & physics laboratories, open-air assembly court, and athletic tracks.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 03 — FOUNDATIONAL MATRIX: CHINMAYA VISION PROGRAM (CVP)
         ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#F3EFE6] text-[#181C20] relative border-b border-[#D5CEC2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#D5CEC2] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.3em] block">
                THE PEDAGOGIC ARCHITECTURE
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-[#181C20] tracking-tight">
                Chinmaya Vision Program
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
              Formulated under the vision of Pujya Gurudev Swami Chinmayananda. A quadruple matrix engineered to awaken the fullest human potential.
            </p>
          </div>

          {/* Interactive 4 Pillars Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Pillar Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {cvpPillars.map((pillar, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectPillar(idx)}
                    onMouseEnter={() => handleSelectPillar(idx)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF7DF] border-[#DF711B] shadow-md translate-x-2'
                        : 'bg-white border-[#D5CEC2] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`font-cinzel text-2xl sm:text-3xl font-bold ${isSelected ? 'text-[#DF711B]' : 'text-slate-400'}`}>
                          {pillar.num}
                        </span>
                        <div>
                          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#181C20]">
                            {pillar.title}
                          </h3>
                          <span className="text-xs font-mono text-slate-500 block mt-0.5">
                            {pillar.sanskrit}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-[#DF711B] translate-x-1' : 'text-slate-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Active Pillar Preview Card */}
            <div 
              ref={pillarPreviewRef}
              className="lg:col-span-7 bg-white text-[#181C20] rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#D5CEC2] flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#E7E2D8] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Pillar {cvpPillars[activePillar].num} • {cvpPillars[activePillar].tag}
                    </span>
                    <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#181C20] mt-1">
                      {cvpPillars[activePillar].title}
                    </h3>
                  </div>
                  <span className="font-serif italic text-xs text-[#334155] bg-[#F3EFE6] px-3.5 py-1.5 rounded-full border border-[#D5CEC2]">
                    {cvpPillars[activePillar].sanskrit}
                  </span>
                </div>

                <p className="text-base text-[#334155] leading-relaxed font-normal">
                  {cvpPillars[activePillar].desc}
                </p>

                {/* Key Points */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#181C20] font-bold block">
                    Institutional Implementations at Tarapur:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cvpPillars[activePillar].points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#181C20] bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E2D8]">
                        <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                        <span className="font-medium leading-normal">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E2D8] flex items-center justify-between">
                <Link
                  to="/about/philosophy"
                  className="px-6 py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Comprehensive CVP Treatise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-slate-500">Chinmaya Mission Tarapur</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 04 — PRINCIPAL LEADERSHIP & DISTINCTION SPOTLIGHT
         ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Principal Photo in Double-Bezel Frame */}
            <div className="lg:col-span-5 relative editorial-reveal">
              <div className="bg-white p-3 rounded-3xl border-2 border-[#D5CEC2] shadow-xl overflow-hidden">
                <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-[#FAF8F5] flex items-center justify-center min-h-[380px]">
                  <div className="p-8 text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-[#DF711B] text-white flex items-center justify-center font-cinzel font-bold text-2xl border-4 border-[#FFB740] shadow-md">
                      DM
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-cinzel font-bold text-2xl text-[#181C20]">
                        {OFFICIAL_PRINCIPAL_INFO.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#DF711B]">
                        {OFFICIAL_PRINCIPAL_INFO.designation} & Member of the Board of Management
                      </p>
                      <p className="text-xs text-slate-500 font-sans">
                        Chinmaya Vidyalaya • Affiliation No: 1130058 (Code: 30040)
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#E7E2D8] space-y-1 text-xs font-mono text-slate-600">
                      <div>Tel: <a href="tel:7775872266" className="text-[#DF711B] hover:underline">7775872266</a></div>
                      <div>Email: <a href="mailto:cv.principal@chinmayamission.com" className="text-[#DF711B] hover:underline">cv.principal@chinmayamission.com</a></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-[#DF711B] to-[#C45B0E] text-white text-center rounded-2xl mt-3 space-y-1 shadow-sm">
                  <h3 className="font-cinzel font-bold text-lg text-white leading-tight">
                    {OFFICIAL_PRINCIPAL_INFO.name}
                  </h3>
                  <p className="text-xs text-[#FFF7DF] font-mono">
                    Educationist & Institutional Leader
                  </p>
                </div>
              </div>
            </div>

            {/* Principal Message & Honors */}
            <div className="lg:col-span-7 space-y-6 editorial-reveal">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.25em] block">
                  LEADERSHIP & DISTINCTION
                </span>
                <h2 className="font-cinzel text-4xl sm:text-5xl font-bold text-[#181C20] tracking-tight">
                  Guided by Visionary Leadership
                </h2>
              </div>

              <blockquote className="font-serif italic text-base sm:text-lg text-[#1E293B] leading-relaxed border-l-4 border-[#DF711B] pl-6 py-4 bg-white rounded-r-2xl border-y border-r border-[#D5CEC2]">
                "{OFFICIAL_PRINCIPAL_INFO.message}"
              </blockquote>

              {/* Core Institutional Commitments */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#181C20] font-bold block">
                  Core Institutional Commitments:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-[#D5CEC2] shadow-sm flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181C20] block">Chinmaya Vision Programme</strong>
                      <span className="text-[#475569]">Integrated 4 pillars: Development, Culture, Patriotism & Universal Outlook</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#D5CEC2] shadow-sm flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181C20] block">100% AISSE Board Distinction</strong>
                      <span className="text-[#475569]">Unbroken standard of Class X academic excellence since 2004–05</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#D5CEC2] shadow-sm flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181C20] block">Disciplined Mentoring Ratio</strong>
                      <span className="text-[#475569]">Strictly 40-student classroom capacity for individualized attention</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#D5CEC2] shadow-sm flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#181C20] block">Vedic Cultural Grounding</strong>
                      <span className="text-[#475569]">Daily Guru Paduka Pooja, Gita chanting, and regional cultural celebrations</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about/management"
                  className="px-6 py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <span>Board of Management</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 05 — CAMPUS LEARNING SANCTUARIES & FACILITIES
         ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E7E2D8] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.25em] block">
                CAMPUS INFRASTRUCTURE
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-[#181C20] tracking-tight">
                State-of-the-Art Sanctuaries
              </h2>
            </div>
            <Link
              to="/academics/infrastructure"
              className="px-6 py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-2"
            >
              <span>Explore All Labs & Grounds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Facility Tabs Switcher */}
          <div className="flex flex-wrap gap-2.5 justify-start pb-2 overflow-x-auto scrollbar-none">
            {facilities.map((fac, idx) => (
              <button
                key={fac.id}
                onClick={() => {
                  setActiveFacility(idx);
                  soundFx.playChime(620, 0.08);
                }}
                className={`px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all border font-sans ${
                  activeFacility === idx
                    ? 'bg-[#DF711B] text-white border-[#DF711B] shadow-md font-bold'
                    : 'bg-white border-[#D5CEC2] text-[#334155] hover:bg-[#F3EFE6] hover:text-[#DF711B]'
                }`}
              >
                {fac.title}
              </button>
            ))}
          </div>

          {/* Active Facility Card with Double-Bezel Frame */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#D5CEC2] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#D5CEC2] h-72 sm:h-96 relative group">
              <img
                src={facilities[activeFacility].image}
                alt={facilities[activeFacility].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#181C20]/90 text-white text-[10px] font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-white/20">
                {facilities[activeFacility].tag}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-widest block">
                {facilities[activeFacility].specs}
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#181C20]">
                {facilities[activeFacility].title}
              </h3>
              <h4 className="font-serif italic text-base text-[#DF711B]">
                "{facilities[activeFacility].subtitle}"
              </h4>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
                {facilities[activeFacility].description}
              </p>

              <div className="pt-4 border-t border-[#E7E2D8] flex flex-wrap items-center gap-3">
                <Link
                  to="/academics/curriculum"
                  className="px-6 py-3 bg-white hover:bg-[#DF711B] text-[#181C20] hover:text-white border border-[#D5CEC2] text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Curriculum Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <MagneticButton
                  onClick={() => setIsAdmissionDrawerOpen(true)}
                  className="px-6 py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Visit Campus</span>
                </MagneticButton>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 06 — ACADEMIC REPOSITORY & VERIFIED PDF DOWNLOADS
         ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#FAF8F5] text-[#181C20] relative border-y border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E7E2D8] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.25em] block">
                AUTHENTIC RESOURCES & ADMISSION SHELF
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-[#181C20] tracking-tight">
                Downloads & Academic Center
              </h2>
            </div>
            <Link
              to="/downloads"
              className="px-6 py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2"
            >
              <span>View All Official PDFs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Registration Forms */}
            <div className="bg-white border border-[#E7E2D8] hover:border-[#DF711B] p-6 rounded-2xl space-y-4 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#DF711B]/15 text-[#DF711B] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Admissions 2026-27</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Download official admission forms for Nursery, Kindergarten (KG), and Classes I to IX.
                </p>
              </div>
              <button
                onClick={() => setIsAdmissionDrawerOpen(true)}
                className="w-full py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Forms</span>
              </button>
            </div>

            {/* Box 2: Sample Papers Std 1 - 10 */}
            <div className="bg-white border border-[#E7E2D8] hover:border-[#DF711B] p-6 rounded-2xl space-y-4 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB740]/20 text-[#FFB740] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Sample Papers</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Official CBSE pattern question papers for Standard 1 to Standard 10 board preparation.
                </p>
              </div>
              <Link
                to="/downloads/sample-papers"
                className="w-full py-3 bg-[#FFF7DF] hover:bg-[#DF711B] text-[#181C20] hover:text-white border border-[#FDE49C] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Browse Papers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Box 3: Evaluation III Papers */}
            <div className="bg-white border border-[#E7E2D8] hover:border-[#64C9CF] p-6 rounded-2xl space-y-4 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#64C9CF]/20 text-[#0B6B72] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Evaluation III</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Evaluation III question papers for Standard 1, 2, 3, 4, and 5 formative assessment.
                </p>
              </div>
              <Link
                to="/downloads/evaluation-papers"
                className="w-full py-3 bg-[#EAF9FA] hover:bg-[#64C9CF] text-[#0B6B72] hover:text-white border border-[#64C9CF]/30 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Std 1-5 Papers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Box 4: CBSE SARAS Disclosures */}
            <div className="bg-white border border-[#E7E2D8] hover:border-[#FDE49C] p-6 rounded-2xl space-y-4 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FDE49C]/35 text-[#DF711B] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Public Disclosures</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Fire safety, structural stability, potable water test clearance, affiliation and NOC certificates.
                </p>
              </div>
              <Link
                to="/about/mandatory-information"
                className="w-full py-3 bg-[#FFF7DF] hover:bg-[#FDE49C] text-[#181C20] border border-[#FDE49C] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Disclosures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Active Notices & Circulars Row */}
          {notices.length > 0 && (
            <div className="pt-8 border-t border-[#E7E2D8] space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase tracking-widest text-[#DF711B] font-bold">
                  Official Bulletin & Campus Circulars
                </span>
                <Link to="/news/circulars" className="text-slate-600 hover:text-[#DF711B] flex items-center gap-1 font-mono font-semibold">
                  <span>View All Circulars</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-5 bg-white border border-[#E7E2D8] rounded-xl space-y-2 hover:border-[#DF711B] shadow-sm transition-colors"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span className="uppercase text-[#DF711B] font-bold">{notice.category}</span>
                      <span>{notice.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#181C20] line-clamp-1">{notice.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">{notice.summary}</p>
                    {notice.fileUrl && (
                      <a
                        href={notice.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#DF711B] hover:underline font-semibold pt-1"
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
          SECTION 07 — VISUAL ARCHIVE & MASONRY EXHIBITION
         ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E7E2D8] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.25em] block">
                CAMPUS GALLERY & ARCHIVES
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-[#181C20] tracking-tight">
                Moments of Life at Chinmaya
              </h2>
            </div>
            <Link
              to="/gallery"
              className="px-6 py-3 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-2"
            >
              <span>Full Photographic Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Masonry Layout with Doppelrand Frames */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryImg(item.src)}
                className={`${item.span} group relative rounded-3xl overflow-hidden shadow-sm border-2 border-[#D5CEC2] cursor-pointer h-72 sm:h-80`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181C20]/90 via-[#181C20]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono text-[#DF711B] uppercase tracking-widest font-bold">
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
          SECTION 07.5 — PUJYA GURUDEV TRIBUTE & MOTTO
         ---------------------------------------------------- */}
      <section className="py-20 bg-[#F3EFE6] border-y border-[#D5CEC2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white text-[#181C20] p-8 md:p-14 rounded-3xl border-2 border-[#DF711B]/30 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#DF711B] shadow-xl shrink-0">
              <img
                src="/images/swami.jpeg"
                alt="Pujya Gurudev Swami Chinmayananda"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#DF711B]">
                <Quote className="w-5 h-5 opacity-75" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DF711B]">
                  Vision of Pujya Gurudev Swami Chinmayananda
                </span>
              </div>
              <blockquote className="font-cinzel text-xl sm:text-3xl italic text-[#181C20] leading-relaxed">
                "Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations."
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Founder of Chinmaya Mission & Eternal Guide of Chinmaya Vidyalaya Tarapur
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
      <section className="py-24 sm:py-32 bg-gradient-to-br from-[#DF711B] via-[#C45B0E] to-[#9C3E08] text-white relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#FFF7DF] uppercase font-bold border border-white/30 backdrop-blur-xs">
            <GraduationCap className="w-4 h-4" />
            <span>SESSION 2026-27 ADMISSIONS OPEN</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
            Shape a Future of <br />
            <span className="italic font-serif font-normal text-[#FDE49C]">Wisdom and Distinction.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Join the Chinmaya family in Boisar / Tarapur. Download application forms, schedule a campus visit, or connect with our academic admissions office today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <MagneticButton
              onClick={() => setIsAdmissionDrawerOpen(true)}
              className="group px-8 py-4 bg-white hover:bg-[#FFF7DF] text-[#DF711B] font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl flex items-center gap-3"
            >
              <GraduationCap className="w-4 h-4 text-[#DF711B]" />
              <span>Apply Online & Download Forms</span>
              <div className="w-7 h-7 rounded-full bg-[#DF711B]/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DF711B]" />
              </div>
            </MagneticButton>

            <Link
              to="/contact"
              className="group px-8 py-4 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl flex items-center gap-3"
            >
              <Phone className="w-4 h-4 text-[#FFF7DF]" />
              <span>Contact Campus Office</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFF7DF]" />
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
