import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  FileText, 
  Download, 
  ArrowRight, 
  Award, 
  Clock, 
  MapPin
} from 'lucide-react';
import { OFFICIAL_NOTICES } from '../../data/notices';

export const NoticeEventBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'academic'>('events');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  
  const upcomingEvents = [
    {
      id: 'ev-oct-1',
      title: 'Inter-House Fancy Dress & Declamation Competition',
      date: 'October 17, 2026',
      month: 'October 2026',
      time: '09:00 AM IST',
      venue: 'Primary Wing & AV Seminar Hall',
      tag: 'CCA Cultural',
      desc: 'Annual CCA presentation featuring Ramayana character dramatization for junior classes and oratorical declamation for seniors.'
    },
    {
      id: 'ev-oct-2',
      title: 'Vijaya Dashami & Dussehra Special Observance',
      date: 'October 20, 2026',
      month: 'October 2026',
      time: '08:30 AM IST',
      venue: 'Central Assembly Ground',
      tag: 'Cultural Festival',
      desc: 'Commemorating the triumph of virtue with special morning assembly discourse, Vedic prayers, and festive greetings.'
    },
    {
      id: 'ev-oct-3',
      title: 'Periodic Assessment - II & Term Evaluations (Classes I to XII)',
      date: 'October 26, 2026',
      month: 'October 2026',
      time: '08:00 AM IST',
      venue: 'Examination Halls',
      tag: 'Assessments',
      desc: 'Commencement of Second Periodical Assessment for Std X & XII and Evaluation-2 across Primary and Secondary wings.'
    },
    {
      id: 'ev-oct-4',
      title: 'Annual Inter-House Gita Chanting Competition (Std I to XII)',
      date: 'October 31, 2026',
      month: 'October 2026',
      time: '09:30 AM IST',
      venue: 'Sanskrit & Value Education Wing',
      tag: 'Vedic Heritage',
      desc: 'Comprehensive inter-house recitation and spiritual memorization competition covering designated verses from Srimad Bhagavad Gita.'
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

  const availableMonths = ['all', 'October 2026', 'November 2026', 'December 2026', 'January 2027', 'March 2027'];
  const filteredEvents = selectedMonth === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(ev => ev.month === selectedMonth);

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
            <span>Upcoming Events ({upcomingEvents.length})</span>
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
            {/* Month Filter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider mr-1 hidden sm:inline">
                Month:
              </span>
              {availableMonths.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-[#DF711B] text-white shadow-xs'
                      : 'bg-white border border-[#D5CEC2] text-[#555555] hover:border-[#DF711B] hover:text-[#181818]'
                  }`}
                >
                  {m === 'all' ? 'All Months' : m}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEvents.map((ev) => (
                <div 
                  key={ev.id}
                  className="bg-white border border-[#D5CEC2] p-4 flex flex-col justify-between space-y-3 hover:border-[#DF711B] transition-all shadow-xs"
                >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#DF711B] bg-[#FFF0E6] border border-[#DF711B]/30 px-2 py-0.5 uppercase tracking-wider">
                      {ev.tag}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#777777]">
                      <Clock className="w-3 h-3 text-[#DF711B]" />
                      <span>{ev.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#181818] text-white p-2 text-center shrink-0 w-14 border border-[#181818]">
                      <span className="block text-[10px] font-mono uppercase text-amber-300">
                        {ev.date.split(' ')[0]}
                      </span>
                      <span className="block font-display font-black text-lg leading-tight">
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

                  <p className="text-xs text-[#555555] leading-relaxed line-clamp-2 font-normal">
                    {ev.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-[#777777]">{ev.date}</span>
                  <span className="text-xs font-bold text-[#DF711B]">Official Event ›</span>
                </div>
              </div>
            ))}
          </div>
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
