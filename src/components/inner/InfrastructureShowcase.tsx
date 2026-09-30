import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, 
  Maximize2, X, Sparkles, ArrowRight 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatedBackground } from '../ui/animated-background';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

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
    gallery: [
      { src: '/images/phys.jpeg', caption: 'Senior Secondary Physics Lab: Optical Benches & Ray Optics Station' },
      { src: '/images/phys.webp', caption: 'Individual Student Workstations with Precision Galvanometers & Circuits' },
      { src: '/images/chinmaya-web-science.jpg', caption: 'Senior STEM Students Performing Optics Calibration' },
      { src: '/images/chinmaya/academics/classroom_learning_001.jpg', caption: 'Faculty Mentorship & Practical Demonstration Session' }
    ],
    badge: 'CBSE Senior STEM Lab',
    tagline: 'Precision Optics, Mechanics, Sound & Electromagnetic Investigation',
    description:
      'Fully equipped in strict accordance with CBSE Senior Secondary specifications. The lab enables students from Class IX through XII to experimentally prove theoretical laws of physics through tactile inquiry, error calculation, and data plotting.',
    curriculumDetails:
      'Covers complete CBSE Class XI & XII practical syllabus including focal length of spherical mirrors/lenses, refractive index via travelling microscope, potentiometer comparisons, Ohm’s law, sonometer frequency tuning, and semiconductor p-n junction diode characteristics.',
    safetyProtocols: [
      'Shock-proof regulated DC/AC power supplies with centralized circuit breakers',
      'Dedicated dark room enclosure for laser diffraction and light experiments',
      'Rigid granite vibration-isolated benches for optical alignment',
      'Safety goggles provided during high-voltage and spring-tension experiments'
    ],
    equipment: [
      'Precision Optical Benches & He-Ne Lasers',
      'Digital & Analog Galvanometers / Ammeters',
      'Travelling Vernier Microscopes',
      'Sonometers & Tuning Fork Resonators',
      'Potentiometers & Meter Bridges',
      'Semiconductor Energy Band Gap Apparatus'
    ],
    capacity: '40+ Students per Session',
    locationMeta: 'Senior Science Block • Ground Floor'
  },
  {
    id: 'chemistry-lab',
    category: 'labs',
    name: 'Chemistry Laboratory',
    gallery: [
      { src: '/images/CHEM1.jpeg', caption: 'Analytical Chemistry Lab: Acid-Base Titration Workstations with Aprons' },
      { src: '/images/chinmaya-web-science.webp', caption: 'Chemical Synthesis & Qualitative Salt Analysis Bench' },
      { src: '/images/chinmaya/academics/classroom_learning_003.jpg', caption: 'Student Groups Executing Organic Reagent Tests' },
      { src: '/images/img3.webp', caption: 'Fume Hood Ventilation & Dedicated Reagent Storage Shelf' }
    ],
    badge: 'CBSE Senior STEM Lab',
    tagline: 'Analytical Titration, Reagents, Kinetics & Qualitative Analysis',
    description:
      'Engineered for chemical experimentation with continuous ventilation, fume hoods, reagent storage racks, emergency eye-wash stations, and precision digital balances for analytical salt analysis, volumetric titrations, and chemical kinetics.',
    curriculumDetails:
      'Supports CBSE practical requirements: Acid-Base and Redox titrations using standard KMnO4 / Mohr’s salt solutions, systematic identification of acidic and basic radicals (qualitative inorganic salt analysis), enthalpy of solution thermochemistry, and organic functional group tests.',
    safetyProtocols: [
      'Continuous mechanical fume exhaust hoods for toxic vapor mitigation',
      'Emergency chemical eye-wash shower and deluge fountain',
      'Class ABC Fire Extinguishers, fire blanket, and sand buckets installed at exit',
      'Acid-resistant non-porous ceramic bench surfaces and borosilicate labware only',
      'Mandatory cotton lab aprons, protective eye glasses, and chemical-safe handling'
    ],
    equipment: [
      'Mechanical Fume Exhaust Hoods',
      'Precision 4-Digit Digital Analytical Balances',
      'Individual Gas Burner & Titration Stands',
      'Borosilicate Class-A Burettes & Pipettes',
      'Centrifugation & Water Bath Heaters',
      'pH Meters & Colorimetric Analyzers'
    ],
    capacity: '40+ Students per Session',
    locationMeta: 'Science Block • Room 104'
  },
  {
    id: 'biology-lab',
    category: 'labs',
    name: 'Biology Laboratory',
    gallery: [
      { src: '/images/biology-lab.jpg', caption: 'Life Sciences Lab: Students Examining Cellular Structures under Microscopes' },
      { src: '/images/biology-lab.webp', caption: 'Compound Microscopes & 3D Human Skeletal Anatomy Models' },
      { src: '/images/chinmaya/academics/classroom_learning_005.jpg', caption: 'Botanical Slide Preparation & Tissue Cross-Sectioning' },
      { src: '/images/tour.webp', caption: 'Botanical Herbarium & Specimen Archive Collection' }
    ],
    badge: 'Life Sciences Lab',
    tagline: 'Microscopic Observation, Cytology & Anatomical Specimen Study',
    description:
      'A sanctuary for biological inquiry containing advanced compound and dissecting microscopes, permanent histological slide collections, preserved botanical and zoological specimens, and three-dimensional human anatomical models.',
    curriculumDetails:
      'Curriculum aligned to CBSE Class IX to XII: Temporary mount preparation (onion peel, human cheek cells, stomata), study of mitosis in onion root tips, osmosis experiments via potato osmometer, enzyme salivary amylase action, and ecological quadrats.',
    safetyProtocols: [
      'Hygienic bio-specimen formalin containers sealed to OSHA standards',
      'Safe microtome sectioning with protective safety razors under faculty supervision',
      'Non-toxic bio-waste discard jars and antiseptic wash stations',
      'Regular ultraviolet sterilization of microscopic lenses and stage plates'
    ],
    equipment: [
      'High-Power Binocular Compound Microscopes',
      'Dissecting Stereo Microscopes',
      'Preserved Zoological & Botanical Specimens Archive',
      '3D Articulated Human Skeleton & Organ Models',
      'Permanent Histological Pathology Slide Banks',
      'Microtomes & Plant Staining Assemblies'
    ],
    capacity: '40+ Students per Session',
    locationMeta: 'Science Block • Room 106'
  },
  {
    id: 'it-lab',
    category: 'labs',
    name: 'Computer & IT Innovation Lab',
    gallery: [
      { src: '/images/it-lab.jpg', caption: 'Central Computer Center: Networked Workstations with Individual PCs' },
      { src: '/images/it-lab.webp', caption: 'CBSE IT Lab Coding Session: Python, Java & Web Development' },
      { src: '/images/chinmaya/academics/classroom_learning_002.jpg', caption: 'Smart Whiteboard Projection & Digital Mentoring Station' },
      { src: '/images/img1.webp', caption: 'High-Speed Broadband Infrastructure & Central Server Rack' }
    ],
    badge: 'Digital Innovation',
    tagline: 'Networked Computing, Python/Java Coding & Multimedia',
    description:
      'State-of-the-art computer lab equipped with high-speed networked desktop computers, high-bandwidth fiber optic internet, licensed programming IDEs (Python, C++, Java), and interactive smart projection for modern digital literacy.',
    curriculumDetails:
      'Supports CBSE Computer Applications (Classes IX & X), Computer Science (Classes XI & XII), and Informatics Practices. Students learn algorithms, computational thinking, Python programming, MySQL database queries, cybersecurity ethics, and data structures.',
    safetyProtocols: [
      'Industrial centralized Online UPS power backup preventing data loss or surge spikes',
      'Enterprise firewall filtering restricting access to age-appropriate educational domains',
      'Ergonomic anti-glare screens and adjustable posture seating',
      'CCTV monitored lab environment with anti-static vinyl flooring'
    ],
    equipment: [
      '45+ Intel Core Dedicated Desktop PC Workstations',
      'High-Speed Leased Line Fiber Broadband',
      'Smart Interactive Interactive Projector & Display',
      'Licensed Python 3.x, MySQL & Java JDK IDEs',
      'Centralized School Management & Server Workstation',
      'Cyber-Safety Content Firewall'
    ],
    capacity: '45 Workstations',
    locationMeta: 'IT Innovation Wing • 1st Floor'
  },
  {
    id: 'library',
    category: 'academic',
    name: 'Central School Library',
    gallery: [
      { src: '/images/lib.jpg', caption: 'Central Library: Reading Lounge with Open-Shelf Reference Archives' },
      { src: '/images/lib.webp', caption: 'Quiet Study Niches & National Scholastic Journals' },
      { src: '/images/img4.webp', caption: 'Digital Indexing & Student Book Issue Counter' }
    ],
    badge: 'Knowledge Hub',
    tagline: 'Over 10,000+ Scholastic Volumes & Serene Reading Lounge',
    description:
      'A serene, well-lit intellectual repository housing comprehensive collections of NCERT/CBSE reference texts, national periodicals, daily newspapers, classic literature, encyclopedias, and competitive examination guides.',
    curriculumDetails:
      'Supports all classes from Pre-Primary through Class XII with graded reading levels, CBSE competitive guides (JEE, NEET, CUET, NDA), Chinmaya Mission spiritual literature, and monthly book review circles.',
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
    gallery: [
      { src: '/images/banner-8.webp', caption: 'East Athletic Grounds: Running Track & Outdoor Field Events' },
      { src: '/images/chinmaya/sports/sports_athletic_meet_001.webp', caption: 'Annual Sports Meet: Track Sprint Finals & March Past' },
      { src: '/images/chinmaya/sports/sports_athletic_meet_002.webp', caption: 'House Athletic Drills & Physical Vitality Training' }
    ],
    badge: 'Physical Conditioning',
    tagline: 'Expansive Campus Grounds for Track, Field & Team Leagues',
    description:
      'Expansive outdoor sports grounds providing facilities for track and field athletics, football, cricket, volleyball, kabaddi, and kho-kho. Home to daily morning yoga drills, march past practice, and the grand Annual Sports Meet.',
    curriculumDetails:
      'Incorporates CBSE Health and Physical Education (HPE) mandatory curriculum: Daily sports periods, inter-house leagues, yoga conditioning, and District/State championship coaching.',
    safetyProtocols: [
      'First Aid response kit and trained sports physical educators present at every session',
      'Levelled grass and clay grounds maintained free of hazards',
      'Clean shaded drinking hydration stations adjacent to field'
    ],
    equipment: [
      'Standard 200m Athletic Running Track',
      'Football Ground & Dedicated Cricket Pitch',
      'Volleyball & Badminton Courts',
      'Gymnastic Mats, High Jump & Sports Equipment'
    ],
    capacity: 'Full Campus Cohorts',
    locationMeta: 'East Campus Grounds • Boisar'
  },
  {
    id: 'classrooms',
    category: 'academic',
    name: 'Spacious Ventilated Classrooms',
    gallery: [
      { src: '/images/chinmaya/academics/classroom_learning_001.jpg', caption: 'High-Ceiling Classrooms with Ergonomic Multi-Student Seating' },
      { src: '/images/chinmaya/academics/classroom_learning_004.jpg', caption: 'Interactive Group Discussions and Academic Mentoring' },
      { src: '/images/chinmaya/academics/classroom_learning_006.jpg', caption: 'Natural Cross-Ventilation & Expansive Blackboard Surfaces' }
    ],
    badge: 'Learning Spaces',
    tagline: 'High-Ceiling Classrooms with Capacity for Over 40 Students',
    description:
      'Airy, naturally illuminated classrooms designed with ergonomic furniture, broad display boards, green writing surfaces, and capacity exceeding 40 students while maintaining optimal student-teacher interaction.',
    curriculumDetails:
      'Compliant with CBSE classroom dimensional guidelines, ensuring at least 1.5 sq. meters of unhindered floor space per child with cross-ventilation windows.',
    safetyProtocols: [
      'Dual emergency exit doors on all ground and upper floor classrooms',
      'Smooth rounded-edge wooden furniture',
      'Fire alarms and evacuation route signage'
    ],
    equipment: [
      'Ergonomic Multi-Tier Student Desks',
      'Broad Wall Display Pin-up Notice Boards',
      'High-Definition Multimedia Audio-Visual Provisions',
      'Large Non-Reflective Ceramic Chalkboards'
    ],
    capacity: '>40 Students per Section',
    locationMeta: 'Primary & Secondary Wings'
  },
  {
    id: 'cultural-assembly',
    category: 'campus',
    name: 'Cultural Assembly Arena & Stage',
    gallery: [
      { src: '/images/banner-4.jpeg', caption: 'Central Courtyard Stage: Morning Prayer Assembly & Cultural Celebrations' },
      { src: '/images/banner-9.webp', caption: 'Annual Day Theatricals & Inter-House Classical Dance Showcases' },
      { src: '/images/guru-paduka-pooja.webp', caption: 'Guru Paduka Pooja & Spiritual Devotional Gatherings' }
    ],
    badge: 'Cultural Ethos',
    tagline: 'Morning Assembly, Gita Chanting & Annual Day Celebrations',
    description:
      'The vibrant cultural nerve center of the school where daily Guru Paduka Pooja, morning prayer assemblies, monthly bhajans, Geeta chanting competitions, and grand theatrical performances take place.',
    curriculumDetails:
      'The core physical anchor for the Chinmaya Vision Programme (CVP), cultivating Bhartiya Sanskriti, public speaking confidence, and spiritual values.',
    safetyProtocols: [
      'Wide covered courtyard with non-slip flooring',
      'Overhead sun/rain protective architectural canopy',
      'Surge-protected professional PA sound system'
    ],
    equipment: [
      'High-Output Acoustic Sound Reinforcement Speakers',
      'Elevated Performance Theatrical Stage',
      'Sacred Gurudev Paduka Altar and Traditional Brass Lamps',
      'Seating capacity for complete school student body'
    ],
    capacity: '1,000+ Audience',
    locationMeta: 'Central Courtyard Stage'
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
        className="w-full h-full object-cover transition-transform duration-500 cursor-pointer hover:scale-105"
        onClick={() => onOpenLightbox(currentPhoto.src, currentPhoto.caption)}
      />

      {/* Floating Badges */}
      <div className="absolute top-3.5 left-3.5 bg-[#0B1E34]/90 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow pointer-events-none">
        {facility.badge}
      </div>

      <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border border-white/20 flex items-center gap-1.5 pointer-events-none">
        <span>Photo {currentIdx + 1}/{images.length}</span>
      </div>

      {/* Bottom Photo Caption Banner */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3 pt-6 flex items-end justify-between gap-3 text-white pointer-events-none">
        <p className="text-[11px] font-sans font-medium line-clamp-1 drop-shadow m-0">
          {currentPhoto.caption}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(currentPhoto.src, currentPhoto.caption);
          }}
          className="pointer-events-auto p-1.5 rounded-lg bg-white/20 hover:bg-[#DF711B] text-white transition-colors shrink-0"
          title="Inspect Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Arrow Controls (visible when multiple photos exist) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#DF711B] text-white flex items-center justify-center transition-all duration-200 border border-white/20 opacity-0 group-hover/carousel:opacity-100 shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#DF711B] text-white flex items-center justify-center transition-all duration-200 border border-white/20 opacity-0 group-hover/carousel:opacity-100 shadow-md cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
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
          className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BadgePill
                  label="Campus Tour & Infrastructure Directory"
                  variant="saffron"
                  pulse
                />
                <span className="text-xs font-mono text-slate-500">
                  CBSE Affiliation No. 1130095 • Boisar
                </span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
                State-of-the-Art Learning & Laboratory Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Chinmaya Vidyalaya Tarapur provides world-class educational spaces that empower experiential learning. Explore our certified Physics, Chemistry, Biology, and IT Innovation laboratories—each equipped with dedicated apparatus, continuous safety ventilation, and individual student workstations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-2xs text-center space-y-1">
                <span className="text-xs font-mono text-[#DF711B] font-bold uppercase">STEM & IT Labs</span>
                <div className="font-cinzel text-2xl font-black text-[#181C20]">4 Dedicated Labs</div>
                <p className="text-[11px] text-slate-500">Physics, Chemistry, Biology & IT</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-2xs text-center space-y-1">
                <span className="text-xs font-mono text-[#0B1E34] font-bold uppercase">Safety Standards</span>
                <div className="font-cinzel text-2xl font-black text-[#181C20]">100% Certified</div>
                <p className="text-[11px] text-slate-500">Fume Hoods & Fire Safety Compliant</p>
              </div>
            </div>
          </div>

          {/* Animated Sliding Tab Filters */}
          <div className="pt-4 border-t border-[#E7E2D8]">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold mr-3 block sm:inline mb-2 sm:mb-0">
              Filter Campus Facilities:
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
                  { id: 'labs', label: '🔬 Science & IT Laboratories' },
                  { id: 'academic', label: '📚 Classrooms & Library' },
                  { id: 'sports', label: '⚽ Sports Arena & Grounds' },
                  { id: 'campus', label: '🎭 Cultural Stage & Courtyard' }
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
                        <span className="text-xs font-mono font-bold text-[#DF711B] bg-[#FAF3E8] px-2.5 py-0.5 rounded-full border border-[#DF711B]/20">
                          {facility.capacity}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-2xl font-black text-[#181C20] group-hover:text-[#DF711B] transition-colors mt-1">
                        {facility.name}
                      </h3>
                      <p className="text-xs font-mono text-[#DF711B] font-semibold mt-1">
                        {facility.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {facility.description}
                    </p>

                    {/* CBSE Curriculum Scope */}
                    {facility.curriculumDetails && (
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#DF711B] font-bold block flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Curriculum & Practical Syllabus Alignment:</span>
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                          {facility.curriculumDetails}
                        </p>
                      </div>
                    )}

                    {/* Equipment / Apparatus Checklist */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-mono text-slate-500 font-bold uppercase block">
                        Verified Instruments & Workstations:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {facility.equipment.map((eq, eqIdx) => (
                          <div
                            key={eqIdx}
                            className="bg-[#FAF8F5] border border-[#E7E2D8] p-2 rounded-lg text-[11px] font-medium text-slate-700 flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{eq}</span>
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
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-admission-modal'))}
                      className="text-[#DF711B] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire About Admissions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
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
            className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
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
