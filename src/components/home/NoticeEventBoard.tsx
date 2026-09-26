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
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'academic'>('notices');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  
  const upcomingEvents = [
    {
      id: 'ev-1',
      title: 'Pujya Gurudev Jayanti & Annual Balvihar Assembly',
      date: 'May 08, 2026',
      month: 'May 2026',
      time: '08:30 AM IST',
      venue: 'School Main Prayer Auditorium',
      tag: 'Spiritual Heritage',
      desc: 'Reverent morning assembly, Paduka Pooja, and Chinmaya Yuva Kendra student presentations.'
    },
    {
      id: 'ev-1b',
      title: 'Faculty Development & CVP Value Orientation Workshop',
      date: 'May 22, 2026',
      month: 'May 2026',
      time: '09:30 AM IST',
      venue: 'AV Seminar Hall',
      tag: 'Academic Rigour',
      desc: 'Annual pedagogical training on value-integrated lesson plans and experiential learning modules.'
    },
    {
      id: 'ev-2a',
      title: 'School Reopening & Commencement of Academic Session 2026-27',
      date: 'June 15, 2026',
      month: 'June 2026',
      time: '07:30 AM IST',
      venue: 'Central Assembly Ground',
      tag: 'Academic Calendar',
      desc: 'Welcoming students from Nursery to Class XII across Arts, Commerce, and Science streams.'
    },
    {
      id: 'ev-2',
      title: 'Annual Inter-House Gita Chanting Competition',
      date: 'June 20, 2026',
      month: 'June 2026',
      time: '10:00 AM IST',
      venue: 'Sanskrit & Value Education Wing',
      tag: 'Vedic Arts',
      desc: 'Recitation of Srimad Bhagavad Gita Chapter 12 by junior and senior house representatives.'
    },
    {
      id: 'ev-2c',
      title: 'International Day of Yoga Demonstration & Mass Asanas',
      date: 'June 21, 2026',
      month: 'June 2026',
      time: '07:00 AM IST',
      venue: 'School Sports Ground',
      tag: 'Physical Fitness',
      desc: 'Synchronized Surya Namaskar, Pranayama sessions, and holistic well-being discourses.'
    },
    {
      id: 'ev-3',
      title: 'Monsoon Tree Plantation & Jal Pakhwada Rally',
      date: 'July 15, 2026',
      month: 'July 2026',
      time: '07:45 AM IST',
      venue: 'Campus Green Belt & Boisar Area',
      tag: 'Civic Responsibility',
      desc: 'Eco-club initiative planting native saplings and student rallies on rainwater preservation.'
    },
    {
      id: 'ev-3b',
      title: 'Guru Purnima Celebrations & Paduka Vandana',
      date: 'July 29, 2026',
      month: 'July 2026',
      time: '08:30 AM IST',
      venue: 'School Prayer Auditorium',
      tag: 'Spiritual Heritage',
      desc: 'Traditional tributes to teachers and spiritual masters with devotional Stotram chanting.'
    },
    {
      id: 'ev-4a',
      title: '80th Independence Day Flag Hoisting & Patriotic Cultural Assembly',
      date: 'August 15, 2026',
      month: 'August 2026',
      time: '08:00 AM IST',
      venue: 'Central Assembly Quadrangle',
      tag: 'Patriotic Zeal',
      desc: 'Ceremonial parade, national anthem, patriotic dance-drama, and recognition of student achievers.'
    },
    {
      id: 'ev-4',
      title: 'Science & Analytical STEM Exhibition 2026',
      date: 'August 22, 2026',
      month: 'August 2026',
      time: '09:00 AM IST',
      venue: 'Physics, Chemistry, Biology & IT Laboratories',
      tag: 'Scholastic Discovery',
      desc: 'Live working models, robotics showcases, and chemical analytical exhibits presented by Classes VI to XII.'
    },
    {
      id: 'ev-5a',
      title: 'Teachers\' Day Celebrations (Guru Vandana)',
      date: 'September 05, 2026',
      month: 'September 2026',
      time: '09:30 AM IST',
      venue: 'Main Auditorium',
      tag: 'Teacher Reverence',
      desc: 'Senior students honour faculty members with cultural skits, mementos, and expression of gratitude.'
    },
    {
      id: 'ev-5b',
      title: 'Periodic Assessment - I (Classes I to XII)',
      date: 'September 18, 2026',
      month: 'September 2026',
      time: '08:00 AM IST',
      venue: 'Examination Halls',
      tag: 'Assessments',
      desc: 'First comprehensive periodic evaluation for foundational, middle, and senior secondary stages.'
    }
  ];

  const availableMonths = ['all', 'May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026'];
  const filteredEvents = selectedMonth === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(ev => ev.month === selectedMonth);

  return (
    <section className="py-12 lg:py-16 bg-[#F3EFE6] text-[#181C20] relative overflow-hidden font-sans">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#D5CEC2]">
          <button
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border-b-2 ${
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
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border-b-2 ${
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
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border-b-2 ${
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
                        : 'bg-[#F3EFE6] text-[#555555]'
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

                <div className="pt-2.5 border-t border-[#F3EFE6] flex items-center justify-between">
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

                <div className="pt-2 border-t border-[#F3EFE6] flex items-center justify-between text-xs">
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
                    className="flex items-center justify-between p-2 bg-[#FAF8F5] border border-[#E7E2D8] text-xs hover:border-[#DF711B] hover:text-[#DF711B] transition-colors"
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
                <a
                  href="/images/academic-calendar.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 bg-[#181818] text-white text-xs font-bold hover:bg-[#DF711B] transition-colors"
                >
                  <span>Download School Calendar 2026-27</span>
                  <Download className="w-4 h-4 text-[#FFB740]" />
                </a>
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
