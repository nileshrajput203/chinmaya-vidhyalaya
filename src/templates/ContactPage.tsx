import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CONTACT_DETAILS } from '../data/contact';
import { SCHOOL_IMAGES } from '../data/images';
import { formService } from '../services/formService';
import { ContactEnquiry } from '../types/forms';
import { GoogleMapSection } from '../components/maps/GoogleMapSection';

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

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus({
        success: true,
        message: result.message || 'Your message has been sent successfully to the school administration.',
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      setSubmitStatus({
        success: false,
        message: result.error || result.message || 'Failed to send message. Please verify your details and try again.',
      });
    }
  };

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title="Contact Administration" subtitle="Get in touch with Chinmaya Vidyalaya Tarapur for official inquiries, admissions support, and campus visits" badge="Reach Us" />
      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Address Card */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl space-y-6 shadow-card">
            <h2 className="font-cinzel font-bold text-[#181C20] text-2xl border-b border-[#E7E2D8] pb-3 uppercase tracking-wider">
              Campus Details & Location
            </h2>

            <div className="space-y-5 text-xs text-[#181C20]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DF711B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#181C20]">Postal Address</strong>
                  <span className="text-[#4A5568] leading-relaxed">{CONTACT_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#DF711B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#181C20]">Telephone Desk</strong>
                  {CONTACT_DETAILS.phones.map((p, i) => (
                    <div key={i} className="text-[#4A5568]">
                      {p.label}: <a href={`tel:${p.number}`} className="font-semibold text-[#181C20] hover:text-[#DF711B] font-mono">{p.number}</a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#DF711B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#181C20]">Official Email Desk</strong>
                  {CONTACT_DETAILS.emails.map((e, i) => (
                    <div key={i} className="text-[#4A5568]">
                      {e.label}: <a href={`mailto:${e.email}`} className="font-semibold text-[#181C20] hover:text-[#DF711B] font-mono">{e.email}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official CBSE Badge */}
            <div className="bg-[#F7F3EB] p-4 rounded-2xl border border-[#E7E2D8] flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[#4A5568]">CBSE Affiliation No:</span>
                <strong className="block text-[#181C20] font-bold">{CONTACT_DETAILS.affiliationNo}</strong>
              </div>
              <div className="text-right">
                <span className="text-[#4A5568]">U-DISE Code:</span>
                <strong className="block text-[#181C20] font-bold">{CONTACT_DETAILS.udiseNo}</strong>
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
        </motion.div>

        {/* Right: Interactive Contact Form with Direct Email Redirection */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          className="lg:col-span-6 bg-white border border-[#E7E2D8] p-8 md:p-10 rounded-3xl shadow-card space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#DF711B]" />
              <span className="text-[11px] font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                Direct Portal Submission
              </span>
            </div>
            <h2 className="font-cinzel font-bold text-[#181C20] text-2xl md:text-3xl mb-1 uppercase tracking-tight">
              Send an Enquiry
            </h2>
            <p className="text-xs text-[#4A5568] font-light">
              Submit your inquiry below. Our administrative team will review your message and reach out promptly.
            </p>
          </div>

          {submitStatus && (
            <div className={`p-5 rounded-2xl border text-xs space-y-2 ${
              submitStatus.success 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${
                  submitStatus.success ? 'text-emerald-600' : 'text-red-600'
                }`} />
                <div>
                  <span className="font-bold block text-sm">
                    {submitStatus.success ? 'Message Sent Successfully' : 'Delivery Notice'}
                  </span>
                  <p className="font-normal mt-0.5 leading-relaxed">{submitStatus.message}</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              role="status"
              className={`fixed right-4 bottom-24 lg:bottom-6 z-50 max-w-sm rounded-2xl text-white px-4 py-3 shadow-2xl border flex items-start gap-2.5 ${
                submitStatus.success 
                  ? 'bg-[#181818] border-emerald-500/50' 
                  : 'bg-[#181818] border-red-500/50'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${
                submitStatus.success ? 'text-emerald-400' : 'text-red-400'
              }`} />
              <div>
                <strong className="block text-xs font-bold">
                  {submitStatus.success ? 'Message Delivered' : 'Delivery Alert'}
                </strong>
                <span className="block text-[11px] text-white/75 mt-0.5">{submitStatus.message}</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#181C20] mb-1 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#DF711B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#181C20] mb-1 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#DF711B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#181C20] mb-1 uppercase tracking-wider">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9322054713"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#DF711B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#181C20] mb-1 uppercase tracking-wider">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="General enquiry, admissions, certificates, TC..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#DF711B]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#181C20] mb-1 uppercase tracking-wider">Message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your enquiry message here..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#DF711B]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#181818] hover:bg-[#DF711B] text-white font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#DF711B]" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Campus Google Map & Navigation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <GoogleMapSection />
      </div>
    </div>
  );
};
