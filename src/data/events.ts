export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  time: string;
  venue: string;
  tag: string;
  desc: string;
  summary: string;
}

export const UPCOMING_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-18',
    title: 'Winter Break',
    date: 'December 25, 2026',
    month: 'December 2026',
    time: '25.12.2026 - 01.01.2027',
    venue: 'School Campus',
    tag: 'Vacation Break',
    desc: 'Winter Break from 25.12.2026 to 01.01.2027. School reopens on 02.01.2027.',
    summary: 'Winter Break from 25.12.2026 to 01.01.2027. School reopens on 02.01.2027.'
  },
  {
    id: 'ev-19',
    title: 'Makar Sankranti',
    date: 'January 14, 2027',
    month: 'January 2027',
    time: 'School Holiday',
    venue: 'School Campus',
    tag: 'Festival Holiday',
    desc: 'School remains closed on the auspicious occasion of Makar Sankranti (14.01.2027).',
    summary: 'School holiday on the auspicious occasion of Makar Sankranti (14.01.2027).'
  },
  {
    id: 'ev-20',
    title: 'Republic Day',
    date: 'January 26, 2027',
    month: 'January 2027',
    time: '08:00 AM IST',
    venue: 'School Grounds',
    tag: 'National Celebration',
    desc: 'Ceremonial parade, national flag hoisting, and patriotic cultural presentations on Republic Day (26.01.2027).',
    summary: 'Republic Day ceremonial parade and national flag hoisting (26.01.2027).'
  },
  {
    id: 'ev-21',
    title: 'Mahashivratri',
    date: 'March 06, 2027',
    month: 'March 2027',
    time: 'School Holiday',
    venue: 'School Campus',
    tag: 'Festival Holiday',
    desc: 'School remains closed on the auspicious occasion of Mahashivratri (06.03.2027).',
    summary: 'School holiday on the occasion of Mahashivratri (06.03.2027).'
  },
  {
    id: 'ev-22',
    title: 'Holi',
    date: 'March 22, 2027',
    month: 'March 2027',
    time: 'School Holiday',
    venue: 'School Campus',
    tag: 'Festival Holiday',
    desc: 'School remains closed on the joyful festival of Holi (22.03.2027).',
    summary: 'School holiday on the occasion of Holi (22.03.2027).'
  }
];
