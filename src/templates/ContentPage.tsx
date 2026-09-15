import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle2, Phone, Mail, FileText, Download, Eye, Sparkles, Quote, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { OFFICIAL_NAVIGATION_DATA } from '../data/navigation';
import { OFFICIAL_BOARD_OF_MANAGEMENT } from '../data/school';
import { SCHOOL_IMAGES } from '../data/images';
import { DocumentViewerModal } from '../components/documents/DocumentViewerModal';
import { SchoolDocument } from '../types/documents';

interface ContentPageProps {
  slug?: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  content: string[];
  bulletPoints?: string[];
  features?: string[];
  highlights?: string[];
  image?: string;
  swamijiQuote?: string;
}

export const ContentPage: React.FC<ContentPageProps> = ({
  slug,
  title,
  subtitle,
  categoryLabel,
  content,
  bulletPoints,
  features,
  highlights,
  image,
  swamijiQuote,
}) => {
  const location = useLocation();
  const [viewingDoc, setViewingDoc] = useState<SchoolDocument | null>(null);

  // Find related navigation items in the same section
  const parentCategory = OFFICIAL_NAVIGATION_DATA.find(
    cat => cat.label.toLowerCase() === categoryLabel.toLowerCase()
  );
  const relatedLinks = parentCategory?.children || [];

  // Context flags
  const isAbout = categoryLabel.toLowerCase().includes('about');
  const isAcademics = categoryLabel.toLowerCase().includes('academic') || title.toLowerCase().includes('curriculum');
  const isFeatures = categoryLabel.toLowerCase().includes('feature') || title.toLowerCase().includes('spiritual') || title.toLowerCase().includes('pillar') || title.toLowerCase().includes('holistic');
  const isManagement = title.toLowerCase().includes('management') || (slug && slug.includes('management'));
  const isCurriculum = title.toLowerCase().includes('curriculum') || (slug && slug.includes('curriculum'));
  const isEnrollment = title.toLowerCase().includes('enrollment') || (slug && slug.includes('enrollment'));
  const isSpiritual = title.toLowerCase().includes('spiritual') || (slug && slug.includes('spiritual'));
  const isInfrastructure = title.toLowerCase().includes('infrastructure') || (slug && slug.includes('infrastructure'));
  const isFourPillars = slug === 'four-pillars' || title.toLowerCase().includes('4 pillars');
  const isHolistic = slug === 'holistic-development' || title.toLowerCase().includes('holistic');
  
  const pageImages = isSpiritual
    ? ["/images/guru-paduka-pooja.webp", SCHOOL_IMAGES.CULTURAL_EVENT, SCHOOL_IMAGES.STUDENTS_ACTIVITY]
    : isAbout || isFourPillars
    ? ["/images/swami.jpeg", "/images/about2.jpeg", "/images/guru-paduka-pooja.webp"]
    : isInfrastructure
    ? ["/images/lib.jpg", "/images/CHEM1.jpeg", "/images/phys.jpeg"]
    : isAcademics
    ? [SCHOOL_IMAGES.CLASSROOM_LEARNING, SCHOOL_IMAGES.SCIENCE_LAB, SCHOOL_IMAGES.LIBRARY_STUDY, SCHOOL_IMAGES.COMPUTERS_TECH]
    : isFeatures
    ? [SCHOOL_IMAGES.CULTURAL_EVENT, SCHOOL_IMAGES.STUDENTS_ACTIVITY, SCHOOL_IMAGES.SPORTS_DAY, SCHOOL_IMAGES.ANNUAL_DAY]
    : [SCHOOL_IMAGES.CAMPUS_HERO, SCHOOL_IMAGES.CAMPUS_BUILDING, SCHOOL_IMAGES.CLASSROOM_LEARNING, SCHOOL_IMAGES.FACILITIES_OVERVIEW];

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      {/* Visual Inner Page Hero */}
      <PageHero title={title} subtitle={subtitle} badge={categoryLabel} />
      <Breadcrumb items={[{ label: categoryLabel }, { label: title }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        {relatedLinks.length > 0 && (
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-[#F7F3EB] border border-[#E7E2D8] p-6 rounded-2xl sticky top-24 shadow-card space-y-4">
              <h3 className="font-cinzel font-bold text-[#0B1D30] text-base border-b border-[#E7E2D8] pb-3 uppercase tracking-wider">
                {categoryLabel} Directory
              </h3>
              <ul className="space-y-1 text-xs">
                {relatedLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#0B1D30] text-white font-bold shadow-sm translate-x-1'
                            : 'text-[#4A5568] hover:bg-white hover:text-[#0B1D30]'
                        }`}
                      >
                        <span className="truncate">{link.label}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#D97745]' : 'text-slate-400'}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick links to Disclosures & TC */}
              <div className="pt-3 border-t border-[#E7E2D8] space-y-2">
                <Link
                  to="/about/mandatory-information"
                  className="w-full py-2.5 bg-white hover:bg-[#0B1D30] hover:text-white text-[#0B1D30] border border-[#E7E2D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97745]" />
                  <span>Mandatory Disclosures & TC</span>
                </Link>
                <Link
                  to="/faq"
                  className="w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#4A5568] hover:text-[#0B1D30] border border-[#E7E2D8] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D97745]" />
                  <span>Frequently Asked Questions</span>
                </Link>
              </div>
            </div>
          </aside>
        )}

        {/* Editorial Multi-Image Visual Chapters */}
        <main className={`${relatedLinks.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} order-1 lg:order-2 space-y-12`}>
          
          {/* Chapter 1: Introduction & Primary Image */}
          <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.2em] block">
                Overview & Institutional Purpose
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl text-[#0B1D30] font-extrabold leading-tight tracking-tight">
                {title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 prose max-w-none text-slate-600/90 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                {content.slice(0, 2).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="lg:col-span-5">
                <div className="border border-[#E7E2D8] bg-[#FAF8F5] p-2 rounded-2xl shadow-sm overflow-hidden group">
                  <img
                    src={image || pageImages[0]}
                    alt={`${title} visual`}
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2 text-xs text-[#4A5568] text-center font-medium font-sans">
                    {isAbout || isFourPillars ? "Pujya Gurudev Swami Chinmayananda | Spiritual Guide" : `Chinmaya Vidyalaya Tarapur | ${categoryLabel}`}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pujya Gurudev Swami Chinmayananda Quote / Tribute Block */}
          {(isAbout || isFourPillars || isSpiritual || swamijiQuote) && (
            <section className="bg-gradient-to-br from-[#0B1D30] to-[#122A44] text-white p-8 md:p-10 rounded-3xl border border-[#D97745]/30 shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#D97745] shadow-lg shrink-0">
                  <img
                    src="/images/swami.jpeg"
                    alt="Pujya Gurudev Swami Chinmayananda"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[#D97745]">
                    <Quote className="w-5 h-5 opacity-70" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97745]">
                      Guidance of Pujya Gurudev Swami Chinmayananda
                    </span>
                  </div>
                  <blockquote className="font-cinzel text-base sm:text-xl italic text-white/95 leading-relaxed">
                    "{swamijiQuote || "Children are not vessels to be filled, but lamps to be lit. To empower a child is to illuminate the entire world."}"
                  </blockquote>
                  <p className="text-xs text-slate-300 font-light">
                    Founder of Chinmaya Mission & Architect of the Chinmaya Vision Program (CVP)
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 4 Pillars of CVP Bento Grid (When on Four Pillars or Holistic Development) */}
          {(isFourPillars || isHolistic) && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider block">
                  The Four Pillars of CVP
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0B1D30]">
                  Holistic Architecture for Lifelong Character Building
                </h3>
                <p className="text-sm sm:text-base text-slate-600/85 font-normal">
                  A balanced synthesis of academic rigour, cultural rootedness, national pride, and global compassion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center font-cinzel font-bold text-base">
                    01
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                    Pillar 1: Integrated Development
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Physical fitness, emotional balance, intellectual sharpness, and spiritual awakening. Our well-ventilated classrooms possess a physical capacity to seat more than 40 students, maintained with disciplined personal student care and teacher attention.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center font-cinzel font-bold text-base">
                    02
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                    Pillar 2: Indian Culture & Heritage
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Inculcating deep reverence for ancient Indian ethos, moral principles, family values, and daily spiritual practices such as Guru Paduka Pooja, Balvihar moral classes, and Gita Chanting.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center font-cinzel font-bold text-base">
                    03
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                    Pillar 3: Patriotism & Civic Duty
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Awakening love for the motherland, respect for national symbols, active civic responsibility, and environmental stewardship through community initiatives like Jal Pakhwada.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center font-cinzel font-bold text-base">
                    04
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                    Pillar 4: Universal Outlook
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Instilling the timeless Upanishadic vision 'Vasudhaiva Kutumbakam' (The world is one family) through scientific inquiry, global empathy, and ecological compassion for all sentient beings.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Mandatory Public Disclosures & Transfer Certificates (TC) Feature Box in About Us */}
          {isAbout && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#D97745]" />
                    <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider">
                      Statutory Disclosures
                    </span>
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0B1D30]">
                    Transfer Certificates (TC) & CBSE Compliance
                  </h3>
                  <p className="text-sm text-slate-600/85 font-normal">
                    In compliance with CBSE SARAS norms, parents can inspect official Transfer Certificates and compliance records online in authenticated view-only mode.
                  </p>
                </div>
                <Link
                  to="/about/mandatory-information"
                  className="px-5 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <Eye className="w-4 h-4 text-[#D97745]" />
                  <span>View All Disclosures</span>
                </Link>
              </div>

              {/* TC Sample & Archives Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-28 overflow-hidden rounded-xl border border-[#E7E2D8] bg-white relative">
                      <img
                        src="/images/TC.jpg"
                        alt="Sample Transfer Certificate (TC)"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <h4 className="font-cinzel font-bold text-xs text-[#0B1D30] line-clamp-1">Sample TC Format</h4>
                    <p className="text-[11px] text-[#4A5568]">Standard CBSE Transfer Certificate specimen</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewingDoc({
                      id: 'sample-tc',
                      title: 'Sample Transfer Certificate (TC)',
                      category: 'mandatory-information',
                      fileUrl: '/images/TC.jpg',
                      fileSize: '180 KB',
                      uploadDate: '2024-04-01',
                      description: 'Official specimen format of Transfer Certificate issued by Chinmaya Vidyalaya Tarapur.',
                      downloadable: false,
                    })}
                    className="w-full py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D97745]" />
                    <span>View Sample TC</span>
                  </button>
                </div>

                {[
                  { year: '2023', file: '/images/TC-2023.pdf', size: '44.8 MB' },
                  { year: '2021', file: '/images/TC-2021.pdf', size: '14.8 MB' },
                  { year: '2020', file: '/images/TC-2020.pdf', size: '56.8 MB' },
                ].map((tc) => (
                  <div key={tc.year} className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h4 className="font-cinzel font-bold text-xs text-[#0B1D30]">TC Register {tc.year}</h4>
                      <p className="text-[11px] text-[#4A5568] font-mono">{tc.size} • Certified Records</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewingDoc({
                        id: `tc-${tc.year}`,
                        title: `Transfer Certificates (TC) Archive - ${tc.year}`,
                        category: 'mandatory-information',
                        academicYear: tc.year,
                        fileUrl: tc.file,
                        fileSize: tc.size,
                        uploadDate: '2024-04-01',
                        description: `Official archive register of student Transfer Certificates issued during academic session ${tc.year}.`,
                        downloadable: false,
                      })}
                      className="w-full py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D97745]" />
                      <span>View TC {tc.year}</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Special Section: Board of Management Directory */}
          {isManagement && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.2em] block">
                  Institutional Governance
                </span>
                <h3 className="font-cinzel text-3xl sm:text-4xl text-[#0B1D30] font-extrabold">
                  Members of the Board of Management
                </h3>
                <p className="text-sm sm:text-base text-slate-600/85 font-normal">
                  Distinguished trustees, educationists, doctors, chartered accountants, and legal advisors guiding Chinmaya Vidyalaya Tarapur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {OFFICIAL_BOARD_OF_MANAGEMENT.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-[#FCFBF7] border border-[#E7E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D97745] shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-[#0B1D30] text-white flex items-center justify-center font-cinzel font-bold text-lg shrink-0">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-cinzel font-bold text-[#0B1D30] text-sm leading-tight">
                          {member.name}
                        </h4>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF3E8] text-[#D97745]">
                          {member.designation}
                        </span>
                        {member.occupation && (
                          <div className="text-[11px] text-[#4A5568] mt-1 font-sans">
                            {member.occupation}
                          </div>
                        )}
                      </div>
                    </div>

                    {(member.phone || member.email) && (
                      <div className="border-t border-[#E7E2D8] pt-3 space-y-1 text-xs text-[#4A5568] font-mono">
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="flex items-center gap-2 hover:text-[#D97745] transition-colors">
                            <Phone className="w-3.5 h-3.5 text-[#D97745]" />
                            <span>{member.phone}</span>
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-[#D97745] transition-colors truncate">
                            <Mail className="w-3.5 h-3.5 text-[#D97745] shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Special Section: Admission Forms & Process Callout */}
          {isEnrollment && (
            <section className="bg-[#F7F3EB] border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider block">
                  Official Registration Forms (2026-27)
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0B1D30]">
                  Download Admission Registration Forms
                </h3>
                <p className="text-sm sm:text-base text-slate-600/85 font-normal">
                  Spacious classrooms accommodate over 40 students with personalized care. Download registration forms below and submit at the school administration office.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-[#0B1D30]">Nursery</h4>
                    <p className="text-xs text-[#4A5568] mt-1 font-mono">113 KB • PDF</p>
                  </div>
                  <a
                    href="/images/nursery.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-[#0B1D30]">Junior / Senior KG</h4>
                    <p className="text-xs text-[#4A5568] mt-1 font-mono">185 KB • PDF</p>
                  </div>
                  <a
                    href="/images/kg.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-[#0B1D30]">Standard I to IX</h4>
                    <p className="text-xs text-[#4A5568] mt-1 font-mono">79 KB • PDF</p>
                  </div>
                  <a
                    href="/images/1to9.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* Special Section: Detailed Curriculum Breakdown Tables */}
          {isCurriculum && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider block">
                  CBSE Structured Curriculum
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0B1D30]">
                  Subject Allocations by Grade Band
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Std I to V */}
                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-cinzel font-bold text-base text-[#0B1D30] border-b border-[#E7E2D8] pb-2">
                    Primary Wing: Std I to Std V
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-[11px] font-mono font-bold text-[#D97745] uppercase">Scholastic Subjects</h5>
                      <p className="text-xs text-[#181C20] mt-1 font-medium leading-relaxed">
                        Languages: English, Hindi<br />
                        Core: Mathematics, Environmental Studies (EVS), General Knowledge
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-mono font-bold text-[#D97745] uppercase">Co-Curricular & Skills</h5>
                      <ul className="text-xs text-[#4A5568] space-y-1 mt-1 font-light">
                        <li>• Work Education & Practical Crafts</li>
                        <li>• Art, Drawing and Creative Expression</li>
                        <li>• Daily Yoga, Physical Fitness & Value Education</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Std VI to X */}
                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-cinzel font-bold text-base text-[#0B1D30] border-b border-[#E7E2D8] pb-2">
                    Secondary Wing: Std VI to Std X
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-[11px] font-mono font-bold text-[#D97745] uppercase">Scholastic Subjects</h5>
                      <p className="text-xs text-[#181C20] mt-1 font-medium leading-relaxed">
                        Languages: English, Hindi, Sanskrit / Marathi<br />
                        Social Science: History, Civics, Geography, Economics, Disaster Management<br />
                        Science & Technology: Physics, Chemistry, Biology<br />
                        Mathematics & Computer Applications
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-mono font-bold text-[#D97745] uppercase">Co-Curricular & Skills</h5>
                      <ul className="text-xs text-[#4A5568] space-y-1 mt-1 font-light">
                        <li>• Work Experience & STEM Laboratories</li>
                        <li>• Visual Arts, Music & Cultural Events</li>
                        <li>• Physical and Health Education & Athletics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Chapter 2: Full-Width Photographic Visual */}
          {pageImages[1] && (
            <section className="relative overflow-hidden border border-[#E7E2D8] bg-white p-3 rounded-3xl shadow-sm">
              <img
                src={pageImages[1]}
                alt={`${title} photographic showcase`}
                className="w-full h-80 md:h-[400px] object-cover rounded-2xl"
              />
              <div className="p-4 bg-[#0B1D30] text-white flex flex-col md:flex-row justify-between items-center gap-2 text-xs rounded-b-2xl">
                <span className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                  Chinmaya Vidyalaya Tarapur Excellence
                </span>
                <span className="text-[#D97745] font-mono font-bold">Affiliated to CBSE, New Delhi</span>
              </div>
            </section>
          )}

          {/* Chapter 3: Key Particulars & Secondary Content */}
          <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
            {content.length > 2 && (
              <div className="prose max-w-none text-slate-600/90 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                {content.slice(2).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {bulletPoints && bulletPoints.length > 0 && (
              <div className="bg-[#F7F3EB] border-l-4 border-[#D97745] p-6 sm:p-8 rounded-r-2xl space-y-4">
                <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-[#0B1D30]">Key Particulars & Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#181C20]">
                  {bulletPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-[#E7E2D8]">
                      <span className="text-[#D97745] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Chapter 4: Features / Highlights Grid */}
          {(features || highlights) && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 bg-white border border-[#E7E2D8] p-8 rounded-3xl shadow-card space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider block">
                    Core Methodologies & Highlights
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0B1D30]">Key Educational Pillars</h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#181C20]">
                    {(features || highlights || []).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 border-b border-[#E7E2D8] pb-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D97745] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {pageImages[2] && (
                <div className="lg:col-span-6 border border-[#E7E2D8] bg-white p-2 rounded-3xl shadow-sm flex flex-col justify-between">
                  <img
                    src={pageImages[2]}
                    alt={`${title} visual`}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="p-3 bg-[#FAF8F5] text-xs text-[#4A5568] text-center font-medium rounded-b-2xl">
                    Integrated Learning Facilities | Boisar / Tarapur
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Action Footer Callout */}
          <section className="bg-[#0B1D30] text-white p-8 sm:p-10 rounded-3xl border-l-4 border-[#D97745] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-white">Have questions regarding {title}?</h3>
              <p className="text-sm text-slate-300/85 font-normal">Contact our administrative office or explore our admissions guidelines.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/faq"
                className="px-5 py-3 bg-white hover:bg-[#D97745] text-[#0B1D30] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-md hover:scale-105 active:scale-95"
              >
                Explore FAQs
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-[#D97745] hover:bg-[#C8652D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Contact Admissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

        </main>
      </div>

      {/* Interactive Document Viewer Modal */}
      {viewingDoc && (
        <DocumentViewerModal
          document={viewingDoc}
          onClose={() => setViewingDoc(null)}
          allowDownload={false}
        />
      )}
    </div>
  );
};
