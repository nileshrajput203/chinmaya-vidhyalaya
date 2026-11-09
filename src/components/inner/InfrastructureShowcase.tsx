import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, 
  Maximize2, X, ArrowRight 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { getFacilityGallery } from '../../utils/imageRegistry';

interface FacilityImage {
  src: string;
  caption: string;
}

interface FacilityItem {
  id: string;
  category: 'labs' | 'academic' | 'sports' | 'campus';
  name: string;
  gallery: FacilityImage[];
  badge: string;
  tagline: string;
  description: string;
  curriculumDetails: string;
  safetyProtocols: string[];
  equipment: string[];
  capacity: string;
  locationMeta: string;
}

const FACILITIES: FacilityItem[] = [
  {
    id: 'physics-lab',
    category: 'labs',
    name: 'Physics Laboratory',
    gallery: getFacilityGallery('physics-lab'),
    badge: 'CBSE Senior Science Lab',
    tagline: 'Precision Optics, Mechanics, Sound & Electromagnetic Investigation',
    description:
      'CBSE-certified laboratory for experimentally exploring optics, mechanics, sound waves, and semiconductor circuits.',
    curriculumDetails:
      'Covers complete CBSE practical syllabus: optical bench calibration, Ohm’s law, potentiometer, sonometers, and p-n junction diodes.',
    safetyProtocols: [
      'Regulated shock-proof DC/AC power supplies with dedicated UPS power backup (no centralized unbuffered power dependency)',
      '24/7 CCTV surveillance monitoring for student safety and practical decorum',
      'Class ABC Fire Extinguishers and emergency safety protocol signage'
    ],
    equipment: [
      'Precision Optical Benches & He-Ne Lasers',
      'Digital & Analog Galvanometers / Ammeters',
      'Travelling Vernier Microscopes',
      'Sonometers & Tuning Fork Resonators',
      'Potentiometers & Meter Bridges',
      'Semiconductor Energy Band Gap Apparatus',
      'Dedicated UPS Power Backup & Continuous 24/7 CCTV Monitoring',
      'Class ABC Fire Extinguishers'
    ],
    capacity: '40+ Students per Session',
    locationMeta: 'Senior Science Block • Ground Floor'
  },
  {
    id: 'chemistry-lab',
    category: 'labs',
    name: 'Chemistry Laboratory',
    gallery: getFacilityGallery('chemistry-lab'),
    badge: 'CBSE Senior Science Lab',
    tagline: 'Analytical Titration, Reagents, Kinetics & Qualitative Analysis',
    description:
      'Equipped with digital analytical balances, titration apparatus, and reagent stations for volumetric titrations and salt analysis.',
    curriculumDetails:
      'Supports CBSE practicals: KMnO4 redox titrations, qualitative inorganic radical analysis, and organic functional group testing.',
    safetyProtocols: [
      'Dedicated sand bucket installed at exit alongside Class ABC Fire Extinguishers',
      'Dedicated UPS power backup (no unbuffered grid dependency) for analytical equipment',
      '24/7 CCTV surveillance monitoring for student safety and lab decorum',
      'Acid-resistant non-porous ceramic bench surfaces and labware only',
      'Mandatory cotton lab aprons and chemical-safe handling'
    ],
    equipment: [
      'Precision 4-Digit Digital Analytical Balances',
      'Individual Gas Burner & Titration Stands',
      'Acid-Resistant Class-A Burettes & Pipettes',
      'Centrifugation Units & Analytical Stations',
      'Colorimetric Analyzers & Reagent Kits',
      'Dedicated Exit Sand Buckets & Class ABC Fire Extinguishers',
      'Dedicated UPS Power Backup & 24/7 CCTV Surveillance'
    ],
    capacity: '40+ Students per Session',
    locationMeta: 'Science Block • Room 104'
  },
  {
    id: 'biology-lab',
    category: 'labs',
    name: 'Biology Laboratory',
    gallery: getFacilityGallery('biology-lab'),
    badge: 'Life Sciences Lab',
    tagline: 'Microscopic Observation, Cytology & Anatomical Specimen Study',
    description:
      'Advanced life sciences facility equipped with digital interactive panel, compound microscopes, botanical herbariums, and anatomical models.',
    curriculumDetails:
      'Aligned to CBSE Class IX-XII: temporary mount preparation, onion root-tip mitosis, potato osmometer, and enzyme salivary amylase action.',
    safetyProtocols: [
      'Hygienic bio-specimen formalin containers sealed to OSHA standards',
      'Non-toxic bio-waste discard jars and antiseptic wash stations',
      'Dedicated UPS power backup for the digital interactive panel and lighting (no unbuffered grid dependency)',
      '24/7 CCTV surveillance monitoring for student safety and lab decorum',
      'Class ABC Fire Extinguishers and emergency safety protocol signage'
    ],
    equipment: [
      'High-Power Binocular Compound Microscopes',
      'Dissecting Stereo Microscopes',
      'Digital Interactive Smart Panel & High-Definition Display Screen',
      '3D Articulated Human Skeleton & Organ Models',
      'Preserved Zoological & Botanical Specimens Archive',
      'Permanent Histological Pathology Slide Banks & Staining Assemblies',
      'Dedicated UPS Power Backup & Continuous 24/7 CCTV Monitoring',
      'Class ABC Fire Extinguishers'
    ],
    capacity: '40+ Students per Session',
    locationMeta: 'Science Block • Room 106'
  },
  {
    id: 'it-lab',
    category: 'labs',
    name: 'Computer & IT Innovation Lab',
    gallery: getFacilityGallery('it-lab'),
    badge: 'Digital Innovation',
    tagline: 'Networked Computing, Scratch & Python Coding & Multimedia',
    description:
      'Modern computing facility featuring networked PC workstations and high-speed broadband for Scratch and Python coding and IT studies.',
    curriculumDetails:
      'Supports CBSE Computer Applications & Science: Scratch block programming, Python coding, cybersecurity, and data structures.',
    safetyProtocols: [
      'Dedicated Online UPS power backup preventing data loss or surge spikes (no unbuffered grid dependency)',
      'Class ABC Fire Extinguishers and emergency safety protocol signage',
      '24/7 CCTV surveillance monitoring with anti-static vinyl flooring',
      'Enterprise firewall filtering restricting access to age-appropriate educational domains'
    ],
    equipment: [
      '45+ Intel Core Dedicated Desktop PC Workstations',
      'Dedicated Online UPS Power Backup & Continuous 24/7 CCTV Monitoring',
      'Class ABC Fire Extinguishers',
      'High-Speed Leased Line Fiber Broadband',
      'Smart Interactive Projector & Display',
      'Licensed Scratch & Python 3.x Development IDEs',
      'Cyber-Safety Content Firewall'
    ],
    capacity: '45 Workstations',
    locationMeta: 'IT Innovation Wing • 1st Floor'
  },
  {
    id: 'library',
    category: 'academic',
    name: 'Central School Library',
    gallery: getFacilityGallery('library'),
    badge: 'Knowledge Hub',
    tagline: 'Over 10,000+ Scholastic Volumes & Serene Reading Lounge',
    description:
      'A serene reading lounge housing over 10,000 reference texts, national periodicals, and competitive exam guides.',
    curriculumDetails:
      'Supports all grades with graded reading levels, competitive entrance guides (JEE/NEET/CUET), and Chinmaya spiritual literature.',
    safetyProtocols: [
      'Fire-safe book shelving units with broad aisles',
      'Quiet acoustic dampening architecture',
      'Barcoded book cataloging for rapid checkout'
    ],
    equipment: [
      '10,000+ Books, Encyclopedias & Reference Volumes',
      'Silent Research Reading Desks & Carrels',
      'Automated Barcode Cataloging Software',
      'National Dailies & International Science Periodicals'
    ],
    capacity: '60+ Reader Capacity',
    locationMeta: 'Academic Wing • 2nd Floor'
  },
  {
    id: 'sports-ground',
    category: 'sports',
    name: 'Athletic Arena & Sports Fields',
    gallery: getFacilityGallery('sports-ground'),
    badge: 'Physical Conditioning',
    tagline: 'Expansive Campus Grounds for Team Leagues & Indoor Sports',
    description:
      'Expansive campus sports arena and indoor activity pavilion featuring dedicated cricket pitch, volleyball, Mallakhamb, and indoor sports facilities.',
    curriculumDetails:
      'CBSE Health & Physical Education compliant: daily fitness drills, inter-house championships, yoga sessions, and state tournament coaching.',
    safetyProtocols: [
      'Comprehensive First Aid emergency response station and trained sports physical educators present at every session',
      'Cushioned safety landing mats, spotters, and faculty supervision for Mallakhamb drills',
      'Levelled grass and clay grounds maintained free of hazards'
    ],
    equipment: [
      'Mallakhamb (Traditional Pole & Rope Gymnastics Apparatus)',
      'Comprehensive First Aid Station & Sports Safety Equipment',
      'Indoor Activity Arena: Table Tennis (TT), Badminton, Chess & Carrom',
      'Volleyball Court & Dedicated Cricket Pitch',
      'Gymnastic Landing Mats & Physical Conditioning Apparatus'
    ],
    capacity: 'Full Campus Cohorts',
    locationMeta: 'East Campus Grounds • Boisar'
  },
  {
    id: 'classrooms',
    category: 'academic',
    name: 'Spacious Ventilated Classrooms',
    gallery: getFacilityGallery('classrooms'),
    badge: 'Learning Spaces',
    tagline: 'High-Ceiling Classrooms with Capacity for Over 40 Students',
    description:
      'Airy, naturally lit learning rooms designed with ergonomic seating, display boards, and 40+ student capacity.',
    curriculumDetails:
      'CBSE compliant layout providing over 1.5 sq. meters floor space per student with acoustic dampening and natural cross-ventilation.',
    safetyProtocols: [
      'Smooth rounded-edge wooden furniture',
      '24/7 CCTV surveillance monitoring for student safety'
    ],
    equipment: [
      'Interactive Digital Panels & Smart Multimedia Displays',
      'High-Speed Wi-Fi for Faculty & Digital Teaching',
      'Dedicated Passenger Lift Access across Classroom Floors',
      'Ergonomic Multi-Tier Student Desks',
      'Broad Wall Display Pin-up Notice Boards'
    ],
    capacity: '>40 Students per Section',
    locationMeta: 'Primary & Secondary Wings'
  },
  {
    id: 'cultural-assembly',
    category: 'campus',
    name: 'Cultural Assembly Arena & Saraswati Mandir',
    gallery: getFacilityGallery('cultural-assembly'),
    badge: 'Cultural Ethos',
    tagline: 'Morning Assembly, Saraswati Mandir, Gita Chanting & Celebrations',
    description:
      'The spiritual and cultural heart of the school featuring the sacred Saraswati Mandir, hosting daily morning prayer assemblies, Gita chanting, devotional bhajans, and stage celebrations.',
    curriculumDetails:
      'Anchors the Chinmaya Vision Programme (CVP): daily morning prayers at Saraswati Mandir, Guru Paduka Pooja, Indian cultural values, and stage confidence through public speaking and dramatics.',
    safetyProtocols: [
      'Wide covered courtyard with non-slip flooring',
      'Overhead sun/rain protective architectural canopy',
      'Surge-protected professional PA sound system',
      'Dedicated prayer sanctum and disciplined assembly queue management'
    ],
    equipment: [
      'Sacred Saraswati Mandir & Devotional Prayer Sanctum',
      'Elevated Performance Theatrical Stage & Auditorium',
      'Pujya Gurudev Paduka Altar and Traditional Brass Diya Installations',
      'High-Output Acoustic Sound Reinforcement PA System',
      'Spacious covered courtyard seating for complete school student body'
    ],
    capacity: '1,000+ Audience',
    locationMeta: 'Central Courtyard & Saraswati Mandir'
  }
];

// Interactive In-Card Photo Carousel Component
const FacilityCardCarousel: React.FC<{
  facility: FacilityItem;
  onOpenLightbox: (src: string, caption: string) => void;
}> = ({ facility, onOpenLightbox }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = facility.gallery;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const currentPhoto = images[currentIdx] || images[0];

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 group/carousel select-none">
      {/* Active Photo */}
      <img
        src={currentPhoto.src}
        alt={`${facility.name} - ${currentPhoto.caption}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 cursor-pointer hover:scale-105"
        onClick={() => onOpenLightbox(currentPhoto.src, currentPhoto.caption)}
      />



      {/* Fullscreen Inspect Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenLightbox(currentPhoto.src, currentPhoto.caption);
        }}
        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/50 hover:bg-[#DF711B] text-white transition-all opacity-0 group-hover/carousel:opacity-100 shadow-md cursor-pointer z-10"
        title="Inspect Fullscreen"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Arrow Controls (visible when multiple photos exist) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#DF711B] text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-md cursor-pointer z-10 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#DF711B] text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-md cursor-pointer z-10 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none z-10">
            {images.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === currentIdx
                    ? 'w-5 h-1.5 bg-[#FFB740]'
                    : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const InfrastructureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'labs' | 'academic' | 'sports' | 'campus'>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; caption: string }>({
    isOpen: false,
    src: '',
    caption: '',
  });

  // Lock body/Lenis scrolling while lightbox is active
  useBodyScrollLock(lightbox.isOpen);

  const location = useLocation();
  const gridRef = useRef<HTMLDivElement>(null);

  // Deep-Link & URL Hash Auto-Scroll Detection (e.g. #physics-lab from home page cards)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || new URLSearchParams(window.location.search).get('lab');
    if (hash) {
      // If clicking one of the 4 labs, switch to 'labs' tab
      if (['physics-lab', 'chemistry-lab', 'biology-lab', 'it-lab'].includes(hash)) {
        setActiveTab('labs');
      }

      // Smooth scroll to the lab element after DOM updates
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(hash);
          setTimeout(() => setHighlightedId(null), 3500);
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [location.hash, location.search]);

  const filtered = activeTab === 'all' ? FACILITIES : FACILITIES.filter((f) => f.category === activeTab);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [activeTab]);

  return (
    <div className="space-y-12">
      
      {/* Intro Hero Banner with AnimatedBackground Tabs */}
      <InView>
        <SpotlightCard
          spotlightColor="rgba(223, 113, 27, 0.08)"
          className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-card space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <BadgePill
                  label="Campus Tour & Infrastructure Directory"
                  variant="saffron"
                  pulse
                />
                <span className="text-xs font-mono text-slate-500">
                  CBSE Affiliation No. 1130058 • Boisar
                </span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
                State-of-the-Art Learning & Laboratory Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Chinmaya Vidyalaya Tarapur provides world-class educational spaces that empower experiential learning. Explore our certified Physics, Chemistry, Biology, and IT Innovation laboratories - each equipped with dedicated apparatus, continuous safety ventilation, and individual student workstations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-2xs text-center space-y-1">
                <span className="text-xs font-mono text-[#DF711B] font-bold uppercase">Science & IT Labs</span>
                <div className="font-cinzel text-2xl font-black text-[#181C20]">4 Dedicated Labs</div>
                <p className="text-[11px] text-slate-500">Physics, Chemistry, Biology & IT</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-2xs text-center space-y-1">
                <span className="text-xs font-mono text-[#0B1E34] font-bold uppercase">Safety Standards</span>
                <div className="font-cinzel text-2xl font-black text-[#181C20]">100% Certified</div>
                <p className="text-[11px] text-slate-500">CCTV, UPS & Fire Safety Compliant</p>
              </div>
            </div>
          </div>

          {/* Sliding Tab Filters */}
          <div className="pt-4 border-t border-[#E7E2D8]">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold mr-3 block sm:inline mb-2 sm:mb-0">
              Filter Campus Facilities:
            </span>
            <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-white border border-[#E7E2D8] shadow-2xs gap-1">
              {[
                { id: 'all', label: 'All Campus Facilities' },
                { id: 'labs', label: '🔬 Science & IT Laboratories' },
                { id: 'academic', label: '📚 Classrooms & Library' },
                { id: 'sports', label: '🏆 Sports Arena & Grounds' },
                { id: 'campus', label: '🪷 Cultural Stage & Saraswati Mandir' }
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    type="button"
                    className={`relative px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-facility-tab-bg"
                        className="absolute inset-0 bg-[#DF711B] rounded-xl shadow-sm z-0"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </SpotlightCard>
      </InView>

      {/* Facilities Cards Grid with In-Card Multi-Photo Carousel */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((facility) => {
          const isHighlighted = highlightedId === facility.id;

          return (
            <div
              key={facility.id}
              id={facility.id}
              className={`rounded-3xl transition-all duration-500 scroll-mt-28 ${
                isHighlighted
                  ? 'ring-4 ring-[#DF711B] shadow-2xl scale-[1.01]'
                  : ''
              }`}
            >
              <SpotlightCard
                spotlightColor="rgba(223, 113, 27, 0.08)"
                className="bg-white border border-[#E7E2D8] rounded-3xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Photo Showcase with Interactive In-Card Carousel */}
                  <FacilityCardCarousel
                    facility={facility}
                    onOpenLightbox={(src, caption) => setLightbox({ isOpen: true, src, caption })}
                  />

                  {/* Text Information & Explanations */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                          {facility.locationMeta}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-2xl font-black text-[#181C20] group-hover:text-[#DF711B] transition-colors mt-1">
                        {facility.name}
                      </h3>
                      <p className="text-xs font-mono text-[#DF711B] font-semibold mt-1">
                        {facility.tagline}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-slate-600 leading-relaxed font-normal">
                      {facility.description}
                    </p>

                    {/* Equipment / Apparatus Checklist */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-mono text-slate-500 font-bold uppercase block">
                        Verified Instruments & Workstations:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {facility.equipment.map((eq, eqIdx) => (
                          <div
                            key={eqIdx}
                            className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-[11px] font-medium text-slate-700 flex items-start gap-2 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="break-words">{eq}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Safety Features */}
                    {facility.safetyProtocols && facility.safetyProtocols.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono text-slate-500 font-bold uppercase block flex items-center gap-1 text-slate-600">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#DF711B]" />
                          <span>Safety Standards & Protocol:</span>
                        </span>
                        <ul className="text-xs text-slate-600 space-y-1 font-sans">
                          {facility.safetyProtocols.map((sp, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="text-[#DF711B] font-bold">•</span>
                              <span>{sp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </div>

                <div className="p-6 pt-0 bg-white">
                  <div className="border-t border-[#E7E2D8] pt-4 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>CBSE Compliant Laboratory</span>
                    <Link
                      to="/admissions/guidelines"
                      className="text-[#DF711B] hover:text-[#C45B0E] font-bold hover:underline inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Inquire About Admissions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>

      {/* Statutory Safety & Fire Clearance Strip */}
      <InView>
        <div className="bg-[#FAF3E8] border border-[#FDE49C] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DF711B] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                Statutory Laboratory Safety & Environmental Approvals
              </h4>
              <p className="text-xs text-slate-600 font-normal">
                All school science laboratories and campus buildings hold certified Fire Safety clearances, structural stability approvals, safe chemical disposal norms, and certified potable drinking water test clearances.
              </p>
            </div>
          </div>
          <Link
            to="/about/mandatory-information"
            className="px-5 py-2.5 bg-[#0B1E34] hover:bg-[#182C44] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            View Public Disclosures
          </Link>
        </div>
      </InView>

      {/* Lightbox Fullscreen Modal */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 overscroll-contain select-none"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onClick={() => setLightbox({ isOpen: false, src: '', caption: '' })}
        >
          <button
            type="button"
            onClick={() => setLightbox({ isOpen: false, src: '', caption: '' })}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            title="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-3 overscroll-contain"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <p className="text-sm font-sans text-white text-center max-w-2xl px-4 drop-shadow">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
