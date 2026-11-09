import React from 'react';
import { InfiniteLoopGallery, type InfiniteGalleryItem } from '../ui/infinite-loop-gallery';
import { Sparkles } from 'lucide-react';

/* ────────────────────────────────────────────────────────
   Activity List Data - Official, Relevant Standard Emojis
   ──────────────────────────────────────────────────────── */

interface Activity {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  isComingSoon?: boolean;
}

const ACTIVITIES: Activity[] = [
  { name: 'Dance', emoji: '💃', color: '#F59E0B', bgColor: 'bg-amber-50' },
  { name: 'Arts & Craft', emoji: '🎨', color: '#10B981', bgColor: 'bg-emerald-50' },
  { name: 'Music & Choir', emoji: '🎵', color: '#3B82F6', bgColor: 'bg-blue-50' },
  { name: 'Commando Training', emoji: '🎖️', color: '#DC2626', bgColor: 'bg-red-50' },
  { name: 'Public Speaking', emoji: '🎙️', color: '#8B5CF6', bgColor: 'bg-purple-50' },
  { name: 'Gita Chanting', emoji: '🕉️', color: '#EA580C', bgColor: 'bg-orange-50' },
  { name: 'Coding & Tech', emoji: '💻', color: '#6366F1', bgColor: 'bg-indigo-50' },
  { name: 'Sports & Athletics', emoji: '🏆', color: '#DF711B', bgColor: 'bg-orange-50' },
  { name: 'Library Programme', emoji: '📚', color: '#0891B2', bgColor: 'bg-teal-50' },
  { name: 'Student Council', emoji: '👥', color: '#0B1E34', bgColor: 'bg-slate-50' },
  { name: 'Trips & Expeditions', emoji: '🧭', color: '#D97706', bgColor: 'bg-amber-50' },
  { name: 'Health & Nutrition', emoji: '🥗', color: '#16A34A', bgColor: 'bg-green-50' },
  { name: 'Yoga & Wellness', emoji: '🧘', color: '#059669', bgColor: 'bg-emerald-50' },
  { name: 'Quiz & Debates', emoji: '💡', color: '#7C3AED', bgColor: 'bg-violet-50' },
  { name: 'Archery', emoji: '🏹', color: '#B45309', bgColor: 'bg-amber-50', isComingSoon: true },
  { name: 'Skating', emoji: '🛼', color: '#2563EB', bgColor: 'bg-blue-50', isComingSoon: true },
  { name: 'Horse Riding', emoji: '🏇', color: '#7C3AED', bgColor: 'bg-purple-50', isComingSoon: true },
];

/* ────────────────────────────────────────────────────────
   Official Co-Curricular Photographic Archives (19 Photos)
   Sourced directly from verified campus folder
   ──────────────────────────────────────────────────────── */

export interface CoCurricularPhotoItem extends InfiniteGalleryItem {
  id: string;
  title: string;
  category: string;
  groupCategory: 'arts' | 'literary' | 'leadership' | 'campus';
  desc: string;
  url: string;
  fallbackUrl: string;
  badge: string;
}

const ALL_CO_CURRICULAR_PHOTOS: CoCurricularPhotoItem[] = [
  // ── ROW 1 ITEMS (10 Photos) ──
  {
    id: 'cc-01',
    title: 'Maharashtra Din Theatrical Pageant',
    category: 'Drama & Cultural Heritage',
    groupCategory: 'arts',
    desc: 'Grand historical stage production featuring Chhatrapati Shivaji Maharaj, Warkari saints, and student dramatic dialogue honoring state heritage.',
    url: '/images/co-curricular/screenshot_2026-11-06_190042.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-06_190042.jpg',
    badge: 'Stage Drama',
  },
  {
    id: 'cc-02',
    title: 'Tagore Club Vaani Utsav',
    category: 'Public Speaking & Debates',
    groupCategory: 'literary',
    desc: 'Inter-school linguistic symposium with bilingual debates, English elocution, and expressive Marathi storytelling competitions.',
    url: '/images/co-curricular/screenshot_2026-11-09_110310.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_110310.jpg',
    badge: 'Debate & Elocution',
  },
  {
    id: 'cc-03',
    title: 'Gokulashtami Festive Gathering',
    category: 'Cultural Celebrations',
    groupCategory: 'arts',
    desc: 'Vibrant school courtyard assembly with primary students attired in traditional Radha-Krishna ceremonial costumes for festival celebrations.',
    url: '/images/co-curricular/img_3536.webp',
    fallbackUrl: '/images/co-curricular/img_3536.jpg',
    badge: 'Festival Assembly',
  },
  {
    id: 'cc-04',
    title: 'Independence Day Patriotic Choir',
    category: 'Vocal Ensemble & Music',
    groupCategory: 'arts',
    desc: 'Harmonious choral anthems and patriotic melodies rendered during National Day celebrations on the main auditorium stage.',
    url: '/images/co-curricular/screenshot_2026-11-09_113942.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_113942.jpg',
    badge: 'Patriotic Choir',
  },
  {
    id: 'cc-05',
    title: 'Elected Student Council Address',
    category: 'Student Governance & Leadership',
    groupCategory: 'leadership',
    desc: 'Head Girl delivering the inaugural leadership address before the Sinhagad and Shivneri house contingents from the school podium.',
    url: '/images/co-curricular/screenshot_2026-11-09_125227.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_125227.jpg',
    badge: 'Student Council',
  },
  {
    id: 'cc-06',
    title: 'Traditional Lezim & Folk Procession',
    category: 'Folk Dance & Rhythm',
    groupCategory: 'arts',
    desc: 'Energetic traditional Lezim and Dandiya performance leading community cultural processions across campus avenues.',
    url: '/images/co-curricular/screenshot_2026-11-09_125427.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_125427.jpg',
    badge: 'Folk Dance',
  },
  {
    id: 'cc-07',
    title: 'Classical Kathak Dance Ensemble',
    category: 'Classical Performing Arts',
    groupCategory: 'arts',
    desc: 'Graceful rhythmic invocations and devotional dance recitals in traditional white-and-gold attire during school functions.',
    url: '/images/co-curricular/screenshot_2026-11-09_130100.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_130100.jpg',
    badge: 'Classical Dance',
  },
  {
    id: 'cc-09',
    title: 'Rotary Interact Tree Plantation Drive',
    category: 'Eco-Club & Conservation',
    groupCategory: 'leadership',
    desc: 'Student environmental leaders driving green canopy expansion in partnership with the Rotary Club of Boisar-Tarapur.',
    url: '/images/co-curricular/screenshot_2026-11-09_131039.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_131039.jpg',
    badge: 'Eco-Club Seva',
  },
  {
    id: 'cc-10',
    title: 'Senior Physics Laboratory Inquiry',
    category: 'Science & Innovation Expo',
    groupCategory: 'campus',
    desc: 'Senior secondary students conducting precision potentiometer, electrical resistance, and optical bench experiments.',
    url: '/images/co-curricular/img_5037.webp',
    fallbackUrl: '/images/co-curricular/img_5037.jpg',
    badge: 'Science Labs',
  },

  // ── ROW 2 ITEMS (9 Photos) ──
  {
    id: 'cc-11',
    title: 'National Flag Salutation Ceremony',
    category: 'Patriotism & Civic Ceremony',
    groupCategory: 'leadership',
    desc: 'Ceremonial flag hoisting with school trustees, faculty, and student house contingents united in patriotic salutation.',
    url: '/images/co-curricular/screenshot_2026-11-06_190331.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-06_190331.jpg',
    badge: 'Flag Salute',
  },
  {
    id: 'cc-12',
    title: 'Harmonium & Classical Bhajan Recital',
    category: 'Classical Music & Gita Chanting',
    groupCategory: 'arts',
    desc: 'Devotional morning prayers, traditional harmonium accompaniment, and sacred Sanskrit shloka chanting in prayer assembly.',
    url: '/images/co-curricular/screenshot_2026-11-09_114757.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_114757.jpg',
    badge: 'Vocal & Harmonium',
  },
  {
    id: 'cc-13',
    title: 'Swachhata Seva Community Cleanliness',
    category: 'Community Seva & Health',
    groupCategory: 'leadership',
    desc: 'Active student volunteerism championing civic cleanliness, hygiene, and environmental sanitation across Boisar parks.',
    url: '/images/co-curricular/screenshot_2026-11-09_125110.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_125110.jpg',
    badge: 'Swachhata Seva',
  },
  {
    id: 'cc-14',
    title: 'Historical Drama Dialogue & Stagecraft',
    category: 'Drama & Expression',
    groupCategory: 'literary',
    desc: 'Dramatic stage characterizations cultivating public poise, voice modulation, and expressiveness in front of large audiences.',
    url: '/images/co-curricular/screenshot_2026-11-09_105920.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_105920.jpg',
    badge: 'Dramatic Arts',
  },
  {
    id: 'cc-16',
    title: 'Balvihar Cultural Pageant',
    category: 'Heritage & Balvihar',
    groupCategory: 'arts',
    desc: 'Young learners embodying sacred cultural stories in traditional adorned ceremonial regalia with peacock crowns.',
    url: '/images/co-curricular/screenshot_2026-11-09_130426.webp',
    fallbackUrl: '/images/co-curricular/screenshot_2026-11-09_130426.jpg',
    badge: 'Balvihar Heritage',
  },
];

// Row 1 & Row 2 for Infinite Loop Gallery (All 14 verified photos distributed equally)
const row1GalleryImages: InfiniteGalleryItem[] = ALL_CO_CURRICULAR_PHOTOS.slice(0, 7);
const row2GalleryImages: InfiniteGalleryItem[] = ALL_CO_CURRICULAR_PHOTOS.slice(7);

/* ────────────────────────────────────────────────────────
   Main Co-Curricular Showcase Component
   ──────────────────────────────────────────────────────── */

export const CoCurricularShowcase: React.FC = () => {
  return (
    <div className="space-y-16">

      {/* ─── SECTION 1: Activity Matrix ─── */}
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <span className="block text-xs font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
            HOLISTIC STUDENT ENRICHMENT • NON-SCHOLASTIC CURRICULUM
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#181C20] pt-1">
            Co-Curricular Programmes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            From performing arts to competitive athletics, literary societies to student governance — discover the 17 multidisciplinary programmes nurturing every child at Chinmaya Vidyalaya Tarapur.
          </p>
        </div>

        {/* Interactive Activity Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {ACTIVITIES.map((activity, idx) => (
            <div
              key={activity.name}
              className={`${activity.bgColor} relative border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 hover:border-[#DF711B]/40 hover:shadow-md transition-all duration-200 cursor-default select-none`}
            >
              {/* Floating Badge (Coming Soon or Index) */}
              {activity.isComingSoon ? (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#DF711B] text-white text-[8px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                  Coming Soon
                </span>
              ) : (
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold text-slate-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              )}

              {/* Official Standard Emoji */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 shadow-xs text-2xl sm:text-3xl select-none"
                style={{ backgroundColor: activity.color + '18' }}
              >
                <span role="img" aria-label={activity.name}>{activity.emoji}</span>
              </div>

              {/* Activity Name */}
              <h4 className="font-cinzel font-bold text-sm sm:text-base text-[#181C20] leading-tight">
                {activity.name}
              </h4>

              {activity.isComingSoon && (
                <span className="text-[10px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block mt-1.5">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 2: Infinite Loop Panoramic Stream (End-to-End, All 19 Photos) ─── */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#DF711B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTINUOUS PANORAMIC STREAM • REAL CAMPUS EVIDENCE</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#181C20]">
            Live Glimpses of Co-Curricular Life
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Tap any photograph in the stream to examine high-resolution archival evidence with detailed contextual narratives.
          </p>
        </div>

        <InfiniteLoopGallery
          row1Items={row1GalleryImages}
          row2Items={row2GalleryImages}
        />
      </div>

    </div>
  );
};

export default CoCurricularShowcase;
