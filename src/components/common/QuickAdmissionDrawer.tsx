import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

interface QuickAdmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAdmissionDrawer: React.FC<QuickAdmissionDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'forms' | 'enquiry' | 'disclosures'>('forms');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: 'Nursery',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1D30]/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FCFBF7] text-[#181C20] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-[#E7E2D8]"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-[#0B1D30] text-white flex items-center justify-between border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97745]" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#D97745]">
                    Admissions Open 2026-27
                  </span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Chinmaya Vidyalaya
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Selectors */}
            <div className="flex border-b border-[#E7E2D8] bg-[#F7F3EB] text-xs font-semibold">
              <button
                onClick={() => setActiveTab('forms')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                  activeTab === 'forms'
                    ? 'border-[#D97745] text-[#0B1D30] bg-white font-bold'
                    : 'border-transparent text-[#4A5568] hover:text-[#0B1D30]'
                }`}
              >
                Registration Forms
              </button>
              <button
                onClick={() => setActiveTab('enquiry')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                  activeTab === 'enquiry'
                    ? 'border-[#D97745] text-[#0B1D30] bg-white font-bold'
                    : 'border-transparent text-[#4A5568] hover:text-[#0B1D30]'
                }`}
              >
                Direct Enquiry
              </button>
              <button
                onClick={() => setActiveTab('disclosures')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                  activeTab === 'disclosures'
                    ? 'border-[#D97745] text-[#0B1D30] bg-white font-bold'
                    : 'border-transparent text-[#4A5568] hover:text-[#0B1D30]'
                }`}
              >
                Key Compliance
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'forms' && (
                <div className="space-y-4">
                  <div className="bg-[#FAF6EF] p-4 rounded-xl border border-[#E7E2D8] text-xs text-[#4A5568]">
                    <strong>Note:</strong> Class strength is capped at 40 students per section. Download and submit filled form at the administration office.
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: "Nursery Registration Form", file: "/images/nursery.pdf", size: "113 KB" },
                      { title: "Junior / Senior KG Registration Form", file: "/images/kg.pdf", size: "185 KB" },
                      { title: "Standard I to IX Registration Form", file: "/images/1to9.pdf", size: "79 KB" },
                      { title: "Teacher Application Form (Recruitment)", file: "/images/application-form-for-the-post-of-teacher.docx", size: "25 KB" },
                      { title: "Official Fee Structure (2024-25)", file: "/images/fees-structure.pdf", size: "43 KB" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-[#E7E2D8] flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#D97745] shrink-0" />
                          <div>
                            <h4 className="font-semibold text-xs text-[#0B1D30]">{item.title}</h4>
                            <span className="text-[11px] text-[#4A5568] font-mono">{item.size} • PDF Download</span>
                          </div>
                        </div>
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                        >
                          <Download className="w-3 h-3" />
                          <span>Get</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'enquiry' && (
                <div>
                  {formSubmitted ? (
                    <div className="py-12 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                      <h4 className="font-serif font-bold text-xl text-[#0B1D30]">Enquiry Submitted!</h4>
                      <p className="text-xs text-[#4A5568]">Our admissions office will reach out to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="font-semibold text-[#0B1D30] block mb-1">Parent / Guardian Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#D97745]"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#0B1D30] block mb-1">Student Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          placeholder="e.g. Aarav Sharma"
                          className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#D97745]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#0B1D30] block mb-1">Grade Applying For *</label>
                          <select
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#D97745]"
                          >
                            <option>Nursery</option>
                            <option>Junior KG</option>
                            <option>Senior KG</option>
                            <option>Class 1 - 5</option>
                            <option>Class 6 - 8</option>
                            <option>Class 9 - 10</option>
                            <option>Class 11 - 12</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-semibold text-[#0B1D30] block mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. 9822000000"
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#D97745]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#0B1D30] block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="parent@example.com"
                          className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#D97745]"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#0B1D30] block mb-1">Any Specific Queries</label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Ask about school bus routes, fees, or documents..."
                          className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#D97745]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#D97745] hover:bg-[#C8652D] text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Admission Enquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'disclosures' && (
                <div className="space-y-3">
                  {[
                    { title: "CBSE SARAS Portal Disclosure", file: "/images/cbse-saras-portal-mandatory-information.pdf" },
                    { title: "Building Safety Certificate", file: "/images/building-safety-certificate.pdf" },
                    { title: "Fire Safety Certificate", file: "/images/fire-safety-certificate.pdf" },
                    { title: "Water & Sanitation Clearance", file: "/images/water-health-and-sanitation-certificate.pdf" },
                    { title: "Recognition Certificate under RTE", file: "/images/recognition-certificate-under-rte.pdf" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium text-xs text-[#0B1D30]">{doc.title}</span>
                      </div>
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#D97745] hover:underline font-semibold"
                      >
                        View PDF
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Contact Footnote */}
            <div className="p-4 bg-[#F7F3EB] border-t border-[#E7E2D8] text-xs flex items-center justify-between text-[#4A5568]">
              <div className="flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#D97745]" />
                <span>Office: <strong>{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</strong></span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Mon - Sat: 8 AM - 4 PM</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
