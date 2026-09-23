import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Bell, Download, Search, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
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
      id: 'ev-1',
      title: 'Pujya Gurudev Jayanti & Annual Balvihar Assembly',
      date: 'May 08, 2025',
      time: '08:30 AM IST',
      venue: 'School Main Prayer Auditorium',
      tag: 'Spiritual Heritage',
      summary: 'Reverent morning assembly, Paduka Pooja, and Chinmaya Yuva Kendra student presentations.'
    },
    {
      id: 'ev-2',
      title: 'Annual Inter-House Gita Chanting Competition',
      date: 'June 20, 2025',
      time: '10:00 AM IST',
      venue: 'Sanskrit & Value Education Wing',
      tag: 'Vedic Arts',
      summary: 'Recitation of Srimad Bhagavad Gita Chapter 12 by junior and senior house representatives.'
    },
    {
      id: 'ev-3',
      title: 'Monsoon Tree Plantation & Jal Pakhwada Rally',
      date: 'July 15, 2025',
      time: '07:45 AM IST',
      venue: 'Campus Green Belt & MIDC Tarapur',
      tag: 'Civic Duty',
      summary: 'Eco-club initiative planting 250 native saplings and student street rallies on rainwater preservation.'
    },
    {
      id: 'ev-4',
      title: 'Science & Analytical STEM Exhibition 2025',
      date: 'August 22, 2025',
      time: '09:00 AM IST',
      venue: 'Central Physics & Chemistry Laboratories',
      tag: 'Academic Discovery',
      summary: 'Live working models, robotics showcases, and chemical analytical exhibits presented by Classes VI to X.'
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
    <div className="bg-[#FAF8F5] text-[#181C20] pb-24 font-sans">
      <PageHero 
        title="Notice Board & Events Hub" 
        subtitle="Official school dispatches, administrative circulars, examination schedules, and campus calendar." 
        badge="Live Notice Board" 
      />
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
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none transition-colors"
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
              {(selectedFilter === 'all' || selectedFilter === 'circulars') && (
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
                                : 'bg-[#F3EFE6] text-[#555555]'
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

                        <div className="pt-2 border-t border-[#F3EFE6] text-xs font-mono text-[#777777] flex items-center justify-between">
                          <span>{ev.date}</span>
                          <span className="text-[#DF711B] font-bold">School Calendar ›</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Campus News & Achievements */}
              {(selectedFilter === 'all' || selectedFilter === 'academic') && (
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
                <a
                  href="/images/academic-calendar.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between w-full p-2.5 bg-[#DF711B] hover:bg-[#c45b0e] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Download Calendar PDF</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Quick Downloads Card */}
              <div className="bg-white border border-[#D5CEC2] p-5 space-y-3 shadow-xs">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#181818] border-b border-[#E7E2D8] pb-2">
                  Essential Student Documents
                </h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'Evaluation Papers Std 1-5', href: '/downloads/evaluation-papers' },
                    { label: 'CBSE Sample Papers Std 1-10', href: '/downloads/sample-papers' },
                    { label: 'Admission Registration Forms', href: '/downloads/admissions' },
                    { label: 'Mandatory CBSE Disclosures', href: '/about/mandatory-information' },
                    { label: 'Transfer Certificates (TC)', href: '/about/transfer-certificates' },
                  ].map((doc, i) => (
                    <a
                      key={i}
                      href={doc.href}
                      className="flex items-center justify-between p-2 bg-[#FAF8F5] border border-[#E7E2D8] hover:border-[#DF711B] hover:text-[#DF711B] transition-colors"
                    >
                      <span className="font-medium text-[11px]">{doc.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#DF711B]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Administrative Assistance */}
              <div className="bg-[#FFF7DF] border border-[#DF711B]/40 p-5 space-y-2 text-xs text-[#181818]">
                <strong className="block font-mono uppercase tracking-wider text-[#DF711B] text-[10px]">
                  Administrative Office
                </strong>
                <p className="text-xs text-[#555555] leading-relaxed">
                  For verification of circulars or inquiries regarding student notices, please contact the administrative desk at:
                </p>
                <div className="font-mono text-xs text-[#181818] pt-1">
                  <div>Phone: <strong>02525-272044</strong></div>
                  <div>Email: <strong>chinmayatarapur@gmail.com</strong></div>
                </div>
              </div>

            </aside>

          </div>
        )}

      </div>
    </div>
  );
};
