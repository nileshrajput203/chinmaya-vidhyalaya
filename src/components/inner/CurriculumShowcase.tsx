import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Microscope, 
  Calculator, 
  Globe2, 
  Languages, 
  Cpu, 
  Palette, 
  Dumbbell, 
  FileCheck2, 
  Download, 
  ExternalLink,
  Layers,
  FlaskConical,
  Compass,
  FileText,
  Info
} from 'lucide-react';
import { BadgePill } from '../ui/badge-pill';

type StageKey = 'primary' | 'middle' | 'secondary' | 'senior' | 'foundational';

export const CurriculumShowcase: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageKey>('secondary');
  const [seniorStream, setSeniorStream] = useState<'science' | 'commerce' | 'humanities'>('science');

  return (
    <div className="space-y-12">
      
      {/* 1. HERO INSTITUTIONAL CREDENTIAL SPOTLIGHT */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1E34] via-[#112845] to-[#181C20] text-white p-8 sm:p-12 border border-[#E7E2D8]/20 shadow-2xl">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DF711B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#DF711B] text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-sm">
              CBSE Affiliated No. 1130058
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-200 border border-white/15 text-[11px] font-mono font-semibold">
              School Code: 30040 • U-DISE: 27361116004
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold">
              English Medium • Nursery to Std XII
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              CBSE Scholastic Curriculum & Syllabi
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-normal">
              A balanced, future-ready academic framework aligned with the National Education Policy (NEP 2020) and Central Board of Secondary Education (CBSE) guidelines—infused with the timeless moral ethos of the Chinmaya Vision Programme.
            </p>
          </div>

          {/* Quick Stats Grid with High Contrast */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
                Board Track Record
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">100%</span>
              <span className="text-[11px] text-slate-300 block">Class X & XII Pass Rate</span>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
                Languages Taught
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">Trilingual</span>
              <span className="text-[11px] text-slate-300 block">English, Hindi, Sanskrit/Marathi</span>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
                Senior Secondary
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">3 Streams</span>
              <span className="text-[11px] text-slate-300 block">Science, Commerce, Arts</span>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
                Pedagogy Style
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">NEP 2020</span>
              <span className="text-[11px] text-slate-300 block">Experiential & Lab-Based</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STAGE-WISE INTERACTIVE CURRICULUM SELECTOR */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7E2D8] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-widest block">
              Graded Learning Continuum
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
              Explore Stage-Wise Syllabus & Subjects
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-sans">
            Select a stage below to view subjects, syllabus breakdown & evaluation
          </span>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'foundational', label: 'Foundational Stage', sub: 'Nursery & KG' },
            { id: 'primary', label: 'Primary Stage', sub: 'Std I to V' },
            { id: 'middle', label: 'Middle Stage', sub: 'Std VI to VIII' },
            { id: 'secondary', label: 'Secondary (AISSE)', sub: 'Std IX & X' },
            { id: 'senior', label: 'Senior Secondary', sub: 'Std XI & XII' },
          ].map((tab) => {
            const isActive = activeStage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStage(tab.id as StageKey)}
                className={`px-5 py-3 rounded-2xl transition-all flex flex-col items-start text-left border shrink-0 ${
                  isActive
                    ? 'bg-[#181C20] text-white border-[#181C20] shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-[#E7E2D8] hover:bg-[#FAF8F5] hover:text-[#181C20]'
                }`}
              >
                <span className={`text-xs sm:text-sm font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {tab.label}
                </span>
                <span className={`text-[10px] font-mono mt-0.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            TAB 1: FOUNDATIONAL STAGE (NURSERY, JR KG, SR KG)
           ======================================================== */}
        {activeStage === 'foundational' && (
          <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7E2D8] pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgePill label="Ages 3 to 6 Years" variant="emerald" />
                  <span className="text-xs font-mono font-bold text-slate-500">Play-Way & Activity Methodology</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                  Foundational Stage (Nursery, Junior KG & Senior KG)
                </h3>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Focuses on sensory motor refinement, phonetic mastery, joyful numeracy, self-expression, and ethical values through the Chinmaya Shishu Vihar child-centric approach.
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-amber-50 text-[#DF711B] flex items-center justify-center shrink-0 border border-amber-200">
                <Sparkles className="w-10 h-10" />
              </div>
            </div>

            {/* Core Learning Domains */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Languages className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#181C20]">Phonics & Language</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Jolly Phonics sound recognition, letter tracing, rhyme recitation, vocabulary circles, and story comprehension in English and Hindi.
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-500">
                  Focus: Listening & Speaking Readiness
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#DF711B] flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#181C20]">Early Numeracy</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Montessori-inspired manipulatives, counting objects, size & shape classification, pre-math spatial patterns, and basic additions.
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-500">
                  Focus: Number Sense & Spatial Reasoning
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#181C20]">Creative & Value Culture</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Freehand coloring, origami, clay modeling, daily morning prayer chanting, simple Sanskrit shlokas, and basic nature observation.
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-500">
                  Focus: Gross & Fine Motor Coordination
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Zero Exam Pressure:</strong> In strict compliance with CBSE foundational norms, assessment is continuous, qualitative, and observational. No formal exams are administered; progress is documented via child developmental portfolios.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PRIMARY STAGE (STD I TO V)
           ======================================================== */}
        {activeStage === 'primary' && (
          <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7E2D8] pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgePill label="Classes I to V" variant="saffron" />
                  <span className="text-xs font-mono font-bold text-slate-500">Preparatory Foundation</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                  Primary School Academic Curriculum
                </h3>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Transitions young learners from play-based discovery into structured inquiry, mathematical competence, bilingual literacy, and environmental sensitivity.
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
                <BookOpen className="w-10 h-10" />
              </div>
            </div>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Scholastic Subjects */}
              <div className="border border-[#E7E2D8] rounded-2xl p-6 bg-[#FCFBF7] space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E7E2D8] pb-3 text-sm font-bold text-[#181C20]">
                  <FileText className="w-4 h-4 text-[#DF711B]" />
                  <span>Scholastic Core Subjects</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>English (Core Language):</strong> Reading fluency, grammar essentials, creative composition, and recitation.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Hindi (Second Language):</strong> Varnamala, matra mastery, prose comprehension, and conversational proficiency.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Mathematics:</strong> Four fundamental operations, geometry basics, word problem analysis, and mental math.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Environmental Studies (EVS):</strong> Family, community, nature ecosystems, hygiene, and regional awareness.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Computer Science & IT:</strong> Digital literacy, keyboarding, Paint, and logical block coding.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Co-Scholastic & Value Pillars */}
              <div className="border border-[#E7E2D8] rounded-2xl p-6 bg-[#FCFBF7] space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E7E2D8] pb-3 text-sm font-bold text-[#181C20]">
                  <Award className="w-4 h-4 text-[#DF711B]" />
                  <span>Co-Scholastic & Enrichment Domains</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Chinmaya Vision Programme (CVP):</strong> Daily moral values, Gurudev quotes, patriotic awareness, and shlokas.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Visual & Performing Arts:</strong> Sketching, watercolor painting, classical light music, and tabla/harmonious rhythms.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Health & Physical Education (HPE):</strong> Calisthenics, yogic asanas, athletic races, and gross-motor sports games.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>General Knowledge & Library Hour:</strong> Weekly reading circles and current affairs quiz sessions.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Assessment Structure Note */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Continuous Assessment Scheme:</strong> Students in Std I to V are assessed through 3 periodic cycles and continuous classroom observations. Academic reports emphasize concept clarity, project portfolios, and reading comprehension.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: MIDDLE STAGE (STD VI TO VIII)
           ======================================================== */}
        {activeStage === 'middle' && (
          <div className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7E2D8] pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgePill label="Classes VI to VIII" variant="navy" />
                  <span className="text-xs font-mono font-bold text-slate-500">Trilingual & Experimental Sciences</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
                  Middle School Academic Curriculum
                </h3>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Introduces disciplinary rigor with separate specialized sciences, trilingual mastery, abstract mathematics, and hands-on laboratory experiences.
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-amber-50 text-[#DF711B] flex items-center justify-center shrink-0 border border-amber-200">
                <Microscope className="w-10 h-10" />
              </div>
            </div>

            {/* Subject Domains Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Box 1: Three Language Formula */}
              <div className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Languages className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#181C20]">Three-Language Formula</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li><strong>Language 1:</strong> English (Language & Literature)</li>
                  <li><strong>Language 2:</strong> Hindi (Course A)</li>
                  <li><strong>Language 3:</strong> Sanskrit or Marathi (Regional / Classical option)</li>
                </ul>
              </div>

              {/* Box 2: Integrated Sciences */}
              <div className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#181C20]">Specialized Sciences</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li><strong>Physics:</strong> Light, Electricity, Motion, Magnetism</li>
                  <li><strong>Chemistry:</strong> Matter, Acids/Bases, Reactions</li>
                  <li><strong>Biology:</strong> Cells, Plant Physiology, Microorganisms</li>
                  <li><strong>Lab Practicals:</strong> Regular experiments in laboratories</li>
                </ul>
              </div>

              {/* Box 3: Mathematics */}
              <div className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#181C20]">Advanced Mathematics</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li><strong>Number Systems:</strong> Rational & Real Numbers</li>
                  <li><strong>Algebra:</strong> Linear equations & Polynomials</li>
                  <li><strong>Geometry & Mensuration:</strong> Angles, Area, Volumes</li>
                  <li><strong>Statistics:</strong> Data handling and probability</li>
                </ul>
              </div>

              {/* Box 4: Social Sciences */}
              <div className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#DF711B] flex items-center justify-center">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#181C20]">Social Sciences</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li><strong>History:</strong> Ancient, Medieval & Modern India</li>
                  <li><strong>Geography:</strong> Earth, Resources, Agriculture</li>
                  <li><strong>Political Life:</strong> Indian Constitution & Governance</li>
                  <li><strong>Disaster Management:</strong> Preparedness modules</li>
                </ul>
              </div>

              {/* Box 5: Technology & AI */}
              <div className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#181C20]">Tech, Coding & AI</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li><strong>Computer Applications:</strong> Python, HTML & CSS</li>
                  <li><strong>Cyber Safety:</strong> Digital citizenship & data ethics</li>
                  <li><strong>Robotics & STEM:</strong> Tinkering kits & micro-controllers</li>
                </ul>
              </div>

              {/* Box 6: SEWA & Sports */}
              <div className="border border-[#E7E2D8] rounded-2xl p-5 bg-[#FCFBF7] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#181C20]">SEWA, HPE & Arts</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li><strong>Social Empowerment (SEWA):</strong> Community projects</li>
                  <li><strong>Physical Education:</strong> Cricket, Volleyball, March Past</li>
                  <li><strong>Yoga & Meditation:</strong> Mindful breathing & focus</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SECONDARY STAGE (STD IX & X - AISSE BOARD)
           ======================================================== */}
        {activeStage === 'secondary' && (
          <div className="bg-white border-2 border-[#181C20]/15 rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7E2D8] pb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <BadgePill label="Classes IX & X" variant="saffron" />
                  <span className="text-xs font-mono font-bold text-slate-600">
                    CBSE AISSE Board Examination Level
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#181C20]">
                  Secondary School Curriculum (Classes 9 & 10)
                </h3>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Rigorous academic curriculum mapped with NCERT and CBSE examination specifications, preparing students for the Class 10 All India Secondary School Examination (AISSE) with consistent 100% board distinction.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                    Board Code
                  </span>
                  <span className="font-mono text-lg font-black text-[#DF711B]">
                    AISSE (CBSE)
                  </span>
                </div>
              </div>
            </div>

            {/* Core Subject Breakdown Table with High Contrast */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[#181C20] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#DF711B]" />
                <span>Prescribed CBSE Scholastic Subjects</span>
              </h4>

              <div className="border border-[#E7E2D8] rounded-2xl overflow-hidden shadow-xs">
                <div className="grid grid-cols-12 bg-[#181C20] text-white p-3.5 text-xs font-bold font-mono uppercase tracking-wider">
                  <div className="col-span-2">Subject Code</div>
                  <div className="col-span-4">Subject Title</div>
                  <div className="col-span-3">Theory (Board)</div>
                  <div className="col-span-3">Internal Assessment</div>
                </div>

                <div className="divide-y divide-[#E7E2D8] text-xs font-sans">
                  
                  <div className="grid grid-cols-12 p-3.5 bg-white hover:bg-slate-50 items-center">
                    <div className="col-span-2 font-mono font-bold text-[#DF711B]">Code 184</div>
                    <div className="col-span-4 font-bold text-slate-900">
                      English Language & Literature
                    </div>
                    <div className="col-span-3 text-slate-700">80 Marks (Annual Exam)</div>
                    <div className="col-span-3 font-semibold text-emerald-700">20 Marks (ASL + Project)</div>
                  </div>

                  <div className="grid grid-cols-12 p-3.5 bg-[#FCFBF7] hover:bg-slate-50 items-center">
                    <div className="col-span-2 font-mono font-bold text-[#DF711B]">Code 002 / 122</div>
                    <div className="col-span-4 font-bold text-slate-900">
                      Hindi Course-A / Sanskrit
                    </div>
                    <div className="col-span-3 text-slate-700">80 Marks (Annual Exam)</div>
                    <div className="col-span-3 font-semibold text-emerald-700">20 Marks (Speaking/Listening)</div>
                  </div>

                  <div className="grid grid-cols-12 p-3.5 bg-white hover:bg-slate-50 items-center">
                    <div className="col-span-2 font-mono font-bold text-[#DF711B]">Code 041 / 241</div>
                    <div className="col-span-4 font-bold text-slate-900">
                      Mathematics (Standard / Basic)
                    </div>
                    <div className="col-span-3 text-slate-700">80 Marks (Theory Paper)</div>
                    <div className="col-span-3 font-semibold text-emerald-700">20 Marks (Lab Activities + Tests)</div>
                  </div>

                  <div className="grid grid-cols-12 p-3.5 bg-[#FCFBF7] hover:bg-slate-50 items-center">
                    <div className="col-span-2 font-mono font-bold text-[#DF711B]">Code 086</div>
                    <div className="col-span-4 font-bold text-slate-900">
                      Science (Physics, Chemistry, Biology)
                    </div>
                    <div className="col-span-3 text-slate-700">80 Marks (Theory Paper)</div>
                    <div className="col-span-3 font-semibold text-emerald-700">20 Marks (Lab Practicals + Records)</div>
                  </div>

                  <div className="grid grid-cols-12 p-3.5 bg-white hover:bg-slate-50 items-center">
                    <div className="col-span-2 font-mono font-bold text-[#DF711B]">Code 087</div>
                    <div className="col-span-4 font-bold text-slate-900">
                      Social Science (Hist, Pol Sci, Geo, Eco)
                    </div>
                    <div className="col-span-3 text-slate-700">80 Marks (Theory Paper)</div>
                    <div className="col-span-3 font-semibold text-emerald-700">20 Marks (Map Work + Projects)</div>
                  </div>

                  <div className="grid grid-cols-12 p-3.5 bg-[#FCFBF7] hover:bg-slate-50 items-center">
                    <div className="col-span-2 font-mono font-bold text-[#DF711B]">Code 402 / 417</div>
                    <div className="col-span-4 font-bold text-slate-900">
                      Skill Subject: IT / Artificial Intelligence
                    </div>
                    <div className="col-span-3 text-slate-700">50 Marks (Theory)</div>
                    <div className="col-span-3 font-semibold text-emerald-700">50 Marks (Practical Lab Exam)</div>
                  </div>

                </div>
              </div>
            </div>

            {/* Assessment Blueprint Matrix */}
            <div className="p-6 rounded-2xl bg-[#0B1E34] text-white space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-amber-400" />
                <h4 className="font-cinzel text-lg font-bold text-white">
                  CBSE 100-Marks Evaluation Blueprint (Per Subject)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">80 Marks</span>
                  <strong className="text-white block text-sm">Board Examination</strong>
                  <p className="text-slate-300 text-[11px]">
                    Centralized annual pen-paper board examination covering complete syllabus.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">5 Marks</span>
                  <strong className="text-white block text-sm">Periodic Tests</strong>
                  <p className="text-slate-300 text-[11px]">
                    Average of the best two periodic assessments conducted in the academic session.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">5 Marks</span>
                  <strong className="text-white block text-sm">Multiple Assessment</strong>
                  <p className="text-slate-300 text-[11px]">
                    Quizzes, oral tests, concept maps, peer assessments, and group dialogues.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">10 Marks</span>
                  <strong className="text-white block text-sm">Portfolio & Practicals</strong>
                  <p className="text-slate-300 text-[11px]">
                    Notebook maintenance, subject enrichment, lab journals, and practical viva.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 5: SENIOR SECONDARY (STD XI & XII - 3 STREAMS)
           ======================================================== */}
        {activeStage === 'senior' && (
          <div className="bg-white border-2 border-[#181C20]/15 rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7E2D8] pb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <BadgePill label="Classes XI & XII" variant="saffron" />
                  <span className="text-xs font-mono font-bold text-slate-600">
                    CBSE AISSCE Senior Secondary
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#181C20]">
                  Senior Secondary Specialized Streams
                </h3>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Tailored subject combinations preparing students for premier higher education admissions (JEE, NEET, CUET, CA Foundation, NDA, and Top Universities) with rigorous academic mentorship.
                </p>
              </div>

              {/* Stream Switcher Pills */}
              <div className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] border border-[#E7E2D8] rounded-2xl shrink-0">
                <button
                  type="button"
                  onClick={() => setSeniorStream('science')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    seniorStream === 'science'
                      ? 'bg-[#181C20] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#181C20]'
                  }`}
                >
                  Science Stream
                </button>
                <button
                  type="button"
                  onClick={() => setSeniorStream('commerce')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    seniorStream === 'commerce'
                      ? 'bg-[#181C20] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#181C20]'
                  }`}
                >
                  Commerce Stream
                </button>
                <button
                  type="button"
                  onClick={() => setSeniorStream('humanities')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    seniorStream === 'humanities'
                      ? 'bg-[#181C20] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#181C20]'
                  }`}
                >
                  Humanities Stream
                </button>
              </div>
            </div>

            {/* STREAM CONTENT */}
            {seniorStream === 'science' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#181C20]">Science Stream (PCM / PCB / PCMB)</h4>
                    <p className="text-xs text-slate-600">Ideal for Engineering, Medicine, Pure Sciences, Biotechnology & Architecture</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Core Scholastic Subjects
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>English Core (Code 301):</strong> Mandatory language & advanced composition.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Physics (Code 042):</strong> Mechanics, Electromagnetism, Optics, Modern Physics + 30-mark practical lab.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Chemistry (Code 043):</strong> Physical, Organic, Inorganic Chemistry + 30-mark wet lab practical.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Electives & Specialized Combinations
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Mathematics (041) / Biology (044):</strong> Choose pure Mathematics or Biological Sciences, or dual PCMB.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Computer Science (083):</strong> Python programming, SQL databases, Computer Networks, and Data Structures.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Physical Education (048):</strong> Sports science, physiology, biomechanics, and conditioning.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {seniorStream === 'commerce' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#DF711B] flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#181C20]">Commerce Stream</h4>
                    <p className="text-xs text-slate-600">Ideal for Chartered Accountancy (CA), Corporate Finance, Management, Law & Business</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Core Commerce Foundations
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Accountancy (Code 055):</strong> Financial statements, partnership firms, and company accounts analysis.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Business Studies (Code 054):</strong> Principles of management, marketing, financial markets, and consumer protection.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Economics (Code 030):</strong> Introductory Microeconomics, Macroeconomics, and Indian Economic Development.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Language & Optional Electives
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>English Core (Code 301):</strong> Advanced business communication and literary comprehension.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Applied Mathematics (241):</strong> Financial mathematics, statistics, calculus, and linear programming.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Informatics Practices (065) / Physical Education (048):</strong> Data handling with Python pandas or sports science.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {seniorStream === 'humanities' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#181C20]">Humanities / Liberal Arts Stream</h4>
                    <p className="text-xs text-slate-600">Ideal for Civil Services (UPSC), Legal Studies, Psychology, Journalism & Public Administration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Core Humanities Subjects
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>History (Code 027):</strong> Themes in Indian and World History, archaeological sources, and historiography.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Political Science (Code 028):</strong> Contemporary world politics, Indian Constitution, and democratic politics.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Economics (Code 030):</strong> Development economics, macroeconomic policy, and socio-economic indicators.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E7E2D8] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                      Language & Optional Electives
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>English Core (Code 301):</strong> Critical reading, discourse analysis, and persuasive writing.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Psychology / Mass Media Studies:</strong> Human behavior, cognitive processes, or media communications.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Physical Education (048):</strong> Health education, fitness regimes, and competitive sports ethics.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 3. FOUR CORE PEDAGOGICAL PILLARS OF OUR SYLLABUS */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
            Pedagogical Philosophy & Distinctive Strengths
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
            Beyond Textbooks: How Learning Happens at Chinmaya
          </h3>
          <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
            We transform static syllabus material into immersive, inquiry-driven learning experiences that cultivate intellect alongside noble character.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DF711B] flex items-center justify-center font-bold">
              <Microscope className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#181C20]">Experimental Labs</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Every theoretical science concept is validated through weekly experiments in dedicated Physics, Chemistry, Biology, and Composite Science Labs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#181C20]">Smart Digital Classrooms</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Audio-visual 3D diagrams, animated concept explainers, and interactive simulations breathe vibrant life into complex mathematics and science topics.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#181C20]">CVP Cultural Integration</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Pujya Gurudev’s 4 pillars (Physical, Mental, Intellectual & Spiritual) ensure students develop ethical integrity, universal patriotism, and self-mastery.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#181C20]">Remedial & Zero Period</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Special personalized doubt-clearing sessions for students requiring academic support, and Olympiad grooming for gifted learners.
            </p>
          </div>

        </div>
      </div>

      {/* 4. ACADEMIC RESOURCES & QUICK DOWNLOAD ACTIONS */}
      <div className="bg-white border-2 border-[#E7E2D8] rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
            Academic Downloads & Question Banks
          </span>
          <h4 className="font-cinzel text-xl font-extrabold text-[#181C20]">
            CBSE Sample Question Papers & Question Banks
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Access previous term-end exam papers, marking schemes, and official CBSE sample papers for Classes 1 to 10 directly on our downloads portal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/downloads/sample-papers"
            className="px-5 py-3 bg-[#181C20] hover:bg-[#DF711B] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Sample Papers</span>
          </Link>

          <a
            href="https://cbseacademic.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-[#E7E2D8] hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <span>CBSE Academic Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </div>

    </div>
  );
};
