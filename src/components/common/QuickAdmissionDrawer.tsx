import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Send, CheckCircle2, Phone, GraduationCap, Eye } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';
import { DocumentViewerModal } from '../documents/DocumentViewerModal';
import { SchoolDocument } from '../../types/documents';
import { formService } from '../../services/formService';

interface QuickAdmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAdmissionDrawer: React.FC<QuickAdmissionDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'forms' | 'enquiry' | 'guidelines'>('forms');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<SchoolDocument | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      const l = (window as any).__lenis;
      if (l) {
        l.start();
      }
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: 'Nursery',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Strict validation
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(formData.parentName.trim()) || formData.parentName.trim().length < 2) {
      setSubmitError('Please enter a valid parent or guardian name containing only letters.');
      return;
    }

    if (!nameRegex.test(formData.studentName.trim()) || formData.studentName.trim().length < 2) {
      setSubmitError('Please enter a valid student name containing only letters.');
      return;
    }

    const cleanedPhone = formData.phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setSubmitError('Please enter a valid 10-digit mobile number containing only numbers.');
      return;
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setSubmitError('Please enter a valid email address.');
        return;
      }
    }

    setIsSubmitting(true);

    const result = await formService.submitAdmission({
      parentName: formData.parentName.trim(),
      studentName: formData.studentName.trim(),
      gradeApplyingFor: formData.grade,
      phone: cleanedPhone,
      email: formData.email.trim() || undefined,
      message: formData.message.trim() || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccessMessage(result.message);
      setFormSubmitted(true);
    } else {
      setSubmitError(result.error || result.message || 'Failed to submit admission enquiry.');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#181C20]/70 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#FCFBF7] text-[#181C20] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-[#E7E2D8]"
            >
              {/* Drawer Header */}
              <div className="p-6 bg-[#FAF8F5] text-[#181C20] flex items-center justify-between border-b border-[#E7E2D8] shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#DF711B]" />
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#DF711B] font-bold">
                      Admissions Open 2026-27
                    </span>
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-[#181C20]">
                    Chinmaya Vidyalaya
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[#FAF3E8] hover:bg-[#EFEAE1] text-[#181C20] border border-[#E7E2D8] transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Selectors */}
              <div className="flex border-b border-[#E7E2D8] bg-[#F7F3EB] text-xs font-semibold shrink-0">
                <button
                  onClick={() => setActiveTab('forms')}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'forms'
                      ? 'border-[#DF711B] text-[#181C20] bg-white font-bold'
                      : 'border-transparent text-[#4A5568] hover:text-[#181C20]'
                  }`}
                >
                  Registration Forms
                </button>
                <button
                  onClick={() => setActiveTab('enquiry')}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'enquiry'
                      ? 'border-[#DF711B] text-[#181C20] bg-white font-bold'
                      : 'border-transparent text-[#4A5568] hover:text-[#181C20]'
                  }`}
                >
                  Direct Enquiry
                </button>
                <button
                  onClick={() => setActiveTab('guidelines')}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'guidelines'
                      ? 'border-[#DF711B] text-[#181C20] bg-white font-bold'
                      : 'border-transparent text-[#4A5568] hover:text-[#181C20]'
                  }`}
                >
                  Admission Guidelines
                </button>
              </div>

              {/* Drawer Body Content */}
              <div 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                style={{ overscrollBehavior: 'contain' }}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
              >
                {activeTab === 'forms' && (
                  <div className="space-y-4">
                    <div className="bg-[#FAF6EF] p-4 rounded-xl border border-[#E7E2D8] text-xs text-[#4A5568] leading-relaxed">
                      <strong>Note:</strong> Classrooms are spacious and architected with capacity capable of seating more than 40 students with personalized mentoring. Download application forms below.
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: "Nursery Registration Form", file: "/images/nursery.pdf", size: "113 KB" },
                        { title: "Junior / Senior KG Registration Form", file: "/images/kg.pdf", size: "185 KB" },
                        { title: "Standard I to IX Registration Form", file: "/images/1to9.pdf", size: "79 KB" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-4 rounded-xl border border-[#E7E2D8] flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#DF711B] shrink-0" />
                            <div>
                              <h4 className="font-semibold text-xs text-[#181C20]">{item.title}</h4>
                              <span className="text-[11px] text-[#4A5568] font-mono">{item.size} • Official PDF</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setViewingDoc({
                                id: `drawer-form-${idx}`,
                                title: item.title,
                                category: 'admissions',
                                fileUrl: item.file,
                                fileSize: item.size,
                                uploadDate: '2024-04-01',
                                description: item.title,
                                downloadable: true,
                              })}
                              className="px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-[#DF711B] hover:text-white text-[#181C20] border border-[#E7E2D8] text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1"
                              title="View document"
                            >
                              <Eye className="w-3 h-3 text-[#DF711B]" />
                              <span>View</span>
                            </button>
                            <a
                              href={item.file}
                              download
                              className="px-3 py-1.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                              title="Download document"
                            >
                              <Download className="w-3 h-3" />
                              <span>Get</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'enquiry' && (
                  <div>
                    {formSubmitted ? (
                      <div className="py-12 text-center space-y-4">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                        <h4 className="font-cinzel font-bold text-xl text-[#181C20]">Enquiry Submitted!</h4>
                        <p className="text-xs text-[#4A5568] max-w-xs mx-auto leading-relaxed">
                          {submitSuccessMessage || 'Thank you! Your admission enquiry has been sent to our admissions office. Our admissions team will contact you shortly.'}
                        </p>
                        <div className="p-3 bg-[#FAF6EF] rounded-xl border border-[#E7E2D8] text-[11px] text-[#717A84] max-w-xs mx-auto">
                          Our admissions officer will reach out on your registered contact number.
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              parentName: '',
                              studentName: '',
                              grade: 'Nursery',
                              phone: '',
                              email: '',
                              message: ''
                            });
                          }}
                          className="text-xs text-[#DF711B] hover:text-[#C8652D] font-bold underline block mx-auto pt-4 cursor-pointer"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                        {submitError && (
                          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                            <span className="font-bold">Error:</span>
                            <span>{submitError}</span>
                          </div>
                        )}
                        <div>
                          <label className="font-semibold text-[#181C20] block mb-1">Parent / Guardian Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.parentName}
                            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                            placeholder="Enter parent or guardian full name"
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#181C20] block mb-1">Student Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                            placeholder="Enter student's full name"
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-semibold text-[#181C20] block mb-1">Grade Applying For *</label>
                            <select
                              value={formData.grade}
                              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                              className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                            >
                              <option value="Nursery">Nursery</option>
                              <option value="Junior KG">Junior KG</option>
                              <option value="Senior KG">Senior KG</option>
                              <option value="Class 1">Class 1</option>
                              <option value="Class 2">Class 2</option>
                              <option value="Class 3">Class 3</option>
                              <option value="Class 4">Class 4</option>
                              <option value="Class 5">Class 5</option>
                              <option value="Class 6">Class 6</option>
                              <option value="Class 7">Class 7</option>
                              <option value="Class 8">Class 8</option>
                              <option value="Class 9">Class 9</option>
                              <option value="Class 10">Class 10</option>
                              <option value="Class 11 Arts">Class 11 (Arts)</option>
                              <option value="Class 11 Commerce">Class 11 (Commerce)</option>
                              <option value="Class 11 Science">Class 11 (Science)</option>
                              <option value="Class 12 Arts">Class 12 (Arts)</option>
                              <option value="Class 12 Commerce">Class 12 (Commerce)</option>
                              <option value="Class 12 Science">Class 12 (Science)</option>
                            </select>
                          </div>
                          <div>
                            <label className="font-semibold text-[#181C20] block mb-1">Phone Number *</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="Enter 10-digit mobile number"
                              className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-[#181C20] block mb-1">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter parent email address"
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#181C20] block mb-1">Any Specific Queries</label>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Enquiry details or queries regarding admissions..."
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 bg-[#DF711B] hover:bg-[#C8652D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                        >
                          <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                          <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'guidelines' && (
                  <div className="space-y-4">
                    <div className="text-xs text-[#4A5568] bg-[#FAF6EF] p-4 rounded-xl border border-[#E7E2D8] space-y-1.5 leading-relaxed">
                      <strong className="text-[#181C20] block font-cinzel text-xs font-bold">Admission Framework 2026-27</strong>
                      <span>Admissions are conducted strictly based on merit, seat availability, and CBSE age norms. Chinmaya Vidyalaya Tarapur maintains spacious classrooms with capacity seating over 40 students under personalized faculty care.</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] space-y-3 shadow-sm">
                      <h4 className="font-cinzel font-bold text-xs text-[#181C20] uppercase tracking-wider border-b border-[#E7E2D8] pb-2">
                        Age Eligibility Criteria (as of 31st July)
                      </h4>
                      <ul className="text-xs text-[#4A5568] space-y-2">
                        <li className="flex items-center justify-between">
                          <span className="font-medium text-[#181C20]">Nursery</span>
                          <span className="font-mono text-[#DF711B] font-bold">3 Years Complete</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="font-medium text-[#181C20]">Junior KG</span>
                          <span className="font-mono text-[#DF711B] font-bold">4 Years Complete</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="font-medium text-[#181C20]">Senior KG</span>
                          <span className="font-mono text-[#DF711B] font-bold">5 Years Complete</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="font-medium text-[#181C20]">Class I</span>
                          <span className="font-mono text-[#DF711B] font-bold">6 Years Complete</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] space-y-2.5 shadow-sm">
                      <h4 className="font-cinzel font-bold text-xs text-[#181C20] uppercase tracking-wider border-b border-[#E7E2D8] pb-2">
                        Required Documents Checklist
                      </h4>
                      <ul className="text-xs text-[#4A5568] space-y-1.5 font-light">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Original & self-attested Birth Certificate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Previous School Transfer Certificate (Class II onwards)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Latest Report Card / Progress Record</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>3 recent passport-size student photographs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Aadhar Card of student and parents / guardian</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <a
                        href="/about/enrollment"
                        onClick={onClose}
                        className="block w-full py-2.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-center text-xs font-bold rounded-xl transition-colors shadow-sm"
                      >
                        Detailed Enrolment & Admission Guidelines
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Contact Footnote */}
              <div className="p-4 bg-[#F7F3EB] border-t border-[#E7E2D8] text-xs flex items-center justify-between text-[#4A5568] pb-[max(1rem,env(safe-area-inset-bottom))]">
                <a
                  href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
                  className="flex items-center gap-1.5 font-medium text-[#181C20] hover:text-[#DF711B] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
                  <span>Office: <strong>{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</strong></span>
                </a>
                <span className="text-[11px] font-mono text-slate-500">Mon - Sat: 8 AM - 4 PM</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Viewer Modal */}
      {viewingDoc && (
        <DocumentViewerModal
          document={viewingDoc}
          onClose={() => setViewingDoc(null)}
          allowDownload={viewingDoc.downloadable}
        />
      )}
    </>
  );
};
