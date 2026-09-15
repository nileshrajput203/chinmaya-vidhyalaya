import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Sparkles, 
  MessageCircleQuestion, 
  ArrowRight, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  X,
  Phone,
  BookOpen,
  FileDown,
  ShieldCheck,
  Building2,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFICIAL_FAQS, FAQ_CATEGORIES, FaqItem } from '../../data/faq';

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  categoryFilter?: string;
  showCategoryTabs?: boolean;
  previewCount?: number;
  id?: string;
}

const QUICK_TAGS = [
  'Admissions 2026-27',
  '40 Student Batch Cap',
  '100% CBSE Pass Record',
  '4 Pillars of CVP',
  'Transfer Certificates',
  'Smart Laboratories',
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Official guidance regarding admissions, CBSE academic curriculum, the Chinmaya Vision Program, and institutional governance.",
  categoryFilter,
  showCategoryTabs = true,
  previewCount,
  id = "faq-section",
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || 'all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(OFFICIAL_FAQS[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feedbackState, setFeedbackState] = useState<Record<string, 'helpful' | 'not-helpful'>>({});

  const toggleFaq = (faqId: string) => {
    setOpenFaqId((prev) => (prev === faqId ? null : faqId));
  };

  const handleFeedback = (faqId: string, type: 'helpful' | 'not-helpful') => {
    setFeedbackState((prev) => ({
      ...prev,
      [faqId]: type,
    }));
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: OFFICIAL_FAQS.length };
    FAQ_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = OFFICIAL_FAQS.filter((f) => f.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return OFFICIAL_FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedFaqs = previewCount ? filteredFaqs.slice(0, previewCount) : filteredFaqs;

  const getCategoryIcon = (category: FaqItem['category']) => {
    switch (category) {
      case 'admissions':
        return <GraduationCap className="w-3.5 h-3.5 text-[#D97745]" />;
      case 'academics':
        return <BookOpen className="w-3.5 h-3.5 text-[#D97745]" />;
      case 'cvp':
        return <Sparkles className="w-3.5 h-3.5 text-[#D97745]" />;
      case 'facilities':
        return <Building2 className="w-3.5 h-3.5 text-[#D97745]" />;
      case 'disclosures':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#D97745]" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-[#D97745]" />;
    }
  };

  return (
    <section id={id} className="py-16 sm:py-24 bg-[#FCFBF7] text-[#181C20] relative">
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* ====================================================
            HEADER BLOCK (Double-bezel badge + Typography)
           ==================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FAF3E8] border border-[#E7E2D8] px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#D97745] uppercase tracking-[0.2em] shadow-sm">
            <HelpCircle className="w-4 h-4 text-[#D97745]" />
            <span>Institutional Knowledge & Policies</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1D30] tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600/90 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ====================================================
            SEARCH BAR & CATEGORY PILLS (Double-Bezel Architecture)
           ==================================================== */}
        {!previewCount && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Search Input Box */}
            <div className="p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl bg-black/[0.03] border border-[#E7E2D8] shadow-sm">
              <div className="relative bg-white rounded-[calc(1.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center px-4 py-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., class capacity, registration, Gita chanting, laboratories, TC)..."
                  className="w-full py-2 bg-transparent text-sm sm:text-base text-[#0B1D30] placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors ml-2"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-1">
                Popular:
              </span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    searchQuery === tag
                      ? 'bg-[#D97745] text-white border-[#D97745]'
                      : 'bg-[#F7F3EB] text-[#4A5568] border-[#E7E2D8] hover:border-[#D97745] hover:text-[#0B1D30]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Category Filter Tabs */}
            {showCategoryTabs && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {FAQ_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#0B1D30] text-white shadow-md scale-105'
                          : 'bg-white text-[#4A5568] border border-[#E7E2D8] hover:bg-[#FAF8F5] hover:text-[#0B1D30]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold transition-colors ${
                          isActive
                            ? 'bg-[#D97745] text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-[#FAF3E8] group-hover:text-[#D97745]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Live Search Status */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-500 px-2 pt-1 border-b border-[#E7E2D8] pb-3">
              <span>
                Displaying <strong className="text-[#0B1D30]">{displayedFaqs.length}</strong> of {OFFICIAL_FAQS.length} verified answers
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#D97745] hover:underline font-semibold"
                >
                  Reset filters
                </button>
              )}
            </div>

          </div>
        )}

        {/* ====================================================
            FAQ ACCORDION LIST (Doppelrand Double-Bezel Hardware Architecture)
           ==================================================== */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {displayedFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#E7E2D8] rounded-3xl p-8 space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center mx-auto">
                <MessageCircleQuestion className="w-7 h-7" />
              </div>
              <h4 className="font-cinzel font-bold text-lg text-[#0B1D30]">No matching inquiries found</h4>
              <p className="text-sm text-slate-600/90 max-w-md mx-auto">
                We could not find an answer matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or reach out directly to our administrative office.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-5 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          ) : (
            displayedFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              const feedback = feedbackState[faq.id];

              return (
                <div
                  key={faq.id}
                  className={`p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#FAF3E8]/60 border-[#D97745]/50 shadow-[0_12px_35px_-8px_rgba(217,119,69,0.18)]'
                      : 'bg-black/[0.02] border-[#E7E2D8] hover:border-slate-300 hover:bg-black/[0.04]'
                  }`}
                >
                  <div className="bg-white rounded-[calc(1.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden">
                    
                    {/* Header Button */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 transition-colors group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Number & Category Icon Pill */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isOpen
                              ? 'bg-[#0B1D30] text-white shadow-md'
                              : 'bg-[#FAF8F5] text-[#D97745] border border-[#E7E2D8] group-hover:border-[#D97745]'
                          }`}
                        >
                          {getCategoryIcon(faq.category)}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D97745] bg-[#FAF3E8] px-2 py-0.5 rounded-md">
                              {faq.category}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              Question {index + 1}
                            </span>
                          </div>

                          <h3
                            className={`font-cinzel text-base sm:text-xl font-bold transition-colors leading-snug ${
                              isOpen ? 'text-[#D97745]' : 'text-[#0B1D30] group-hover:text-[#D97745]'
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>
                      </div>

                      {/* Rotating Chevron in Circular Pill Wrapper */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#D97745] text-white rotate-180 shadow-sm'
                            : 'bg-[#FAF8F5] text-slate-500 border border-[#E7E2D8] group-hover:bg-white group-hover:text-[#0B1D30]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </button>

                    {/* Accordion Content with Spring Motion */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7E2D8]/60 space-y-4">
                            
                            {/* Answer Paragraph */}
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal pl-0 sm:pl-12">
                              {faq.answer}
                            </p>

                            {/* Tactile Feedback & Contextual Actions */}
                            <div className="pl-0 sm:pl-12 pt-3 border-t border-[#E7E2D8]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                              
                              {/* Helpful micro-voting */}
                              <div className="flex items-center gap-2 text-slate-500">
                                <span className="font-mono text-[11px]">Was this answer helpful?</span>
                                {feedback ? (
                                  <span className="inline-flex items-center gap-1 text-[#D97745] font-bold font-mono">
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Thank you for your feedback!</span>
                                  </span>
                                ) : (
                                  <div className="inline-flex items-center gap-1.5">
                                    <button
                                      onClick={() => handleFeedback(faq.id, 'helpful')}
                                      className="p-1.5 px-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF3E8] text-slate-600 hover:text-[#0B1D30] border border-[#E7E2D8] transition-colors flex items-center gap-1 font-mono text-[11px]"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>Yes</span>
                                    </button>
                                    <button
                                      onClick={() => handleFeedback(faq.id, 'not-helpful')}
                                      className="p-1.5 px-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF3E8] text-slate-600 hover:text-[#0B1D30] border border-[#E7E2D8] transition-colors flex items-center gap-1 font-mono text-[11px]"
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                      <span>No</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Relevant Action Link Based on Category */}
                              <div>
                                {faq.category === 'admissions' && (
                                  <Link
                                    to="/downloads/admissions"
                                    className="inline-flex items-center gap-1 text-[#D97745] hover:underline font-bold text-xs"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span>Download Registration Form</span>
                                  </Link>
                                )}
                                {faq.category === 'disclosures' && (
                                  <Link
                                    to="/about/mandatory-information"
                                    className="inline-flex items-center gap-1 text-[#D97745] hover:underline font-bold text-xs"
                                  >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Inspect CBSE Disclosures</span>
                                  </Link>
                                )}
                                {faq.category === 'cvp' && (
                                  <Link
                                    to="/about/philosophy"
                                    className="inline-flex items-center gap-1 text-[#D97745] hover:underline font-bold text-xs"
                                  >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Explore Chinmaya Vision Program</span>
                                  </Link>
                                )}
                                {faq.category === 'facilities' && (
                                  <Link
                                    to="/academics/infrastructure"
                                    className="inline-flex items-center gap-1 text-[#D97745] hover:underline font-bold text-xs"
                                  >
                                    <Building2 className="w-3.5 h-3.5" />
                                    <span>View Campus Infrastructure</span>
                                  </Link>
                                )}
                                {faq.category === 'academics' && (
                                  <Link
                                    to="/academics/curriculum"
                                    className="inline-flex items-center gap-1 text-[#D97745] hover:underline font-bold text-xs"
                                  >
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>View CBSE Curriculum</span>
                                  </Link>
                                )}
                              </div>

                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ====================================================
            VIEW ALL BUTTON (If previewCount is active)
           ==================================================== */}
        {previewCount && (
          <div className="text-center pt-4">
            <Link
              to="/faq"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Explore All Verified FAQs & Policies</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </Link>
          </div>
        )}

        {/* ====================================================
            ESCALATION SUPPORT CARD (High-End Island & Button-in-Button)
           ==================================================== */}
        <div className="max-w-4xl mx-auto p-1 sm:p-1.5 rounded-3xl bg-[#0B1D30]/10 border border-[#D97745]/30 shadow-2xl">
          <div className="bg-gradient-to-br from-[#0B1D30] to-[#162E4A] text-white p-8 sm:p-10 rounded-[calc(1.5rem-0.375rem)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97745]/20 text-[#D97745] text-xs font-mono font-bold uppercase tracking-widest border border-[#D97745]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Administrative Helpdesk</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
                Have a unique query not covered here?
              </h3>
              <p className="text-sm sm:text-base text-slate-300/85 max-w-lg font-normal leading-relaxed">
                Our admissions counselors, student coordinators, and principal desk at Vidyanagar, Boisar are ready to assist you.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-300 pt-1">
                <a href="tel:9322054713" className="flex items-center gap-1.5 hover:text-[#D97745] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#D97745]" />
                  <span>+91 9322054713 / 9823517700</span>
                </a>
                <span>•</span>
                <span>Mon – Sat: 8:30 AM – 3:30 PM</span>
              </div>
            </div>

            {/* Button-in-Button Trailing Icon CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#D97745] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Contact Admissions Desk</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
