import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle2, Phone, Mail, FileText, Download, Eye, Sparkles, Quote, ShieldCheck, Calendar, Building2, Users, Award } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { OFFICIAL_NAVIGATION_DATA } from '../data/navigation';
import { OFFICIAL_BOARD_OF_MANAGEMENT } from '../data/school';
import { SCHOOL_IMAGES } from '../data/images';
import { DocumentViewerModal } from '../components/documents/DocumentViewerModal';
import { SchoolDocument } from '../types/documents';
import { GoogleMapSection } from '../components/maps/GoogleMapSection';

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
  const isRootAbout = location.pathname === '/about';
  const isAbout = categoryLabel.toLowerCase().includes('about');
  const isAcademics = categoryLabel.toLowerCase().includes('academic') || title.toLowerCase().includes('curriculum');
  const isFeatures = categoryLabel.toLowerCase().includes('feature') || title.toLowerCase().includes('spiritual') || title.toLowerCase().includes('pillar') || title.toLowerCase().includes('holistic');
  const isManagement = title.toLowerCase().includes('management') || (slug && slug.includes('management'));
  const isSwami = slug === 'swami-chinmayananda' || title.toLowerCase().includes('chinmayananda');
  const isHistory = ((slug && slug.includes('history')) || title.toLowerCase().includes('history')) && !isSwami;
  const isCurriculum = title.toLowerCase().includes('curriculum') || (slug && slug.includes('curriculum'));
  const isFaculty = title.toLowerCase().includes('faculty') || (slug && slug.includes('faculty'));
  const isEnrollment = title.toLowerCase().includes('enrollment') || (slug && slug.includes('enrollment')) || categoryLabel.toLowerCase().includes('admission');
  const isSpiritual = title.toLowerCase().includes('spiritual') || (slug && slug.includes('spiritual'));
  const isInfrastructure = title.toLowerCase().includes('infrastructure') || (slug && slug.includes('infrastructure'));
  const isTeachingStrategy = title.toLowerCase().includes('strategy') || slug === 'teaching-strategy';
  const isCoCurricular = title.toLowerCase().includes('co-curricular') || slug === 'co-curricular';
  const isEducationTours = slug === 'education-tours' || title.toLowerCase().includes('tour');
  const isLibrary = slug === 'library' || title.toLowerCase().includes('library');
  const isFourPillars = slug === 'four-pillars' || slug === '4-pillars' || title.toLowerCase().includes('4 pillars');
  const isHolistic = slug === 'holistic-development' || title.toLowerCase().includes('holistic');
  const isMissionVision = slug === 'mission-vision' || title.toLowerCase().includes('mission');

  // Dynamic contextual eyebrow
  const getSectionEyebrow = (): string => {
    if (isRootAbout) return 'Institutional Overview & Heritage';
    if (isManagement) return 'Institutional Governance & Leadership';
    if (isSwami) return 'Spiritual Heritage & Visionary Master';
    if (slug === 'mission-vision' || title.toLowerCase().includes('mission')) return 'Guiding Principles & Ideals';
    if (slug === 'philosophy' || title.toLowerCase().includes('philosophy')) return 'Chinmaya Vision Programme (CVP)';
    if (isFourPillars) return 'Pedagogical Framework • Four Pillars';
    if (isHolistic) return 'Holistic Character Architecture';
    if (isHistory) return 'Founding Roots & Institutional Milestones';
    if (isEnrollment) return 'Admissions Framework & Guidelines';
    if (isCurriculum) return 'CBSE Scholastic Framework';
    if (isFaculty) return 'Educators & Academic Mentorship';
    if (isInfrastructure) return 'Campus Architecture & Facilities';
    if (title.toLowerCase().includes('strategy') || slug === 'teaching-strategy') return 'Pedagogical Methodologies';
    if (title.toLowerCase().includes('co-curricular') || slug === 'co-curricular') return 'Creative Arts & Personality Development';
    if (isSpiritual) return 'Cultural Ethos & Daily Assemblies';
    if (slug === 'career-counselling' || title.toLowerCase().includes('career')) return 'Career Guidance & Diagnostic Testing';
    if (slug === 'library' || title.toLowerCase().includes('library')) return 'Knowledge Repository & Archives';
    if (slug === 'education-tours' || title.toLowerCase().includes('tour')) return 'Experiential Field Learning';
    return `${categoryLabel} • Academic Profile`;
  };

  const pageImages = isSpiritual
    ? ["/images/guru-paduka-pooja.webp", SCHOOL_IMAGES.CULTURAL_EVENT, SCHOOL_IMAGES.STUDENTS_ACTIVITY]
    : isSwami
    ? ["/images/swami.jpeg", "/images/about2.jpeg", "/images/guru-paduka-pooja.webp"]
    : isManagement
    ? ["/images/about-banner.jpeg", "/images/about2.jpeg", "/images/banner-1.jpg"]
    : isFaculty
    ? [SCHOOL_IMAGES.TEACHING_STAFF, SCHOOL_IMAGES.NON_TEACHING_STAFF, SCHOOL_IMAGES.CLASSROOM_LEARNING]
    : isInfrastructure
    ? ["/images/lib.jpg", "/images/CHEM1.jpeg", "/images/phys.jpeg"]
    : isTeachingStrategy
    ? [SCHOOL_IMAGES.CLASSROOM_LEARNING, SCHOOL_IMAGES.COMPUTERS_TECH, SCHOOL_IMAGES.SCIENCE_LAB]
    : isCoCurricular
    ? [SCHOOL_IMAGES.CULTURAL_EVENT, SCHOOL_IMAGES.SPORTS_DAY, SCHOOL_IMAGES.ANNUAL_DAY]
    : isEducationTours
    ? [SCHOOL_IMAGES.EDUCATIONAL_TOUR, "/images/img6.jpg", "/images/img7.jpg"]
    : isLibrary
    ? [SCHOOL_IMAGES.LIBRARY_STUDY, "/images/lib.jpg", "/images/academic-books.png"]
    : isCurriculum
    ? [SCHOOL_IMAGES.CLASSROOM_LEARNING, SCHOOL_IMAGES.SCIENCE_LAB, SCHOOL_IMAGES.LIBRARY_STUDY, SCHOOL_IMAGES.COMPUTERS_TECH]
    : isAcademics
    ? [SCHOOL_IMAGES.CLASSROOM_LEARNING, SCHOOL_IMAGES.SCIENCE_LAB, SCHOOL_IMAGES.LIBRARY_STUDY, SCHOOL_IMAGES.COMPUTERS_TECH]
    : isFeatures
    ? [SCHOOL_IMAGES.CULTURAL_EVENT, SCHOOL_IMAGES.STUDENTS_ACTIVITY, SCHOOL_IMAGES.SPORTS_DAY, SCHOOL_IMAGES.ANNUAL_DAY]
    : [SCHOOL_IMAGES.CAMPUS_BUILDING, SCHOOL_IMAGES.CAMPUS_HERO, SCHOOL_IMAGES.CLASSROOM_LEARNING, SCHOOL_IMAGES.FACILITIES_OVERVIEW];

  // Specific visual assignment
  const getPrimaryVisual = (): { src: string; caption: string } => {
    if (isManagement) {
      return {
        src: SCHOOL_IMAGES.CAMPUS_WIDE,
        caption: 'Chinmaya Vidyalaya Tarapur | School Campus & Administrative Office'
      };
    }
    if (isSwami) {
      return {
        src: SCHOOL_IMAGES.SWAMIJI,
        caption: 'Pujya Gurudev Swami Chinmayananda | Spiritual Guide & Founder'
      };
    }
    if (isFaculty) {
      return {
        src: SCHOOL_IMAGES.TEACHING_STAFF,
        caption: 'Dedicated Teaching Faculty & Mentors | Chinmaya Vidyalaya'
      };
    }
    if (isInfrastructure) {
      return {
        src: SCHOOL_IMAGES.SCIENCE_LAB,
        caption: 'Advanced Science & Computer Laboratories | Tarapur'
      };
    }
    if (isTeachingStrategy) {
      return {
        src: SCHOOL_IMAGES.CLASSROOM_LEARNING,
        caption: 'Activity-led Classroom Teaching & Digital Learning'
      };
    }
    if (isCoCurricular) {
      return {
        src: SCHOOL_IMAGES.CULTURAL_EVENT,
        caption: 'Co-Curricular Arts, Sports & Student Expression'
      };
    }
    if (isEducationTours) {
      return {
        src: SCHOOL_IMAGES.EDUCATIONAL_TOUR,
        caption: 'Educational Study Tours & Experiential Learning'
      };
    }
    if (isLibrary) {
      return {
        src: SCHOOL_IMAGES.LIBRARY_STUDY,
        caption: 'Central Library & Reading Room'
      };
    }
    if (isCurriculum) {
      return {
        src: SCHOOL_IMAGES.CLASSROOM_LEARNING,
        caption: 'Spacious CBSE Classroom Learning Environment'
      };
    }
    if (isSpiritual) {
      return {
        src: SCHOOL_IMAGES.POOJA_CEREMONY,
        caption: 'Daily Guru Paduka Pooja & Morning Spiritual Assembly'
      };
    }
    if (isEnrollment) {
      return {
        src: SCHOOL_IMAGES.CAMPUS_HERO,
        caption: 'Admissions & Campus Inquiries | Boisar, Tarapur'
      };
    }
    if (isHistory || isRootAbout) {
      return {
        src: SCHOOL_IMAGES.CAMPUS_BUILDING,
        caption: 'Chinmaya Vidyalaya Tarapur | Campus Building (Est. 1995)'
      };
    }
    return {
      src: image || pageImages[0],
      caption: `Chinmaya Vidyalaya Tarapur | ${categoryLabel}`
    };
  };

  const primaryVisual = getPrimaryVisual();

  // Compliance section should ONLY show on root /about or dedicated mandatory information pages
  const showComplianceSection = isRootAbout || slug === 'mandatory-information';

  // Swamiji quote only on relevant philosophical/spiritual pages, NEVER on management or infrastructure
  const showSwamijiQuote = (isSwami || isFourPillars || isSpiritual || slug === 'philosophy' || slug === 'mission-vision' || isRootAbout) && !isManagement && !isEnrollment && !isFaculty && !isInfrastructure;

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
              <h3 className="font-cinzel font-bold text-[#181C20] text-base border-b border-[#E7E2D8] pb-3 uppercase tracking-wider">
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
                            ? 'bg-[#DF711B] text-white font-bold shadow-sm translate-x-1'
                            : 'text-[#4A5568] hover:bg-white hover:text-[#DF711B]'
                        }`}
                      >
                        <span className="truncate">{link.label}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick links contextual to category */}
              <div className="pt-3 border-t border-[#E7E2D8] space-y-2">
                {isRootAbout ? (
                  <>
                    <Link
                      to="/about/mandatory-information"
                      className="w-full py-2.5 bg-white hover:bg-[#DF711B] hover:text-white text-[#181C20] border border-[#E7E2D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Mandatory Disclosures & TC</span>
                    </Link>
                    <Link
                      to="/faq"
                      className="w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#4A5568] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Frequently Asked Questions</span>
                    </Link>
                  </>
                ) : isAbout ? (
                  <Link
                    to="/faq"
                    className="w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#4A5568] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#DF711B]" />
                    <span>Frequently Asked Questions</span>
                  </Link>
                ) : isAcademics ? (
                  <>
                    <Link
                      to="/downloads/sample-papers"
                      className="w-full py-2.5 bg-white hover:bg-[#DF711B] hover:text-white text-[#181C20] border border-[#E7E2D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Sample Question Papers</span>
                    </Link>
                    <Link
                      to="/faq"
                      className="w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#4A5568] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Academics FAQs</span>
                    </Link>
                  </>
                ) : isEnrollment ? (
                  <>
                    <Link
                      to="/downloads/admissions"
                      className="w-full py-2.5 bg-white hover:bg-[#DF711B] hover:text-white text-[#181C20] border border-[#E7E2D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Admission Registration Forms</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#4A5568] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Contact Administration</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/gallery"
                      className="w-full py-2.5 bg-white hover:bg-[#DF711B] hover:text-white text-[#181C20] border border-[#E7E2D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Campus Photo Gallery</span>
                    </Link>
                    <Link
                      to="/faq"
                      className="w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#4A5568] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DF711B]" />
                      <span>Frequently Asked Questions</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </aside>
        )}

        {/* Editorial Multi-Image Visual Chapters */}
        <main className={`${relatedLinks.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} order-1 lg:order-2 space-y-12`}>
          
          {/* Chapter 1: Introduction & Primary Image */}
          <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
                {getSectionEyebrow()}
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl text-[#181C20] font-extrabold leading-tight tracking-tight">
                {title}
              </h2>
            </div>

            {isMissionVision ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Distinct Panel 1: Vision */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFF9F2] to-[#FAF3E8] border-2 border-[#DF711B]/40 shadow-sm space-y-4 relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DF711B] text-white flex items-center justify-center font-bold shadow-md">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#DF711B] block">
                          CORE ASPIRATION
                        </span>
                        <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#181C20] uppercase tracking-tight">
                          Our Vision
                        </h3>
                      </div>
                    </div>
                    <blockquote className="font-cinzel text-base sm:text-lg text-[#181C20] font-bold leading-relaxed border-l-4 border-[#DF711B] pl-4 italic">
                      "To empower a community of learners who dare to dream, take risks and develop new realities."
                    </blockquote>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      We envision students who are self-reliant, intellectually bold, emotionally poised, and morally steadfast—ready to lead and uplift society in an ever-evolving world.
                    </p>
                  </div>

                  {/* Distinct Panel 2: Mission */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#F5F8FC] to-[#EEF4FB] border-2 border-[#0B1E34]/30 shadow-sm space-y-4 relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0B1E34] text-white flex items-center justify-center font-bold shadow-md">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0B1E34] block">
                          SACRED PURPOSE
                        </span>
                        <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#181C20] uppercase tracking-tight">
                          Our Mission
                        </h3>
                      </div>
                    </div>
                    <blockquote className="font-cinzel text-base sm:text-lg text-[#181C20] font-bold leading-relaxed border-l-4 border-[#0B1E34] pl-4 italic">
                      "To offer value-based holistic education that integrates ancient Indian cultural ethos with modern scientific inquiry."
                    </blockquote>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Nurturing physical vitality, mental agility, intellectual depth, and spiritual awakening through the 4 foundational pillars of the Chinmaya Vision Programme.
                    </p>
                  </div>
                </div>

                <div className="border border-[#E7E2D8] bg-[#FAF8F5] p-3 rounded-2xl flex items-center gap-3 text-xs text-[#4A5568]">
                  <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0" />
                  <span>
                    The Chinmaya Vision Programme (CVP) seamlessly integrates Value Education with academics for comprehensive personality development, inspiring noble citizenship.
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 prose max-w-none text-slate-600/90 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                  {content.slice(0, 2).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                <div className="lg:col-span-5">
                  <div className="border border-[#E7E2D8] bg-[#FAF8F5] p-2 rounded-2xl shadow-sm overflow-hidden group">
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
            )}
          </section>

          {/* Pujya Gurudev Swami Chinmayananda Quote / Tribute Block */}
          {showSwamijiQuote && (
            <section className="bg-gradient-to-br from-[#FFF8EE] to-[#FAF3E8] text-[#181C20] p-8 md:p-10 rounded-3xl border border-[#FDE49C] shadow-md relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#DF711B] shadow-lg shrink-0">
                  <img
                    src="/images/swami.jpeg"
                    alt="Pujya Gurudev Swami Chinmayananda"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[#DF711B]">
                    <Quote className="w-5 h-5 opacity-70" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DF711B]">
                      Guidance of Pujya Gurudev Swami Chinmayananda
                    </span>
                  </div>
                  <blockquote className="font-cinzel text-base sm:text-xl italic text-[#181C20] leading-relaxed">
                    "{swamijiQuote || "Children are not vessels to be filled, but lamps to be lit. To empower a child is to illuminate the entire world."}"
                  </blockquote>
                  <p className="text-xs text-slate-600 font-light">
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
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  The Four Pillars of CVP
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                  Holistic Architecture for Lifelong Character Building
                </h3>
                <p className="text-sm sm:text-base text-slate-600/85 font-normal">
                  A balanced synthesis of academic rigour, cultural rootedness, national pride, and global compassion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-base">
                    01
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                    Pillar 1: Integrated Development
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Physical fitness, emotional balance, intellectual sharpness, and spiritual awakening. Our well-ventilated classrooms possess a physical capacity to seat more than 40 students, maintained with disciplined personal student care and teacher attention.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-base">
                    02
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                    Pillar 2: Indian Culture & Heritage
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Inculcating deep reverence for ancient Indian ethos, moral principles, family values, and daily spiritual practices such as Guru Paduka Pooja, Balvihar moral classes, and Gita Chanting.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-base">
                    03
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                    Pillar 3: Patriotism & Civic Duty
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Awakening love for the motherland, respect for national symbols, active civic responsibility, and environmental stewardship through community initiatives like Jal Pakhwada.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center font-cinzel font-bold text-base">
                    04
                  </div>
                  <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                    Pillar 4: Universal Outlook
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed font-normal">
                    Instilling the timeless Upanishadic vision 'Vasudhaiva Kutumbakam' (The world is one family) through scientific inquiry, global empathy, and ecological compassion for all sentient beings.
                  </p>
                </div>
              </div>
            </section>
          )}


          {/* Mandatory Public Disclosures & Transfer Certificates (TC) Feature Box - ONLY on root /about or statutory pages */}
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

              {/* Merged TC Archives Grid (Sample TC Removed per Requirements) */}
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
                  <div key={tc.id} className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-[#DF711B] transition-all">
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

          {/* Special Section: History Milestones & School Profile */}
          {isHistory && (
            <section className="bg-white border border-[#E7E2D8] p-8 md:p-12 rounded-3xl shadow-card space-y-10">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
                  Institutional Milestones & Heritage
                </span>
                <h3 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold">
                  Historical Milestones & Academic Legacy
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-normal">
                  From a humble inception with 72 students to a premier institution of 1,600+ learners rooted in the Chinmaya Vision Programme.
                </p>
              </div>

              {/* Key Institutional Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-2xl text-center space-y-1">
                  <div className="text-xs font-mono text-[#DF711B] uppercase tracking-wider font-bold">Envisaged</div>
                  <div className="font-cinzel text-2xl font-bold text-[#181C20]">1993</div>
                  <p className="text-[11px] text-slate-500">Tarapur Mission Centre</p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-2xl text-center space-y-1">
                  <div className="text-xs font-mono text-[#DF711B] uppercase tracking-wider font-bold">Inauguration</div>
                  <div className="font-cinzel text-2xl font-bold text-[#181C20]">18 June 1995</div>
                  <p className="text-[11px] text-slate-500">H.H. Swami Purushottamananda</p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-2xl text-center space-y-1">
                  <div className="text-xs font-mono text-[#DF711B] uppercase tracking-wider font-bold">CBSE Affiliation</div>
                  <div className="font-cinzel text-2xl font-bold text-[#181C20]">2003</div>
                  <p className="text-[11px] text-slate-500">Affiliation No. 1130058</p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-2xl text-center space-y-1">
                  <div className="text-xs font-mono text-[#DF711B] uppercase tracking-wider font-bold">Current Strength</div>
                  <div className="font-cinzel text-2xl font-bold text-[#181C20]">~1,600</div>
                  <p className="text-[11px] text-slate-500">Students On Roll</p>
                </div>
              </div>

              {/* Step-by-Step Chronology */}
              <div className="relative border-l-2 border-[#DF711B]/30 ml-4 pl-6 space-y-8">
                {[
                  {
                    year: "1993",
                    title: "Vision & Conception",
                    desc: "Envisaged by devoted members of the Tarapur Chinmaya Mission Centre, inspired by the divine guidance of Param Pujya Swami Chinmayanandaji to provide value-integrated education.",
                    icon: Sparkles
                  },
                  {
                    year: "1994",
                    title: "Groundbreaking & Construction",
                    desc: "Construction of the first phase commenced in the auspicious presence of Param Pujya Swami Tejomayanandaji, establishing an enduring center for character building.",
                    icon: Building2
                  },
                  {
                    year: "18 June 1995",
                    title: "Formal School Inauguration",
                    desc: "Solemnly inaugurated by H.H. Swami Purushottamanandaji. The school started with an inaugural batch of 72 students and 4 teachers as the FIRST Chinmaya Vidyalaya in the Maharashtra–Gujarat–Goa zone.",
                    icon: Calendar
                  },
                  {
                    year: "2003",
                    title: "CBSE Affiliation & Growth",
                    desc: "Granted official composite affiliation by the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 1130058, School Code: 30040, U-DISE: 27361116004).",
                    icon: ShieldCheck
                  },
                  {
                    year: "2004–2005",
                    title: "First AISSE Class X Examination Batch",
                    desc: "The maiden batch of Standard X appeared for the All India Secondary School Examination (AISSE), initiating an unbroken tradition of 100% board examination distinctions.",
                    icon: Award
                  },
                  {
                    year: "Present Day",
                    title: "Flourishing Academic Sanctuary",
                    desc: "Now educating approximately 1600 students from Nursery to Senior Secondary, guided by Central Chinmaya Mission Trust, Mumbai and the Local Managing Committee.",
                    icon: Users
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[33px] top-1 w-5 h-5 rounded-full bg-[#DF711B] border-2 border-[#FFB740] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-2xl group-hover:border-[#DF711B] transition-colors">
                        <div className="flex items-center gap-3 mb-1">
                          <Icon className="w-4 h-4 text-[#DF711B] shrink-0" />
                          <span className="text-xs font-mono font-bold text-[#DF711B] bg-[#FAF3E8] px-2.5 py-0.5 rounded-full">
                            {item.year}
                          </span>
                          <h4 className="font-cinzel font-bold text-[#181C20] text-base">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Campus Location Map on History Page */}
              <div className="pt-6 border-t border-[#E7E2D8]">
                <GoogleMapSection />
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
                    className="bg-[#FCFBF7] border border-[#E7E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
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
                      <tr className="bg-[#FAF8F5] border-b border-[#E7E2D8] font-cinzel font-bold text-[#181C20]">
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
                        <tr key={m.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
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
                <div id="primary-wing" className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl shadow-sm space-y-4 scroll-mt-28">
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
                <div id="secondary-wing" className="bg-[#FAF8F5] border border-[#E7E2D8] p-6 rounded-2xl shadow-sm space-y-4 scroll-mt-28">
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

          {/* Chapter 2: Full-Width Photographic Visual */}
          {!isManagement && pageImages[1] && (
            <section className="relative overflow-hidden border border-[#E7E2D8] bg-white p-3 rounded-3xl shadow-sm">
              <img
                src={pageImages[1]}
                alt={`${title} photographic showcase`}
                    className="w-full h-72 sm:h-80 md:h-[400px] object-cover object-center rounded-2xl"
              />
              <div className="p-4 bg-[#FAF8F5] text-[#181C20] border-t border-[#E7E2D8] flex flex-col md:flex-row justify-between items-center gap-2 text-xs rounded-b-2xl">
                <span className="font-cinzel text-sm font-bold text-[#181C20] uppercase tracking-wider">
                  Chinmaya Vidyalaya Tarapur Excellence
                </span>
                <span className="text-[#DF711B] font-mono font-bold">Affiliated to CBSE, New Delhi</span>
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

            {isManagement && (
              <div className="bg-[#FAF3E8] border border-[#FDE49C] p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-cinzel font-bold text-base text-[#181C20]">Governance & Administrative Office</h4>
                  <p className="text-xs text-slate-600 max-w-xl">
                    For official inquiries, trustee correspondence, or institutional records with the Local Managing Committee or Central Chinmaya Mission Trust, contact the Principal's administrative desk.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5"
                >
                  <span>Contact Administration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {!isManagement && !isSwami && bulletPoints && bulletPoints.length > 0 && (
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

          {/* Chapter 4: Features / Highlights Grid */}
          {!isManagement && !isSwami && (features || highlights) && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 bg-white border border-[#E7E2D8] p-8 rounded-3xl shadow-card space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                    Core Methodologies & Highlights
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">Key Educational Pillars</h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#181C20]">
                    {(features || highlights || []).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 border-b border-[#E7E2D8] pb-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
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
                    className="w-full h-72 sm:h-80 object-cover object-center rounded-2xl"
                  />
                  <div className="p-3 bg-[#FAF8F5] text-xs text-[#4A5568] text-center font-medium rounded-b-2xl">
                    Integrated Learning Facilities | Boisar / Tarapur
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Action Footer Callout */}
          {isSwami ? (
            <section className="bg-gradient-to-r from-[#181818] to-[#252525] text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono font-bold text-[#FFB740] uppercase tracking-wider block">
                  Living the Vision
                </span>
                <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-white">
                  Carrying Forward Gurudev's Vision
                </h3>
                <p className="text-sm text-white/80 font-light max-w-xl">
                  Every classroom, prayer assembly, and student activity at Chinmaya Vidyalaya Tarapur is an offering to Pujya Gurudev's ideal of value-based nation building.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/about/philosophy"
                  className="px-5 py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Explore CVP Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/about/mission-vision"
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20"
                >
                  <span>Mission & Vision</span>
                </Link>
              </div>
            </section>
          ) : null}

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
