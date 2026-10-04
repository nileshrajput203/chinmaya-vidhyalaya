import os
import re
import struct
from pathlib import Path
import json

root = Path(r"c:\Users\USER\Downloads\zip-repl\zip-repl")

def get_image_size(file_path):
    ext = file_path.suffix.lower()
    if ext == '.svg':
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read(4096)
                w = re.search(r'width=["\']([\d\.]+)["\']', content)
                h = re.search(r'height=["\']([\d\.]+)["\']', content)
                vb = re.search(r'viewBox=["\']([\d\.\s,-]+)["\']', content)
                if w and h:
                    return int(float(w.group(1))), int(float(h.group(1)))
                elif vb:
                    parts = re.split(r'[\s,]+', vb.group(1).strip())
                    if len(parts) >= 4:
                        return int(float(parts[2])), int(float(parts[3]))
        except Exception:
            pass
        return "Vector (SVG)", "Scalable"

    try:
        with open(file_path, 'rb') as f:
            data = f.read(100)
            if data.startswith(b'\x89PNG\r\n\x1a\n'):
                w, h = struct.unpack('>LL', data[16:24])
                return w, h
            if data[:6] in (b'GIF87a', b'GIF89a'):
                w, h = struct.unpack('<HH', data[6:10])
                return w, h
            if data.startswith(b'RIFF') and data[8:12] == b'WEBP':
                f.seek(12)
                chunk = f.read(18)
                if chunk.startswith(b'VP8 '):
                    w = (chunk[14] | (chunk[15] << 8)) & 0x3fff
                    h = (chunk[16] | (chunk[17] << 8)) & 0x3fff
                    return w, h
                elif chunk.startswith(b'VP8L'):
                    b0, b1, b2, b3, b4 = chunk[9:14]
                    w = 1 + (((b1 & 0x3F) << 8) | b0)
                    h = 1 + (((b3 & 0xF) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6))
                    return w, h
                elif chunk.startswith(b'VP8X'):
                    w = 1 + struct.unpack('<I', chunk[12:15] + b'\x00')[0]
                    h = 1 + struct.unpack('<I', chunk[15:18] + b'\x00')[0]
                    return w, h
            if data[:4] == b'\x00\x00\x01\x00':
                # ICO
                w = data[6] or 256
                h = data[7] or 256
                return w, h

        # JPEG
        with open(file_path, 'rb') as f:
            b = f.read()
            i = 0
            while i < len(b) - 1:
                if b[i] == 0xFF:
                    marker = b[i+1]
                    if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                        h, w = struct.unpack('>HH', b[i+5:i+9])
                        return w, h
                    elif marker not in (0xD8, 0xD9, 0x00, 0xFF):
                        length = struct.unpack('>H', b[i+2:i+4])[0]
                        i += 2 + length
                        continue
                i += 1
    except Exception as e:
        return f"Error: {e}", None
    return "Unknown", "Unknown"

# 1. Scan image files
images_info = {}
for p in root.rglob('*'):
    if p.is_file() and p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico'):
        parts = p.parts
        if any(ign in parts for ign in ('node_modules', '.git', 'dist', 'tools')):
            continue
        rel = p.relative_to(root).as_posix()
        sz = get_image_size(p)
        images_info[rel] = {
            'path': rel,
            'name': p.name,
            'size_bytes': p.stat().st_size,
            'dimensions': sz,
            'ext': p.suffix.lower()
        }

# 2. Scan code files for references
code_files = [p for p in (root / 'src').rglob('*') if p.suffix.lower() in ('.ts', '.tsx', '.css', '.html', '.json')]
code_files.append(root / 'index.html')

code_refs = {}
unsplash_refs = {}

for cf in code_files:
    if not cf.exists():
        continue
    try:
        content = cf.read_text(encoding='utf-8', errors='ignore')
        cf_rel = cf.relative_to(root).as_posix()

        # Unsplash URLs
        for m in re.finditer(r'https://images\.unsplash\.com/[a-zA-Z0-9_\-\?&=%]+', content):
            url = m.group(0)
            if url not in unsplash_refs:
                unsplash_refs[url] = []
            unsplash_refs[url].append(cf_rel)

        # Local image references
        for rel_path, info in images_info.items():
            name = info['name']
            stem = Path(name).stem
            # Check direct match of filename or path
            if name in content or f"/images/{name}" in content or f"/images/{stem}" in content:
                if rel_path not in code_refs:
                    code_refs[rel_path] = []
                code_refs[rel_path].append(cf_rel)
    except Exception as e:
        pass

out = {
    'total_image_files': len(images_info),
    'images': images_info,
    'code_refs': code_refs,
    'unsplash_refs': unsplash_refs
}

with open(root / 'scripts' / 'image_audit_result.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2)

print(f"Total image files found: {len(images_info)}")
print(f"Total images referenced in code: {len(code_refs)}")
print(f"Total unsplash image URLs found: {len(unsplash_refs)}")
