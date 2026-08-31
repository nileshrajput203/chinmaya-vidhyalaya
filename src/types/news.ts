export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'general' | 'academic' | 'event' | 'circular';
  isImportant?: boolean;
  fileUrl?: string;
  summary: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'latest-updates' | 'festivals' | 'achievements';
  summary: string;
  content: string;
  image?: string;
}

export interface Circular {
  id: string;
  title: string;
  issueDate: string;
  targetAudience: 'parents' | 'students' | 'all';
  fileUrl: string;
  description: string;
}
