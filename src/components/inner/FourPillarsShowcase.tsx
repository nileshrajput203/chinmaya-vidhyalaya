import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    corePurpose: 'Educating the whole child across all four foundational dimensions: physical vitality, mental poise, intellectual sharpness, and inner spiritual strength.',
    dailyPractices: [
      {
        dimension: 'Physical • Sharirik',
        title: 'Physical Vitality & Yoga',
        desc: 'Sports activities, physical fitness, yoga, and athletic training fostering stamina, motor skills, and overall health.'
      },
      {
        dimension: 'Mental • Manasik',
        title: 'Emotional Poise & Gita Chanting',
        desc: 'Nurturing focus, memory retention, and inner resilience through regular Bhagavad Gita chanting and guided reflection.'
      },
      {
        dimension: 'Intellectual • Bauddhik',
        title: 'AI, Coding & Science Labs',
        desc: 'Hands-on Artificial Intelligence, Coding (Python & Scratch), Science and Maths laboratories, and critical inquiry.'
      },
      {
        dimension: 'Spiritual • Adhyatmik',
        title: 'Spiritual Ethics & Character',
        desc: 'Moral values, character ethics, inner peace, mutual respect, and holistic personal growth.'
      }
    ],
    photos: [
      {
        src: '/images/pages/home/pillars/pillar-01-integrated.jpg',
        caption: 'Integrated Development: Physical, Mental, Intellectual & Spiritual Development in Practice',
        locationMeta: 'Chinmaya Vidyalaya Campus • 4-Fold Integrated Growth'
      }
    ],
    tags: ['Physical Vitality', 'Mental Poise & Gita', 'AI & Science Labs', 'Spiritual Ethics']
  },
  {
    number: '02',
    sanskritName: 'Bhartiya Sanskriti Evam Sanskar',
    englishTitle: 'Indian Culture & Heritage',
    corePurpose: 'Rooting students in timeless Indian traditions, cultural wisdom, and lifelong respect for family, teachers, and society.',
    dailyPractices: [
      {
        dimension: 'Reverence • Parampara',
        title: 'Cultural Assemblies & Prayer',
        desc: 'Morning prayer assemblies, inspirational thoughts, and cultural celebrations fostering respect and discipline.'
      },
      {
        dimension: 'Values • Swadhyaya',
        title: 'Language, Recitation & Shlokas',
        desc: 'Chanting and recitation activities fostering linguistic appreciation, memory, and cultural depth.'
      },
      {
        dimension: 'Ethics • Sanskar',
        title: 'Value Education & Life Skills',
        desc: 'Dedicated periods exploring character ethics, family values, and positive daily living.'
      },
      {
        dimension: 'Celebration • Utsav',
        title: 'Cultural Festivals & Celebrations',
        desc: 'School-wide celebrations of Indian festivals promoting unity, joy, and shared traditions.'
      }
    ],
    photos: [
      {
        src: '/images/guru-paduka-pooja.webp',
        caption: 'Cultural Tradition: Morning Prayer & Assembly Celebrations',
        locationMeta: 'Central Prayer Altar • School Assembly'
      }
    ],
    tags: ['Cultural Heritage', 'Value Education', 'Festivals & Celebrations', 'Character Building']
  },
  {
    number: '03',
    sanskritName: 'Deshbhakti Evam Rashtra Seva',
    englishTitle: 'Patriotism',
    corePurpose: 'Inspiring devoted love for the nation through student leadership, armed forces reverence, cultural state pride, and civic seva.',
    dailyPractices: [
      {
        dimension: 'Democratic Leadership • Loktantra',
        title: 'Student Council & Governance',
        desc: 'Democratic student council elections with secret ballot casting and elected leadership fostering civic duty.'
      },
      {
        dimension: 'Braveheart Tributes • Veergatha',
        title: 'Kargil Vijay Diwas & Tributes',
        desc: 'Commemorating Kargil Vijay Diwas and honoring armed forces martyrs through patriotic assemblies and exhibitions.'
      },
      {
        dimension: 'State Heritage • Rajya Gaurav',
        title: 'Maharashtra Divas Celebrations',
        desc: 'Commemorating Maharashtra Divas with cultural presentations, traditional lezim, flag salutations, and state pride.'
      },
      {
        dimension: 'Civic Outreach • Nagarik Seva',
        title: 'Swachhata & Nasha Mukt Drives',
        desc: 'Nasha Mukt Bharat Abhiyaan youth rallies, Swachh Bharat cleanliness drives, and environmental conservation.'
      }
    ],
    photos: [
      {
        src: '/images/pages/home/pillars/pillar-03-patriotism.png',
        caption: 'Patriotism in Action: Student Leadership, Civic Outreach & National Pride',
        locationMeta: 'Community Service & Campus Assemblies • Tarapur'
      }
    ],
    tags: ['Student Council', 'Veergatha Tributes', 'Maharashtra Divas', 'Civic Seva Drives']
  },
  {
    number: '04',
    sanskritName: 'Vasudhaiva Kutumbakam',
    englishTitle: 'Universal Outlook',
    corePurpose: 'Guiding students to embrace the worldview that the whole world is one family living in peace and harmony.',
    dailyPractices: [
      {
        dimension: 'Environment • Prakriti',
        title: 'Nature Study & Outdoor Excursions',
        desc: 'Nature walks, outdoor study, and botanical excursions cultivating ecological awareness.'
      },
      {
        dimension: 'Sustainability • Urja',
        title: 'Science & Sustainability Fairs',
        desc: 'Student innovation models, clean energy projects, and environmental science solutions.'
      },
      {
        dimension: 'Harmony • Shanti',
        title: 'Universal Peace & Harmony',
        desc: 'Morning assemblies and prayers celebrating peace, mutual respect, and harmony for all beings.'
      },
      {
        dimension: 'Global Perspective • Ekata',
        title: 'Global Awareness & Leadership',
        desc: 'Student debates, leadership forums, and broad-minded discussions on global topics.'
      }
    ],
    photos: [
      {
        src: '/images/pages/home/pillars/pillar-04-universal.webp',
        caption: 'Universal Outlook: Global Awareness & Scholastic Excellence',
        locationMeta: 'Classroom Learning • Scholastic Wing'
      }
    ],
    tags: ['Universal Outlook', 'Nature Study', 'Green Innovation', 'Global Harmony']
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
          Explore how each foundational value translates into campus assemblies, value education, experiential learning, and student leadership at Boisar Campus.
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
              className="relative scroll-mt-24 sm:scroll-mt-28"
            >
              {/* Flexible deep-link anchor targets (#pillar-2, #pillar-culture, #culture, etc.) */}
              <span id={`pillar-${parseInt(pillar.number, 10)}`} className="absolute -top-24 sm:-top-28 pointer-events-none" />
              <span id={pillar.number === '01' ? 'pillar-integrated' : pillar.number === '02' ? 'pillar-culture' : pillar.number === '03' ? 'pillar-patriotism' : 'pillar-universal'} className="absolute -top-24 sm:-top-28 pointer-events-none" />
              <span id={pillar.number === '01' ? 'integrated' : pillar.number === '02' ? 'culture' : pillar.number === '03' ? 'patriotism' : 'universal'} className="absolute -top-24 sm:-top-28 pointer-events-none" />
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
                        className="w-full h-full object-cover object-center"
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
                        <span>Campus Practices & Initiatives:</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 auto-rows-fr">
                        {pillar.dailyPractices.map((practice, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-white border border-[#E7E2D8] hover:border-[#DF711B]/50 rounded-xl p-3 shadow-2xs space-y-1 transition-all flex flex-col justify-start h-full"
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
      <div
        className="bg-[#DF711B] text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
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
      </div>
    </div>
  );
};
