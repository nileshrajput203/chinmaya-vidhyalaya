import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PhoneCall, 
  FileText, 
  Mail, 
  Download, 
  ShieldCheck, 
  Phone,
  FileCheck
} from 'lucide-react';

export const AdmissionGuidelinesShowcase: React.FC = () => {
  // Quick callback scheduler state for the "Book a Call" card
  const [callbackState, setCallbackState] = useState<{
    name: string;
    phone: string;
    grade: string;
    slot: string;
    isBooked: boolean;
  }>({
    name: '',
    phone: '',
    grade: 'Primary (Std I to V)',
    slot: 'Morning (9:00 AM – 12:00 PM)',
    isBooked: false,
  });

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackState.phone) {
      alert('Please enter your phone number so our admissions team can reach you.');
      return;
    }
    setCallbackState((prev) => ({ ...prev, isBooked: true }));
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* ====================================================
          PAGE HEADER
         ==================================================== */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DF711B] block">
          Academic Year 2026–2027 • CBSE Affiliation No. 1130058
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] tracking-tight">
          Enrollment & Admission Guidelines
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl">
          Official eligibility criteria, mandatory verification checklist, and registration guidelines for Boisar campus.
        </p>
      </div>

      {/* ====================================================
          1. EXACT TOP DESIGN: STATIC FORM (LEFT) + MANDATORY DOCUMENTS & DOWNLOADS (RIGHT)
         ==================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Static Form Placeholder */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full bg-white border-2 border-[#E7E2D8] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xs transition-all hover:shadow-md">
            <div className="w-full max-w-[340px] flex items-center justify-center py-4">
              <img
                src="/images/admission-form-placeholder.png"
                alt="Admission Registration Form Preview"
                className="w-full h-auto max-h-[460px] object-contain drop-shadow-sm select-none"
              />
            </div>
            <div className="mt-4 pt-3 border-t border-[#EFECE6] w-full flex items-center justify-between text-xs">
              <span className="font-mono text-slate-600 font-semibold flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#DF711B]" />
                <span>Admission Application Form</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#DF711B] border border-amber-200/60 font-mono text-[10px] font-bold uppercase">
                Official Hardcopy Format
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Mandatory Documents Card + Download Strip */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-4">
          {/* Card: Mandatory Documents */}
          <div className="bg-white border-2 border-emerald-500/25 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 hover:shadow-card transition-all">
            <div className="flex items-center gap-3 pb-3 border-b border-[#EFECE6]">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#181C20]">Mandatory Documents</h4>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">To Be Verified at Desk</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Birth Certificate:</strong> Original & self-attested municipal or Gram Panchayat copy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Transfer Certificate (TC):</strong> Original counter-signed TC from previous school.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Academic Progress Report:</strong> Authenticated mark sheet of the preceding standard.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Aadhaar Card:</strong> Photocopies of both student and parent Aadhaar identification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Photographs:</strong> 4 recent passport-size color photographs of the student.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Medical Fitness Certificate:</strong> Blood group report signed by a registered doctor.</span>
              </li>
            </ul>
          </div>

          {/* Downloadable Hardcopy Forms Strip */}
          <div className="bg-[#FAF3E8] border border-[#FDE49C] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                Official Printed Registration PDFs
              </span>
              <p className="text-xs text-slate-700 font-medium">
                Download printable hardcopy application forms:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/images/nursery.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0B1E34] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-mono font-semibold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#DF711B]" />
                <span>Nursery PDF</span>
              </a>
              <a
                href="/images/kg.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0B1E34] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-mono font-semibold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#DF711B]" />
                <span>KG (Jr/Sr) PDF</span>
              </a>
              <a
                href="/images/1to9.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0B1E34] hover:text-[#DF711B] border border-[#E7E2D8] rounded-xl text-xs font-mono font-semibold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#DF711B]" />
                <span>Std I–IX PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. SUPPORTING CRITERIA: AGE NORMS & ADMISSION PROCEDURE
         ==================================================== */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-[#E7E2D8] pb-4">
          <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block">
            Verification Norms & Transparent Process
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
            Eligibility Norms & Admission Procedure
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Age Norms & Eligibility */}
          <div className="bg-white border-2 border-emerald-500/25 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 hover:shadow-card transition-all">
            <div className="flex items-center gap-3 pb-3 border-b border-[#EFECE6]">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#181C20]">Age Eligibility Norms</h4>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">As of 31st December</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Nursery:</strong> Minimum 3 years of age as per Maharashtra RTE & NEP norms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Junior KG (LKG):</strong> Completed 4 years of age as of 31st December.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Senior KG (UKG):</strong> Completed 5 years of age as of 31st December.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Standard I (Class 1):</strong> Completed 6 years of age as mandated by NEP 2020.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Std II to IX:</strong> Admission based on diagnostic skill assessment and vacancy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Std XI & XII:</strong> Allocated via Class X board score (Science, Commerce, Arts).</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Admission Policy & Step-by-Step */}
          <div className="bg-white border-2 border-emerald-500/25 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 hover:shadow-card transition-all">
            <div className="flex items-center gap-3 pb-3 border-b border-[#EFECE6]">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#181C20]">Admission Procedure</h4>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">4-Step Transparent Path</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Step 1: Application:</strong> Download hardcopy PDF above or obtain form at school reception.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Step 2: Interactive Review:</strong> Friendly parent interaction; diagnostic check for Std I–IX.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Step 3: Verification:</strong> Physical document review at Saravali Boisar campus.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Step 4: Enrollment:</strong> Admission fee settlement and welcome student kit issuance.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Non-Discrimination:</strong> Open to all communities strictly based on merit and seats.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Medium of Instruction:</strong> English medium with deep grounding in Sanskrit & Hindi.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. IN CASE OF ISSUE / BOOK A CALL OPTION
         ==================================================== */}
      <div className="bg-gradient-to-br from-[#0B1D30] to-[#182C44] text-white rounded-3xl p-8 sm:p-10 border border-[#233B59] shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF711B]/20 border border-[#DF711B]/40 text-[#DF711B] text-xs font-mono font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>In Case of Any Doubt, Issue, or Inquiry</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
              Book an Admission Counselling Call
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Have questions regarding class vacancy, stream selection for Class XI, bus transport routes across Boisar & Tarapur, or document transfer? Schedule a dedicated telephone consultation with our senior academic coordinator.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <a
                href="tel:9322054713"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-amber-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#DF711B]" />
                <span>Call Directly: 9322054713</span>
              </a>
              <a
                href="mailto:cvtarapur@chinmayamission.com"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-amber-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#DF711B]" />
                <span>cvtarapur@chinmayamission.com</span>
              </a>
            </div>
          </div>

          {/* Quick Interactive Callback Form */}
          <div className="lg:col-span-5 bg-white text-[#181C20] rounded-2xl p-6 shadow-xl border border-white/20">
            {callbackState.isBooked ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#181C20]">
                  Call Request Registered!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you! Our admission counsellor will call you at <strong>{callbackState.phone}</strong> during your requested slot: <span className="font-mono text-[#DF711B]">{callbackState.slot}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setCallbackState({ ...callbackState, isBooked: false, phone: '' })}
                  className="mt-2 text-xs font-mono text-[#DF711B] font-bold hover:underline cursor-pointer"
                >
                  Book another request &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  Request Call Back
                </span>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={callbackState.name}
                    onChange={(e) => setCallbackState({ ...callbackState, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-[#E7E2D8] rounded-xl text-xs focus:outline-none focus:border-[#DF711B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={callbackState.phone}
                    onChange={(e) => setCallbackState({ ...callbackState, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 border border-[#E7E2D8] rounded-xl text-xs focus:outline-none focus:border-[#DF711B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Grade Seeking
                  </label>
                  <select
                    value={callbackState.grade}
                    onChange={(e) => setCallbackState({ ...callbackState, grade: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E2D8] rounded-xl text-xs bg-white focus:outline-none focus:border-[#DF711B]"
                  >
                    <option>Pre-Primary (Nursery, LKG, UKG)</option>
                    <option>Primary (Std I to V)</option>
                    <option>Middle (Std VI to VIII)</option>
                    <option>Secondary (Std IX & X)</option>
                    <option>Senior Secondary (XI & XII Science)</option>
                    <option>Senior Secondary (XI & XII Commerce)</option>
                    <option>Senior Secondary (XI & XII Arts)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={callbackState.slot}
                    onChange={(e) => setCallbackState({ ...callbackState, slot: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E2D8] rounded-xl text-xs bg-white focus:outline-none focus:border-[#DF711B]"
                  >
                    <option>Morning (9:00 AM – 12:00 PM)</option>
                    <option>Afternoon (1:00 PM – 3:30 PM)</option>
                    <option>Evening (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#DF711B] hover:bg-[#c96213] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Schedule Callback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
