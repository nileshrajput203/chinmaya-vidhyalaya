import React, { useState } from 'react';
import { 
  GraduationCap, 
  Send, CheckCircle2, 
  Mail, Phone, MapPin, 
  ArrowUpRight
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useToast } from '../context/ToastContext';
import { OFFICIAL_SCHOOL_INFO } from '../data/school';
import { formService } from '../services/formService';

interface AlumniFormData {
  fullName: string;
  batchYear: string;
  email: string;
  phone: string;
  currentCity: string;
  profession: string;
  organization: string;
  willingToMentor: boolean;
  message: string;
}


interface AlumniEventBlog {
  id: string;
  date: string;
  title: string;
  image: string;
  category: string;
  link?: string;
}


// Temporary empty array; add new alumni events & news here when updated
const ALUMNI_EVENTS_NEWS: AlumniEventBlog[] = [];

export const AlumniPage: React.FC = () => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState<AlumniFormData>({
    fullName: '',
    batchYear: '',
    email: '',
    phone: '',
    currentCity: '',
    profession: '',
    organization: '',
    willingToMentor: false,
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!formData.fullName.trim() || /\d/.test(formData.fullName) || !nameRegex.test(formData.fullName.trim()) || formData.fullName.trim().length < 2) {
      alert('Please enter a valid full name containing only letters (no numbers).');
      return;
    }
    setIsSubmitting(true);

    try {
      const result = await formService.submitAlumni(formData);
      setIsSubmitting(false);

      if (result.success) {
        setIsSubmitted(true);
        showSuccess(
          'Alumni Registration Submitted!',
          'Thank you for reconnecting with Chinmaya Vidyalaya Tarapur. Your registration has been delivered to the Alumni Relations Desk.'
        );
      } else {
        alert(result.message || 'Submission failed. Please check your network and try again.');
      }
    } catch {
      setIsSubmitting(false);
      alert('Unable to submit alumni registration. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }} className="text-[#181C20] pb-24 font-sans select-none">
      <Breadcrumb items={[{ label: "Alumni" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* ==================================================================
            TOP SECTION: REGISTRATION FORM ON TOP + METRICS & CONTACT
            ================================================================== */}
        <div id="register" className="space-y-8">
          
          {/* Header Title strip */}
          <div className="border-b border-slate-200 pb-4">
            <span
              style={{ color: 'var(--color-primary)' }}
              className="text-xs font-mono uppercase tracking-[0.25em] font-bold block"
            >
              CHINMAYA VIDYALAYA TARAPUR ALUMNI NETWORK
            </span>
            <h1
              style={{ color: 'var(--color-text)' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-tight mt-1"
            >
              RECONNECT WITH YOUR ALMA MATER
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
              Register in our official alumni registry to mentor high school students, receive reunion invitations, and stay connected with thousands of Vidyalaya graduates worldwide.
            </p>
          </div>



          {/* Form and Office Contact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* The Alumni Registration Form */}
            <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-none shadow-sm space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <span
                  style={{ color: 'var(--color-primary)' }}
                  className="text-[10px] font-mono uppercase tracking-widest font-bold block"
                >
                  OFFICIAL REGISTRY ENROLLMENT
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#181C20] tracking-tight uppercase mt-0.5">
                  Alumni Registration Form
                </h3>
              </div>

              {isSubmitted ? (
                <div className="bg-[#FFF9F2] border-2 border-[var(--color-primary)] p-8 rounded-none text-center space-y-3">
                  <CheckCircle2 style={{ color: 'var(--color-primary)' }} className="w-12 h-12 mx-auto" />
                  <h4 className="font-display font-bold text-xl text-[#181C20] uppercase">
                    Registration Recorded Successfully
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-sans">
                    Hari Om! Thank you for staying connected. We have recorded your alumni profile in our database and will keep you informed of upcoming alumni reunions, mentorship forums, and school events.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-dark-text)' }}
                    className="mt-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-none hover:bg-[var(--color-primary)] transition-colors cursor-pointer"
                  >
                    Submit Another Update
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value.replace(/[0-9]/g, '') })}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                        Class X Passing Year *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.batchYear}
                        onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                        placeholder="e.g. 2012"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                        Phone / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                        Current City & Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.currentCity}
                        onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                        placeholder="e.g. Mumbai, India"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                        Profession / Current Role
                      </label>
                      <input
                        type="text"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        placeholder="e.g. Software Engineer / Doctor"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                      Organization / University Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Organization or university name"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#181C20] font-bold mb-1">
                      Message / Memories / Mentorship Interests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your fondest memory at Chinmaya Vidyalaya or how you would like to support current students..."
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="willingToMentor"
                      checked={formData.willingToMentor}
                      onChange={(e) => setFormData({ ...formData, willingToMentor: e.target.checked })}
                      className="w-4 h-4 text-[var(--color-primary)] rounded-none focus:ring-[var(--color-primary)]"
                    />
                    <label htmlFor="willingToMentor" className="text-xs text-slate-700 font-medium">
                      I am willing to mentor current Vidyalaya students or deliver guest lectures.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-text)'
                    }}
                    className="w-full py-3.5 font-bold text-xs uppercase tracking-wider rounded-none transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting Details...' : 'Submit Alumni Profile'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Information & Office Card */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white border-2 border-[var(--color-primary)] p-6 rounded-none space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--color-primary)]">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Alumni Relations Office
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg text-[#181C20] uppercase">
                  Stay Connected
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Planning a batch reunion or campus visit during working hours? Please notify our administrative team in advance to arrange a guided walkthrough.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                    <a href={`mailto:${OFFICIAL_SCHOOL_INFO.contact.email[0]}`} className="hover:text-[var(--color-primary)] underline truncate">
                      {OFFICIAL_SCHOOL_INFO.contact.email[0]}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                    <span>02525-272044 / 270724</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <span className="text-[11px] font-sans leading-tight">
                      Chinmaya Vidyalaya, Behind Post Office, Boisar, Tarapur, Maharashtra 401501
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-none space-y-3 shadow-xs">
                <span style={{ color: 'var(--color-primary)' }} className="text-xs font-mono font-bold uppercase tracking-wider block">
                  Gurudev's Message to Alumni
                </span>
                <blockquote className="font-sans text-xs italic text-slate-700 leading-relaxed border-l-2 border-[var(--color-primary)] pl-3">
                  "Keep Smiling! Whatever you do, do it with love, dedication, and joy. You are the ambassadors of Chinmaya values in the world."
                </blockquote>
                <span className="text-[10px] font-mono text-slate-400 block pt-1">
 - Param Pujya Swami Chinmayananda
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================================
            BOTTOM SECTION: ALUMNI NEWS & EVENTS (Only rendered when items exist)
            ================================================================== */}
        {ALUMNI_EVENTS_NEWS.length > 0 && (
          <div className="space-y-8">
            {/* Centered Giant Crimson "NEWS" Heading */}
            <div className="text-center">
              <h2
                style={{ color: 'var(--color-primary)' }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-none m-0"
              >
                NEWS
              </h2>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-500 mt-2 font-semibold">
                ALUMNI EVENTS, REUNIONS & MILESTONES
              </p>
            </div>

            {/* 3×3 Grid of Event Cards matching the reference design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {ALUMNI_EVENTS_NEWS.map((event) => (
                <div
                  key={event.id}
                  style={{ borderColor: 'var(--color-primary)' }}
                  className="group border rounded-none bg-white overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:shadow-lg"
                >
                  {/* Top Image (aspect-[16/10]) */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 border-b border-[var(--color-primary)]">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono uppercase px-2 py-0.5 border border-white/20">
                      {event.category}
                    </div>
                  </div>

                  {/* Bottom Content: Date & Bold Crimson Title */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2">
                    <span
                      style={{ color: 'var(--color-primary)' }}
                      className="text-[11px] font-mono uppercase tracking-wider font-bold block"
                    >
                      {event.date}
                    </span>

                    <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-[#181C20] group-hover:text-[var(--color-primary)] transition-colors leading-snug line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-[var(--color-primary)] transition-colors">
                      <span>READ DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
