import React, { useState } from 'react';
import { 
  Download, 
  Send, 
  CheckCircle2, 
  Award, 
  Heart, 
  GraduationCap, 
  BookOpen, 
  FileText
} from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-Time' | 'Part-Time';
  qualifications: string;
  experience: string;
  description: string;
  deadline: string;
}

export const CareersPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'PGT / TGT Mathematics & Science',
    qualification: '',
    experience: '',
    message: ''
  });

  const jobOpenings: JobOpening[] = [
    {
      id: 'job-1',
      title: 'PGT / TGT Mathematics & Science',
      department: 'Secondary Wing (Std VI to X)',
      type: 'Full-Time',
      qualifications: 'M.Sc / B.Sc with B.Ed (CBSE recognized)',
      experience: 'Minimum 2 to 3 years teaching experience in CBSE curriculum',
      description: 'Facilitate conceptual and analytical inquiry in Mathematics and Physical Sciences, laboratory demonstration, and preparing students for CBSE AISSE examinations.',
      deadline: 'Rolling Basis'
    },
    {
      id: 'job-2',
      title: 'TGT English Literature & Grammar',
      department: 'Middle & Secondary Wing',
      type: 'Full-Time',
      qualifications: 'M.A / B.A in English with B.Ed',
      experience: '2+ years experience in scholastic English and elocution mentoring',
      description: 'Instill deep linguistic command, creative writing, debating, and speech mentorship aligned with NCERT standards.',
      deadline: 'Rolling Basis'
    },
    {
      id: 'job-3',
      title: 'PRT / TGT Sanskrit & Value Education',
      department: 'All Wings (Std I to VIII)',
      type: 'Full-Time',
      qualifications: 'M.A / B.A in Sanskrit or Acharya with B.Ed',
      experience: '1+ years experience in Sanskrit teaching and Vedic recitation',
      description: 'Teaching Sanskrit language, guiding daily morning assembly prayers, Gita chanting, and student moral enrichment under CVP.',
      deadline: 'Rolling Basis'
    },
    {
      id: 'job-4',
      title: 'Primary Mother Teacher (Std I to IV)',
      department: 'Primary Wing',
      type: 'Full-Time',
      qualifications: 'Graduate with D.El.Ed / B.Ed / Montessori certification',
      experience: 'Experience with activity-oriented and playful learning',
      description: 'Nurture foundation literacy, numeracy, experiential science, and emotional well-being with small group student mentorship.',
      deadline: 'Rolling Basis'
    },
    {
      id: 'job-5',
      title: 'Science & STEM Laboratory Assistant',
      department: 'Laboratories & Infrastructure',
      type: 'Full-Time',
      qualifications: 'B.Sc / Diploma in Chemistry, Physics or Instrumentation',
      experience: 'Prior experience maintaining school or collegiate laboratories',
      description: 'Managing lab equipment inventory, chemical safety protocols, optics benches, and assisting faculty during practical hours.',
      deadline: 'Rolling Basis'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#181C20] pb-24 font-sans">
      <PageHero 
        title="Careers & Faculty Opportunities" 
        subtitle="Shape young minds in an inspiring, value-centric institution grounded in the noble vision of Pujya Gurudev Swami Chinmayananda." 
        badge="Join Our Mission" 
      />
      <Breadcrumb items={[{ label: "Careers" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Culture & Benefits Matrix */}
        <div id="pedagogic-training" className="grid grid-cols-1 md:grid-cols-4 gap-4 scroll-mt-28">
          {[
            {
              icon: GraduationCap,
              title: "Pedagogic Training",
              desc: "Continuous enrichment programs conducted by the Chinmaya Education Cell (CCMT), Coimbatore."
            },
            {
              icon: Award,
              title: "CBSE Pay Scale",
              desc: "Competitive remuneration, Provident Fund, medical leave, and statutory benefits as per norms."
            },
            {
              icon: Heart,
              title: "Values-Based Environment",
              desc: "A serene, respectful campus culture where teachers are revered as Acharyas and spiritual guides."
            },
            {
              icon: BookOpen,
              title: "Scholastic Distinction",
              desc: "High-performing students with 100% CBSE AISSE pass record and dedicated parental community."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E7E2D8] p-5 space-y-2 shadow-xs">
              <item.icon className="w-5 h-5 text-[#DF711B]" />
              <h4 className="font-display font-bold text-sm text-[#181818] uppercase tracking-tight">
                {item.title}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Application Form Banner */}
        <div className="bg-[#181818] text-white p-6 sm:p-8 border border-[#181818] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                OFFICIAL RECRUITMENT APPLICATION
              </span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
              Download Application Form for the Post of Teacher
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Candidates can download our prescribed application template (.docx), fill in their academic and professional credentials, and submit it directly to the school office or via email.
            </p>
          </div>

          <a
            href="/images/application-form-for-the-post-of-teacher.docx"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#DF711B] hover:bg-[#c85f12] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Form (.DOCX)</span>
          </a>
        </div>

        {/* Current Vacancies Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#D5CEC2] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DF711B] font-bold block">
                CURRENT RECRUITMENT • ACADEMIC YEAR 2025-26
              </span>
              <h3 className="font-display font-black text-2xl text-[#181818] uppercase tracking-tight m-0 mt-0.5">
                Current Open Positions
              </h3>
            </div>
            <span className="text-xs font-mono text-[#777777]">
              {jobOpenings.length} Active Vacancies
            </span>
          </div>

          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div 
                key={job.id}
                className="bg-white border border-[#E7E2D8] p-6 hover:border-[#DF711B] transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DF711B] bg-[#FFF0E6] border border-[#DF711B]/30 px-2.5 py-0.5">
                      {job.type}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#555555] bg-[#F3EFE6] px-2.5 py-0.5">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] ml-auto lg:ml-0">
                      Deadline: {job.deadline}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-lg text-[#181818] uppercase tracking-tight">
                    {job.title}
                  </h4>

                  <p className="text-xs text-[#555555] leading-relaxed font-normal">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-[#F3EFE6]">
                    <div>
                      <strong className="text-[#181818] font-mono uppercase text-[10px] block">Eligibility:</strong>
                      <span className="text-[#555555]">{job.qualifications}</span>
                    </div>
                    <div>
                      <strong className="text-[#181818] font-mono uppercase text-[10px] block">Experience:</strong>
                      <span className="text-[#555555]">{job.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex lg:flex-col gap-2">
                  <a
                    href="#apply-form"
                    onClick={() => setFormData(prev => ({ ...prev, position: job.title }))}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#181818] hover:bg-[#DF711B] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors w-full sm:w-auto"
                  >
                    <span>Apply Online</span>
                  </a>
                  <a
                    href="/images/application-form-for-the-post-of-teacher.docx"
                    download
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FAF8F5] border border-[#D5CEC2] hover:border-[#DF711B] text-xs font-mono text-[#555555] hover:text-[#DF711B] transition-colors w-full sm:w-auto"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Form</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Application Form */}
        <div id="apply-form" className="bg-white border border-[#D5CEC2] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#E7E2D8] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#DF711B] font-bold block">
              INSTITUTIONAL RECRUITMENT • ONLINE DISPATCH
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#181818] uppercase tracking-tight mt-1 m-0">
              Submit Expression of Interest
            </h3>
            <p className="text-xs text-[#555555] mt-1">
              Interested candidates can submit their preliminary details below or email their CV directly to <strong className="text-[#181818]">chinmayatarapur@gmail.com</strong>.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#FFF7DF] border border-[#DF711B] p-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#DF711B] mx-auto" />
              <h4 className="font-display font-bold text-lg text-[#181818] uppercase">
                Application Received Successfully
              </h4>
              <p className="text-xs text-[#555555] max-w-md mx-auto">
                Thank you for applying to Chinmaya Vidyalaya Tarapur. Our Academic Selection Committee will review your credentials and contact shortlisted candidates for personal interviews and classroom demonstrations.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-4 py-2 bg-[#181818] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#DF711B] transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Smt. Radhika Sharma"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. radhika.sharma@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98234 56789"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                    Position Applied For *
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                  >
                    {jobOpenings.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                    <option value="Other Teaching / Administrative Position">Other Teaching / Administrative Position</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                    Highest Educational Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. M.Sc Chemistry + B.Ed (First Class)"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                    Total Teaching / Professional Experience *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 4 Years in CBSE Senior Secondary School"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#181818] font-bold mb-1">
                  Summary of Teaching Philosophy / Note
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief statement on your teaching methodology, co-curricular interests, and suitability for Chinmaya Vidyalaya..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CEC2] focus:border-[#DF711B] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-[#777777]">
                  * All fields marked with asterisk are mandatory.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#DF711B] hover:bg-[#c85f12] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
