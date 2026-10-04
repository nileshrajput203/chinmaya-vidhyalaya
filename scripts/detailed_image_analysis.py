import os
import re
import struct
from pathlib import Path
from collections import defaultdict

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

# Search code files for image occurrences
code_files = list(src_dir.rglob('*.ts*')) + list(src_dir.rglob('*.json')) + [root / 'index.html']
img_regex = re.compile(r'["\'`](/[^"\'`\n\r]*?\.(?:png|jpg|jpeg|webp|svg|gif|ico))["\'`]|["\'`](https://images\.unsplash\.com/[^"\'`\n\r]+)["\'`]', re.IGNORECASE)

references = defaultdict(list)
for cf in code_files:
    if not cf.exists(): continue
    try:
        content = cf.read_text(encoding='utf-8', errors='ignore')
        rel_cf = cf.relative_to(root).as_posix()
        for match in img_regex.finditer(content):
            val = match.group(1) or match.group(2)
            references[val].append(rel_cf)
    except Exception:
        pass

print(f"Total distinct image URLs/paths directly referenced in source files: {len(references)}")

# Check public/images root and subfolders
public_dir = root / "public"
public_images = list(public_dir.rglob('*'))
print(f"Total files in public: {len(public_images)}")

# Check what clusters or lists exist (e.g. cluster_reps, chinmaya, school_events)
# Let's see if there are data files or gallery files that reference folders
gallery_files = [f for f in code_files if 'gallery' in f.name.lower() or 'event' in f.name.lower() or 'photo' in f.name.lower()]
print(f"Gallery/Photo-related code files: {[f.name for f in gallery_files]}")

# Write all direct references to a file for analysis
with open(root / "scripts" / "direct_image_refs.txt", "w", encoding="utf-8") as out_f:
    for ref, files in sorted(references.items()):
        # Check if local file exists
        local_path = root / "public" / ref.lstrip("/")
        dims = ""
        if local_path.exists():
            dims = get_dimensions(local_path)
            size_kb = local_path.stat().st_size / 1024
            out_f.write(f"LOCAL: {ref} | Dims: {dims} | Size: {size_kb:.1f} KB\n")
        else:
            out_f.write(f"REMOTE/UNRESOLVED: {ref}\n")
        for fl in set(files):
            out_f.write(f"   -> {fl}\n")

print("Saved direct_image_refs.txt")
