import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Facebook,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

export const Footer: React.FC = () => {
  const [activeAccreditation, setActiveAccreditation] = useState(0);

  const accreditations = [
    { title: "CBSE AFFILIATION", desc: "Central Board of Secondary Education, New Delhi", code: `Affiliation No: ${OFFICIAL_SCHOOL_INFO.affiliationNo}` },
    { title: "CCMT RECOGNITION", desc: "Chinmaya Centre of Educational Cell (CCMT)", code: `School Code: ${OFFICIAL_SCHOOL_INFO.schoolCode}` },
    { title: "U-DISE COMPLIANT", desc: "Unified District Information System for Education", code: `U-DISE No: ${OFFICIAL_SCHOOL_INFO.udiseNo}` },
    { title: "GREEN CAMPUS", desc: "Eco-Friendly & Safe Educational Facility", code: "Tarapur, Maharashtra" },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAccreditation((current) => (current + 1) % accreditations.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [accreditations.length]);

  return (
    <footer className="relative bg-[#181A1E] text-slate-200 pt-16 md:pt-24 pb-0 border-t-4 border-[#DF711B] overflow-visible font-sans select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 items-start">
          
          {/* LEFT COLUMN: School Branding & Flipped Large Cutout Image of Pujya Gurudev (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between relative min-h-[500px] lg:min-h-[580px]">
            {/* Header Brand */}
            <div className="space-y-3 z-20 pb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-3.5 group cursor-pointer"
              >
                <img 
                  src="/images/Chinmaya_Logo.webp" 
                  alt="Chinmaya Vidyalaya Logo" 
                  className="h-16 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" 
                />
                <div>
                  <h2 className="font-cinzel font-extrabold text-white text-xl sm:text-2xl tracking-wider uppercase leading-none">
                    CHINMAYA VIDYALAYA
                  </h2>
                  <p className="text-[11px] text-amber-400 font-mono tracking-wider uppercase font-semibold mt-1">
                    CBSE AFFILIATED • ESTD. 1995
                  </p>
                </div>
              </Link>
              <p className="text-xs text-slate-400 italic font-serif max-w-xs leading-relaxed">
                "Keep Smiling — Knowledge, Vision & Character"
              </p>
            </div>

            {/* Flipped Large Cutout Image rising from the bottom */}
            <div className="relative mt-auto pt-2 z-10 flex justify-center lg:justify-start items-end">
              <div className="relative w-72 sm:w-80 md:w-96 lg:w-[380px] xl:w-[420px] max-w-full">
                {/* Soft warm gold aura glow behind Pujya Gurudev */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                
                {/* Pujya Gurudev Swami Chinmayananda Cutout PNG Image (Flipped horizontally and scaled larger) */}
                <img 
                  src="/images/swami_chinmayananda_cutout.png" 
                  alt="Pujya Gurudev Swami Chinmayananda" 
                  className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] scale-x-[-1] relative z-10 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMNS: 4-Column Structured Link System (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            
            {/* COL 1: ACADEMICS & VISUALS */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  ACADEMICS & LIFE
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "CBSE Curriculum & Syllabi", href: "/academics/curriculum" },
                    { label: "Faculty Directory", href: "/academics/faculty" },
                    { label: "Infrastructure & Science Labs", href: "/academics/infrastructure" },
                    { label: "Chinmaya Vision Program (CVP)", href: "/about/philosophy" },
                    { label: "Visual Archives & Gallery", href: "/gallery" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  STUDENT WINGS
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "Early Childhood (Pre-Primary)", href: "/academics/curriculum" },
                    { label: "Primary Wing (Std I-V)", href: "/academics/curriculum#primary-wing" },
                    { label: "Secondary Wing (Std VI-X)", href: "/academics/curriculum#secondary-wing" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COL 2: NOTICE BOARD & ADMISSIONS */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  DISPATCHES
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                      { label: "Notice Board & Events", href: "/news" },
                      { label: "Upcoming Events", href: "/news?filter=events" },
                    { label: "School Calendar 2026-27", href: "/images/academic-calendar.pdf", external: true },
                    { label: "Evaluation Papers (1-5)", href: "/downloads/evaluation-papers" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  ADMISSIONS
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "Admissions Guidelines", href: "/about/enrollment" },
                    { label: "Fee Structure", href: "/images/fees-structure.pdf", external: true },
                    { label: "Registration Forms", href: "/downloads/admissions" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COL 3: CAREERS & FORMS */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  CAREERS & RECRUITMENT
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "Careers & Faculty Openings", href: "/careers" },
                    { label: "Teacher Application Form", href: "/images/application-form-for-the-post-of-teacher.docx", external: true },
                    { label: "Pedagogic Training (CCMT)", href: "/careers#pedagogic-training" },
                    { label: "Submit Online Inquiry", href: "/careers#apply-form" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} download className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  DOWNLOADS
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "CBSE Sample Papers", href: "/downloads/sample-papers" },
                    { label: "All Documents & Certificates", href: "/downloads/documents" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COL 4: GOVERNANCE & DISCLOSURES */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  GOVERNANCE
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "Board of Management", href: "/about/management" },
                    { label: "Mandatory Disclosures & TC", href: "/about/mandatory-information" },
                    { label: "Parents Teacher Assoc. (PTA)", href: "/about/management" },
                    { label: "Contact Campus Office", href: "/contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OUR ACCREDITATIONS SECTION */}
              <div>
                <h3 className="font-heading font-black text-white text-sm tracking-widest uppercase pb-2.5 border-b border-slate-700/80">
                  OUR ACCREDITATIONS
                </h3>
                
                <div className="mt-3 bg-slate-900/90 border border-slate-700/60 rounded-xl p-3.5 space-y-2 shadow-inner">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>{accreditations[activeAccreditation].title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {accreditations[activeAccreditation].desc}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                    {accreditations[activeAccreditation].code}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 mt-3 justify-start" aria-label="Accreditation slides">
                  {accreditations.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAccreditation(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeAccreditation === idx 
                          ? 'bg-amber-400 w-5' 
                          : 'bg-slate-600 hover:bg-slate-400 w-2'
                      }`}
                      aria-label={`Show accreditation ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* BOTTOM SUB-FOOTER BAR */}
      <div className="bg-[#101215] border-t border-slate-800/90 py-6 px-4 sm:px-8 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          
          {/* Left: Social Icons & Developer Credit */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-500 font-mono">
              Designed for <strong className="text-slate-300">Chinmaya Vidyalaya Tarapur</strong>
            </span>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right text-[11px] text-slate-400 font-mono">
            Copyright © {new Date().getFullYear()} {OFFICIAL_SCHOOL_INFO.name}. All Rights Reserved.
          </div>

        </div>
      </div>

    </footer>
  );
};
