export interface GalleryItem {
  id: string;
  title: string;
  category: 'events' | 'sports' | 'campus' | 'celebrations' | 'academics';
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  date?: string;
  academicYear?: string; // e.g. '2025-26', '2024-25', '2023-24'
  event?: string;        // e.g. 'Annual Day', 'Sports Day', 'Guru Paduka Pooja', 'STEM Labs', etc.
}

export interface GalleryAlbum {
  id: string;
  title: string;
  coverImage: string;
  itemCount: number;
  date: string;
  description: string;
}
