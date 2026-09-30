import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Eye, LayoutGrid } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface TourDestination {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  caption: string;
  description: string;
  locations: string[];
  outcomes: string[];
  safetyHighlight: string;
}

const TOURS: TourDestination[] = [
  {
    id: 'heritage',
    title: 'Heritage & Historical Excursions',
    category: 'Historical Awakening',
    badge: 'Chhatrapati Shivaji Maharaj Legacy',
    image: '/images/tour.jpg',
    caption: 'Students Exploring Historical Forts & National Heritage Monuments across Maharashtra',
    description:
      'Visiting historic forts, rock-cut archaeological caves, and heritage landmarks across Maharashtra, providing students with first-hand tactile encounters with India’s ancient engineering, valor, and freedom struggles.',
    locations: ['Raigad Fort & War Memorials', 'Elephanta Rock-Cut Architecture', 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya'],
    outcomes: [
      'Appreciating military fort engineering and hill-slope water conservation',
      'Connecting regional Maratha history with CBSE social science curriculum',
      'Maintaining field research journals and architectural sketches'
    ],
    safetyHighlight: 'Designated local historical guides & faculty chaperones at every monument'
  },
  {
    id: 'eco',
    title: 'Ecological & Nature Exploration Camps',
    category: 'Environmental Stewardship',
    badge: 'Biodiversity & Conservation',
    image: '/images/school_events/School_Event_2026-09-27_008.jpg',
    caption: 'Nature Trails, Biodiversity Camps & Botanical Field Observations',
    description:
      'Immersive nature excursions to wildlife reserves, coastal mangrove ecosystems along the Palghar coast, and agricultural research centers where students observe ecological interdependencies and native biodiversity.',
    locations: ['Palghar Coastal Mangrove Ecosystems', 'Sanjay Gandhi National Park Nature Trail', 'Bordi Agro-Botanical Conservation Center'],
    outcomes: [
      'Documenting native coastal flora, fauna, and tidal ecology',
      'Learning waste management and plastic-free trail conservation',
      'Instilling deep spiritual reverence for Mother Nature (Prakriti)'
    ],
    safetyHighlight: 'Strict safety perimeter, licensed naturalists, and first-aid response team'
  },
  {
    id: 'industry',
    title: 'Industrial & Scientific Field Visits',
    category: 'Applied Technology',
    badge: 'STEM & Industrial Corridor',
    image: '/images/school_events/School_Event_2026-09-27_009.jpg',
    caption: 'Industrial Facility Visits & Scientific Manufacturing Plant Tours',
    description:
      'Educational tours to manufacturing plants, clean energy units, and scientific research institutes around Boisar and Tarapur industrial corridor, bridging classroom theories with industrial engineering and robotics.',
    locations: ['Tarapur Industrial Corridor Manufacturing Units', 'Clean Solar & Power Generation Facilities', 'Automation & Precision Engineering Workshops'],
    outcomes: [
      'Observing mass production, automated assembly lines, and QA testing',
      'Understanding industrial safety protocols, ISO standards, and environmental filters',
      'Early career insights into mechanical, chemical, and software engineering'
    ],
    safetyHighlight: 'Mandatory PPE (helmets, goggles, badges) with industrial safety supervisors'
  }
];

export const EducationToursShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeTour = TOURS[activeIdx];

  useEffect(() => {
    if (stageRef.current && !showAllGrid) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
      );
    }
  }, [activeIdx, showAllGrid]);

  return (
    <div className="space-y-10">
      {/* Intro Editorial Banner */}
      <SpotlightCard className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <BadgePill variant="amber" label="Experiential Field Learning" icon="compass" />
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-[#E7E2D8]">
            Annual Educational Expeditions • Std IV – XII
          </span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
          Expanding Horizons Beyond Classroom Walls
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
          At Chinmaya Vidyalaya, education does not end at the classroom door. We organise carefully structured educational tours and field trips that encourage experiential observation, self-reliance, social adaptability, and deep reverence for India’s natural and historical riches.
        </p>

        {/* View Switcher & Tour Selector Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#E7E2D8]">
          <div className="flex flex-wrap items-center gap-2">
            {TOURS.map((tour, idx) => (
              <button
                key={tour.id}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setShowAllGrid(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  !showAllGrid && activeIdx === idx
                    ? 'bg-[#0B1E34] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-[#FAF3E8] border border-[#E7E2D8]'
                }`}
              >
                <span>{tour.category}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllGrid(!showAllGrid)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#DF711B] hover:text-[#c45f12] bg-[#FAF3E8] px-3.5 py-2 rounded-xl border border-[#FDE49C] transition-colors ml-auto"
          >
            {showAllGrid ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Focus Studio View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Show All 3 Tours Grid</span>
              </>
            )}
          </button>
        </div>
      </SpotlightCard>

      {/* View Mode 1: Interactive Studio Stage */}
      {!showAllGrid ? (
        <div ref={stageRef}>
          <SpotlightCard className="bg-white border-2 border-[#E7E2D8] rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Photo Area */}
              <div className="lg:col-span-6 bg-slate-900 relative min-h-[340px] lg:min-h-[460px] flex flex-col justify-between overflow-hidden">
                <img
                  src={activeTour.image}
                  alt={activeTour.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E34] via-transparent to-black/30" />

                <div className="relative z-10 p-6 flex items-start justify-between">
                  <span className="bg-[#DF711B] text-white px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-md">
                    {activeTour.category}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-mono">
                    Chinmaya Vidyalaya
                  </span>
                </div>

                <div className="relative z-10 p-6 text-white space-y-1.5">
                  <span className="text-[11px] font-mono text-[#F7B928] uppercase font-bold tracking-wider block">
                    {activeTour.badge}
                  </span>
                  <p className="text-xs text-slate-200">
                    {activeTour.caption}
                  </p>
                </div>
              </div>

              {/* Tour Details */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Expedition Curriculum
                    </span>
                    <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] leading-snug">
                      {activeTour.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {activeTour.description}
                  </p>

                  {/* Typical Locations */}
                  <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-xl space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#0B1E34] block">
                      Featured Expedition Destinations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeTour.locations.map((loc, lIdx) => (
                        <span
                          key={lIdx}
                          className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#E7E2D8] text-xs font-mono text-slate-700"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#DF711B]" />
                          <span>{loc}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Educational Outcomes */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#DF711B] block">
                      Core Learning Outcomes:
                    </span>
                    <ul className="space-y-1.5">
                      {activeTour.outcomes.map((out, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Safety Protocol Note */}
                <div className="border-t border-[#E7E2D8] pt-4 flex items-center gap-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#DF711B] shrink-0" />
                  <span className="font-mono">{activeTour.safetyHighlight}</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      ) : (
        /* View Mode 2: All 3 Tours Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOURS.map((tour, idx) => (
            <SpotlightCard
              key={tour.id}
              className="bg-white border border-[#E7E2D8] rounded-3xl overflow-hidden shadow-card flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1E34]/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                    {tour.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-cinzel font-bold text-lg text-[#181C20] group-hover:text-[#DF711B] transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {tour.description}
                  </p>

                  <div className="border-t border-[#E7E2D8] pt-3 space-y-1.5">
                    <span className="text-[10px] font-mono text-[#DF711B] font-bold uppercase block">
                      Learning Outcomes:
                    </span>
                    {tour.outcomes.map((o, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                        <span className="line-clamp-1">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-t border-[#E7E2D8] flex items-center justify-between">
                <span className="text-[11px] text-[#4A5568] font-medium truncate">
                  {tour.caption}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx);
                    setShowAllGrid(false);
                  }}
                  className="text-xs font-mono text-[#DF711B] font-bold hover:underline shrink-0 ml-2"
                >
                  Focus →
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Safety Protocol Banner */}
      <SpotlightCard className="bg-[#FAF3E8] border border-[#FDE49C] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DF711B] text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#181C20]">
              Rigorous Tour Safety & 1:10 Chaperone Protocols
            </h4>
            <p className="text-xs text-slate-600 font-normal">
              All excursions are escorted by trained faculty members with strict 1:10 chaperone ratios, certified transport operators with GPS tracking, medical emergency first-aid kits, and regular parent WhatsApp communication broadcasts.
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
