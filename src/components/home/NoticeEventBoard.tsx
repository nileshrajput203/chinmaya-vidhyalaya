import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  FileText, 
  Download, 
  ArrowRight, 
  Award, 
  Clock, 
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { OFFICIAL_NOTICES } from '../../data/notices';

export const NoticeEventBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'academic'>('events');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const [showAllEvents, setShowAllEvents] = useState<boolean>(false);
  const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(new Set());
  const viewFewerBtnRef = useRef<HTMLButtonElement>(null);

  const toggleExpandEvent = (id: string) => {
    setExpandedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isEventPast = (dateStr: string): boolean => {
    const eventDate = new Date(dateStr);
    eventDate.setHours(23, 59, 59, 999);
    return eventDate.getTime() < Date.now();
  };
  
  const upcomingEvents = [
    {
      id: 'ev-nov-0',
      title: 'Commencement of National Education & CVP Value Month',
      date: 'November 01, 2026',
      month: 'November 2026',
      time: '08:00 AM IST',
      venue: 'School Campus & Morning Assembly Quadrangle',
      tag: 'Chinmaya Vision',
      desc: 'Inauguration of November scholastic curriculum focus, Chinmaya Vision Programme (CVP) character development modules, and inter-house project submissions.'
    },
    {
      id: 'ev-nov-1',
      title: 'Diwali Vacation Break & Deepotsav Celebrations',
      date: 'November 05, 2026',
      month: 'November 2026',
      time: '10:00 AM IST',
      venue: 'School Campus & Prayer Hall',
      tag: 'Vacation & Festival',
      desc: 'Campus Deepotsav lamp lighting ceremony; Diwali holiday break commences for all classes (School reopens on November 20, 2026).'
    },
    {
      id: 'ev-nov-2',
      title: 'Children\'s Day & Bal Mela Celebrations',
      date: 'November 14, 2026',
      month: 'November 2026',
      time: '09:00 AM IST',
      venue: 'School Sports Ground',
      tag: 'Student Life',
      desc: 'Festive tributes and special recreational games organized by faculty members to commemorate National Children\'s Day.'
    },
    {
      id: 'ev-nov-3',
      title: 'Guru Nanak Dev Ji Jayanti Observance',
      date: 'November 24, 2026',
      month: 'November 2026',
      time: '08:30 AM IST',
      venue: 'Main Auditorium',
      tag: 'Spiritual Heritage',
      desc: 'Special morning assembly honoring the universal teachings of selfless service, compassion, and divine unity.'
    },
    {
      id: 'ev-nov-4',
      title: 'Periodic Assessment - II (Classes III to IX)',
      date: 'November 25, 2026',
      month: 'November 2026',
      time: '08:00 AM IST',
      venue: 'Examination Halls',
      tag: 'Assessments',
      desc: 'Second periodical assessment series for students of Standards III to IX evaluating mid-session scholastic progress.'
    },
    {
      id: 'ev-dec-1',
      title: 'Inter-House English Elocution Competition (Std I to XII)',
      date: 'December 05, 2026',
      month: 'December 2026',
      time: '09:30 AM IST',
      venue: 'AV Seminar Hall',
      tag: 'Literary Arts',
      desc: 'Student orators demonstrate rhetorical clarity, persuasive speaking, and articulate presentation on contemporary themes.'
    },
    {
      id: 'ev-dec-2',
      title: 'Gita Jayanti, Tapovan Jayanti & Chinmaya Samarpan Diwas',
      date: 'December 19, 2026',
      month: 'December 2026',
      time: '08:30 AM IST',
      venue: 'School Main Prayer Auditorium',
      tag: 'Spiritual Heritage',
      desc: 'Special Paduka pooja, Sanskrit Shloka recitation, monoact, and commemorative tributes honoring Param Pujya Swami Tapovan Maharaj.'
    },
    {
      id: 'ev-dec-3',
      title: 'Winter Break & Year-End Recess',
      date: 'December 25, 2026',
      month: 'December 2026',
      time: '08:00 AM IST',
      venue: 'School Campus',
      tag: 'Academic Calendar',
      desc: 'Winter vacation commences from December 25, 2026 to January 01, 2027. School reopens on Saturday, January 02, 2027.'
    },
    {
      id: 'ev-jan-1',
      title: 'Model Pre-Board Examinations & Unit Test - II',
      date: 'January 03, 2027',
      month: 'January 2027',
      time: '08:00 AM IST',
      venue: 'Senior Wing Examination Halls',
      tag: 'Assessments',
      desc: 'Rigorous model pre-board tests for CBSE Board examinees (Std X & XII) and Unit Test 2 for Standard XI.'
    },
    {
      id: 'ev-jan-2',
      title: 'National Youth Day (Swami Vivekananda Jayanti)',
      date: 'January 12, 2027',
      month: 'January 2027',
      time: '08:30 AM IST',
      venue: 'Central Assembly Quadrangle',
      tag: 'National Pride',
      desc: 'Commemorating Swami Vivekananda\'s clarion call to youth with oratorical presentations and values orientation.'
    },
    {
      id: 'ev-jan-3',
      title: '78th Republic Day Ceremonial Parade & Cultural Pageant',
      date: 'January 26, 2027',
      month: 'January 2027',
      time: '08:00 AM IST',
      venue: 'Central Sports Ground',
      tag: 'Patriotic Zeal',
      desc: 'National Tri-colour flag unfurling, NCC troop march past, patriotic brass band display, and felicitation of student achievers.'
    },
    {
      id: 'ev-feb-1',
      title: 'Annual Sports Day & Athletic Meet Championship',
      date: 'February 06, 2027',
      month: 'February 2027',
      time: '08:30 AM IST',
      venue: 'Central Campus Athletic Ground',
      tag: 'Sports & Athletics',
      desc: 'Grand track and field championships, inter-house march-past, gymnastic displays, and athletic award ceremonies.'
    },
    {
      id: 'ev-feb-2',
      title: 'CBSE Board Examination Commencement (Std X & XII)',
      date: 'February 15, 2027',
      month: 'February 2027',
      time: '09:00 AM IST',
      venue: 'Senior Wing Exam Centers',
      tag: 'Assessments',
      desc: 'Commencement of All India Secondary School Examination (AISSE) and Senior School Certificate Examination (AISSCE).'
    },
    {
      id: 'ev-mar-1',
      title: 'Maha Shivaratri Celebrations & Bhajan Sandhya',
      date: 'March 06, 2027',
      month: 'March 2027',
      time: '09:00 AM IST',
      venue: 'School Prayer Auditorium',
      tag: 'Spiritual Heritage',
      desc: 'Sacred Rudrabhisheka chanting, devotional stotrams, and cultural reflections on inner awakening.'
    },
    {
      id: 'ev-mar-2',
      title: 'Annual Term-End Examinations & Evaluation - III',
      date: 'March 15, 2027',
      month: 'March 2027',
      time: '08:00 AM IST',
      venue: 'All Examination Wings',
      tag: 'Assessments',
      desc: 'Final comprehensive annual academic assessments for Nursery through Standard IX & XI for the 2026-27 session.'
    }
  ];

  const availableMonths = ['all', 'November 2026', 'December 2026', 'January 2027', 'February 2027', 'March 2027'];
  


  const filteredEvents = upcomingEvents.filter((ev) => {
    const matchesMonth = selectedMonth === 'all' || ev.month === selectedMonth;
    return matchesMonth;
  });

  return (
    <section className="py-12 lg:py-16 bg-white text-[#181C20] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#D5CEC2] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DF711B] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                COMMUNICATION DISPATCH • LIVE BOARD
              </span>
            </div>
            <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[40px] font-black text-[#181818] tracking-tight leading-none uppercase mt-1 m-0">
              NOTICE & EVENT BOARD
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] hover:bg-[#DF711B] text-white text-xs font-bold font-mono uppercase tracking-wider transition-colors"
            >
              <span>View Full Bulletin</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFB740]" />
            </Link>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#D5CEC2] -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('notices')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'notices'
                ? 'border-[#DF711B] text-[#DF711B] bg-white/70'
                : 'border-transparent text-[#555555] hover:text-[#181818]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Active Circulars ({OFFICIAL_NOTICES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'events'
                ? 'border-[#DF711B] text-[#DF711B] bg-white/70'
                : 'border-transparent text-[#555555] hover:text-[#181818]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events Calendar ({upcomingEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'academic'
                ? 'border-[#DF711B] text-[#DF711B] bg-white/70'
                : 'border-transparent text-[#555555] hover:text-[#181818]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Academic & Exam Dispatches</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'notices' && (
          OFFICIAL_NOTICES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICIAL_NOTICES.map((notice) => (
                <div 
                  key={notice.id}
                  className="bg-white border border-[#D5CEC2] p-4 flex flex-col justify-between space-y-3 hover:border-[#DF711B] transition-all shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 ${
                        notice.isImportant 
                          ? 'bg-[#FFF0E6] text-[#DF711B] border border-[#DF711B]/30' 
                          : 'bg-slate-100 text-[#555555]'
                      }`}>
                        {notice.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#777777]">{notice.date}</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-[#181818] leading-snug line-clamp-2">
                      {notice.title}
                    </h4>

                    <p className="text-xs text-[#555555] leading-relaxed line-clamp-3 font-normal">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                    {notice.fileUrl ? (
                      <a
                        href={notice.fileUrl}
                        download
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DF711B] hover:text-[#c45b0e] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-[#888888]">Institutional Circular</span>
                    )}
                    <span className="text-[10px] font-mono text-[#888888]">CBSE Board</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#D5CEC2] p-8 text-center text-[#777777] font-mono text-xs">
              No active circulars at this moment. New circulars will be published soon.
            </div>
          )
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {/* Filter Bar: Status & Month Controls */}
            <div className="flex items-center justify-start gap-3 pb-3 border-b border-slate-200">
              {/* Month Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider mr-1 hidden sm:inline">
                  Month:
                </span>
                {availableMonths.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(m);
                      setShowAllEvents(false);
                    }}
                    className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shrink-0 ${
                      selectedMonth === m
                        ? 'bg-[#DF711B] text-white shadow-xs'
                        : 'bg-white border border-[#D5CEC2] text-[#555555] hover:border-[#DF711B] hover:text-[#181818]'
                    }`}
                  >
                    {m === 'all' ? 'All Months' : m}
                  </button>
                ))}
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="bg-white border border-[#D5CEC2] p-8 text-center text-[#777777] font-mono text-xs">
                No events found matching the selected filter criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(showAllEvents ? filteredEvents : filteredEvents.slice(0, 4)).map((ev) => {
                  const isPast = isEventPast(ev.date);
                  const isExpanded = expandedEventIds.has(ev.id);

                  return (
                    <div 
                      key={ev.id}
                      className={`bg-white border border-[#D5CEC2] p-4 flex flex-col justify-between space-y-3 hover:border-[#DF711B] transition-all shadow-xs ${
                        isPast ? 'bg-[#FAF8F5]/80' : ''
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[8.5px] font-mono font-bold text-[#DF711B] bg-[#FFF0E6] border border-[#DF711B]/30 px-1.5 py-0.5 uppercase tracking-wider">
                            {ev.tag}
                          </span>
                          <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 uppercase tracking-wider flex items-center gap-1 rounded-xs ${
                            isPast 
                              ? 'bg-slate-100 text-slate-600 border border-slate-300' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'}`} />
                            <span>{isPast ? 'Concluded' : 'Upcoming'}</span>
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className={`text-white py-2 px-1 text-center shrink-0 w-16 rounded-xl flex flex-col items-center justify-center border shadow-xs ${
                            isPast ? 'bg-slate-700 border-slate-700' : 'bg-[#181818] border-[#181818]'
                          }`}>
                            <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 leading-tight">
                              {ev.date.split(' ')[0].slice(0, 3)}
                            </span>
                            <span className="block font-display font-black text-xl text-white leading-tight mt-0.5">
                              {ev.date.split(' ')[1].replace(',', '')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm text-[#181818] leading-tight line-clamp-2">
                              {ev.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[10px] text-[#777777] font-mono mt-1">
                              <MapPin className="w-3 h-3 text-[#DF711B] shrink-0" />
                              <span className="line-clamp-1">{ev.venue}</span>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-700 bg-amber-50/80 px-2 py-1 border border-amber-200/60 rounded-xs">
                            <Clock className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                            <span>Schedule: <strong className="text-slate-900">{ev.time}</strong></span>
                          </div>
                        )}

                        <p className={`text-xs text-[#555555] leading-relaxed font-normal transition-all ${
                          isExpanded ? '' : 'line-clamp-2'
                        }`}>
                          {ev.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-end text-xs">
                        <button
                          type="button"
                          onClick={() => toggleExpandEvent(ev.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#DF711B] hover:text-[#C45B0E] hover:underline cursor-pointer transition-colors ml-auto"
                          aria-label={isExpanded ? `Show less for ${ev.title}` : `Read more for ${ev.title}`}
                        >
                          <span>{isExpanded ? 'Read Less ‹' : 'Read More ›'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Desktop & Mobile View More / View Fewer Toggle */}
            {filteredEvents.length > 4 && (
              <div className="pt-3 text-center">
                <button
                  ref={viewFewerBtnRef}
                  type="button"
                  onClick={() => {
                    if (showAllEvents && viewFewerBtnRef.current) {
                      // Capture button's viewport position BEFORE the grid shrinks
                      const btnTop = viewFewerBtnRef.current.getBoundingClientRect().top;
                      setShowAllEvents(false);
                      // Wait two frames for React to finish re-rendering the collapsed grid,
                      // then compensate the scroll so the button stays at the same Y position
                      requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                          if (viewFewerBtnRef.current) {
                            const newBtnTop = viewFewerBtnRef.current.getBoundingClientRect().top;
                            const delta = newBtnTop - btnTop;
                            if (Math.abs(delta) > 1) {
                              window.scrollBy({ top: delta, behavior: 'instant' });
                              if ((window as any).__lenis) {
                                (window as any).__lenis.scrollTo(window.scrollY, { immediate: true });
                              }
                            }
                          }
                        });
                      });
                    } else {
                      setShowAllEvents(true);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-white hover:bg-[#FAF3E8] border-2 border-[#DF711B] text-[#DF711B] hover:text-[#C45B0E] font-display font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>
                    {showAllEvents
                      ? 'View Fewer Events'
                      : `View More Events (${filteredEvents.length - 4} more)`
                    }
                  </span>
                  {showAllEvents ? (
                    <ChevronUp className="w-4 h-4 text-[#DF711B]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#DF711B]" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#D5CEC2] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#DF711B]" />
                <h4 className="font-display font-bold text-sm text-[#181818] uppercase">
                  Class 1 to 5 Evaluation Papers
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Official Evaluation III revision papers across English, Mathematics, Environmental Studies, and Hindi.
              </p>
              <div className="space-y-1.5 pt-1">
                {[
                  { name: 'Standard 1 Evaluation III', file: '/images/standard-1-evaluation-iii-question-papers.pdf' },
                  { name: 'Standard 2 Evaluation III', file: '/images/standard-2-evaluation-iii-question-papers.pdf' },
                  { name: 'Standard 3 Evaluation III', file: '/images/standard-3-evaluation-iii-question-papers.pdf' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.file}
                    download
                    className="flex items-center justify-between p-2 bg-white border border-slate-200 text-xs hover:border-[#DF711B] hover:text-[#DF711B] transition-colors"
                  >
                    <span>{item.name}</span>
                    <Download className="w-3.5 h-3.5 text-[#DF711B]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#D5CEC2] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#DF711B]" />
                <h4 className="font-display font-bold text-sm text-[#181818] uppercase">
                  CBSE Class X AISSE Board Records
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                100% board pass percentage with students securing distinctions and placement on the CBSE Delhi Merit List.
              </p>
              <div className="space-y-2 pt-1">
                <div className="p-2.5 bg-[#FFF7DF] border border-[#DF711B]/40 text-xs text-[#181818]">
                  <strong className="block text-[#DF711B] font-mono uppercase text-[10px]">Annual Metric</strong>
                  Consecutive 100% First Class results since inaugural batch of 2004-2005.
                </div>
                <Link
                  to="/downloads/sample-papers"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DF711B] hover:text-[#c45b0e] pt-1"
                >
                  <span>Access Sample Question Papers ›</span>
                </Link>
              </div>
            </div>

            <div className="bg-white border border-[#D5CEC2] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#DF711B]" />
                <h4 className="font-display font-bold text-sm text-[#181818] uppercase">
                  Academic Calendar & Timetable
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Download the complete academic schedule with term examination dates, vacation breaks, and co-curricular weeks.
              </p>
              <div className="space-y-2 pt-1">
                <Link
                  to="/admissions/calendar"
                  className="flex items-center justify-between p-2.5 bg-[#181818] text-white text-xs font-bold hover:bg-[#DF711B] transition-colors"
                >
                  <span>View School Calendar 2026-27</span>
                  <Calendar className="w-4 h-4 text-[#FFB740]" />
                </Link>
                <Link
                  to="/academics/curriculum"
                  className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#DF711B] transition-colors"
                >
                  <span>View Curriculum Syllabi (Std I to X) ›</span>
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
