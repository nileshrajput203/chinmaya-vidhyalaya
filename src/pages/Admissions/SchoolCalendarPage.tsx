import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Calendar as CalendarIcon, 
  PhoneCall, 
  Mail, 
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { BadgePill } from '../../components/ui/badge-pill';
import { DiaryPageViewer } from '@/components/rareui/DiaryPageViewer';

export const SchoolCalendarPage: React.FC = () => {

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
                Official calendar showing working days, assessment cycles, vacation windows, and cultural observances. Browse all 96 pages of the official Chinmaya Vidyalaya School Diary and Almanac directly in your browser.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">

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

        {/* INTERACTIVE VIEWER CONTAINER (Official School Diary & Almanac) */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-card overflow-hidden">
          
          {/* Controls Bar */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            
            {/* Pages Information */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#DF711B] text-white shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>Browse All Pages</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
                  96
                </span>
              </span>
            </div>

            {/* Context Navigation Help */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-[#DF711B]" />
              <span className="hidden sm:inline">Use arrows or click to navigate all 96 pages</span>
            </div>
          </div>

          {/* Display Area: Pages Browser */}
          <DiaryPageViewer />
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



    </div>
  );
};
