import SphereImageGrid, { ImageData } from "@/components/ui/img-sphere";

// Image data using project assets - duplicated to fill sphere better
const BASE_IMAGES: Omit<ImageData, 'id'>[] = [
  {
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    alt: "Science Laboratory",
    title: "Experiential Science Labs",
    description: "State-of-the-art physics, chemistry, and biology laboratories for hands-on experimentation."
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    alt: "Smart Classroom",
    title: "Interactive Classrooms",
    description: "Digitally enabled smart classrooms supporting CBSE audio-visual pedagogy."
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    alt: "Central Library",
    title: "Knowledge Archive & Library",
    description: "Over 10,000+ reference volumes, CBSE manuals, and literary journals."
  },
  {
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
    alt: "Sports & Athletics",
    title: "Physical Education & Athletics",
    description: "Extensive sports ground for cricket, football, basketball, and track meets."
  },
  {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    alt: "Fine Arts Studio",
    title: "Creative Arts & Expression",
    description: "Visual arts, painting, classical music, and pottery studios."
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    alt: "Robotics & AI",
    title: "Robotics & Innovation Lab",
    description: "Hands-on STEM prototyping, IoT sensors, and computer programming."
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
    alt: "Mathematics Lab",
    title: "Mathematics & Logic Lab",
    description: "Abacus, geometry tools, and computational models for clear concept building."
  },
  {
    src: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    alt: "Spiritual Culture",
    title: "Chinmaya Cultural Ethos",
    description: "Daily morning assemblies, Vedic shlokas, and Bhagavad Gita chanting competitions."
  },
  {
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    alt: "Foundational Play",
    title: "Foundational Play-Way Stage",
    description: "Activity-based early childhood learning for Nursery, Jr KG, and Sr KG."
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    alt: "Language Lab",
    title: "Trilingual Language Hub",
    description: "Immersive language learning in English, Hindi, and Sanskrit / Marathi."
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    alt: "Student Collaboration",
    title: "Student Leadership & Houses",
    description: "Four dynamic houses fostering teamwork, camaraderie, and democratic elections."
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
    alt: "Higher Secondary Seminar",
    title: "Senior Secondary Streams",
    description: "Science (PCM/PCB), Commerce, and Humanities / Arts stream workshops."
  }
];

// Generate 48 images by repeating the base set for balanced sphere distribution
export const CURRICULUM_SPHERE_IMAGES: ImageData[] = [];
for (let i = 0; i < 48; i++) {
  const baseIndex = i % BASE_IMAGES.length;
  const baseImage = BASE_IMAGES[baseIndex];
  CURRICULUM_SPHERE_IMAGES.push({
    id: `sphere-img-${i + 1}`,
    ...baseImage,
    alt: `${baseImage.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`
  });
}

// Component configuration - easily adjustable
interface SphereConfig {
  containerSize: number;
  sphereRadius: number;
  dragSensitivity: number;
  momentumDecay: number;
  maxRotationSpeed: number;
  baseImageScale: number;
  hoverScale: number;
  perspective: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

export const SPHERE_CONFIG: SphereConfig = {
  containerSize: 580,          // Container size in pixels
  sphereRadius: 210,           // Virtual sphere radius
  dragSensitivity: 0.8,        // Mouse drag sensitivity
  momentumDecay: 0.96,         // Momentum decay rate
  maxRotationSpeed: 6,         // Max rotation speed
  baseImageScale: 0.15,        // Base image size
  hoverScale: 1.3,             // Hover scale multiplier
  perspective: 1000,           // CSS perspective value
  autoRotate: true,            // Auto rotation enabled
  autoRotateSpeed: 0.25        // Auto rotation speed
};

export default function DemoOne() {
  return (
    <main className="w-full p-6 flex justify-center items-center min-h-[600px]">
      <SphereImageGrid
        images={CURRICULUM_SPHERE_IMAGES}
        {...SPHERE_CONFIG}
      />
    </main>
  );
}
