import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle2, Phone, Mail, FileText, Download } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { OFFICIAL_NAVIGATION_DATA } from '../data/navigation';
import { OFFICIAL_BOARD_OF_MANAGEMENT } from '../data/school';
import { SCHOOL_IMAGES } from '../data/images';

interface ContentPageProps {
  slug?: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  content: string[];
  bulletPoints?: string[];
  features?: string[];
  highlights?: string[];
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
}) => {
  const location = useLocation();

  // Find related navigation items in the same section
  const parentCategory = OFFICIAL_NAVIGATION_DATA.find(
    cat => cat.label.toLowerCase() === categoryLabel.toLowerCase()
  );
  const relatedLinks = parentCategory?.children || [];

  // Determine integrated image sets based on page context
  const isAcademics = categoryLabel.toLowerCase().includes('academic') || title.toLowerCase().includes('curriculum');
  const isFeatures = categoryLabel.toLowerCase().includes('feature') || title.toLowerCase().includes('spiritual');
  const isManagement = title.toLowerCase().includes('management') || (slug && slug.includes('management'));
  const isCurriculum = title.toLowerCase().includes('curriculum') || (slug && slug.includes('curriculum'));
  const isEnrollment = title.toLowerCase().includes('enrollment') || (slug && slug.includes('enrollment'));
  const isSpiritual = title.toLowerCase().includes('spiritual') || (slug && slug.includes('spiritual'));
  const isInfrastructure = title.toLowerCase().includes('infrastructure') || (slug && slug.includes('infrastructure'));
  
  const pageImages = isSpiritual
    ? ["/images/guru-paduka-pooja.webp", SCHOOL_IMAGES.CULTURAL_EVENT, SCHOOL_IMAGES.STUDENTS_ACTIVITY]
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

              <div className="pt-3 border-t border-[#E7E2D8]">
                <Link
                  to="/about/mandatory-information"
                  className="w-full py-2.5 bg-white hover:bg-[#0B1D30] hover:text-white text-[#0B1D30] border border-[#E7E2D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D97745]" />
                  <span>Mandatory Disclosures</span>
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
              <h2 className="font-cinzel text-2xl sm:text-4xl text-[#0B1D30] font-bold leading-tight">
                {title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 prose max-w-none text-[#363C44] text-base leading-relaxed space-y-4 font-light">
                {content.slice(0, 2).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="lg:col-span-5">
                <div className="border border-[#E7E2D8] bg-[#FAF8F5] p-2 rounded-2xl shadow-sm overflow-hidden group">
                  <img
                    src={pageImages[0]}
                    alt={`${title} visual chapter 1`}
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2 text-xs text-[#4A5568] text-center font-medium font-sans">
                    Chinmaya Vidyalaya Tarapur | {categoryLabel}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Section: Board of Management Directory */}
          {isManagement && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.2em] block">
                  Institutional Governance
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#0B1D30] font-bold">
                  Members of the Board of Management
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5568] font-light">
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
                <h3 className="font-cinzel text-2xl font-bold text-[#0B1D30]">
                  Download Admission Registration Forms
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5568] font-light">
                  Class strength is capped at ≤ 40 students per section. Download the registration form below and submit it to the administration desk.
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
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
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
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
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
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
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
                <h3 className="font-cinzel text-2xl font-bold text-[#0B1D30]">
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
                alt={`${title} wide photographic showcase`}
                className="w-full h-80 md:h-[400px] object-cover rounded-2xl"
              />
              <div className="p-4 bg-[#0B1D30] text-white flex flex-col md:flex-row justify-between items-center gap-2 text-xs rounded-b-2xl">
                <span className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                  Vidyalaya Excellence & Student Holistic Growth
                </span>
                <span className="text-[#D97745] font-mono font-bold">Affiliated to CBSE, New Delhi</span>
              </div>
            </section>
          )}

          {/* Chapter 3: Key Particulars & Secondary Content */}
          <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
            {content.length > 2 && (
              <div className="prose max-w-none text-[#363C44] text-base leading-relaxed space-y-4 font-light">
                {content.slice(2).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {bulletPoints && bulletPoints.length > 0 && (
              <div className="bg-[#F7F3EB] border-l-4 border-[#D97745] p-6 rounded-r-2xl space-y-4">
                <h3 className="font-cinzel text-lg font-bold text-[#0B1D30]">Key Particulars & Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#181C20]">
                  {bulletPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#E7E2D8]">
                      <span className="text-[#D97745] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Chapter 4: Features Grid */}
          {(features || highlights) && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 bg-white border border-[#E7E2D8] p-8 rounded-3xl shadow-card space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-[#D97745] uppercase tracking-wider block">
                    Core Methodologies & Highlights
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B1D30]">Structured Pillars</h3>
                  <ul className="space-y-3 text-xs text-[#181C20]">
                    {(features || highlights || []).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 border-b border-[#E7E2D8] pb-2">
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
                    alt={`${title} feature photographic visual`}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="p-3 bg-[#FAF8F5] text-xs text-[#4A5568] text-center font-medium rounded-b-2xl">
                    Integrated Learning Facilities | Boisar / Tarapur
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Deep Navy Action Footer Callout */}
          <section className="bg-[#0B1D30] text-white p-8 rounded-3xl border-l-4 border-[#D97745] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-cinzel font-bold text-xl text-white">Have questions regarding {title}?</h3>
              <p className="text-xs text-slate-300">Contact our administrative office or explore our admissions guidelines.</p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#D97745] hover:bg-[#C8652D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Contact Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>

        </main>
      </div>
    </div>
  );
};
