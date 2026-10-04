import os
import re
import struct
from pathlib import Path
from collections import defaultdict
import json

root = Path(r"c:\Users\USER\Downloads\zip-repl\zip-repl")
src_dir = root / "src"

def get_dimensions(filepath):
    ext = filepath.suffix.lower()
    if ext == '.svg':
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read(4096)
                w = re.search(r'width=["\']([\d\.]+)["\']', content)
                h = re.search(r'height=["\']([\d\.]+)["\']', content)
                vb = re.search(r'viewBox=["\']([\d\.\s,-]+)["\']', content)
                if w and h:
                    return f"{int(float(w.group(1)))}x{int(float(h.group(1)))}"
                elif vb:
                    parts = re.split(r'[\s,]+', vb.group(1).strip())
                    if len(parts) >= 4:
                        return f"{int(float(parts[2]))}x{int(float(parts[3]))}"
        except Exception:
            pass
        return "Vector SVG"

    try:
        with open(filepath, 'rb') as f:
            data = f.read(100)
            if data.startswith(b'\x89PNG\r\n\x1a\n'):
                w, h = struct.unpack('>LL', data[16:24])
                return f"{w}x{h}"
            if data[:6] in (b'GIF87a', b'GIF89a'):
                w, h = struct.unpack('<HH', data[6:10])
                return f"{w}x{h}"
            if data.startswith(b'RIFF') and data[8:12] == b'WEBP':
                f.seek(12)
                chunk = f.read(18)
                if chunk.startswith(b'VP8 '):
                    w = (chunk[14] | (chunk[15] << 8)) & 0x3fff
                    h = (chunk[16] | (chunk[17] << 8)) & 0x3fff
                    return f"{w}x{h}"
                elif chunk.startswith(b'VP8L'):
                    b0, b1, b2, b3, b4 = chunk[9:14]
                    w = 1 + (((b1 & 0x3F) << 8) | b0)
                    h = 1 + (((b3 & 0xF) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6))
                    return f"{w}x{h}"
                elif chunk.startswith(b'VP8X'):
                    w = 1 + struct.unpack('<I', chunk[12:15] + b'\x00')[0]
                    h = 1 + struct.unpack('<I', chunk[15:18] + b'\x00')[0]
                    return f"{w}x{h}"
            if data[:4] == b'\x00\x00\x01\x00':
                w = data[6] or 256
                h = data[7] or 256
                return f"{w}x{h}"

        # JPEG
        with open(filepath, 'rb') as f:
            b = f.read()
            i = 0
            while i < len(b) - 1:
                if b[i] == 0xFF:
                    marker = b[i+1]
                    if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                        h, w = struct.unpack('>HH', b[i+5:i+9])
                        return f"{w}x{h}"
                    elif marker not in (0xD8, 0xD9, 0x00, 0xFF):
                        length = struct.unpack('>H', b[i+2:i+4])[0]
                        i += 2 + length
                        continue
                i += 1
    except Exception as e:
        return f"Error: {e}"
    return "Unknown"

# Find non-gallery image usages
code_files = [f for f in src_dir.rglob('*.ts*') if f.name != 'gallery.ts'] + [root / 'index.html']
img_pattern = re.compile(r'["\'`](/[^"\'`\n\r]*?\.(?:png|jpg|jpeg|webp|svg|gif|ico)|https://images\.unsplash\.com/[^"\'`\n\r]+)["\'`]', re.IGNORECASE)

non_gallery_refs = defaultdict(set)
for cf in code_files:
    txt = cf.read_text(encoding='utf-8', errors='ignore')
    for m in img_pattern.finditer(txt):
        url = m.group(1)
        non_gallery_refs[url].add(cf.relative_to(root).as_posix())

print(f"Total unique images referenced in UI components / data files (excluding gallery.ts): {len(non_gallery_refs)}")

results = []
for url, files in sorted(non_gallery_refs.items()):
    local_path = root / "public" / url.lstrip("/")
    dims = "Remote / External"
    size_kb = 0
    exists = False
    if local_path.exists():
        exists = True
        dims = get_dimensions(local_path)
        size_kb = local_path.stat().st_size / 1024
    
    results.append({
        "url": url,
        "is_local": exists,
        "current_dims": dims,
        "size_kb": f"{size_kb:.1f} KB" if exists else "Remote",
        "used_in": sorted(list(files))
    })

with open(root / "scripts" / "non_gallery_summary.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("Saved non_gallery_summary.json")
