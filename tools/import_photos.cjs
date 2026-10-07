const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'school');
const destDir = path.join(__dirname, 'public', 'images', 'school_events');
const galleryFile = path.join(__dirname, 'src', 'data', 'gallery.ts');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.JPG') || f.endsWith('.jpg') || f.endsWith('.png'));

const fileStats = files.map(file => {
    const filePath = path.join(srcDir, file);
    const stats = fs.statSync(filePath);
    return { file, mtime: stats.mtime };
}).sort((a, b) => a.mtime - b.mtime);

let dateCounts = {};
let galleryEntries = [];

fileStats.forEach((fsItem) => {
    const dateStr = fsItem.mtime.toISOString().split('T')[0];
    dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    const numStr = dateCounts[dateStr].toString().padStart(3, '0');
    
    const newFileName = `School_Event_${dateStr}_${numStr}.jpg`;
    
    fs.copyFileSync(path.join(srcDir, fsItem.file), path.join(destDir, newFileName));
    
    const entry = `
  {
    id: "auto-${dateStr}-${numStr}",
    title: "School Activity ${dateStr} - ${numStr}",
    category: "events",
    event: "Campus Life",
    academicYear: "2026-27",
    date: "${dateStr}",
    imageUrl: "/images/school_events/${newFileName}",
    caption: "School event photograph taken on ${dateStr}."
  }`;
    galleryEntries.push(entry);
});

let galleryContent = fs.readFileSync(galleryFile, 'utf8');

const insertIndex = galleryContent.indexOf('export const OFFICIAL_GALLERY: GalleryItem[] = [') + 'export const OFFICIAL_GALLERY: GalleryItem[] = ['.length;
if (insertIndex > -1) {
    let newContent = galleryContent.slice(0, insertIndex) + galleryEntries.join(',') + ',' + galleryContent.slice(insertIndex);
    
    // add '2026-27' to GALLERY_YEARS
    newContent = newContent.replace(
        "export const GALLERY_YEARS = ['All Years', ",
        "export const GALLERY_YEARS = ['All Years', '2026-27', "
    );

    fs.writeFileSync(galleryFile, newContent);
    console.log(`Successfully processed ${fileStats.length} photos and updated gallery.`);
} else {
    console.log('Could not find OFFICIAL_GALLERY array in gallery.ts');
}
