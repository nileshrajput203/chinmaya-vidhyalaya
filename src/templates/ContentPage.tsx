import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Phone, Mail, FileText, Download, Eye, ShieldCheck, Building2 } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { OFFICIAL_BOARD_OF_MANAGEMENT } from '../data/school';
import { SCHOOL_IMAGES } from '../data/images';
import { DocumentViewerModal } from '../components/documents/DocumentViewerModal';
import { SchoolDocument } from '../types/documents';

import { FourPillarsShowcase } from '../components/inner/FourPillarsShowcase';
import { InfrastructureShowcase } from '../components/inner/InfrastructureShowcase';
import { SpiritualShowcase } from '../components/inner/SpiritualShowcase';
import { HolisticShowcase } from '../components/inner/HolisticShowcase';
import { HistoryShowcase } from '../components/inner/HistoryShowcase';
import { LibraryShowcase } from '../components/inner/LibraryShowcase';
import { VisionMissionShowcase } from '../components/inner/VisionMissionShowcase';
import { HeritageShowcase } from '../components/inner/HeritageShowcase';
import { AdmissionGuidelinesShowcase } from '../components/inner/AdmissionGuidelinesShowcase';
import { CurriculumShowcase } from '../components/inner/CurriculumShowcase';
import { CoCurricularShowcase } from '../components/inner/CoCurricularShowcase';
import { CareerCounsellingShowcase } from '../components/inner/CareerCounsellingShowcase';

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
}) => {
  const location = useLocation();
  const [viewingDoc, setViewingDoc] = useState<SchoolDocument | null>(null);

  // Check if Admissions category or enrollment page
  const isAdmissions = (slug && slug.includes('enrollment')) || categoryLabel.toLowerCase().includes('admission') || title.toLowerCase().includes('admission') || title.toLowerCase().includes('enrollment');
  const isEnrollment = isAdmissions;

  const displayCategoryLabel = isAdmissions ? 'Admissions' : categoryLabel;

  // Context flags
  const isRootAbout = location.pathname === '/about';
  const isManagement = title.toLowerCase().includes('management') || (slug && slug.includes('management'));
  const isSwami = slug === 'swami-chinmayananda' || slug === 'heritage' || title.toLowerCase().includes('chinmayananda') || title.toLowerCase().includes('heritage');
  const isHistory = ((slug && slug.includes('history')) || title.toLowerCase().includes('history') || isRootAbout) && !isSwami;
  const isCurriculum = title.toLowerCase().includes('curriculum') || (slug && slug.includes('curriculum'));
  const isSpiritual = title.toLowerCase().includes('spiritual') || (slug && slug.includes('spiritual'));
  const isInfrastructure = title.toLowerCase().includes('infrastructure') || (slug && slug.includes('infrastructure'));
  const isCoCurricular = title.toLowerCase().includes('co-curricular') || slug === 'co-curricular';
  const isCareerCounselling = slug === 'career-counselling' || title.toLowerCase().includes('career counselling') || title.toLowerCase().includes('aptitude assessment');
  const isLibrary = slug === 'library' || title.toLowerCase().includes('library');
  const isFourPillars = slug === 'four-pillars' || slug === '4-pillars' || slug === 'philosophy' || title.toLowerCase().includes('4 pillars') || title.toLowerCase().includes('four pillars') || title.toLowerCase().includes('cvp');
  const isHolistic = slug === 'holistic-development' || title.toLowerCase().includes('holistic');
  const isMissionVision = !isAdmissions && (slug === 'mission-vision' || title.toLowerCase().includes('vision & mission') || title.toLowerCase().includes('mission & vision') || (slug && slug.includes('mission-vision')) || (title.toLowerCase().includes('vision') && title.toLowerCase().includes('mission') && !title.toLowerCase().includes('admission')));

  // Dynamic contextual eyebrow
  const getSectionEyebrow = (): string => {
    if (isManagement) return 'Institutional Governance & Leadership';
    if (isAdmissions) return 'Admissions Framework & Guidelines';
    if (isCurriculum) return 'CBSE Scholastic Framework';
    if (isCoCurricular) return 'Creative Arts & Personality Development';
    return `${displayCategoryLabel} • Academic Profile`;
  };

  const getPrimaryVisual = (): { src: string; caption: string } => {
    if (isManagement) {
      return {
        src: SCHOOL_IMAGES.CAMPUS_WIDE,
        caption: 'Chinmaya Vidyalaya Tarapur | School Campus & Administrative Office'
      };
    }
    if (isCurriculum) {
      return {
        src: SCHOOL_IMAGES.CLASSROOM_LEARNING,
        caption: 'Scholastic Classroom Learning & Interactive Labs | Boisar'
      };
    }
    if (isEnrollment) {
      return {
        src: SCHOOL_IMAGES.CAMPUS_HERO,
        caption: 'Admissions & Campus Registration | Boisar, Tarapur'
      };
    }
    return {
      src: image || "/images/about2.jpeg",
      caption: `Chinmaya Vidyalaya Tarapur | ${displayCategoryLabel}`
    };
  };

  const primaryVisual = getPrimaryVisual();

  // School History and Swami Chinmayananda Heritage features full-bleed horizontal GSAP timelines
  // that must break out of the max-w-6xl container to prevent clipping and sticky scroll issues.
  if (isHistory) {
    return (
      <div className="bg-white text-[#181C20] pb-24">
        <Breadcrumb items={[{ label: displayCategoryLabel }, { label: title }]} />
        <HistoryShowcase />
      </div>
    );
  }

  if (isSwami) {
    return (
      <div className="bg-white text-[#181C20] pb-24">
        <Breadcrumb items={[{ label: displayCategoryLabel }, { label: title }]} />
        <HeritageShowcase />
      </div>
    );
  }

  // Compliance section should ONLY show on root /about or dedicated mandatory information pages
  const showComplianceSection = slug === 'mandatory-information';

  return (
    <div className="bg-white text-[#181C20] pb-24">
      <Breadcrumb items={[{ label: displayCategoryLabel }, { label: title }]} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
        <main className="w-full space-y-12">
          
          {/* 1. The 4 Pillars of CVP Showcase */}
          {isFourPillars ? (
            <FourPillarsShowcase />
          ) : isInfrastructure ? (
            /* 2. Campus Infrastructure & Laboratories Showcase */
            <InfrastructureShowcase />
          ) : isSpiritual ? (
            /* 3. Spiritual Activities & Cultural Ethos Showcase */
            <SpiritualShowcase />
          ) : isHolistic ? (
            /* 4. Holistic Development & Student Well-Being Showcase */
            <HolisticShowcase />
          ) : isLibrary ? (
            /* 8. Central Library & Knowledge Archives Showcase */
            <LibraryShowcase />
          ) : isCurriculum ? (
            /* 10. CBSE Curriculum & Graded Syllabi Showcase */
            <CurriculumShowcase />
          ) : isAdmissions ? (
            /* 10. Admission Guidelines, Interactive Dummy Form & Book a Call Showcase */
            <AdmissionGuidelinesShowcase />
          ) : isCoCurricular ? (
            /* Co-Curricular Activities Showcase */
            <CoCurricularShowcase />
          ) : isCareerCounselling ? (
            /* Career Counselling & Aptitude Assessment Showcase */
            <CareerCounsellingShowcase />
          ) : isMissionVision ? (
            /* 11. School Vision & Mission Showcase */
            <VisionMissionShowcase />
          ) : (
            /* 12. Bespoke Editorial Layout for Management, Admissions, Curriculum & Other Pages */
            <div className="space-y-12">
              {!isManagement && (
                <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
                      {getSectionEyebrow()}
                    </span>
                    <h2 className="font-cinzel text-3xl sm:text-5xl text-[#181C20] font-extrabold leading-tight tracking-tight">
                      {title}
                    </h2>
                    {subtitle && (
                      <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal pt-1">
                        {subtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 prose max-w-none text-slate-600/90 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                      {content.slice(0, 2).map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="lg:col-span-5">
                      <div className="border border-[#E7E2D8] bg-white p-2 rounded-2xl shadow-sm overflow-hidden group">
                        <img
                          src={primaryVisual.src}
                          alt={`${title} visual`}
                          className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="p-2 text-xs text-[#4A5568] text-center font-medium font-sans">
                          {primaryVisual.caption}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Special Section: Board of Management Directory */}
              {isManagement && (
                <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-10">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
                      Institutional Governance
                    </span>
                    <h3 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold">
                      Board of Management & Managing Committee
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-normal">
                      An Undertaking of Central Chinmaya Mission Trust, Mumbai. The Local Managing Committee oversees institutional governance and academic leadership.
                    </p>
                  </div>

                  {/* Managing Trust Banner */}
                  <div className="p-6 rounded-2xl bg-[#FAF3E8] text-[#181C20] border border-[#FDE49C] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                        Supervising Trust Authority
                      </span>
                      <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                        Central Chinmaya Mission Trust, Mumbai
                      </h4>
                      <p className="text-xs text-slate-600">
                        Day-to-day administration & academic stewardship handled by the Local Managing Committee.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-xs font-mono border border-[#E7E2D8]">
                      <Building2 className="w-4 h-4 text-[#DF711B]" />
                      <span>Affiliation No. 1130058 • Code: 30040</span>
                    </div>
                  </div>

                  {/* Grid of Board Members */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {OFFICIAL_BOARD_OF_MANAGEMENT.map((member) => (
                      <div 
                        key={member.id}
                        className="bg-white border border-[#E7E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          {member.image ? (
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#DF711B] shadow-sm shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-lg shrink-0 border-2 border-[#DF711B]">
                              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                #{member.srNo || member.id.replace('bm-', '')}
                              </span>
                              <h4 className="font-cinzel font-bold text-[#181C20] text-sm leading-tight">
                                {member.name}
                              </h4>
                            </div>
                            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF3E8] text-[#DF711B]">
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
                              <a href={`tel:${member.phone}`} className="flex items-center gap-2 hover:text-[#DF711B] transition-colors">
                                <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
                                <span>{member.phone}</span>
                              </a>
                            )}
                            {member.email && (
                              <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-[#DF711B] transition-colors truncate">
                                <Mail className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                                <span className="truncate">{member.email}</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Official Board Register Table */}
                  <div className="space-y-4 pt-6 border-t border-[#E7E2D8]">
                    <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
                      Official Register: Board of Management Details
                    </h4>
                    
                    <div className="overflow-x-auto rounded-2xl border border-[#E7E2D8] shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-white border-b border-[#E7E2D8] font-cinzel font-bold text-[#181C20]">
                            <th className="py-3 px-4">Sr. No.</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Designation</th>
                            <th className="py-3 px-4">Occupation</th>
                            <th className="py-3 px-4">Mobile</th>
                            <th className="py-3 px-4">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7E2D8] bg-white font-sans text-slate-700">
                          {OFFICIAL_BOARD_OF_MANAGEMENT.map((m) => (
                            <tr key={m.id} className="hover:bg-white/60 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-[#DF711B]">{m.srNo}</td>
                              <td className="py-3 px-4 font-semibold text-[#181C20]">{m.name}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-full bg-[#FAF3E8] text-[#DF711B] font-mono font-semibold text-[11px]">
                                  {m.designation}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-600">{m.occupation || "—"}</td>
                              <td className="py-3 px-4 font-mono">
                                {m.phone ? (
                                  <a href={`tel:${m.phone}`} className="hover:text-[#DF711B] transition-colors underline">
                                    {m.phone}
                                  </a>
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </td>
                              <td className="py-3 px-4 font-mono">
                                {m.email ? (
                                  <a href={`mailto:${m.email}`} className="hover:text-[#DF711B] transition-colors underline">
                                    {m.email}
                                  </a>
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              )}

              {/* Special Section: Admission Forms & Process Callout */}
              {isEnrollment && (
                <section className="bg-[#F7F3EB] border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Official Registration Forms (2026-27)
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                      Download Admission Registration Forms
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600/85 font-normal">
                      Spacious classrooms accommodate over 40 students with personalized care. Download registration forms below and submit at the school administration office.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-base text-[#181C20]">Nursery</h4>
                        <p className="text-xs text-[#4A5568] mt-1 font-mono">113 KB • PDF</p>
                      </div>
                      <a
                        href="/images/nursery.pdf"
                        download
                        className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-base text-[#181C20]">Junior / Senior KG</h4>
                        <p className="text-xs text-[#4A5568] mt-1 font-mono">185 KB • PDF</p>
                      </div>
                      <a
                        href="/images/kg.pdf"
                        download
                        className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-base text-[#181C20]">Standard I to IX</h4>
                        <p className="text-xs text-[#4A5568] mt-1 font-mono">79 KB • PDF</p>
                      </div>
                      <a
                        href="/images/1to9.pdf"
                        download
                        className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
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
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      CBSE Structured Curriculum
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                      Subject Allocations by Grade Band
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Std I to V */}
                    <div id="primary-wing" className="bg-white border border-[#E7E2D8] p-6 rounded-2xl shadow-sm space-y-4 scroll-mt-28">
                      <h4 className="font-cinzel font-bold text-base text-[#181C20] border-b border-[#E7E2D8] pb-2">
                        Primary Wing: Std I to Std V
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-[11px] font-mono font-bold text-[#DF711B] uppercase">Scholastic Subjects</h5>
                          <p className="text-xs text-[#181C20] mt-1 font-medium leading-relaxed">
                            Languages: English, Hindi<br />
                            Core: Mathematics, Environmental Studies (EVS), General Knowledge
                          </p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-mono font-bold text-[#DF711B] uppercase">Co-Curricular & Skills</h5>
                          <ul className="text-xs text-[#4A5568] space-y-1 mt-1 font-light">
                            <li>• Work Education & Practical Crafts</li>
                            <li>• Art, Drawing and Creative Expression</li>
                            <li>• Daily Yoga, Physical Fitness & Value Education</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Std VI to X */}
                    <div id="secondary-wing" className="bg-white border border-[#E7E2D8] p-6 rounded-2xl shadow-sm space-y-4 scroll-mt-28">
                      <h4 className="font-cinzel font-bold text-base text-[#181C20] border-b border-[#E7E2D8] pb-2">
                        Secondary Wing: Std VI to Std X
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-[11px] font-mono font-bold text-[#DF711B] uppercase">Scholastic Subjects</h5>
                          <p className="text-xs text-[#181C20] mt-1 font-medium leading-relaxed">
                            Languages: English, Hindi, Sanskrit / Marathi<br />
                            Social Science: History, Civics, Geography, Economics, Disaster Management<br />
                            Science & Technology: Physics, Chemistry, Biology<br />
                            Mathematics & Computer Applications
                          </p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-mono font-bold text-[#DF711B] uppercase">Co-Curricular & Skills</h5>
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

              {/* Chapter 3: Key Particulars & Secondary Content */}
              {(content.length > 2 || (!isManagement && bulletPoints && bulletPoints.length > 0)) && (
                <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
                  {content.length > 2 && (
                    <div className="prose max-w-none text-slate-600/90 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                      {content.slice(2).map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {!isManagement && bulletPoints && bulletPoints.length > 0 && (
                    <div className="bg-[#F7F3EB] border-l-4 border-[#DF711B] p-6 sm:p-8 rounded-r-2xl space-y-4">
                      <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-[#181C20]">Key Particulars & Highlights</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#181C20]">
                        {bulletPoints.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-[#E7E2D8]">
                            <span className="text-[#DF711B] font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Chapter 4: Features / Highlights Grid */}
              {!isManagement && (features || highlights) && (
                <section className="bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl shadow-card space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Core Methodologies & Highlights
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">Key Educational Pillars</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#181C20]">
                      {(features || highlights || []).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 border-b border-[#E7E2D8] pb-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
          </div>
        )}

        {/* Mandatory Public Disclosures Feature Box - ONLY on statutory pages */}
          {showComplianceSection && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#DF711B]" />
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                      Statutory Disclosures
                    </span>
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                    Transfer Certificates (TC) & CBSE Compliance
                  </h3>
                  <p className="text-sm text-slate-600/85 font-normal">
                    In compliance with CBSE SARAS norms, parents can inspect official Transfer Certificates and compliance records online in authenticated view-only mode.
                  </p>
                </div>
                <Link
                  to="/about/mandatory-information"
                  className="px-5 py-2.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>View All Disclosures</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { 
                    id: 'doc-tc-2020-21', 
                    title: 'Transfer Certificates (TC) 2020–21 Archive', 
                    year: '2020–2021', 
                    file: '/images/TC-2021.pdf', 
                    size: '14.8 MB',
                    desc: 'Combined official archive register of student Transfer Certificates issued during the 2020 and 2021 academic sessions.'
                  },
                  { 
                    id: 'doc-tc-2023', 
                    title: 'Transfer Certificates (TC) 2023 Archive', 
                    year: '2023', 
                    file: '/images/TC-2023.pdf', 
                    size: '44.8 MB',
                    desc: 'Official archive register of student Transfer Certificates issued during the 2023 academic session in verified view-only format.'
                  },
                ].map((tc) => (
                  <div key={tc.id} className="bg-white border border-[#E7E2D8] p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-[#DF711B] transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                          CBSE Compliant
                        </span>
                      </div>
                      <h4 className="font-cinzel font-bold text-sm text-[#181C20]">{tc.title}</h4>
                      <p className="text-xs text-[#4A5568] leading-relaxed">{tc.desc}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{tc.size} • Official Archive</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewingDoc({
                        id: tc.id,
                        title: tc.title,
                        category: 'mandatory-information',
                        academicYear: tc.year,
                        fileUrl: tc.file,
                        fileSize: tc.size,
                        uploadDate: '2024-04-01',
                        description: tc.desc,
                        downloadable: false,
                      })}
                      className="w-full py-2.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-102 active:scale-98 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span>View {tc.year} TC Register</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

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
