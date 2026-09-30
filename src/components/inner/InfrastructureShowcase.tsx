import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../ui/animated-background';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface FacilityItem {
  id: string;
  category: 'labs' | 'academic' | 'sports' | 'campus';
  name: string;
  image: string;
  badge: string;
  tagline: string;
  description: string;
  equipment: string[];
  capacity: string;
  locationMeta: string;
}

const FACILITIES: FacilityItem[] = [
  {
    id: 'physics-lab',
    category: 'labs',
    name: 'Physics Laboratory',
    image: '/images/phys.jpeg',
    badge: 'Senior STEM Lab',
    tagline: 'Precision Optics, Mechanics & Electrical Investigation',
    description:
      'Fully equipped in strict accordance with CBSE Senior Secondary specifications. The lab features optical benches, spectrometer stations, sonometers, Ohm’s law trainers, and dedicated dark-room facilities for light and laser experiments.',
    equipment: ['Optical Benches & Lasers', 'Digital Galvanometers & Ammeters', 'Travelling Microscopes', 'Dark Room Optical Setup'],
    capacity: '40+ Students per Session',
    locationMeta: 'Senior Lab Wing • Ground Floor'
  },
  {
    id: 'chemistry-lab',
    category: 'labs',
    name: 'Chemistry Laboratory',
    image: '/images/CHEM1.jpeg',
    badge: 'Senior STEM Lab',
    tagline: 'Analytical Titration, Reagents & Chemical Synthesis',
    description:
      'Engineered for chemical experimentation with continuous ventilation, fume hoods, reagent storage racks, emergency eye-wash stations, and precision digital balances for analytical salt analysis and organic synthesis.',
    equipment: ['Fume Hood Ventilation', 'Precision Digital Balances', 'Individual Titration Stations', 'Safe Chemical Reagent Racks'],
    capacity: '40+ Students per Session',
    locationMeta: 'Science Block • Room 104'
  },
  {
    id: 'biology-lab',
    category: 'labs',
    name: 'Biology Laboratory',
    image: '/images/biology-lab.jpg',
    badge: 'Life Sciences Lab',
    tagline: 'Microscopic Observation & Anatomical Specimen Study',
    description:
      'A sanctuary for biological inquiry containing advanced compound and dissecting microscopes, permanent histological slide collections, botanical and zoological specimens, and three-dimensional human anatomical charts.',
    equipment: ['High-Power Compound Microscopes', 'Extensive Specimen Archives', 'Human Skeletal Models', 'Botanical Sectioning Tools'],
    capacity: '40+ Students per Session',
    locationMeta: 'Science Block • Room 106'
  },
  {
    id: 'it-lab',
    category: 'labs',
    name: 'Computer & IT Innovation Lab',
    image: '/images/it-lab.jpg',
    badge: 'Digital Innovation',
    tagline: 'Networked Computing, Python/Java Coding & Multimedia',
    description:
      'State-of-the-art computer lab equipped with high-speed networked desktop computers, high-bandwidth fiber optic internet, licensed programming IDEs (Python, C++, Java), and interactive smart projection for modern digital literacy.',
    equipment: ['Dedicated Networked PC Workstations', 'High-Speed Fiber Connectivity', 'Modern Programming IDEs', 'Digital Projection & Smart Screen'],
    capacity: '45 Workstations',
    locationMeta: 'IT Innovation Wing • 1st Floor'
  },
  {
    id: 'library',
    category: 'academic',
    name: 'Central School Library',
    image: '/images/lib.jpg',
    badge: 'Knowledge Hub',
    tagline: 'Over 10,000+ Scholastic Volumes & Serene Reading Lounge',
    description:
      'A serene, well-lit intellectual repository housing comprehensive collections of NCERT/CBSE reference texts, national periodicals, daily newspapers, classic literature, encyclopedias, and competitive examination guides.',
    equipment: ['10,000+ Books & Periodicals', 'Silent Study & Research Alcoves', 'Digital Automated Cataloging', 'Newspaper & Journal Archive'],
    capacity: '60+ Reader Capacity',
    locationMeta: 'Academic Wing • 2nd Floor'
  },
  {
    id: 'sports-ground',
    category: 'sports',
    name: 'Athletic Arena & Sports Fields',
    image: '/images/banner-8.webp',
    badge: 'Physical Conditioning',
    tagline: 'Expansive Campus Grounds for Track, Field & Team Leagues',
    description:
      'Expansive outdoor sports grounds providing facilities for track and field athletics, football, cricket, volleyball, kabaddi, and kho-kho. Home to daily morning yoga drills, march past practice, and the grand Annual Sports Meet.',
    equipment: ['Athletic Running Track', 'Football & Cricket Pitches', 'Volleyball Court', 'Complete Athletic Gear & Nets'],
    capacity: 'Full Campus Cohorts',
    locationMeta: 'East Campus Grounds • Boisar'
  },
  {
    id: 'classrooms',
    category: 'academic',
    name: 'Spacious Ventilated Classrooms',
    image: '/images/chinmaya/academics/classroom_learning_001.jpg',
    badge: 'Learning Spaces',
    tagline: 'High-Ceiling Classrooms with Capacity for Over 40 Students',
    description:
      'Airy, naturally illuminated classrooms designed with ergonomic furniture, broad display boards, green writing surfaces, and capacity exceeding 40 students while maintaining optimal student-teacher interaction.',
    equipment: ['Ergonomic Student Desks', 'Broad Display Notice Boards', 'Optimal Acoustic Architecture', 'Audio-Visual Support Ready'],
    capacity: '>40 Students per Section',
    locationMeta: 'Primary & Secondary Wings'
  },
  {
    id: 'cultural-assembly',
    category: 'campus',
    name: 'Cultural Assembly Arena & Stage',
    image: '/images/banner-4.jpeg',
    badge: 'Cultural Ethos',
    tagline: 'Morning Assembly, Gita Chanting & Annual Day Celebrations',
    description:
      'The vibrant cultural nerve center of the school where daily Guru Paduka Pooja, morning prayer assemblies, monthly bhajans, Geeta chanting competitions, and grand theatrical performances take place.',
    equipment: ['Acoustic Sound Reinforcement', 'Elevated Theatrical Stage', 'Ceremonial Paduka Pooja Altar', 'Full School Assembly Capacity'],
    capacity: '1,000+ Audience',
    locationMeta: 'Central Courtyard Stage'
  }
];

export const InfrastructureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'labs' | 'academic' | 'sports' | 'campus'>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeTab === 'all' ? FACILITIES : FACILITIES.filter((f) => f.category === activeTab);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [activeTab]);

  return (
    <div className="space-y-12">
      {/* Intro Hero Banner with 21st.dev AnimatedBackground Tabs */}
      <InView>
        <SpotlightCard
          spotlightColor="rgba(223, 113, 27, 0.08)"
          className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BadgePill
                  label="Campus Tour & Architecture"
                  variant="saffron"
                  pulse
                />
                <span className="text-xs font-mono text-slate-500">
                  CBSE Affiliation No. 1130058
                </span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
                State-of-the-Art Learning Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Chinmaya Vidyalaya Tarapur provides world-class educational spaces that empower experiential learning. From precision science laboratories to spacious classrooms exceeding 40 student capacity and vast athletic grounds, every square foot is engineered for child safety, curiosity, and academic excellence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-2xs text-center space-y-1">
                <span className="text-xs font-mono text-[#DF711B] font-bold uppercase">Classroom Sizing</span>
                <div className="font-cinzel text-2xl font-black text-[#181C20]">&gt;40 Capacity</div>
                <p className="text-[11px] text-slate-500">Spacious & Well-Ventilated</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-2xs text-center space-y-1">
                <span className="text-xs font-mono text-[#0B1E34] font-bold uppercase">Campus Safety</span>
                <div className="font-cinzel text-2xl font-black text-[#181C20]">100% Certified</div>
                <p className="text-[11px] text-slate-500">Fire & Building Safety Compliant</p>
              </div>
            </div>
          </div>

          {/* 21st.dev Animated Sliding Tab Filters */}
          <div className="pt-4 border-t border-[#E7E2D8]">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold mr-3 block sm:inline mb-2 sm:mb-0">
              Filter Spaces:
            </span>
            <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-white border border-[#E7E2D8] shadow-2xs">
              <AnimatedBackground
                defaultValue={activeTab}
                className="rounded-xl bg-[#DF711B] shadow-sm"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                onValueChange={(val) => {
                  if (val) setActiveTab(val as any);
                }}
              >
                {[
                  { id: 'all', label: 'All Campus Facilities' },
                  { id: 'labs', label: 'STEM & IT Laboratories' },
                  { id: 'academic', label: 'Academic & Library' },
                  { id: 'sports', label: 'Sports & Grounds' },
                  { id: 'campus', label: 'Cultural & Assembly' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    data-id={tab.id}
                    type="button"
                    className={`px-3.5 py-1.5 text-xs font-mono font-bold transition-colors cursor-pointer rounded-xl ${
                      activeTab === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </AnimatedBackground>
            </div>
          </div>
        </SpotlightCard>
      </InView>

      {/* Facilities Cards Grid with Real Photos & 21st.dev Spotlight */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((facility) => (
          <InView key={facility.id}>
            <SpotlightCard
              spotlightColor="rgba(223, 113, 27, 0.08)"
              className="bg-white border border-[#E7E2D8] rounded-3xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div>
                {/* Photo Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0B1E34]/90 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow">
                    {facility.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#181C20] px-3 py-1 rounded-lg text-xs font-mono font-bold border border-[#E7E2D8] shadow-sm">
                    {facility.capacity}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white/90 px-2.5 py-1 rounded text-[10px] font-mono">
                    {facility.locationMeta}
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-[#181C20] group-hover:text-[#DF711B] transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-xs font-mono text-[#DF711B] font-semibold mt-1">
                      {facility.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {facility.description}
                  </p>

                  {/* Equipment / Feature Pills */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase block">
                      Key Features & Apparatus:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {facility.equipment.map((eq, eqIdx) => (
                        <div
                          key={eqIdx}
                          className="bg-[#FAF8F5] border border-[#E7E2D8] p-2 rounded-lg text-[11px] font-medium text-slate-700 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                          <span className="truncate">{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 bg-white">
                <div className="border-t border-[#E7E2D8] pt-4 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>CBSE Verified Facility</span>
                  <span className="text-[#DF711B] font-bold">Chinmaya Vidyalaya Boisar</span>
                </div>
              </div>
            </SpotlightCard>
          </InView>
        ))}
      </div>

      {/* Safety & Compliance Badge Strip */}
      <InView>
        <div className="bg-[#FAF3E8] border border-[#FDE49C] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DF711B] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                Statutory Safety, Fire & Water Certification
              </h4>
              <p className="text-xs text-slate-600 font-normal">
                All school laboratories and campus buildings hold active Fire Safety clearances, structural stability certificates, and certified potable drinking water test approvals.
              </p>
            </div>
          </div>
          <Link
            to="/about/mandatory-information"
            className="px-5 py-2.5 bg-[#0B1E34] hover:bg-[#182C44] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            View Safety Disclosures
          </Link>
        </div>
      </InView>
    </div>
  );
};
