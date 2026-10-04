import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  Calendar as CalendarIcon, 
  PhoneCall, 
  Mail, 
  Upload, 
  Info,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { BadgePill } from '../../components/ui/badge-pill';
import { Book3d } from '@/components/rareui/Book3d';

export const SchoolCalendarPage: React.FC = () => {
  // View mode switcher: 3D interactive diary vs 2D calendar sheet
  const [viewMode, setViewMode] = useState<'diary3d' | 'sheet'>('diary3d');

  // Zoom and fullscreen states
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Custom uploaded preview image state
  const [customImage, setCustomImage] = useState<string | null>(null);

  const defaultImage = '/images/academic-calendar.webp';
  const displayImage = customImage || defaultImage;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCustomImage(previewUrl);
      setViewMode('sheet');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#181C20] pb-24">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Admissions', href: '/admissions/guidelines' },
          { label: 'Academic Calendar 2026–27' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* Header Hero Banner */}
        <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <BadgePill label="Academic Year 2026–2027" variant="saffron" />
                <span className="text-xs font-mono font-semibold text-slate-500">
                  Term Schedule • Examinations • Vacations • Festivals
                </span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] tracking-tight">
                School Academic Calendar 2026–27
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Official calendar showing working days, assessment cycles, vacation windows, and cultural observances. Inspect the interactive 3D School Diary or review the high-resolution calendar sheet directly in your browser.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <label 
                htmlFor="cal-upload-input"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                title="Upload or preview a new calendar image"
              >
                <Upload className="w-4 h-4 text-[#DF711B]" />
                <span>Upload / Preview Image</span>
                <input
                  id="cal-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <a
                href="/images/Chinmaya ACADEMIC Calendar 2026-27.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#181C20] hover:bg-[#DF711B] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Save PDF Copy</span>
              </a>
            </div>
          </div>
        </div>

        {/* INTERACTIVE VIEWER CONTAINER (3D Diary vs 2D Sheet) */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-card overflow-hidden">
          
          {/* Controls Bar with Segmented View Switcher */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('diary3d')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'diary3d'
                    ? 'bg-[#DF711B] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>3D School Diary</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                  3D
                </span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('sheet')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'sheet'
                    ? 'bg-[#DF711B] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Calendar Sheet</span>
              </button>
            </div>

            {/* Context Information & Controls */}
            {viewMode === 'sheet' ? (
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono bg-white px-2.5 py-1 rounded-lg border border-[#E7E2D8] text-slate-500">
                  Zoom: {zoomLevel}%
                </span>
                <div className="flex items-center gap-1.5 bg-white border border-[#E7E2D8] p-1 rounded-xl shadow-2xs">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 50}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 disabled:opacity-30 transition-all"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2.5 py-1 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 250}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 disabled:opacity-30 transition-all"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-px bg-slate-200 mx-0.5" />
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-all"
                    title="View Fullscreen"
                    aria-label="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-[#DF711B]" />
                <span className="hidden sm:inline">Hover & move your cursor to rotate in 3D</span>
                <span className="font-mono text-[10px] bg-white border border-[#E7E2D8] px-2 py-0.5 rounded text-[#DF711B] font-bold">
                  Physics Tilt
                </span>
              </div>
            )}
          </div>

          {/* Display Area: 3D Book vs 2D Sheet */}
          {viewMode === 'diary3d' ? (
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-white min-h-[540px] overflow-hidden">
              <div className="text-center mb-2 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#DF711B] bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block">
                  Interactive 3D Hardcover Edition
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 pt-1">
                  Chinmaya Vidyalaya Official School Diary & Almanac
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Move your mouse over the diary to inspect spine bind, page edges, and foil reflections in real-time 3D.
                </p>
              </div>

              {/* RENDER THE 3D BOOK COMPONENT */}
              <div className="flex w-full items-center justify-center p-4">
                <Book3d />
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-8 bg-[#F4F1EA]/60 flex items-center justify-center overflow-auto min-h-[500px] max-h-[85vh]">
              <div 
                className="transition-transform duration-200 ease-out origin-top flex items-center justify-center shadow-lg rounded-2xl bg-white p-2 border border-[#E7E2D8]"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <img
                  src={displayImage}
                  alt="Chinmaya Vidyalaya Tarapur Official Academic Calendar 2026-2027"
                  className="max-w-full h-auto rounded-xl object-contain block select-none"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.endsWith('academic-calendar.png')) {
                      target.src = '/images/academic-calendar.png';
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Upload notice helper for admin/user */}
          <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>
                To permanently replace this calendar, update the image in <code>public/images/academic-calendar.webp</code> or <code>academic-calendar.png</code>.
              </span>
            </div>
            {customImage && (
              <button
                type="button"
                onClick={() => setCustomImage(null)}
                className="text-[#DF711B] hover:underline font-bold text-xs"
              >
                Revert to Default
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: Key Academic Milestones & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Key Term & Vacation Dates (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
            <div className="border-b border-[#E7E2D8] pb-4">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                Academic Year Breakdown
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#181C20] mt-1">
                Term Schedules & Major Breaks
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#E7E2D8] rounded-2xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <BookOpen className="w-4 h-4 text-[#DF711B]" />
                  <span>Scholastic Terms</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li><strong>Term I:</strong> April 1, 2026 to September 30, 2026</li>
                  <li><strong>Term II:</strong> October 1, 2026 to March 31, 2027</li>
                  <li><strong>Total Minimum Working Days:</strong> 220+ days as per CBSE norms.</li>
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#E7E2D8] rounded-2xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <CalendarIcon className="w-4 h-4 text-emerald-600" />
                  <span>Vacation Windows</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li><strong>Summer Break:</strong> May 1, 2026 – June 9, 2026</li>
                  <li><strong>Diwali Vacation:</strong> October 28, 2026 – November 10, 2026</li>
                  <li><strong>Winter Break:</strong> December 24, 2026 – January 2, 2027</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-[#DF711B]" />
                <span>Chinmaya Cultural Celebrations & Value Days</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                Key observances include Gurudev Swami Chinmayananda Jayanti (May 8), Mahasamadhi Day (August 3), Geeta Chanting Competitions (November), Annual Sports Day, and Chinmaya Vision Programme exhibition week.
              </p>
            </div>
          </div>

          {/* Academic Desk Help Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white border-2 border-[#DF711B]/40 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#DF711B]/15 text-[#DF711B] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                    Academic Office
                  </span>
                  <h3 className="font-cinzel text-lg font-extrabold text-[#181C20]">
                    Calendar & Exams Help
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Questions regarding school timings, examination dates, or holiday notices? Reach the academic coordinator.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <a
                href="tel:02525272370"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-[#E7E2D8] rounded-xl text-slate-800 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#DF711B]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Academic Desk</span>
                    <span className="font-bold">02525-272370 / 272371</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#DF711B]">Call Desk</span>
              </a>

              <a
                href="tel:9322054713"
                className="flex items-center justify-between p-3 bg-[#0A5C36]/10 hover:bg-[#0A5C36]/20 border border-[#0A5C36]/20 rounded-xl text-[#0A5C36] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#0A5C36]" />
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold block text-[#0A5C36]/80">Helpline Mobile</span>
                    <span className="font-bold">+91 9322054713</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0A5C36]">Connect</span>
              </a>

              <a
                href="mailto:cvtarapur@chinmayamission.com?subject=Academic%20Calendar%20Inquiry%202026-27"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-[#E7E2D8] rounded-xl text-slate-800 transition-all"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#DF711B] shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block font-mono">Official Email</span>
                    <span className="font-bold truncate block">cvtarapur@chinmayamission.com</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#DF711B] shrink-0">Email</span>
              </a>
            </div>

            <div className="p-3 bg-white border border-[#E7E2D8] rounded-xl text-xs space-y-1 text-slate-600">
              <span className="font-bold text-slate-800 block">School Office Working Hours:</span>
              <p className="text-[11px]">Monday to Friday: 8:00 AM – 3:30 PM</p>
              <p className="text-[11px]">Saturday: 8:00 AM – 1:00 PM</p>
            </div>

            <div className="pt-2 border-t border-[#E7E2D8]">
              <Link
                to="/admissions/fee-structure"
                className="w-full py-2.5 bg-[#181C20] hover:bg-[#DF711B] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-center"
              >
                <span>View Annual Fee Structure</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN MODAL */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/20 text-white">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-[#DF711B]" />
              <span className="font-bold text-sm sm:text-base">
                Chinmaya Vidyalaya Tarapur • Academic Calendar 2026–2027
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs"
              >
                Zoom Out -
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs"
              >
                Zoom In +
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-1.5 bg-[#DF711B] hover:bg-[#C45B0E] text-white rounded-lg text-xs font-bold ml-2 cursor-pointer transition-colors"
              >
                Close (ESC)
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <img
              src={displayImage}
              alt="Chinmaya Vidyalaya Academic Calendar 2026-2027 Fullscreen"
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            />
          </div>
        </div>
      )}

    </div>
  );
};
