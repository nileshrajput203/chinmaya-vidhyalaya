import { OFFICIAL_SCHOOL_INFO, OFFICIAL_PRINCIPAL_INFO } from '../data/school';
import { ABOUT_SECTIONS, AboutSectionData } from '../data/about';
import { ACADEMIC_SECTIONS, AcademicSectionData } from '../data/academics';
import { FEATURE_SECTIONS, FeatureSectionData } from '../data/features';
import { OFFICIAL_NEWS } from '../data/news';
import { OFFICIAL_NOTICES } from '../data/notices';
import { OFFICIAL_GALLERY } from '../data/gallery';
import { OFFICIAL_ACHIEVEMENTS } from '../data/achievements';
import { SchoolInfo, PrincipalInfo, Achievement } from '../types/school';
import { NewsArticle, Notice } from '../types/news';
import { GalleryItem } from '../types/gallery';

export const contentService = {
  async getSchoolInfo(): Promise<SchoolInfo> {
    return Promise.resolve(OFFICIAL_SCHOOL_INFO);
  },

  async getPrincipalInfo(): Promise<PrincipalInfo> {
    return Promise.resolve(OFFICIAL_PRINCIPAL_INFO);
  },

  async getAboutSection(slug: string): Promise<AboutSectionData | null> {
    const section = ABOUT_SECTIONS[slug];
    return Promise.resolve(section || null);
  },

  async getAcademicSection(slug: string): Promise<AcademicSectionData | null> {
    const section = ACADEMIC_SECTIONS[slug];
    return Promise.resolve(section || null);
  },

  async getFeatureSection(slug: string): Promise<FeatureSectionData | null> {
    const section = FEATURE_SECTIONS[slug];
    return Promise.resolve(section || null);
  },

  async getLatestNews(limit?: number): Promise<NewsArticle[]> {
    if (limit) {
      return Promise.resolve(OFFICIAL_NEWS.slice(0, limit));
    }
    return Promise.resolve(OFFICIAL_NEWS);
  },

  async getNotices(limit?: number): Promise<Notice[]> {
    if (limit) {
      return Promise.resolve(OFFICIAL_NOTICES.slice(0, limit));
    }
    return Promise.resolve(OFFICIAL_NOTICES);
  },

  async getGallery(filters?: { category?: string; academicYear?: string; event?: string } | string): Promise<GalleryItem[]> {
    if (!filters) return Promise.resolve(OFFICIAL_GALLERY);
    
    if (typeof filters === 'string') {
      if (filters === 'all') return Promise.resolve(OFFICIAL_GALLERY);
      return Promise.resolve(OFFICIAL_GALLERY.filter(item => item.category === filters));
    }

    let result = OFFICIAL_GALLERY;
    if (filters.category && filters.category !== 'all') {
      result = result.filter(item => item.category === filters.category);
    }
    if (filters.academicYear && filters.academicYear !== 'All Years') {
      result = result.filter(item => item.academicYear === filters.academicYear);
    }
    if (filters.event && filters.event !== 'All Events') {
      result = result.filter(item => item.event === filters.event);
    }
    return Promise.resolve(result);
  },

  async getAchievements(): Promise<Achievement[]> {
    return Promise.resolve(OFFICIAL_ACHIEVEMENTS);
  }
};
