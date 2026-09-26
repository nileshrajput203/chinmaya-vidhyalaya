import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Clock, 
  Phone, 
  FileText, 
  GraduationCap, 
  User, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

type FormMode = 'quick' | 'detailed';

interface QuickAdmissionFormSectionProps {
  className?: string;
}

export const QuickAdmissionFormSection: React.FC<QuickAdmissionFormSectionProps> = ({ className = '' }) => {
  const [mode, setMode] = useState<FormMode>('quick');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Quick form state
  const [quickData, setQuickData] = useState({
    parentName: '',
    phone: '',
    grade: 'Class 1',
    callbackTime: 'Morning (9 AM - 12 PM)',
  });

  // Detailed form state
  const [detailedData, setDetailedData] = useState({
    studentName: '',
    parentName: '',
    grade: 'Class 1',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    cityArea: 'Boisar / Tarapur',
    prevSchool: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickData.parentName.trim() || !quickData.phone.trim()) {
      setErrorMsg('Please fill in parent name and contact number.');
      return;
    }
    if (quickData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = 'CVT-Q' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(ref);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailedData.studentName.trim() || !detailedData.parentName.trim() || !detailedData.phone.trim()) {
      setErrorMsg('Please complete all required fields (Student, Parent, Phone).');
      return;
    }
    if (detailedData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = 'CVT-ADM' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(ref);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setQuickData({
      parentName: '',
      phone: '',
      grade: 'Class 1',
      callbackTime: 'Morning (9 AM - 12 PM)',
    });
    setDetailedData({
      studentName: '',
      parentName: '',
      grade: 'Class 1',
      dob: '',
      gender: 'Male',
      phone: '',
      email: '',
      cityArea: 'Boisar / Tarapur',
      prevSchool: '',
    });
  };

  const GRADE_OPTIONS = [
    'Nursery',
    'Junior KG (LKG)',
    'Senior KG (UKG)',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11 (Arts Stream)',
    'Class 11 (Commerce Stream)',
    'Class 11 (Science Stream)',
    'Class 12 (Arts Stream)',
    'Class 12 (Commerce Stream)',
    'Class 12 (Science Stream)',
  ];

  return (
    <section className={`w-full py-10 lg:py-14 bg-[#FAF7F2] border-y border-[#E9E4DC] relative overflow-hidden ${className}`}>
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DF711B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFB740]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* White container as requested: small, compact, detailed with toggle */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#E2DDD3] p-5 sm:p-7 md:p-8 transition-all">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE1] pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#DF711B]/10 text-[#DF711B] text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm">
                  <Sparkles className="w-3 h-3 text-[#DF711B]" />
                  Session 2026–27 Open
                </span>
                <span className="text-[11px] font-mono text-[#888888] uppercase tracking-wider">
                  CBSE Affiliated • Boisar
                </span>
              </div>
              <h3 className="font-display text-[20px] sm:text-[24px] font-black text-[#181818] tracking-tight uppercase m-0 leading-tight">
                Quick Admission Desk
              </h3>
            </div>

            {/* The Mode Toggle */}
            <div className="inline-flex p-1 bg-[#F3EFE6] rounded-lg border border-[#E5E0D5] self-start sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => { setMode('quick'); setErrorMsg(''); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  mode === 'quick'
                    ? 'bg-white text-[#DF711B] shadow-sm'
                    : 'text-[#666666] hover:text-[#181818]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Quick Callback</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('detailed'); setErrorMsg(''); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  mode === 'detailed'
                    ? 'bg-white text-[#DF711B] shadow-sm'
                    : 'text-[#666666] hover:text-[#181818]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Admission Option</span>
              </button>
            </div>
          </div>

          {/* Success Notification View */}
          {isSuccess ? (
            <div className="py-6 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-green-700 font-bold uppercase tracking-widest block mb-1">
                  Request Recorded Successfully
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-black text-[#181818] uppercase tracking-tight">
                  Thank You for Connecting
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto mt-1 leading-relaxed">
                  Your reference identifier is{' '}
                  <strong className="text-[#DF711B] font-mono font-bold">{referenceId}</strong>.
                  Our senior admissions counselor will connect with you shortly.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="tel:+912525271818"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DF711B] hover:bg-[#c86113] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Admissions Now</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F3EFE6] hover:bg-[#EAE4D7] text-[#181818] text-xs font-bold uppercase tracking-wider rounded border border-[#DCD5C9] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Form</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md">
                  {errorMsg}
                </div>
              )}

              {/* -----------------------------------------------------------------
                  MODE A: QUICK CALLBACK FORM (FASTEST, 3-4 FIELDS)
                 ----------------------------------------------------------------- */}
              {mode === 'quick' && (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Parent Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Parent / Guardian Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#999999] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={quickData.parentName}
                          onChange={(e) => setQuickData({ ...quickData, parentName: e.target.value })}
                          placeholder="e.g. Ramesh Sharma"
                          className="w-full pl-9 pr-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-all"
                        />
                      </div>
                    </div>

                    {/* Mobile Phone */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Contact Mobile (+91) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#999999] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          maxLength={12}
                          value={quickData.phone}
                          onChange={(e) => setQuickData({ ...quickData, phone: e.target.value })}
                          placeholder="10-digit mobile"
                          className="w-full pl-9 pr-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-all"
                        />
                      </div>
                    </div>

                    {/* Target Grade */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Seeking Class / Grade
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-[#999999] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={quickData.grade}
                          onChange={(e) => setQuickData({ ...quickData, grade: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-all cursor-pointer appearance-none"
                        >
                          {GRADE_OPTIONS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Preferred time & Submit bar */}
                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#666666] w-full sm:w-auto">
                      <Clock className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                      <span className="text-[11px]">Best Callback:</span>
                      <select
                        value={quickData.callbackTime}
                        onChange={(e) => setQuickData({ ...quickData, callbackTime: e.target.value })}
                        className="py-1 px-2 text-[11px] bg-[#F3EFE6] border border-[#DDD7CD] rounded text-[#333333] focus:outline-none focus:border-[#DF711B]"
                      >
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                        <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#DF711B] hover:bg-[#c86113] disabled:opacity-60 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Callback</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* -----------------------------------------------------------------
                  MODE B: DETAILED ADMISSION OPTION (COMPACT BUT COMPLETE FORM)
                 ----------------------------------------------------------------- */}
              {mode === 'detailed' && (
                <form onSubmit={handleDetailedSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    
                    {/* Student Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={detailedData.studentName}
                        onChange={(e) => setDetailedData({ ...detailedData, studentName: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B]"
                      />
                    </div>

                    {/* Parent Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Parent / Guardian *
                      </label>
                      <input
                        type="text"
                        required
                        value={detailedData.parentName}
                        onChange={(e) => setDetailedData({ ...detailedData, parentName: e.target.value })}
                        placeholder="Enter parent's full name"
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B]"
                      />
                    </div>

                    {/* Applying Grade */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Applying For Grade *
                      </label>
                      <select
                        value={detailedData.grade}
                        onChange={(e) => setDetailedData({ ...detailedData, grade: e.target.value })}
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] cursor-pointer"
                      >
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mobile Phone */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Contact Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={12}
                        value={detailedData.phone}
                        onChange={(e) => setDetailedData({ ...detailedData, phone: e.target.value })}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={detailedData.email}
                        onChange={(e) => setDetailedData({ ...detailedData, email: e.target.value })}
                        placeholder="Enter parent's email address"
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B]"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Student DOB
                      </label>
                      <input
                        type="date"
                        value={detailedData.dob}
                        onChange={(e) => setDetailedData({ ...detailedData, dob: e.target.value })}
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B]"
                      />
                    </div>

                    {/* City / Area */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Residential Area
                      </label>
                      <input
                        type="text"
                        value={detailedData.cityArea}
                        onChange={(e) => setDetailedData({ ...detailedData, cityArea: e.target.value })}
                        placeholder="Enter residential area / town"
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B]"
                      />
                    </div>

                    {/* Previous School */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] font-bold mb-1">
                        Previous School (If any)
                      </label>
                      <input
                        type="text"
                        value={detailedData.prevSchool}
                        onChange={(e) => setDetailedData({ ...detailedData, prevSchool: e.target.value })}
                        placeholder="Current school name"
                        className="w-full px-3 py-2 text-xs text-[#181818] bg-[#FBF9F6] border border-[#DDD7CD] rounded-md focus:outline-none focus:border-[#DF711B]"
                      />
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F0EBE1]">
                    <span className="text-[11px] text-[#777777] font-sans">
                      Official CBSE Affiliation No: 1130095 • No application charges for enquiry
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#DF711B] hover:bg-[#c86113] disabled:opacity-60 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Admission Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

        </div>

      </div>
    </section>
  );
};
