import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Download } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { contentService } from '../services/contentService';
import { SCHOOL_IMAGES } from '../data/images';
import { NewsArticle, Notice } from '../types/news';

export const NewsListingPage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

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

  const featuredStory = news.length > 0 ? news[0] : null;
  const secondaryStories = news.length > 1 ? news.slice(1) : [];

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title="News & Campus Circulars" subtitle="Stay updated with academic announcements, house celebrations, and official circulars" badge="News & Events" />
      <Breadcrumb items={[{ label: "News & Events" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {loading ? (
          <div className="text-center py-20 text-[#4A5568] text-xs font-mono">Loading magazine features...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 8 Cols: Featured Story + Secondary Grid */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* FEATURED STORY CARD */}
              {featuredStory && (
                <article className="bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl space-y-6 shadow-card">
                  <div className="overflow-hidden rounded-2xl border border-[#E7E2D8]">
                    <img
                      src={SCHOOL_IMAGES.CULTURAL_EVENT}
                      alt={featuredStory.title}
                      className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs">
                      <span className="bg-[#0B1D30] text-white px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider text-[10px]">
                        Featured Bulletin
                      </span>
                      <span className="text-[#4A5568] flex items-center gap-1.5 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#D97745]" />
                        {featuredStory.date}
                      </span>
                    </div>

                    <h2 className="font-cinzel text-2xl md:text-3xl text-[#0B1D30] font-bold leading-tight hover:text-[#D97745] transition-colors">
                      {featuredStory.title}
                    </h2>

                    <p className="text-sm text-[#4A5568] leading-relaxed font-light">
                      {featuredStory.content}
                    </p>
                  </div>
                </article>
              )}

              {/* SECONDARY STORIES GRID */}
              <div className="space-y-6">
                <h3 className="font-cinzel font-bold text-[#0B1D30] text-xl border-b border-[#E7E2D8] pb-3 uppercase tracking-wider">
                  Recent Campus Updates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {secondaryStories.map((item) => (
                    <article key={item.id} className="bg-white border border-[#E7E2D8] p-6 rounded-3xl space-y-3 flex flex-col justify-between hover:border-[#0B1D30] transition-colors shadow-card">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#4A5568]">
                          <span className="font-bold text-[#D97745] uppercase">{item.category}</span>
                          <span>{item.date}</span>
                        </div>

                        <h4 className="font-cinzel font-bold text-[#0B1D30] text-base leading-snug line-clamp-2">
                          {item.title}
                        </h4>

                        <p className="text-xs text-[#4A5568] line-clamp-3 leading-relaxed font-light">
                          {item.content}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Official Circulars & Notices */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-[#F7F3EB] border border-[#E7E2D8] p-6 rounded-3xl space-y-6 shadow-card sticky top-24">
                <div className="flex items-center gap-2 border-b border-[#E7E2D8] pb-3">
                  <Bell className="w-5 h-5 text-[#D97745]" />
                  <h3 className="font-cinzel font-bold text-[#0B1D30] text-lg uppercase tracking-wider">Official Bulletin</h3>
                </div>

                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="p-4 bg-white border-l-4 border-[#D97745] rounded-r-2xl space-y-2 shadow-sm">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#4A5568]">
                        <span className="font-bold text-[#D97745] uppercase">{notice.category}</span>
                        <span>{notice.date}</span>
                      </div>
                      <h4 className="font-serif font-bold text-[#0B1D30] text-sm leading-snug">{notice.title}</h4>
                      <p className="text-xs text-[#4A5568] leading-relaxed font-light">{notice.summary}</p>
                      {notice.fileUrl && (
                        <a href={notice.fileUrl} download className="inline-flex items-center gap-1.5 text-xs text-[#0B1D30] font-bold hover:text-[#D97745] pt-1">
                          <Download className="w-3 h-3 text-[#D97745]" />
                          <span>Download Circular</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
};
