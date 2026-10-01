import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Users, 
  Mail, 
  Phone, 
  PhoneCall, 
  MapPin, 
  GraduationCap, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Clock, 
  Send, 
  X, 
  HelpCircle, 
  Headphones, 
  Check 
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { BadgePill } from '../../components/ui/badge-pill';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface RegistrationData {
  // Student particulars
  studentName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  gradeSeeking: string;
  stream: string;
  bloodGroup: string;
  motherTongue: string;
  aadhaarNumber: string;

  // Parent / Guardian particulars
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  primaryPhone: string;
  email: string;
  residentialAddress: string;
  city: string;
  pincode: string;

  // Previous Academic Records
  previousSchool: string;
  previousGrade: string;
  previousBoard: string;
  hasTC: 'Yes' | 'In Progress' | 'Not Applicable';

  // Medical & Remarks
  medicalNotes: string;
  emergencyContact: string;

  // Declaration
  declarationAgreed: boolean;
}

const INITIAL_REGISTRATION_DATA: RegistrationData = {
  studentName: '',
  dob: '',
  gender: 'Male',
  gradeSeeking: 'Nursery',
  stream: 'Science',
  bloodGroup: 'B+',
  motherTongue: '',
  aadhaarNumber: '',

  fatherName: '',
  fatherOccupation: '',
  fatherPhone: '',
  motherName: '',
  motherOccupation: '',
  motherPhone: '',
  primaryPhone: '',
  email: '',
  residentialAddress: '',
  city: 'Boisar',
  pincode: '401501',

  previousSchool: '',
  previousGrade: '',
  previousBoard: 'CBSE',
  hasTC: 'In Progress',

  medicalNotes: '',
  emergencyContact: '',
  declarationAgreed: false,
};

const OFFICIAL_FORMS = [
  {
    title: 'Nursery Registration Form',
    fileUrl: '/images/nursery.pdf',
    size: '113 KB',
    standard: 'Nursery (Age 3+)',
  },
  {
    title: 'Kindergarten (KG) Form',
    fileUrl: '/images/kg.pdf',
    size: '185 KB',
    standard: 'Jr. KG & Sr. KG',
  },
  {
    title: 'Std I to IX Admission Form',
    fileUrl: '/images/1to9.pdf',
    size: '79 KB',
    standard: 'Classes I through IX',
  },
];

export const RegistrationFormPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>(INITIAL_REGISTRATION_DATA);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    appNo: string;
    submittedAt: string;
    data: RegistrationData;
  } | null>(null);

  // Help Desk quick callback request state
  const [callbackRequest, setCallbackRequest] = useState<{
    name: string;
    phone: string;
    preferredTime: string;
    issueTopic: string;
    submitted: boolean;
  }>({
    name: '',
    phone: '',
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    issueTopic: 'Registration Form Assistance',
    submitted: false,
  });

  const [activeTab, setActiveTab] = useState<'online' | 'download'>('online');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useBodyScrollLock(submittedReceipt !== null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required.';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }
    if (!formData.fatherName.trim() && !formData.motherName.trim()) {
      newErrors.parentName = "Please enter either Father's or Mother's name.";
    }
    if (!formData.primaryPhone.trim() || formData.primaryPhone.length < 10) {
      newErrors.primaryPhone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.declarationAgreed) {
      newErrors.declarationAgreed = 'Please confirm the declaration before submitting.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    const generatedAppNo = `CVT-REG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedReceipt({
      appNo: generatedAppNo,
      submittedAt: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      data: { ...formData },
    });
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackRequest.phone.trim() || callbackRequest.phone.length < 10) {
      alert('Please enter a valid contact phone number.');
      return;
    }
    setCallbackRequest(prev => ({ ...prev, submitted: true }));
  };

  const isSeniorSecondary = formData.gradeSeeking === 'Std XI' || formData.gradeSeeking === 'Std XII';

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#181C20] pb-24">
      {/* Top Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Admissions', href: '/admissions/guidelines' },
          { label: 'Registration Forms' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* Page Header */}
        <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <BadgePill label="Academic Year 2026–2027" variant="amber" />
                <span className="text-xs font-mono font-semibold text-slate-500">
                  CBSE Affiliation No. 1130058 • School Code: 30034
                </span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] tracking-tight">
                Admission Registration Forms
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Complete the student admission registration below or download official paper forms.
                Our dedicated Admissions Help Desk is on standby to assist you at every step.
              </p>
            </div>

            {/* Switch between Online Registration and Printable Forms */}
            <div className="flex items-center gap-2 p-1.5 bg-[#F6F4EE] border border-[#E7E2D8] rounded-2xl shrink-0 self-start lg:self-center">
              <button
                type="button"
                onClick={() => setActiveTab('online')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'online'
                    ? 'bg-[#181C20] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Online Registration Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('download')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'download'
                    ? 'bg-[#181C20] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Download PDF Forms
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Form (left) + Help Desk Contact (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Registration Form or Downloadable Forms (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === 'download' ? (
              /* Downloadable PDF Forms Section */
              <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                    Hardcopy Documents
                  </span>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#181C20] mt-1">
                    Official Downloadable Registration Forms
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Print the prescribed form, fill it manually in block letters, and submit it directly to the school administrative office during counter hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  {OFFICIAL_FORMS.map((doc, idx) => (
                    <div
                      key={idx}
                      className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] hover:bg-[#F8F5EE] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#DF711B]/10 text-[#DF711B] flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-[#181C20]">{doc.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="bg-white px-2 py-0.5 rounded border border-[#E7E2D8] font-medium">
                              {doc.standard}
                            </span>
                            <span>PDF • {doc.size}</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={doc.fileUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#181C20] hover:bg-[#DF711B] text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Physical Form Submission Notice:</strong> Duly filled physical forms must be accompanied by an attested copy of the Birth Certificate, recent passport photos, and child Aadhaar card. Submit at the Admissions Counter, Chinmaya Vidyalaya Boisar.
                  </div>
                </div>
              </div>
            ) : (
              /* Interactive Online Registration Form */
              <form 
                onSubmit={handleFormSubmit}
                className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-8"
              >
                <div className="border-b border-[#E7E2D8] pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Step 1 of 2
                    </span>
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
                      Student Registration Particulars
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:inline-block">
                    * Required fields
                  </span>
                </div>

                {/* Section 1: Candidate / Student Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#181C20]">
                    <User className="w-4 h-4 text-[#DF711B]" />
                    <span>Candidate Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name of Student (as in Birth Certificate) *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="e.g. Aarav Rajesh Sharma"
                        className={`w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all ${
                          errors.studentName ? 'border-red-500 bg-red-50/20' : 'border-[#E7E2D8]'
                        }`}
                      />
                      {errors.studentName && (
                        <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all ${
                          errors.dob ? 'border-red-500 bg-red-50/20' : 'border-[#E7E2D8]'
                        }`}
                      />
                      {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Class / Grade Seeking *
                      </label>
                      <select
                        name="gradeSeeking"
                        value={formData.gradeSeeking}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all font-medium"
                      >
                        <option value="Nursery">Nursery (Age 3+)</option>
                        <option value="Junior KG">Junior KG (Age 4+)</option>
                        <option value="Senior KG">Senior KG (Age 5+)</option>
                        <option value="Std I">Std I (Age 6+)</option>
                        <option value="Std II">Std II</option>
                        <option value="Std III">Std III</option>
                        <option value="Std IV">Std IV</option>
                        <option value="Std V">Std V</option>
                        <option value="Std VI">Std VI</option>
                        <option value="Std VII">Std VII</option>
                        <option value="Std VIII">Std VIII</option>
                        <option value="Std IX">Std IX</option>
                        <option value="Std XI">Std XI (Senior Secondary)</option>
                        <option value="Std XII">Std XII (Senior Secondary)</option>
                      </select>
                    </div>

                    {isSeniorSecondary ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Stream Selection (Std XI/XII) *
                        </label>
                        <select
                          name="stream"
                          value={formData.stream}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all font-medium text-[#DF711B]"
                        >
                          <option value="Science">Science (Physics, Chem, Bio/Maths, Comp)</option>
                          <option value="Commerce">Commerce (Accountancy, Business Studies, Economics)</option>
                          <option value="Humanities">Humanities / Arts</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Blood Group
                        </label>
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
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
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mother Tongue
                      </label>
                      <input
                        type="text"
                        name="motherTongue"
                        value={formData.motherTongue}
                        onChange={handleInputChange}
                        placeholder="e.g. Marathi / Gujarati / Hindi / English"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Student Aadhaar Card No. (Optional)
                      </label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleInputChange}
                        maxLength={12}
                        placeholder="12 digit Aadhaar number"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Parent / Guardian Particulars */}
                <div className="space-y-4 pt-4 border-t border-[#E7E2D8]">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#181C20]">
                    <Users className="w-4 h-4 text-[#DF711B]" />
                    <span>Parent & Communication Particulars</span>
                  </div>

                  {errors.parentName && (
                    <p className="text-xs text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">
                      {errors.parentName}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Father's Full Name *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        placeholder="Father's full name"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Father's Occupation / Organisation
                      </label>
                      <input
                        type="text"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleInputChange}
                        placeholder="e.g. BARC / NPCIL / Business / Pvt."
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mother's Full Name *
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        placeholder="Mother's full name"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mother's Occupation / Organisation
                      </label>
                      <input
                        type="text"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleInputChange}
                        placeholder="e.g. Educator / Engineer / Homemaker"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Primary Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="primaryPhone"
                        value={formData.primaryPhone}
                        onChange={handleInputChange}
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all ${
                          errors.primaryPhone ? 'border-red-500 bg-red-50/20' : 'border-[#E7E2D8]'
                        }`}
                      />
                      {errors.primaryPhone && (
                        <p className="text-xs text-red-500 mt-1">{errors.primaryPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Residential Address in Boisar / Palghar Region *
                      </label>
                      <textarea
                        name="residentialAddress"
                        value={formData.residentialAddress}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Flat/House No., Society/Colony, Area, Landmark"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Previous Academic Record */}
                <div className="space-y-4 pt-4 border-t border-[#E7E2D8]">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#181C20]">
                    <GraduationCap className="w-4 h-4 text-[#DF711B]" />
                    <span>Previous Academic Record (if applicable)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Previous School Attended & City
                      </label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        placeholder="e.g. Atomic Energy Central School, Tarapur"
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Transfer Certificate Status
                      </label>
                      <select
                        name="hasTC"
                        value={formData.hasTC}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF711B]/20 transition-all"
                      >
                        <option value="Yes">TC In Hand</option>
                        <option value="In Progress">TC Applied / Awaited</option>
                        <option value="Not Applicable">Not Applicable (Fresh Nursery Entry)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 4: Declaration & Submit */}
                <div className="space-y-4 pt-4 border-t border-[#E7E2D8]">
                  <div className="p-4 bg-[#FCFBF7] border border-[#E7E2D8] rounded-2xl space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="declarationAgreed"
                        checked={formData.declarationAgreed}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 rounded text-[#DF711B] focus:ring-[#DF711B]"
                      />
                      <span className="text-xs text-slate-700 leading-relaxed">
                        I hereby declare that all particulars entered above are true, complete, and authentic to the best of my knowledge. I understand that this online registration generates a provisional registration reference and admission will be confirmed upon verification of original documents and seat vacancy.
                      </span>
                    </label>
                    {errors.declarationAgreed && (
                      <p className="text-xs text-red-500 font-medium pl-7">
                        {errors.declarationAgreed}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-slate-500">
                      ⚡ Instant provisional registration slip generated upon submission.
                    </span>

                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Registration Form</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>

          {/* RIGHT COLUMN: Help Desk Contact Option ONLY (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Help Desk Priority Card */}
            <div className="bg-white border-2 border-[#DF711B]/40 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6 sticky top-28">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#DF711B]/15 text-[#DF711B] flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Admissions Help Desk
                    </span>
                    <h3 className="font-cinzel text-xl font-extrabold text-[#181C20]">
                      Need Any Help?
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Have an issue filling out the form, checking eligibility, or questions about documents? Our admissions desk is available directly to help you.
                </p>
              </div>

              {/* Direct Call & Email Buttons */}
              <div className="space-y-3">
                <a
                  href="tel:9322054713"
                  className="flex items-center justify-between p-3.5 bg-[#0A5C36]/10 hover:bg-[#0A5C36]/20 border border-[#0A5C36]/20 rounded-2xl text-[#0A5C36] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A5C36] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[#0A5C36]/80 block">
                        Admissions Helpline
                      </span>
                      <span className="text-sm font-extrabold tracking-wide">
                        +91 9322054713
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0A5C36] group-hover:translate-x-0.5 transition-transform">
                    Call Now →
                  </span>
                </a>

                <a
                  href="tel:02525272370"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-[#E7E2D8] rounded-xl text-slate-800 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">School Office Counter</span>
                      <span className="font-bold">02525-272370 / 272371</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Dial Office</span>
                </a>

                <a
                  href="mailto:cvtarapur@chinmayamission.com?subject=Admissions%20Registration%20Help%20Desk%20Query"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-[#E7E2D8] rounded-xl text-slate-800 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#DF711B]" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-400 block font-mono">Help Desk Email</span>
                      <span className="font-bold truncate block">cvtarapur@chinmayamission.com</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#DF711B] shrink-0">Email</span>
                </a>
              </div>

              {/* Counter Timings */}
              <div className="p-3.5 bg-[#FCFBF7] border border-[#E7E2D8] rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Clock className="w-4 h-4 text-[#DF711B]" />
                  <span>Help Desk Counter Hours</span>
                </div>
                <div className="space-y-1 text-slate-600 text-[11px]">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-semibold text-slate-800">9:00 AM – 1:30 PM, 2:00 PM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold text-slate-800">9:00 AM – 12:30 PM</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Sunday & Public Holidays:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Physical Desk Location */}
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Admissions Office Desk, Chinmaya Vidyalaya, Vidyanagar, Boisar, Dist. Palghar - 401501, Maharashtra.
                </span>
              </div>

              {/* Quick Help Desk Callback Form */}
              <div className="pt-4 border-t border-[#E7E2D8] space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <HelpCircle className="w-3.5 h-3.5 text-[#DF711B]" />
                  <span>Request a Callback from Help Desk</span>
                </div>

                {callbackRequest.submitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Callback Scheduled!</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Our admissions counselor will call you on <strong>{callbackRequest.phone}</strong> during the next available desk window.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Your Name (Parent/Guardian)"
                      value={callbackRequest.name}
                      onChange={e => setCallbackRequest(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DF711B]"
                    />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Your 10-digit Phone No. *"
                      required
                      value={callbackRequest.phone}
                      onChange={e => setCallbackRequest(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DF711B]"
                    />
                    <select
                      value={callbackRequest.preferredTime}
                      onChange={e => setCallbackRequest(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-[#FCFBF7] border border-[#E7E2D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DF711B] text-slate-700"
                    >
                      <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Immediate / Earliest">Immediate / Earliest Desk Window</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#181C20] hover:bg-[#DF711B] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Request Help Desk Call</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* PROVISIONAL REGISTRATION SLIP MODAL */}
      {submittedReceipt && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E7E2D8] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E7E2D8] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                    Registration Recorded Successfully
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#181C20]">
                    Provisional Registration Slip
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedReceipt(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Application Reference Banner */}
            <div className="p-4 bg-[#FCFBF7] border border-[#E7E2D8] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Application Reference ID
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-[#DF711B]">
                  {submittedReceipt.appNo}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Submitted On
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {submittedReceipt.submittedAt}
                </span>
              </div>
            </div>

            {/* Summary Details Table */}
            <div className="border border-[#E7E2D8] rounded-2xl overflow-hidden divide-y divide-[#E7E2D8] text-xs">
              <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                <span className="font-bold text-slate-600">Student Name:</span>
                <span className="font-extrabold text-[#181C20]">{submittedReceipt.data.studentName}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="font-bold text-slate-600">Date of Birth & Gender:</span>
                <span className="font-medium text-[#181C20]">{submittedReceipt.data.dob} ({submittedReceipt.data.gender})</span>
              </div>
              <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                <span className="font-bold text-slate-600">Grade Seeking:</span>
                <span className="font-extrabold text-[#DF711B]">
                  {submittedReceipt.data.gradeSeeking}
                  {submittedReceipt.data.stream && (submittedReceipt.data.gradeSeeking === 'Std XI' || submittedReceipt.data.gradeSeeking === 'Std XII')
                    ? ` • ${submittedReceipt.data.stream} Stream`
                    : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="font-bold text-slate-600">Parent / Guardian:</span>
                <span className="font-medium text-[#181C20]">
                  {submittedReceipt.data.fatherName || submittedReceipt.data.motherName}
                </span>
              </div>
              <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                <span className="font-bold text-slate-600">Registered Phone:</span>
                <span className="font-bold text-[#181C20]">{submittedReceipt.data.primaryPhone}</span>
              </div>
            </div>

            {/* Next Verification Instructions */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 space-y-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 block">
                Next Steps for Verification:
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-emerald-900/90">
                <li>Keep this Application Reference ID (<strong>{submittedReceipt.appNo}</strong>) noted for all correspondence.</li>
                <li>Our Admissions Help Desk will contact you on <strong>{submittedReceipt.data.primaryPhone}</strong> to schedule document verification.</li>
                <li>Please prepare original Birth Certificate, Transfer Certificate (if applicable), and passport-size photographs.</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Registration Slip</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setFormData(INITIAL_REGISTRATION_DATA);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 border border-[#E7E2D8] hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all text-center"
                >
                  Register Another Student
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedReceipt(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold rounded-xl transition-all text-center"
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
