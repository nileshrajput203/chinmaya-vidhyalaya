import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Phone
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
    <footer className="relative bg-[#181A1E] text-slate-200 pt-10 md:pt-14 pb-0 border-t-4 border-[#DF711B] overflow-visible font-sans select-none">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 pb-6 md:pb-8 items-stretch">
          
          {/* LEFT COLUMN: School Branding & Flipped Cutout Image of Pujya Gurudev (3 cols on xl, 4 cols on lg) */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between relative self-stretch">
            {/* Header Brand */}
            <div className="space-y-2.5 z-20 pb-2">
              <Link
                to="/"
                className="inline-flex items-center gap-3.5 group cursor-pointer"
              >
                <img 
                  src="/images/Chinmaya_Logo.webp" 
                  alt="Chinmaya Vidyalaya Logo" 
                  className="h-14 sm:h-16 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" 
                />
                <div>
                  <h2 className="font-cinzel font-extrabold text-white text-lg sm:text-xl tracking-wider uppercase leading-none">
                    CHINMAYA VIDYALAYA
                  </h2>
                  <p className="text-[10.5px] text-amber-400 font-mono tracking-wider uppercase font-semibold mt-1">
                    CBSE AFFILIATED • ESTD. 1995
                  </p>
                </div>
              </Link>
              <p className="text-xs text-slate-400 italic font-serif max-w-xs leading-relaxed">
                "Keep Smiling — Knowledge, Vision & Character"
              </p>
            </div>

            {/* Flipped Cutout Image rising from the bottom */}
            <div className="relative mt-auto pt-3 z-10 flex justify-center lg:justify-start items-end">
              <div className="relative w-60 sm:w-72 md:w-80 lg:w-[270px] xl:w-[300px] max-w-full">
                {/* Soft warm gold aura glow behind Pujya Gurudev */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                
                {/* Pujya Gurudev Swami Chinmayananda Cutout PNG Image */}
                <img 
                  src="/images/swami_chinmayananda_cutout.png" 
                  alt="Pujya Gurudev Swami Chinmayananda" 
                  className="w-full h-auto max-h-[320px] xl:max-h-[350px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] scale-x-[-1] relative z-10 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: 5 Link Columns + Bottom Institutional Strip (8 cols on lg, 9 cols on xl) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-6 pt-2">
            
            {/* TOP: 5 Dedicated Structured Link Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-5">
              
              {/* 1. ABOUT US (Institutional Foundation) */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-heading font-black text-white text-xs sm:text-sm tracking-widest uppercase pb-1.5 border-b border-slate-700/80">
                    ABOUT US
                  </h3>
                  <p className="text-[9.5px] font-mono text-amber-400 uppercase tracking-wider font-semibold mt-1">
                    HERITAGE & VISION
                  </p>
                </div>
                <ul className="space-y-2 text-xs">
                  {[
                    { label: "School History", href: "/about/history" },
                    { label: "School Vision & Mission", href: "/about/mission-vision" },
                    { label: "Board of Management", href: "/about/management" },
                    { label: "Important Disclosures", href: "/about/mandatory-information" },
                    { label: "About the Heritage", href: "/about/heritage" },
                    { label: "4 Pillars of CVP", href: "/about/philosophy" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. ACADEMICS (Scholastic Excellence) */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-heading font-black text-white text-xs sm:text-sm tracking-widest uppercase pb-1.5 border-b border-slate-700/80">
                    ACADEMICS
                  </h3>
                  <p className="text-[9.5px] font-mono text-amber-400 uppercase tracking-wider font-semibold mt-1">
                    SCHOLASTIC RIGOR
                  </p>
                </div>
                <ul className="space-y-2 text-xs">
                  {[
                    { label: "CBSE Curriculum & Syllabi", href: "/academics/curriculum" },
                    { label: "Teaching Methodology", href: "/academics/teaching-strategy" },
                    { label: "Infrastructure & Labs", href: "/academics/infrastructure" },
                    { label: "Faculty Directory", href: "/academics/faculty" },
                    { label: "CBSE Sample Papers", href: "/downloads/sample-papers" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. ADMISSIONS (Enrollment, Guidelines & Forms) */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-heading font-black text-white text-xs sm:text-sm tracking-widest uppercase pb-1.5 border-b border-slate-700/80">
                    ADMISSIONS
                  </h3>
                  <p className="text-[9.5px] font-mono text-amber-400 uppercase tracking-wider font-semibold mt-1">
                    ENROLLMENT & FORMS
                  </p>
                </div>
                <ul className="space-y-2 text-xs">
                  {([
                    { label: "Admission Guidelines", href: "/admissions/guidelines" },
                    { label: "Registration Forms", href: "/downloads/admissions" },
                    { label: "Annual Fee Structure", href: "/admissions/fee-structure" },
                    { label: "School Calendar 2026–27", href: "/admissions/calendar" },
                  ] as { label: string; href: string; external?: boolean }[]).map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-400 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. STUDENT LIFE (Activities & Holistic Growth) */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-heading font-black text-white text-xs sm:text-sm tracking-widest uppercase pb-1.5 border-b border-slate-700/80">
                    STUDENT LIFE
                  </h3>
                  <p className="text-[9.5px] font-mono text-amber-400 uppercase tracking-wider font-semibold mt-1">
                    ACTIVITIES & GROWTH
                  </p>
                </div>
                <ul className="space-y-2 text-xs">
                  {[
                    { label: "Co-Curricular & Sports", href: "/academics/co-curricular" },
                    { label: "Holistic Development", href: "/features/holistic-development" },
                    { label: "Spiritual Assemblies & Pooja", href: "/features/spiritual-activities" },
                    { label: "Career Counseling & ASSET", href: "/features/career-counselling" },
                    { label: "Educational Study Tours", href: "/features/education-tours" },
                    { label: "Central Library & Archives", href: "/features/library" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. CONNECT & MORE (Community & Network) */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-heading font-black text-white text-xs sm:text-sm tracking-widest uppercase pb-1.5 border-b border-slate-700/80">
                    CONNECT
                  </h3>
                  <p className="text-[9.5px] font-mono text-amber-400 uppercase tracking-wider font-semibold mt-1">
                    COMMUNITY & CAMPUS
                  </p>
                </div>
                <ul className="space-y-2 text-xs">
                  {[
                    { label: "Notice Board & Events", href: "/news" },
                    { label: "Campus Photo Gallery", href: "/gallery" },
                    { label: "School Blog & Insights", href: "/blog" },
                    { label: "Alumni Network", href: "/alumni" },
                    { label: "Careers & Faculty Openings", href: "/careers" },
                    { label: "Contact Campus Office", href: "/contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-slate-300 hover:text-amber-400 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* BOTTOM: Full-Width Institutional Information & Accreditations Strip */}
            <div className="border-t border-slate-800 pt-4 grid grid-cols-1 md:grid-cols-3 gap-3.5">
              
              {/* Location Card */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/90 shadow-inner">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold text-white block uppercase tracking-wider text-[10px] font-mono text-amber-400">
                    Campus Location
                  </span>
                  <p className="text-slate-300 mt-0.5">
                    {OFFICIAL_SCHOOL_INFO.address.street}, {OFFICIAL_SCHOOL_INFO.address.city}, {OFFICIAL_SCHOOL_INFO.address.state} - {OFFICIAL_SCHOOL_INFO.address.pincode}
                  </p>
                </div>
              </div>

              {/* Helpline Card */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/90 shadow-inner">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold text-white block uppercase tracking-wider text-[10px] font-mono text-amber-400">
                    Office & Helpline
                  </span>
                  <p className="text-slate-300 mt-0.5">
                    Phone: +91 93220 54713 • Mon–Sat: 8:00 AM – 4:00 PM
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    Email: {OFFICIAL_SCHOOL_INFO.contact.email[0]}
                  </p>
                </div>
              </div>

              {/* Accreditations Badge Carousel */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/90 shadow-inner flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{accreditations[activeAccreditation].title}</span>
                  </div>
                  <div className="flex items-center gap-1.5" aria-label="Accreditation slides">
                    {accreditations.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAccreditation(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeAccreditation === idx ? 'bg-amber-400 w-4' : 'bg-slate-600 hover:bg-slate-400 w-1.5'
                        }`}
                        aria-label={`Show accreditation ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-300 mt-1 leading-snug">
                  {accreditations[activeAccreditation].desc}
                </p>
                <p className="text-[9.5px] font-mono text-slate-400 pt-1 border-t border-slate-800/80 mt-1">
                  {accreditations[activeAccreditation].code}
                </p>
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
