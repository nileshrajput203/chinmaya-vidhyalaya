export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  qualification?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[]; // Structured paragraphs with rich body
  keyTakeaways?: string[];
  quote?: {
    text: string;
    source: string;
  };
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishDate: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
}

export type BlogCategoryFilter = string;
