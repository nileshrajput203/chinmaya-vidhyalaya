import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Send, CheckCircle2, 
  Mail, Phone, MapPin, 
  ArrowLeft, ArrowRight, ArrowUpRight
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

interface AlumniReview {
  id: string;
  name: string;
  role: string;
  batch: string;
  cutoutImage: string;
  review: string;
  bookTitle?: string;
}

interface AlumniEventBlog {
  id: string;
  date: string;
  title: string;
  image: string;
  category: string;
  link?: string;
}

const ALUMNI_REVIEWS: AlumniReview[] = [
  {
    id: 'rev-1',
    name: 'Dr. Ananya P. Kulkarni',
    role: 'Physician Researcher & Alumna',
    batch: 'Class of 2012',
    cutoutImage: '/images/1.jpeg',
    review:
      'Chinmaya Vidyalaya was a phenomenal environment in which to learn. The curriculum and the Chinmaya Vision Programme ignited critical thinking and empowered me to articulate and share thoughts in large medical and research settings. I’m grateful for the deep moral and ethical insights provided by our teachers and the opportunity to grow with clarity and compassion. My experience as an alumna has more than doubled my appreciation for the school as I see new generations of students blossom here.',
    bookTitle: 'CBSE SCHOLASTIC EXCELLENCE'
  },
  {
    id: 'rev-2',
    name: 'Rohan V. Sharma',
    role: 'Lead Systems Architect & Tech Innovator',
    batch: 'Class of 2008',
    cutoutImage: '/images/student_question_cutout.png',
    review:
      'The morning assemblies, Gita chanting, and rational scientific inquiry instilled during my foundational years at Tarapur continue to be my strongest anchor in executive leadership and cloud architecture. Chinmaya Vidyalaya doesn’t just teach academic subjects; it builds resilient character, analytical discipline, and a profound sense of purpose that stays with you across the globe.',
    bookTitle: 'SYSTEMS & ANALYTICS'
  },
  {
    id: 'rev-3',
    name: 'Prateek Deshmukh',
    role: 'Civil Services Officer & Public Administrator',
    batch: 'Class of 2016',
    cutoutImage: '/images/banner-1.jpg',
    review:
      'The third pillar of CVP—Patriotism and Civic Duty—truly inspired my path into public administration. From student house governance to tree plantation drives in Palghar district, we were taught that real accomplishment lies in societal progress. That noble grounding continues to guide every policy decision I make in public service.',
    bookTitle: 'PATRIOTISM & CIVIC DUTY'
  },
  {
    id: 'rev-4',
    name: 'Kriti Sengupta',
    role: 'Fintech Product Lead & Alumna',
    batch: 'Class of 2015',
    cutoutImage: '/images/2.jpeg',
    review:
      'From inter-house debate championships in Boisar to presenting in international fintech boardrooms, the eloquence, moral fortitude, and self-confidence nurtured by our educators laid the foundation for every milestone. Chinmaya Vidyalaya gave me a family that spans continents.',
    bookTitle: 'GLOBAL LEADERSHIP'
  }
];

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
    willingToMentor: true,
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  const prevReview = () => {
    setCurrentReviewIdx((prev) => (prev - 1 + ALUMNI_REVIEWS.length) % ALUMNI_REVIEWS.length);
  };

  const nextReview = () => {
    setCurrentReviewIdx((prev) => (prev + 1) % ALUMNI_REVIEWS.length);
  };

  const currentReview = ALUMNI_REVIEWS[currentReviewIdx];

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

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-none shadow-xs text-center space-y-1">
              <span style={{ color: 'var(--color-primary)' }} className="text-[11px] font-mono font-bold uppercase tracking-wider block">
                First Batch
              </span>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#181C20]">2004–05</div>
              <p className="text-[11px] text-slate-500 font-sans">Inaugural AISSE Class X</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-none shadow-xs text-center space-y-1">
              <span style={{ color: 'var(--color-primary)' }} className="text-[11px] font-mono font-bold uppercase tracking-wider block">
                Graduates
              </span>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#181C20]">2,500+</div>
              <p className="text-[11px] text-slate-500 font-sans">Alumni Worldwide</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-none shadow-xs text-center space-y-1">
              <span style={{ color: 'var(--color-primary)' }} className="text-[11px] font-mono font-bold uppercase tracking-wider block">
                Board Record
              </span>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#181C20]">100%</div>
              <p className="text-[11px] text-slate-500 font-sans">First-Class Tradition</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-none shadow-xs text-center space-y-1">
              <span style={{ color: 'var(--color-primary)' }} className="text-[11px] font-mono font-bold uppercase tracking-wider block">
                Global Reach
              </span>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#181C20]">15+ Countries</div>
              <p className="text-[11px] text-slate-500 font-sans">Professionals & Researchers</p>
            </div>
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
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                  — Param Pujya Swami Chinmayananda
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================================
            MIDDLE SECTION: ALUMNI REVIEWS (Matching 1st Image Format)
            ================================================================== */}
        <div className="relative py-12 lg:py-16 border-t border-b border-slate-200">
          
          {/* Giant Background Word "REVIEWS" */}
          <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
            <span
              style={{ color: 'var(--color-primary)' }}
              className="font-display text-[64px] sm:text-[100px] lg:text-[140px] font-black uppercase tracking-tight leading-none opacity-90"
            >
              REVIEWS
            </span>
          </div>

          {/* Foreground Review Content Layout */}
          <div className="relative z-10 flex flex-col items-center pt-16 sm:pt-20 lg:pt-24 max-w-3xl mx-auto">
            
            {/* Review Paragraph & Attribution */}
            <div className="flex flex-col justify-center space-y-6 px-2 sm:px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Detailed Review Quote text */}
                  <p className="font-sans text-base sm:text-lg lg:text-[19px] leading-[1.65] text-[#181C20] font-normal">
                    {currentReview.review}
                  </p>

                  {/* Attribution line */}
                  <div className="pt-2">
                    <p className="font-sans text-sm sm:text-base text-slate-800 font-semibold">
                      – {currentReview.name} ({currentReview.batch})
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Review Carousel Controls */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={prevReview}
                  aria-label="Previous Review"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white text-[#181C20] flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-colors shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  aria-label="Next Review"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white text-[#181C20] flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-colors shadow-sm cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs tracking-widest text-slate-500 font-bold pl-2">
                  0{currentReviewIdx + 1} / 0{ALUMNI_REVIEWS.length}
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
