import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Flame, Flag, Globe, CheckCircle2, ArrowRight, Compass, ArrowLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface PillarDetail {
  number: string;
  sanskritName: string;
  englishTitle: string;
  shortSummary: string;
  themeColor: string;
  accentBg: string;
  borderAccent: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ElementType;
  philosophy: string;
  howWeFollow: {
    title: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  photos: {
    src: string;
    caption: string;
    tag: string;
    locationMeta: string;
  }[];
  tags: string[];
}

const PILLARS_DATA: PillarDetail[] = [
  {
    number: '01',
    sanskritName: 'Sharirik, Manasik, Bauddhik & Adhyatmik Vikas',
    englishTitle: 'Integrated Development',
    shortSummary: 'Body, mind, intellect & spiritual harmony in daily life',
    themeColor: '#DF711B',
    accentBg: 'from-[#FFF8F0] to-[#FEF3E2]',
    borderAccent: 'border-[#DF711B]/40',
    badgeBg: 'bg-[#FAF3E8]',
    badgeText: 'text-[#DF711B]',
    icon: Sparkles,
    philosophy:
      'Cultivating the whole human being in total harmony—nurturing physical vitality, emotional stability, sharp intellectual inquiry, and spiritual poise so students face the world with balanced strength.',
    howWeFollow: {
      title: 'Concrete Daily Practice at Chinmaya Vidyalaya Tarapur:',
      points: [
        {
          title: 'Daily Morning Surya Namaskar & Yoga',
          desc: 'Students begin each morning with structured pranayama and mindful stretching for agility, stamina, and physical conditioning.'
        },
        {
          title: 'Hands-on STEM Lab Experiments',
          desc: 'Physics, Chemistry, Biology, and Computer labs allow students to test concepts through direct experimentation rather than passive memorization.'
        },
        {
          title: 'Inter-House Sports on Boisar Grounds',
          desc: 'Year-round training in football, cricket, volleyball, table tennis, and track events on our expansive campus grounds.'
        },
        {
          title: 'ASSET Diagnostic Skill Assessments',
          desc: 'Regular evaluations from Std III to IX pinpoint conceptual strengths and accelerate individualized intellectual growth.'
        }
      ]
    },
    photos: [
      {
        src: '/images/banner-8.webp',
        caption: 'Physical Vitality: Annual Sports Meet & Track and Field Athletics on School Grounds',
        tag: 'Physical Conditioning',
        locationMeta: 'Main Athletic Grounds • Boisar Campus'
      },
      {
        src: '/images/phys.jpeg',
        caption: 'Intellectual Depth: Hands-on Experiments in the Senior Physics Laboratory',
        tag: 'STEM Scientific Inquiry',
        locationMeta: 'Senior Physics Wing • Station 4'
      }
    ],
    tags: ['Daily Surya Namaskar', 'Advanced STEM Labs', 'Athletics & Sports Grounds', 'ASSET Diagnostic Testing']
  },
  {
    number: '02',
    sanskritName: 'Bhartiya Sanskriti Evam Sanskar',
    englishTitle: 'Indian Culture & Heritage',
    shortSummary: 'Ancient wisdom, family values, and sacred Vedic traditions',
    themeColor: '#B45309',
    accentBg: 'from-[#FFF9F2] to-[#FDF4E7]',
    borderAccent: 'border-[#B45309]/30',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#92400E]',
    icon: Flame,
    philosophy:
      'Rooting children deeply in the eternal values, noble traditions, and spiritual wisdom of Indian culture, fostering lifelong gratitude towards parents, teachers, and society.',
    howWeFollow: {
      title: 'Concrete Daily Practice at Chinmaya Vidyalaya Tarapur:',
      points: [
        {
          title: 'Daily Guru Paduka Pooja Ceremony',
          desc: 'Every morning assembly and academic term commences with solemn Paduka Pooja, lighting the traditional lamp and chanting Vedic stotras.'
        },
        {
          title: 'Annual Bhagavad Gita Chanting Contest',
          desc: 'Students from primary to senior classes memorize and chant Gita chapters with precise Sanskrit enunciation and meter.'
        },
        {
          title: 'Weekly Balvihar Value Modules',
          desc: 'Dedicated periods teaching ethical decision-making, moral stories from the epics, and respectful family etiquette.'
        },
        {
          title: 'Celebration of Sacred Indian Festivals',
          desc: 'Guru Purnima, Janmashtami, Navratri, and Chinmaya Aradhana Day are celebrated with student theatrics, bhajans, and traditional attire.'
        }
      ]
    },
    photos: [
      {
        src: '/images/guru-paduka-pooja.webp',
        caption: 'Sacred Tradition: Solemn Morning Guru Paduka Pooja & Shloka Chanting Ceremony',
        tag: 'Daily Spiritual Ritual',
        locationMeta: 'Central Prayer Altar • Daily Assembly'
      },
      {
        src: '/images/banner-4.jpeg',
        caption: 'Cultural Expression: Festival Celebrations, Sanskrit Recitation & Annual Day Performances',
        tag: 'Cultural Ethos',
        locationMeta: 'Main Auditorium Stage • Cultural Meet'
      }
    ],
    tags: ['Guru Paduka Pooja', 'Bhagavad Gita Chanting', 'Balvihar Value Modules', 'Festival Celebrations']
  },
  {
    number: '03',
    sanskritName: 'Deshbhakti Evam Rashtra Seva',
    englishTitle: 'Patriotism & Civic Duty',
    shortSummary: 'National pride, civic stewardship, and social responsibility',
    themeColor: '#047857',
    accentBg: 'from-[#F0FDF4] to-[#E6F4EA]',
    borderAccent: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    icon: Flag,
    philosophy:
      'Igniting unconditional love for the motherland, deep pride in India’s cultural and scientific achievements, and an active commitment to civic duty and social welfare.',
    howWeFollow: {
      title: 'Concrete Daily Practice at Chinmaya Vidyalaya Tarapur:',
      points: [
        {
          title: 'National Anthem & March Past Discipline',
          desc: 'Solemn flag hoisting on Independence and Republic Days accompanied by student-led disciplined march past and tricolor salutations.'
        },
        {
          title: 'Jal Pakhwada Water Conservation',
          desc: 'Student-led community water conservation rallies, poster awareness campaigns, and campus rainwater awareness.'
        },
        {
          title: 'Local Boisar Community Cleanliness',
          desc: 'Hands-on environmental cleaning drives, paper recycling, tree plantation, and support drives for local communities.'
        },
        {
          title: 'Commemorating Heroes & Armed Forces',
          desc: 'Dedicated assembly tributes to national scientists, freedom fighters, and defense forces to cultivate courageous citizenship.'
        }
      ]
    },
    photos: [
      {
        src: '/images/jal-pakhwada-poster.jpeg',
        caption: 'Civic Responsibility: Student Jal Pakhwada Water Conservation & Environmental Awareness Drive',
        tag: 'Environmental Action',
        locationMeta: 'Community Outreach • Palghar District'
      },
      {
        src: '/images/school_events/School_Event_2026-09-27_007.jpg',
        caption: 'National Honor: Assembly Parades, March Past & Commemoration of National Occasions',
        tag: 'Patriotic Pride',
        locationMeta: 'Parade Grounds • Independence Assembly'
      }
    ],
    tags: ['Jal Pakhwada Campaigns', 'March Past & Assemblies', 'Eco-Club Stewardship', 'Social Responsibility']
  },
  {
    number: '04',
    sanskritName: 'Vasudhaiva Kutumbakam',
    englishTitle: 'Universal Outlook',
    shortSummary: 'Global brotherhood, ecological empathy & cosmic harmony',
    themeColor: '#1E40AF',
    accentBg: 'from-[#EFF6FF] to-[#DBEAFE]/40',
    borderAccent: 'border-blue-500/30',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    icon: Globe,
    philosophy:
      'Transcending narrow boundaries of creed, race, and nationality to embrace the Upanishadic ideal "Vasudhaiva Kutumbakam"—the whole world is one family living in cosmic harmony.',
    howWeFollow: {
      title: 'Concrete Daily Practice at Chinmaya Vidyalaya Tarapur:',
      points: [
        {
          title: 'Experiential Outdoor Educational Tours',
          desc: 'Guided field excursions to historical landmarks, botanical reserves, and industrial research sites broadening student horizons.'
        },
        {
          title: 'Science & Sustainable Innovation Fairs',
          desc: 'Encouraging students to design technological solutions for clean energy, zero-waste management, and environmental balance.'
        },
        {
          title: 'Daily Universal Peace Invocations',
          desc: 'Assemblies conclude with timeless Vedic peace prayers: "Om Sarve Bhavantu Sukhinah, Sarve Santu Niraamayaah".'
        },
        {
          title: 'Global Empathy & Model Assemblies',
          desc: 'Discussions and debates addressing international collaboration, ecological interdependence, and global harmony.'
        }
      ]
    },
    photos: [
      {
        src: '/images/tour.jpg',
        caption: 'Experiential Horizons: Student Educational Tours & Outdoor Experiential Learning Excursions',
        tag: 'Field Learning & Discovery',
        locationMeta: 'Experiential Field Trip • Maharashtra Heritage'
      },
      {
        src: '/images/school_events/School_Event_2026-09-27_005.jpg',
        caption: 'Global Inquiry: Collaborative Research, Technology Workshops & Team Innovation Projects',
        tag: 'Universal Science & Tech',
        locationMeta: 'Computer & Innovation Wing • Lab 2'
      }
    ],
    tags: ['Vasudhaiva Kutumbakam', 'Educational Field Tours', 'Universal Peace Invocations', 'Global Innovation']
  }
];

export const FourPillarsShowcase: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stage' | 'grid'>('stage');
  const stageContentRef = useRef<HTMLDivElement>(null);
  const currentPillar = PILLARS_DATA[activePillarIndex];
  const Icon = currentPillar.icon;

  // GSAP Smooth Transition on Active Pillar Change (Zero Eye Travel)
  useEffect(() => {
    if (stageContentRef.current) {
      gsap.fromTo(
        stageContentRef.current.children,
        { opacity: 0, y: 14, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }
  }, [activePillarIndex]);

  const handleNext = () => {
    setActivePillarIndex((prev) => (prev + 1) % PILLARS_DATA.length);
  };

  const handlePrev = () => {
    setActivePillarIndex((prev) => (prev - 1 + PILLARS_DATA.length) % PILLARS_DATA.length);
  };

  return (
    <div className="space-y-10">
      {/* 1. Master Institutional Hero Box */}
      <SpotlightCard
        spotlightColor="rgba(223, 113, 27, 0.12)"
        className="bg-gradient-to-br from-[#0B1E34] via-[#10243C] to-[#1A3352] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#DF711B]/35 relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DF711B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <BadgePill
                label="Chinmaya Vision Programme (CVP)"
                variant="saffron"
                pulse
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />
              <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                CBSE Affiliation #1130058 • Boisar Campus
              </span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/15 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('stage')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  viewMode === 'stage' ? 'bg-[#DF711B] text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Interactive Studio
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  viewMode === 'grid' ? 'bg-[#DF711B] text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                All 4 Pillars Grid
              </button>
            </div>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            How Our School Follows the 4 Pillars in Practice
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed font-normal">
            At Chinmaya Vidyalaya Tarapur, the Chinmaya Vision Programme is not an abstract theory—it is woven into every morning assembly, laboratory experiment, sports practice, and community initiative. Below, explore how each pillar translates into authentic campus life.
          </p>

          {/* 4-Pillars Quick Focus Bar (Zero Eye Travel) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
            {PILLARS_DATA.map((p, idx) => {
              const isSelected = activePillarIndex === idx;
              const PIcon = p.icon;
              return (
                <button
                  key={p.number}
                  type="button"
                  onClick={() => {
                    setActivePillarIndex(idx);
                    if (viewMode !== 'stage') setViewMode('stage');
                  }}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white text-[#181C20] border-[#DF711B] shadow-lg scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/15 text-white border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-xs font-cinzel font-black px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-[#FAF3E8] text-[#DF711B]' : 'bg-black/30 text-slate-300'
                      }`}
                    >
                      {p.number}
                    </span>
                    <PIcon
                      className={`w-4 h-4 ${isSelected ? 'text-[#DF711B]' : 'text-slate-300'}`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-cinzel font-bold text-xs sm:text-sm leading-tight ${
                        isSelected ? 'text-[#181C20]' : 'text-white'
                      }`}
                    >
                      {p.englishTitle}
                    </h3>
                    <p
                      className={`text-[10px] truncate mt-0.5 font-sans ${
                        isSelected ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {p.shortSummary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </SpotlightCard>

      {/* 2. Interactive Studio Stage (GSAP Powered - Zero Eye Fatigue) */}
      {viewMode === 'stage' && (
        <div className="relative">
          <SpotlightCard
            spotlightColor="rgba(223, 113, 27, 0.08)"
            className={`bg-white border-2 ${currentPillar.borderAccent} rounded-3xl p-6 sm:p-10 shadow-card space-y-8`}
          >
            <div ref={stageContentRef} className="space-y-8">
              {/* Header Navigation & Pillar Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-cinzel font-black text-2xl text-white shadow-md shrink-0"
                    style={{ backgroundColor: currentPillar.themeColor }}
                  >
                    {currentPillar.number}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
                      PILLAR {currentPillar.number} • {currentPillar.sanskritName}
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
                      {currentPillar.englishTitle}
                    </h3>
                  </div>
                </div>

                {/* Prev / Next Controls */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl border border-[#E7E2D8] hover:border-[#DF711B] bg-[#FAF8F5] text-slate-700 hover:text-[#DF711B] transition-colors cursor-pointer"
                    title="Previous Pillar"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-2 text-slate-500">
                    {activePillarIndex + 1} of {PILLARS_DATA.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2.5 rounded-xl border border-[#E7E2D8] hover:border-[#DF711B] bg-[#FAF8F5] text-slate-700 hover:text-[#DF711B] transition-colors cursor-pointer"
                    title="Next Pillar"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Philosophical Essence Quote */}
              <div className={`p-5 rounded-2xl bg-gradient-to-r ${currentPillar.accentBg} border border-[#E7E2D8] space-y-1.5`}>
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 block">
                    Core Vedantic Philosophy
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal italic">
                  "{currentPillar.philosophy}"
                </p>
              </div>

              {/* Side-by-side Dual Photography Showcase */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#181C20] flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#DF711B]" />
                    <span>Real Campus Photography: How Our School Follows Pillar {currentPillar.number}</span>
                  </h4>
                  <span className="text-xs font-mono text-[#DF711B] font-semibold hidden md:inline">
                    Tarapur Campus • Boisar, Maharashtra
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPillar.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      className="group bg-[#FAF8F5] border border-[#E7E2D8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#0B1E34]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                          {photo.tag}
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white/90 px-2 py-0.5 rounded text-[10px] font-mono">
                          {photo.locationMeta}
                        </div>
                      </div>
                      <div className="p-3.5 bg-white border-t border-[#E7E2D8]">
                        <p className="text-xs text-[#181C20] font-medium leading-relaxed">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concrete School Implementation Points (4 Clear Capsules) */}
              <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 sm:p-7 rounded-2xl space-y-3">
                <h4 className="font-cinzel font-bold text-sm sm:text-base text-[#181C20] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DF711B]" />
                  <span>{currentPillar.howWeFollow.title}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentPillar.howWeFollow.points.map((pt, ptIdx) => (
                    <div
                      key={ptIdx}
                      className="bg-white p-4 rounded-xl border border-[#E7E2D8] shadow-2xs space-y-1 hover:border-[#DF711B]/40 transition-colors"
                    >
                      <span className="font-cinzel font-bold text-xs text-[#DF711B] block">
                        • {pt.title}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified School Credentials & Action Advance */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E7E2D8]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500 font-bold uppercase mr-1">
                    Verified Practices:
                  </span>
                  {currentPillar.tags.map((t, tIdx) => (
                    <BadgePill key={tIdx} label={t} variant="neutral" />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <span>Explore Next Pillar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      )}

      {/* 3. Comprehensive Grid View (All 4 Pillars Visible at a Glance) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS_DATA.map((pillar, idx) => {
            const PIcon = pillar.icon;
            return (
              <SpotlightCard
                key={pillar.number}
                spotlightColor="rgba(223, 113, 27, 0.08)"
                className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl text-white font-cinzel font-bold flex items-center justify-center text-sm shadow-sm"
                        style={{ backgroundColor: pillar.themeColor }}
                      >
                        {pillar.number}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          PILLAR {pillar.number}
                        </span>
                        <h3 className="font-cinzel font-bold text-lg text-[#181C20]">
                          {pillar.englishTitle}
                        </h3>
                      </div>
                    </div>
                    <PIcon className="w-5 h-5 text-slate-400" />
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    "{pillar.philosophy}"
                  </p>

                  {/* Primary Photo */}
                  <div className="rounded-xl overflow-hidden aspect-[16/10] border border-[#E7E2D8] relative">
                    <img
                      src={pillar.photos[0].src}
                      alt={pillar.photos[0].caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#0B1E34]/85 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                      {pillar.photos[0].tag}
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {pillar.howWeFollow.points.slice(0, 2).map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                        <span><strong>{pt.title}:</strong> {pt.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActivePillarIndex(idx);
                    setViewMode('stage');
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#DF711B] text-[#DF711B] hover:bg-[#DF711B] hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Pillar {pillar.number} Studio</span>
                </button>
              </SpotlightCard>
            );
          })}
        </div>
      )}

      {/* 4. Footer Admissions & Campus Visit Callout */}
      <SpotlightCard
        spotlightColor="rgba(255, 255, 255, 0.1)"
        className="bg-gradient-to-r from-[#DF711B] to-[#C8652D] text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-200 block">
            Admissions & Student Life • Boisar Campus
          </span>
          <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-white">
            Experience Value-Based Learning at Chinmaya Vidyalaya
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-light">
            Enrolling your child into Chinmaya Vidyalaya Tarapur provides them with CBSE academic rigor coupled with the profound life values of the Chinmaya Vision Programme.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            to="/admissions/guidelines"
            className="px-6 py-3 bg-white text-[#DF711B] hover:bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Admission Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/30"
          >
            <span>Visit Campus</span>
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
};
