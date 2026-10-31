import { InfiniteLoopGallery, type InfiniteGalleryItem } from '../ui/infinite-loop-gallery';

/* ────────────────────────────────────────────────────────
   Activity List Data - Official, Relevant Standard Emojis
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
  { name: 'Football', emoji: '⚽', color: '#22C55E', bgColor: 'bg-green-50' },
  { name: 'Public Speaking', emoji: '🎙️', color: '#8B5CF6', bgColor: 'bg-purple-50' },
  { name: 'Gita Chanting', emoji: '🕉️', color: '#EA580C', bgColor: 'bg-orange-50' },
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
   Gallery Image Data - Real, Verified School Photos
   ──────────────────────────────────────────────────────── */

const row1GalleryImages: InfiniteGalleryItem[] = [
  {
    id: 'row1-1',
    title: 'Annual Athletic Meet',
    category: 'Sports & Athletics',
    desc: 'Opening ceremony and stadium track events featuring all four school houses.',
    url: '/images/chinmaya/sports/sports_athletic_meet_001.jpg',
  },
  {
    id: 'row1-2',
    title: 'Relay Sprint Championships',
    category: 'Track Finals',
    desc: 'High-intensity sprint finals showcasing student speed, form, and house spirit.',
    url: '/images/chinmaya/sports/sports_athletic_meet_002.jpg',
  },
  {
    id: 'row1-3',
    title: 'March Past Parade',
    category: 'House Discipline',
    desc: 'Disciplined parade and salute by the four houses before the ceremonial flame.',
    url: '/images/chinmaya/sports/sports_athletic_meet_003.jpg',
  },
  {
    id: 'row1-4',
    title: 'Football & Field Athletics',
    category: 'Field Events',
    desc: 'Team coordination, stamina, and strategic play on expansive school grounds.',
    url: '/images/chinmaya/sports/sports_athletic_meet_004.jpg',
  },
  {
    id: 'row1-5',
    title: 'Ceremonial Torch Relay',
    category: 'Sports Honours',
    desc: 'Flame lighting ceremony marking the formal opening of the inter-house championship.',
    url: '/images/chinmaya/sports/sports_athletic_meet_005.jpg',
  },
  {
    id: 'row1-6',
    title: 'Track Finish Decider',
    category: 'Athletics Decider',
    desc: 'Thrilling photo-finish moment cheered on by faculty, students, and parents.',
    url: '/images/chinmaya/sports/sports_athletic_meet_006.jpg',
  },
  {
    id: 'row1-7',
    title: 'Athlete Sprint Focus',
    category: 'Track Finals',
    desc: 'Student runners maintaining stride and competitive spirit in the 200m dash.',
    url: '/images/chinmaya/sports/sports_athletic_meet_007.jpg',
  },
  {
    id: 'row1-8',
    title: 'Sports Day March Contingents',
    category: 'Parade Discipline',
    desc: 'Marching contingents bearing house flags with pride, rhythm, and coordination.',
    url: '/images/chinmaya/sports/sports_athletic_meet_008.jpg',
  },
  {
    id: 'row1-9',
    title: 'Podium Medal Ceremony',
    category: 'Sports Honours',
    desc: 'Proud prize distribution celebrating student achievers and athletic excellence.',
    url: '/images/chinmaya/sports/sports_athletic_meet_009.jpg',
  },
  {
    id: 'row1-10',
    title: 'Field Athletics Championship',
    category: 'Field Events',
    desc: 'Precision field competitions fostering sportsmanship and perseverance.',
    url: '/images/chinmaya/sports/sports_athletic_meet_010.jpg',
  },
  {
    id: 'row1-11',
    title: 'Inter-House Athletic Trophy',
    category: 'Championship',
    desc: 'House captains hoisting the rolling championship cup with jubilant house teams.',
    url: '/images/chinmaya/sports/sports_athletic_meet_011.jpg',
  },
  {
    id: 'row1-12',
    title: 'Martial Arts & Taekwondo',
    category: 'Self Defence',
    desc: 'Disciplined kicks, kata sequences, and martial focus developing courage.',
    url: '/images/chinmaya/sports/sports_athletic_meet_014.jpg',
  },
];

const row2GalleryImages: InfiniteGalleryItem[] = [
  {
    id: 'row2-1',
    title: 'Classical Dance Drama',
    category: 'Performing Arts',
    desc: 'Graceful Bharatanatyam and thematic stage recitals on the grand stage.',
    url: '/images/chinmaya/cultural/cultural_celebration_006.jpg',
  },
  {
    id: 'row2-2',
    title: 'Fine Arts & Canvas Painting',
    category: 'Visual Arts',
    desc: 'Student oil paintings, watercolor landscapes, and creative art exhibits.',
    url: '/images/chinmaya/cultural/arts_and_creativity_001.jpg',
  },
  {
    id: 'row2-3',
    title: 'Annual Theatre Production',
    category: 'Drama & Theatre',
    desc: 'Dramatic stage plays building voice modulation, confidence, and expression.',
    url: '/images/chinmaya/cultural/cultural_celebration_020.jpg',
  },
  {
    id: 'row2-4',
    title: 'Clay Modelling & Pottery',
    category: 'Fine Crafts',
    desc: 'Hands-on clay sculpturing and tactile art sessions celebrating heritage craft.',
    url: '/images/chinmaya/cultural/arts_and_creativity_005.jpg',
  },
  {
    id: 'row2-5',
    title: 'Traditional Folk Dance',
    category: 'Cultural Heritage',
    desc: 'Vibrant regional folk dances showcasing India’s rich artistic diversity.',
    url: '/images/chinmaya/cultural/cultural_celebration_015.jpg',
  },
  {
    id: 'row2-6',
    title: 'Handicrafts & Textile Arts',
    category: 'Creative Workshop',
    desc: 'Tie-and-dye fabric design, embroidery, and vibrant handcrafted textiles.',
    url: '/images/chinmaya/cultural/arts_and_creativity_012.jpg',
  },
  {
    id: 'row2-7',
    title: 'Choir & Vocal Ensemble',
    category: 'Music',
    desc: 'Melodious choir performances, classical bhajans, and patriotic anthems.',
    url: '/images/chinmaya/cultural/cultural_celebration_048.jpg',
  },
  {
    id: 'row2-8',
    title: 'Science & Innovation Expo',
    category: 'STEM Learning',
    desc: 'Interactive chemical experiments and scientific working models.',
    url: '/images/chinmaya/academics/science_stem_lab_01.jpg',
  },
  {
    id: 'row2-9',
    title: 'Eco-Club Nature & Forestry',
    category: 'Environmental Club',
    desc: 'Campus tree plantation drives and environmental stewardship workshops.',
    url: '/images/chinmaya/cultural/cultural_celebration_073.jpg',
  },
  {
    id: 'row2-10',
    title: 'Classical Instrumental Ensemble',
    category: 'Music Academy',
    desc: 'Tabla, harmonium, and keyboard orchestration during cultural gatherings.',
    url: '/images/chinmaya/cultural/cultural_celebration_040.jpg',
  },
];

/* ────────────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────────────── */

export const CoCurricularShowcase: React.FC = () => {
  return (
    <div className="space-y-12">

      {/* ─── SECTION 1: Activity List - Unique Animated Grid ─── */}
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#181C20] pt-2">
            Co-Curricular
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            From performing arts to competitive sports, creative workshops to student governance - explore the full range of co-curricular programmes available to our students.
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
