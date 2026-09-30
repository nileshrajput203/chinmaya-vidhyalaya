import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Award, BookOpen, Microscope, Heart } from 'lucide-react';
import gsap from 'gsap';
import { SCHOOL_IMAGES } from '../../data/images';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  head: string;
  focus: string;
  standards: string;
  methodology: string[];
}

const DEPARTMENTS: Department[] = [
  {
    id: 'science-math',
    name: 'Science & Mathematics Wing',
    icon: <Microscope className="w-4 h-4 text-[#DF711B]" />,
    head: 'Senior CBSE Science Faculty',
    focus: 'Physics, Chemistry, Biology & Advanced Mathematics for Secondary & Sr. Secondary',
    standards: 'Std VI to XII',
    methodology: [
      'Individual laboratory experimentation stations in dedicated Physics & Chemistry wings',
      'Diagnostic conceptual problem sets and ASSET skill benchmarking',
      'Intensive board exam preparation with 15-year question paper deconstructions'
    ]
  },
  {
    id: 'humanities',
    name: 'Languages & Humanities Wing',
    icon: <BookOpen className="w-4 h-4 text-[#DF711B]" />,
    head: 'Senior Languages Faculty',
    focus: 'English Core, Hindi, Sanskrit & Marathi Linguistics and Expression',
    standards: 'Std I to XII',
    methodology: [
      'Declamation, elocution, creative writing, and literary debates',
      'Classical Sanskrit pronunciation and Bhagavad Gita shloka recitation',
      'Reading comprehension circles in the Central Library'
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce & Social Sciences Wing',
    icon: <Award className="w-4 h-4 text-[#DF711B]" />,
    head: 'Senior Commerce Faculty',
    focus: 'Accountancy, Business Studies, Economics, History, Civics & Geography',
    standards: 'Std IX to XII',
    methodology: [
      'Practical case studies analyzing Indian industrial and economic growth',
      'Model Parliament and United Nations mock sessions for civic awareness',
      'Field excursions to Boisar and Tarapur industrial manufacturing centers'
    ]
  },
  {
    id: 'pe-arts',
    name: 'Sports, Yoga & Cultural Arts Wing',
    icon: <Heart className="w-4 h-4 text-[#DF711B]" />,
    head: 'Physical Education & Cultural Mentors',
    focus: 'Athletics, Football, Cricket, Classical Music, Drawing & Daily Yoga',
    standards: 'All Classes',
    methodology: [
      'Structured physical conditioning and inter-house athletic tournaments',
      'Daily morning Pranayama and Surya Namaskar assemblies',
      'Chinmaya Balvihar cultural pageants and annual festival dramas'
    ]
  }
];

export const FacultyShowcase: React.FC = () => {
  const [activeDeptId, setActiveDeptId] = useState('science-math');
  const deptRef = useRef<HTMLDivElement>(null);

  const activeDept = DEPARTMENTS.find((d) => d.id === activeDeptId) || DEPARTMENTS[0];

  useEffect(() => {
    if (deptRef.current) {
      gsap.fromTo(
        deptRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeDeptId]);

  return (
    <div className="space-y-12">
      {/* Editorial Overview */}
      <SpotlightCard className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <BadgePill variant="amber" label="Educators & Academic Mentorship" icon="users" />
              <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-[#E7E2D8]">
                CBSE Certified Educators
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
              A Dedicated Fraternity of Inspiring Mentors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              At Chinmaya Vidyalaya Tarapur, our faculty members are not merely instructors—they are compassionate life mentors who embrace Gurudev Swami Chinmayananda’s motto: "Children are not vessels to be filled, but lamps to be lit." Combining deep subject expertise with pedagogical empathy, they nurture each student’s unique potential.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Mentorship Ratio</span>
                <span className="font-cinzel font-bold text-lg text-[#181C20]">1 : 25</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Board Pass Rate</span>
                <span className="font-cinzel font-bold text-lg text-[#DF711B]">100%</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">CBSE Training</span>
                <span className="font-cinzel font-bold text-lg text-[#0B1E34]">Continuous</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md group bg-white">
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={SCHOOL_IMAGES.TEACHING_STAFF}
                  alt="Teaching Faculty of Chinmaya Vidyalaya"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B1E34]/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                  Teaching Faculty • Tarapur
                </div>
              </div>
              <div className="p-3 text-xs text-[#4A5568] text-center font-medium bg-[#FAF8F5]">
                Certified Teaching Faculty & Academic Mentors | Chinmaya Vidyalaya
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Interactive Academic Wings & Departments Explorer */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
            Academic Specializations
          </span>
          <h3 className="font-cinzel font-extrabold text-2xl text-[#181C20]">
            Instructional Departments & Teaching Faculties
          </h3>
        </div>

        {/* Department Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setActiveDeptId(dept.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                activeDeptId === dept.id
                  ? 'bg-[#0B1E34] text-white border-[#0B1E34] shadow-md scale-[1.01]'
                  : 'bg-white text-slate-700 border-[#E7E2D8] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-2">
                {dept.icon}
                <span className={`text-[10px] font-mono uppercase font-bold ${activeDeptId === dept.id ? 'text-[#F7B928]' : 'text-slate-400'}`}>
                  {dept.standards}
                </span>
              </div>
              <h4 className="font-cinzel font-bold text-xs sm:text-sm leading-tight">
                {dept.name}
              </h4>
            </button>
          ))}
        </div>

        {/* Department Details Stage (Zero-Eye-Wander) */}
        <div ref={deptRef}>
          <SpotlightCard className="bg-white border-2 border-[#E7E2D8] rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  {activeDept.standards} • {activeDept.head}
                </span>
                <h4 className="font-cinzel font-extrabold text-2xl text-[#181C20] pt-1">
                  {activeDept.name}
                </h4>
              </div>
              <span className="bg-[#FAF8F5] px-3.5 py-1.5 rounded-xl border border-[#E7E2D8] text-xs font-mono text-slate-600">
                Department Rigor: <strong className="text-[#0B1E34]">CBSE Syllabus</strong>
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {activeDept.focus}
            </p>

            <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-2xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                Classroom Methodology & Student Mentorship:
              </span>
              <ul className="space-y-2">
                {activeDept.methodology.map((m, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                    <span className="leading-snug">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Non-Teaching Staff & Support Team */}
      <SpotlightCard className="bg-white border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md group bg-white">
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={SCHOOL_IMAGES.NON_TEACHING_STAFF}
                  alt="Non-Teaching and Support Staff"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#DF711B]/90 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                  Support & Admin Staff
                </div>
              </div>
              <div className="p-3 text-xs text-[#4A5568] text-center font-medium bg-[#FAF8F5]">
                Administrative, Technical & Campus Support Fraternity
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-[#0B1E34] uppercase tracking-wider block">
              Operational Backbone
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
              Administrative & Campus Support Staff
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The seamless day-to-day operation, sanitation, campus security, student records, and laboratory upkeep of Chinmaya Vidyalaya are steered by our diligent administrative and support personnel. Their tireless commitment ensures a safe, hygienic, and nurturing environment for all 1,600+ students.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0" />
                <span>Dedicated administrative & admissions desk</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0" />
                <span>Trained laboratory assistants & technicians</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0" />
                <span>Round-the-clock campus security & safety team</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0" />
                <span>Health, sanitation & clean potable water staff</span>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
