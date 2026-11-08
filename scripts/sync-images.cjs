/**
 * Auto-Scans public/images/ organized folders and creates a unified image registry.
 * Whenever an image is added, deleted, or replaced in any section folder,
 * running this script (or running dev server) automatically updates the registry!
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const PUBLIC_IMG_DIR = path.join(ROOT_DIR, 'public', 'images');
const REGISTRY_OUT_PATH = path.join(ROOT_DIR, 'src', 'data', 'imageRegistry.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);

/**
 * Clean a filename into a human-readable title / caption
 * e.g. "01-physics-lab-apparatus.jpg" -> "Physics Lab Apparatus"
 */
function filenameToCaption(filename) {
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
  const cleaned = nameWithoutExt
    .replace(/^[0-9]+[-_]/, '') // remove leading numbers like 01-
    .replace(/[-_]+/g, ' ')     // replace dashes and underscores with space
    .trim();

  // Capitalize words
  return cleaned
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Scan a specific directory inside public/images
 */
function scanFolder(relativeFolder) {
  const fullPath = path.join(PUBLIC_IMG_DIR, relativeFolder);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  // Check for custom captions file: captions.json
  const captionsFilePath = path.join(fullPath, 'captions.json');
  let customCaptions = {};
  if (fs.existsSync(captionsFilePath)) {
    try {
      customCaptions = JSON.parse(fs.readFileSync(captionsFilePath, 'utf8'));
    } catch (e) {
      console.warn(`[Image Scanner] Warning: Invalid JSON in ${captionsFilePath}`);
    }
  }

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    const webPath = `/images/${relativeFolder.replace(/\\/g, '/')}/${entry.name}`;
    const caption = customCaptions[entry.name] || filenameToCaption(entry.name);

    images.push({
      src: webPath,
      caption: caption,
      fileName: entry.name
    });
  }

  // Sort logically (e.g. 1, 2, 3...)
  images.sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: 'base' }));
  return images;
}

function generateRegistry() {
  const registry = {
    _meta: {
      description: "Auto-generated Image Registry. Do not edit manually. Edit files in public/images/ directly.",
      updatedAt: new Date().toISOString()
    },
    homeHero: scanFolder('01-home-hero'),
    leadership: scanFolder('02-leadership'),
    aboutHeritage: scanFolder('03-about-heritage'),
    academics: {
      classrooms: scanFolder('04-academics/classrooms'),
      library: scanFolder('04-academics/library'),
      sports: scanFolder('04-academics/sports'),
      cultural: scanFolder('04-academics/cultural'),
      labs: {
        physics: scanFolder('04-academics/labs/physics'),
        chemistry: scanFolder('04-academics/labs/chemistry'),
        biology: scanFolder('04-academics/labs/biology'),
        computer: scanFolder('04-academics/labs/computer')
      }
    },
    fourPillars: scanFolder('05-four-pillars'),
    gallery: {
      academics: scanFolder('06-gallery/academics'),
      sports: scanFolder('06-gallery/sports'),
      cultural: scanFolder('06-gallery/cultural'),
      campus: scanFolder('06-gallery/campus'),
      celebrations: scanFolder('06-gallery/celebrations')
    },
    branding: scanFolder('07-branding')
  };

  fs.mkdirSync(path.dirname(REGISTRY_OUT_PATH), { recursive: true });
  fs.writeFileSync(REGISTRY_OUT_PATH, JSON.stringify(registry, null, 2), 'utf8');
  console.log(`[Image Scanner] Registry generated successfully at ${path.relative(ROOT_DIR, REGISTRY_OUT_PATH)}`);
  return registry;
}

if (require.main === module) {
  generateRegistry();
}

module.exports = { generateRegistry, filenameToCaption };

