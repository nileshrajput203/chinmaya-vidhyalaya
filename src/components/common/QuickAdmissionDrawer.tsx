import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Send, CheckCircle2, Phone, GraduationCap, Eye, Mail } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';
import { DocumentViewerModal } from '../documents/DocumentViewerModal';
import { SchoolDocument } from '../../types/documents';

interface QuickAdmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAdmissionDrawer: React.FC<QuickAdmissionDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'forms' | 'enquiry' | 'disclosures'>('forms');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedMailto, setSubmittedMailto] = useState<string | null>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const schoolEmail = "cvtarapur@chinmayamission.com";
    const subject = encodeURIComponent(`[Admission Enquiry 2026-27] Grade: ${formData.grade} - ${formData.studentName}`);
    const body = encodeURIComponent(
      `New Admission Inquiry:\n` +
      `--------------------------------------\n` +
      `Student Name: ${formData.studentName}\n` +
      `Parent/Guardian: ${formData.parentName}\n` +
      `Grade Applying For: ${formData.grade}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Email Address: ${formData.email}\n` +
      `Specific Queries / Message:\n${formData.message || 'None specified'}\n` +
      `--------------------------------------\n` +
      `Submitted via Chinmaya Vidyalaya Tarapur Portal`
    );
    const mailtoLink = `mailto:${schoolEmail}?subject=${subject}&body=${body}`;
    setSubmittedMailto(mailtoLink);
    setFormSubmitted(true);

    try {
      window.location.href = mailtoLink;
    } catch {
      console.log('Redirecting to mail client');
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
                  onClick={() => setActiveTab('disclosures')}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'disclosures'
                      ? 'border-[#DF711B] text-[#181C20] bg-white font-bold'
                      : 'border-transparent text-[#4A5568] hover:text-[#181C20]'
                  }`}
                >
                  Key Compliance (TC)
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
                        { title: "Teacher Application Form (Recruitment)", file: "/images/application-form-for-the-post-of-teacher.docx", size: "25 KB" },
                        { title: "Official Fee Structure (2024-25)", file: "/images/fees-structure.pdf", size: "43 KB" },
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
                        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                        <h4 className="font-cinzel font-bold text-xl text-[#181C20]">Enquiry Ready!</h4>
                        <p className="text-xs text-[#4A5568] max-w-xs mx-auto">
                          We have redirected you to your email client addressed to <code className="text-[#DF711B]">cvtarapur@chinmayamission.com</code>.
                        </p>
                        {submittedMailto && (
                          <div className="pt-2">
                            <a
                              href={submittedMailto}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                            >
                              <Mail className="w-4 h-4 text-white" />
                              <span>Open Email Application Directly</span>
                            </a>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="text-xs text-slate-500 hover:text-[#181C20] underline block mx-auto pt-4"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                        <div>
                          <label className="font-semibold text-[#181C20] block mb-1">Parent / Guardian Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.parentName}
                            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                            placeholder="e.g. Rajesh Sharma"
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
                            placeholder="e.g. Aarav Sharma"
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
                            <label className="font-semibold text-[#181C20] block mb-1">Phone Number *</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="e.g. 9822000000"
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
                            placeholder="parent@example.com"
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#181C20] block mb-1">Any Specific Queries</label>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Ask about school bus routes, fees, or documents..."
                            className="w-full p-2.5 bg-white border border-[#E7E2D8] rounded-lg focus:outline-none focus:border-[#DF711B]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Submit & Redirect to Email</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'disclosures' && (
                  <div className="space-y-3">
                    <div className="text-xs text-[#4A5568] bg-[#FAF6EF] p-3 rounded-xl border border-[#E7E2D8]">
                      All statutory disclosure documents and Transfer Certificates (TC) are provided in verified view-only mode per CBSE regulations.
                    </div>

                    {[
                      { title: "Sample Transfer Certificate (TC)", file: "/images/TC.jpg" },
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
                          <span className="font-medium text-xs text-[#181C20]">{doc.title}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setViewingDoc({
                            id: `drawer-disc-${idx}`,
                            title: doc.title,
                            category: 'mandatory-information',
                            fileUrl: doc.file,
                            uploadDate: '2024-04-01',
                            description: doc.title,
                            downloadable: false,
                          })}
                          className="text-xs text-[#DF711B] hover:underline font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Doc</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Contact Footnote */}
              <div className="p-4 bg-[#F7F3EB] border-t border-[#E7E2D8] text-xs flex items-center justify-between text-[#4A5568]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
                  <span>Office: <strong>{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</strong></span>
                </div>
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
