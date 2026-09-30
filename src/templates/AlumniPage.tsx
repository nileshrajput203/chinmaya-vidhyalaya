import React, { useState } from 'react';
import { 
  GraduationCap, Users, 
  Send, CheckCircle2, Sparkles, MapPin, 
  Mail, Phone, Calendar, Heart 
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useToast } from '../context/ToastContext';
import { OFFICIAL_SCHOOL_INFO } from '../data/school';

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
    willingToMentor: true,
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showSuccess(
        'Alumni Registration Submitted!',
        'Thank you for reconnecting with Chinmaya Vidyalaya Tarapur. You are now part of our official Alumni Directory.'
      );
    }, 400);
  };

  const alumniSpotlights = [
    {
      name: "Rohan V. Sharma",
      batch: "Class of 2008",
      role: "Lead Systems Architect, Bangalore",
      quote: "The discipline, Gita chanting, and rational inquiry instilled during morning assemblies at Tarapur continue to be my strongest anchor in executive leadership.",
      field: "Technology & Engineering"
    },
    {
      name: "Dr. Ananya P. Kulkarni",
      batch: "Class of 2012",
      role: "Consultant Physician & Researcher, Mumbai",
      quote: "Our teachers at Chinmaya weren't just educators; they were mentors who nurtured ethical empathy alongside rigorous science. That foundation made me the doctor I am.",
      field: "Medicine & Healthcare"
    },
    {
      name: "Prateek Deshmukh",
      batch: "Class of 2016",
      role: "Civil Services Officer & Public Administrator",
      quote: "The third pillar of CVP—Patriotism and Civic Duty—inspired me to serve our country. Chinmaya Vidyalaya taught us to dream beyond personal gain for societal progress.",
      field: "Public Administration"
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#181C20] pb-24 font-sans select-none">
      <Breadcrumb items={[{ label: "Alumni" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Institutional Legacy & Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl shadow-xs text-center space-y-1">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">First Batch</span>
            <div className="font-cinzel text-3xl font-extrabold text-[#181C20]">2004–05</div>
            <p className="text-[11px] text-slate-500">Inaugural AISSE Class X</p>
          </div>

          <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl shadow-xs text-center space-y-1">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">Graduates</span>
            <div className="font-cinzel text-3xl font-extrabold text-[#181C20]">2,500+</div>
            <p className="text-[11px] text-slate-500">Alumni Worldwide</p>
          </div>

          <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl shadow-xs text-center space-y-1">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">Board Record</span>
            <div className="font-cinzel text-3xl font-extrabold text-[#181C20]">100%</div>
            <p className="text-[11px] text-slate-500">First-Class Pass Tradition</p>
          </div>

          <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl shadow-xs text-center space-y-1">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">Global Reach</span>
            <div className="font-cinzel text-3xl font-extrabold text-[#181C20]">15+ Countries</div>
            <p className="text-[11px] text-slate-500">Professionals & Researchers</p>
          </div>
        </div>

        {/* Association Pillars Grid */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold block">
              ALUMNI ENGAGEMENT & ENGAGED FELLOWSHIP
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
              Giving Back to Your Alma Mater
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E7E2D8] p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7DF] text-[#DF711B] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Student Mentorship</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Guide Class IX and X students through career paths, college entrance choices, and personal experience in competitive exams like JEE, NEET, and UPSC.
              </p>
            </div>

            <div className="bg-white border border-[#E7E2D8] p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FB] text-[#0B1E34] flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Annual Homecoming</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Reconnect with classmates, retrace memories in the school courtyard, and meet revered retired and serving faculty members during our winter reunion.
              </p>
            </div>

            <div className="bg-white border border-[#E7E2D8] p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7DF] text-[#DF711B] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-lg text-[#181C20]">Guest Masterclasses</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Conduct technical workshops, entrepreneurial discussions, and artistic sessions sharing industry knowledge directly with high school learners.
              </p>
            </div>
          </div>
        </div>

        {/* Alumni Spotlights */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold block">
              TESTIMONIALS & VOICES
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
              Reflections from Vidyalaya Graduates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alumniSpotlights.map((alum, idx) => (
              <div key={idx} className="bg-white border border-[#E7E2D8] p-6 rounded-2xl space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FAF3E8] text-[#DF711B] rounded-full inline-block">
                    {alum.field}
                  </span>
                  <blockquote className="font-serif italic text-xs sm:text-sm text-slate-700 leading-relaxed">
                    "{alum.quote}"
                  </blockquote>
                </div>
                <div className="pt-3 border-t border-[#E7E2D8] space-y-0.5">
                  <h4 className="font-cinzel font-bold text-sm text-[#181C20]">{alum.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{alum.batch}</span>
                    <span className="text-slate-400">• {alum.role.split(',')[1] || alum.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Registration Form Section */}
        <div id="register" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-28">
          
          {/* Left Form: Register with Alumni Network */}
          <div className="lg:col-span-8 bg-white border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl shadow-card space-y-6">
            <div className="border-b border-[#E7E2D8] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DF711B] font-bold block">
                OFFICIAL REGISTRY ENROLLMENT
              </span>
              <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] tracking-tight mt-1">
                Alumni Registration Form
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Keep in touch with your alma mater, receive event invitations, and help mentor the next generation of Chinmaya scholars.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-[#FFF9F2] border-2 border-[#DF711B]/40 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#DF711B] mx-auto" />
                <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
                  Registration Recorded Successfully
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Hari Om! Thank you for staying connected. We have recorded your alumni profile in our database and will keep you informed of upcoming events and reunions.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-5 py-2.5 bg-[#181C20] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-[#DF711B] transition-colors"
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
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                      placeholder="Class X passing year (YYYY)"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                      placeholder="Enter email address"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                      placeholder="Current city & country"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                      placeholder="Current profession or designation"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                    placeholder="Share your fondest memory at Chinmaya Vidyalaya or how you would like to help current students..."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="willingToMentor"
                    checked={formData.willingToMentor}
                    onChange={(e) => setFormData({ ...formData, willingToMentor: e.target.checked })}
                    className="w-4 h-4 text-[#DF711B] border-slate-300 rounded focus:ring-[#DF711B]"
                  />
                  <label htmlFor="willingToMentor" className="text-xs text-slate-700 font-medium">
                    I am willing to mentor current Vidyalaya students or deliver guest sessions.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-99"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting Details...' : 'Submit Alumni Profile'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Information Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF3E8] border border-[#FDE49C] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-[#DF711B]">
                <GraduationCap className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Alumni Relations Office
                </span>
              </div>
              <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                Stay Connected
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                If you are planning an alumni batch meet or want to visit the campus during working hours, please notify our administrative desk in advance.
              </p>
              <div className="space-y-2 pt-2 border-t border-[#E7E2D8] text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                  <a href={`mailto:${OFFICIAL_SCHOOL_INFO.contact.email[0]}`} className="hover:text-[#DF711B] underline truncate">
                    {OFFICIAL_SCHOOL_INFO.contact.email[0]}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
                  <span>02525-272044 / 270724</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                  <span className="text-[11px] font-sans leading-tight">
                    Chinmaya Vidyalaya, Behind Post Office, Boisar, Tarapur, Maharashtra 401501
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E7E2D8] p-6 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#0B1E34]">
                <Heart className="w-4 h-4 text-[#DF711B]" />
                <h4 className="font-cinzel font-bold text-sm text-[#181C20]">Gurudev's Blessing</h4>
              </div>
              <blockquote className="font-cinzel text-xs italic text-slate-700 leading-relaxed">
                "Keep Smiling! Whatever you do, do it with love, dedication, and joy. You are the ambassadors of Chinmaya values in the world."
              </blockquote>
              <span className="text-[10px] font-mono text-slate-400 block pt-1">
                — Param Pujya Swami Chinmayananda
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
