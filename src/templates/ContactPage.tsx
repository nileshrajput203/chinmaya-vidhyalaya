import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
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
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string; mailtoUrl?: string } | null>(null);

  const generateMailtoUrl = (data: ContactEnquiry) => {
    const schoolEmail = "cvtarapur@chinmayamission.com";
    const subject = encodeURIComponent(`[Website Enquiry] ${data.subject || 'Inquiry from ' + data.fullName}`);
    const body = encodeURIComponent(
      `Official Inquiry Details:\n` +
      `--------------------------------------\n` +
      `Full Name: ${data.fullName}\n` +
      `Email Address: ${data.email}\n` +
      `Phone Number: ${data.phone}\n` +
      `Subject: ${data.subject}\n\n` +
      `Message:\n${data.message}\n` +
      `--------------------------------------\n` +
      `Sent via Chinmaya Vidyalaya Tarapur Official Portal`
    );
    return `mailto:${schoolEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const mailtoLink = generateMailtoUrl(formData);

    // Call backend service asynchronously
    await formService.submitContact(formData);

    // Trigger email redirection directly
    try {
      window.location.href = mailtoLink;
    } catch {
      console.log("Auto-mailto redirection dispatched");
    }

    setSubmitStatus({
      success: true,
      message: 'Your inquiry has been formulated. Redirecting to your email client...',
      mailtoUrl: mailtoLink,
    });
    setIsSubmitting(false);
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
                  <strong className="block font-bold text-[#0B1D30]">Official Email Desk</strong>
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

        {/* Right: Interactive Contact Form with Direct Email Redirection */}
        <div className="lg:col-span-6 bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl shadow-card space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D97745]" />
              <span className="text-[11px] font-mono font-bold text-[#D97745] uppercase tracking-wider">
                Direct Email Redirection
              </span>
            </div>
            <h2 className="font-cinzel font-bold text-[#0B1D30] text-2xl md:text-3xl mb-1 uppercase tracking-tight">
              Send an Enquiry
            </h2>
            <p className="text-xs text-[#4A5568] font-light">
              Submit your enquiry below to automatically redirect to your email client addressed directly to the administrative desk (<code className="text-[#D97745] font-mono">cvtarapur@chinmayamission.com</code>).
            </p>
          </div>

          {submitStatus && (
            <div className="p-5 rounded-2xl bg-[#FAF3E8] border border-[#E7E2D8] text-xs space-y-3">
              <div className="flex items-start gap-2.5 text-[#0B1D30]">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#D97745]" />
                <div>
                  <span className="font-bold block text-sm">Enquiry Ready to Send</span>
                  <p className="text-[#4A5568] font-light mt-0.5">{submitStatus.message}</p>
                </div>
              </div>

              {submitStatus.mailtoUrl && (
                <div className="pt-2 border-t border-[#E7E2D8]">
                  <a
                    href={submitStatus.mailtoUrl}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B1D30] hover:bg-[#D97745] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-[#D97745]" />
                    <span>Open Email Client Directly</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              )}
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
                placeholder="General enquiry, admissions, certificates, TC..."
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
                <span>Redirecting to Email...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D97745]" />
                  <span>Submit & Redirect to Email</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
