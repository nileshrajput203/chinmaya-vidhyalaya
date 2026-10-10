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
    imageCaption: 'Physical Agility: Track & Field Athletics on Expansive Boisar Grounds',
    locationMeta: 'East Athletic Grounds • Boisar',
    description:
      'Cultivating physical stamina, muscular coordination, and healthy habits. Students engage in daily morning Surya Namaskar, structured sports coaching in football, cricket, and athletics, and periodic fitness screenings.',
    activities: [
      'Daily morning yoga and Surya Namaskar assemblies',
      'Inter-house football, cricket, volleyball, and table tennis leagues',
      'Annual Sports Day with athletic track events and march-past drills',
      'Promoting clean hydration and balanced nutritional habits'
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
    image: '/images/banner-9.webp',
    imageCaption: 'Emotional Poise: Theatrical Drama & Cultural Music on Annual Day',
    locationMeta: 'Main Auditorium • Annual Fest',
    description:
      'Nurturing emotional equilibrium, creative self-expression, and empathetic peer bonds. Guided through performing arts, music, dance, student counselling, and a zero-tolerance anti-bullying campus environment.',
    activities: [
      'Visual arts, classical music, and annual day dramatic plays',
      'Dedicated house mentorship system providing emotional guidance',
      'Personality refinement workshops and cooperative team projects',
      'Safe, supportive campus environment encouraging risk-taking'
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
    image: '/images/chinmaya/academics/science_stem_lab_01.webp',
    imageCaption: 'Cognitive Rigor: Hands-on Chemistry Experimentation & Analysis',
    locationMeta: 'Chemistry Laboratory • Station 2',
    description:
      'Sharpening analytical cognition, critical inquiry, and conceptual problem-solving. Students conduct hands-on laboratory experiments, engage in ASSET diagnostic assessments, and participate in science olympiads.',
    activities: [
      'Well-equipped Physics, Chemistry, Biology, and IT laboratories',
      'ASSET diagnostic assessments identifying conceptual strengths & gaps',
      'Debates, elocution, quiz competitions, and science exhibitions',
      'Library research, digital literacy, and logic development'
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
    image: '/images/guru-paduka-pooja.webp',
    imageCaption: 'Spiritual Depth: Solemn Guru Paduka Pooja & Shloka Recitation',
    locationMeta: 'Central Altar • Morning Assembly',
    description:
      'Awakening moral sensitivity, universal brotherhood, and selfless dedication (Seva). Rooted in daily Guru Paduka Pooja, Bhagavad Gita chanting, Balvihar moral stories, and quiet mindful breathing.',
    activities: [
      'Daily morning prayer assemblies with Sanskrit shlokas and meditation',
      'Annual Chinmaya Mission Inter-School Gita Chanting Competition',
      'Monthly Bhajan assemblies on the 3rd Saturday of every month',
      'Balvihar value education modules teaching integrity and reverence'
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
            <div className="flex items-center gap-2">
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
                  <span>Daily School Implementation:</span>
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
