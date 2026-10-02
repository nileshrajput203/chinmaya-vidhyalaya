import React from 'react';
import { Clock } from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import { ScrollImageTunnel, ScrollImageTunnelImage } from '../ui/scroll-image-tunnel';

const ARCHIVE_IMAGES: ScrollImageTunnelImage[] = [
  {
    src: "/images/lib.jpg",
    alt: "Chinmaya Vidyalaya Central Reading Hall and Reference Stacks",
    title: "Central Reading Hall & Reference Stacks",
    category: "Tarapur Campus Archives"
  },
  {
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
    alt: "CBSE Scholastic and Advanced Science Reference Archives",
    title: "CBSE Scholastic Reference Archives (5,500+ Volumes)",
    category: "Academic Core"
  },
  {
    src: "https://images.unsplash.com/photo-1507842229451-7f01be8610ce?auto=format&fit=crop&w=1400&q=80",
    alt: "Chinmaya Philosophy, Vedantic Commentaries and Sacred Heritage",
    title: "Chinmaya Philosophy & Vedantic Heritage (1,200+ Sacred Texts)",
    category: "Cultural Wisdom"
  },
  {
    src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
    alt: "Competitive Examination Resource Hub and National Olympiad Test Banks",
    title: "Competitive Exam Hub: JEE, NEET & CUET Prep Banks",
    category: "Entrance Preparation"
  },
  {
    src: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=1400&q=80",
    alt: "World Literature, Classic Fiction Anthologies and Encyclopedias",
    title: "World Literature, Fiction & Encyclopedic Atlases",
    category: "Creative Horizons"
  }
];

export const LibraryShowcase: React.FC = () => {
  return (
    <div className="space-y-12">
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

      {/* ─── SCROLL IMAGE TUNNEL ARCHIVES EXPLORER ─── */}
      <ScrollImageTunnel
        images={ARCHIVE_IMAGES}
        hint="Scroll down to explore knowledge archives"
        stepHeight="130vh"
      />

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

export default LibraryShowcase;
