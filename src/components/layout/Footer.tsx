import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, ShieldCheck, ChevronRight, ArrowUp, FileText } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: false });
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('cv_preloader_seen');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.location.href = '/';
  };

  return (
    <footer className="bg-[#FAF8F5] text-slate-600 pt-20 pb-10 border-t-4 border-[#DF711B] relative overflow-hidden">
      {/* Subtle background branding watermark */}
      <div className="absolute -bottom-10 right-0 font-cinzel text-[10vw] font-black text-[#DF711B]/[0.03] select-none pointer-events-none whitespace-nowrap">
        CHINMAYA TARAPUR
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1: Institutional Brand Identity (5 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a 
              href="/"
              onClick={handleRestart}
              title="Click to restart site"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-[#E7E2D8] group-hover:scale-105 transition-transform">
                <img src="/images/Chinmaya_Logo.webp" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-[#181C20] text-lg sm:text-xl tracking-tight leading-tight uppercase">
                  {OFFICIAL_SCHOOL_INFO.name}
                </h3>
                <p className="text-xs text-[#DF711B] font-serif italic font-semibold">"{OFFICIAL_SCHOOL_INFO.tagline}"</p>
              </div>
            </a>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Under the Aegis of Chinmaya Mission Educational Cell (CCMT). Emulating the holistic vision of Swami Chinmayananda to provide value-integrated CBSE education.
            </p>

            <div className="space-y-2 text-xs font-mono text-slate-700 pt-2 border-t border-[#E7E2D8]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FFB740]" />
                <span>CBSE Affiliation: <strong className="text-[#181C20] font-bold">{OFFICIAL_SCHOOL_INFO.affiliationNo}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#64C9CF]" />
                <span>School Code: <strong className="text-[#181C20] font-bold">{OFFICIAL_SCHOOL_INFO.schoolCode}</strong> | U-DISE: <strong className="text-[#181C20] font-bold">{OFFICIAL_SCHOOL_INFO.udiseNo}</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel font-bold text-[#181C20] text-sm uppercase tracking-wider border-b border-[#E7E2D8] pb-2">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {[
                { label: "About History", href: "/about/history" },
                { label: "Mission & Vision", href: "/about/mission-vision" },
                { label: "CVP Philosophy", href: "/about/philosophy" },
                { label: "Board of Management", href: "/about/management" },
                { label: "Faculty Directory", href: "/academics/faculty" },
                { label: "Curriculum & Labs", href: "/academics/curriculum" }
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="flex items-center gap-1.5 text-slate-600 hover:text-[#DF711B] transition-colors font-medium">
                    <ChevronRight className="w-3.5 h-3.5 text-[#DF711B]/70" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Admissions & Downloads (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cinzel font-bold text-[#181C20] text-sm uppercase tracking-wider border-b border-[#E7E2D8] pb-2">
              Admissions & Forms
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {[
                { label: "Nursery Registration Form", href: "/images/nursery.pdf", external: true },
                { label: "Junior / Senior KG Form", href: "/images/kg.pdf", external: true },
                { label: "Std I to IX Admission Form", href: "/images/1to9.pdf", external: true },
                { label: "Teacher Application Form", href: "/images/application-form-for-the-post-of-teacher.docx", external: true },
                { label: "Evaluation III Question Papers", href: "/downloads/evaluation-papers", external: false },
                { label: "CBSE Sample Papers (1-10)", href: "/downloads/sample-papers", external: false },
              ].map((item, idx) => (
                <li key={idx}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-slate-600 hover:text-[#DF711B] transition-colors font-medium"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#DF711B]/70" />
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-[#DF711B] transition-colors font-medium"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#DF711B]/70" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cinzel font-bold text-[#181C20] text-sm uppercase tracking-wider border-b border-[#E7E2D8] pb-2">
              Campus Office
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                <span>{OFFICIAL_SCHOOL_INFO.address.street}, {OFFICIAL_SCHOOL_INFO.address.city}, Dist. {OFFICIAL_SCHOOL_INFO.address.district}, {OFFICIAL_SCHOOL_INFO.address.state} - {OFFICIAL_SCHOOL_INFO.address.pincode}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DF711B] shrink-0" />
                <a href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`} className="hover:text-[#DF711B] transition-colors font-medium">
                  {OFFICIAL_SCHOOL_INFO.contact.phone.join(" / ")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DF711B] shrink-0" />
                <a href={`mailto:${OFFICIAL_SCHOOL_INFO.contact.email[0]}`} className="hover:text-[#DF711B] transition-colors truncate font-medium">
                  {OFFICIAL_SCHOOL_INFO.contact.email[0]}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/about/mandatory-information"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#DF711B] hover:text-white text-[#181C20] border border-[#E7E2D8] rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#64C9CF]" />
                <span>Mandatory Disclosures</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-[#E7E2D8] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} {OFFICIAL_SCHOOL_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Chinmaya Mission Educational Institution</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white hover:bg-[#DF711B] text-slate-700 hover:text-white border border-[#E7E2D8] transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider shadow-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
