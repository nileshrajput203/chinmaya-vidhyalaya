import re
from pathlib import Path

src_dir = Path('src')
public_dir = Path('public')

img_pattern = re.compile(r'["\'](/images/[^"\'\s>]+)["\']')

missing = {}
all_refs = set()

for ext in ['*.ts', '*.tsx', '*.js', '*.jsx', '*.html', '*.json', '*.css', '*.md']:
    for p in src_dir.rglob(ext):
        content = p.read_text(encoding='utf-8', errors='ignore')
        matches = img_pattern.findall(content)
        for m in matches:
            clean_m = m.split('?')[0].split('#')[0]
            # Ignore if not an image extension or directory
            if not any(clean_m.lower().endswith(e) for e in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico']):
                continue
            all_refs.add(clean_m)
            target = public_dir / clean_m.lstrip('/')
            if not target.exists():
                if clean_m not in missing:
                    missing[clean_m] = []
                missing[clean_m].append(str(p))

print(f"Total unique image paths referenced: {len(all_refs)}")
print(f"Total missing unique images: {len(missing)}")
for img, files in sorted(missing.items()):
    print(f"\nMISSING: {img} ({len(files)} occurrences)")
    for f in sorted(set(files)):
        print(f"  in {f}")
