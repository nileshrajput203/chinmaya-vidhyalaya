import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = path.resolve('..'); // c:\Users\USER\Downloads\zip-repl

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif', '.bmp', '.ico']);

function parseSvgDimensions(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const widthMatch = content.match(/width="([0-9.]+)(?:px)?"/i);
    const heightMatch = content.match(/height="([0-9.]+)(?:px)?"/i);
    const viewBoxMatch = content.match(/viewBox="([0-9.\s,-]+)"/i);

    let width = widthMatch ? parseFloat(widthMatch[1]) : null;
    let height = heightMatch ? parseFloat(heightMatch[1]) : null;

    if ((!width || !height) && viewBoxMatch) {
      const parts = viewBoxMatch[1].trim().split(/[\s,]+/).map(parseFloat);
      if (parts.length === 4) {
        width = width || parts[2];
        height = height || parts[3];
      }
    }
    return { width: width || 'Vector (scalable)', height: height || 'Vector (scalable)' };
  } catch (e) {
    return { width: 'Unknown', height: 'Unknown', error: e.message };
  }
}

async function getImageMeta(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const sizeBytes = stat.size;
  const sizeKb = (sizeBytes / 1024).toFixed(2);

  if (ext === '.svg') {
    const { width, height } = parseSvgDimensions(filePath);
    return {
      filePath,
      filename: path.basename(filePath),
      ext,
      sizeBytes,
      sizeKb,
      width,
      height,
      aspectRatio: (typeof width === 'number' && typeof height === 'number') ? (width / height).toFixed(2) : 'Vector',
    };
  }

  try {
    const metadata = await sharp(filePath).metadata();
    return {
      filePath,
      filename: path.basename(filePath),
      ext,
      sizeBytes,
      sizeKb,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      aspectRatio: metadata.width && metadata.height ? (metadata.width / metadata.height).toFixed(2) : null,
    };
  } catch (err) {
    return {
      filePath,
      filename: path.basename(filePath),
      ext,
      sizeBytes,
      sizeKb,
      width: 'Error',
      height: 'Error',
      error: err.message,
    };
  }
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.vscode' || entry.name === 'dist') {
        continue;
      }
      getAllFiles(fullPath, fileList);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (imageExtensions.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function run() {
  const allImages = getAllFiles(rootDir);
  console.log(`Found total ${allImages.length} image files across project.`);

  const results = [];
  for (const imgPath of allImages) {
    const meta = await getImageMeta(imgPath);
    // make relative path from rootDir
    meta.relPath = path.relative(rootDir, imgPath).replace(/\\/g, '/');
    results.push(meta);
  }

  // Save to json
  fs.writeFileSync(path.join(process.cwd(), 'tools', 'image_report.json'), JSON.stringify(results, null, 2));

  // Count by folder
  const folderCounts = {};
  for (const r of results) {
    const folder = r.relPath.split('/').slice(0, 2).join('/');
    folderCounts[folder] = (folderCounts[folder] || 0) + 1;
  }

  console.log('Folder breakdown:', JSON.stringify(folderCounts, null, 2));

  // Principal images specifically
  const principalImages = results.filter(r => 
    r.relPath.toLowerCase().includes('principal') || 
    r.relPath.toLowerCase().includes('dimple')
  );
  console.log('\n--- PRINCIPAL IMAGES ---');
  console.log(JSON.stringify(principalImages, null, 2));
}

run().catch(console.error);
