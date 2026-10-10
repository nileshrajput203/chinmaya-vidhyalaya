import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Bell, Download, Search, Sparkles, MapPin } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { contentService } from '../services/contentService';
import { NewsArticle, Notice } from '../types/news';

export const NewsListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'circulars' | 'events' | 'academic'>(
    searchParams.get('filter') === 'events' ? 'events' : 'all'
  );

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'events' || filter === 'circulars' || filter === 'academic' || filter === 'all') {
      setSelectedFilter(filter);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [newsData, noticeData] = await Promise.all([
        contentService.getLatestNews(),
        contentService.getNotices()
      ]);
      setNews(newsData);
      setNotices(noticeData);
      setLoading(false);
    }
    loadData();
  }, []);

  const upcomingEvents = [
    {
      id: 'ev-oct-1',
      title: 'Inter-House Fancy Dress & Declamation Competition',
      date: 'October 17, 2026',
      time: '09:00 AM IST',
      venue: 'Primary Wing & AV Seminar Hall',
      tag: 'CCA Cultural',
      summary: 'Annual CCA presentation featuring Ramayana character dramatization for junior classes and oratorical declamation for seniors.'
    },
    {
      id: 'ev-oct-3',
      title: 'Periodic Assessment - II & Term Evaluations (Classes I to XII)',
      date: 'October 26, 2026',
      time: '08:00 AM IST',
      venue: 'Examination Halls',
      tag: 'Assessments',
      summary: 'Commencement of Second Periodical Assessment for Std X & XII and Evaluation-2 across Primary and Secondary wings.'
    },
    {
      id: 'ev-oct-4',
      title: 'Annual Inter-House Gita Chanting Competition (Std I to XII)',
      date: 'October 31, 2026',
      time: '09:30 AM IST',
      venue: 'Sanskrit & Value Education Wing',
      tag: 'Vedic Heritage',
      summary: 'Comprehensive inter-house recitation and spiritual memorization competition covering designated verses from Srimad Bhagavad Gita.'
    },
    {
      id: 'ev-nov-1',
      title: 'Diwali Vacation Break & Deepotsav Celebrations',
      date: 'November 05, 2026',
      time: '10:00 AM IST',
      venue: 'School Campus & Prayer Hall',
      tag: 'Vacation & Festival',
      summary: 'Campus Deepotsav lamp lighting ceremony; Diwali holiday break commences for all classes (School reopens on November 20, 2026).'
    },
    {
      id: 'ev-nov-4',
      title: 'Periodic Assessment - II (Classes III to IX)',
      date: 'November 25, 2026',
      time: '08:00 AM IST',
      venue: 'Examination Halls',
      tag: 'Assessments',
      summary: 'Second periodical assessment series for students of Standards III to IX evaluating mid-session scholastic progress.'
    },
    {
      id: 'ev-dec-1',
      title: 'Inter-House English Elocution Competition (Std I to XII)',
      date: 'December 05, 2026',
      time: '09:30 AM IST',
      venue: 'AV Seminar Hall',
      tag: 'Literary Arts',
      summary: 'Student orators demonstrate rhetorical clarity, persuasive speaking, and articulate presentation on contemporary themes.'
    },
    {
      id: 'ev-dec-2',
      title: 'Gita Jayanti, Tapovan Jayanti & Chinmaya Samarpan Diwas',
      date: 'December 19, 2026',
      time: '08:30 AM IST',
      venue: 'School Main Prayer Auditorium',
      tag: 'Spiritual Heritage',
      summary: 'Special Paduka pooja, Sanskrit Shloka recitation, monoact, and commemorative tributes honoring Param Pujya Swami Tapovan Maharaj.'
    },
    {
      id: 'ev-jan-1',
      title: 'Model Pre-Board Examinations & Unit Test - II',
      date: 'January 03, 2027',
      time: '08:00 AM IST',
      venue: 'Senior Wing Examination Halls',
      tag: 'Assessments',
      summary: 'Rigorous model pre-board tests for CBSE Board examinees (Std X & XII) and Unit Test 2 for Standard XI.'
    },
    {
      id: 'ev-jan-3',
      title: '78th Republic Day Ceremonial Parade & Cultural Pageant',
      date: 'January 26, 2027',
      time: '08:00 AM IST',
      venue: 'Central Sports Ground',
      tag: 'Patriotic Zeal',
      summary: 'National Tri-colour flag unfurling, NCC troop march past, patriotic brass band display, and felicitation of student achievers.'
    },
    {
      id: 'ev-mar-2',
      title: 'Annual Term-End Examinations & Evaluation - III',
      date: 'March 15, 2027',
      time: '08:00 AM IST',
      venue: 'All Examination Wings',
      tag: 'Assessments',
      summary: 'Final comprehensive annual academic assessments for Nursery through Standard IX & XI for the 2026-27 session.'
    }
  ];

  // Filtered lists based on search and tab
  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = upcomingEvents.filter(ev =>
    ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ev.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-[#181C20] pb-24 font-sans">
      <Breadcrumb items={[{ label: "Notice Board & Events" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Controls Bar: Search & Filter Tabs */}
        <div className="bg-white border border-[#E7E2D8] p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                placeholder="Search circulars or events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
              {[
                { id: 'all', label: 'All Dispatches' },
                { id: 'circulars', label: 'Circulars & Notices' },
                { id: 'events', label: 'Upcoming Events' },
                { id: 'academic', label: 'Academic & News' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wider transition-all border ${
                    selectedFilter === tab.id
                      ? 'bg-[#181818] text-white border-[#181818] shadow-sm'
                      : 'bg-white border-[#D5CEC2] text-[#555555] hover:border-[#DF711B] hover:text-[#DF711B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-20 text-[#777777] text-xs font-mono">
            Loading official notice board records...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Main Feed (Circulars + Events) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Circulars Section */}
              {(selectedFilter === 'all' || selectedFilter === 'circulars') && filteredNotices.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D5CEC2] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#DF711B]" />
                      <h3 className="font-display font-bold text-base text-[#181818] uppercase tracking-tight">
                        Active Notices & Official Circulars
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#777777]">{filteredNotices.length} active</span>
                  </div>

                  <div className="space-y-3">
                    {filteredNotices.map((notice) => (
                      <article 
                        key={notice.id}
                        className="bg-white border border-[#E7E2D8] p-5 hover:border-[#DF711B] transition-all shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 ${
                              notice.isImportant 
                                ? 'bg-[#FFF0E6] text-[#DF711B] border border-[#DF711B]/30' 
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {notice.category}
                            </span>
                            <span className="text-[11px] font-mono text-[#777777] flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#DF711B]" />
                              {notice.date}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-base text-[#181818] leading-snug">
                            {notice.title}
                          </h4>

                          <p className="text-xs text-[#555555] leading-relaxed font-normal">
                            {notice.summary}
                          </p>
                        </div>

                        {notice.fileUrl && (
                          <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                            <a
                              href={notice.fileUrl}
                              download
                              className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3.5 py-2 bg-[#181818] hover:bg-[#DF711B] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                            >
                              <Download className="w-3.5 h-3.5 text-[#FFB740]" />
                              <span>Download PDF</span>
                            </a>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {selectedFilter === 'circulars' && filteredNotices.length === 0 && (
                <div className="text-center py-12 bg-white border border-[#E7E2D8] p-8 text-slate-500 text-xs font-mono">
                  No active circulars at this moment. New circulars will be published soon.
                </div>
              )}

              {/* Upcoming Events Section */}
              {(selectedFilter === 'all' || selectedFilter === 'events') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D5CEC2] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#DF711B]" />
                      <h3 className="font-display font-bold text-base text-[#181818] uppercase tracking-tight">
                        Upcoming Celebrations & Academic Events
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#777777]">{filteredEvents.length} scheduled</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredEvents.map((ev) => (
                      <div 
                        key={ev.id}
                        className="bg-white border border-[#E7E2D8] p-5 space-y-3 hover:border-[#DF711B] transition-all shadow-xs flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold text-[#DF711B] bg-[#FFF0E6] border border-[#DF711B]/30 px-2 py-0.5 uppercase tracking-wider">
                              {ev.tag}
                            </span>
                            <span className="text-[10px] font-mono text-[#777777]">{ev.time}</span>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="bg-[#181818] text-white p-2 text-center shrink-0 w-14">
                              <span className="block text-[10px] font-mono uppercase text-amber-300">
                                {ev.date.split(' ')[0]}
                              </span>
                              <span className="block font-display font-black text-lg leading-tight">
                                {ev.date.split(' ')[1].replace(',', '')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-sm text-[#181818] leading-tight">
                                {ev.title}
                              </h4>
                              <div className="flex items-center gap-1 text-[10px] text-[#777777] font-mono mt-1">
                                <MapPin className="w-3 h-3 text-[#DF711B]" />
                                <span>{ev.venue}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-[#555555] leading-relaxed font-normal">
                            {ev.summary}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 text-xs font-mono text-[#777777] flex items-center justify-between gap-2">
                          <span className="truncate">{ev.date}</span>
                          <a
                            href={(() => {
                              const title = encodeURIComponent(`Chinmaya Vidyalaya: ${ev.title}`);
                              const details = encodeURIComponent(`${ev.summary}\n\nVenue: ${ev.venue}\nChinmaya Vidyalaya Tarapur (CBSE No. 1130095)`);
                              const location = encodeURIComponent(`${ev.venue}, Chinmaya Vidyalaya Tarapur, Boisar, Maharashtra 401501`);
                              return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
                            })()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF3E8] hover:bg-[#DF711B] text-[#DF711B] hover:text-white border border-[#DF711B]/30 rounded-lg text-[11px] font-bold transition-all shrink-0"
                            title="Add event to your Google Calendar"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Add to Google Calendar</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Campus News & Achievements */}
              {(selectedFilter === 'all' || selectedFilter === 'academic') && filteredNews.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D5CEC2] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#DF711B]" />
                      <h3 className="font-display font-bold text-base text-[#181818] uppercase tracking-tight">
                        Institutional Milestones & Honors
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#777777]">{filteredNews.length} articles</span>
                  </div>

                  <div className="space-y-4">
                    {filteredNews.map((item) => (
                      <article 
                        key={item.id}
                        className="bg-white border border-[#E7E2D8] p-5 hover:border-[#DF711B] transition-all shadow-xs space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-[#777777]">
                          <span className="font-bold text-[#DF711B] uppercase">{item.category}</span>
                          <span>{item.date}</span>
                        </div>

                        <h4 className="font-display font-bold text-base text-[#181818] leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-xs text-[#555555] leading-relaxed font-normal">
                          {item.content}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {selectedFilter === 'academic' && filteredNews.length === 0 && (
                <div className="text-center py-12 bg-white border border-[#E7E2D8] p-8 text-slate-500 text-xs font-mono">
                  No active news dispatches at this moment. New dispatches will be published soon.
                </div>
              )}

            </div>

            {/* Right 4 Cols: Quick Academic Shortcuts */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* School Calendar Download Box */}
              <div className="bg-[#181818] text-white p-6 border border-[#181818] space-y-4 shadow-md">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">
                    School Academic Calendar
                  </h4>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Download the comprehensive CBSE annual planner with examination schedules, holiday lists, and house activity weeks.
                </p>
                <Link
                  to="/admissions/calendar"
                  className="inline-flex items-center justify-between w-full p-2.5 bg-[#DF711B] hover:bg-[#c45b0e] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                >
                  <span>View Academic Calendar</span>
                  <Calendar className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

          </div>
        )}

      </div>
    </div>
  );
};
