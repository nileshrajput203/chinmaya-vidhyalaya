import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface BentoTile {
  id: string;
  type: 'cutout' | 'photo' | 'feature';
  src?: string;
  alt?: string;
  colSpanClass: string;
  rowSpanClass: string;
  caption?: string;
}

export interface TabData {
  id: string;
  prefix: string;
  keyword: string;
  featureTitle: string;
  featureSubtitle: string;
  href: string;
  tiles: BentoTile[];
}

const EXPERIENCE_TABS: TabData[] = [
  {
    id: 'academics',
    prefix: 'SHOW',
    keyword: 'ACADEMICS',
    featureTitle: 'ACADEMICS',
    featureSubtitle: 'EXPLORE',
    href: '/academics',
    tiles: [
      // Row 1: Col 1 (tall cutout 2 rows), Cols 2-3 (feature 2 cols), Col 4 (photo 1 col) -> 4 cols
      {
        id: 'ac-1',
        type: 'cutout',
        src: '/images/1.jpeg',
        alt: 'Academic Distinction Scholar',
        caption: 'CBSE Rank Achiever',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-2'
      },
      {
        id: 'ac-2',
        type: 'feature',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-3',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_014.jpg',
        alt: 'Senior Secondary Science Laboratory Session',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      // Row 2: (Col 1 taken by ac-1), Col 2 (photo), Col 3 (photo), Col 4 (photo) -> 4 cols
      {
        id: 'ac-4',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_022.jpg',
        alt: 'Smart Digital Classroom & Interactive Learning',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-5',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_033.jpg',
        alt: 'Central Reference Library and Reading Lounge',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-6',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_041.jpg',
        alt: 'Mathematics Olympiad & Analytical Drill',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      // Row 3: Col 1 (photo), Col 2 (photo), Cols 3-4 (photo wide 2 cols) -> 4 cols
      {
        id: 'ac-7',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_056.jpg',
        alt: 'Vedic Mathematics & Computational Logic',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-8',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_068.jpg',
        alt: 'Language Lab & Multilingual Recitations',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-9',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_073.jpg',
        alt: 'Scholastic Examination Hall & Focus',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      // Row 4: Col 1 (cutout 2), Cols 2-3 (photo wide 2 cols), Col 4 (cutout 3) -> 4 cols
      {
        id: 'ac-10',
        type: 'cutout',
        src: '/images/student_question_cutout.png',
        alt: 'STEM & Robotics Lead',
        caption: 'STEM & Robotics Lead',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-11',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_082.jpg',
        alt: 'Modern IT Laboratory & Coding Stations',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ac-12',
        type: 'cutout',
        src: '/images/principal-photo.jpg',
        alt: 'Faculty Mentorship & Guidance',
        caption: 'Faculty Mentorship',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      }
    ]
  },
  {
    id: 'athletics',
    prefix: 'SHOW',
    keyword: 'ATHLETICS',
    featureTitle: 'ATHLETICS',
    featureSubtitle: 'EXPLORE',
    href: '/student-life/sports',
    tiles: [
      {
        id: 'at-1',
        type: 'cutout',
        src: '/images/banner-1.jpg',
        alt: 'House Sports Captain',
        caption: 'House Sports Captain',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-2'
      },
      {
        id: 'at-2',
        type: 'feature',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-3',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_025.jpg',
        alt: 'Inter-House Sprint Championship',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-4',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_035.jpg',
        alt: 'Football Tournament Action',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-5',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_041.jpg',
        alt: 'Basketball Court Drills',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-6',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_055.jpg',
        alt: 'Sports Day March Past Ceremony',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-7',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_063.jpg',
        alt: 'Cricket Academy Nets',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-8',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_074.jpg',
        alt: 'Track Victory Podium',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-9',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_084.jpg',
        alt: 'Field Sports & Long Jump',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-10',
        type: 'cutout',
        src: '/images/2.jpeg',
        alt: 'District Gold Medalist',
        caption: 'District Gold Medalist',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-11',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_092.jpg',
        alt: 'Annual Athletic Trophy Presentation',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'at-12',
        type: 'cutout',
        src: '/images/1.jpeg',
        alt: 'Taekwondo Champion',
        caption: 'Karate Black Belt',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      }
    ]
  },
  {
    id: 'arts',
    prefix: 'SHOW',
    keyword: 'ARTS',
    featureTitle: 'ARTS',
    featureSubtitle: 'EXPLORE',
    href: '/student-life/arts',
    tiles: [
      {
        id: 'ar-1',
        type: 'cutout',
        src: '/images/student_question_cutout.png',
        alt: 'Classical Vocalist',
        caption: 'Classical Vocalist',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-2'
      },
      {
        id: 'ar-2',
        type: 'feature',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-3',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_015.jpg',
        alt: 'Classical Bharatnatyam Dance',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-4',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_089.jpg',
        alt: 'Fine Arts Studio & Painting',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-5',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_094.jpg',
        alt: 'School Orchestra Harmony',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-6',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_102.jpg',
        alt: 'Sculpting & Clay Modeling',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-7',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_113.jpg',
        alt: 'Annual Day Stage Performance',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-8',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_121.jpg',
        alt: 'Vocal Choral Recitation',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-9',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_131.jpg',
        alt: 'Theatrical Arts Stage Drama',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-10',
        type: 'cutout',
        src: '/images/banner-1.jpg',
        alt: 'Theatre Ensemble Actor',
        caption: 'Theatre Ensemble',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-11',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_134.jpg',
        alt: 'Traditional Arts & Crafts Gallery',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'ar-12',
        type: 'cutout',
        src: '/images/principal-photo.jpg',
        alt: 'Creative Direction Faculty',
        caption: 'Creative Direction',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      }
    ]
  },
  {
    id: 'spiritual-life',
    prefix: 'SHOW',
    keyword: 'SPIRITUAL LIFE',
    featureTitle: 'SPIRITUAL LIFE',
    featureSubtitle: 'EXPLORE',
    href: '/chinmaya-vision',
    tiles: [
      {
        id: 'sp-1',
        type: 'cutout',
        src: '/images/swami.jpeg',
        alt: 'Pujya Gurudev Swami Chinmayananda',
        caption: 'Pujya Gurudev Inspiration',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-2'
      },
      {
        id: 'sp-2',
        type: 'feature',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-3',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_001.jpg',
        alt: 'Morning Prayer & Assembly Invocation',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-4',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_018.jpg',
        alt: 'Bhagavad Gita Chanting Hall',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-5',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_028.jpg',
        alt: 'Paduka Pooja & Devotional Chorus',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-6',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_047.jpg',
        alt: 'Chinmaya Yuva Kendra Discourse',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-7',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_070.jpg',
        alt: 'Universal Peace Meditation',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-8',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_114.jpg',
        alt: 'Festive Cultural Celebration',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-9',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_125.jpg',
        alt: 'Value Education & Balvihar Circle',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-10',
        type: 'cutout',
        src: '/images/1.jpeg',
        alt: 'Balvihar Student Leader',
        caption: 'Balvihar Student Leader',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-11',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_133.jpg',
        alt: 'Devotional Assembly Fellowship',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sp-12',
        type: 'cutout',
        src: '/images/principal-photo.jpg',
        alt: 'Acharya Mentorship',
        caption: 'Acharya Mentorship',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      }
    ]
  },
  {
    id: 'student-life',
    prefix: 'SHOW',
    keyword: 'STUDENT LIFE',
    featureTitle: 'STUDENT LIFE',
    featureSubtitle: 'EXPLORE',
    href: '/student-life/activities',
    tiles: [
      {
        id: 'sl-1',
        type: 'cutout',
        src: '/images/banner-1.jpg',
        alt: 'Student Council Leadership',
        caption: 'Head Boy & Head Girl',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-2'
      },
      {
        id: 'sl-2',
        type: 'feature',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-3',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_007.jpg',
        alt: 'Student Prefectorial Investiture',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-4',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_021.jpg',
        alt: 'Science & Robotics Demonstrations',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-5',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_031.jpg',
        alt: 'Campus Garden & Eco Club',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-6',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_047.jpg',
        alt: 'Campus Social Pavilion',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-7',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_057.jpg',
        alt: 'Educational Field Excursion',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-8',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_081.jpg',
        alt: 'Inter-House Quiz Championship',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-9',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_098.jpg',
        alt: 'Creative Clubs & Collaborative Projects',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-10',
        type: 'cutout',
        src: '/images/2.jpeg',
        alt: 'Debate Society President',
        caption: 'Debate Society President',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-11',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-28_105.jpg',
        alt: 'Youth Parliament Assembly',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'sl-12',
        type: 'cutout',
        src: '/images/student_question_cutout.png',
        alt: 'Junior Scientist',
        caption: 'Junior Scientist',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      }
    ]
  },
  {
    id: 'community',
    prefix: 'SHOW',
    keyword: 'COMMUNITY',
    featureTitle: 'COMMUNITY',
    featureSubtitle: 'EXPLORE',
    href: '/about/mission',
    tiles: [
      {
        id: 'cm-1',
        type: 'cutout',
        src: '/images/principal-photo.jpg',
        alt: 'School Management Leadership',
        caption: 'Civic Outreach Coordinator',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-2'
      },
      {
        id: 'cm-2',
        type: 'feature',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-3',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_083.jpg',
        alt: 'Parents Teachers Association Meeting',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-4',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_095.jpg',
        alt: 'Boisar Community Tree Plantation Drive',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-5',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_101.jpg',
        alt: 'Blood Donation & Seva Camp',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-6',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_112.jpg',
        alt: 'Alumni Mentorship Network Forum',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-7',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_122.jpg',
        alt: 'Industrial Outreach & Science Visit',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-8',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_144.jpg',
        alt: 'Grandparents Day Fellowship Gathering',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-9',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_153.jpg',
        alt: 'Community Social Welfare Projects',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-10',
        type: 'cutout',
        src: '/images/1.jpeg',
        alt: 'Seva Volunteer Lead',
        caption: 'Seva Volunteer Lead',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-11',
        type: 'photo',
        src: '/images/school_events/School_Event_2026-09-27_160.jpg',
        alt: 'Neighborhood Festival & Harmony',
        colSpanClass: 'col-span-2',
        rowSpanClass: 'row-span-1'
      },
      {
        id: 'cm-12',
        type: 'cutout',
        src: '/images/swami.jpeg',
        alt: 'Universal Brotherhood Ideals',
        caption: 'Universal Brotherhood',
        colSpanClass: 'col-span-1',
        rowSpanClass: 'row-span-1'
      }
    ]
  }
];

export const ExperienceBentoGrid: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(EXPERIENCE_TABS[0].id);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTab = EXPERIENCE_TABS.find((t) => t.id === activeTabId) || EXPERIENCE_TABS[0];

  // Arrow key navigation across tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % EXPERIENCE_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + EXPERIENCE_TABS.length) % EXPERIENCE_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = EXPERIENCE_TABS.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      setActiveTabId(EXPERIENCE_TABS[nextIndex].id);
      tabButtonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="w-full py-20 lg:py-28 select-none border-t border-[var(--color-border)]"
    >
      {/* ------------------------------------------------------------------
          HEADING (CENTERED)
          ------------------------------------------------------------------ */}
      <div className="text-center mb-10 lg:mb-14 px-4">
        <p
          style={{ color: 'var(--color-text)' }}
          className="text-base sm:text-lg lg:text-xl uppercase font-bold tracking-[0.25em] font-sans"
        >
          EXPERIENCE
        </p>
        <h2
          style={{ color: 'var(--color-primary)' }}
          className="text-5xl sm:text-6xl lg:text-[clamp(44px,7.5vw,110px)] font-condensed uppercase tracking-wide leading-[0.92] mt-1 whitespace-nowrap"
        >
          CHINMAYA VIDYALAYA
        </h2>
      </div>

      {/* ------------------------------------------------------------------
          FILTER TABS (Centered row, ~65-68% viewport width, 6 buttons)
          ------------------------------------------------------------------ */}
      <div className="w-[94%] sm:w-[86%] lg:w-[68%] max-w-[1100px] mx-auto mb-10 lg:mb-14">
        <div
          role="tablist"
          aria-label="Experience Categories"
          className="flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 pb-2 sm:pb-0 scrollbar-none"
        >
          {EXPERIENCE_TABS.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabButtonRefs.current[idx] = el;
                }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={{
                  backgroundColor: isActive ? 'var(--color-dark)' : 'var(--color-bg)',
                  color: isActive ? 'var(--color-dark-text)' : 'var(--color-text)',
                  borderColor: isActive ? 'var(--color-dark)' : 'var(--color-border)',
                }}
                className={`
                  group shrink-0 sm:shrink h-[58px] lg:h-[60px] px-3 sm:px-2 rounded-none border text-xs sm:text-[13px] tracking-wider uppercase transition-colors duration-250 ease-out cursor-pointer flex items-center justify-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                  ${!isActive ? 'hover:bg-[var(--color-dark)] hover:text-[var(--color-dark-text)] hover:border-[var(--color-dark)]' : ''}
                `}
              >
                <span className="truncate leading-tight">
                  <span className="font-normal mr-1">{tab.prefix}</span>
                  <span className="font-bold">{tab.keyword}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          BENTO GRID CONTAINER (~84% of viewport width, 4 columns, tight dense packing)
          ------------------------------------------------------------------ */}
      <div
        id={`panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.id}`}
        className="w-[94%] sm:w-[90%] xl:w-[84%] max-w-[1600px] mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="grid grid-cols-2 md:grid-cols-4 [grid-auto-flow:dense] gap-4 auto-rows-[220px] sm:auto-rows-[240px] xl:auto-rows-[260px]"
          >
            {activeTab.tiles.map((tile) => {
              if (tile.type === 'feature') {
                return (
                  <div
                    key={tile.id}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-text)'
                    }}
                    className={`
                      ${tile.colSpanClass} ${tile.rowSpanClass}
                      p-8 sm:p-10 flex flex-col justify-between rounded-none shadow-sm relative overflow-hidden group
                    `}
                  >
                    <div>
                      <p className="text-white/80 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold mb-1">
                        {activeTab.featureSubtitle}
                      </p>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-condensed uppercase tracking-wide text-white leading-none mt-1">
                        {activeTab.featureTitle}
                      </h3>
                    </div>

                    <div className="pt-6">
                      <a
                        href={activeTab.href}
                        style={{
                          backgroundColor: 'var(--color-dark)',
                          color: 'var(--color-dark-text)'
                        }}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-none uppercase font-bold text-xs sm:text-sm tracking-wider transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                      >
                        <span>DISCOVER MORE</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              }

              if (tile.type === 'cutout') {
                return (
                  <div
                    key={tile.id}
                    style={{
                      backgroundColor: 'var(--color-dark)',
                      color: 'var(--color-dark-text)'
                    }}
                    className={`
                      ${tile.colSpanClass} ${tile.rowSpanClass}
                      relative rounded-none overflow-hidden flex flex-col justify-end p-4 group border border-black/20
                    `}
                  >
                    {/* Background subtle texture/gradient */}
                    <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />

                    {/* Transparent Cutout Person Image */}
                    <div className="absolute inset-0 flex items-center justify-center pt-4 px-2">
                      <img
                        src={tile.src}
                        alt={tile.alt || 'Chinmaya Vidyalaya Student Portrait'}
                        loading="lazy"
                        className="h-full w-auto max-h-[92%] object-contain object-bottom filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Bottom caption banner */}
                    {tile.caption && (
                      <div className="relative z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider self-start rounded-none">
                        {tile.caption}
                      </div>
                    )}
                  </div>
                );
              }

              // Default: Photo Tile
              return (
                <div
                  key={tile.id}
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-dark)'
                  }}
                  className={`
                    ${tile.colSpanClass} ${tile.rowSpanClass}
                    relative rounded-none overflow-hidden group border
                  `}
                >
                  <img
                    src={tile.src}
                    alt={tile.alt || 'Chinmaya Vidyalaya Campus Activity'}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle hover vignette overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
