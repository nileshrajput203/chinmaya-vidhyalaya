import os
import re
from pathlib import Path
from collections import defaultdict
import json

root = Path(r"c:\Users\USER\Downloads\zip-repl\zip-repl")

with open(root / "scripts" / "direct_image_refs.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

current_entry = None
entries = []

for line in lines:
    line = line.rstrip()
    if line.startswith("LOCAL:"):
        # LOCAL: /1.jpeg | Dims: 1600x419 | Size: 420.0 KB
        parts = line.split("|")
        path = parts[0].replace("LOCAL:", "").strip()
        dims = parts[1].replace("Dims:", "").strip() if len(parts) > 1 else ""
        size = parts[2].replace("Size:", "").strip() if len(parts) > 2 else ""
        current_entry = {
            "type": "LOCAL",
            "path": path,
            "dims": dims,
            "size": size,
            "components": []
        }
        entries.append(current_entry)
    elif line.startswith("REMOTE/UNRESOLVED:"):
        path = line.replace("REMOTE/UNRESOLVED:", "").strip()
        current_entry = {
            "type": "REMOTE",
            "path": path,
            "dims": "N/A",
            "size": "N/A",
            "components": []
        }
        entries.append(current_entry)
    elif line.startswith("->") and current_entry:
        comp = line.replace("->", "").strip()
        current_entry["components"].append(comp)

print(f"Total entries parsed: {len(entries)}")

# Group entries by category
categories = defaultdict(list)

for e in entries:
    p = e["path"].lower()
    comps = " ".join(e["components"]).lower()
    
    if "logo" in p or "favicon" in p:
        categories["1. Logos & Brand Identity"].append(e)
    elif "cutout" in p or "swamiji" in p or "achiever" in p:
        categories["2. Floating Cutouts & Transparent PNGs (Hero & Overlays)"].append(e)
    elif "banner" in p or p in ["/1.jpeg", "/2.jpeg", "/images/1.jpeg", "/images/2.jpeg", "/file_00000000129882308ffa3f6b1a6bab51.png"]:
        categories["3. Hero Slides, Main Banners & Wide Headers"].append(e)
    elif "board-of-management" in p or "principal" in p or "staff" in p or "trustee" in p or "management" in p:
        categories["4. Leadership, Faculty & Management Portraits"].append(e)
    elif any(k in p for k in ["lab", "chem", "phys", "lib", "bio", "it-", "infrastructure", "facility", "computer"]):
        categories["5. Campus Facilities & Infrastructure Showcase"].append(e)
    elif any(k in p for k in ["certificate", "document", "noc", "rte", "affiliation", "trust", "sanitation", "diary", "result", "fee", "declaration"]):
        categories["6. Mandatory Disclosures, Certificates & Document Thumbnails"].append(e)
    elif "paper" in p or "standard-" in p:
        categories["7. Academic Question Papers & Syllabus Thumbnails"].append(e)
    elif "chinmaya/" in p or "school_events/" in p or "gallery" in comps:
        categories["8. Events & Campus Photo Gallery"].append(e)
    elif e["type"] == "REMOTE":
        categories["9. Unsplash External Stock Images (Placeholders) & Remote URLs"].append(e)
    else:
        categories["10. General Content, Activities & Showcase Images"].append(e)

summary = {}
for cat, items in sorted(categories.items()):
    print(f"\n==========================================")
    print(f"{cat} (Count: {len(items)})")
    print(f"==========================================")
    summary[cat] = len(items)
    for it in items[:10]:
        print(f"  {it['path']} | Dims: {it['dims']} | Used in: {', '.join([c.split('/')[-1] for c in it['components'][:3]])}")
    if len(items) > 10:
        print(f"  ... and {len(items) - 10} more")

with open(root / "scripts" / "categorized_images.json", "w", encoding="utf-8") as f:
    json.dump(categories, f, indent=2)

print("\nSaved categorized_images.json")
