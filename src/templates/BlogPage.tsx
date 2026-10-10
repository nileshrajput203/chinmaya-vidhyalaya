import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  BookOpen, Search, Calendar, Clock, ArrowRight, 
  Tag, Share2, Check, X, Bookmark, Quote, 
  ThumbsUp, Lightbulb
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost, BlogCategoryFilter } from '../types/blog';
import { useToast } from '../context/ToastContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showSuccess } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryFilter>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  // Dynamically derive available categories from blog posts
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map((p) => p.category).filter(Boolean)));
    return cats.length > 1 ? ['All', ...cats] : [];
  }, []);

  // Sync category or slug from URL query
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    const postSlug = searchParams.get('post');
    if (postSlug) {
      const found = BLOG_POSTS.find((p) => p.slug === postSlug);
      if (found) {
        setActiveArticle(found);
      }
    }
  }, [searchParams]);

  // Lock body/Lenis scroll when modal is open
  useBodyScrollLock(!!activeArticle);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
    setSearchParams((prev) => {
      prev.set('post', post.slug);
      return prev;
    });
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    setSearchParams((prev) => {
      prev.delete('post');
      return prev;
    });
  };

  const handleShare = (post: BlogPost) => {
    const url = `${window.location.origin}/blog?post=${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      showSuccess('Link Copied!', 'Article URL copied to your clipboard.');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Blog & Articles' }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* ====================================================
            CONTROLS: SEARCH & CATEGORY PILLS (Only shown if posts exist)
           ==================================================== */}
        {BLOG_POSTS.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2D8] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, author, or tags..."
                  className="w-full pl-11 pr-10 py-3 bg-white border border-[#E7E2D8] focus:border-[#DF711B] rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Results count indicator */}
              <div className="text-xs font-mono text-slate-500 whitespace-nowrap self-end md:self-center">
                Showing <span className="font-bold text-[#0B1E34]">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'Article' : 'Articles'}
              </div>
            </div>

            {/* Dynamic Category Filter Pills */}
            {availableCategories.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0B1E34] text-white border-[#0B1E34] shadow-md scale-105'
                          : 'bg-white text-slate-700 border-[#E7E2D8] hover:border-[#DF711B] hover:text-[#DF711B]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            POSTS GRID
           ==================================================== */}
        {BLOG_POSTS.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E7E2D8] space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF3E8] border border-[#FDE49C] text-[#DF711B] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-[#0B1E34]">
              Articles Coming Soon
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-normal">
              New articles, thought pieces, and school educational insights will be published here soon. Stay tuned!
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E2D8] space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-slate-800">
              No matching articles found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any articles matching your search query. Try clearing your filters or search for another keyword.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-full bg-[#DF711B] text-white text-xs font-bold uppercase tracking-wider shadow hover:bg-[#c85f12] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const isSaved = savedPosts.includes(post.id);
              const isLiked = likedPosts.includes(post.id);

              return (
                <article
                  key={post.id}
                  onClick={() => handleOpenArticle(post)}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#E7E2D8] shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Image Card Top */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Bookmark Action */}
                    <button
                      onClick={(e) => handleToggleSave(post.id, e)}
                      title={isSaved ? 'Remove from bookmarks' : 'Save article'}
                      className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isSaved
                          ? 'bg-[#DF711B] text-white'
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    {/* Date on Image bottom */}
                    <div className="absolute bottom-3 right-4 flex items-center text-[11px] font-mono text-slate-200">
                      <span>{post.publishDate}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-cinzel text-lg font-bold text-[#0B1E34] group-hover:text-[#DF711B] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white border border-[#E7E2D8] text-[10px] font-mono text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Footer Strip */}
                    <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#DF711B]/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0C1E34] truncate">
                            {post.author.name}
                          </p>
                          <p className="text-[10px] font-mono text-slate-500 truncate">
                            {post.author.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => handleToggleLike(post.id, e)}
                          title="Like article"
                          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                            isLiked
                              ? 'bg-amber-50 border-amber-300 text-[#DF711B]'
                              : 'bg-white border-slate-200 text-slate-500 hover:text-[#DF711B]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#DF711B] group-hover:translate-x-0.5 transition-transform flex items-center">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* ====================================================
          FULL ARTICLE READER MODAL
         ==================================================== */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-8 overscroll-contain"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onClick={handleCloseArticle}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 overscroll-contain select-text"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header Sticky Action Bar */}
            <div className="shrink-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FAF3E8] text-[#DF711B] text-[11px] font-mono font-bold uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  • {activeArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title="Share link"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Share'}</span>
                </button>

                <button
                  onClick={handleCloseArticle}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Content */}
            <div
              className="p-6 sm:p-10 lg:p-12 space-y-8 flex-1 overflow-y-auto overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Title & Subtitle */}
              <div className="space-y-4">
                <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E34] leading-tight">
                  {activeArticle.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {activeArticle.subtitle}
                </p>
              </div>

              {/* Author & Meta Row */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#DF711B]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1E34]">
                      {activeArticle.author.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {activeArticle.author.role}
                    </p>
                    {activeArticle.author.qualification && (
                      <p className="text-[10px] text-amber-700 font-mono">
                        {activeArticle.author.qualification}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#DF711B]" />
                    {activeArticle.publishDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#DF711B]" />
                    {activeArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden shadow-md max-h-[420px]">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quote Highlight Box */}
              {activeArticle.quote && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FFF7DF] to-[#FAF3E8] border-l-4 border-[#DF711B] flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#DF711B] shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="font-cinzel text-base sm:text-lg font-bold text-[#0B1E34] italic">
                      "{activeArticle.quote.text}"
                    </p>
                    <p className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                      — {activeArticle.quote.source}
                    </p>
                  </div>
                </div>
              )}

              {/* Paragraphs */}
              <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
                {activeArticle.content.map((para, index) => (
                  <p key={index} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#0B1E34] text-white space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Key Educational Takeaways</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                    {activeArticle.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags and Close Footer */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {activeArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleCloseArticle}
                  className="px-6 py-2.5 rounded-full bg-[#0B1E34] hover:bg-[#181C20] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Back to All Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
