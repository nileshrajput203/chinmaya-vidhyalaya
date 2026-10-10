import React from 'react';
import { Flame, Music, BookOpen, Sun } from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

export const SpiritualShowcase: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Hero Spiritual Narrative */}
      <SpotlightCard
        spotlightColor="rgba(223, 113, 27, 0.1)"
        className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF3E8] to-[#F5ECE0] border-2 border-[#DF711B]/40 rounded-3xl p-6 sm:p-10 shadow-card space-y-6 relative overflow-hidden"
      >
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <BadgePill label="Spiritual Anchoring & Cultural Ethos" variant="saffron" pulse icon={<Flame className="w-3.5 h-3.5" />} />
            <span className="text-xs font-mono text-slate-500">Chinmaya Mission Tradition</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] leading-tight">
            Nurturing Moral Clarity, Devotion & Inner Poise
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            At Chinmaya Vidyalaya Tarapur, spiritual education is neither ritualistic nor dogmatic—it is the systematic cultivation of mental tranquility, noble values, reverence for life, and ethical strength. Every morning begins with universal Vedic prayers, mindfulness, and the sacred Guru Paduka Pooja.
          </p>
        </div>

        {/* Featured Photo Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="group bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/images/guru-paduka-pooja.webp"
                alt="Guru Paduka Pooja at Chinmaya Vidyalaya"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#0B1E34]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider">
                Daily Sacred Tradition
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded text-[10px] font-mono">
                Central Altar • 7:45 AM
              </div>
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-cinzel font-bold text-base text-[#181C20]">
                Daily Guru Paduka Pooja Ceremony
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Students and educators gather in reverence to offer flowers, ignite the sacred lamp, and invoke Gurudev’s blessings for wisdom and selfless action.
              </p>
            </div>
          </div>

          <div className="group bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/images/banner-7.jpeg"
                alt="Cultural assemblies and Bhagavad Gita Chanting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#DF711B]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider">
                Annual Gita Chanting
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded text-[10px] font-mono">
                Main Stage • Cultural Meet
              </div>
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-cinzel font-bold text-base text-[#181C20]">
                Gita Chanting & Devotional Assemblies
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Annual participation in the Chinmaya Mission Geeta Chanting competition, instilling memorization, Vedic meter accuracy, and philosophical reflection.
              </p>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* 4 Pillars of Spiritual Life at Chinmaya Vidyalaya */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
            Sacred Practices & Traditions
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
            The 4 Cornerstones of Our Cultural Ethos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard
            spotlightColor="rgba(223, 113, 27, 0.08)"
            className="bg-white border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl shadow-card space-y-4 hover:border-[#DF711B] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-lg shadow-sm">
              <Flame className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
              1. Guru Paduka Pooja & Board Blessings
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every morning begins with the lighting of the lamp and Guru Stotram. Importantly, every academic year for Standard X and XII students commences and culminates with a solemn Guru Paduka Pooja, bestowing divine composure and clarity ahead of board examinations.
            </p>
            <div className="border-t border-slate-200 pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ Morning Assemblies</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ Std X & XII Blessings</span>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(223, 113, 27, 0.08)"
            className="bg-white border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl shadow-card space-y-4 hover:border-[#DF711B] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-lg shadow-sm">
              <Music className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
              2. Monthly Bhajan Sessions (3rd Saturday)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              On the third Saturday of every month, students, faculty, and devotees gather for an uplifting evening of soulful devotional singing, harmonium accompaniment, and rhythmic kirtans that elevate collective consciousness and celebrate Indian classical ragas.
            </p>
            <div className="border-t border-slate-200 pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ 3rd Saturday Monthly</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ Devotional Classical Music</span>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(223, 113, 27, 0.08)"
            className="bg-white border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl shadow-card space-y-4 hover:border-[#DF711B] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-lg shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
              3. Annual Geeta Chanting Competition
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Under the auspices of Central Chinmaya Mission Trust, students participate in rigorous Geeta chanting competitions. They master correct Sanskrit enunciation, rhythmic meter, and the philosophical wisdom encoded within the sacred verses of the Srimad Bhagavad Gita.
            </p>
            <div className="border-t border-slate-200 pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ Sanskrit Metric Chanting</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ Inter-School Trophy</span>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(223, 113, 27, 0.08)"
            className="bg-white border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl shadow-card space-y-4 hover:border-[#DF711B] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-lg shadow-sm">
              <Sun className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
              4. Sannyasi Satsangs & Balvihar Modules
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Revered Swamis, Swaminis, and Brahmacharis from CCMT visit the campus periodically to deliver engaging discourses tailored to young minds. Balvihar classes teach honesty, courage, and universal compassion through stories, discussions, and roleplay.
            </p>
            <div className="border-t border-slate-200 pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ CCMT Sannyasi Satsangs</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">✓ Moral Discernment</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};
