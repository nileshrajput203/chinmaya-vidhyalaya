import React from 'react';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SpotlightCard } from '../ui/spotlight-card';

interface DailyPractice {
  dimension: string;
  title: string;
  desc: string;
}

interface PillarDetail {
  number: string;
  sanskritName: string;
  englishTitle: string;
  corePurpose: string;
  dailyPractices: DailyPractice[];
  photos: {
    src: string;
    caption: string;
    locationMeta: string;
  }[];
  tags: string[];
}

const PILLARS_DATA: PillarDetail[] = [
  {
    number: '01',
    sanskritName: 'Sharirik, Manasik, Bauddhik & Adhyatmik Vikas',
    englishTitle: 'Integrated Development',
    corePurpose: 'Educating the whole child in complete balance — physical vitality, emotional poise, sharp intellect, and inner spiritual strength.',
    dailyPractices: [
      {
        dimension: 'Body • Sharirik',
        title: 'Morning Surya Namaskar & Yoga',
        desc: 'Daily pranayama and stretching drills for physical stamina and agility.'
      },
      {
        dimension: 'Intellect • Bauddhik',
        title: 'Hands-on STEM Lab Experiments',
        desc: 'Direct testing in physics, chemistry, biology, and computer labs.'
      },
      {
        dimension: 'Vitality • Khel-Kood',
        title: 'Inter-House Campus Athletics',
        desc: 'Year-round football, cricket, volleyball, and track training.'
      },
      {
        dimension: 'Diagnostic • Manthan',
        title: 'ASSET Diagnostic Assessments',
        desc: 'Skill analytics (Std III–IX) to personalize each student’s growth.'
      }
    ],
    photos: [
      {
        src: '/images/CHEM1.jpeg',
        caption: 'Intellectual Depth: Hands-on Chemistry & STEM Lab Experiments at Boisar Campus',
        locationMeta: 'Senior Chemistry Wing • Station 4'
      }
    ],
    tags: ['Physical Vitality', 'Advanced STEM Labs', 'Athletics & Sports', 'ASSET Skill Analytics']
  },
  {
    number: '02',
    sanskritName: 'Bhartiya Sanskriti Evam Sanskar',
    englishTitle: 'Indian Culture & Heritage',
    corePurpose: 'Rooting students in timeless Indian traditions, Vedic wisdom, and deep lifelong respect for family, teachers, and society.',
    dailyPractices: [
      {
        dimension: 'Reverence • Parampara',
        title: 'Daily Guru Paduka Pooja',
        desc: 'Assemblies open with lamp lighting, Paduka Pooja, and Vedic chants.'
      },
      {
        dimension: 'Scripture • Swadhyaya',
        title: 'Bhagavad Gita Recitation',
        desc: 'Chanting competitions fostering Sanskrit diction and ethical depth.'
      },
      {
        dimension: 'Values • Balvihar',
        title: 'Balvihar Value Education',
        desc: 'Dedicated periods exploring character ethics, epics, and family values.'
      },
      {
        dimension: 'Celebration • Utsav',
        title: 'Vedic Cultural Festivals',
        desc: 'Grand celebrations for Guru Purnima, Janmashtami, and Navratri.'
      }
    ],
    photos: [
      {
        src: '/images/guru-paduka-pooja.webp',
        caption: 'Sacred Tradition: Solemn Morning Guru Paduka Pooja & Shloka Chanting Ceremony',
        locationMeta: 'Central Prayer Altar • Daily Assembly'
      }
    ],
    tags: ['Guru Paduka Pooja', 'Bhagavad Gita Recitation', 'Balvihar Values', 'Vedic Festivals']
  },
  {
    number: '03',
    sanskritName: 'Deshbhakti Evam Rashtra Seva',
    englishTitle: 'Patriotism & Civic Duty',
    corePurpose: 'Inspiring proud national citizenship, selfless community service, and active leadership in environmental conservation.',
    dailyPractices: [
      {
        dimension: 'National Pride • Rashtra',
        title: 'Anthem & Ceremonial March',
        desc: 'Flag salutations, disciplined march past, and national day parades.'
      },
      {
        dimension: 'Conservation • Jal Seva',
        title: 'Jal Pakhwada Water Drives',
        desc: 'Student-led community awareness rallies and rainwater conservation.'
      },
      {
        dimension: 'Civic Action • Swachhata',
        title: 'Boisar Cleanliness Drives',
        desc: 'Hands-on environmental sanitation, tree planting, and civic outreach.'
      },
      {
        dimension: 'Inspiration • Veergatha',
        title: 'Tributes to National Heroes',
        desc: 'Commemorations honoring armed forces, scientists, and martyrs.'
      }
    ],
    photos: [
      {
        src: '/images/jal-pakhwada-poster.jpeg',
        caption: 'Civic Responsibility: Student Jal Pakhwada Water Conservation & Environmental Awareness Drive',
        locationMeta: 'Community Outreach • Palghar District'
      }
    ],
    tags: ['National Anthem', 'Jal Pakhwada Water Drive', 'Cleanliness Campaigns', 'Hero Commemorations']
  },
  {
    number: '04',
    sanskritName: 'Vasudhaiva Kutumbakam',
    englishTitle: 'Universal Outlook',
    corePurpose: 'Guiding students to embrace the Upanishadic truth that the entire cosmos is one interconnected family living in harmony.',
    dailyPractices: [
      {
        dimension: 'Ecology • Prakriti',
        title: 'Outdoor Nature Expeditions',
        desc: 'Botanical field excursions cultivating deep ecological empathy.'
      },
      {
        dimension: 'Innovation • Urja',
        title: 'Green Sustainability Fairs',
        desc: 'Student models for clean energy, zero waste, and planet solutions.'
      },
      {
        dimension: 'Peace • Shanti',
        title: 'Universal Peace Invocations',
        desc: 'Assemblies conclude with Vedic prayers: "Om Sarve Bhavantu Sukhinah".'
      },
      {
        dimension: 'Global Vision • Ekata',
        title: 'Youth Model Assemblies',
        desc: 'Debates on global challenges, ethics, and international fellowship.'
      }
    ],
    photos: [
      {
        src: '/images/tour.jpg',
        caption: 'Outdoor Wisdom: Guided Nature Expeditions & Botanical Field Study for Ecological Sensitivity',
        locationMeta: 'Experiential Field Trip • Maharashtra Heritage'
      }
    ],
    tags: ['Vasudhaiva Kutumbakam', 'Nature Expeditions', 'Green Innovation', 'Universal Peace']
  }
];

export const FourPillarsShowcase: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Clean Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DF711B] bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200/60 inline-block">
          Chinmaya Vision Programme in Practice
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#181C20] tracking-tight">
          How Our School Follows the 4 Pillars
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl mx-auto">
          Explore how each foundational value translates into daily morning routines, laboratory learning, and student leadership at Boisar Campus.
        </p>
      </div>

      {/* 2. Alternating Zigzag Layout with High-Hierarchy Editorial Text */}
      <div className="space-y-20 sm:space-y-28">
        {PILLARS_DATA.map((pillar, index) => {
          const isImageRight = index % 2 === 1; // 0: Image Left, 1: Image Right, 2: Image Left, 3: Image Right

          return (
            <div
              key={pillar.number}
              id={`pillar-${pillar.number}`}
              className="relative scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Visual / Image Column with Overlapping Number */}
                <div
                  className={`lg:col-span-6 ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative pt-10 sm:pt-14">
                    {/* Big Orange Overlapping Number */}
                    <div className="absolute top-0 left-3 sm:left-6 z-20 font-sans font-black text-6xl sm:text-7xl lg:text-8xl text-[#DF711B] leading-none select-none tracking-tight drop-shadow-sm">
                      {pillar.number}
                    </div>

                    {/* Image Card without overlays */}
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E7E2D8] bg-white shadow-md relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]">
                      <img
                        src={pillar.photos[0].src}
                        alt={pillar.photos[0].caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Column: Proper Font Hierarchy & Scannable Format */}
                <div
                  className={`lg:col-span-6 ${
                    isImageRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-4 lg:py-1">
                    
                    {/* Level 1: Subtitle / Sanskrit Eyebrow */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DF711B]">
                        PILLAR {pillar.number} • {pillar.sanskritName}
                      </span>
                    </div>

                    {/* Level 2: English Main Title */}
                    <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181C20] leading-tight tracking-tight">
                      {pillar.englishTitle}
                    </h3>

                    {/* Level 3: What It Is All About (Instant Core Understanding) */}
                    <div className="bg-[#FFF9F2] border-l-4 border-[#DF711B] rounded-r-xl p-3.5 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DF711B] block">
                        Core Essence • What It Means
                      </span>
                      <p className="text-sm sm:text-[15px] font-semibold text-slate-800 leading-snug">
                        {pillar.corePurpose}
                      </p>
                    </div>

                    {/* Level 4: The 4 Daily Practices (Scannable 2x2 Grid with Dimension Tags) */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#DF711B]" />
                        <span>Daily Practice on Campus:</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {pillar.dailyPractices.map((practice, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-white border border-[#E7E2D8] hover:border-[#DF711B]/50 rounded-xl p-3 shadow-2xs space-y-1 transition-all"
                          >
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-wide bg-amber-50 text-[#DF711B] border border-amber-200/50">
                              {practice.dimension}
                            </span>
                            <h4 className="text-xs sm:text-[13px] font-bold text-[#181C20] leading-snug">
                              {practice.title}
                            </h4>
                            <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">
                              {practice.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Level 5: Verified Focus Chips */}
                    <div className="pt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mr-1">
                        FOCUS:
                      </span>
                      {pillar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white text-slate-600 border border-[#E7E2D8] text-[9.5px] font-mono uppercase tracking-wider font-semibold shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Footer Admissions & Campus Visit Callout */}
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
            className="px-6 py-3 bg-white text-[#DF711B] hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
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

      {/* 4. Chinmaya Mission Global Redirect Banner */}
      <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#DF711B] block">
            Central Chinmaya Mission Trust
          </span>
          <h4 className="font-cinzel font-bold text-xl sm:text-2xl text-[#181C20]">
            To know more about Chinmaya Mission
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
            Discover the global spiritual and educational movement founded by Pujya Gurudev Swami Chinmayananda—uniting Advaita Vedanta philosophy, youth leadership, and humanitarian seva worldwide.
          </p>
        </div>
        <a
          href="https://www.chinmayamission.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-[#0B1E34] hover:bg-[#DF711B] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2.5 shrink-0 group"
          title="Chinmaya Mission – Advaita Vedanta, Inspiration & Global Seva"
        >
          <span>Chinmaya Mission – Advaita Vedanta, Inspiration & Global Seva</span>
          <ExternalLink className="w-4 h-4 text-[#DF711B] group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  );
};
