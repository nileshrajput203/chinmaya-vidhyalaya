import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  X,
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const TOTAL_PAGES = 96;

// Generate all page paths
const generatePages = () =>
  Array.from({ length: TOTAL_PAGES }, (_, i) => ({
    index: i,
    pageNum: i + 1,
    src: `/images/diary_pages/page_${String(i + 1).padStart(3, '0')}.webp`,
  }));

const PAGES = generatePages();

interface DiaryPageViewerProps {
  initialPage?: number;
  className?: string;
}

export const DiaryPageViewer: React.FC<DiaryPageViewerProps> = ({
  initialPage = 1,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const [isImageLoading, setIsImageLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const page = PAGES[currentPage - 1];

  const goToPage = useCallback(
    (pageNum: number) => {
      if (pageNum < 1 || pageNum > TOTAL_PAGES) return;
      setDirection(pageNum > currentPage ? 1 : -1);
      setCurrentPage(pageNum);
      setIsImageLoading(true);
      setShowGrid(false);
    },
    [currentPage]
  );

  const goNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES) goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goPrev = useCallback(() => {
    if (currentPage > 1) goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goFirst = useCallback(() => goToPage(1), [goToPage]);
  const goLast = useCallback(() => goToPage(TOTAL_PAGES), [goToPage]);

  const handleZoomIn = () => setZoomLevel((p) => Math.min(p + 25, 300));
  const handleZoomOut = () => setZoomLevel((p) => Math.max(p - 25, 50));
  const resetZoom = () => setZoomLevel(100);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showGrid) {
        if (e.key === 'Escape') setShowGrid(false);
        return;
      }
      if (isFullscreen && e.key === 'Escape') {
        setIsFullscreen(false);
        return;
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          goFirst();
          break;
        case 'End':
          e.preventDefault();
          goLast();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          resetZoom();
          break;
        case 'g':
          setShowGrid((s) => !s);
          break;
        case 'f':
          setIsFullscreen((s) => !s);
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, goFirst, goLast, showGrid, isFullscreen]);

  // Scroll grid to current page when opening
  useEffect(() => {
    if (showGrid && gridRef.current) {
      const el = gridRef.current.querySelector(`[data-page="${currentPage}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showGrid, currentPage]);

  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  // Progress bar percentage
  const progressPct = ((currentPage - 1) / (TOTAL_PAGES - 1)) * 100;

  // Viewer content (shared between normal and fullscreen modes)
  const viewerContent = (
    <div className="flex flex-col h-full">
      {/* TOP TOOLBAR */}
      <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 bg-white/95 backdrop-blur-sm border-b border-slate-200 shrink-0 z-10">
        {/* Left: Page info */}
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-[#DF711B] shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
            Page{' '}
            <span className="text-[#DF711B] font-mono">{currentPage}</span>
            <span className="text-slate-400 font-normal"> of </span>
            <span className="font-mono">{TOTAL_PAGES}</span>
          </span>
        </div>

        {/* Center: Quick page jump */}
        <div className="hidden sm:flex items-center gap-1.5">
          <label className="text-[10px] text-slate-500 font-mono uppercase">Go to:</label>
          <input
            type="number"
            min={1}
            max={TOTAL_PAGES}
            value={currentPage}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (val >= 1 && val <= TOTAL_PAGES) goToPage(val);
            }}
            className="w-14 px-2 py-1 text-xs font-mono text-center border border-slate-200 rounded-lg focus:border-[#DF711B] focus:outline-none focus:ring-1 focus:ring-[#DF711B]/30 bg-white"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowGrid((s) => !s)}
            className={`p-1.5 rounded-lg transition-all text-xs ${
              showGrid
                ? 'bg-[#DF711B] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title="Toggle Grid View (G)"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-0.5 mx-1 p-0.5 bg-slate-50 border border-slate-200 rounded-lg">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className="p-1 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-all"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-500 px-1 min-w-[32px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 300}
              className="p-1 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-all"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen((s) => !s)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all ml-1"
              title="Close Fullscreen (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-0.5 bg-slate-100 shrink-0 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-[#DF711B] to-[#E8943A] rounded-r-full"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          {showGrid ? (
            /* ===== THUMBNAIL GRID VIEW ===== */
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              ref={gridRef}
              className="absolute inset-0 overflow-y-auto p-3 sm:p-5 bg-[#F8F6F1]"
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                {PAGES.map((p) => (
                  <button
                    key={p.pageNum}
                    data-page={p.pageNum}
                    onClick={() => goToPage(p.pageNum)}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-[3/4] ${
                      p.pageNum === currentPage
                        ? 'border-[#DF711B] ring-2 ring-[#DF711B]/30 shadow-lg scale-[1.02]'
                        : 'border-slate-200 hover:border-[#DF711B]/60 hover:shadow-md'
                    }`}
                  >
                    <img
                      src={p.src}
                      alt={`Page ${p.pageNum}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Page number overlay */}
                    <div
                      className={`absolute bottom-0 inset-x-0 py-1 text-center text-[10px] font-mono font-bold ${
                        p.pageNum === currentPage
                          ? 'bg-[#DF711B] text-white'
                          : 'bg-black/50 text-white/90 group-hover:bg-[#DF711B]/80'
                      }`}
                    >
                      {p.pageNum}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ===== SINGLE PAGE VIEW ===== */
            <motion.div
              key={`page-${currentPage}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`absolute inset-0 flex items-center justify-center p-3 sm:p-5 bg-[#F4F1EA]/60 ${
                zoomLevel > 100 ? 'overflow-auto' : 'overflow-hidden'
              }`}
            >
              <div
                className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${
                  zoomLevel === 100 ? 'w-full h-full' : 'm-auto'
                }`}
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'center',
                }}
              >
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-3 border-[#DF711B] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-slate-500 font-mono">Loading page {currentPage}...</span>
                    </div>
                  </div>
                )}
                <img
                  src={page.src}
                  alt={`Academic Calendar - Page ${currentPage}`}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-slate-200/80 select-none block"
                  onLoad={() => setIsImageLoading(false)}
                  onError={(e) => {
                    setIsImageLoading(false);
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '0.3';
                  }}
                  draggable={false}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVIGATION ARROWS (only in single page view) */}
        {!showGrid && (
          <>
            {currentPage > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#DF711B] transition-all hover:scale-110 active:scale-95"
                title="Previous Page (←)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
            {currentPage < TOTAL_PAGES && (
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#DF711B] transition-all hover:scale-110 active:scale-95"
                title="Next Page (→)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </>
        )}
      </div>

      {/* BOTTOM PAGINATION BAR */}
      {!showGrid && (
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 bg-white/95 backdrop-blur-sm border-t border-slate-200 shrink-0">
          {/* First / Prev */}
          <div className="flex items-center gap-1">
            <button
              onClick={goFirst}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#DF711B] hover:bg-orange-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="First Page (Home)"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#DF711B] hover:bg-orange-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Previous Page (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Page dots / quick jump */}
          <div className="flex items-center gap-0.5 overflow-hidden max-w-[60vw]">
            {(() => {
              // Show a window of page numbers around currentPage
              const windowSize = 7;
              let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
              let end = Math.min(TOTAL_PAGES, start + windowSize - 1);
              if (end - start < windowSize - 1) {
                start = Math.max(1, end - windowSize + 1);
              }
              const pages = [];
              if (start > 1) {
                pages.push(
                  <button
                    key="start-1"
                    onClick={goFirst}
                    className="w-6 h-6 rounded-md text-[10px] font-mono text-slate-400 hover:text-[#DF711B] hover:bg-orange-50 transition-all"
                  >
                    1
                  </button>
                );
                if (start > 2) {
                  pages.push(
                    <span key="dots-start" className="text-[10px] text-slate-300 px-0.5">
                      …
                    </span>
                  );
                }
              }
              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`w-6 h-6 rounded-md text-[10px] font-mono font-bold transition-all ${
                      i === currentPage
                        ? 'bg-[#DF711B] text-white shadow-sm scale-110'
                        : 'text-slate-500 hover:text-[#DF711B] hover:bg-orange-50'
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              if (end < TOTAL_PAGES) {
                if (end < TOTAL_PAGES - 1) {
                  pages.push(
                    <span key="dots-end" className="text-[10px] text-slate-300 px-0.5">
                      …
                    </span>
                  );
                }
                pages.push(
                  <button
                    key={`end-${TOTAL_PAGES}`}
                    onClick={goLast}
                    className="w-6 h-6 rounded-md text-[10px] font-mono text-slate-400 hover:text-[#DF711B] hover:bg-orange-50 transition-all"
                  >
                    {TOTAL_PAGES}
                  </button>
                );
              }
              return pages;
            })()}
          </div>

          {/* Next / Last */}
          <div className="flex items-center gap-1">
            <button
              onClick={goNext}
              disabled={currentPage === TOTAL_PAGES}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#DF711B] hover:bg-orange-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Next Page (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goLast}
              disabled={currentPage === TOTAL_PAGES}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#DF711B] hover:bg-orange-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Last Page (End)"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* KEYBOARD HINTS (subtle) */}
      <div className="hidden lg:flex items-center justify-center gap-4 px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[9px] font-mono text-slate-400 shrink-0">
        <span>← → Navigate</span>
        <span>G Grid</span>
        <span>F Fullscreen</span>
        <span>+/- Zoom</span>
        <span>Home/End First/Last</span>
      </div>
    </div>
  );

  return (
    <>
      {/* NORMAL INLINE VIEWER */}
      <div
        ref={containerRef}
        className={`relative bg-white rounded-2xl overflow-hidden ${isFullscreen ? 'invisible h-0' : ''} ${className}`}
        style={{ minHeight: isFullscreen ? 0 : '580px', height: isFullscreen ? 0 : '82vh', maxHeight: isFullscreen ? 0 : '90vh' }}
      >
        {!isFullscreen && viewerContent}
      </div>

      {/* FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {viewerContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DiaryPageViewer;
