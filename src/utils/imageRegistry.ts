/**
 * CHINMAYA VIDYALAYA TARAPUR - CENTRAL IMAGE REGISTRY UTILITY
 * 
 * Automatically reads from the auto-scanned imageRegistry.json.
 * Whenever you add or delete an image in public/images/0*-sections,
 * this utility will automatically serve the updated image list!
 */
import rawRegistry from '../data/imageRegistry.json';

export interface RegistryImage {
  src: string;
  caption: string;
  fileName: string;
}

export interface ImageRegistryType {
  _meta: {
    description: string;
    updatedAt: string;
  };
  homeHero: RegistryImage[];
  leadership: RegistryImage[];
  aboutHeritage: RegistryImage[];
  academics: {
    classrooms: RegistryImage[];
    library: RegistryImage[];
    sports: RegistryImage[];
    cultural: RegistryImage[];
    labs: {
      physics: RegistryImage[];
      chemistry: RegistryImage[];
      biology: RegistryImage[];
      computer: RegistryImage[];
    };
  };
  fourPillars: RegistryImage[];
  gallery: {
    academics: RegistryImage[];
    sports: RegistryImage[];
    cultural: RegistryImage[];
    campus: RegistryImage[];
    celebrations: RegistryImage[];
  };
  branding: RegistryImage[];
}

export const imageRegistry: ImageRegistryType = rawRegistry as ImageRegistryType;

/**
 * Get the dynamic photo gallery for any infrastructure facility.
 * If new images are added to the corresponding folder in public/images/04-academics/...,
 * they will automatically appear here!
 */
export function getFacilityGallery(facilityId: string): Array<{ src: string; caption: string }> {
  switch (facilityId) {
    case 'physics-lab':
      return imageRegistry.academics.labs.physics;
    case 'chemistry-lab':
      return imageRegistry.academics.labs.chemistry;
    case 'biology-lab':
      return imageRegistry.academics.labs.biology;
    case 'it-lab':
    case 'computer-lab':
      return imageRegistry.academics.labs.computer;
    case 'classrooms':
      return imageRegistry.academics.classrooms;
    case 'library':
      return imageRegistry.academics.library;
    case 'sports-ground':
    case 'sports':
      return imageRegistry.academics.sports;
    case 'cultural-assembly':
      return imageRegistry.academics.cultural;
    default:
      return [];
  }
}

/**
 * Get hero slides dynamically from public/images/01-home-hero/
 */
export function getHeroImages(): RegistryImage[] {
  return imageRegistry.homeHero;
}

/**
 * Get leadership images from public/images/02-leadership/
 */
export function getLeadershipImages(): RegistryImage[] {
  return imageRegistry.leadership;
}

/**
 * Get heritage images from public/images/03-about-heritage/
 */
export function getHeritageImages(): RegistryImage[] {
  return imageRegistry.aboutHeritage;
}

/**
 * Get gallery images by category from public/images/06-gallery/...
 */
export function getGalleryCategoryImages(category: 'academics' | 'sports' | 'cultural' | 'campus' | 'celebrations'): RegistryImage[] {
  return imageRegistry.gallery[category] || [];
}
