import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  CheckCircle2, 
  CreditCard, 
  PhoneCall, 
  Mail, 
  Clock, 
  Upload, 
  Info,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { BadgePill } from '../../components/ui/badge-pill';

export const FeeStructurePage: React.FC = () => {
  // Image zoom and fullscreen state
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Custom uploaded image preview state (defaults to public/images/fees-structure.webp)
  const [customImage, setCustomImage] = useState<string | null>(null);

  const defaultImage = '/images/fees-structure.webp';
  const displayImage = customImage || defaultImage;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCustomImage(previewUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#181C20] pb-24">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Admissions', href: '/admissions/guidelines' },
          { label: 'Annual Fee Structure' },
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
                  Approved by School Managing Committee & PTA
                </span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] tracking-tight">
                Annual Fee Structure & Payment Guidelines
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Complete approved schedule of tuition, term fees, and activity charges from Pre-Primary through Senior Secondary (Std XII). View the high-resolution fee chart directly online without downloading.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <label 
                htmlFor="fee-upload-input"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                title="Upload or preview a new fee structure image"
              >
                <Upload className="w-4 h-4 text-[#DF711B]" />
                <span>Upload / Preview New Image</span>
                <input
                  id="fee-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <a
                href="/images/FEE STRUCTURE 26-27.pdf"
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

        {/* Notice Banner */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs text-emerald-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Transparent & Regulated Fee Structure:</strong> In strict compliance with Maharashtra Educational Institutions (Regulation of Fee) Act and CBSE Bye-Laws, all school fees are finalized in consultation with the Executive Committee of the Parent-Teacher Association (EPTA). No capitation fee is ever charged.
          </div>
        </div>

        {/* IMAGE VIEWER SECTION */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-card overflow-hidden">
          
          {/* Controls Bar */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#DF711B]" />
              <span className="text-xs font-bold text-[#181C20]">
                Official Fee Chart 2026–2027
              </span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#E7E2D8] text-slate-500">
                Zoom: {zoomLevel}%
              </span>
            </div>

            {/* Viewer Zoom Buttons */}
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

          {/* Interactive Document Image Container */}
          <div className="p-4 sm:p-8 bg-[#F4F1EA]/60 flex items-center justify-center overflow-auto min-h-[500px] max-h-[85vh]">
            <div 
              className="transition-transform duration-200 ease-out origin-top flex items-center justify-center shadow-lg rounded-2xl bg-white p-2 border border-[#E7E2D8]"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <img
                src={displayImage}
                alt="Chinmaya Vidyalaya Tarapur Annual Fee Structure 2026-2027"
                className="max-w-full h-auto rounded-xl object-contain block select-none"
                onError={(e) => {
                  // Fallback if webp fails to load
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('fees-structure.jpg')) {
                    target.src = '/images/fees-structure.jpg';
                  }
                }}
              />
            </div>
          </div>

          {/* Upload notice helper for admin/user */}
          <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>
                To permanently replace this fee chart, update the image in <code>public/images/fees-structure.webp</code>.
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

        {/* BOTTOM SECTION: Key Fee Policies & Accounts Help Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Policy Breakdown (8 Cols) - Orange Theme */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#DF711B] via-[#E27622] to-[#B85715] text-white border border-white/25 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-white/20 pb-4">
                <span className="text-xs font-mono font-bold text-amber-200 uppercase tracking-wider block">
                  Payment Guidelines & Schedule
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                  Installment Rules & Payment Modes
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white text-slate-800 rounded-2xl space-y-2 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Clock className="w-4 h-4 text-[#DF711B]" />
                    <span>Quarterly Installment Schedule</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600 text-[11.5px]">
                    <li><strong className="text-slate-900">Term I (Apr–Jun):</strong> Payable at admission / by April 15.</li>
                    <li><strong className="text-slate-900">Term II (Jul–Sep):</strong> Payable on or before July 15.</li>
                    <li><strong className="text-slate-900">Term III (Oct–Dec):</strong> Payable on or before October 15.</li>
                    <li><strong className="text-slate-900">Term IV (Jan–Mar):</strong> Payable on or before January 15.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white text-slate-800 rounded-2xl space-y-2 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CreditCard className="w-4 h-4 text-[#DF711B]" />
                    <span>Accepted Payment Channels</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600 text-[11.5px]">
                    <li><strong className="text-slate-900">Online Parent Portal:</strong> UPI, Net Banking, Cards via ERP.</li>
                    <li><strong className="text-slate-900">Bank Transfer / NEFT:</strong> Direct transfer to school account.</li>
                    <li><strong className="text-slate-900">Demand Draft / Cheque:</strong> To <em>"Chinmaya Vidyalaya Tarapur"</em>.</li>
                    <li><strong className="text-slate-900">Cash Payment:</strong> Accepted only at designated bank counter.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-white pt-2 border-t border-white/15">
              <h4 className="font-bold text-amber-100 text-sm">Important Fee Provisions:</h4>
              <ul className="space-y-2.5 list-none text-[12px] leading-relaxed text-white/95">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                  <span><strong className="text-amber-100">Late Surcharge:</strong> A nominal late payment fee of ₹10 per day is applicable after the 15th of the respective due month.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                  <span><strong className="text-amber-100">Sibling Concession:</strong> As per institutional norms, fee assistance is reviewed for eligible families with three or more enrolled wards.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                  <span><strong className="text-amber-100">RTE Free Seats:</strong> 25% seats in entry-level classes (Nursery / Std I) are allocated under Right to Education (RTE) free of tuition fees.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Accounts Help Desk Card (4 Cols) - Deep Navy Complementary Theme */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0B1E34] via-[#0F2744] to-[#162F52] text-white border border-[#28466E] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5 border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#DF711B]/25 text-[#DF711B] flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Accounts Office Desk
                    </span>
                    <h3 className="font-cinzel text-lg font-extrabold text-white">
                      Fee & Billing Inquiries
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1 font-sans">
                  Facing payment gateway issues or need duplicate fee receipts / tax exemption certificates? Contact the accounts desk.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <a
                  href="tel:02525272370"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-[#DF711B]" />
                    <div>
                      <span className="text-[10px] text-slate-300 block font-mono">Accounts Line</span>
                      <span className="font-bold text-white">02525-272370 / 272371</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-300">Call Desk</span>
                </a>

                <a
                  href="tel:9322054713"
                  className="flex items-center justify-between p-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-xl text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold block text-emerald-300">Helpline Mobile</span>
                      <span className="font-bold text-white">+91 9322054713</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300">Connect</span>
                </a>

                <a
                  href="mailto:cvtarapur@chinmayamission.com?subject=Fee%20Structure%20Query%202026-27"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl text-white transition-all"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#DF711B] shrink-0" />
                    <div className="truncate">
                      <span className="text-[10px] text-slate-300 block font-mono">Official Email</span>
                      <span className="font-bold truncate block text-white">cvtarapur@chinmayamission.com</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-300 shrink-0">Email</span>
                </a>
              </div>

              <div className="p-3.5 bg-white/10 border border-white/15 rounded-xl text-xs space-y-1 text-slate-200">
                <span className="font-bold text-amber-200 block text-xs">Fee Counter Hours:</span>
                <p className="text-[11px] text-slate-300">Monday to Friday: 9:00 AM – 1:00 PM</p>
                <p className="text-[11px] text-slate-300">Saturday: 9:00 AM – 12:00 Noon</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15">
              <Link
                to="/admissions/guidelines"
                className="w-full py-2.5 bg-[#DF711B] hover:bg-[#c96213] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <span>Proceed to Admission Guidelines</span>
                <span>→</span>
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
              <FileText className="w-5 h-5 text-[#DF711B]" />
              <span className="font-bold text-sm sm:text-base">
                Chinmaya Vidyalaya Tarapur • Annual Fee Structure 2026–2027
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
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold ml-2"
              >
                Close (ESC)
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <img
              src={displayImage}
              alt="Chinmaya Vidyalaya Annual Fee Structure 2026-2027 Fullscreen"
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            />
          </div>
        </div>
      )}

    </div>
  );
};
