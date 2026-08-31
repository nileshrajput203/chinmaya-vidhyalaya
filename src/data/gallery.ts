import { GalleryItem } from '../types/gallery';
import { SCHOOL_IMAGES } from './images';

export const OFFICIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Main Academic Block & Campus",
    category: "campus",
    imageUrl: SCHOOL_IMAGES.CAMPUS_HERO,
    caption: "Spacious academic building and lush green surrounds in Tarapur / Boisar."
  },
  {
    id: "gal-2",
    title: "Science & Technology Laboratory",
    category: "academics",
    imageUrl: SCHOOL_IMAGES.SCIENCE_LAB,
    caption: "Students conducting hands-on scientific experiments under faculty supervision."
  },
  {
    id: "gal-3",
    title: "Classroom Interactive Learning",
    category: "academics",
    imageUrl: SCHOOL_IMAGES.CLASSROOM_LEARNING,
    caption: "Dynamic learning environment promoting interactive student participation."
  },
  {
    id: "gal-4",
    title: "Annual Sports Meet & Field Events",
    category: "sports",
    imageUrl: SCHOOL_IMAGES.SPORTS_DAY,
    caption: "House competitions and athletic sports day events on school grounds."
  },
  {
    id: "gal-5",
    title: "Cultural Performance & Festival Celebration",
    category: "celebrations",
    imageUrl: SCHOOL_IMAGES.CULTURAL_EVENT,
    caption: "Vibrant traditional dances and cultural stage presentations by students."
  },
  {
    id: "gal-6",
    title: "Central Library & Research Corner",
    category: "academics",
    imageUrl: SCHOOL_IMAGES.LIBRARY_STUDY,
    caption: "Extensive book collection supporting self-study and reading habits."
  }
];

