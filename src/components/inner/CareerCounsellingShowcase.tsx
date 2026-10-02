import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, CheckCircle2,
  Calendar, Phone, HelpCircle,
  BookOpen, Brain, Compass, GraduationCap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ────────────────────────────────────────────────────────
   Step / Roadmap Item Interface
   ──────────────────────────────────────────────────────── */

interface PathwayStep {
  step: string;
  title: string;
  badge: string;
  description: string;
  ctaText: string;
  icon: (props: { className?: string }) => React.ReactElement;
  details: string[];
}

const PATHWAY_STEPS: PathwayStep[] = [
  {
    step: "01",
    title: "Foundational Learning Diagnostics",
    badge: "Classes III – VIII",
    description: "Gentle diagnostic screening identifying cognitive strengths, learning patterns, and foundational literacy and numeracy competencies.",
    ctaText: "Diagnostic Framework",
    icon: ({ className }) => <BookOpen className={className} />,
    details: [
      "Diagnostic skill assessments identifying conceptual understanding vs. rote learning",
      "Individualized learning support and conceptual reinforcement plans",
      "Foundational study habit and concentration coaching for junior classes",
      "Constructive counsellor-parent developmental feedback sessions"
    ]
  },
  {
    step: "02",
    title: "Aptitude & Psychometric Profiling",
    badge: "Classes IX & X",
    description: "Standardized psychometric evaluations assessing multiple intelligences, vocational interests, and natural academic aptitudes.",
    ctaText: "Psychometric Profiling",
    icon: ({ className }) => <Brain className={className} />,
    details: [
      "Standardized multiple-intelligence and interest mapping framework",
      "Scientific evaluation of logical, verbal, spatial, and analytical aptitude",
      "Comprehensive student profile dossier shared with parents",
      "Individualized counselling sessions to build self-awareness and confidence"
    ]
  },
  {
    step: "03",
    title: "Class X Stream Selection Guidance",
    badge: "Class X Milestone",
    description: "Structured student and parent counselling sessions with senior educators to choose the optimal CBSE Class XI academic stream.",
    ctaText: "Stream Selection Guidance",
    icon: ({ className }) => <Compass className={className} />,
    details: [
      "Tripartite counselling conferences: Student, Parents, and Academic Counsellor",
      "Matching individual aptitude profile with CBSE senior secondary subject electives",
      "Demystifying career misconceptions across Science, Commerce, and Humanities",
      "Bridge orientation workshops before commencing Class XI studies"
    ]
  },
  {
    step: "04",
    title: "Senior Secondary Career Mentorship",
    badge: "Classes XI & XII",
    description: "Comprehensive guidance for competitive entrance examinations, university admissions, scholarship alerts, and future career pathways.",
    ctaText: "College & Career Roadmaps",
    icon: ({ className }) => <GraduationCap className={className} />,
    details: [
      "Structured prep roadmaps for JEE, NEET, CUET, NDA, CLAT, and CA Foundation",
      "University admission timelines, college selection guidance, and scholarship alerts",
      "Interactive alumni career circles and guest professional masterclasses",
      "Exam stress management, wellness counselling, and emotional resilience"
    ]
  }
];

export const CareerCounsellingShowcase: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [consultationBooked, setConsultationBooked] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    currentGrade: 'Class 10',
    contactNumber: '',
  });

  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Continuous Aesthetic Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Header reveal
      tl.fromTo(
        '.pathway-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
      );

      // SVG wave draw-in animation
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength?.() || 1400;
        gsap.set([pathRef.current, glowPathRef.current], {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        tl.to(
          [pathRef.current, glowPathRef.current],
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.inOut',
          },
          '-=0.3'
        );
      }

      // Nodes pop in sequentially with bouncy elastic feel
      tl.fromTo(
        '.pathway-node-circle',
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.16,
          ease: 'back.out(1.8)',
        },
        '-=1.1'
      );

      // Number badge pop
      tl.fromTo(
        '.pathway-badge',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.16,
          ease: 'back.out(2)',
        },
        '-=0.7'
      );

      // Pathway content titles and details
      tl.fromTo(
        '.pathway-text-content',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // 2. Continuous flowing dashed line after entrance completes
      tl.add(() => {
        if (pathRef.current) {
          gsap.set(pathRef.current, {
            strokeDasharray: '8 8',
          });
          gsap.to(pathRef.current, {
            strokeDashoffset: '-=64',
            duration: 3.2,
            repeat: -1,
            ease: 'linear',
          });
        }

        // 3. Subtle floating breathing rhythm on the node wrappers
        gsap.to('.pathway-float-even', {
          y: '-=6',
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('.pathway-float-odd', {
          y: '+=6',
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth GSAP transition when details card is toggled
  useEffect(() => {
    if (activeStep !== null && detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
      );
    }
  }, [activeStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationBooked(true);
  };

  return (
    <div className="space-y-16">

      {/* ─── HERO HEADER ─── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#0B1E34] tracking-tight">
          Career Counselling &amp; Aptitude Assessment
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Empowering Chinmaya students from Class III through XII with scientific diagnostic screening, psychometric profiling, personalized stream counselling, and higher secondary career roadmaps.
        </p>
      </div>

      {/* ─── THE WAVY ROADMAP / PATHWAY SECTION (NO CONTAINER BOX) ─── */}
      <section ref={sectionRef} className="relative py-8 sm:py-12 overflow-visible">
        
        {/* Section title inside roadmap */}
        <div className="pathway-header text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#DF711B] uppercase">
            The 4-Stage School Guidance Pathway
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#0B1E34] mt-1.5">
            Student Aptitude &amp; School Counselling Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
            Click any stage to view counselling methodology, assessment parameters, and student support framework
          </p>
        </div>

        {/* ── Desktop Relative Grid Wrapper ── */}
        <div className="relative max-w-7xl mx-auto">

          {/* ── Desktop Undulating Dashed Line (Brand Saffron / Navy SVG) ── */}
          <div className="hidden lg:block absolute inset-x-0 top-0 pointer-events-none z-0">
            <svg
              className="w-full h-44"
              viewBox="0 0 1200 160"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pathwayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DF711B" stopOpacity="0.25" />
                  <stop offset="35%" stopColor="#FFB740" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#DF711B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#DF711B" stopOpacity="0.3" />
                </linearGradient>
                <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ambient Glowing Wave Underlay */}
              <path
                ref={glowPathRef}
                d="M 60 56 Q 105 56, 150 56 C 270 56, 330 104, 450 104 C 570 104, 630 56, 750 56 C 870 56, 930 104, 1050 104 Q 1095 104, 1140 104"
                stroke="url(#pathwayGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                filter="url(#waveGlow)"
                opacity="0.65"
              />

              {/* Precise Undulating Dashed Sine Wave Connecting Centers of all 4 Nodes */}
              <path
                ref={pathRef}
                d="M 60 56 Q 105 56, 150 56 C 270 56, 330 104, 450 104 C 570 104, 630 56, 750 56 C 870 56, 930 104, 1050 104 Q 1095 104, 1140 104"
                stroke="#DF711B"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* ── 4-Stage Pathway Grid (Alternating Height Rhythm) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative z-10">
            {PATHWAY_STEPS.map((item, idx) => {
              const Icon = item.icon;
              // Alternating up/down vertical rhythm on large screens
              const isAlternate = idx % 2 === 1;

              return (
                <div
                  key={item.step}
                  className={`flex flex-col items-center text-center transition-all duration-300 ${
                    isAlternate ? 'lg:translate-y-12' : 'lg:translate-y-0'
                  }`}
                >
                  {/* Floating container for continuous GSAP floating rhythm */}
                  <div className={`mb-6 relative ${isAlternate ? 'pathway-float-odd' : 'pathway-float-even'}`}>
                    {/* 1. Circular Brand Navy Node Icon with entrance pop animation */}
                    <div
                      onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                      className="pathway-node-circle w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0B1E34] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-110 hover:bg-[#DF711B] border-4 border-white group"
                    >
                      <Icon className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-110 text-white" />

                      {/* Step Pill */}
                      <span className="pathway-badge absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DF711B] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md border-2 border-white">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* 2. Pathway Content with Stagger Entrance */}
                  <div className="pathway-text-content flex flex-col items-center w-full">
                    {/* Bold Title */}
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#0B1E34] leading-snug">
                      {item.title}
                    </h3>

                    {/* Grade Badge */}
                    <span className="inline-block mt-1.5 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF3E8] text-[#DF711B] border border-[#DF711B]/20">
                      {item.badge}
                    </span>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed max-w-[260px] font-normal font-sans">
                      {item.description}
                    </p>

                    {/* Orange CTA Link with Arrow */}
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#DF711B] hover:text-[#C45B0E] transition-colors group cursor-pointer"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    {/* Expandable Details Modal/Card with Ref */}
                    {activeStep === idx && (
                      <div
                        ref={detailsRef}
                        className="mt-4 p-4 text-left bg-white border border-[#DF711B]/30 rounded-2xl shadow-xl space-y-2 text-xs text-slate-700 w-full"
                      >
                        <div className="font-bold text-[#0B1E34] border-b border-[#E7E2D8] pb-1.5 flex items-center justify-between">
                          <span className="font-cinzel text-xs tracking-wide">Counselling Framework</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveStep(null);
                            }}
                            className="text-slate-400 hover:text-slate-600 font-bold text-base leading-none"
                          >
                            &times;
                          </button>
                        </div>
                        <ul className="space-y-1.5 pt-1">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom spacing helper for wave dip */}
        <div className="h-8 lg:h-16" />
      </section>

      {/* ─── STREAM SELECTION AT A GLANCE (CLASS XI & XII) ─── */}
      <div className="bg-gradient-to-br from-[#0B1E34] to-[#173050] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#DF711B] font-bold">
            Senior Secondary Alignment
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            Three Graded Academic Streams
          </h3>
          <p className="text-sm text-slate-300 font-normal">
            Following aptitude assessments, students choose from 3 tailored CBSE academic streams in Class XI with faculty guidance:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Science Stream */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              Stream 01
            </div>
            <h4 className="font-cinzel text-lg font-bold text-white">
              Science Stream
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Physics, Chemistry, Mathematics, Biology, Computer Science, and Physical Education. Tailored for Engineering (JEE), Medicine (NEET), and Pure Research.
            </p>
          </div>

          {/* Commerce Stream */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              Stream 02
            </div>
            <h4 className="font-cinzel text-lg font-bold text-white">
              Commerce Stream
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Accountancy, Business Studies, Economics, Applied Mathematics, and Informatics. Engineered for Chartered Accountancy (CA), BBA, Finance, and Entrepreneurship.
            </p>
          </div>

          {/* Arts / Humanities Stream */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              Stream 03
            </div>
            <h4 className="font-cinzel text-lg font-bold text-white">
              Humanities &amp; Arts
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              History, Political Science, Psychology, Sociology, and English Literature. Tailored for Law (CLAT), Civil Services (UPSC), Journalism, and Design.
            </p>
          </div>
        </div>
      </div>

      {/* ─── BOOK A CAREER GUIDANCE DESK WINDOW ─── */}
      <div className="bg-white border border-[#E7E2D8] p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Parent-Student Counselling Desk</span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B1E34]">
            Speak with a School Counsellor
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Have questions about stream eligibility, student aptitude screening, or senior secondary subject combinations? Schedule a 20-minute consultation window with our campus school counselling faculty at Boisar campus.
          </p>
          <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#DF711B]" />
              <span>Campus Desk: 02525-271775</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Mon to Sat: 8:30 AM – 3:30 PM</span>
            </div>
          </div>
        </div>

        {/* Quick Callback Form */}
        <div className="w-full lg:w-96 bg-[#FCFBF7] p-6 rounded-2xl border border-[#E7E2D8]">
          {consultationBooked ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel font-bold text-base text-[#181C20]">
                Counselling Slot Requested!
              </h4>
              <p className="text-xs text-slate-600">
                Our academic counselor will contact you at <strong>{formData.contactNumber}</strong> during the next available desk session.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h4 className="font-cinzel font-bold text-sm text-[#181C20]">
                Request Guidance Callback
              </h4>
              <input
                type="text"
                required
                placeholder="Parent's Name"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#DF711B]"
              />
              <input
                type="text"
                required
                placeholder="Student's Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#DF711B]"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.currentGrade}
                  onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#DF711B]"
                >
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
                <input
                  type="tel"
                  required
                  placeholder="Mobile No."
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#DF711B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#DF711B] hover:bg-[#C55E10] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Confirm Guidance Session
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default CareerCounsellingShowcase;
