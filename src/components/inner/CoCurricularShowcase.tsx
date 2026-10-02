import { InfiniteLoopGallery, type InfiniteGalleryItem } from '../ui/infinite-loop-gallery';

/* ────────────────────────────────────────────────────────
   Activity List Data — Official, Relevant Standard Emojis
   ──────────────────────────────────────────────────────── */

interface Activity {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
}

const ACTIVITIES: Activity[] = [
  { name: 'Dance', emoji: '💃', color: '#F59E0B', bgColor: 'bg-amber-50' },
  { name: 'Arts', emoji: '🎨', color: '#10B981', bgColor: 'bg-emerald-50' },
  { name: 'Music', emoji: '🎵', color: '#3B82F6', bgColor: 'bg-blue-50' },
  { name: 'Taekwondo/karate', emoji: '🥋', color: '#EF4444', bgColor: 'bg-red-50' },
  { name: 'Swimming', emoji: '🏊', color: '#06B6D4', bgColor: 'bg-cyan-50' },
  { name: 'Football', emoji: '⚽', color: '#22C55E', bgColor: 'bg-green-50' },
  { name: 'Public Speaking', emoji: '🎙️', color: '#8B5CF6', bgColor: 'bg-purple-50' },
  { name: 'Gita Chanting', emoji: '🕉️', color: '#EA580C', bgColor: 'bg-orange-50' },
  { name: 'Horticulture', emoji: '🌱', color: '#16A34A', bgColor: 'bg-green-50' },
  { name: 'Robotics', emoji: '🤖', color: '#6366F1', bgColor: 'bg-indigo-50' },
  { name: 'Sports', emoji: '🏆', color: '#DF711B', bgColor: 'bg-orange-50' },
  { name: 'Library Programme', emoji: '📚', color: '#0891B2', bgColor: 'bg-teal-50' },
  { name: 'Student Council', emoji: '👥', color: '#0B1E34', bgColor: 'bg-slate-50' },
  { name: 'Trip & Expeditions', emoji: '🧭', color: '#D97706', bgColor: 'bg-amber-50' },
  { name: 'Health & Nutrition', emoji: '🥗', color: '#DC2626', bgColor: 'bg-red-50' },
  { name: 'Yoga & Wellness', emoji: '🧘', color: '#059669', bgColor: 'bg-emerald-50' },
  { name: 'Quiz & Debates', emoji: '💡', color: '#7C3AED', bgColor: 'bg-violet-50' },
];

/* ────────────────────────────────────────────────────────
   Gallery Image Data — Real, Verified School Photos
   ──────────────────────────────────────────────────────── */

const row1GalleryImages: InfiniteGalleryItem[] = [
  {
    id: 'row1-1',
    title: 'Annual Athletic Meet',
    category: 'Sports & Athletics',
    desc: 'Opening ceremony and stadium track events featuring all four school houses.',
    url: '/images/chinmaya/sports/sports_athletic_meet_001.webp',
  },
  {
    id: 'row1-2',
    title: '100m Sprint Championship',
    category: 'Track Finals',
    desc: 'High-intensity sprint finals showcasing student speed, form, and house spirit.',
    url: '/images/chinmaya/sports/sports_athletic_meet_003.webp',
  },
  {
    id: 'row1-3',
    title: 'March Past Ceremony',
    category: 'House Discipline',
    desc: 'Disciplined parade and salute by the four houses before the ceremonial flame.',
    url: '/images/chinmaya/sports/sports_athletic_meet_005.webp',
  },
  {
    id: 'row1-4',
    title: '4x100m Baton Relay',
    category: 'Track Events',
    desc: 'Exciting baton exchanges demonstrating seamless teamwork and lightning pace.',
    url: '/images/chinmaya/sports/sports_athletic_meet_007.webp',
  },
  {
    id: 'row1-5',
    title: 'Podium Medal Ceremony',
    category: 'Sports Honours',
    desc: 'Proud prize distribution celebrating student achievers and athletic excellence.',
    url: '/images/chinmaya/sports/sports_athletic_meet_009.webp',
  },
  {
    id: 'row1-6',
    title: 'Long Jump & Field Athletics',
    category: 'Field Events',
    desc: 'Students competing in precision field athletics on the school sports arena.',
    url: '/images/chinmaya/sports/sports_athletic_meet_010.webp',
  },
  {
    id: 'row1-7',
    title: 'Opening House Salute',
    category: 'House Parade',
    desc: 'Marching contingents bearing house flags with pride and determination.',
    url: '/images/chinmaya/sports/sports_athletic_meet_014.webp',
  },
  {
    id: 'row1-8',
    title: 'Sprint Finish Decider',
    category: 'Athletics',
    desc: 'Thrilling photo-finish moment cheered on by faculty, students, and parents.',
    url: '/images/chinmaya/sports/sports_athletic_meet_016.webp',
  },
  {
    id: 'row1-9',
    title: 'Sports Arena & Pavilion',
    category: 'Campus Facilities',
    desc: 'World-class open grounds and pavilions supporting training and tournaments.',
    url: '/images/chinmaya/campus/campus_facilities_002.webp',
  },
  {
    id: 'row1-10',
    title: 'Outdoor Expeditions & Treks',
    category: 'Tours & Adventure',
    desc: 'Experiential nature learning journeys that cultivate resilience and leadership.',
    url: '/images/tour.webp',
  },
];

const row2GalleryImages: InfiniteGalleryItem[] = [
  {
    id: 'row2-1',
    title: 'Classical Dance Drama',
    category: 'Performing Arts',
    desc: 'Graceful Bharatanatyam and thematic stage recitals on the grand stage.',
    url: '/images/chinmaya/cultural/cultural_celebration_006.webp',
  },
  {
    id: 'row2-2',
    title: 'Fine Arts & Canvas Painting',
    category: 'Visual Arts',
    desc: 'Student oil paintings, watercolor landscapes, and creative art exhibits.',
    url: '/images/chinmaya/cultural/arts_and_creativity_001.webp',
  },
  {
    id: 'row2-3',
    title: 'Annual Theatre Production',
    category: 'Drama & Theatre',
    desc: 'Dramatic stage plays building voice modulation, confidence, and expression.',
    url: '/images/chinmaya/cultural/cultural_celebration_020.webp',
  },
  {
    id: 'row2-4',
    title: 'Clay Modelling & Pottery',
    category: 'Fine Crafts',
    desc: 'Hands-on clay sculpturing and tactile art sessions celebrating heritage craft.',
    url: '/images/chinmaya/cultural/arts_and_creativity_005.webp',
  },
  {
    id: 'row2-5',
    title: 'Yoga & Holistic Wellness',
    category: 'Health & Mind',
    desc: 'Daily pranayama, asanas, and mindful breathing cultivating inner balance.',
    url: '/images/banner-8.webp',
  },
  {
    id: 'row2-6',
    title: 'Handicrafts & Textile Arts',
    category: 'Creative Workshop',
    desc: 'Tie-and-dye fabric design, embroidery, and vibrant handcrafted textiles.',
    url: '/images/chinmaya/cultural/arts_and_creativity_012.webp',
  },
  {
    id: 'row2-7',
    title: 'Choir & Vocal Ensemble',
    category: 'Music',
    desc: 'Melodious choir performances, classical bhajans, and patriotic anthems.',
    url: '/images/chinmaya/cultural/cultural_celebration_048.webp',
  },
  {
    id: 'row2-8',
    title: 'Science & Innovation Expo',
    category: 'STEM Learning',
    desc: 'Interactive chemical experiments and scientific working models.',
    url: '/images/CHEM1.webp',
  },
  {
    id: 'row2-9',
    title: 'Folk Heritage Showcase',
    category: 'Indian Culture',
    desc: 'Rhythmic folk dance routines celebrating the diverse cultural richness of India.',
    url: '/images/chinmaya/cultural/cultural_celebration_073.webp',
  },
  {
    id: 'row2-10',
    title: 'Lush Campus & Courtyards',
    category: 'Campus Environment',
    desc: 'Serene tree-lined campus grounds encouraging outdoor reflection and study.',
    url: '/images/chinmaya/campus/campus_facilities_001.webp',
  },
];

/* ────────────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────────────── */

export const CoCurricularShowcase: React.FC = () => {
  return (
    <div className="space-y-12">

      {/* ─── SECTION 1: Activity List — Unique Animated Grid ─── */}
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#181C20] pt-2">
            Co-Curricular
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            From performing arts to competitive sports, creative workshops to student governance — explore the full range of co-curricular programmes available to our students.
          </p>
        </div>

        {/* Interactive Activity Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {ACTIVITIES.map((activity, idx) => {
            return (
              <div
                key={activity.name}
                className={`${activity.bgColor} group relative border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-[#DF711B]/40 transition-all duration-300 cursor-default hover:scale-[1.03]`}
                style={{
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                {/* Floating Number Badge */}
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold text-slate-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Official Standard Emoji */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 text-2xl sm:text-3xl select-none"
                  style={{ backgroundColor: activity.color + '18' }}
                >
                  <span role="img" aria-label={activity.name}>{activity.emoji}</span>
                </div>

                {/* Activity Name */}
                <h4 className="font-cinzel font-bold text-sm sm:text-base text-[#181C20] leading-tight">
                  {activity.name}
                </h4>

                {/* Hover Accent Line */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: activity.color }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION 2: Infinite Loop Image Gallery (Left to Right, End-to-End) ─── */}
      <InfiniteLoopGallery
        row1Items={row1GalleryImages}
        row2Items={row2GalleryImages}
      />

    </div>
  );
};

export default CoCurricularShowcase;
