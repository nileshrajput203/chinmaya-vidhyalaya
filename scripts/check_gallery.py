import re
from pathlib import Path
from collections import Counter

fpath = Path('src/data/gallery.ts')
txt = fpath.read_text(encoding='utf-8', errors='ignore')

# Match imageUrl
image_urls = re.findall(r'imageUrl:\s*["\']([^"\']+)["\']', txt)
categories = re.findall(r'category:\s*["\']([^"\']+)["\']', txt)

print(f"Total gallery items: {len(image_urls)}")
print(f"Categories count: {Counter(categories)}")

# Check unique paths
unique_imgs = set(image_urls)
print(f"Unique image paths in gallery: {len(unique_imgs)}")

# Check prefix folders
folders = Counter()
for u in unique_imgs:
    parts = u.strip('/').split('/')
    if len(parts) > 1:
        folders['/'.join(parts[:2])] += 1
    else:
        folders['root'] += 1

print("Gallery images by directory:")
for f, cnt in sorted(folders.items(), key=lambda x: -x[1]):
    print(f"  {f}: {cnt}")
