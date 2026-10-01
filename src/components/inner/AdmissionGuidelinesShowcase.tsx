import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PhoneCall, 
  FileText, 
  User, 
  Users, 
  Mail, 
  GraduationCap, 
  Download, 
  Send, 
  X, 
  Printer, 
  ShieldCheck, 
  Phone
} from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface DummyFormData {
  studentName: string;
  dob: string;
  gender: string;
  gradeSeeking: string;
  stream: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  primaryPhone: string;
  email: string;
  residentialAddress: string;
  previousSchool: string;
  previousBoard: string;
  confirmedGuidelines: boolean;
}

const INITIAL_FORM: DummyFormData = {
  studentName: '',
  dob: '',
  gender: 'Male',
  gradeSeeking: 'Nursery',
  stream: 'Science',
  bloodGroup: 'B+',
  fatherName: '',
  motherName: '',
  primaryPhone: '',
  email: '',
  residentialAddress: '',
  previousSchool: '',
  previousBoard: 'CBSE',
  confirmedGuidelines: false,
};

export const AdmissionGuidelinesShowcase: React.FC = () => {
  const [formData, setFormData] = useState<DummyFormData>(INITIAL_FORM);
  const [receiptData, setReceiptData] = useState<{
    appNo: string;
    submittedAt: string;
    data: DummyFormData;
  } | null>(null);

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

  // Lock scroll when confirmation slip is shown
  useBodyScrollLock(receiptData !== null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.primaryPhone) {
      alert('Please fill in at least the student name and primary mobile number.');
      return;
    }

    const appNo = `CVT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setReceiptData({
      appNo,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      data: { ...formData },
    });
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackState.phone) {
      alert('Please enter your phone number so our admissions team can reach you.');
      return;
    }
    setCallbackState((prev) => ({ ...prev, isBooked: true }));
  };

  return (
    <div className="space-y-12">
      {/* ====================================================
          1. HERO HEADER: OFFICIAL ADMISSION CRITERIA & CREDENTIALS
         ==================================================== */}
      <SpotlightCard className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <BadgePill label="Admissions Open 2026–2027" variant="saffron" pulse />
          <span className="text-xs font-mono text-slate-500">
            CBSE Affiliation No. 1130058 • School Code: 30040
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#181C20] font-extrabold leading-tight">
            Admissions & Enrollment Guidelines
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            Welcome to Chinmaya Vidyalaya Tarapur. We provide academic coverage from Nursery, Jr. KG, Sr. KG up to Std XII (Science, Commerce, and Arts streams). Admissions are strictly merit-oriented and transparent, welcoming students regardless of background into an environment of intellectual rigour and cultural grounding.
          </p>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Levels Offered</span>
            <span className="font-cinzel font-bold text-base text-[#181C20]">Nursery to Class XII</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Class Capacity</span>
            <span className="font-cinzel font-bold text-base text-[#DF711B]">Capped for Focus</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Curriculum</span>
            <span className="font-cinzel font-bold text-base text-[#0B1E34]">CBSE + CVP Ethos</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Office Timings</span>
            <span className="font-cinzel font-bold text-base text-[#181C20]">8:30 AM – 3:30 PM</span>
          </div>
        </div>
      </SpotlightCard>

      {/* ====================================================
          2. GREEN TICK GUIDELINES CHECKLIST (CRUCIAL SECTION)
         ==================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E7E2D8] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block">
              Official Verification Checklist
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
              Admissions Guidelines & Requirements
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-500">
            All criteria must be satisfied prior to seat confirmation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Card 2: Documents Required */}
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

          {/* Card 3: Admission Policy & Step-by-Step */}
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
                <span><strong>Step 1: Application:</strong> Submit online dummy form below or obtain hardcopy at reception.</span>
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
                <span><strong>Medium:</strong> English medium with high proficiency in Sanskrit & Hindi.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Downloadable Hardcopy Forms Strip */}
        <div className="bg-[#FAF3E8] border border-[#FDE49C] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
              Official Printed Registration PDFs
            </span>
            <p className="text-xs text-slate-700 font-medium">
              Prefer filling on paper? Download official printable application forms:
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

      {/* ====================================================
          3. DUMMY ONLINE ADMISSION APPLICATION FORM
         ==================================================== */}
      <SpotlightCard className="bg-white border-2 border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-8">
        <div className="space-y-2 border-b border-[#E7E2D8] pb-5">
          <div className="flex items-center gap-2">
            <BadgePill variant="saffron" label="Provisional Online Application Desk" pulse />
            <span className="text-[11px] font-mono text-slate-500">Academic Year 2026–2027</span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
            Provisional Admission Application Form
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
            Fill out the provisional registration details below to verify child eligibility and obtain an instant confirmation slip for campus submission.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION A: CANDIDATE PARTICULARS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#DF711B]" />
              <h4 className="font-serif font-bold text-base text-[#181C20]">
                Section A: Candidate Particulars
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Student's Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Date of Birth (DOB) *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Grade / Class Seeking Admission *
                </label>
                <select
                  value={formData.gradeSeeking}
                  onChange={(e) => setFormData({ ...formData, gradeSeeking: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                >
                  <option value="Nursery">Nursery (Age 3+)</option>
                  <option value="Junior KG">Junior KG (Age 4+)</option>
                  <option value="Senior KG">Senior KG (Age 5+)</option>
                  <option value="Standard I">Standard I (Age 6+)</option>
                  <option value="Standard II">Standard II</option>
                  <option value="Standard III">Standard III</option>
                  <option value="Standard IV">Standard IV</option>
                  <option value="Standard V">Standard V</option>
                  <option value="Standard VI">Standard VI</option>
                  <option value="Standard VII">Standard VII</option>
                  <option value="Standard VIII">Standard VIII</option>
                  <option value="Standard IX">Standard IX</option>
                  <option value="Standard X">Standard X (Subject to CBSE norm)</option>
                  <option value="Standard XI">Standard XI (Senior Secondary)</option>
                  <option value="Standard XII">Standard XII</option>
                </select>
              </div>

              {formData.gradeSeeking.includes('XI') && (
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                    Senior Secondary Stream *
                  </label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-amber-50 text-[#0B1E34]"
                  >
                    <option value="Science">Science (PCM / PCB / Comp. Science)</option>
                    <option value="Commerce">Commerce (Accountancy, Business, Economics)</option>
                    <option value="Arts">Arts (Humanities, Psychology, Economics)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION B: PARENT / GUARDIAN PARTICULARS */}
          <div className="space-y-4 pt-4 border-t border-[#EFECE6]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#DF711B]" />
              <h4 className="font-serif font-bold text-base text-[#181C20]">
                Section B: Parent / Guardian Details
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Father's / Guardian's Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Mother's Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Primary Mobile Number (For Call & SMS) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.primaryPhone}
                  onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="parent.name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Residential Address (Boisar / Tarapur / Palghar)
                </label>
                <input
                  type="text"
                  placeholder="Flat/House No., Colony, Landmark, Boisar 401501"
                  value={formData.residentialAddress}
                  onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>
            </div>
          </div>

          {/* SECTION C: PREVIOUS SCHOOL RECORD */}
          <div className="space-y-4 pt-4 border-t border-[#EFECE6]">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#DF711B]" />
              <h4 className="font-serif font-bold text-base text-[#181C20]">
                Section C: Previous Academic History (If Applicable)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Previous School Name
                </label>
                <input
                  type="text"
                  placeholder="Previous kindergarten or school attended"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0B1E34] mb-1">
                  Previous Affiliated Board
                </label>
                <select
                  value={formData.previousBoard}
                  onChange={(e) => setFormData({ ...formData, previousBoard: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] outline-none font-sans bg-[#FAF8F5]"
                >
                  <option value="CBSE">CBSE (Central Board)</option>
                  <option value="Maharashtra State Board">Maharashtra State Board (SSC)</option>
                  <option value="ICSE">ICSE / ISC</option>
                  <option value="Other / First School">Other / First-Time Schooling</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION D: CONFIRMATION & SUBMIT */}
          <div className="pt-4 border-t border-[#EFECE6] space-y-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={formData.confirmedGuidelines}
                onChange={(e) => setFormData({ ...formData, confirmedGuidelines: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-[#DF711B] border-[#E7E2D8] rounded focus:ring-[#DF711B] cursor-pointer"
              />
              <span className="text-xs text-slate-700 leading-relaxed font-sans">
                I have read and verified the <strong className="text-emerald-700">green tick guidelines</strong> above regarding age eligibility, mandatory birth/TC certificate verification, and agree to present all original credentials at the Chinmaya Vidyalaya administrative office.
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#DF711B] hover:bg-[#c96213] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer hover:scale-102 active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Provisional Application</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(INITIAL_FORM)}
                className="px-4 py-3 bg-white border border-[#E7E2D8] hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Reset Fields
              </button>
            </div>
          </div>
        </form>
      </SpotlightCard>

      {/* ====================================================
          4. IN CASE OF ISSUE / BOOK A CALL OPTION (USER REQUESTED)
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
              <form onSubmit={handleCallbackSubmit} className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D8]">
                  <span className="font-serif font-bold text-sm text-[#0B1E34]">
                    Request a Dedicated Call
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Free Counselling
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Parent's Name"
                    value={callbackState.name}
                    onChange={(e) => setCallbackState({ ...callbackState, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={callbackState.phone}
                    onChange={(e) => setCallbackState({ ...callbackState, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">
                    Preferred Call Time
                  </label>
                  <select
                    value={callbackState.slot}
                    onChange={(e) => setCallbackState({ ...callbackState, slot: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E2D8] focus:border-[#DF711B] outline-none font-sans bg-white"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM – 3:30 PM)">Afternoon (12:00 PM – 3:30 PM)</option>
                    <option value="Evening (4:00 PM – 6:00 PM)">Evening (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#DF711B] hover:bg-[#c96213] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Confirm Call Booking</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================
          5. PROVISIONAL APPLICATION RECEIPT MODAL
         ==================================================== */}
      {receiptData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setReceiptData(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-scaleUp text-[#181C20]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#FAF8F5] border-b border-[#E7E2D8] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                    Provisional Registration Slip
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#181C20]">
                    Application Generated Successfully
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReceiptData(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slip Details */}
            <div className="p-6 sm:p-8 space-y-6 text-xs font-sans">
              <div className="p-4 bg-[#FAF3E8] border border-[#FDE49C] rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Application Reference No.</span>
                  <span className="font-mono font-extrabold text-base text-[#DF711B]">{receiptData.appNo}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Date & Time</span>
                  <span className="font-mono text-slate-700">{receiptData.submittedAt}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Status</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-[10px]">
                    Provisional Verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#E7E2D8] pb-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Candidate Name</span>
                  <span className="font-bold text-sm text-[#0B1E34]">{receiptData.data.studentName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Class / Grade Seeking</span>
                  <span className="font-bold text-sm text-[#DF711B]">{receiptData.data.gradeSeeking}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Date of Birth</span>
                  <span className="font-medium text-slate-700">{receiptData.data.dob || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Parent / Mobile</span>
                  <span className="font-medium text-slate-700">{receiptData.data.fatherName || 'Parent'} ({receiptData.data.primaryPhone})</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono font-bold text-[11px] text-[#0B1E34] uppercase tracking-wider block">
                  Next Steps for Admission Confirmation:
                </span>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Bring this reference number (<strong>{receiptData.appNo}</strong>) to the campus reception desk.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Carry original Birth Certificate, Transfer Certificate (TC), and previous report card.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Campus desk timings: Monday to Friday 8:30 AM – 3:30 PM, Saturday 8:30 AM – 12:30 PM.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1E34] text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReceiptData(null)}
                  className="px-5 py-2 bg-[#DF711B] text-white rounded-xl text-xs font-bold hover:bg-[#c96213] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
