import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Bookmark, Search, Layers, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface LibrarySection {
  id: string;
  title: string;
  tag: string;
  icon: React.ReactNode;
  count: string;
  description: string;
  keyAuthorsAndVolumes: string[];
  cbseRole: string;
}

const LIBRARY_SECTIONS: LibrarySection[] = [
  {
    id: 'scholastic',
    title: 'CBSE Scholastic & Reference Archives',
    tag: 'Academic Core',
    icon: <BookOpen className="w-5 h-5 text-[#DF711B]" />,
    count: '5,500+ Volumes',
    description:
      'Exhaustive reference volumes in Physics, Chemistry, Mathematics, Biology, Accountancy, Economics, Computer Science, and Social Sciences catering to CBSE Class I through XII.',
    keyAuthorsAndVolumes: [
      'Halliday, Resnick & Walker (Physics Principles)',
      'O.P. Tandon & Pradeep Reference Series for Sciences',
      'R.D. Sharma & R.S. Aggarwal Advanced Mathematics',
      'NCERT Complete Exemplars with Solved Dissections'
    ],
    cbseRole: 'Directly supports board exam toppers and rigorous laboratory project documentation.'
  },
  {
    id: 'competitive',
    title: 'Competitive Examination Resource Hub',
    tag: 'Entrance Prep',
    icon: <Search className="w-5 h-5 text-[#DF711B]" />,
    count: '1,800+ Guides & Test Banks',
    description:
      'Dedicated competitive prep manuals, previous 15-year question papers, and national mock assessments for prestigious science, engineering, and scholarship entrance tests.',
    keyAuthorsAndVolumes: [
      'JEE Main & Advanced 40-Year Chapterwise Solved Archives',
      'NEET Biology, Chemistry & Physics Standard Question Banks',
      'CUET & NTSE Diagnostic Analytics & Solved Sets',
      'National Science & Mathematics Olympiad Compendiums'
    ],
    cbseRole: 'Equips senior secondary aspirants with multi-tier problem-solving endurance.'
  },
  {
    id: 'chinmaya',
    title: 'Chinmaya Philosophy & Vedantic Heritage',
    tag: 'Cultural Wisdom',
    icon: <Sparkles className="w-5 h-5 text-[#DF711B]" />,
    count: '1,200+ Sacred Texts',
    description:
      'An inspiring repository of Vedantic commentaries on the Upanishads, Bhagavad Gita, and Indian spiritual epics authored by Pujya Gurudev Swami Chinmayananda and Swami Tejomayananda.',
    keyAuthorsAndVolumes: [
      'The Holy Geeta with Commentary by Swami Chinmayananda',
      'Self-Unfoldment & Talks on Sankat Mochan Hanuman Chalisa',
      'Bhakti Rasamrita Sindhu & Vivekachudamani Commentaries',
      'Chinmaya Balvihar Moral Story Compendiums for Youth'
    ],
    cbseRole: 'Nurtures ethical poise, spiritual clarity, and deep pride in Indian cultural roots.'
  },
  {
    id: 'literature',
    title: 'World Literature, Fiction & Encyclopedias',
    tag: 'Creative Horizons',
    icon: <Layers className="w-5 h-5 text-[#DF711B]" />,
    count: '2,000+ General Titles',
    description:
      'A rich collection of world classics, historical biographies, National Geographic archives, and contemporary youth fiction encouraging independent reading and language mastery.',
    keyAuthorsAndVolumes: [
      'Encyclopaedia Britannica 32-Volume Reference Edition',
      'Nobel Laureate Literature Anthologies & Indian Vernacular Translations',
      'Dr. A.P.J. Abdul Kalam Autobiographical Compilations',
      'Illustrated Wildlife, Astronomy & Geographical Atlases'
    ],
    cbseRole: 'Cultivates imaginative empathy, advanced vocabulary, and broad global perspective.'
  }
];

export const LibraryShowcase: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState('scholastic');
  const detailsRef = useRef<HTMLDivElement>(null);

  const activeSection = LIBRARY_SECTIONS.find((s) => s.id === activeSectionId) || LIBRARY_SECTIONS[0];

  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeSectionId]);

  return (
    <div className="space-y-10">
      {/* Visual Editorial Banner */}
      <SpotlightCard className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <BadgePill variant="amber" label="Knowledge Repository & Archives" icon="book" />
              <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-[#E7E2D8]">
                Open Monday to Saturday • 8:00 AM – 3:30 PM
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
              A Quiet Sanctuary for Lifelong Intellectual Exploration
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              The Central Library of Chinmaya Vidyalaya Tarapur is the academic heart of the school. Housing over 10,000 cataloged books, national periodicals, encyclopedia sets, and NCERT curriculum references, it offers a tranquil haven that inspires a lifelong passion for reading and critical thinking.
            </p>

            {/* Quick Micro-Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Collection</span>
                <span className="font-cinzel font-bold text-base sm:text-lg text-[#181C20]">10,000+</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Periodicals</span>
                <span className="font-cinzel font-bold text-base sm:text-lg text-[#DF711B]">20+ Titles</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Reading Hall</span>
                <span className="font-cinzel font-bold text-base sm:text-lg text-[#0B1E34]">60+ Readers</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Cataloging</span>
                <span className="font-cinzel font-bold text-base sm:text-lg text-emerald-700">Classified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md group bg-white">
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src="/images/lib.jpg"
                  alt="Chinmaya Vidyalaya School Library"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B1E34]/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                  Central Library • Boisar
                </div>
              </div>
              <div className="p-3 text-xs text-[#4A5568] text-center font-medium bg-[#FAF8F5]">
                Central Reading Hall & Reference Book Archives | Tarapur Campus
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Interactive Library Collection Explorer (GSAP Switcher) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
              Curated Shelves & Reading Wings
            </span>
            <h3 className="font-cinzel font-extrabold text-2xl text-[#181C20]">
              Explore School Collections by Category
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Click any collection to inspect details
          </span>
        </div>

        {/* Category Pills Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LIBRARY_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSectionId(sec.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                activeSectionId === sec.id
                  ? 'bg-[#0B1E34] text-white border-[#0B1E34] shadow-md scale-[1.01]'
                  : 'bg-white text-slate-700 border-[#E7E2D8] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase font-bold ${activeSectionId === sec.id ? 'text-[#F7B928]' : 'text-[#DF711B]'}`}>
                  {sec.tag}
                </span>
                <span className={`text-xs font-mono font-semibold ${activeSectionId === sec.id ? 'text-slate-300' : 'text-slate-400'}`}>
                  {sec.count}
                </span>
              </div>
              <h4 className="font-cinzel font-bold text-sm sm:text-base leading-snug">
                {sec.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Section Detail Stage (Zero Eye Wander) */}
        <div ref={detailsRef}>
          <SpotlightCard className="bg-white border-2 border-[#E7E2D8] rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] border border-[#FDE49C] flex items-center justify-center">
                  {activeSection.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                    {activeSection.tag} • {activeSection.count}
                  </span>
                  <h4 className="font-cinzel font-extrabold text-2xl text-[#181C20]">
                    {activeSection.title}
                  </h4>
                </div>
              </div>
              <div className="bg-[#FAF8F5] px-3.5 py-1.5 rounded-xl border border-[#E7E2D8] text-xs font-mono text-slate-600">
                CBSE Standard: <strong className="text-[#0B1E34]">Certified</strong>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {activeSection.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-2xl space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                  Prominent Authors & Standard References:
                </span>
                <ul className="space-y-2">
                  {activeSection.keyAuthorsAndVolumes.map((vol, vIdx) => (
                    <li key={vIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Bookmark className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                      <span className="leading-snug">{vol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF3E8] border border-[#FDE49C] p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#DF711B] tracking-wider block">
                    Scholastic Impact & Learning Outcome:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed pt-2">
                    {activeSection.cbseRole}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#FDE49C] flex items-center gap-2 text-xs text-slate-600 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Borrowing allowance: 2 books per student for 14 days</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Library Code of Conduct & Operational Protocols */}
      <SpotlightCard className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B1E34] text-white flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
              Library Usage Guidelines & Borrowing Protocols
            </h4>
            <span className="text-xs font-mono text-slate-500">
              Preserving an atmosphere of quiet intellectual discipline
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white rounded-2xl border border-[#E7E2D8] space-y-1.5">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase block">
              1. Issue & Return
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Books are issued for 14 calendar days against the student smart library card. Renewals permitted once if no prior reservation exists.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E7E2D8] space-y-1.5">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase block">
              2. Reference Exclusives
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rare encyclopedia volumes, dictionaries, and current periodicals remain inside the reading hall for on-spot study and note-taking.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E7E2D8] space-y-1.5">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase block">
              3. Silence & Care
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict silence is maintained at all times. Book care guidelines prevent dog-earing or highlighting, preserving volumes for future batches.
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
