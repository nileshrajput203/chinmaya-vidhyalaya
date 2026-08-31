export interface GalleryItem {
  id: string;
  title: string;
  category: 'events' | 'sports' | 'campus' | 'celebrations' | 'academics';
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  date?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  coverImage: string;
  itemCount: number;
  date: string;
  description: string;
}
