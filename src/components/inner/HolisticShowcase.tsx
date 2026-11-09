import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Heart, BookOpen, Sun, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface VikasPillar {
  id: string;
  name: string;
  sanskrit: string;
  domain: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  badgeText: string;
  image: string;
  imageCaption: string;
  locationMeta: string;
  description: string;
  activities: string[];
}

const VIKAS_DOMAINS: VikasPillar[] = [
  {
    id: 'sharirik',
    name: 'Physical Vitality & Health',
    sanskrit: 'Sharirik Vikas',
    domain: 'Body, Stamina & Motor Agility',
    icon: Activity,
    color: '#DF711B',
    badgeBg: 'bg-[#FAF3E8]',
    badgeText: 'text-[#DF711B]',
    image: '/images/banner-8.webp',
    imageCaption: 'Outdoor Sports: Inter-House Track Athletics & Field Competitions',
    locationMeta: 'East Athletic Grounds • Boisar',
    description:
      'Building physical endurance, motor agility, and disciplined athletic stamina. Through daily morning drills, structured sports coaching in football, cricket, and athletics, and wellness tracking, students develop lifelong healthy habits.',
    activities: [
      'Daily morning assembly Surya Namaskar and dynamic warm-up drills',
      'Inter-house tournaments in football, cricket, volleyball, and table tennis',
      'Annual Sports Championship with sprint relays and house march-pasts',
      'Clean RO water hydration monitoring and physical wellness check-ups'
    ]
  },
  {
    id: 'manasik',
    name: 'Mental & Emotional Refinement',
    sanskrit: 'Manasik Vikas',
    domain: 'Mind, Empathy & Creative Expression',
    icon: Heart,
    color: '#0B1E34',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-[#0B1E34]',
    image: '/images/chinmaya/cultural/arts_and_creativity_006.jpg?v=2',
    imageCaption: 'Creative Expression: Fine Arts, Calligraphy & Cultural Craft Exhibitions',
    locationMeta: 'Art Studio & Exhibition Gallery',
    description:
      'Channeling emotional energy into creative excellence through visual arts, Indian classical music, and theater. Students explore painting, clay craft, and public speaking, developing emotional balance and collaborative team spirit.',
    activities: [
      'Studio painting, papercraft modeling, and annual art exhibitions',
      'Indian classical and folk dance training for cultural stage fests',
      'House-system peer mentorship and anti-bullying student ambassadors',
      'Inter-house elocution, poetry recitation, and dramatic plays'
    ]
  },
  {
    id: 'bauddhik',
    name: 'Intellectual Sharpness & Inquiry',
    sanskrit: 'Bauddhik Vikas',
    domain: 'Analytical Intellect & Scientific Temper',
    icon: BookOpen,
    color: '#1E40AF',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-800',
    image: '/images/chinmaya/cultural/cultural_celebration_016.jpg?v=2',
    imageCaption: 'Scientific Rigor: Volumetric Analysis & Empirical Experimentation in Chemistry Lab',
    locationMeta: 'Senior Science Labs • Boisar',
    description:
      'Fostering logical deduction, intellectual curiosity, and scientific inquiry. Students test conceptual hypotheses in state-of-the-art laboratories, engage in diagnostic assessments, and develop critical problem-solving skills.',
    activities: [
      'Hands-on experiments in dedicated Physics, Chemistry, Biology, and IT labs',
      'CBSE curriculum problem-solving and ASSET diagnostic skill benchmarks',
      'Annual Science Exhibition featuring student-engineered working models',
      'Central Library research periods and coding in Python and Scratch'
    ]
  },
  {
    id: 'adhyatmik',
    name: 'Spiritual Awakening & Character',
    sanskrit: 'Adhyatmik Vikas',
    domain: 'Spirit, Inner Peace & Selfless Action',
    icon: Sun,
    color: '#B45309',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    image: '/images/guru-paduka-pooja.webp?v=2',
    imageCaption: 'Spiritual Roots: Sacred Guru Paduka Pooja & Chinmaya Cultural Traditions',
    locationMeta: 'Vidyalaya Prayer Sanctum • Boisar',
    description:
      'Nurturing ethical character, humility, and devotion to noble ideals. Students imbibe timeless Vedic wisdom through Balvihar value education, community service (Seva), and daily reflection on life values.',
    activities: [
      'Annual Chinmaya Mission Inter-School Gita Chanting Competition',
      'Monthly Bhajan and spiritual assembly on the 3rd Saturday of each month',
      'Balvihar value modules exploring timeless Vedic ethics and selfless duty',
      'Community outreach and environmental cleanliness drives (Swachhata Seva)'
    ]
  }
];

export const HolisticShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = VIKAS_DOMAINS[activeIdx];
  const Icon = current.icon;
  const stageRef = useRef<HTMLDivElement>(null);

  // GSAP Smooth Transition on Domain Change
  useEffect(() => {
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current.children,
        { opacity: 0, y: 14, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }
  }, [activeIdx]);

  return (
    <div className="space-y-10">
      {/* Banner Card */}
      <SpotlightCard
        spotlightColor="rgba(223, 113, 27, 0.08)"
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-card space-y-5"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <BadgePill label="4-Fold Individual Transformation" variant="saffron" pulse />
              <span className="text-xs font-mono text-slate-500">Chinmaya Vision Programme</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
              Holistic Character Architecture (Vikas)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Education at Chinmaya Vidyalaya goes beyond textbook instruction. We nurture the entire personality of each child across four interdependent dimensions: Physical Vitality, Emotional Refinement, Intellectual Acuity, and Spiritual Awakening.
            </p>
          </div>
        </div>

        {/* 4 Domains Quick Selector Bar (Zero Eye Travel) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#E7E2D8]">
          {VIKAS_DOMAINS.map((domain, idx) => {
            const isSelected = activeIdx === idx;
            const DIcon = domain.icon;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#DF711B] shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#FAF3E8] text-[#DF711B]' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Domain 0{idx + 1}
                  </span>
                  <DIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#DF711B]' : 'text-slate-400'}`} />
                </div>
                <h4 className="font-cinzel font-bold text-xs sm:text-sm text-[#181C20]">
                  {domain.sanskrit}
                </h4>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  {domain.name}
                </p>
              </button>
            );
          })}
        </div>
      </SpotlightCard>

      {/* Interactive GSAP Stage (Zero Eye Fatigue) */}
      <SpotlightCard
        spotlightColor="rgba(223, 113, 27, 0.08)"
        className="bg-white border-2 border-[#DF711B]/30 rounded-3xl p-6 sm:p-10 shadow-card"
      >
        <div ref={stageRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-cinzel font-bold text-white shadow-md shrink-0"
                style={{ backgroundColor: current.color }}
              >
                0{activeIdx + 1}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  {current.domain}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-[#181C20]">
                  {current.name} ({current.sanskrit})
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev - 1 + VIKAS_DOMAINS.length) % VIKAS_DOMAINS.length)}
                className="p-2 rounded-xl border border-slate-200 hover:border-[#DF711B] bg-white text-slate-700 hover:text-[#DF711B] transition-colors cursor-pointer"
                title="Previous Domain"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % VIKAS_DOMAINS.length)}
                className="p-2 rounded-xl border border-slate-200 hover:border-[#DF711B] bg-white text-slate-700 hover:text-[#DF711B] transition-colors cursor-pointer"
                title="Next Domain"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Real Campus Photo */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1E34]/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                    {current.sanskrit}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded text-[10px] font-mono">
                    {current.locationMeta}
                  </div>
                </div>
                <div className="p-3 bg-white text-xs text-[#4A5568] font-medium border-t border-[#E7E2D8]">
                  {current.imageCaption}
                </div>
              </div>
            </div>

            {/* Content & Practices */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DF711B] flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>Campus Implementation & Activities:</span>
                </span>
                <ul className="space-y-2">
                  {current.activities.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
