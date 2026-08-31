import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CONTACT_DETAILS } from '../data/contact';
import { SCHOOL_IMAGES } from '../data/images';
import { formService } from '../services/formService';
import { ContactEnquiry } from '../types/forms';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactEnquiry>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await formService.submitContact(formData);
    setSubmitStatus(result);
    setIsSubmitting(false);

    if (result.success) {
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title="Contact Administration" subtitle="Get in touch with Chinmaya Vidyalaya Tarapur for official inquiries, admissions support, and campus visits" badge="Reach Us" />
      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Address Card */}
        <div className="lg:col-span-6 space-y-8">
          <div className="bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl space-y-6 shadow-card">
            <h2 className="font-cinzel font-bold text-[#0B1D30] text-2xl border-b border-[#E7E2D8] pb-3 uppercase tracking-wider">
              Campus Details & Location
            </h2>

            <div className="space-y-5 text-xs text-[#181C20]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D97745] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#0B1D30]">Postal Address</strong>
                  <span className="text-[#4A5568] leading-relaxed">{CONTACT_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D97745] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#0B1D30]">Telephone Desk</strong>
                  {CONTACT_DETAILS.phones.map((p, i) => (
                    <div key={i} className="text-[#4A5568]">
                      {p.label}: <a href={`tel:${p.number}`} className="font-semibold text-[#0B1D30] hover:text-[#D97745] font-mono">{p.number}</a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D97745] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#0B1D30]">Email Desks</strong>
                  {CONTACT_DETAILS.emails.map((e, i) => (
                    <div key={i} className="text-[#4A5568]">
                      {e.label}: <a href={`mailto:${e.email}`} className="font-semibold text-[#0B1D30] hover:text-[#D97745] font-mono">{e.email}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official CBSE Badge */}
            <div className="bg-[#F7F3EB] p-4 rounded-2xl border border-[#E7E2D8] flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[#4A5568]">CBSE Affiliation No:</span>
                <strong className="block text-[#0B1D30] font-bold">{CONTACT_DETAILS.affiliationNo}</strong>
              </div>
              <div className="text-right">
                <span className="text-[#4A5568]">U-DISE Code:</span>
                <strong className="block text-[#0B1D30] font-bold">{CONTACT_DETAILS.udiseNo}</strong>
              </div>
            </div>
          </div>

          {/* Integrated Campus Visual */}
          <div className="border border-[#E7E2D8] bg-white p-2 rounded-3xl shadow-card overflow-hidden">
            <img
              src={SCHOOL_IMAGES.CAMPUS_HERO}
              alt="Chinmaya Vidyalaya Tarapur Main Building"
              className="w-full h-64 object-cover rounded-2xl"
            />
            <div className="p-3 text-xs text-[#4A5568] text-center font-medium font-sans">
              Vidyalaya Main Academic Complex | Vidyanagar, Boisar 401501
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-6 bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl shadow-card space-y-6">
          <div>
            <h2 className="font-cinzel font-bold text-[#0B1D30] text-2xl md:text-3xl mb-1 uppercase tracking-tight">
              Send an Enquiry
            </h2>
            <p className="text-xs text-[#4A5568] font-light">
              Fill out the form below and our administrative office will respond to your inquiry promptly.
            </p>
          </div>

          {submitStatus && (
            <div className={`p-4 rounded-2xl text-xs flex items-start gap-2.5 ${submitStatus.success ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' : 'bg-rose-50 text-rose-900 border border-rose-300'}`}>
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              <span className="font-medium">{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#0B1D30] mb-1 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#D97745]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0B1D30] mb-1 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#D97745]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B1D30] mb-1 uppercase tracking-wider">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9322054713"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#D97745]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0B1D30] mb-1 uppercase tracking-wider">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="General enquiry, admissions, certificates..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#D97745]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0B1D30] mb-1 uppercase tracking-wider">Message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your enquiry message here..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#D97745]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#0B1D30] hover:bg-[#D97745] text-white font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D97745]" />
                  <span>Submit Inquiry Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
