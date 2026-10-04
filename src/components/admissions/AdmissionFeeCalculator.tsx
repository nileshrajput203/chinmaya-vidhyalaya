import React, { useState } from 'react';
import { 
  Calculator, CheckCircle2, Bus, GraduationCap, 
  FileText, Sparkles, AlertCircle 
} from 'lucide-react';

interface GradeOption {
  id: string;
  name: string;
  category: 'Pre-Primary' | 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary';
  ageCriteria: string;
  tuitionPerTerm: number;
  activityFeePerTerm: number;
  admissionOneTime: number;
  streams?: {
    id: string;
    name: string;
    labFee: number;
    subjects: string[];
    eligibility: string;
  }[];
}

const GRADES: GradeOption[] = [
  {
    id: 'nursery',
    name: 'Nursery',
    category: 'Pre-Primary',
    ageCriteria: 'Minimum 3 years completed as on 31st December of the academic year (as per NEP 2020)',
    tuitionPerTerm: 12500,
    activityFeePerTerm: 2500,
    admissionOneTime: 10000,
  },
  {
    id: 'jr-kg',
    name: 'Junior KG',
    category: 'Pre-Primary',
    ageCriteria: 'Minimum 4 years completed as on 31st December',
    tuitionPerTerm: 13000,
    activityFeePerTerm: 2500,
    admissionOneTime: 10000,
  },
  {
    id: 'sr-kg',
    name: 'Senior KG',
    category: 'Pre-Primary',
    ageCriteria: 'Minimum 5 years completed as on 31st December',
    tuitionPerTerm: 13500,
    activityFeePerTerm: 2500,
    admissionOneTime: 10000,
  },
  {
    id: 'primary-1-5',
    name: 'Class I to Class V',
    category: 'Primary',
    ageCriteria: 'Minimum 6 years completed for Class I. Transfer Certificate (TC) required for Class II onwards',
    tuitionPerTerm: 15500,
    activityFeePerTerm: 3200,
    admissionOneTime: 12000,
  },
  {
    id: 'middle-6-8',
    name: 'Class VI to Class VIII',
    category: 'Middle',
    ageCriteria: 'Passing certificate from recognized board + Countersigned TC from previous school',
    tuitionPerTerm: 17500,
    activityFeePerTerm: 3800,
    admissionOneTime: 12000,
  },
  {
    id: 'sec-9-10',
    name: 'Class IX & Class X',
    category: 'Secondary',
    ageCriteria: 'Direct CBSE registration norms apply. Previous class marksheet & verified TC required',
    tuitionPerTerm: 19500,
    activityFeePerTerm: 4500,
    admissionOneTime: 15000,
  },
  {
    id: 'sr-sec-11-12',
    name: 'Class XI & Class XII',
    category: 'Senior Secondary',
    ageCriteria: 'Class X CBSE / ICSE / State Board passing certificate + specific stream cutoff score',
    tuitionPerTerm: 22500,
    activityFeePerTerm: 5000,
    admissionOneTime: 16000,
    streams: [
      {
        id: 'science',
        name: 'Science Stream (PCM / PCB / PCMB)',
        labFee: 4000,
        subjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'Computer Science / Physical Education', 'English Core'],
        eligibility: 'Minimum 70% in Class X Mathematics and Science in Board examinations.',
      },
      {
        id: 'commerce',
        name: 'Commerce Stream',
        labFee: 2000,
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Applied Mathematics / Informatics Practices', 'English Core'],
        eligibility: 'Minimum 60% aggregate in Class X Board examinations.',
      },
      {
        id: 'humanities',
        name: 'Humanities & Arts Stream',
        labFee: 1500,
        subjects: ['History', 'Political Science', 'Economics / Psychology', 'Hindi / Physical Education', 'English Core'],
        eligibility: 'Minimum 55% aggregate in Class X Board examinations.',
      },
    ],
  },
];

const TRANSPORT_ZONES = [
  { id: 'none', name: 'Self Transport / No School Bus', feePerTerm: 0 },
  { id: 'boisar-local', name: 'Boisar City / Local MIDC Residential Zone (Radius 0-5 km)', feePerTerm: 4500 },
  { id: 'barc-colony', name: 'BARC Colony / Tarapur Village (Radius 5-10 km)', feePerTerm: 6000 },
  { id: 'palghar-route', name: 'Palghar Highway / Umroli / Dandi (Radius 10-15 km)', feePerTerm: 7500 },
];

export const AdmissionFeeCalculator: React.FC = () => {
  const [selectedGradeId, setSelectedGradeId] = useState<string>('primary-1-5');
  const [selectedStreamId, setSelectedStreamId] = useState<string>('science');
  const [selectedTransportId, setSelectedTransportId] = useState<string>('none');
  const [includeOneTime, setIncludeOneTime] = useState<boolean>(true);

  const selectedGrade = GRADES.find((g) => g.id === selectedGradeId) || GRADES[3];
  const isSeniorSec = selectedGrade.id === 'sr-sec-11-12';
  const selectedStream = isSeniorSec
    ? selectedGrade.streams?.find((s) => s.id === selectedStreamId) || selectedGrade.streams?.[0]
    : undefined;

  const transportOption = TRANSPORT_ZONES.find((t) => t.id === selectedTransportId) || TRANSPORT_ZONES[0];

  const tuitionFee = selectedGrade.tuitionPerTerm;
  const activityFee = selectedGrade.activityFeePerTerm;
  const labFee = selectedStream ? selectedStream.labFee : 0;
  const transportFee = transportOption.feePerTerm;
  const admissionOneTime = includeOneTime ? selectedGrade.admissionOneTime : 0;

  // 1 Academic Year = 2 Terms
  const totalPerTerm = tuitionFee + activityFee + labFee + transportFee;
  const estimatedAnnualTotal = totalPerTerm * 2 + admissionOneTime;

  const handleOpenModal = () => {
    const streamName = selectedStream ? ` - ${selectedStream.name}` : '';
    const label = `${selectedGrade.name}${streamName}`;
    window.dispatchEvent(
      new CustomEvent('open-admission-modal', {
        detail: {
          grade: label,
          stream: selectedStream?.name || 'General Campus',
        },
      })
    );
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-b border-slate-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#DF711B] text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Admissions 2026–27 Planning Tool</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-[#0B1D30] tracking-tight">
            Interactive Fee & Eligibility Estimator
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Select your child's intended standard, academic stream, and optional school transport route to preview transparent term-wise tuition, lab allocations, and board guidelines.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Step 1: Select Grade Category */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                1. Select Academic Standard / Class
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {GRADES.map((grade) => {
                  const isSelected = grade.id === selectedGradeId;
                  return (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => setSelectedGradeId(grade.id)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B1D30] text-white border-[#0B1D30] shadow-md scale-[1.02]'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] font-mono opacity-70 uppercase tracking-widest">{grade.category}</div>
                      <div className="text-xs sm:text-sm font-bold font-cinzel mt-0.5">{grade.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 1.5: If Class XI/XII, Select Academic Stream */}
            {isSeniorSec && selectedGrade.streams && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#DF711B] font-bold mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Choose Senior Secondary Stream (Class XI & XII)</span>
                </label>
                <div className="space-y-2.5">
                  {selectedGrade.streams.map((stream) => {
                    const isSelected = stream.id === selectedStreamId;
                    return (
                      <button
                        key={stream.id}
                        type="button"
                        onClick={() => setSelectedStreamId(stream.id)}
                        className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FFF8F0] border-[#DF711B] text-[#0B1D30] shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-bold font-cinzel">{stream.name}</div>
                          <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                            Key Subjects: {stream.subjects.slice(0, 3).join(', ')} + more
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-mono font-bold text-[#DF711B]">
                            +₹{stream.labFee.toLocaleString('en-IN')}/term
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Transport Route */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-[#DF711B]" />
                <span>2. School Bus Transport Route (Optional)</span>
              </label>
              <select
                value={selectedTransportId}
                onChange={(e) => setSelectedTransportId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-sans text-slate-800 focus:outline-none focus:border-[#DF711B] transition-colors"
              >
                {TRANSPORT_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} {zone.feePerTerm > 0 ? `(+₹${zone.feePerTerm.toLocaleString('en-IN')}/term)` : '(No bus charges)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Registration Toggle */}
            <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Include One-Time Admission & Registration Fee</span>
                <span className="text-[11px] text-slate-500 block">Applicable only for new students in the initial enrollment term</span>
              </div>
              <input
                type="checkbox"
                id="includeOneTime"
                checked={includeOneTime}
                onChange={(e) => setIncludeOneTime(e.target.checked)}
                className="w-4 h-4 text-[#DF711B] accent-[#DF711B] rounded cursor-pointer"
              />
            </div>

            {/* Age & Eligibility Notice Card */}
            <div className="p-4 rounded-2xl bg-[#FAF3E8]/80 border border-[#DF711B]/20 text-xs space-y-1.5 text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-[#DF711B]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Admission Eligibility Criteria:</span>
              </div>
              <p className="leading-relaxed pl-5 font-sans">
                {selectedGrade.ageCriteria}
              </p>
              {selectedStream && (
                <p className="leading-relaxed pl-5 font-sans font-medium text-slate-800 border-t border-[#DF711B]/20 pt-1.5 mt-1.5">
                  Stream Cutoff: {selectedStream.eligibility}
                </p>
              )}
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1D30] text-white rounded-3xl p-6 sm:p-8 border border-[#DF711B]/40 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFB740]">
                  FEE ESTIMATION SUMMARY
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {selectedGrade.name} {selectedStream ? `(${selectedStream.name.split(' ')[0]})` : ''}
                </h3>
              </div>

              {/* Line items */}
              <div className="space-y-3 font-sans text-xs sm:text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Tuition Fee (Per Term):</span>
                  <span className="font-mono font-bold text-white">₹{tuitionFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Activity & Library Charges:</span>
                  <span className="font-mono font-bold text-white">₹{activityFee.toLocaleString('en-IN')}</span>
                </div>
                {labFee > 0 && (
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Laboratory & Practical Fee:</span>
                    <span className="font-mono font-bold text-[#FFB740]">₹{labFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {transportFee > 0 && (
                  <div className="flex justify-between items-center text-slate-300">
                    <span>School Bus Transport:</span>
                    <span className="font-mono font-bold text-white">₹{transportFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {includeOneTime && admissionOneTime > 0 && (
                  <div className="flex justify-between items-center text-amber-200/90 pt-1 border-t border-white/10">
                    <span>One-Time Admission Fee:</span>
                    <span className="font-mono font-bold text-amber-200">₹{admissionOneTime.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Grand Totals */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-slate-300">Term Fee (Half-Yearly):</span>
                  <span className="font-mono text-xl font-bold text-[#FFB740]">
                    ₹{totalPerTerm.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-t border-white/10 pt-2">
                  <span className="text-xs uppercase tracking-wider text-slate-200 font-bold">Estimated Annual Total:</span>
                  <span className="font-mono text-2xl font-black text-white">
                    ₹{estimatedAnnualTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans mt-1">
                  *Official fees are governed by the Chinmaya Vidyalaya Managing Committee in adherence to Maharashtra Fee Regulation norms.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#DF711B] to-[#FF8C38] hover:from-[#C86012] hover:to-[#DF711B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Admission Enquiry For {selectedGrade.name}</span>
                </button>
                <a
                  href="/downloads/admissions"
                  className="w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2 text-center"
                >
                  <FileText className="w-4 h-4 text-[#FFB740]" />
                  <span>Download Registration Form (PDF)</span>
                </a>
              </div>

            </div>

            {/* Checklist of Essential Documents */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E2D8] shadow-sm space-y-3">
              <h4 className="font-cinzel text-sm font-bold text-[#0B1D30] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mandatory Documents Checklist for Admission:</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#DF711B] font-bold">•</span>
                  <span>Original Birth Certificate (Nursery, Jr. KG, Sr. KG & Std I)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DF711B] font-bold">•</span>
                  <span>Original Countersigned Transfer Certificate (Std II onwards)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DF711B] font-bold">•</span>
                  <span>Copy of Student & Parent Aadhar Cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DF711B] font-bold">•</span>
                  <span>Previous Academic Progress Report / Marksheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DF711B] font-bold">•</span>
                  <span>3 Recent Passport Size Photographs of Student</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
